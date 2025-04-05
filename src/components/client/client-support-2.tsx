"use client"

import React, { useEffect } from 'react'
import { Link, ChevronDown, Plus, FileText, Pencil, Clock, CheckCircle2, AlertCircle, Gavel, Folders, Code, Camera, Search, Filter, DollarSign, FileCheck, Building2, User, Mail, Phone, Calendar, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Client } from "@/data/clients"

interface TreatmentVisit {
  id: number
  date: string
  type: string
  facility: {
    name: string
    department: string
    level?: string
    address: string
    phone: string
    fax: string
    email: string
  }
  physician: {
    name: string
    specialty: string
    credentials: string[]
  }
  treatmentAreas: {
    name: string
    color: "blue" | "purple" | "green" | "orange"
  }[]
  summary: string
  description: string
  cost: number
  paid: boolean
  documents: {
    type: "record" | "bill"
    name: string
    date: string
    link: string
  }[]
}

interface CPTCode {
  code: string
  description: string
  amount: number
}

interface BillingDetail {
  id: number
  date: string
  originalBalance: number
  insurancePayment: number
  insuranceAdjustment: number
  firmAdjustment: number
  outstandingBalance: number
  cptCodes: CPTCode[]
  documents: {
    type: "record" | "bill"
    name: string
    date: string
    link: string
  }[]
}

interface MedicalRecord {
  id: number
  date: string
  provider: string
  type: string
  description: string
  injuries: string[]
  recommendations: string
  additionalNotes?: string
  billing?: BillingDetail
  cptCodes?: CPTCode[]
}

interface ClientSupport2Props {
  client: Client
  activeTab: string
}

export function ClientSupport2({ client, activeTab }: ClientSupport2Props) {
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null)
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null)
  const [selectedTask, setSelectedTask] = useState<number | null>(null)
  const [selectedLog, setSelectedLog] = useState<number | null>(null)
  const [selectedDocument, setSelectedDocument] = useState<number | null>(null)
  const [selectedVisit, setSelectedVisit] = useState<number | null>(null)
  const [selectedTreatmentTab, setSelectedTreatmentTab] = useState('plan')
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    quickLinks: true,
    billing: true,
    contact: true,
    medicalRecords: true,
    treatmentTimeline: true
  })

  // Auto-select first provider and visit when switching to medical-providers tab
  useEffect(() => {
    if (activeTab === 'medical-providers') {
      if (medicalProviders.length > 0 && selectedProvider === null) {
        setSelectedProvider(medicalProviders[0].id);
      }
      if (treatmentVisits.length > 0 && selectedVisit === null) {
        setSelectedVisit(treatmentVisits[0].id);
      }
    }
  }, [activeTab]);

  // Auto-select first request when switching to medical-requests tab
  useEffect(() => {
    if (activeTab === 'medical-requests' && medicalRequests.length > 0 && selectedRequest === null) {
      setSelectedRequest(medicalRequests[0].id);
    }
  }, [activeTab]);

  // Auto-select first task when switching to tasks tab
  useEffect(() => {
    if (activeTab === 'tasks' && tasks.length > 0 && selectedTask === null) {
      setSelectedTask(tasks[0].id);
    }
  }, [activeTab]);

  // Auto-select first log when switching to case-logs tab
  useEffect(() => {
    if (activeTab === 'case-logs' && caseLogs.length > 0 && selectedLog === null) {
      setSelectedLog(caseLogs[0].id);
    }
  }, [activeTab]);

  // Auto-select first document when switching to documents tab
  useEffect(() => {
    if (activeTab === 'documents' && documents.length > 0 && selectedDocument === null) {
      setSelectedDocument(documents[0].id);
    }
  }, [activeTab]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // Function to navigate between visits for current provider
  const navigateVisit = (direction: 'prev' | 'next') => {
    if (!selectedVisit) return;
    
    const currentVisit = treatmentVisits.find(v => v.id === selectedVisit);
    if (!currentVisit) return;

    // Filter visits for current provider
    const providerVisits = treatmentVisits.filter(
      v => v.facility.name === currentVisit.facility.name
    );
    
    const currentIndex = providerVisits.findIndex(v => v.id === selectedVisit);
    if (currentIndex === -1) return;
    
    if (direction === 'prev' && currentIndex > 0) {
      setSelectedVisit(providerVisits[currentIndex - 1].id);
    } else if (direction === 'next' && currentIndex < providerVisits.length - 1) {
      setSelectedVisit(providerVisits[currentIndex + 1].id);
    }
  };

  // Sample medical providers data
  const medicalProviders = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Orthopedic Surgeon",
      practice: "Miami Orthopedic Center",
      address: "123 Medical Plaza, Miami, FL 33131",
      phone: "(305) 555-0123",
      email: "sjohnson@miamiortho.com",
      fax: "(305) 555-0124",
      npi: "1234567890",
      status: "Active",
      notes: "Specializes in sports injuries and joint replacements"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Physical Therapist",
      practice: "Miami Physical Therapy",
      address: "456 Health Ave, Miami, FL 33132",
      phone: "(305) 555-0234",
      email: "mchen@miamipt.com",
      fax: "(305) 555-0235",
      npi: "0987654321",
      status: "Active",
      notes: "Expert in rehabilitation and sports medicine"
    }
  ]

  // Update the medical requests data
  const medicalRequests = [
    {
      id: 1,
      type: "Medical Record",
      provider: "Advent Health Hospital-Fletcher",
      requestedBy: "Tom Henry",
      requestedDate: "03/15/2024",
      status: "Pending",
      notes: "Initial emergency room visit records and imaging results"
    },
    {
      id: 2,
      type: "Medical Bill",
      provider: "Advanced Wellness & Rehabilitation",
      requestedBy: "Tom Henry",
      requestedDate: "03/18/2024",
      status: "Received",
      notes: "Physical therapy sessions billing from 03/18 to 03/25"
    },
    {
      id: 3,
      type: "PIP Log",
      provider: "State Farm Insurance",
      requestedBy: "Tom Henry",
      requestedDate: "03/20/2024",
      status: "Processing",
      notes: "Updated PIP log showing remaining benefits and processed claims"
    },
    {
      id: 4,
      type: "Insurance Policy",
      provider: "Progressive Insurance",
      requestedBy: "Tom Henry",
      requestedDate: "03/20/2024",
      status: "Pending",
      notes: "Complete policy documentation including coverage limits"
    },
    {
      id: 5,
      type: "Medical Record",
      provider: "Tampa Bay Imaging",
      requestedBy: "Tom Henry",
      requestedDate: "03/20/2024",
      status: "Received",
      notes: "MRI results and radiologist interpretation"
    },
    {
      id: 6,
      type: "Medical Bill",
      provider: "Genisis Brain Institute",
      requestedBy: "Tom Henry",
      requestedDate: "03/25/2024",
      status: "Processing",
      notes: "Neurological evaluation and treatment billing"
    }
  ];

  // Update the tasks data structure
  const tasks = [
    {
      id: 1,
      title: "Move Folder",
      dueDate: null,
      responsible: {
        name: "Michelle O'bonnon",
        role: "Case Manager",
        avatar: "👩‍💼"
      },
      status: "overdue"
    },
    {
      id: 2,
      title: "Intake #1 Form",
      dueDate: "12/3/2024",
      responsible: {
        name: "Craig Astrin",
        role: "Lead Attorney",
        avatar: "👨‍⚖️"
      },
      status: "completed"
    },
    {
      id: 3,
      title: "Intake #2 Long Form",
      dueDate: "12/3/2024",
      responsible: {
        name: "Michelle O'bonnon",
        role: "Paralegal",
        avatar: "👩‍💼"
      },
      status: "overdue"
    },
    {
      id: 4,
      title: "Request Medical Records",
      dueDate: "12/15/2024",
      responsible: {
        name: "Tom Henry",
        role: "Case Manager",
        avatar: "👨‍💼"
      },
      status: "pending"
    },
    {
      id: 5,
      title: "Draft Demand Letter",
      dueDate: "12/20/2024",
      responsible: {
        name: "Craig Astrin",
        role: "Lead Attorney",
        avatar: "👨‍⚖️"
      },
      status: "pending"
    }
  ];

  // Update the case logs data
  const caseLogs = [
    {
      id: 1,
      title: "Accident Occurred",
      notes: "—",
      document: "—",
      date: "10/16/2024",
      type: "Milestone"
    },
    {
      id: 2,
      title: "Intake #1 Form",
      notes: "Marked complete by...",
      document: "[Link to Dropbox](http...",
      date: "1/22/2025",
      type: "Task"
    },
    {
      id: 3,
      title: "Client Events Cal",
      notes: "Marked complete by...",
      document: "[Link to Calendar](http...",
      date: "1/22/2025",
      type: "Task"
    },
    {
      id: 4,
      title: "Liability Determined",
      notes: "Completion Time Update...",
      document: "Full",
      date: "1/22/2025",
      type: "Task"
    },
    {
      id: 5,
      title: "Assigns CM + Attny",
      notes: "Marked completed by...",
      document: "CM: Claire Case Mana...",
      date: "1/22/2025",
      type: "Task"
    },
    {
      id: 6,
      title: "BI Limits",
      notes: "Completion Time Update...",
      document: "$500k CSL, $50k/100k",
      date: "1/22/2025",
      type: "Task"
    },
    {
      id: 7,
      title: "Dropbox F...",
      notes: "Completion Time Update...",
      document: "[Link to Dropbox](http...",
      date: "1/22/2025",
      type: "Task"
    },
    {
      id: 8,
      title: "LOR sent to Insurance",
      notes: "Completion Time Update...",
      document: "—",
      date: "1/22/2025",
      type: "Task"
    },
    {
      id: 9,
      title: "UM Limits",
      notes: "Completion Time Update...",
      document: "$5MM CSL",
      date: "1/22/2025",
      type: "Task"
    },
    {
      id: 10,
      title: "Statue of Limitations",
      notes: "—",
      document: "—",
      date: "10/16/2025",
      type: "Deadline"
    }
  ];

  // Add documents data
  const documents = [
    {
      id: 1,
      title: "Intake #2 Law Form",
      description: "Description Regarding this document",
      icon: "✍️"
    },
    {
      id: 2,
      title: "Dropbox Folder",
      description: "Description Regarding this document",
      icon: "📁"
    },
    {
      id: 3,
      title: "Thank you Letter",
      description: "Description Regarding this document",
      icon: "📄"
    },
    {
      id: 4,
      title: "Accident photos Rec",
      description: "Description Regarding this document",
      icon: "📸"
    }
  ];

  // Sample treatment visits data
  const treatmentVisits: TreatmentVisit[] = [
    {
      id: 1,
      date: "03/15/2024",
      type: "Emergency Visit",
      facility: {
        name: "Advent Health Hospital-Fletcher",
        department: "Emergency Department",
        level: "Level II Trauma Center",
        address: "3100 E. Fletcher Ave, Tampa, FL 33613",
        phone: "(813) 971-6000",
        fax: "(813) 971-6001",
        email: "records@adventhealth-fletcher.com"
      },
      physician: {
        name: "Dr. Sarah Johnson, MD",
        specialty: "Emergency Medicine",
        credentials: ["Board Certified"]
      },
      treatmentAreas: [
        { name: "Emergency Medicine", color: "blue" },
        { name: "Trauma Care", color: "purple" },
        { name: "Diagnostic Imaging", color: "green" }
      ],
      summary: "Patient underwent initial evaluation following MVA. Diagnostic imaging revealed cervical strain and potential nerve impingement. Treatment focused on acute pain management and stabilization. Recommended follow-up with specialists for comprehensive treatment plan.",
      description: "Initial emergency room visit following MVA. Patient presented with acute cervical strain and head injury.",
      cost: 12500.00,
      paid: false,
      documents: [
        {
          type: "record",
          name: "ER Visit Summary",
          date: "03/15/2024",
          link: "/documents/er-visit-1"
        },
        {
          type: "bill",
          name: "ER Services Bill",
          date: "03/15/2024",
          link: "/documents/er-bill-1"
        }
      ]
    },
    {
      id: 2,
      date: "03/18/2024",
      type: "Initial Evaluation",
      facility: {
        name: "Advanced Wellness & Rehabilitation",
        department: "Physical Therapy",
        level: "Outpatient Facility",
        address: "2205 N West Shore Blvd, Tampa, FL 33607",
        phone: "(813) 555-0123",
        fax: "(813) 555-0124",
        email: "records@advancedwellness.com"
      },
      physician: {
        name: "Dr. Michael Chen, DPT",
        specialty: "Physical Therapy",
        credentials: ["Board Certified", "Manual Therapy Certified"]
      },
      treatmentAreas: [
        { name: "Physical Therapy", color: "blue" },
        { name: "Manual Therapy", color: "purple" },
        { name: "Rehabilitation", color: "green" }
      ],
      summary: "Mr. Goulbourne was recommended for and underwent diagnostic cervical facet joint injections at left C3-4, C4-5, C5-6, and C6-7 for the diagnoses of post traumatic cervicalgia. He also was recommended for and underwent left S1 selective nerve root block due to radiculopathy.",
      description: "Initial physical therapy evaluation and treatment plan development.",
      cost: 4800.00,
      paid: false,
      documents: [
        {
          type: "record",
          name: "PT Initial Evaluation",
          date: "03/18/2024",
          link: "/documents/pt-eval-1"
        },
        {
          type: "bill",
          name: "PT Services Bill",
          date: "03/18/2024",
          link: "/documents/pt-bill-1"
        }
      ]
    },
    {
      id: 3,
      date: "03/20/2024",
      type: "Diagnostic Imaging",
      facility: {
        name: "Tampa Bay Imaging",
        department: "Radiology",
        level: "Advanced Imaging Center",
        address: "4600 N Habana Ave, Tampa, FL 33614",
        phone: "(813) 555-0125",
        fax: "(813) 555-0126",
        email: "records@tampabayimaging.com"
      },
      physician: {
        name: "Dr. Emily Rodriguez, MD",
        specialty: "Radiology",
        credentials: ["Board Certified", "Neuroradiology Fellowship"]
      },
      treatmentAreas: [
        { name: "Diagnostic Imaging", color: "blue" },
        { name: "Radiology", color: "purple" }
      ],
      summary: "Comprehensive diagnostic imaging session including cervical spine MRI and brain MRI with and without contrast. Studies revealed cervical disc bulging at C5-C6 with mild neural foraminal narrowing. Brain MRI showed no acute intracranial abnormalities.",
      description: "MRI studies of cervical spine and brain.",
      cost: 3200.00,
      paid: false,
      documents: [
        {
          type: "record",
          name: "MRI Report",
          date: "03/20/2024",
          link: "/documents/mri-report-1"
        },
        {
          type: "bill",
          name: "Imaging Services Bill",
          date: "03/20/2024",
          link: "/documents/imaging-bill-1"
        }
      ]
    }
  ]

  // Sample medical records data
  const medicalRecords: MedicalRecord[] = [
    {
      id: 1,
      date: "March 15, 2024",
      provider: "Advent Health Hospital-Fletcher",
      type: "Emergency Room Visit",
      description: "Initial emergency room visit following the motor vehicle collision with Walmart Transportation LLC semi-truck. Patient presented with acute injuries and was evaluated by the ER team.",
      injuries: [
        "Cervical strain, acute",
        "Injury of head",
        "Epistaxis (nosebleed)",
        "Muscle strain of the chest wall"
      ],
      recommendations: "The attending provider, Jamie Lynn Kazar, PA-C, recommended a treatment plan that included muscle relaxers and ibuprofen for pain management. Ms. Walker was advised to follow up with her primary care provider within the next 2-3 days.",
      additionalNotes: "Initial imaging studies were performed to rule out acute trauma. Patient was discharged with prescribed medications and specific follow-up instructions. All documentation and billing records are available in the attached reports.",
      cptCodes: [
        { code: "99283", description: "Emergency dept visit, moderate severity", amount: 750.00 },
        { code: "72040", description: "X-ray exam of neck spine", amount: 250.00 },
        { code: "70450", description: "CT head/brain w/o dye", amount: 1200.00 }
      ],
      billing: {
        id: 1,
        date: "March 15, 2024",
        originalBalance: 2200.00,
        insurancePayment: 1100.00,
        insuranceAdjustment: 550.00,
        firmAdjustment: 200.00,
        outstandingBalance: 350.00,
        cptCodes: [
          { code: "99283", description: "Emergency dept visit, moderate severity", amount: 750.00 },
          { code: "72040", description: "X-ray exam of neck spine", amount: 250.00 },
          { code: "70450", description: "CT head/brain w/o dye", amount: 1200.00 }
        ],
        documents: [
          {
            type: "record",
            name: "ER Visit Report",
            date: "March 15, 2024",
            link: "/documents/er-report-123.pdf"
          },
          {
            type: "bill",
            name: "ER Visit Bill",
            date: "March 15, 2024",
            link: "/documents/er-bill-123.pdf"
          }
        ]
      }
    },
    {
      id: 2,
      date: "March 18, 2024",
      provider: "Advanced Wellness & Rehabilitation Center",
      type: "Physical Therapy",
      description: "Patient began comprehensive physical therapy and rehabilitation program. Initial evaluation revealed significant cervical and thoracic dysfunction with associated muscular guarding and restricted range of motion.",
      injuries: [
        "Persistent cervical strain",
        "Post-traumatic headaches",
        "Thoracic muscle strain"
      ],
      recommendations: "Treatment plan includes physical therapy sessions 3 times per week for 4 weeks, focusing on manual therapy, therapeutic exercises, and neuromuscular re-education. Patient was also provided with a home exercise program to complement in-clinic treatments.",
      additionalNotes: "Patient reports consistent 7/10 pain levels in cervical region with radiation into bilateral upper trapezius. Treatment response has been positive with noted improvements in range of motion following each session."
    }
  ]

  // Safety check for client
  if (!client) {
    return <div className="p-6 text-center text-gray-500">No client data available</div>;
  }

  return (
    <div className="bg-[#1E293B] rounded-lg overflow-hidden">
      <div className="p-6">
        {/* Medical Providers Tab Content */}
        {activeTab === 'medical-providers' && (
          <div className="flex gap-8">
            {/* Left panel - Treatment Visits */}
            <div className="w-1/2">
              <div className="mb-6">
                <h2 className="text-[14px] font-medium text-[#EDF2FF] mb-1">Treatment Visits</h2>
                <p className="text-[12px] text-[#ADB5BD]">View and manage all treatment visits. Click on each visit to see detailed information.</p>
              </div>

              {/* Visit cards */}
              <div className="space-y-2">
                {treatmentVisits.map((visit) => (
                  <div
                    key={visit.id}
                    onClick={() => setSelectedVisit(visit.id)}
                    className={`flex items-center justify-between p-4 bg-[#151F2D] rounded-xl cursor-pointer ${
                      selectedVisit === visit.id ? 'border-l-2 border-[#228BE6]' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-[#374151] rounded-full flex items-center justify-center text-[#E6E0E9]">
                        🏥
                      </div>
                      <div>
                        <h3 className="text-[16px] font-medium text-[#E6E0E9]">{visit.facility.name}</h3>
                        <p className="text-[14px] text-[#ADB5BD]">{visit.date}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs ${
                      visit.paid ? 'bg-green-900/50 text-green-400' : 'bg-yellow-900/50 text-yellow-400'
                    }`}>
                      {visit.paid ? 'Paid' : 'Pending Insurance'}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add visit button */}
              <button className="w-full mt-4 flex items-center justify-between px-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-[12px] text-[#767778]">
                <span>Add New Visit</span>
                <Plus size={12} className="text-[#767778]" />
              </button>
            </div>

            {/* Right panel - Visit Details */}
            <div className="w-1/2">
              {selectedVisit ? (
                <div className="space-y-4">
                  {/* Treatment Summary */}
                  <div className="bg-[#151F2D] rounded-lg overflow-hidden mb-4">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-[16px] font-medium text-white">Treatment Summary</h2>
                        <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-2">
                          Review Latest Medical Record
                          <FileText size={14} />
                        </button>
                      </div>

                      {/* Visit Frequency Information */}
                      <div className="bg-[#1F2937] rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-[14px] text-[#E6E0E9] font-medium">Latest Treatment</h3>
                            <p className="text-[12px] text-[#ADB5BD]">{treatmentVisits.find(v => v.id === selectedVisit)?.date}</p>
                          </div>
                          <div className="text-right">
                            <h3 className="text-[14px] text-[#E6E0E9] font-medium">Number of Visits</h3>
                            <p className="text-[12px] text-[#ADB5BD]">3 visits</p>
                          </div>
                        </div>
                      </div>

                      {/* Tab Navigation */}
                      <div className="flex border-b border-gray-700 mb-4">
                        <button
                          onClick={() => setSelectedTreatmentTab('plan')}
                          className={`px-4 py-2 text-sm font-medium ${
                            selectedTreatmentTab === 'plan'
                              ? 'text-blue-400 border-b-2 border-blue-400'
                              : 'text-gray-400 hover:text-gray-300'
                          }`}
                        >
                          Treatment Plan
                        </button>
                        <button
                          onClick={() => setSelectedTreatmentTab('details')}
                          className={`px-4 py-2 text-sm font-medium ${
                            selectedTreatmentTab === 'details'
                              ? 'text-blue-400 border-b-2 border-blue-400'
                              : 'text-gray-400 hover:text-gray-300'
                          }`}
                        >
                          Visit Details
                        </button>
                        <button
                          onClick={() => setSelectedTreatmentTab('codes')}
                          className={`px-4 py-2 text-sm font-medium ${
                            selectedTreatmentTab === 'codes'
                              ? 'text-blue-400 border-b-2 border-blue-400'
                              : 'text-gray-400 hover:text-gray-300'
                          }`}
                        >
                          Billing Codes
                        </button>
                      </div>

                      {/* Tab Content */}
                      <div className="mt-4">
                        {(() => {
                          const visit = treatmentVisits.find(v => v.id === selectedVisit);
                          if (!visit) return null;

                          switch (selectedTreatmentTab) {
                            case 'plan':
                              return (
                                <div className="space-y-4">
                                  {/* Treatment Plan */}
                                  <div className="space-y-4">
                                    {/* Cervical Strain */}
                                    <div className="bg-[#1F2937] rounded-lg p-4">
                                      <h3 className="text-[14px] text-[#E6E0E9] font-medium mb-2">Cervical Strain</h3>
                                      <p className="text-[12px] text-[#ADB5BD] leading-relaxed">
                                        Treatment includes manual therapy, therapeutic exercises, and neuromuscular re-education. 
                                        Focus on improving range of motion and reducing muscle guarding in cervical region.
                                      </p>
                                    </div>

                                    {/* Post-traumatic Headaches */}
                                    <div className="bg-[#1F2937] rounded-lg p-4">
                                      <h3 className="text-[14px] text-[#E6E0E9] font-medium mb-2">Post-traumatic Headaches</h3>
                                      <p className="text-[12px] text-[#ADB5BD] leading-relaxed">
                                        Management through cervical spine mobilization, postural education, and stress reduction techniques. 
                                        Includes home exercise program for sustained relief.
                                      </p>
                                    </div>

                                    {/* Thoracic Muscle Strain */}
                                    <div className="bg-[#1F2937] rounded-lg p-4">
                                      <h3 className="text-[14px] text-[#E6E0E9] font-medium mb-2">Thoracic Muscle Strain</h3>
                                      <p className="text-[12px] text-[#ADB5BD] leading-relaxed">
                                        Focused on therapeutic exercises and manual therapy to address muscle tension and improve mobility. 
                                        Includes progressive strengthening program.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );

                            case 'details':
                              const currentVisit = treatmentVisits.find(v => v.id === selectedVisit);
                              if (!currentVisit) return null;

                              // Filter visits for current provider
                              const providerVisits = treatmentVisits.filter(
                                v => v.facility.name === currentVisit.facility.name
                              );
                              const currentIndex = providerVisits.findIndex(v => v.id === selectedVisit);

                              return (
                                <div className="space-y-4">
                                  {/* Visit Navigation */}
                                  <div className="flex items-center justify-between mb-6">
                                    <button
                                      onClick={() => navigateVisit('prev')}
                                      className={`p-2 rounded-full ${
                                        currentIndex > 0
                                          ? 'text-blue-400 hover:bg-blue-400/10'
                                          : 'text-gray-600 cursor-not-allowed'
                                      }`}
                                      disabled={currentIndex === 0}
                                    >
                                      <ChevronDown className="w-5 h-5 transform rotate-90" />
                                    </button>
                                    <div className="text-center">
                                      <p className="text-[14px] text-[#E6E0E9] font-medium">{visit.date}</p>
                                    </div>
                                    <button
                                      onClick={() => navigateVisit('next')}
                                      className={`p-2 rounded-full ${
                                        currentIndex < providerVisits.length - 1
                                          ? 'text-blue-400 hover:bg-blue-400/10'
                                          : 'text-gray-600 cursor-not-allowed'
                                      }`}
                                      disabled={currentIndex === providerVisits.length - 1}
                                    >
                                      <ChevronDown className="w-5 h-5 transform -rotate-90" />
                                    </button>
                                  </div>

                                  {/* Visit Summary */}
                                  <div className="bg-[#1F2937] rounded-lg p-4">
                                    <p className="text-[14px] leading-relaxed text-[#E6E0E9]">
                                      {visit.summary}
                                    </p>
                                  </div>
                                </div>
                              );

                            case 'codes':
                              return (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-2">
                                      <span className="text-[12px] text-[#ADB5BD]">CPT Code</span>
                                    </div>
                                    <div className="text-right">
                                      <span className="text-[12px] text-[#ADB5BD]">Description</span>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    {[
                                      { code: '99283', description: 'Emergency Department Visit, Moderate Severity' },
                                      { code: '72040', description: 'X-ray Examination of Neck/Cervical Spine' },
                                      { code: '73630', description: 'X-ray Examination of Foot' },
                                      { code: '97110', description: 'Therapeutic Exercise' },
                                      { code: '97140', description: 'Manual Therapy Techniques' }
                                    ].map((code, index) => (
                                      <div key={index} className="grid grid-cols-3 gap-4 items-center py-2 border-b border-gray-700">
                                        <div className="col-span-2">
                                          <span className="text-[#E6E0E9] font-mono">{code.code}</span>
                                        </div>
                                        <div className="text-right">
                                          <span className="text-[#E6E0E9] text-sm">{code.description}</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );

                            default:
                              return null;
                          }
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* Financial Information */}
                  <div className="bg-[#151F2D] rounded-lg overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-[16px] font-medium text-white">Financial Information</h2>
                        <button 
                          className="flex items-center gap-2 px-3 py-1.5 bg-[#1F2937] hover:bg-[#374151] rounded-lg text-[#E6E0E9] text-sm transition-colors"
                          onClick={() => {
                            // Handle viewing latest bill
                            window.open('/documents/latest-bill.pdf', '_blank');
                          }}
                        >
                          <FileText size={14} />
                          View Latest Bill
                        </button>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-[#ADB5BD]">Original Balance</span>
                          <span className="text-[#E6E0E9]">$2500.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#ADB5BD]">Insurance Payment</span>
                          <span className="text-green-400">-$1500.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#ADB5BD]">Insurance Adjustment</span>
                          <span className="text-blue-400">-$500.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#ADB5BD]">Firm Adjustment</span>
                          <span className="text-yellow-400">-$250.00</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-[#374151]">
                          <span className="text-[#ADB5BD]">Outstanding Balance</span>
                          <span className="text-[#E6E0E9]">$250.00</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-[#ADB5BD]">Status</span>
                          <span className="px-2 py-1 bg-yellow-900/50 text-yellow-400 rounded-full text-xs">
                            Pending Insurance
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Provider Information */}
                  {selectedVisit && treatmentVisits.find(v => v.id === selectedVisit) && (
                    <div className="bg-[#151F2D] rounded-lg overflow-hidden">
                      <div className="p-4">
                        <h2 className="text-[16px] font-medium text-white mb-4">Provider Information</h2>
                        <div className="space-y-4">
                          {(() => {
                            const visit = treatmentVisits.find(v => v.id === selectedVisit)!;
                            return (
                              <>
                                <div>
                                  <h3 className="text-[14px] text-[#ADB5BD] mb-2">Facility</h3>
                                  <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-[#374151] rounded-full flex items-center justify-center">
                                      🏥
                                    </div>
                                    <div>
                                      <span className="text-[#E6E0E9] text-[14px] font-medium">{visit.facility.name}</span>
                                      <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[12px] text-[#ADB5BD]">{visit.facility.department}</span>
                                        {visit.facility.level && (
                                          <>
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#374151]"></span>
                                            <span className="text-[12px] text-[#ADB5BD]">{visit.facility.level}</span>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <h3 className="text-[14px] text-[#ADB5BD] mb-2">Contact Information</h3>
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <Building2 size={14} className="text-gray-400" />
                                      <span className="text-[#E6E0E9] text-[14px]">{visit.facility.address}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Phone size={14} className="text-gray-400" />
                                      <span className="text-[#E6E0E9] text-[14px]">{visit.facility.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <FileText size={14} className="text-gray-400" />
                                      <span className="text-[#E6E0E9] text-[14px]">{visit.facility.fax}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Mail size={14} className="text-gray-400" />
                                      <span className="text-[#E6E0E9] text-[14px]">{visit.facility.email}</span>
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <h3 className="text-[14px] text-[#ADB5BD] mb-2">Treatment Area</h3>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    {visit.treatmentAreas.map((area, index: number) => (
                                      <div 
                                        key={index} 
                                        className={`px-3 py-1.5 bg-${area.color}-900/50 text-${area.color}-400 rounded-lg text-xs`}
                                      >
                                        {area.name}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Select a visit to view details
                </div>
              )}
            </div>
          </div>
        )}

        {/* Medical Requests Tab Content */}
        {activeTab === 'medical-requests' && (
          <div className="grid grid-cols-3 gap-6">
            {medicalRequests.map((request) => (
              <div
                key={request.id}
                className="bg-[#151F2D] rounded-lg p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-[16px] font-medium text-[#E6E0E9]">{request.type}</h3>
                    <p className="text-[14px] text-[#ADB5BD]">{request.provider}</p>
                  </div>
                  <span className="text-[14px] text-[#ADB5BD]">{request.requestedDate}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      request.status === 'Pending' ? 'bg-yellow-900/50 text-yellow-400' :
                      request.status === 'Received' ? 'bg-green-900/50 text-green-400' :
                      'bg-blue-900/50 text-blue-400' // Processing
                    }`}>
                      {request.status}
                    </span>
                  </div>

                  <p className="text-[14px] text-[#ADB5BD] leading-relaxed">
                    {request.notes}
                  </p>

                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#1F2937] text-[#E6E0E9] rounded-lg hover:bg-[#1A2736] transition-colors text-[14px]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Upload Files
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tasks Tab Content */}
        {activeTab === 'tasks' && (
          <div className="space-y-4">
            {/* Header with filters and controls */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Tasks</h2>
              <button className="px-4 py-2 bg-[#374151] text-white rounded-md hover:bg-[#4B5563] transition-colors">
                Add task
              </button>
            </div>

            {/* Status legend */}
            <div className="text-sm text-[#ADB5BD]">
              Green = Task Completed, Yellow = Task is due today and hasn't been completed, Red = Task is overdue
            </div>

            {/* Filter tabs */}
            <div className="flex items-center space-x-6 border-b border-[#374151] -mb-px">
              <button className="px-1 py-2 text-[#E6E0E9] border-b-2 border-[#228BE6]">All tasks</button>
              <button className="px-1 py-2 text-[#ADB5BD] hover:text-[#E6E0E9]">Overdue Tasks</button>
              <button className="px-1 py-2 text-[#ADB5BD] hover:text-[#E6E0E9]">Completed Tasks</button>
              <button className="px-1 py-2 text-[#ADB5BD] hover:text-[#E6E0E9]">Upcoming Tasks</button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-[#ADB5BD]">
                    <th className="py-3 px-4">Task</th>
                    <th className="py-3 px-4">Due Date</th>
                    <th className="py-3 px-4">Responsible</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr 
                      key={task.id}
                      className="border-l-4 border-transparent hover:bg-[#1F2937]"
                      style={{
                        borderLeftColor: task.status === 'completed' ? '#22C55E' : 
                                       task.status === 'overdue' ? '#EF4444' : 
                                       '#EAB308'
                      }}
                    >
                      <td className="py-2 px-4 text-[#E6E0E9]">{task.title}</td>
                      <td className="py-2 px-4 text-[#ADB5BD]">{task.dueDate || '—'}</td>
                      <td className="py-2 px-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 bg-[#374151] rounded-full flex items-center justify-center text-lg">
                            {task.responsible.avatar}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[#E6E0E9] text-sm">{task.responsible.name}</span>
                            <span className="text-[#4B5563] text-xs">{task.responsible.role}</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Logs Tab Content */}
        {activeTab === 'case-logs' && (
          <div className="bg-[#151F2D] rounded-lg p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Logs</h2>
              <div className="flex items-center gap-4">
                <button className="px-3 py-1 text-[#ADB5BD] hover:text-white">
                  Filter
                </button>
                <button className="px-3 py-1 text-[#ADB5BD] hover:text-white">
                  List
                </button>
                <button className="px-3 py-1 text-[#ADB5BD] hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <button className="px-4 py-2 bg-[#374151] text-white rounded-md hover:bg-[#4B5563] transition-colors">
                  Add Log
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#374151]">
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#ADB5BD]">Title</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#ADB5BD]">Notes</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#ADB5BD]">Document</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#ADB5BD]">Date ↑</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-[#ADB5BD]">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {caseLogs.map((log) => (
                    <tr 
                      key={log.id}
                      className="border-b border-[#374151] hover:bg-[#1E293B]"
                    >
                      <td className="py-3 px-4 text-[#E6E0E9]">{log.title}</td>
                      <td className="py-3 px-4 text-[#ADB5BD]">{log.notes}</td>
                      <td className="py-3 px-4">
                        {log.document !== "—" ? (
                          <span className="text-[#228BE6] hover:underline cursor-pointer">
                            {log.document}
                          </span>
                        ) : (
                          <span className="text-[#ADB5BD]">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-[#ADB5BD]">{log.date}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          log.type === 'Milestone' ? 'bg-blue-900/50 text-blue-400' :
                          log.type === 'Task' ? 'bg-green-900/50 text-green-400' :
                          'bg-red-900/50 text-red-400' // Deadline
                        }`}>
                          {log.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Documents Tab Content */}
        {activeTab === 'documents' && (
          <div className="bg-[#151F2D] rounded-lg p-6 space-y-4">
            {/* Search bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-[#1E293B] text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Document list */}
            <div className="space-y-2">
              {documents.map((doc) => (
                <div key={doc.id} className="bg-[#1E293B] rounded-lg p-4 hover:bg-[#2D3B4E] transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-[#374151] rounded-lg flex items-center justify-center text-2xl">
                        {doc.icon}
                      </div>
                      <div>
                        <h3 className="text-[#E6E0E9] font-medium">{doc.title}</h3>
                        <p className="text-[#ADB5BD] text-sm">{doc.description}</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors">
                      <span>Dropbox Folder</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Document button */}
            <button className="w-full py-3 bg-[#1E293B] text-[#ADB5BD] rounded-lg hover:bg-[#2D3B4E] transition-colors flex items-center justify-center gap-2">
              <Plus size={20} />
              <span>Add Document</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
