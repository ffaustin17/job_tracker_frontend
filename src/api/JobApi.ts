const BASE_URL = "http://localhost:8080/api/jobs";

export const JobApi = {
    getAllJobs: async (token: string, page: number, size: number = 10) => {
                    const response = await fetch(`${BASE_URL}?page=${page}&size=${size}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if(!response.ok) throw new Error("Failed to fetch jobs.");

                    return response.json();
                }, 

    filterJobs: async(token: string, 
                     filter: {status?: string; sortBy?: string; direction?: string},
                     page: number=0,
                     size: number=10) =>{
                        const response = await fetch(`${BASE_URL}/filter?page=${page}&size=${size}`, {
                            headers: {
                            "Content-Type": "application/json",
                            Authorization : `Bearer ${token}`
                            },
                            body: JSON.stringify(filter)
                        });

                        if(!response.ok) throw new Error("Failed to filter jobs.");

                        return response.json();
                }
};