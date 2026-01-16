import { X } from 'lucide-react';
import { BasePopupProps } from './types';

const BasePopup = ({ visible, title, children, footer, onClose }: BasePopupProps) => {
    return (
        <>
            {visible && (
                <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-[9999]">
                    <div className="bg-white w-[350px] h-[150px] text-black rounded-lg p-2 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                        <div className="flex items-start justify-between border-b-[0.5px] border-solid border-black">
                            <p>{title}</p>
                            <X className="cursor-pointer" onClick={onClose}></X>
                        </div>
                        <div className="my-popup-body">
                            {children}
                        </div>
                        <div className="flex justify-end gap-1">
                            {footer}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BasePopup;