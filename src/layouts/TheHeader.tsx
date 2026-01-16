import { useAuth } from '@/features/auth/context/AuthContext';
import { Bell, ChevronDown, CircleUser, MessageSquareText } from 'lucide-react';
const TheHeader = () => {
    const { user } = useAuth();
    return (
        <>
            <div className='h-16 w-full flex items-center px-10 justify-between text-white bg-[#070B1D]'>
                <div className="w-10 h-10 flex items-center gap-2" >
                    <img src="https://mumesoft.com/wp-content/themes/homepage/public/images/logo-fat.webp" />
                    <p className="text-lg">MumeSoft</p>
                </div>
                <div className='flex items-center gap-4'>
                    <MessageSquareText />
                    <Bell />
                    <div className='flex gap-2 items-center'>
                        <CircleUser className="w-8 h-8" />
                        <p>{user?.name}</p>
                        <ChevronDown />
                    </div>
                </div>
            </div>

        </>
    );
};

export default TheHeader;