import { useState,useEffect } from "react";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import GreetingHeader from "../components/dashboard/GreetingHeader";
import SearchSortBar from "../components/dashboard/SearchSortBar";
import JobTabs from "../components/dashboard/JobTabs";
import JobGrid from "../components/dashboard/JobGrid";
import Pagination from "../components/dashboard/Pagination";

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
}


const statusMap: Record<string, string|null> = {
  "All Jobs": null,
  "Completed": "COMPLETED",
  "Pending": "PENDING",
  "Rejected": "REJECTED",
  "Scheduled for Interview": "SCHEDULED"
};

export default function DashboardPage(){
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>("All Jobs");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("date");

  const {firstName, token} = useAuth();

  const tabs = ["All Jobs", "Completed", "Pending", "Rejected", "Scheduled for Interview"];

  //fetch jobs
  useEffect(()=>{
    const fetchJobs = async () => {
      setLoading(true);
      const status = statusMap[activeTab];


      try{
        let response;


        if(status === null){
          //fetch all jobs
          response = await fetch(`http://localhost:8080/api/jobs?page=${page}&size=10`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        }
        else{
          //fetch filtered jobs
          response = await fetch(`http://localhost:8080/api/jobs/filter?page=${page}&size=10`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              status: status,
              sortBy: "applicationDate",
              direction: "DESC"
            })
          });
        }

        if(!response.ok) throw new Error("Failed to fetch jobs.");

        const responsePayload = await response.json();

        setJobs(responsePayload.data.content);
        setTotalPages(responsePayload.data.totalPages);
      }
      catch(error){
        console.error(error);
      }
      finally{
        setLoading(false);
      }
    };

    fetchJobs();
  }, [page, token, activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white px-4">
      <Header/>
      {/* Welcome */}
      <GreetingHeader firstName={firstName}/>

      {/* Search + Sort + Add Job Button */}
      <SearchSortBar 
        searchTerm={searchTerm} 
        sortOption={sortOption} 
        onSearchChange={(e)=>setSearchTerm(e.target.value)} 
        onSortChange={(e)=>setSortOption(e.target.value)}
      />

      <JobTabs activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs}/>
      <JobGrid jobs={jobs} loading={loading} activeTab={activeTab}/>
      <Pagination/>
    </div>
  );
}