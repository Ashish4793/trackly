"use client"

import type React from "react"
import { useState } from "react"


type JobApplication = {
  id: string
  company: string
  position: string
  location: string
  status: "Applied" | "Interview" | "Offer" | "Rejected"
  date: string
  notes?: string
  salary?: string
  contact?: string
  url?: string
}

type JobFormProps = {
  job?: JobApplication
  onSubmit: (job: Omit<JobApplication, "id"> | JobApplication) => void
  onCancel: () => void
}

export default function JobForm({ job, onSubmit, onCancel }: JobFormProps) {
  const [formData, setFormData] = useState({
    id: job?.id || "",
    company: job?.company || "",
    position: job?.position || "",
    location: job?.location || "",
    status: job?.status || "Applied",
    date: job?.date || new Date().toISOString().split("T")[0],
    notes: job?.notes || "",
    salary: job?.salary || "",
    contact: job?.contact || "",
    url: job?.url || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-100">
            Company
          </label>
          <input
            type="text"
            name="company"
            id="company"
            required
            value={formData.company}
            onChange={handleChange}
            className="mt-1 text-white block w-full border border-stone-500 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="position" className="block text-sm font-medium text-stone-300">
            Position
          </label>
          <input
            type="text"
            name="position"
            id="position"
            required
            value={formData.position}
            onChange={handleChange}
            className="mt-1 text-white block w-full border border-stone-500 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-stone-300">
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            required
            value={formData.location}
            onChange={handleChange}
            className="mt-1 text-white block w-full border border-stone-500 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-stone-300">
            Status
          </label>
          <select
            name="status"
            id="status"
            required
            value={formData.status}
            onChange={handleChange}
            className="mt-1 text-white block w-full border border-stone-500 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-stone-300">
            Date Applied
          </label>
          <input
          style={{colorScheme: "dark"}}
            type="date"
            name="date"
            id="date"
            required
            value={formData.date}
            onChange={handleChange}
            className="mt-1 text-white block w-full border border-stone-500 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-stone-300">
            Salary Range
          </label>
          <input
            type="text"
            name="salary"
            id="salary"
            value={formData.salary}
            onChange={handleChange}
            className="mt-1 text-white block w-full border border-stone-500 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-stone-300">
            Contact Person
          </label>
          <input
            type="text"
            name="contact"
            id="contact"
            value={formData.contact}
            onChange={handleChange}
            className="mt-1 text-white block w-full border border-stone-500 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="url" className="block text-sm font-medium text-stone-300">
            Job URL
          </label>
          <input
            type="url"
            name="url"
            id="url"
            value={formData.url}
            onChange={handleChange}
            className="mt-1 text-white block w-full border border-stone-500 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-stone-300">
          Notes
        </label>
        <textarea
          name="notes"
          id="notes"
          rows={4}
          value={formData.notes}
          onChange={handleChange}
          className="mt-1 text-white block w-full border border-stone-500 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center px-4 py-2 border border-stone-600 shadow-sm text-sm font-medium rounded-lg text-stone-200 bg-stone-700 hover:bg-stone-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-stone-100 bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {job ? "Update" : "Save"} Application
        </button>
      </div>
    </form>
  )
}
