import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { File } from "lucide-react";

import { getChapter } from "@/actions/get-chapters";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";

import { VideoPlayer } from "./_components/video-player";
import { CourseProgressButton } from "./_components/course-progress-button";

const ChapterIdPage = async ({
    params
}: {
    params: { courseId: string; chapterId: string }
}) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const {
        chapter,
        course,
        muxData,
        attachments,
        nextChapter,
        userProgress,
    } = await getChapter({
        userId,
        chapterId: params.chapterId,
        courseId: params.courseId,
    });

    if (!chapter || !course) {
        return redirect("/");
    }

    const isLocked = !chapter.isFree;
    const completeOnEnd = !userProgress?.isCompleted;

    return (
        <div>
            {userProgress?.isCompleted && (
                <Banner
                    variant="success"
                    label="Đã hoàn thành chương học này"
                />
            )}
            {isLocked && (
                <Banner
                    variant="warning"
                    label="Bạn cần đăng ký khóa học để xem chương này"
                />
            )}
            <div className="flex fex-col max-w-4xl mx-auto pb-20">
                <div className="p-4">
                    <VideoPlayer
                        chapterId={params.chapterId}
                        title={chapter.title}
                        courseId={params.courseId}
                        nextChapterId={nextChapter?.id}
                        playbackId={muxData?.playbackId!}
                        isLocked={isLocked}
                        completeOnEnd={completeOnEnd}
                    />
                </div>
                <div>
                    <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                        <h2 className="text-2xl font-semibold mb-2">
                            {chapter.title}
                        </h2>
                        <CourseProgressButton
                            chapterId={params.chapterId}
                            courseId={params.courseId}
                            nextChapterId={nextChapter?.id}
                            isCompleted={!!userProgress?.isCompleted}
                        />
                    </div>
                    <Separator />
                    <Preview value={chapter.description!} />
                </div>
                {!!attachments.length && (
                    <>
                        <Separator />
                        <div className="p-4">
                            {attachments.map((attachment) => (
                                <a
                                    href={attachment.url}
                                    target="_blank"
                                    key={attachment.id}
                                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                                >
                                    <File />
                                    <p className="line-clamp-1">
                                        {attachment.name}
                                    </p>
                                    {attachment.name}
                                </a>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ChapterIdPage;