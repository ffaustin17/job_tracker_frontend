type PaginationProps = {
    page : number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

export default function Pagination({page, totalPages, onPageChange}: PaginationProps){
    return (
        <div className="mt-6 flex justify-center items-center gap-4">
            <button
                onClick={()=> onPageChange(page-1)}
                disabled={page===0}
                className="px-4 py-2 bg-slate-700 text-gray-400 rounded cursor-not-allowed"
                
            >
                Previous
            </button>

            <span className="text-gray-300 text-sm">
                Page {page + 1} of {totalPages}
            </span>

            <button
                onClick={()=> onPageChange(page + 1)}
                disabled={page + 1 >= totalPages}
                className="px-4 py-2 bg-slate-700 text-gray-400 rounded cursor-not-allowed"
            >
                Next
            </button>
        </div>
    )
}