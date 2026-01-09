import PropTypes from "prop-types";

/**
 * BaseButton component
 * @param {string} type - Type of the button (primary, danger, outline, link) (default: "primary")
 * @param {string} size - Size of the button (sm, md, lg) (default: "sm")
 * @param {boolean} isDisabled - Whether the button is disabled (default: false)
 * @param {function} handleClick - Click event handler for the button
 * @param {object} children - Content inside the button
 */
const BaseButton = ({ type = "primary", size = "sm", isDisabled = false, children, handleClick }) => {

    const baseStyle = "flex items-center justify-center rounded-[4px]  px-4 ease-in-out transition-all duration-300"

    const btnTypes = {
        primary: "bg-green-500 text-white hover:bg-green-300 border-none",
        secondary: "bg-none text-white hover:bg-white hover:text-black border-none",
        danger: "bg-red-500 text-white hover:bg-red-300 border-none",
        outline: "bg-white text-black border-2 border-black border-solid hover:border-green-500 hover:text-green-500",
        link: "bg-none text-green-500 hover:text-green-300 border-none",
    }

    const btnSizes = {
        sm: "h-8 text-sm",
        md: "h-9 text-base",
        lg: "h-10 text-lg",
    }

    const disabled = isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

    const className = `${baseStyle} ${btnSizes[size]} ${btnTypes[type]} ${disabled}`;

    return (
        <>
            <button onClick={handleClick} className={className} disabled={isDisabled}>
                {children}
            </button>
        </>
    );
};

BaseButton.propTypes = {
    type: PropTypes.oneOf(['primary', 'danger', 'outline', 'link', 'secondary']).isRequired,
    size: PropTypes.oneOf(['sm', 'md', 'lg']).isRequired,
    isDisabled: PropTypes.bool,
    handleClick: PropTypes.func
};
export default BaseButton;