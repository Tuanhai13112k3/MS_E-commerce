import { X } from 'lucide-react';
import PropTypes from "prop-types";

/**
 * BasePopup component
 * @param {boolean} visible - Whether the popup is visible
 * @param {string} title - Title of the popup
 * @param {object} children - Content inside the popup
 * @param {object} footer - Footer content of the popup
 * @param {function} onClose - Function to call when closing the popup
 */
const BasePopup = ({ visible, title, children, footer, onClose }) => {
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

BasePopup.propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    children: PropTypes.node,
    footer: PropTypes.node,
    onclose: PropTypes.func
}
export default BasePopup;