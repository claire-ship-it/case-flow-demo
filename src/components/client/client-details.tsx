"use client"

import { User, Briefcase, Users, CheckCircle, Mail, Phone, Calendar, FileText, ChevronDown, ChevronRight, Link, 
  Car, FileCheck, BadgeDollarSign, FileWarning, Clock, Star, Info, PhoneCall, Mail as MailIcon, PlusCircle, AlertTriangle, Home, Eye, Download, File } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { type Client } from "@/data/clients"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getTimelinePoints } from "@/utils/timeline"
import { Button } from "@/components/ui/button"
import { DocumentViewer } from "./document-viewer"
import { LitDetails } from "./lit-details"

interface ClientDetailsProps {
  client: Client
}

interface Document {
  id: string
  title: string
  type: "BI Demand" | "UM Demand" | "Medical Records" | "Other" | "CRN"
  date: string
  size: string
}

export function ClientDetails({ client }: ClientDetailsProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean
  }>({
    timeline: true,
    summary: true,
    policy: false,
    medical: false,
    personal: true,
    emergency: false,
    accident: true,
    crash: true,
    postAccident: true,
    vehicle: false,
    clientVehicle: false,
    defendantVehicle: false,
    clientVehicleDetails: false,
    clientDriverInfo: false,
    clientOwnerInfo: false,
    clientPassengers: false,
    defendantVehicleDetails: false,
    defendantDriverInfo: false,
    defendantOwnerInfo: false,
    defendantPassengers: false,
    accidentNarrative: false,
    billing: false,
    officer: false,
    people: false,
    violations: false,
    discoveryPretrial: false,
    mediationPretrial: false,
    expertReportsMedical: false,
    cmeDetails: false,
    depositions: false
  })
  const [documents, setDocuments] = useState<Document[]>([])
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [showInsuranceDialog, setShowInsuranceDialog] = useState(false)
  
  const timelinePoints = getTimelinePoints(client.dateOfLoss, client.statusOfLimitation || "")

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const toggleAllPresuitSections = (expand: boolean) => {
    setExpandedSections(prev => ({
      ...prev,
      personal: expand,
      emergency: expand,
      accident: expand,
      crash: expand,
      postAccident: expand
    }))
  }

  useEffect(() => {
    const initialDocs: Document[] = [
      {
        id: "doc-1",
        title: "Medical Records - Tampa General",
        type: "Medical Records",
        date: "04/02/2024",
        size: "2.4 MB"
      },
      {
        id: "doc-2",
        title: "Police Report",
        type: "Other",
        date: "03/18/2024",
        size: "1.1 MB"
      }
    ]
    setDocuments(initialDocs)
  }, [])

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document)
    setIsViewerOpen(true)
  }

  const SectionHeader = ({ title, section }: { title: string, section: keyof typeof expandedSections }) => (
    <div 
      className="flex items-center justify-between cursor-pointer"
      onClick={() => toggleSection(section)}
    >
      <h2 className="text-[18px] font-semibold text-white">{title}</h2>
      {expandedSections[section] ? (
        <ChevronDown className="w-5 h-5 text-gray-400" />
      ) : (
        <ChevronRight className="w-5 h-5 text-gray-400" />
      )}
    </div>
  )
  
  const formatNarrativeWithTooltips = (narrative: string, client: Client) => {
    // Placeholder implementation
    return <p>{narrative}</p>;
  };

  return (
    <div className="w-full lg:w-2/3 bg-[#1E293B] rounded-lg">
      <div className="flex flex-row items-center w-full h-[38.76px] bg-[#111827] rounded-t-lg">
        <div className="flex flex-row items-center gap-[2px] w-full h-[38.76px]">
          <div 
            onClick={() => setActiveTab('overview')}
            className={`flex flex-row justify-center items-center px-[14px] py-[10.57px] gap-[15px] cursor-pointer ${
              activeTab === 'overview' ? 'bg-[#26303E] border-b-[0.88px] border-[#74C0FC]' : ''
            }`}
          >
            <div className="flex flex-row justify-center items-center gap-[8.81px]">
              <span className={`font-inter text-[12.33px] leading-[18px] ${
                activeTab === 'overview' ? 'text-[#E7F5FF]' : 'text-[#9CA3AF]'
              }`}>Overview</span>
              <ChevronDown className={`w-[13px] h-[13px] ${
                activeTab === 'overview' ? 'text-[#F8F9FA]' : 'text-[#868E96]'
              }`} />
            </div>
        </div>

          <div 
            onClick={() => setActiveTab('presuit')}
            className={`flex flex-row justify-center items-center px-[14px] py-[10.57px] gap-[8.81px] cursor-pointer ${
              activeTab === 'presuit' ? 'bg-[#26303E] border-b-[0.88px] border-[#74C0FC]' : ''
            }`}
          >
            <div className="flex flex-row items-center gap-[8.81px]">
              <span className={`font-inter text-[12.33px] leading-[18px] ${
                activeTab === 'presuit' ? 'text-[#E7F5FF]' : 'text-[#9CA3AF]'
              }`}>Pre-suit</span>
              <ChevronDown className={`w-[13px] h-[13px] ${
                activeTab === 'presuit' ? 'text-[#F8F9FA]' : 'text-[#868E96]'
              }`} />
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('litigation')}
            className={`flex flex-row justify-center items-center px-[14px] py-[10.57px] gap-[8.81px] cursor-pointer ${
              activeTab === 'litigation' ? 'bg-[#26303E] border-b-[0.88px] border-[#74C0FC]' : ''
            }`}
          >
            <div className="flex flex-row items-center gap-[8.81px]">
              <span className={`font-inter text-[12.33px] leading-[18px] ${
                activeTab === 'litigation' ? 'text-[#E7F5FF]' : 'text-[#9CA3AF]'
              }`}>Litigation</span>
              <ChevronDown className={`w-[13px] h-[13px] ${
                activeTab === 'litigation' ? 'text-[#F8F9FA]' : 'text-[#868E96]'
              }`} />
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('financial')}
            className={`flex flex-row justify-center items-center px-[14px] py-[10.57px] gap-[8.81px] cursor-pointer ${
              activeTab === 'financial' ? 'bg-[#26303E] border-b-[0.88px] border-[#74C0FC]' : ''
            }`}
          >
            <div className="flex flex-row items-center gap-[8.81px]">
              <span className={`font-inter text-[12.33px] leading-[18px] ${
                activeTab === 'financial' ? 'text-[#E7F5FF]' : 'text-[#9CA3AF]'
              }`}>Financial</span>
              <ChevronDown className={`w-[13px] h-[13px] ${
                activeTab === 'financial' ? 'text-[#F8F9FA]' : 'text-[#868E96]'
              }`} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start gap-[10px] p-6">
        {activeTab === 'overview' && (
          <>
          <div className="w-full bg-[#0E1826] rounded-[10px] p-6">
            <div 
                className="flex justify-between items-center cursor-pointer mb-6"
              onClick={() => toggleSection('timeline')}
            >
              <h3 className="text-[16px] font-semibold text-white">Timeline</h3>
              <div className="text-gray-400">
                {expandedSections.timeline ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </div>
            </div>
            {expandedSections.timeline && (
                <div className="relative">
                  <div className="absolute top-4 left-0 w-full h-[2px] bg-gray-700">
                    <div className="absolute top-0 left-0 h-full bg-blue-500 w-[40%]"></div>
                  </div>
                  <div className="relative flex justify-between pt-8">
                    {timelinePoints.map((point, index) => {
                      const Icon = index === 0 ? Car : index === 1 ? FileCheck : index === 2 ? BadgeDollarSign : index === 3 ? FileWarning : Clock;
                      return (
                        <div key={index} className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 ${index < 2 ? 'bg-blue-500' : index === 2 ? 'bg-green-500 ring-2 ring-green-300 ring-opacity-50' : 'bg-gray-600'}`}>
                            <Icon className={`w-4 h-4 ${index < 2 ? 'text-white' : index === 2 ? 'text-white' : 'text-gray-300'}`} />
                          </div>
                          <div className="mt-2 text-center">
                            <p className={`text-xs ${index <= 2 ? 'text-gray-200' : 'text-gray-500'}`}>{point.date}</p>
                            <p className={`text-sm mt-1 ${index < 2 ? 'text-gray-300' : index === 2 ? 'text-green-400 font-medium' : 'text-gray-500'}`}>{point.label}</p>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            )}
          </div>

          <div className="w-full bg-[#0E1826] rounded-[10px] p-6">
            <h3 className="text-[16px] font-semibold text-white mb-4">Medical Summary</h3>
            <p className="text-[14px] leading-[24px] text-gray-300">
              {client.shortmedicalnarrative || "No medical summary available."}
            </p>
          </div>

          <div className="w-full bg-[#0E1826] rounded-[10px] p-6">
            <h3 className="text-[16px] font-semibold text-white mb-4">Recent Treatment</h3>
              {client.recentTreatments && client.recentTreatments.length > 0 ? (
            <div className="space-y-4">
                  {client.recentTreatments.map((treatment, index) => (
                <div key={index} className="bg-[#151F2D] p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-white font-medium">{treatment.provider}</h4>
                          <p className="text-gray-400 text-sm mt-1">{treatment.type}</p>
                  </div>
                        <span className="text-gray-400 text-sm">{treatment.date}</span>
                      </div>
                </div>
              ))}
            </div>
              ) : (
                <p className="text-[14px] leading-[24px] text-gray-300">No recent treatments recorded.</p>
              )}
          </div>

          <div className="w-full bg-[#0E1826] rounded-[10px] p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Documents</h3>
            <div className="space-y-3">
              {documents.length > 0 ? documents.slice(0, 5).map((doc) => (
                <div key={doc.id} className="flex items-center justify-between bg-[#1A2433] p-3 rounded-lg hover:bg-[#243042] cursor-pointer" onClick={() => handleViewDocument(doc)}>
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-white font-medium">{doc.title}</p>
                      <p className="text-xs text-gray-400">{doc.type} - {doc.date} ({doc.size})</p>
                    </div>
                  </div>
                  <Eye className="w-4 h-4 text-gray-500" />
                </div>
              )) : (
                <p className="text-gray-500 text-sm">No recent documents.</p>
              )}
            </div>
            {documents.length > 5 && (
              <Button variant="link" className="text-blue-400 mt-3 px-0">View All Documents</Button>
            )}
          </div>
          </>
        )}

        {activeTab === 'presuit' && (
          <div className="w-full space-y-6">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => toggleAllPresuitSections(!expandedSections.personal)}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#1A2433] hover:bg-[#243042] rounded text-sm text-gray-300"
              >
                {expandedSections.personal ? (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    Collapse All
                  </>
                ) : (
                  <>
                    <ChevronRight className="w-4 h-4" />
                    Expand All
                  </>
                )}
              </button>
            </div>

          <div className="w-full bg-[#0E1826] rounded-[10px] p-6">
              <SectionHeader title="Personal Information" section="personal" />
              {expandedSections.personal && (
                <div className="mt-4 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">SSN</span>
                        <span className="text-white">{client.ssn}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Date of Birth</span>
                        <span className="text-white">{client.dateOfBirth}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Address</span>
                        <span className="text-white">{client.address}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Marital Status</span>
                        <span className="text-white capitalize">
                          {client.maritalStatus === "married" && client.spouseName 
                            ? `Married To ${client.spouseName}`
                            : client.maritalStatus}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Education</span>
                        <span className="text-white">{client.education}</span>
                      </div>
                      <div className="flex gap-2 flex-wrap justify-end">
                        {client.hasFelon && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-red-900/50 text-red-400 rounded-md text-sm">
                            <AlertTriangle className="w-4 h-4" />
                            <span>Felony Record</span>
                          </div>
                        )}
                        {client.liveInRelativeName && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-blue-900/50 text-blue-400 rounded-md text-sm">
                            <Home className="w-4 h-4" />
                            <span>Lives with {client.liveInRelativeName}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Primary Phone</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white">{client.primaryPhone}</span>
                          {client.backupPhone && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center">
                                    <PlusCircle className="w-4 h-4 text-blue-400" />
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent className="bg-[#1E293B] text-white border-[#374151] p-3">
                                  <div className="space-y-1">
                                    <h4 className="font-medium">Backup Phone</h4>
                                    <p>{client.backupPhone}</p>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Primary Email</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white">{client.primaryEmail}</span>
                          {client.backupEmail && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center">
                                    <PlusCircle className="w-4 h-4 text-blue-400" />
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent className="bg-[#1E293B] text-white border-[#374151] p-3">
                                  <div className="space-y-1">
                                    <h4 className="font-medium">Backup Email</h4>
                                    <p>{client.backupEmail}</p>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Client Source</span>
                        <span className="text-white">{client.clientSource}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Referral Person</span>
                        <span className="text-white">{client.referralPerson || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#151F2D] rounded-lg">
                    <div 
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#1A2433] rounded-lg"
                      onClick={() => toggleSection('emergency')}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-gray-400">Emergency Contact</span>
                        <span className="text-white">{client.emergencyContact.name}</span>
              </div>
                      {expandedSections.emergency ? (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      )}
            </div>
                    
                    {expandedSections.emergency && (
                      <div className="px-4 pb-4 space-y-3 border-t border-[#374151]">
                        <div className="flex justify-between items-center pt-3">
                          <span className="text-gray-400">Relationship</span>
                          <span className="text-white">{client.emergencyContact.relationship}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Phone</span>
                          <span className="text-white">{client.emergencyContact.phone}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Address</span>
                          <span className="text-white">{client.emergencyContact.address}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="w-full bg-[#0E1826] rounded-[10px] p-6">
              <SectionHeader title="Accident Info" section="accident" />
            {expandedSections.accident && (
              <div className="mt-4 space-y-6">
                <div>
                  <h3 className="text-white font-medium mb-4">From the Client</h3>
                  <div className="space-y-6">
                    <div className="bg-[#151F2D] p-4 rounded-lg">
                      <h4 className="text-gray-400 mb-2">Vehicle Details</h4>
                      <p className="text-white text-sm leading-6">{client.vehicleDetails || "No vehicle details provided."}</p>
                    </div>

                    <div className="bg-[#151F2D] p-4 rounded-lg">
                      <h4 className="text-gray-400 mb-2">Accident Description</h4>
                      <p className="text-white text-sm leading-6">{client.accidentDescription || "No accident description provided."}</p>
                    </div>

                    <div className="bg-[#151F2D] p-4 rounded-lg">
                      <h4 className="text-gray-400 mb-2">Medical Treatment</h4>
                      <p className="text-white text-sm leading-6">{client.medicalTreatment || "No medical treatment information provided."}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-full bg-[#0E1826] rounded-[10px] p-6">
              <SectionHeader title="Crash Report" section="crash" />
              {expandedSections.crash && client?.crashReport && (
                <div className="mt-4 space-y-6">
                  <div className="bg-[#151F2D] rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">Accident Narrative</h4>
                    <div className="text-white text-sm leading-6">
                      <p>{client.crashReport.narrative?.accidentDescription || "No accident narrative available."}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between bg-[#151F2D] p-4 rounded-lg">
                    <span className="text-gray-400">Report Document</span>
                    <a 
                      href={client.crashReport.documentLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
                    >
                      <span>View Report</span>
                      <Link size={16} />
                    </a>
                  </div>

                  <div className="bg-[#151F2D] rounded-lg">
                    <div 
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#1A2433] rounded-lg"
                      onClick={() => toggleSection('officer')}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-gray-400">Reporting Officer</span>
                        <span className="text-white">{client.crashReport.reportingOfficer?.name || 'N/A'}</span>
              </div>
                      {expandedSections.officer ? (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      )}
            </div>
                    {expandedSections.officer && client.crashReport.reportingOfficer && (
                      <div className="px-4 pb-4 space-y-3 border-t border-[#374151]">
                        <div className="flex justify-between items-center pt-3">
                          <span className="text-gray-400">Badge</span>
                          <span className="text-white">{client.crashReport.reportingOfficer.badge}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Department</span>
                          <span className="text-white">{client.crashReport.reportingOfficer.department}</span>
                        </div>
                      </div>
                    )}
                </div>

                  <div className="bg-[#151F2D] rounded-lg">
                    <div 
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#1A2433] rounded-lg"
                      onClick={() => toggleSection('people')}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-gray-400">People Involved</span>
                        <span className="text-white">{client.crashReport.people?.length || 0} person(s)</span>
                      </div>
                      {expandedSections.people ? (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    {expandedSections.people && client.crashReport.people && (
                      <div className="px-4 pb-4 space-y-4 border-t border-[#374151]">
                        {client.crashReport.people.map((person, index) => (
                          <div key={index} className="space-y-2 p-3 bg-[#1A2433] rounded-md mt-3">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">Name</span>
                              <span className="text-white">{person.name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">Role</span>
                              <span className="text-white capitalize">{person.role}</span>
                            </div>
                            {person.statements && person.statements.length > 0 && (
                              <div className="flex flex-col gap-1">
                                <span className="text-gray-400 text-sm">Statement:</span>
                                <p className="text-white text-sm leading-relaxed">{person.statements[0]}</p>
                              </div>
                            )}
                            {person.injuries && person.injuries.length > 0 && (
                              <div className="flex flex-col gap-1">
                                <span className="text-gray-400 text-sm">Injuries:</span>
                                <p className="text-white text-sm leading-relaxed">{person.injuries.join(', ')}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="bg-[#151F2D] rounded-lg">
                     <div 
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#1A2433] rounded-lg"
                      onClick={() => toggleSection('violations')}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-gray-400">Violations</span>
                        <span className="text-white">{client.crashReport.violations?.length || 0} violation(s)</span>
                      </div>
                      {expandedSections.violations ? (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    {expandedSections.violations && client.crashReport.violations && (
                       <div className="px-4 pb-4 space-y-4 border-t border-[#374151]">
                        {client.crashReport.violations.map((violation, index) => (
                          <div key={index} className="pt-3">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">Code</span>
                              <span className="text-white">{violation.code}</span>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-gray-400">Description</span>
                              <span className="text-white">{violation.description}</span>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-gray-400">Severity</span>
                              <span className="text-white">{violation.severity}</span>
                            </div>
                            {index < client.crashReport.violations.length - 1 && (
                              <div className="border-t border-[#374151] mt-3"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                <div className="bg-[#151F2D] rounded-lg p-4">
                    <div className="flex flex-col gap-2 mb-4">
                      <span className="text-gray-400 font-medium">Liability Statement</span>
                      <p className="text-white text-sm leading-relaxed">{client.crashReport.liabilityStatement || 'N/A'}</p>
                    </div>
                    <div className="flex justify-between items-center border-t border-[#374151] pt-4">
                      <span className="text-gray-400">County of Incident</span>
                      <span className="text-white">{client.crashReport.countyOfIncident || 'N/A'}</span>
                    </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-full bg-[#0E1826] rounded-[10px] p-6">
              <SectionHeader title="Post Accident Checklist" section="postAccident" />
              {expandedSections.postAccident && (
                <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">EMS Bill Received</span>
                    <input type="checkbox" className="w-4 h-4 bg-[#1A2433] border-[#374151] rounded text-blue-500 focus:ring-blue-500" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">EMS Records Received</span>
                    <input type="checkbox" className="w-4 h-4 bg-[#1A2433] border-[#374151] rounded text-blue-500 focus:ring-blue-500" />
                  </div>
                   <div className="flex justify-between items-center">
                    <span className="text-gray-400">Hospital Bill Received</span>
                    <input type="checkbox" className="w-4 h-4 bg-[#1A2433] border-[#374151] rounded text-blue-500 focus:ring-blue-500" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Hospital Records Received</span>
                    <input type="checkbox" className="w-4 h-4 bg-[#1A2433] border-[#374151] rounded text-blue-500 focus:ring-blue-500" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Verify Client Treating</span>
                     <input type="checkbox" className="w-4 h-4 bg-[#1A2433] border-[#374151] rounded text-blue-500 focus:ring-blue-500" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Lost Wages Verified</span>
                     <input type="checkbox" className="w-4 h-4 bg-[#1A2433] border-[#374151] rounded text-blue-500 focus:ring-blue-500" />
                  </div>
                   <div className="flex justify-between items-center">
                    <span className="text-gray-400">Referred Specialist</span>
                    <input type="checkbox" className="w-4 h-4 bg-[#1A2433] border-[#374151] rounded text-blue-500 focus:ring-blue-500" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Specialist Treatment Recs</span>
                    <input type="checkbox" className="w-4 h-4 bg-[#1A2433] border-[#374151] rounded text-blue-500 focus:ring-blue-500" />
                  </div>
                   <div className="flex justify-between items-center">
                    <span className="text-gray-400">Statement Received</span>
                    <input type="checkbox" className="w-4 h-4 bg-[#1A2433] border-[#374151] rounded text-blue-500 focus:ring-blue-500" />
                  </div>
                   <div className="flex justify-between items-center">
                    <span className="text-gray-400">Notes Received</span>
                    <input type="checkbox" className="w-4 h-4 bg-[#1A2433] border-[#374151] rounded text-blue-500 focus:ring-blue-500" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">MRI Film Requested</span>
                    <input type="checkbox" className="w-4 h-4 bg-[#1A2433] border-[#374151] rounded text-blue-500 focus:ring-blue-500" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">MRI Film Received</span>
                    <input type="checkbox" className="w-4 h-4 bg-[#1A2433] border-[#374151] rounded text-blue-500 focus:ring-blue-500" />
                  </div>
                   <div className="flex justify-between items-center col-span-2">
                    <span className="text-gray-400">Subrogation Payout/Lien Received</span>
                    <input type="checkbox" className="w-4 h-4 bg-[#1A2433] border-[#374151] rounded text-blue-500 focus:ring-blue-500" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'litigation' && (
          <LitDetails 
            client={client}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
            SectionHeader={SectionHeader}
          />
        )}

        {activeTab === 'financial' && (
           <div className="w-full space-y-6">
              <div className="w-full bg-[#0E1826] rounded-[10px] p-6">
                <div 
                  className="flex items-center justify-between cursor-pointer mb-4"
                  onClick={() => toggleSection('summary')}
                >
                <h2 className="text-[20px] font-medium text-white">Financial Summary</h2>
                  {expandedSections.summary ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                {expandedSections.summary && (
                  <div className="space-y-4">
                <div className="bg-[#151F2D] p-4 rounded-lg">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center pb-3 border-b border-[#374151]">
                          <span className="text-gray-400">Total Recovery</span>
                        <span className="text-white font-medium">
                          ${(client.insurancePolicies?.reduce((sum, policy) => {
                            const limit = parseFloat(policy.limit?.replace(/[^0-9.-]+/g, '') || '0');
                            return sum + limit;
                          }, 0) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Total Fees (33%)</span>
                        <span className="text-red-400">
                          -${((client.insurancePolicies?.reduce((sum, policy) => {
                            const limit = parseFloat(policy.limit?.replace(/[^0-9.-]+/g, '') || '0');
                            return sum + limit;
                          }, 0) || 0) * 0.33).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        </div>
                        
                        <div className="flex justify-between items-center pb-3 border-b border-[#374151]">
                          <span className="text-gray-400">Recovery Minus Fees</span>
                        <span className="text-white">
                          ${((client.insurancePolicies?.reduce((sum, policy) => {
                            const limit = parseFloat(policy.limit?.replace(/[^0-9.-]+/g, '') || '0');
                            return sum + limit;
                          }, 0) || 0) * 0.67).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        </div>
                        
                        <div className="flex justify-between items-center pb-3 border-b border-[#374151]">
                          <span className="text-gray-400">Subtotal</span>
                        <span className="text-white font-medium">
                          ${((client.insurancePolicies?.reduce((sum, policy) => {
                            const limit = parseFloat(policy.limit?.replace(/[^0-9.-]+/g, '') || '0');
                            return sum + limit;
                          }, 0) || 0) * 0.67).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                    <div>
                            <span className="text-gray-400">Total Expenses</span>
                    </div>
                        <span className="text-red-400">
                          -${(client.medicalProviders?.reduce((sum, provider) => 
                            sum + (provider.billingInfo?.totalBilled || 0), 0
                          ) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        </div>
                        
                        <div className="flex justify-between items-center pt-3 border-t border-[#374151]">
                          <span className="text-white font-medium">Client Payment Amount</span>
                        <span className="text-green-400 text-xl font-semibold">
                          ${(((client.insurancePolicies?.reduce((sum, policy) => {
                                const limit = parseFloat(policy.limit?.replace(/[^0-9.-]+/g, '') || '0');
                                return sum + limit;
                              }, 0) || 0) * 0.67)
                                -
                                ((client.medicalProviders?.reduce((sum, provider) => 
                                  sum + (provider.billingInfo?.totalBilled || 0), 0
                                ) || 0))
                              ).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="w-full bg-[#0E1826] rounded-[10px] p-6">
                <div 
                  className="flex items-center justify-between cursor-pointer mb-4"
                  onClick={() => toggleSection('policy')}
                >
                  <h2 className="text-[20px] font-medium text-white">Insurance Policies</h2>
                  {expandedSections.policy ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                {expandedSections.policy && client.insurancePolicies && (
                  <div className="space-y-4">
                  {client.insurancePolicies.map((policy) => {
                    const limit = parseFloat(policy.limit?.replace(/[^0-9.-]+/g, '') || '0');
                    const expected = parseFloat(policy.expectedSettlement?.replace(/[^0-9.-]+/g, '') || '0');
                    const progressValue = limit > 0 ? (expected / limit) * 100 : 0;

                    return (
                      <div key={policy.id} className="bg-[#151F2D] p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-3">
                    <div>
                            <h3 className="text-white font-medium">{policy.provider?.name || 'N/A'}</h3>
                            <p className="text-gray-400 text-sm">{policy.type || 'N/A'} Policy</p>
                          </div>
                          <span className="text-white font-medium">{policy.limit || '$0'}</span>
                        </div>
                        <Progress value={progressValue} className="h-2 [&>div]:bg-blue-500" /> 
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex gap-2">
                            <span className="text-gray-400 text-sm">Expected: {policy.expectedSettlement || '$0'}</span>
                            <span className="text-red-400 text-sm">Firm: {policy.expectedFirmFee || '$0'}</span>
                          </div>
                          <span className="text-blue-400 text-sm">
                            {Math.round(progressValue)}%
                          </span>
                        </div>
                      </div>
                    )
                  })}
                  </div>
                )}
              </div>

            <div className="w-full bg-[#0E1826] rounded-[10px] p-6">
              <div 
                className="flex items-center justify-between cursor-pointer mb-4"
                onClick={() => toggleSection('medical')}
              >
                <h2 className="text-[20px] font-medium text-white">Medical Bills</h2>
                {expandedSections.medical ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </div>
              {expandedSections.medical && client.medicalProviders && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-[#151F2D] p-4 rounded-lg">
                      <span className="text-gray-400 text-sm">Original Balance</span>
                      <p className="text-2xl font-semibold text-white mt-1">
                        ${(client.medicalProviders.reduce((sum, provider) => 
                          sum + (provider.billingInfo?.totalBilled || 0), 0
                        ) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="bg-[#151F2D] p-4 rounded-lg">
                      <span className="text-gray-400 text-sm">Client Owes</span>
                      <p className="text-2xl font-semibold text-red-400 mt-1">
                        ${(client.medicalProviders.reduce((sum, provider) => 
                          sum + (provider.billingInfo?.outstandingBalance || 0), 0
                        ) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                  </div>
                </div>

                  <div className="bg-[#151F2D] p-4 rounded-lg">
                    <h3 className="text-white font-medium mb-4">Bill Breakdown</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-400">Original Balance</span>
                          <span className="text-white">
                            ${(client.medicalProviders.reduce((sum, provider) => 
                              sum + (provider.billingInfo?.totalBilled || 0), 0
                            ) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                        <Progress value={100} className="h-2 bg-[#374151] [&>div]:bg-gray-500" />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-400">Insurance Payment</span>
                          <span className="text-green-400">
                            -${(client.medicalProviders.reduce((sum, provider) => 
                              sum + (provider.billingInfo?.totalPaid || 0), 0
                            ) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                        <Progress 
                          value={
                            (client.medicalProviders.reduce((sum, provider) => 
                              sum + (provider.billingInfo?.totalBilled || 0), 0) || 0) > 0 ?
                            (client.medicalProviders.reduce((sum, provider) => 
                              sum + (provider.billingInfo?.totalPaid || 0), 0
                            ) / client.medicalProviders.reduce((sum, provider) => 
                              sum + (provider.billingInfo?.totalBilled || 0), 0
                            )) * 100 : 0
                          } 
                          className="h-2 bg-[#374151] [&>div]:bg-green-500" 
                        />
                      </div>

                      <div>
                         <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-400">Firm Reduction</span>
                           <span className="text-blue-400">
                             -${((
                              (client.medicalProviders.reduce((sum, provider) => sum + (provider.billingInfo?.totalBilled || 0), 0) || 0)
                              - (client.medicalProviders.reduce((sum, provider) => sum + (provider.billingInfo?.totalPaid || 0), 0) || 0)
                              - (client.medicalProviders.reduce((sum, provider) => sum + (provider.billingInfo?.outstandingBalance || 0), 0) || 0)
                            ) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                        <Progress 
                          value={
                             (client.medicalProviders.reduce((sum, provider) => sum + (provider.billingInfo?.totalBilled || 0), 0) > 0) ?
                             ((
                               (client.medicalProviders.reduce((sum, provider) => sum + (provider.billingInfo?.totalBilled || 0), 0)) 
                                - (client.medicalProviders.reduce((sum, provider) => sum + (provider.billingInfo?.totalPaid || 0), 0))
                                - (client.medicalProviders.reduce((sum, provider) => sum + (provider.billingInfo?.outstandingBalance || 0), 0) || 0) 
                              ) / client.medicalProviders.reduce((sum, provider) => sum + (provider.billingInfo?.totalBilled || 0), 0)
                             ) * 100 : 0
                           }
                          className="h-2 bg-[#374151] [&>div]:bg-blue-500" 
                        />
                      </div>

                      <div className="pt-3 border-t border-[#374151]">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">Client Owes</span>
                          <span className="text-red-400 text-lg font-semibold">
                            ${(client.medicalProviders.reduce((sum, provider) => 
                              sum + (provider.billingInfo?.outstandingBalance || 0), 0
                            ) || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                        <Progress 
                           value={
                             (client.medicalProviders.reduce((sum, provider) => sum + (provider.billingInfo?.totalBilled || 0), 0) > 0) ?
                             (client.medicalProviders.reduce((sum, provider) => sum + (provider.billingInfo?.outstandingBalance || 0), 0) 
                              / 
                              client.medicalProviders.reduce((sum, provider) => sum + (provider.billingInfo?.totalBilled || 0), 0) 
                             ) * 100 : 0
                           }
                          className="h-2 bg-[#374151] mt-2 [&>div]:bg-red-500" 
                        />
                      </div>
                    </div>
                  </div>

                <div className="bg-[#151F2D] p-4 rounded-lg">
                  <h3 className="text-white font-medium mb-3">Provider Breakdown</h3>
                  <div className="space-y-3">
                    {client.medicalProviders.map((provider) => (
                      <div key={provider.id} className="flex justify-between items-center p-2 hover:bg-[#1A2433] rounded-lg">
                      <div>
                          <p className="text-white">{provider.name}</p>
                          <p className="text-gray-400 text-sm">{provider.type}</p>
                      </div>
                      <div className="text-right">
                          <p className="text-white">
                              ${(provider.billingInfo?.totalBilled || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                          <p className="text-red-400 text-sm">
                              Owes: ${(provider.billingInfo?.outstandingBalance || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                      </div>
                    </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        )}
      </div>

      {selectedDocument && (
        <DocumentViewer
          isOpen={isViewerOpen}
          onClose={() => setIsViewerOpen(false)}
          documentTitle={selectedDocument.title}
          documentType={selectedDocument.type}
          clientName={client.name}
        />
      )}
    </div>
  )
}

