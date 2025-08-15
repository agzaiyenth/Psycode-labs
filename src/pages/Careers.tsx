"use client";

import React from "react";
import { ReactNode } from "react";
import { useState, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { jobs } from "../constants/jobs";
import { Upload, MapPin, Clock, Users, CheckCircle } from "lucide-react";

interface ApplicationForm {
  name: string;
  email: string;
  phone: string;
  position: string;
  linkedInURL: string; 
  gitHubURL: string; 
  personIntroduction: string;
  cv: File | null;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  linkedInURL?: string; 
  gitHubURL?: string; 
  personIntroduction?: string;
  cv?: string;
}


const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  type = "button",
  size = "default",
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
  size?: "default" | "lg";
  [key: string]: any;
}) => {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 justify-center";
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20",
    ghost: "bg-[#1a1825] hover:bg-[#2a2438] text-gray-300 border border-[#2a2438]",
  };
  const sizes = {
    default: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }>(
  ({ className = "", error, ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full px-3 py-2 rounded-lg border bg-slate-900/50 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
        error ? "border-red-500 focus:ring-red-500" : "border-slate-600 focus:ring-indigo-500"
      } ${className}`}
      {...props}
    />
  ),
)

Input.displayName = "Input"


const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }
>(({ className = "", error, ...props }, ref) => (
  <textarea
    ref={ref}
    className={`w-full px-3 py-2 rounded-lg border bg-slate-900/50 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-transparent resize-vertical transition-all ${
      error ? "border-red-500 focus:ring-red-500" : "border-slate-600 focus:ring-indigo-500"
    } ${className}`}
    {...props}
  />
))

Textarea.displayName = "Textarea"

const Label = ({
  children,
  htmlFor,
  className = "",
}: {
  children: ReactNode
  htmlFor?: string
  className?: string
}) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium mb-2 ${className}`}>
    {children}
  </label>
)

const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return null
  return <p className="text-white text-sm mt-1 animate-in slide-in-from-top-1 duration-200">{message}</p>
}


const useToast = () => ({
  toast: ({ title, description }: { title: string; description: string; variant?: string }) => {
    alert(`${title}: ${description}`);
  },
});

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-2xl ${className}`}>
    {children}
  </div>
);

//validation handeler functions 

const isValidFullName = (name: string) => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  return words.length >= 2 && words.every(word => /^[a-zA-Z]+$/.test(word));
}

const isValidEmail = (email: string) => {
   return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
   
}
const isValidPhone = (phone: string) => {
  return /^\d{10}$/.test(phone);
}
const isValidLinkedInURL = (url: string) => {
  return /^https?:\/\/(www\.)?linkedin\.com\/(in|pub)\/[A-Za-z0-9\-_%]+\/?$/i.test(url);
}
const isValidGitHubURL = (url: string) => {
  return /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9\-_.]+\/?$/i.test(url);
}
const isValidPersonIntroduction = (text: string) => {
  return text.trim().length >= 20 && text.trim().length <= 500;
}

export default function CareersPage() {
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState<ApplicationForm>({
    name: "",
    email: "",
    phone: "",
    position: "",
    linkedInURL:"",
    gitHubURL:"",
    personIntroduction: "",
    cv: null,
  });
  const { toast } = useToast();
  const[formErrors, setFormErrors] = useState<FormErrors>({});

  const fieldRefs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    linkedInURL: useRef<HTMLInputElement>(null),
    gitHubURL: useRef<HTMLInputElement>(null),
    personIntroduction: useRef<HTMLTextAreaElement>(null),
    cv: useRef<HTMLInputElement>(null),
  }


  const handleInputChange = (field: keyof ApplicationForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
      if (formErrors[field as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    // size cap (5 MB)
    if (file && file.size > 5 * 1024 * 1024) {
      setFormErrors((prev) => ({ ...prev, cv: "File size must be under 5 MB." }))
      return
    }
    if (file) {
      setFormErrors((prev) => ({ ...prev, cv: undefined }))
    }

    setFormData((prev) => ({ ...prev, cv: file }))
  };

  const fileToBase64DataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });

    const validateForm = (): { isValid: boolean; errors: FormErrors; firstErrorField?: keyof FormErrors } => {
    const errors: FormErrors = {}
    let firstErrorField: keyof FormErrors | undefined

    // Validate in order of appearance on form
    if (!formData.name.trim()) {
      errors.name = "Full name is required."
      if (!firstErrorField) firstErrorField = "name"
    } else if (!isValidFullName(formData.name)) {
      errors.name = "Please enter a valid full name with at least two words."
      if (!firstErrorField) firstErrorField = "name"
    }

    if (!formData.email.trim()) {
      errors.email = "Email address is required."
      if (!firstErrorField) firstErrorField = "email"
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Please enter a valid email address."
      if (!firstErrorField) firstErrorField = "email"
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required."
      if (!firstErrorField) firstErrorField = "phone"
    } else if (!isValidPhone(formData.phone)) {
      errors.phone = "Please enter a valid 10-digit phone number."
      if (!firstErrorField) firstErrorField = "phone"
    }

    if (!formData.linkedInURL.trim()) {
      errors.linkedInURL = "LinkedIn profile URL is required."
      if (!firstErrorField) firstErrorField = "linkedInURL"
    } else if (!isValidLinkedInURL(formData.linkedInURL)) {
      errors.linkedInURL = "Please enter a valid LinkedIn profile URL."
      if (!firstErrorField) firstErrorField = "linkedInURL"
    }

    if (!formData.gitHubURL.trim()) {
      errors.gitHubURL = "GitHub profile URL is required."
      if (!firstErrorField) firstErrorField = "gitHubURL"
    } else if (!isValidGitHubURL(formData.gitHubURL)) {
      errors.gitHubURL = "Please enter a valid GitHub profile URL."
      if (!firstErrorField) firstErrorField = "gitHubURL"
    }

    if (!formData.personIntroduction.trim()) {
      errors.personIntroduction = "Please tell us something interesting about yourself."
      if (!firstErrorField) firstErrorField = "personIntroduction"
    } else if (!isValidPersonIntroduction(formData.personIntroduction)) {
      errors.personIntroduction = "Please provide a brief introduction (20-500 characters)."
      if (!firstErrorField) firstErrorField = "personIntroduction"
    }

    if (!formData.cv) {
      errors.cv = "Please upload your CV/Resume."
      if (!firstErrorField) firstErrorField = "cv"
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      firstErrorField,
    }
  }  

  const handleSubmit = async (e: React.FormEvent, jobTitle: string) => {
    e.preventDefault();

    const validation = validateForm()

        if (!validation.isValid) {
      setFormErrors(validation.errors)

      // Focus the first field with an error
      if (validation.firstErrorField && fieldRefs[validation.firstErrorField]?.current) {
        fieldRefs[validation.firstErrorField].current?.focus()
        fieldRefs[validation.firstErrorField].current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }
      return
    }

    setIsSubmitting(true);

    try {
      const fileBase64 = await fileToBase64DataUrl(formData.cv!);

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        position: jobTitle,
        linkedInURL: formData.linkedInURL, 
        gitHubURL: formData.gitHubURL, 
        personIntroduction: formData.personIntroduction,
        cvFileName: formData.cv!.name,
        cvFileData: fileBase64,
        timestamp: new Date().toISOString(),
      };

      // TODO: paste your Web App "/exec" URL:
      const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyrfcDDgFPmzvrkvcVSvXY9ItHML0rQdyml4m7ncB2YNiWz6AlVYVnn38oMLam7Mt1b/exec";

      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        // IMPORTANT: text/plain avoids CORS preflight. We still send JSON inside.
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP ${response.status}: ${text.slice(0, 200)}`);
      }

      // Defensive parse (Apps Script sometimes returns text)
      const text = await response.text();
      let result: any;
      try {
        result = JSON.parse(text);
      } catch {
        throw new Error("Invalid JSON response from server.");
      }

      if (result?.success) {
        setShowSuccessModal(true);
        // reset
        setFormData({
          name: "",
          email: "",
          phone: "",
          position: "",
          linkedInURL: "", 
          gitHubURL: "", 
          personIntroduction : "",
          cv: null,
        });
        setFormErrors({});
        setExpandedJob(null);
      } else {
        throw new Error(result?.message || "Submission failed");
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Error",
    } catch (error: unknown) {
      console.error("Submission error:", error);
      let errorMessage = "There was an error submitting your application. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({
        title: "Submission Error",
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleForm = (jobId: number, jobTitle: string) => {
    if (expandedJob === jobId) {
      setExpandedJob(null);
    } else {
      setExpandedJob(jobId);
      setFormData((prev) => ({ ...prev, position: jobTitle }));
      setFormErrors({})
    }
  };

  const SuccessModal = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 max-w-md w-full mx-4 text-center shadow-2xl">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Application Submitted!</h2>
          <p className="text-slate-300">Thank you for your application. We'll review it and get back to you soon.</p>
        </div>
        <Button onClick={() => setShowSuccessModal(false)} className="w-full">
          Close
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-n-8">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 via-purple-900/10 to-transparent pointer-events-none" />
        <Header />
        <div className="relative">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="text-center mb-12 space-y-4 mt-12">
              <h1 className="text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                Join Our Team
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Help us shape the future of digital experiences. We're looking for talented individuals to join our
                growing team.
              </p>
              <div className="flex items-center justify-center gap-8 mt-8">
                <div className="flex items-center gap-2 text-slate-300">
                  <Users className="h-5 w-5 text-indigo-400" />
                  <span>{jobs.length} Open Positions</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="h-5 w-5 text-indigo-400" />
                  <span>Remote & Hybrid Options </span>
                </div>
              </div>

                    {/* <div className="mt-6 flex justify-center">
                      <Button onClick={testSendToAppsScript} variant="ghost">
                        Run Frontend Test
                      </Button>
                    </div> */}
                  

            </div>

            {jobs.map((job) => {
              const IconComponent = job.icon;
              return (
                <Card key={job.id} className="mb-8">
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-lg bg-[#1a1825] border border-[#2a2438] shadow-lg">
                          <IconComponent className={`w-6 h-6 ${job.color}`} />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-white">{job.title}</h2>
                          <p className="text-slate-400 text-sm mt-1">{job.department}</p>
                        </div>
                      </div>

                      <Button onClick={() => toggleForm(job.id, job.title)} variant="ghost" className="hover:scale-105 transform transition-all">
                        
                        Apply Now
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm mt-4">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50">
                        <Clock className="w-4 h-4 text-indigo-400" />
                        <span className="text-slate-300">{job.type}</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50">
                        <MapPin className="w-4 h-4 text-indigo-400" />
                        <span className="text-slate-300">{job.location}</span>
                      </div>
                    </div>

                    {expandedJob === job.id && (
                      <div className="mt-8 space-y-8">
                        <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700/50">
                          <p className="text-slate-300 leading-relaxed mb-6">{job.description}</p>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-white font-semibold mb-3">Requirements</h4>
                              <ul className="space-y-2">
                                {job.requirements.map((req: string, i: number) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                    {req}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-white font-semibold mb-3">Preferred</h4>
                              <ul className="space-y-2">
                                {job.preferred.map((pref: string, i: number) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                    <div className="h-4 w-4 rounded-full border-2 border-indigo-400 mt-0.5 shrink-0" />
                                    {pref}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700/50">
                          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                            <Upload className="h-5 w-5 text-indigo-400" />
                            Application Form
                          </h3>

                          <form onSubmit={(e) => handleSubmit(e, job.title)}  className="space-y-6" noValidate>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="name" className="text-slate-300">
                                  Full Name *
                                </Label>
                                <Input
                                  ref={fieldRefs.name}
                                  id="name"
                                  value={formData.name}
                                  onChange={(e) => handleInputChange("name", e.target.value)}
                                  placeholder="Enter your full name"
                                  error={!!formErrors.name}
                                />
                                <ErrorMessage message={formErrors.name} />
                              </div>

                              <div>
                                <Label htmlFor="email" className="text-slate-300">
                                  Email Address *
                                </Label>
                                <Input
                                  ref={fieldRefs.email}
                                  id="email"
                                  type="email"
                                  value={formData.email}
                                  onChange={(e) => handleInputChange("email", e.target.value)}
                                  placeholder="Enter your email"
                                  error={!!formErrors.email}
                                />
                               <ErrorMessage message={formErrors.email} />
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="phone" className="text-slate-300">
                                Phone Number *
                              </Label>
                              <Input
                                ref={fieldRefs.phone}
                                id="phone"
                                type="tel"
                                inputMode="numeric"
                                pattern="\d{10}"
                                maxLength={10}
                                value={formData.phone}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                placeholder="Enter your phone number"
                                error={!!formErrors.phone}
                              />
                              <ErrorMessage message={formErrors.phone} />
                            </div>

                            <div>
                              <Label htmlFor="position" className="text-slate-300">
                                Position
                              </Label>
                              <Input id="position" value={formData.position} readOnly className="bg-slate-800/50 border-slate-600 text-slate-300" />
                            </div>

                            <div>
                              <Label htmlFor="linkedInURL" className="text-slate-300">
                                LinkedIn Profile URL *
                              </Label>
                              <Input 
                              ref={fieldRefs.linkedInURL}
                              id="linkedInURL" 
                              value={formData.linkedInURL} 
                              onChange={(e) => handleInputChange("linkedInURL", e.target.value)}
                              placeholder="Enter your LinkedIn profile URL"
                              className="bg-slate-800/50 border-slate-600 text-slate-300" 
                              error={!!formErrors.linkedInURL}
                              />
                              <ErrorMessage message={formErrors.linkedInURL} />
                            </div>

                            <div>
                              <Label htmlFor="gitHubURL" className="text-slate-300">
                                GitHub URL *
                              </Label>
                              <Input 
                              ref={fieldRefs.gitHubURL}
                              id="gitHubURL" 
                              value={formData.gitHubURL} 
                              onChange={(e) => handleInputChange("gitHubURL", e.target.value)}
                              placeholder="Enter your GitHub profile URL"
                              className="bg-slate-800/50 border-slate-600 text-slate-300" 
                              error={!!formErrors.gitHubURL}
                              />
                              <ErrorMessage message={formErrors.gitHubURL} />
                              
                            </div>

                            <div>
                              <Label htmlFor="personIntroduction" className="text-slate-300">
                                Tell Us Something Interesting About You *
                              </Label>
                              <Textarea
                                ref={fieldRefs.personIntroduction}
                                id="personIntroduction"
                                placeholder="Please provide a brief insight about yourself that is not included in your CV focus on unique experiences, qualities, or achievements that highlight your individuality."
                                value={formData.personIntroduction}
                                onChange={(e) => handleInputChange("personIntroduction", e.target.value)}
                                rows={6}
                                error={!!formErrors.personIntroduction}
                              />
                              <ErrorMessage message={formErrors.personIntroduction} />
                            </div>

                            <div>
                              <Label htmlFor="cv" className="text-slate-300">
                                Upload CV/Resume *
                              </Label>
                              <div className="mt-1">
                                <Input
                                  ref={fieldRefs.cv}
                                  id="cv"
                                  type="file"
                                  accept=".pdf,.doc,.docx"
                                  onChange={handleFileChange}
                                  required
                                  className={`file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 ${formErrors.cv? "border-red-500" : ""}`}
                                />
                              </div>
                              <p className="text-xs text-slate-500 mt-1">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
                              <ErrorMessage message={formErrors.cv} />
                            </div>

                            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                              {isSubmitting ? (
                                <>
                                  <Upload className="mr-2 h-4 w-4 animate-spin" />
                                  Submitting Application...
                                </>
                              ) : (
                                <>
                                  <Upload className="mr-2 h-4 w-4" />
                                  Submit Application
                                </>
                              )}
                            </Button>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {showSuccessModal && <SuccessModal />}
      </div>
      <Footer />
    </>
  );
}
// // For testing only — small valid PDF saying "Hello PDF"
// const smallPdfBase64 =
//   "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9UeXBlL0V4dGVuZGVkRmlsZQovU3VidHlwZS9hcHBsaWNhdGlvbi9wZGYKL05hbWVzWyhUZXN0KV0KL0xlbmd0aCAxMDYKL0ZpbHRlci9GbGF0ZURlY29kZT4+CnN0cmVhbQp4nF2PsQ2AMAwEw+v9T1FCEIfCCaC0lIhAC3dP7Wz4SQ9r1Ry/NmAwcMDZL6KZicjyyz8gGHrjtSPkRFUGeUQ3fr5DVz6NFFYUV7GLRsaGVsbG8gUERGCl0KZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgNAowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAxMTIgMDAwMDAgbiAKMDAwMDAwMDE5MyAwMDAwMCBuIAowMDAwMDAwMzAwIDAwMDAwIG4gCnRyYWlsZXIKPDwvU2l6ZSA0Ci9Sb290IDMgMCBSPj4Kc3RhcnR4cmVmCjMxOQolJUVPRg==";

// async function testSendToAppsScript() {
//   const payload = {
//     name: "Frontend Test User",
//     email: "frontend@example.com",
//     phone: "+9876543210",
//     position: "Test Position",
//     personIntroduction: "This is a frontend-triggered test.",
//     cvFileName: "frontend-test.pdf",
//     cvFileData: smallPdfBase64,
//     timestamp: new Date().toISOString(),
//   };

//   const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxQQw6AJUwCK-5arJ1Q0VLB3ROnkz83gnEEB_NLtEv1K5JUGYO45tb1Zm1LDA0H12nF/exec";

//   try {
//     const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
//       method: "POST",
//       headers: { "Content-Type": "text/plain;charset=utf-8" },
//       body: JSON.stringify(payload),
//     });

//     const text = await response.text();
//     console.log("Raw response:", text);

//     let result;
//     try {
//       result = JSON.parse(text);
//     } catch {
//       throw new Error("Invalid JSON from server");
//     }

//     if (result.success) {
//       console.log("✅ Success:", result);
//       alert("Test submission succeeded!");
//     } else {
//       console.error("❌ Failed:", result);
//       alert("Test submission failed: " + (result.message || "Unknown error"));
//     }
//   } catch (err) {
//     console.error("⚠️ Error sending test:", err);
//     alert("Error: " + err.message);
//   }
// }

// <Button onClick={testSendToAppsScript} className="mt-4">
//   Run Frontend Test
// </Button>
