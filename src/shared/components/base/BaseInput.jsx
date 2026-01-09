import PropTypes from "prop-types";
import React from "react";

/**
 * BaseInput component
 * @param {string} label - Label for the input field
 * @param {string} type - Type of the input field (default: "text")
 * @param {string} size - Size of the input field (sm, md, lg) (default: "md")
 * @param {string} placeHolder - Placeholder text for the input field
 * @param {boolean} isDisabled - Whether the input field is disabled (default: false)
 * @param {boolean} isReadonly - Whether the input field is read-only (default: false)
 * @param {string} errorMsg - Error message to display below the input field
 * @param {object} props - Additional props to pass to the input element
 */
const BaseInput = React.forwardRef(({ label, type = "text", size = "md", placeHolder, isDisabled = false, isReadonly = false, errorMsg, ...props }, ref) => {
    const baseStyle = 'px-4 m-1 rounded-md border-2 border-gray-300 hover:border-green-300 focus:border-green-500 focus:outline-none';

    const inputSize = {
        sm: "h-8 text-sm",
        md: "h-9 text-base",
        lg: "h-10 text-lg",
    };

    const disabled = isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
    const errorBorder = errorMsg ? "border-red-500 focus:border-red-300" : "";
    const classLabel = `h-fit ${inputSize[size]} font-bold`
    const className = `${baseStyle} ${inputSize[size]} ${disabled} ${errorBorder} cursor-text`
    return (
        <div className="flex flex-col mb-2">
            {label && <label className={classLabel}>{label}</label>}
            <input
                ref={ref}
                className={className}
                type={type}
                readOnly={isReadonly}
                placeholder={placeHolder}
                {...props}
            />
            {errorMsg && <p className="text-red-500 text-xs mt-1 italic">{errorMsg}</p>}

        </div>
    )
});

BaseInput.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    placeHolder: PropTypes.string,
    isDisabled: PropTypes.bool,
    isReadonly: PropTypes.bool,
    errorMsg: PropTypes.string
}
export default BaseInput;