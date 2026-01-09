import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import Select from "react-select";

/**
 * BaseCombobox component
 * @param {string} name - Name of the combobox field
 * @param {object} control - Control object from react-hook-form
 * @param {string} size - Size of the combobox (sm, md, lg) (default: "md")
 * @param {string} label - Label for the combobox
 * @param {string} placeHolder - Placeholder text for the combobox
 * @param {array} options - Options for the combobox
 * @param {boolean} isMulti - Whether multiple selections are allowed (default: false)
 * @param {boolean} isDisabled - Whether the combobox is disabled (default: false)
 * @param {object} props - Additional props to pass to the Select component
 */
const BaseCombobox = ({
    name,
    control,
    size = 'md',
    label,
    placeHolder,
    options,
    isMulti = false,
    isDisabled = false,
    ...props
}) => {
    const inputSize = {
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
                            value={options?.find(option => option.value === value) || null}
                            onChange={(selectedOption) => {
                                onChange(isMulti
                                    ? selectedOption?.map(opt => opt.value)
                                    : selectedOption?.value
                                );
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

BaseCombobox.propTypes = {
    name: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    label: PropTypes.string,
    placeHolder: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    isMulti: PropTypes.bool,
    isDisabled: PropTypes.bool
}
export default BaseCombobox;