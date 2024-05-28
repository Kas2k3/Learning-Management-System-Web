import { Category, Chapter, Course } from "@prisma/client";

import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";

type CourseWithProgressWithCategory = Course & {
    category: Category;
    chapters: Chapter[];
    progress: number | null;
}

type DashboardCourses = {
    completedCourses: CourseWithProgressWithCategory[];
    coursesInProgress: CourseWithProgressWithCategory[];
}

export const getDashboardCourses = async (userId: string): Promise<DashboardCourses> => {
    try {
        const courses = await db.course.findMany({
            include: {
                category: true,
                chapters: true,
            },
        });

        const coursesWithProgress: CourseWithProgressWithCategory[] = await Promise.all(
            courses.map(async (course) => {
                const progress = await getProgress(userId, course.id);
                return {
                    ...course,
                    progress,
                } as CourseWithProgressWithCategory;
            })
        );

        const completedCourses = coursesWithProgress.filter((course) => course.progress === 100);
        const coursesInProgress = coursesWithProgress.filter((course) => (course.progress ?? 0) < 100);

        return {
            completedCourses,
            coursesInProgress,
        };
    } catch (error) {
        console.log("[GET_DASHBOARD_COURSES]", error);
        return {
            completedCourses: [],
            coursesInProgress: [],
        };
    }
}
