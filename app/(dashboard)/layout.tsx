import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="h-full">
            {/* //Ẩn sidebar khi màn hình có kích thước nhỏ hơn medium */}
            <div className="hidden md:flex h-full w-56 flex-col fix inset-y-0 z-50">
                <Sidebar />
            </div>
            {children}
        </div >
    );
}

export default DashboardLayout; 
