import { Controller } from "react-hook-form";
import Select, { MultiValue, Props, SingleValue } from "react-select";
import { BaseComboxProps, ComponentSize, OptionType } from "./types";

const BaseCombobox = ({
    name,
    control,
    size = 'md',
    label,
    placeHolder,
    options = [],
    isMulti = false,
    isDisabled = false,
    ...props
}: BaseComboxProps & Omit<Props<OptionType>, 'options'>) => {
    const inputSize: Record<ComponentSize, string> = {
        sm: "h-8 text-sm",
        md: "h-9 text-base",
        lg: "h-10 text-lg",
    };
    const classLabelName = `font-bold h-fit mb-1 text-black ${inputSize[size]}`
    return (
        <div className='flex flex-col mb-4'>
            {label && <label className={classLabelName}>{label}</label>}

            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
                    <>
                        <Select
                            ref={ref}
                            options={options}
                            placeholder={placeHolder}
                            isMulti={isMulti}
                            isDisabled={isDisabled}
                            value={isMulti
                                ? options.filter(opt => Array.isArray(value) && value.includes(opt.value))
                                : options.find(option => option.value === value) || null
                            }
                            onChange={(selectedOption) => {
                                if (isMulti) {
                                    const opts = selectedOption as MultiValue<OptionType>;
                                    onChange(opts.map(opt => opt.value));
                                } else {
                                    const opt = selectedOption as SingleValue<OptionType>;
                                    onChange(opt?.value);
                                }
                            }}
                            onBlur={onBlur}
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderColor: error ? '#ef4444' : baseStyles.borderColor,
                                    '&:hover': {
                                        borderColor: error ? '#ef4444' : baseStyles.borderColor,
                                    },
                                    paddingInline: '8px',
                                    cursor: 'pointer',
                                    boxShadow: state.isFocused ? (error ? '0 0 0 1px #ef4444' : '0 0 0 1px #8bc34a') : 'none',
                                })
                            }}
                            {...props}
                        />
                        {error && <p className="text-red-500 text-xs mt-1 italic">{error.message}</p>}
                    </>
                )}
            />
        </div>
    );
}

export default BaseCombobox;