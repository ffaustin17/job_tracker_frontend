import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
    label: string;
    type?: string;
    register: UseFormRegisterReturn;
    disabled?: boolean;
    error?: FieldError;
    className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
    label,
    type = 'text',
    register,
    disabled,
    error,
    className=''
}) => {

    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-500">{label}</label>
            <input
                type={type}
                {...register}
                disabled={disabled}
                className={`w-full px-3 py-2 border border-gray-400 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-800 disabled:bg-gray-300 disabled:hover:cursor-not-allowed ${className}`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    );
};

export default FormInput;