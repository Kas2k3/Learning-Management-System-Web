"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { SearchInput } from "./search-input";

export const NavbarRoutes = () => {
    const pathname = usePathname();

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isCoursePage = pathname?.includes("/courses");
    const isSearchPage = pathname === "/search";

    return (
        <>
            {isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            )}
            <div className="flex gap-x-2 ml-auto">
                {isTeacherPage || isCoursePage ? (
                    <Link href="/">
                        <Button size="sm" variant="ghost">
                            <LogOut className="h-4 w-4 mr-2" />
                            Thoát
                        </Button>
                    </Link>
                ) : (
                    <Link href="/teacher/courses">
                        <Button size="sm" variant="ghost">
                            Quản lý khóa học
                        </Button>
                    </Link>
                )}
                <UserButton
                    afterSignOutUrl="/"
                />
            </div>
        </>
    )
}