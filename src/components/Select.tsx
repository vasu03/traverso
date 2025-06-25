// Import required modules
import type { ChangeEvent } from "react";

// Define the props for Select component
interface SelectProps {
    value: string | number,
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void,
    options: { value: string | number, name: string }[],
    label: string,
    isDisabled?: boolean,
}

// A select dropdown component to select various parameters
export const Select = ({ value, onChange, options, label, isDisabled }: SelectProps) => {

    // TSX to render component
    return (
        <div className="flex flex-col items-start gap-1">
            <label className="text-[11px] text-gray-200 ml-1" htmlFor={label}>{label}</label>
            <select
                id={label}
                className="bg-neutral-700 cursor-pointer hover:bg-neutral-700/50 text-gray-300 text-sm rounded-md transition-all ease-in active:ring-0 active:border-0 py-1 px-2 min-w-[200px] sm:w-full"
                value={value}
                disabled={isDisabled}
                onChange={onChange} >
                {options.map((opt, optIdx) => (
                    <option value={opt.value} key={optIdx} className="rounded-md bg-neutral-600">
                        {opt.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
