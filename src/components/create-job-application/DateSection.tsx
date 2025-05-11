import FormInput from "./FormInput";

interface DateSectionProps {
    status: string;
    interviewed: boolean;
    setInterviewed: (value: boolean) => void;
    register: any;
    errors: any;
}

export default function DateSection({
    status = "PENDING",
    interviewed,
    setInterviewed,
    register,
    errors
} : DateSectionProps){

    console.log(`@DateSection - status: ${status}`)
    return (
        <fieldset className=" p-4 rounded-md shadow-md bg-slate-900">
            <legend className="text-lg font-semibold">Key Dates</legend>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
                <FormInput
                    label="Application Date"
                    type="date"
                    register={register('applicationDate')}
                    error={errors.applicationDate}
                    disabled={status === 'PENDING'}
                />

                <FormInput
                    label="Interview Date"
                    type="datetime-local"
                    register={register('interviewDate')}
                    error={errors.interviewDate}
                    disabled={status === 'PENDING' || status === 'APPLIED'}
                />

                <FormInput
                    label="Rejection Date"
                    type="date"
                    register={register('rejectionDate')}
                    error={errors.rejectionDate}
                    disabled={status !== 'REJECTED'}
                />
            </div>

            {/* Interview checkbox (only for REJECTED status)*/}
            {status === 'REJECTED' && (
                <div className="flex items-center mt-4 gap-2">
                    <input
                        type="checkbox"
                        id="interviewed"
                        checked={interviewed}
                        onChange={(e) => setInterviewed(e.target.checked)}
                    />
                    <label htmlFor="interviewed" className="text-sm">Did you interview?</label>
                </div>
            )}

        </fieldset>
    )
}