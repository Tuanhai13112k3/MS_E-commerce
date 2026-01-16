import { ChartNoAxesCombined, CircleQuestionMark, Folder, House, Logs, MessageSquareText, PanelLeftClose, PanelLeftOpen, Settings, Star, Tag, User, Users } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import BaseButton from '../shared/components/base/BaseButton';
const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <House /> },
    { path: '/orders', label: 'Orders', icon: <Logs /> },
    { path: '/manage-products', label: 'Products', icon: < Tag /> },
    { path: '/manage-categories', label: 'Categories', icon: <Folder /> },
    { path: '/manage-customers', label: 'Customers', icon: <Users /> },
    { path: '/reports', label: 'Reports', icon: <ChartNoAxesCombined /> },
    { path: '/coupons', label: 'Coupons', icon: <Star /> },
    { path: '/inbox', label: 'Inbox', icon: <MessageSquareText /> },
    { path: '/knowledge-base', label: 'Knowledge Base', icon: <CircleQuestionMark /> },
    { path: '/settings', label: 'Personal Settings', icon: <User /> },
    { path: '/g-settings', label: 'Global Settings', icon: <Settings /> },
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
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center justify-start gap-4 p-3 rounded-lg mx-4 my-1 cursor-pointer
                                ${isActive ? 'bg-green-500 text-white' : 'hover:bg-white hover:text-black'}`
                            }
                        >
                            {item.icon}
                            {isCollapsed ? '' : item.label}
                        </NavLink>
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