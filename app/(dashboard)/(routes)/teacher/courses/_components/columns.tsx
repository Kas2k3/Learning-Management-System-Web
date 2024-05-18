"use client"

import { Course } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils"

export const columns: ColumnDef<Course>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Tên khóa học
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "isPublished",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Đã xuất bản
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const isPublished = row.getValue("isPublished") || false;

            return (
                <Badge className={cn(
                    "bg-slate-500",
                    isPublished && "bg-sky-700"
                )}>
                    {isPublished ? "Đã tải lên" : "Nháp"}
                </Badge>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const { id } = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="ghost" className="h-4 w-8 p-0">
                            <span className="sr-only">Mở danh mục</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <Link href={`/teacher/courses/${id}`}>
                            <DropdownMenuItem>
                                <Pencil className="h-4 w-4 ,mr-2" />
                                Chỉnh sửa
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]
