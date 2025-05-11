import FormInput from "./FormInput";

interface OptionalInfoSectionProps {
    register: any;
    errors: any;
}

export default function OptionalInfoSection ({ register, errors } : OptionalInfoSectionProps){

    return (
        <fieldset className=" p-4 rounded-md shadow-md bg-slate-900">
            <legend className="text-lg font-semibold">Optional Info</legend>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
                <FormInput
                    label="Company Link"
                    type="url"
                    register={register('companyLink')}
                    error={errors.companyLink}
                />

                <FormInput
                    label="Posting Link"
                    type="url"
                    register={register('postingLink')}
                    error={errors.postingLink}
                />
            </div>

            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-500">Description</label>
                <textarea
                    {...register('description')}
                    className="w-full px-3 py-2 border border-gray-400 rounded shadow-sm focus:ring-2 focus:ring-blue-500 h-42 bg-gradient-to-br from-slate-900 to-slate-800"
                />
            </div>
        </fieldset>
    )
}