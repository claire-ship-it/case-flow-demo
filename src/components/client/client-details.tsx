"use client"

import { User, Briefcase, Users, CheckCircle, Mail, Phone, Calendar, FileText, ChevronDown, ChevronRight, Link, 
  Car, FileCheck, BadgeDollarSign, FileWarning, Clock } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { type Client } from "@/data/clients"
import { useState } from "react"

interface ClientDetailsProps {
  client: Client
}

// Helper function to calculate dates between two dates
const getTimelinePoints = (startDate: string, endDate: string) => {
  const start = new Date(startDate)
  const end = new Date(endDate.split(" ")[0]) // Remove GMT from SOL date

  // Calculate specific dates
  const crashReportDate = new Date(start)
  crashReportDate.setDate(start.getDate() + 7) // 7 days after date of loss

  const policyLimitsDate = new Date(start)
  policyLimitsDate.setDate(start.getDate() + 14) // 14 days after date of loss

  const crnDueDate = new Date(start)
  crnDueDate.setDate(start.getDate() + 90) // 90 days from sign up

  return [
    {
      date: start.toLocaleDateString(),
      label: "Date of Loss"
    },
    {
      date: crashReportDate.toLocaleDateString(),
      label: "Crash Report Received"
    },
    {
      date: policyLimitsDate.toLocaleDateString(),
      label: "Policy Limits Determined"
    },
    {
      date: crnDueDate.toLocaleDateString(),
      label: "CRN Due"
    },
    {
      date: end.toLocaleDateString(),
      label: "SOL"
    }
  ]
}

export function ClientDetails({ client }: ClientDetailsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'presuit' | 'financial'>('overview')
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    emergency: false,
    accident: true,
    crash: true,
    summary: true,
    policy: true,
    medical: true,
    expenses: true,
    officer: false,
    violations: false,
    people: false,
    postAccident: true
  })

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

  const timelinePoints = getTimelinePoints(client.dateOfLoss, client.statusOfLimitation || "")

  // Add console.log to debug client data
  console.log('Client data in details:', client)

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

  return (
    <div className="w-full lg:w-2/3 bg-[#1E293B] rounded-lg">
      {/* Tabs */}
      <div className="flex flex-row items-center w-full h-[38.76px] bg-[#111827] rounded-t-lg">
        <div className="flex flex-row items-center gap-[2px] w-full h-[38.76px]">
          {/* Overview Tab */}
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

          {/* Pre-suit Tab */}
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

          {/* Financial Tab */}
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

      {/* Content based on active tab */}
      <div className="flex flex-col items-start gap-[10px] p-6">
        {activeTab === 'overview' && (
          <>
            {/* Timeline Section */}
            <div className="w-full bg-[#0E1826] rounded-[10px] p-6">
              <h3 className="text-[16px] font-semibold text-white mb-6">Case Timeline</h3>
              <div className="relative">
                {/* Timeline line with progress */}
                <div className="absolute top-4 left-0 w-full h-[2px] bg-gray-600">
                  {/* Progress line showing completed steps */}
                  <div className="absolute top-0 left-0 w-1/2 h-full bg-blue-500"></div>
                </div>
                
                {/* Timeline points */}
                <div className="relative flex justify-between">
                  {timelinePoints.map((point, index) => {
                    // Define icon based on event type
                    const Icon = index === 0 ? Car :
                               index === 1 ? FileCheck :
                               index === 2 ? BadgeDollarSign :
                               index === 3 ? FileWarning :
                               Clock

                    return (
                      <div key={index} className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 ${
                          index < 2 ? 'bg-blue-500' : // Past events
                          index === 2 ? 'bg-green-500 ring-2 ring-green-300 ring-opacity-50' : // Current event
                          'bg-gray-600' // Future events
                        }`}>
                          <Icon className={`w-4 h-4 ${
                            index < 2 ? 'text-white' :
                            index === 2 ? 'text-white' :
                            'text-gray-300'
                          }`} />
                        </div>
                        <div className="mt-6 text-center">
                          <p className={`text-xs ${
                            index <= 2 ? 'text-gray-200' : 'text-gray-500'
                          }`}>{point.date}</p>
                          <p className={`text-sm mt-1 ${
                            index < 2 ? 'text-gray-300' :
                            index === 2 ? 'text-green-400 font-medium' :
                            'text-gray-500'
                          }`}>{point.label}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Medical Summary Section */}
            <div className="w-full bg-[#0E1826] rounded-[10px] p-6">
              <h3 className="text-[16px] font-semibold text-white mb-4">Medical Summary</h3>
              <p className="text-[14px] leading-[24px] text-gray-300">
                {client.shortmedicalnarrative || "No medical summary available."}
              </p>
            </div>

            {/* Recent Treatment Section */}
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
          </>
        )}

        {activeTab === 'presuit' && (
          <div className="w-full space-y-6">
            {/* Expand/Collapse All Button */}
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

            {/* Personal Information Section */}
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
                        <span className="text-white capitalize">{client.maritalStatus}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Spouse's Name</span>
                        <span className="text-white">{client.spouseName || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Education</span>
                        <span className="text-white">{client.education}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Felony Record</span>
                        <span className="text-white">{client.hasFelon ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Live-in Relative</span>
                        <span className="text-white">{client.liveInRelativeName || 'N/A'}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Primary Phone</span>
                        <span className="text-white">{client.primaryPhone}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Backup Phone</span>
                        <span className="text-white">{client.backupPhone || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Primary Email</span>
                        <span className="text-white">{client.primaryEmail}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Backup Email</span>
                        <span className="text-white">{client.backupEmail || 'N/A'}</span>
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

                  {/* Emergency Contact Subsection */}
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

            {/* Accident Info Section */}
            <div className="w-full bg-[#0E1826] rounded-[10px] p-6">
              <SectionHeader title="Accident Info" section="accident" />
              {expandedSections.accident && (
                <div className="mt-4 space-y-6">
                  {/* From the Client Subsection */}
                  <div>
                    <h3 className="text-white font-medium mb-4">From the Client</h3>
                    <div className="space-y-6">
                      {/* Vehicle Details */}
                      <div className="bg-[#151F2D] p-4 rounded-lg">
                        <h4 className="text-gray-400 mb-2">Vehicle Details</h4>
                        <p className="text-white text-sm leading-6">{client.vehicleDetails || "No vehicle details provided."}</p>
                      </div>

                      {/* Accident Description */}
                      <div className="bg-[#151F2D] p-4 rounded-lg">
                        <h4 className="text-gray-400 mb-2">Accident Description</h4>
                        <p className="text-white text-sm leading-6">{client.accidentDescription || "No accident description provided."}</p>
                      </div>

                      {/* Medical Treatment */}
                      <div className="bg-[#151F2D] p-4 rounded-lg">
                        <h4 className="text-gray-400 mb-2">Medical Treatment</h4>
                        <p className="text-white text-sm leading-6">{client.medicalTreatment || "No medical treatment information provided."}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Crash Report Section */}
            <div className="w-full bg-[#0E1826] rounded-[10px] p-6">
              <SectionHeader title="Crash Report" section="crash" />
              {expandedSections.crash && client?.crashReport && (
                <div className="mt-4 space-y-6">
                  {/* Document Link */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Report Document</span>
                    <a 
                      href={client.crashReport.documentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
                    >
                      <span>View Report</span>
                      <Link size={16} />
                    </a>
                  </div>

                  {/* Reporting Officer Subsection */}
                  <div className="bg-[#151F2D] rounded-lg">
                    <div 
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#1A2433] rounded-lg"
                      onClick={() => toggleSection('officer')}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-gray-400">Reporting Officer</span>
                        <span className="text-white">{client.crashReport.reportingOfficer.name}</span>
                      </div>
                      {expandedSections.officer ? (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    
                    {expandedSections.officer && (
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

                  {/* Violations Subsection */}
                  <div className="bg-[#151F2D] rounded-lg">
                    <div 
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#1A2433] rounded-lg"
                      onClick={() => toggleSection('violations')}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-gray-400">Violations</span>
                        <span className="text-white">{client.crashReport?.violations?.length || 0} violation(s)</span>
                      </div>
                      {expandedSections.violations ? (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    
                    {expandedSections.violations && client.crashReport?.violations && (
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

                  {/* People Involved Subsection */}
                  <div className="bg-[#151F2D] rounded-lg">
                    <div 
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#1A2433] rounded-lg"
                      onClick={() => toggleSection('people')}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-gray-400">People Involved</span>
                        <span className="text-white">{client.crashReport.people.length} person(s)</span>
                      </div>
                      {expandedSections.people ? (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    
                    {expandedSections.people && (
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
                            {person.statement && (
                              <div className="flex flex-col gap-2">
                                <span className="text-gray-400">Statement</span>
                                <p className="text-white text-sm leading-6">{person.statement}</p>
                              </div>
                            )}
                            {person.injuries && (
                              <div className="flex flex-col gap-2">
                                <span className="text-gray-400">Injuries</span>
                                <p className="text-white text-sm leading-6">{person.injuries}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Liability and County */}
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <span className="text-gray-400">Liability Statement</span>
                      <p className="text-white text-sm leading-6">{client.crashReport.liabilityStatement}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">County of Incident</span>
                      <span className="text-white">{client.crashReport.countyOfIncident}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Post Accident Section */}
            <div className="w-full bg-[#0E1826] rounded-[10px] p-6">
              <SectionHeader title="Post Accident" section="postAccident" />
              {expandedSections.postAccident && (
                <div className="mt-4 space-y-4">
                  {/* EMS Bill */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">EMS Bill</span>
                    <input type="text" className="bg-[#1A2433] border border-[#374151] rounded px-3 py-1 text-white" />
                  </div>

                  {/* EMS Recs */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">EMS Recs</span>
                    <input type="checkbox" className="w-4 h-4 bg-[#1A2433] border-[#374151] rounded" />
                  </div>

                  {/* Verify Client Treating */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Verify Client Treating</span>
                    <input type="text" className="bg-[#1A2433] border border-[#374151] rounded px-3 py-1 text-white" />
                  </div>

                  {/* Lost Wages */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Lost Wages</span>
                    <input type="text" className="bg-[#1A2433] border border-[#374151] rounded px-3 py-1 text-white" />
                  </div>

                  {/* Hospital Bill */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Hospital Bill</span>
                    <input type="text" className="bg-[#1A2433] border border-[#374151] rounded px-3 py-1 text-white" />
                  </div>

                  {/* Hospital Recs */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Hospital Recs</span>
                    <input type="checkbox" className="w-4 h-4 bg-[#1A2433] border-[#374151] rounded" />
                  </div>

                  {/* Referred Specialist */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Referred Specialist</span>
                    <input type="text" className="bg-[#1A2433] border border-[#374151] rounded px-3 py-1 text-white" />
                  </div>

                  {/* Specialist Treatment Rec */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Specialist Treatment Rec</span>
                    <input type="text" className="bg-[#1A2433] border border-[#374151] rounded px-3 py-1 text-white" />
                  </div>

                  {/* Rec'd Statement */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Rec'd Statement</span>
                    <input type="checkbox" className="w-4 h-4 bg-[#1A2433] border-[#374151] rounded" />
                  </div>

                  {/* Rec'd Notes */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Rec'd Notes</span>
                    <input type="text" className="bg-[#1A2433] border border-[#374151] rounded px-3 py-1 text-white" />
                  </div>

                  {/* MRI Film Requested */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">MRI Film Requested</span>
                    <input type="checkbox" className="w-4 h-4 bg-[#1A2433] border-[#374151] rounded" />
                  </div>

                  {/* MRI Film Received */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">MRI Film Received</span>
                    <input type="checkbox" className="w-4 h-4 bg-[#1A2433] border-[#374151] rounded" />
                  </div>

                  {/* Subrogation Payout/Lien received */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Subrogation Payout/Lien received</span>
                    <input type="text" className="bg-[#1A2433] border border-[#374151] rounded px-3 py-1 text-white" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'financial' && (
          <div className="w-full space-y-6">
            {/* Top Row - Two Columns */}
            <div className="grid grid-cols-2 gap-6 w-full">
              {/* Summary Section */}
              <div className="w-full bg-[#0E1826] rounded-[10px] p-6">
                <div 
                  className="flex items-center justify-between cursor-pointer mb-4"
                  onClick={() => toggleSection('summary')}
                >
                  <h2 className="text-[20px] font-medium text-white">Case Value Summary</h2>
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
                        {/* Total Recovery */}
                        <div className="flex justify-between items-center pb-3 border-b border-[#374151]">
                          <span className="text-gray-400">Total Recovery</span>
                          <span className="text-white font-medium">$50,000.00</span>
                        </div>
                        
                        {/* Total Fees */}
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Total Fees (33%)</span>
                          <span className="text-red-400">-$16,500.00</span>
                        </div>
                        
                        {/* Recovery Minus Fees */}
                        <div className="flex justify-between items-center pb-3 border-b border-[#374151]">
                          <span className="text-gray-400">Recovery Minus Fees</span>
                          <span className="text-white">$33,500.00</span>
                        </div>
                        
                        {/* Subtotal */}
                        <div className="flex justify-between items-center pb-3 border-b border-[#374151]">
                          <span className="text-gray-400">Subtotal</span>
                          <span className="text-white font-medium">$33,500.00</span>
                        </div>
                        
                        {/* Total Expenses */}
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-gray-400">Total Expenses</span>
                            <span className="text-gray-400 text-xs ml-2">(Case: $3,500 + Medical: $15,000)</span>
                          </div>
                          <span className="text-red-400">-$18,500.00</span>
                        </div>
                        
                        {/* Client Payment Amount */}
                        <div className="flex justify-between items-center pt-3 border-t border-[#374151]">
                          <span className="text-white font-medium">Client Payment Amount</span>
                          <span className="text-green-400 text-xl font-semibold">$15,000.00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Policy Section */}
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
                {expandedSections.policy && (
                  <div className="space-y-4">
                    <div className="bg-[#151F2D] p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h3 className="text-white font-medium">State Farm Insurance</h3>
                          <p className="text-gray-400 text-sm">BI Policy</p>
                        </div>
                        <span className="text-white font-medium">$50,000.00</span>
                      </div>
                      <Progress value={60} className="h-2" />
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex gap-2">
                          <span className="text-gray-400 text-sm">Expected: $30,000.00</span>
                          <span className="text-red-400 text-sm">Firm: -$9,900.00</span>
                        </div>
                        <span className="text-blue-400 text-sm">60%</span>
                      </div>
                    </div>
                    <div className="bg-[#151F2D] p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h3 className="text-white font-medium">Progressive Insurance</h3>
                          <p className="text-gray-400 text-sm">UM Policy</p>
                        </div>
                        <span className="text-white font-medium">$25,000.00</span>
                      </div>
                      <Progress value={80} className="h-2" />
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex gap-2">
                          <span className="text-gray-400 text-sm">Expected: $20,000.00</span>
                          <span className="text-red-400 text-sm">Firm: -$6,600.00</span>
                        </div>
                        <span className="text-blue-400 text-sm">80%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Full Width Sections */}
            {/* Medical Bills Section */}
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
              {expandedSections.medical && (
                <div className="space-y-4">
                  {/* Summary Cards */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-[#151F2D] p-4 rounded-lg">
                      <span className="text-gray-400 text-sm">Original Balance</span>
                      <p className="text-2xl font-semibold text-white mt-1">$75,000.00</p>
                    </div>
                    <div className="bg-[#151F2D] p-4 rounded-lg">
                      <span className="text-gray-400 text-sm">Client Owes</span>
                      <p className="text-2xl font-semibold text-red-400 mt-1">$15,000.00</p>
                    </div>
                  </div>

                  {/* Detailed Breakdown */}
                  <div className="bg-[#151F2D] p-4 rounded-lg">
                    <h3 className="text-white font-medium mb-4">Bill Breakdown</h3>
                    <div className="space-y-4">
                      {/* Original Balance */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-400">Original Balance</span>
                          <span className="text-white">$75,000.00</span>
                        </div>
                        <Progress value={100} className="h-2 bg-[#374151]" />
                      </div>

                      {/* Insurance Payment */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-400">Insurance Payment</span>
                          <span className="text-green-400">-$45,000.00</span>
                        </div>
                        <Progress value={60} className="h-2 bg-[#374151]" />
                      </div>

                      {/* Firm Reduction */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-400">Firm Reduction</span>
                          <span className="text-blue-400">-$15,000.00</span>
                        </div>
                        <Progress value={20} className="h-2 bg-[#374151]" />
                      </div>

                      {/* Client Owes */}
                      <div className="pt-3 border-t border-[#374151]">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">Client Owes</span>
                          <span className="text-red-400 text-lg font-semibold">$15,000.00</span>
                        </div>
                        <Progress value={20} className="h-2 bg-[#374151] mt-2" />
                      </div>
                    </div>
                  </div>

                  {/* Provider Breakdown */}
                  <div className="bg-[#151F2D] p-4 rounded-lg">
                    <h3 className="text-white font-medium mb-3">Provider Breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 hover:bg-[#1A2433] rounded-lg">
                        <div>
                          <p className="text-white">City General Hospital</p>
                          <p className="text-gray-400 text-sm">Emergency Care</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white">$45,000.00</p>
                          <p className="text-red-400 text-sm">Owes: $8,000.00</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-2 hover:bg-[#1A2433] rounded-lg">
                        <div>
                          <p className="text-white">PhysioHealth Center</p>
                          <p className="text-gray-400 text-sm">Physical Therapy</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white">$30,000.00</p>
                          <p className="text-red-400 text-sm">Owes: $7,000.00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Expenses Section */}
            <div className="w-full bg-[#0E1826] rounded-[10px] p-6">
              <div 
                className="flex items-center justify-between cursor-pointer mb-4"
                onClick={() => toggleSection('expenses')}
              >
                <h2 className="text-[20px] font-medium text-white">Case Expenses</h2>
                {expandedSections.expenses ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </div>
              {expandedSections.expenses && (
                <div className="space-y-4">
                  <div className="bg-[#151F2D] p-4 rounded-lg">
                    <span className="text-gray-400 text-sm">Total Expenses</span>
                    <p className="text-2xl font-semibold text-white mt-1">$3,500.00</p>
                  </div>
                  <div className="bg-[#151F2D] p-4 rounded-lg">
                    <h3 className="text-white font-medium mb-3">Expense Categories</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-400">Filing Fees</span>
                          <span className="text-white">$1,200.00</span>
                        </div>
                        <Progress value={34} className="h-1.5" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-400">Expert Witnesses</span>
                          <span className="text-white">$1,500.00</span>
                        </div>
                        <Progress value={43} className="h-1.5" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-400">Records Requests</span>
                          <span className="text-white">$800.00</span>
                        </div>
                        <Progress value={23} className="h-1.5" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

