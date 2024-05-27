import { UserProgress } from '@prisma/client';
import { MuxData } from '@prisma/client';
import { db } from "@/lib/db";
import { Attachment, Chapter } from '@prisma/client';

interface GetChapterProps {
    userId: string;
    courseId: string;
    chapterId: string;
};

export const getChapter = async ({
    userId,
    courseId,
    chapterId,
}: GetChapterProps) => {
    try {
        const course = await db.course.findUnique({
            where: {
                isPublished: true,
                id: courseId,
            }
        });

        const chapter = await db.chapter.findUnique({
            where: {
                id: chapterId,
                isPublished: true,
            }
        });

        if (!chapter || !course) {
            throw new Error("Không tìm thấy khóa/chương học này");
        }

        let muxData = null;
        let attachments: Attachment[] = [];
        let nextChapter: Chapter | null = null;

        if (chapter.isFree) {
            muxData = await db.muxData.findUnique({
                where: {
                    chapterId: chapterId,
                }
            });

            nextChapter = await db.chapter.findFirst({
                where: {
                    courseId: courseId,
                    isPublished: true,
                    position: {
                        gt: chapter?.position,
                    }
                },
                orderBy: {
                    position: "asc",
                }
            });
        }

        const userProgress = await db.userProgress.findUnique({
            where: {
                userId_chapterId: {
                    userId,
                    chapterId,
                }
            }
        });

        return {
            chapter,
            course,
            muxData,
            attachments,
            nextChapter,
            userProgress,
        }

    } catch (error) {
        console.log("[GET_CHAPTER", error);
        return {
            chapter: null,
            course: null,
            MuxData: null,
            attachments: [],
            nextChapter: null,
            userProgress: null,
        }
    }
}