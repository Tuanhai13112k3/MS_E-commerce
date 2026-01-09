import { ChartNoAxesCombined, CircleQuestionMark, Folder, House, Logs, MessageSquareText, PanelLeftClose, PanelLeftOpen, Settings, Star, Tag, User, Users } from 'lucide-react';
import { useState } from 'react';
import BaseButton from '../shared/components/base/BaseButton';
const navItems = [
    { path: '/', label: 'Dashboard', icon: <House /> },
    { path: '/', label: 'Orders', icon: <Logs /> },
    { path: '/', label: 'Products', icon: < Tag /> },
    { path: '/', label: 'Categories', icon: <Folder /> },
    { path: '/', label: 'Customers', icon: <Users /> },
    { path: '/', label: 'Reports', icon: <ChartNoAxesCombined /> },
    { path: '/', label: 'Coupons', icon: <Star /> },
    { path: '/', label: 'Inbox', icon: <MessageSquareText /> },
    { path: '/', label: 'Knowledge Base', icon: <CircleQuestionMark /> },
    { path: '/', label: 'Personal Settings', icon: <User /> },
    { path: '/', label: 'Global Settings', icon: <Settings /> },
]

const TheSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    }

    return (
        <>
            <div className='h-full w-fit flex flex-col justify-between bg-[#1E2753] text-white'>
                <div>
                    {navItems.map((item) => (
                        <div className='flex items-center justify-start gap-4 hover:bg-white hover:text-black p-3 rounded-lg mx-4 my-1 cursor-pointer'>
                            {item.icon}
                            {isCollapsed ? '' : item.label}
                        </div>
                    ))}
                </div>
                <div className='px-4 py-2 mb-4'>
                    <BaseButton type="secondary" size="md" handleClick={toggleSidebar}>
                        <div className='flex items-center gap-4'>
                            {isCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
                            {isCollapsed ? '' : 'Collapse Sidebar'}
                        </div>
                    </BaseButton>
                </div>
            </div>
        </>
    );
};

export default TheSidebar;