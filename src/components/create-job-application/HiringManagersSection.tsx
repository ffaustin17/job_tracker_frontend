
import { Trash2, Plus, XCircle} from "lucide-react";
import { UseFieldArrayReturn, UseFormRegister } from "react-hook-form";
import FormInput from "./FormInput";

interface HiringManagersSectionProps {
    fields: UseFieldArrayReturn<any, 'hiringManagers'>['fields'];
    append: UseFieldArrayReturn<any, 'hiringManagers'>['append'];
    remove: UseFieldArrayReturn<any, 'hiringManagers'>['remove'];
    register: UseFormRegister<any>;
}

export default function HiringManagersSection({
    fields,
    append,
    remove,
    register
}: HiringManagersSectionProps){

    const hasManagers = fields.length > 0;

    return (
        <fieldset className="bg-slate-900 p-4 rounded-md">
            <legend className="flex items-center justify-between text-lg font-semibold gap-4">
                <span>Hiring Managers</span>
                <div className="flex gap-2">
                    <button 
                        type="button"
                        title="Add Hiring Manager"
                        onClick={() =>{ append({name: '', email: '', linkedinUrl: ''})}}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                        <Plus size={20}/>
                    </button>

                    {hasManagers && (
                        <button
                            type="button"
                            title="Clear All"
                            onClick={() => fields.forEach((_, i)=> remove(i))}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                        >
                            <XCircle size={20}/>
                        </button>
                    )}
                        
                </div>
            </legend>

            {fields.map((field, index) => (
                <div key={field.id} className="border p-4 mt-4 rounded-md relative">
                    <div className="grid md:grid-cols-3 gap-4">
                        <FormInput
                            label="Name *"
                            register={register(`hiringManagers.${index}.name`)}
                        />

                        <FormInput
                            label="Email *"
                            type="email"
                            register={register(`hiringManagers.${index}.email`)}
                        />

                        <FormInput
                            label="Linkedin *"
                            type="url"
                            register={register(`hiringManagers.${index}.linkedinUrl`)}
                        />
                    </div>

                    <button
                        type="button"
                        title="Remove Manager"
                        onClick={() => remove(index)}
                        className="absolute top-2 right-2 text-sm text-red-600 hover:text-red-800"
                    >
                        <Trash2 size={18}/>
                    </button>
                </div>
            ))}
        </fieldset>

        
    )
}