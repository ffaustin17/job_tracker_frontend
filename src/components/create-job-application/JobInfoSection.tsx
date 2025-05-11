import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

const jobStatuses = ['PENDING', 'APPLIED', 'INTERVIEW_SCHEDULED', 'REJECTED'];

type JobStatus = typeof jobStatuses[number];

export default function JobInfoSection({ register, errors }){
    
    return (
        <fieldset className=" p-4 rounded-md shadow-md bg-slate-900">
            <legend className="text-lg font-semibold">Basic Job Info</legend>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
                <FormInput label="Position *" register={register('position')} error={errors.position}/>
                <FormInput label="Company *" register={register('company')} error={errors.company}/>
                <FormInput label="Job Board Used *" register={register('jobBoardUsed')} error={errors.jobBoardUsed}/>
                <FormSelect label="Status *" register={register('status')} options={jobStatuses} error={errors.status}/>
            </div>
        </fieldset>
    )
}