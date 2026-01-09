import TheHeader from "./TheHeader";
import TheSidebar from "./TheSidebar";

const MainLayout = () => {
    return (
        <div className="h-screen flex flex-col">
            <TheHeader />
            <div className="flex-1 flex">
                <TheSidebar />
            </div>
        </div>
    );
};
export default MainLayout;