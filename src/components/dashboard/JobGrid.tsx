import JobCard from "./JobCard";

type Job = {
    id: number;
    position: string;
    company: string;
    status: string;
    applicationDate?: string;
    interviewDate?: string;
    jobBoardUsed?: string;
    applicationLink?: string;
    description?: string;
};

type JobGridProps = {
    jobs: Job[];
    loading: boolean;
    activeTab: string;
};

export default function JobGrid({jobs, loading, activeTab} : JobGridProps){
    if(loading){
        return <p className="text-gray-300 flex-1">Loading jobs...</p>;
    }

    if(jobs.length === 0){
        return (
            <p className="text-gray-400 col-span-full text-center flex-1">
                No job applications found in <span className="text-white">{activeTab}</span>.
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-2 py-6 rounded-xl flex-1">
            {jobs.map((job) => (
                <JobCard key={job.id} job={job}/>
            ))}
        </div>
    );
}