"use client";

import { useState, useEffect } from "react";
import {
  PlusCircle,
  Search,
  Briefcase,
  Calendar,
  Building2,
  CheckCircle2,
  XCircle,
  Edit,
  Trash2,
  ArrowLeft,
} from "lucide-react";

import JobForm from "./job-form";
import JobDetails from "./job-details";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import toast, { Toaster } from "react-hot-toast";


const notifyAdded = () =>
  toast.success("New Job Added!", {
    style: {
      borderRadius: "10px",
      border: "1px solid rgb(56, 56, 56)",
      background: "#000",
      color: "#fff",
    },
  });
const notifyEdited = () =>
  toast.success("Job Edited!", {
    style: {
      borderRadius: "10px",
      border: "1px solid rgb(56, 56, 56)",
      background: "#000",
      color: "#fff",
    },
  });

const notifyDeleted = () =>
  toast.success("Job Deleted!", {
    style: {
      borderRadius: "10px",
      border: "1px solid rgb(56, 56, 56)",
      background: "#000",
      color: "#fff",
    },
  });

  const notifyFailed = () =>
  toast.error("Failed to perform action. Try again later!", {
    style: {
      borderRadius: "10px",
      border: "1px solid rgb(56, 56, 56)",
      background: "#000",
      color: "#fff",
    },
  });

  const notifyWorking = (message : string) =>
  toast.loading(message, {
    style: {
      borderRadius: "10px",
      border: "1px solid rgb(56, 56, 56)",
      background: "#000",
      color: "#fff",
    },
  });

export default function App() {
  type JobApplication = {
    id: string;
    company: string;
    position: string;
    location: string;
    date: string;
    status: "Applied" | "Interview" | "Rejected" | "Offer";
    notes?: string;
    salary?: string;
    contact?: string;
    url?: string;
  };

  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobApplication[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingJob, setIsAddingJob] = useState(false);
  const [isEditingJob, setIsEditingJob] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobApplication | null>(null);
  const [viewingJobDetails, setViewingJobDetails] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<JobApplication | null>(null); // or JobApplication type
  const [loading, setLoading] = useState(true)


  // Fetch jobs from API
  useEffect(() => {
    async function fetchJobs() {
      const toastId = notifyWorking("Getting jobs...");
      try {

        const res = await fetch("/api/jobs")
        const data = await res.json()
        setJobs(data)
        setFilteredJobs(data)
      } catch (error) {

        notifyFailed();
        console.error("Failed to fetch jobs:", error)
      } finally {
        toast.dismiss(toastId);

        setLoading(false)
      }
    }

    fetchJobs()
  }, [])


  // Filter jobs based on search term
  useEffect(() => {
    const filtered = jobs.filter(
      (job) =>
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [searchTerm, jobs]);

  // Add new job
  const handleAddJob = async (job: Omit<JobApplication, "id">) => {
    try {
      const toastIdForHandleAddJob = notifyWorking("Saving...")
      const formData = new FormData();

      formData.append("company", job.company);
      formData.append("position", job.position);
      formData.append("location", job.location);
      formData.append("date", job.date);
      formData.append("status", job.status);

      if (job.notes) formData.append("notes", job.notes);
      if (job.salary) formData.append("salary", job.salary);
      if (job.contact) formData.append("contact", job.contact);
      if (job.url) formData.append("url", job.url);

      const res = await fetch("/api/jobs", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        notifyFailed();
        throw new Error("Failed to create job");
      }

      const createdJob = await res.json();

      setJobs([createdJob, ...jobs]);
      setIsAddingJob(false);
      toast.dismiss(toastIdForHandleAddJob);

      notifyAdded();
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  // Update existing job
  const handleUpdateJob = async (updatedJob: JobApplication) => {
    try {
      const toastIdForHandleUpdateJob = notifyWorking("Updating...");

      const res = await fetch(`/api/jobs/${updatedJob.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedJob),
      });

      if (!res.ok) {
        notifyFailed();
        throw new Error("Failed to update job");
      }

      const updatedData = await res.json();

      setJobs(
        jobs.map((job) => (job.id === updatedData.id ? updatedData : job))
      );
      setIsEditingJob(false);
      setSelectedJob(null);
      toast.dismiss(toastIdForHandleUpdateJob);

      notifyEdited();
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  // Delete job
  const handleDeleteJob = async (id: string) => {
    try {
      const toastIdForHandleDeleteJob = notifyWorking("Deleting...");

      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        notifyFailed();
        throw new Error("Failed to delete job");
      }

      // Update local state
      setJobs(jobs.filter((job) => job.id !== id));

      if (selectedJob?.id === id) {
        setSelectedJob(null);
        setViewingJobDetails(false);
      }
      toast.dismiss(toastIdForHandleDeleteJob);

      notifyDeleted();
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete the job. Please try again.");
    }
  };

  // Edit job
  const handleEditJob = (job: JobApplication) => {
    setSelectedJob(job);
    setIsEditingJob(true);
    setViewingJobDetails(false);
  };

  // View job details
  const handleViewJobDetails = (job: JobApplication) => {
    setSelectedJob(job);
    setViewingJobDetails(true);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Applied":
        return "bg-[#40A2E3] text-white";
      case "Interview":
        return "bg-[#D800A6] text-white";
      case "Offer":
        return "bg-[#9CFF2E] text-black";
      case "Rejected":
        return "bg-[#FF4949] text-white";
      default:
        return "bg-gray-100 text-gray-900";
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Applied":
        return <Briefcase className="w-3 h-3" />;
      case "Interview":
        return <Calendar className="w-3 h-3" />;
      case "Offer":
        return <CheckCircle2 className="w-3 h-3" />;
      case "Rejected":
        return <XCircle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div>
        <Toaster />
        {showDeleteModal && jobToDelete && (
          <div className="fixed inset-0 bg-black/50 flex mx-6 items-center justify-center z-50">
            <div className="bg-stone-900 border border-stone-700 p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h2 className="text-lg mb-4 text-stone-100">
                Are you sure you want to delete this application?
              </h2>
              <div>
                <p className="text-base font-bold text-stone-100">
                  {jobToDelete.company} • {jobToDelete.position}
                </p>
              </div>
              <div className="flex justify-end mt-5 gap-2">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setJobToDelete(null);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleDeleteJob(jobToDelete.id);
                    setShowDeleteModal(false);
                    setJobToDelete(null);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-50">Job Applications</h1>
          <p className="mt-1 text-sm text-gray-50">
            Track and manage your job search process
          </p>
        </header>

        {/* Main content */}
        {isAddingJob ? (
          <div className="bg-stone-900 border border-stone-700 rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <button
                onClick={() => setIsAddingJob(false)}
                className="text-stone-500 hover:text-stone-100 mr-4"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-lg text-stone-100 font-medium">
                Add New Application
              </h2>
            </div>
            <JobForm
              onSubmit={handleAddJob}
              onCancel={() => setIsAddingJob(false)}
            />
          </div>
        ) : isEditingJob && selectedJob ? (
          <div className="bg-stone-900 rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <button
                onClick={() => {
                  setIsEditingJob(false);
                  setSelectedJob(null);
                }}
                className="text-stone-500 hover:text-stone-100 mr-4"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-lg text-stone-300 font-medium">
                Edit Application
              </h2>
            </div>
            <JobForm
              job={selectedJob}
              onSubmit={handleUpdateJob as (job: JobApplication | Omit<JobApplication, "id">) => void}
              onCancel={() => {
                setIsEditingJob(false);
                setSelectedJob(null);
              }}
            />
          </div>
        ) : viewingJobDetails && selectedJob ? (
          <div className="bg-stone-900 border border-stone-700 rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <button
                onClick={() => {
                  setViewingJobDetails(false);
                  setSelectedJob(null);
                }}
                className="text-gray-300 hover:text-gray-100 mr-4"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-base text-gray-300 font-medium">
                Application Details
              </h2>
            </div>
            <JobDetails
              job={selectedJob}
              onEdit={handleEditJob}
              onDelete={(job) => {
                setJobToDelete(job);
                setShowDeleteModal(true);
              }}
            />
          </div>
        ) : (
          <>
            {/* Actions bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-stone-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search applications..."
                  className="block w-full text-white pl-10 pr-3 py-2 border border-stone-500 rounded-lg text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={() => setIsAddingJob(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Application
              </button>
            </div>

            <div className="bg-stone-900 border border-stone-800 rounded-xl shadow-sm overflow-hidden">
  {loading ? (
    <div className="p-6 space-y-4">
      <Skeleton style={{marginBottom : '1.2rem'}} height={38} baseColor="#292524" highlightColor="#57534d" />
      <Skeleton style={{marginBottom : '1.2rem'}} height={38} baseColor="#292524" highlightColor="#57534d" />
      <Skeleton height={38} baseColor="#292524" highlightColor="#57534d" />

    </div>
  ) : filteredJobs.length === 0 ? (
    <div className="p-8 text-center">
      <p className="text-gray-50">No job applications found. Add your first one!</p>
    </div>
  ) : (
    <ul className="divide-y divide-stone-600">
      {filteredJobs.map((job) => (
        <li
          key={job.id}
          className="p-4 hover:bg-stone-800 transition-colors cursor-pointer"
          onClick={() => handleViewJobDetails(job)}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-stone-500 rounded-full flex items-center justify-center">
                <Building2 className="w-5 h-5 text-gray-200" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-50">{job.position}</h3>
                <p className="text-sm text-gray-300">
                  {job.company} • {job.location}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 ml-0 sm:ml-auto">
              <div className="text-sm text-gray-300">
                {new Date(job.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                  job.status
                )}`}
              >
                <span className="mr-1">{getStatusIcon(job.status)}</span>
                {job.status}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditJob(job);
                  }}
                  className="p-1 text-gray-400 hover:text-yellow-400 rounded-full hover:bg-stone-400"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setJobToDelete(job);
                    setShowDeleteModal(true);
                  }}
                  className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-stone-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )}
</div>

            
          </>
        )}
      </div>
    </div>
  );
}
