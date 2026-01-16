import clsx from "clsx";
import { BaseButtonProps, BaseButtonType, ComponentSize } from "./types";

const BaseButton = ({
    type = "primary",
    size = "sm",
    isDisabled = false,
    children,
    handleClick,
}: BaseButtonProps) => {
    const baseStyle =
        "flex items-center justify-center rounded-[4px]  px-4 ease-in-out transition-all duration-300";

    const btnTypes: Record<BaseButtonType, string> = {
        primary: "bg-green-500 text-white hover:bg-green-300 border-none",
        secondary:
            "bg-transparent border border-gray-300 text-white hover:bg-gray-100 hover:border-gray-400 hover:text-black",
        danger: "bg-red-500 text-white hover:bg-red-300 border-none",
        outline:
            "bg-white text-black border-2 border-black border-solid hover:border-green-500 hover:text-green-500",
        link: "bg-none text-green-500 hover:text-green-300 border-none",
    };
    const btnSizes: Record<ComponentSize, string> = {
        sm: "h-8 text-sm",
        md: "h-9 text-base",
        lg: "h-10 text-lg",
    };
    const disabled = isDisabled
        ? "opacity-50 cursor-not-allowed"
        : "cursor-pointer";

    return (
        <button
            onClick={handleClick}
            className={clsx(baseStyle, btnSizes[size], btnTypes[type], disabled)}
            disabled={isDisabled}
        >
            {children}
        </button>
    );
};

export default BaseButton;
