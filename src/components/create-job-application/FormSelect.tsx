import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormSelectProps {
    label: string;
    register: UseFormRegisterReturn;
    options: string[];
    disabled?: boolean;
    error?: FieldError;
    className?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({
    label,
    register,
    options,
    disabled = false,
    error,
    className=''
}) => {

    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <select
                {...register}
                disabled={disabled}
                className={`w-full px-3 py-2 border border-gray-400 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-800 disabled:bg-gray-100 hover:cursor-pointer ${error ? "border-red-500" : ""} ${className}`}
            >
                
                {options.map( option => (
                    <option key={option} value={option} className="bg-gray-900">{option.replace('_', ' ')}</option>
                ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    );
};

export default FormSelect;