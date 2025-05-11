import {format} from "date-fns";

interface JobCardProps {
    job: {
        id: number;
        position: string;
        company: string;
        status: string;
        applicationDate? : string;
        interviewDate? : string;
        jobBoardUsed? : string;
        applicationLink? : string;
        description? : string;
    };
}

const statusColorMap: Record<string, string> = {
    PENDING: "bg-yellow-500",
    REJECTED: "bg-red-500",
    ACCEPTED: "bg-green-600",
    INTERVIEW_SCHEDULED: "bg-blue-500",
    OFFER_RECEIVED: "bg-purple-500",
    DECLINED: "bg-gray-500"
};

export default function JobCard({job} : JobCardProps){

    const {
        position,
        company,
        status,
        applicationDate,
        interviewDate,
        jobBoardUsed,
        applicationLink,
        description,
    } = job;

    const formatDate = (dateString? : string) => {
        if(!dateString) return null;

        const date = new Date(dateString);

        return format(date, "PPP");
    };

    return (
        <div className="bg-slate-700 p-4 rounded-lg shadow space-y-2">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-blue-300">{position}</h3>
                <span
                className={`text-xs text-center px-2 py-1 rounded-full text-white ${
                    statusColorMap[status] || "bg-slate-500"
                }`}
                >
                {status.replace("_", " ")}
                </span>
            </div>

            <p className="text-sm text-gray-300">{company}</p>

            {applicationDate && (
                <p className="text-sm text-gray-400">
                    Applied on: {formatDate(applicationDate)}
                </p>
            )}

            {interviewDate && (
                <p className="text-sm text-gray-400">
                    Interview: {formatDate(interviewDate)}
                </p>
            )}

            {jobBoardUsed && (
                <p className="text-sm text-gray-400">Source: {jobBoardUsed}</p>
            )}

            {applicationLink && (
                <a
                href={applicationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline text-sm"
                >
                🔗 View Application
                </a>
            )}

            {description && (
                <p className="text-sm text-gray-300 mt-2 line-clamp-3">
                {description}
                </p>
            )}
        </div>
    )
}