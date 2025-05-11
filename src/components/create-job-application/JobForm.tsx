import {useForm, useFieldArray} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {JobApplicationSchema} from '../../schemas/JobFormSchemas';
import {z} from 'zod';
import {useState} from 'react';
import JobInfoSection from './JobInfoSection';
import DateSection from './DateSection';
import OptionalInfoSection from './OptionalInfoSection';
import HiringManagersSection from './HiringManagersSection';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from "react-hot-toast";


type FormData = z.infer<typeof JobApplicationSchema>;

export default function JobForm(){
    const [interviewed, setInterviewed] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const { token } = useAuth();

    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm<FormData>({
        resolver: zodResolver(JobApplicationSchema),
        defaultValues: {
            hiringManagers: []
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'hiringManagers'
    });

    const status = watch('status');

    const onSubmit = async (data: FormData) => {
        setSubmitting(true);

        try{
            const response = await fetch("http://localhost:8080/api/jobs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create job");
            }

            toast.success("Job application created!");
            setTimeout(()=> navigate("/dashboard"), 1500);

        }
        catch(err){
            toast.error((err as Error).message);
        }
        finally{
            setSubmitting(false);
        }
    };

    return(
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-screen px-16 md:px-32 lg:px-64 py-2 space-y-4'
        >
            <JobInfoSection register={register} errors={errors}/>
            <DateSection status={status} interviewed={interviewed} setInterviewed={setInterviewed} register={register} errors={errors}/>
            <OptionalInfoSection register={register} errors={errors}/>
            <HiringManagersSection fields={fields} append={append} remove={remove} register={register}/>

            <div className="pt-8 border-t mt-8 flex justiy-end gap-4">
                <button
                    type="button"
                    onClick={()=> {
                        const confirmCancel = window.confirm("Are you sure you want to cancel? All entered information will be lost.");

                        if(confirmCancel){
                            navigate("/dashboard");
                        }
                    }}
                    className="mt-6 px-6 py-2 bg-gray-600 hover:bg-gray-700 hover:cursor-pointer text-white font-medium rounded-md shadow-sm focus:outline-none transition"
                >
                    Cancel    
                </button> 
                <button 
                    type="submit" 
                    disabled={submitting}
                    className={`mt-6 px-6 py-2 ${
                        submitting ? "bg-gray-500 hover:cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:cursor-pointer"}
                        text-white font-medium rounded-md shadow-sm focus:outline-none focue:ring-2 focus:ring-blue-400 transition`}
                >
                        Submit Application
                </button>
            </div>
        </form>
    )
    
}
