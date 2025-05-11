export default function Pagination(){
    return (
        <div className="mt-6 flex justify-center gap-4">
            <button
                className="px-4 py-2 bg-slate-700 text-gray-400 rounded cursor-not-allowed"
                disabled
            >
                Previous
            </button>
            <button
                className="px-4 py-2 bg-slate-700 text-gray-400 rounded cursor-not-allowed"
                disabled
            >
                Next
            </button>
        </div>
    )
}