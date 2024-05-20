"use client";

import { Category } from "@prisma/client";
import {
    FcEngineering,
    FcCloth,
    FcMultipleDevices,
    FcBiohazard,
    FcElectronics,
    FcSalesPerformance,
    FcRuler,
    FcBiomass,
} from "react-icons/fc";
import { IconType } from "react-icons";
import { CategoryItem } from "./categoriy-item";

interface CategoriesProps {
    items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
    "Công nghệ sinh học": FcBiomass,
    "Điện tử viễn thông": FcElectronics,
    "Kinh tế và quản lý": FcSalesPerformance,
    "Công nghệ thông tin và truyền thông": FcMultipleDevices,
    "Dệt may và da giày": FcCloth,
    "Cơ khí": FcEngineering,
    "Toán ứng dụng và Tin học": FcRuler,
    "Kỹ thuật hóa học": FcBiohazard,
}

export const Categories = ({
    items,
}: CategoriesProps) => {
    return (
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
            {items.map((item) => (
                <CategoryItem
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name]}
                    value={item.id}
                />
            ))}
        </div>
    )
}