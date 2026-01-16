import { Outlet } from 'react-router-dom';
import TheHeader from "./TheHeader";
import TheSidebar from "./TheSidebar";

const DashboardLayout = () => {
    return (
        <div className="h-screen flex flex-col">
            <TheHeader />
            <div className="flex-1 flex overflow-hidden">
                <TheSidebar />
                <div className="flex-1 p-8 overflow-hidden">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
export default DashboardLayout;