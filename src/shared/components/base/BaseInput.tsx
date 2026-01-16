import clsx from "clsx";
import { forwardRef } from "react";
import { BaseInputProps } from "./types";

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(({
    label,
    type = "text",
    size = "md",
    placeHolder,
    isDisabled = false,
    isReadonly = false,
    errorMsg,
    ...props
}: BaseInputProps, ref) => {
    const baseStyle = 'px-4 m-1 rounded-md border-2 border-gray-300 hover:border-green-300 focus:border-green-500 focus:outline-none';

    const inputSize = {
        sm: "h-8 text-sm",
        md: "h-9 text-base",
        lg: "h-10 text-lg",
    };

    const disabled = isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
    const errorBorder = errorMsg ? "border-red-500 focus:border-red-300" : "";
    const classLabel = `h-fit ${inputSize[size]} font-bold`
    return (
        <div className="flex flex-col mb-2">
            {label && <label className={classLabel}>{label}</label>}
            <input
                ref={ref}
                className={clsx(baseStyle, inputSize[size], disabled, errorBorder, 'cursor-text')}
                type={type}
                disabled={isDisabled}
                readOnly={isReadonly}
                placeholder={placeHolder}
                {...props}
            />
            {errorMsg && <p className="text-red-500 text-xs mt-1 italic">{errorMsg}</p>}

        </div>
    )
});
BaseInput.displayName = "BaseInput";
export default BaseInput;