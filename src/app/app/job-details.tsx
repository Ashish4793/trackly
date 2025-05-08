"use client";
import {
  MapPin,
  Calendar,
  CheckCircle2,
  Briefcase,
  XCircle,
  DollarSign,
  Link,
  User,
  Edit,
  Trash2,
} from "lucide-react";

type JobApplication = {
  id: string;
  company: string;
  position: string;
  location: string;
  status: "Applied" | "Interview" | "Offer" | "Rejected";
  date: string;
  notes?: string;
  salary?: string;
  contact?: string;
  url?: string;
};

type JobDetailsProps = {
  job: JobApplication;
  onEdit: (job: JobApplication) => void;
  onDelete: (job: JobApplication) => void;
};

export default function JobDetails({ job, onEdit, onDelete }: JobDetailsProps) {
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
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-xl font-bold text-gray-100">{job.position}</h1>
          <p className="text-gray-200">{job.company}</p>
        </div>
        <div
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
            job.status
          )}`}
        >
          <span className="mr-1">{getStatusIcon(job.status)}</span>

          {job.status}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#FB2576] mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-gray-300">Location</h3>
              <p className="text-sm font-bold text-gray-100">{job.location}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-[#5800FF] mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-gray-300">
                Date Applied
              </h3>
              <p className="text-sm font-bold text-gray-100">
                {new Date(job.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {job.salary && (
            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-[#00FFAB] mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-gray-300">Salary</h3>
                <p className="text-sm font-bold text-gray-100">{job.salary}</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {job.contact && (
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-[#FFF338] mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-gray-300">Contact</h3>
                <p className="text-sm font-bold text-gray-100">{job.contact}</p>
              </div>
            </div>
          )}

          {job.url && (
            <div className="flex items-start gap-3">
              <Link className="w-5 h-5 text-[#4D77FF] mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-gray-300">Job URL</h3>
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 hover:underline"
                >
                  {job.url}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {job.notes && (
        <div className="pt-4 border-t border-stone-500">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Notes</h3>
          <p className="text-sm text-gray-100 whitespace-pre-line">
            {job.notes}
          </p>
        </div>
      )}

      <div className="pt-6 border-t border-stone-500 flex justify-end gap-3">
        <button
          onClick={() => onEdit(job)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </button>
        <button
          onClick={() => onDelete(job)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </button>
      </div>
    </div>
  );
}
