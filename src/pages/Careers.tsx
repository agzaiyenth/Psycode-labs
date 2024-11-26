import React, { useState } from "react";
import Header from "../components/Header";
import jobs from "../constants/jobs";
import Footer from "../components/Footer";

const Card = ({ children, className }) => (
  <div className={`bg-[#14121e] rounded-xl border border-[#2a2438] shadow-2xl ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, variant = "primary", className = "" }) => {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2";
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20",
    ghost: "bg-[#1a1825] hover:bg-[#2a2438] text-gray-300 border border-[#2a2438]",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const CareersPage = () => {
  const [expandedJob, setExpandedJob] = useState(null); // Track expanded job ID

  const toggleForm = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId); // Toggle form for specific job
  };

  return (
    <>
    <div className="min-h-screen bg-[#0e0c15]">
      {/* Purple Gradient Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none" />
      <Header />
      <div className="relative">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Header Section */}
          <div className="text-center mb-12 space-y-4 mt-12">
            <h1 className="text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
              Join Our Team
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Help us shape the future of digital experiences
            </p>
          </div>

          {/* Render Job Cards */}
          {jobs.map((job) => (
            <Card key={job.id} className="mb-8 backdrop-blur-sm backdrop-filter">
              {/* Card Header */}
              <div className="border-b border-[#2a2438] p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-[#1a1825] rounded-lg border border-[#2a2438]">
                      <svg
                        className="w-6 h-6 text-indigo-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">{job.title}</h2>
                      <p className="text-gray-400 text-sm mt-1">{job.company}</p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    onClick={() => toggleForm(job.id)}
                    className="hover:scale-105 transform transition-all"
                  >
                    <span>{expandedJob === job.id ? "Hide Form" : "Apply Now"}</span>
                  </Button>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="space-y-6">
                  {/* Job Details */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1a1825] border border-[#2a2438]">
                    <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                      <span className="text-gray-300">{job.type}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1a1825] border border-[#2a2438]">
                    <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                      <span className="text-gray-300">{job.location}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed">{job.description}</p>

                  {/* Google Form */}
                  {expandedJob === job.id && (
                    <div className="mt-6 relative rounded-xl overflow-hidden bg-[#1a1825] p-1">
                      <iframe
                        src={job.formUrl}
                        width="100%"
                        height="800"
                        frameBorder="0"
                        marginHeight={0}
                        marginWidth={0}
                        className="w-full relative z-10 bg-transparent rounded-lg"
                      >
                        <div className="flex items-center justify-center p-4 text-gray-400">
                          Loading form...
                        </div>
                      </iframe>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
    </div>
    <Footer />
    </>
  );
};

export default CareersPage;
