"use client"

import { User, Briefcase, Users, CheckCircle, Mail, Phone, Calendar, FileText, ChevronDown, ChevronRight, Link, 
  Car, FileCheck, BadgeDollarSign, FileWarning, Clock, Star, Info, PhoneCall, Mail as MailIcon, PlusCircle, AlertTriangle, Home } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { type Client } from "@/data/clients"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getTimelinePoints } from "@/utils/timeline"

interface ClientDetailsProps {
  client: Client
}

export function ClientDetails({ client }: ClientDetailsProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean
  }>({
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
    accidentNarrative: false
  })
  const [showInsuranceDialog, setShowInsuranceDialog] = useState(false)

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

  const formatNarrativeWithTooltips = (narrative: string, client: Client) => {
    // Replace V01 with a tooltip
    let formattedNarrative = narrative.replace(
      /V01/g, 
      `<span class="text-blue-400 cursor-help">V01</span>`
    );
    
    // Replace V02 with a tooltip
    formattedNarrative = formattedNarrative.replace(
      /V02/g, 
      `<span class="text-blue-400 cursor-help">V02</span>`
    );
    
    // Replace D01 with a tooltip
    formattedNarrative = formattedNarrative.replace(
      /D01/g, 
      `<span class="text-blue-400 cursor-help">D01</span>`
    );
    
    // Split the narrative into parts to add tooltips
    const parts = formattedNarrative.split(/(<span class="text-blue-400 cursor-help">[^<]+<\/span>)/g);
    
    return (
      <TooltipProvider>
        {parts.map((part, index) => {
          if (part.includes('V01')) {
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <span className="text-blue-400 cursor-help">V01</span>
                </TooltipTrigger>
                <TooltipContent className="bg-[#1E293B] text-white border-[#374151] p-4 max-w-md">
                  <div className="space-y-2">
                    <h4 className="font-medium">Client's Vehicle</h4>
                    {client.vehicles.find(v => v.isClient) && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Year/Make/Model:</span>
                          <span>{client.vehicles.find(v => v.isClient)?.year} {client.vehicles.find(v => v.isClient)?.make} {client.vehicles.find(v => v.isClient)?.model}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Color:</span>
                          <span>{client.vehicles.find(v => v.isClient)?.color}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">License Plate:</span>
                          <span>{client.vehicles.find(v => v.isClient)?.licensePlate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">VIN:</span>
                          <span>{client.vehicles.find(v => v.isClient)?.vin}</span>
                        </div>
                      </>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          } else if (part.includes('V02')) {
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <span className="text-blue-400 cursor-help">V02</span>
                </TooltipTrigger>
                <TooltipContent className="bg-[#1E293B] text-white border-[#374151] p-4 max-w-md">
                  <div className="space-y-2">
                    <h4 className="font-medium">Defendant's Vehicle</h4>
                    {client.vehicles.find(v => !v.isClient && v.driver?.name === client.defendants[0]?.name) && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Year/Make/Model:</span>
                          <span>
                            {client.vehicles.find(v => !v.isClient && v.driver?.name === client.defendants[0]?.name)?.year}{' '}
                            {client.vehicles.find(v => !v.isClient && v.driver?.name === client.defendants[0]?.name)?.make}{' '}
                            {client.vehicles.find(v => !v.isClient && v.driver?.name === client.defendants[0]?.name)?.model}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Color:</span>
                          <span>{client.vehicles.find(v => !v.isClient && v.driver?.name === client.defendants[0]?.name)?.color}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">License Plate:</span>
                          <span>{client.vehicles.find(v => !v.isClient && v.driver?.name === client.defendants[0]?.name)?.licensePlate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">VIN:</span>
                          <span>{client.vehicles.find(v => !v.isClient && v.driver?.name === client.defendants[0]?.name)?.vin}</span>
                        </div>
                      </>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          } else if (part.includes('D01')) {
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <span className="text-blue-400 cursor-help">D01</span>
                </TooltipTrigger>
                <TooltipContent className="bg-[#1E293B] text-white border-[#374151] p-4 max-w-md">
                  <div className="space-y-2">
                    <h4 className="font-medium">Client (Driver)</h4>
                    {client.vehicles.find(v => v.isClient)?.driver && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Name:</span>
                          <span>{client.vehicles.find(v => v.isClient)?.driver.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">License Number:</span>
                          <span>{client.vehicles.find(v => v.isClient)?.driver.licenseNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Insurance:</span>
                          <span>{client.vehicles.find(v => v.isClient)?.driver.insuranceProvider}</span>
                        </div>
                      </>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          } else {
            return <span key={index}>{part}</span>;
          }
        })}
      </TooltipProvider>
    );
  };

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
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Primary Email</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white">{client.primaryEmail}</span>
                          {client.backupEmail && (
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
                  {/* Accident Narrative - Non-collapsible */}
                  <div className="bg-[#151F2D] rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">Accident Narrative</h4>
                    <div className="text-white text-sm leading-6">
                      <p className="mb-4">
                        Vehicle #1 was traveling northbound on US Highway 41, north of Sunset Lane, in the inside lane. Vehicle #2 was traveling northbound on US Highway 41, north of Sunset Lane, in the inside lane, in front of Vehicle #1. Vehicle #3 was traveling southbound on US Highway 41, approaching the same intersection.
                      </p>
                      <p className="mb-4">
                        Driver of Vehicle #2 stated she was stopped in traffic ahead. Driver of Vehicle #1 was driving in a careless manner and failed to see Vehicle #2 was stopped for traffic ahead. Driver of Vehicle #3 was traveling at the posted speed limit when he observed the collision ahead.
                      </p>
                      <p className="mb-4">
                        The front driver's side of Vehicle #1 collided with the rear passenger side of Vehicle #2, in a front to rear manner of collision. Vehicle #3 was able to stop safely without involvement in the collision.
                      </p>
                      <p>
                        Vehicle #1 was moved north to the inside U-Turn lane prior to officer arrival. Vehicle #2 remained in the travel lane. Vehicle #3 was moved to the southbound shoulder.
                      </p>
                    </div>
                  </div>

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
                          <div key={index} className="space-y-2 p-3 bg-[#151F2D] rounded-md mt-3">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">Name</span>
                              <span className="text-white">{person.name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">Role</span>
                              <span className="text-white capitalize">{person.role}</span>
                            </div>
                            {person.statements && person.statements.length > 0 && (
                              <div className="flex flex-col gap-2">
                                <span className="text-gray-400">Statement</span>
                                <p className="text-white text-sm leading-6">{person.statements[0]}</p>
                              </div>
                            )}
                            {person.injuries && person.injuries.length > 0 && (
                              <div className="flex flex-col gap-2">
                                <span className="text-gray-400">Injuries</span>
                                <p className="text-white text-sm leading-6">{person.injuries.join(', ')}</p>
                              </div>
                            )}
                          </div>
                        ))}
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
                        <span className="text-white">{client.crashReport.violations.length} violation(s)</span>
                      </div>
                      {expandedSections.violations ? (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    
                    {expandedSections.violations && (
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

                  {/* Liability and County */}
                  <div className="bg-[#151F2D] rounded-lg p-4">
                    <div className="flex flex-col gap-2">
                      <span className="text-gray-400">Liability Statement</span>
                      <p className="text-white text-sm leading-6">{client.crashReport.liabilityStatement}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
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
            {/* Summary Section */}
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
                      {/* Total Recovery */}
                      <div className="flex justify-between items-center pb-3 border-b border-[#374151]">
                        <span className="text-gray-400">Total Recovery</span>
                        <span className="text-white font-medium">
                          ${client.insurancePolicies.reduce((sum, policy) => {
                            const limit = parseFloat(policy.limit.replace(/[^0-9.-]+/g, ''));
                            return sum + limit;
                          }, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                      
                      {/* Total Fees */}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Total Fees (33%)</span>
                        <span className="text-red-400">
                          -${(client.insurancePolicies.reduce((sum, policy) => {
                            const limit = parseFloat(policy.limit.replace(/[^0-9.-]+/g, ''));
                            return sum + limit;
                          }, 0) * 0.33).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-3 border-b border-[#374151]">
                        <span className="text-gray-400">Recovery Minus Fees</span>
                        <span className="text-white">
                          ${(client.insurancePolicies.reduce((sum, policy) => {
                            const limit = parseFloat(policy.limit.replace(/[^0-9.-]+/g, ''));
                            return sum + limit;
                          }, 0) * 0.67).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                      
                      {/* Subtotal */}
                      <div className="flex justify-between items-center pb-3 border-b border-[#374151]">
                        <span className="text-gray-400">Subtotal</span>
                        <span className="text-white font-medium">
                          ${(client.insurancePolicies.reduce((sum, policy) => {
                            const limit = parseFloat(policy.limit.replace(/[^0-9.-]+/g, ''));
                            return sum + limit;
                          }, 0) * 0.67).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                      
                      {/* Total Expenses */}
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-gray-400">Total Expenses</span>
                        </div>
                        <span className="text-red-400">
                          -${client.medicalProviders.reduce((sum, provider) => 
                            sum + provider.billingInfo.totalBilled, 0
                          ).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                      
                      {/* Client Payment Amount */}
                      <div className="flex justify-between items-center pt-3 border-t border-[#374151]">
                        <span className="text-white font-medium">Client Payment Amount</span>
                        <span className="text-green-400 text-xl font-semibold">
                          ${(client.insurancePolicies.reduce((sum, policy) => {
                            const limit = parseFloat(policy.limit.replace(/[^0-9.-]+/g, ''));
                            return sum + limit;
                          }, 0) * 0.67 - client.medicalProviders.reduce((sum, provider) => 
                            sum + provider.billingInfo.totalBilled, 0
                          )).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
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
                  {client.insurancePolicies.map((policy) => (
                    <div key={policy.id} className="bg-[#151F2D] p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h3 className="text-white font-medium">{policy.provider.name}</h3>
                          <p className="text-gray-400 text-sm">{policy.type} Policy</p>
                        </div>
                        <span className="text-white font-medium">{policy.limit}</span>
                      </div>
                      <Progress value={parseFloat(policy.expectedSettlement.replace(/[^0-9.-]+/g, '')) / parseFloat(policy.limit.replace(/[^0-9.-]+/g, '')) * 100} className="h-2" />
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex gap-2">
                          <span className="text-gray-400 text-sm">Expected: {policy.expectedSettlement}</span>
                          <span className="text-red-400 text-sm">Firm: {policy.expectedFirmFee}</span>
                        </div>
                        <span className="text-blue-400 text-sm">
                          {Math.round(parseFloat(policy.expectedSettlement.replace(/[^0-9.-]+/g, '')) / parseFloat(policy.limit.replace(/[^0-9.-]+/g, '')) * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

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
                      <p className="text-2xl font-semibold text-white mt-1">
                        ${client.medicalProviders.reduce((sum, provider) => 
                          sum + provider.billingInfo.totalBilled, 0
                        ).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="bg-[#151F2D] p-4 rounded-lg">
                      <span className="text-gray-400 text-sm">Client Owes</span>
                      <p className="text-2xl font-semibold text-red-400 mt-1">
                        ${client.medicalProviders.reduce((sum, provider) => 
                          sum + provider.billingInfo.outstandingBalance, 0
                        ).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>

                  {/* Detailed Breakdown */}
                  <div className="bg-[#151F2D] p-4 rounded-lg">
                    <h3 className="text-white font-medium mb-4">Bill Breakdown</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-400">Original Balance</span>
                          <span className="text-white">
                            ${client.medicalProviders.reduce((sum, provider) => 
                              sum + provider.billingInfo.totalBilled, 0
                            ).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                        <Progress value={100} className="h-2 bg-[#374151]" />
                      </div>

                      {/* Insurance Payment */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-400">Insurance Payment</span>
                          <span className="text-green-400">
                            -${client.medicalProviders.reduce((sum, provider) => 
                              sum + provider.billingInfo.totalPaid, 0
                            ).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                        <Progress 
                          value={client.medicalProviders.reduce((sum, provider) => 
                            sum + provider.billingInfo.totalPaid, 0
                          ) / client.medicalProviders.reduce((sum, provider) => 
                            sum + provider.billingInfo.totalBilled, 0
                          ) * 100} 
                          className="h-2 bg-[#374151]" 
                        />
                      </div>

                      {/* Firm Reduction */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-400">Firm Reduction</span>
                          <span className="text-blue-400">
                            -${(client.medicalProviders.reduce((sum, provider) => 
                              sum + provider.billingInfo.totalBilled, 0
                            ) - client.medicalProviders.reduce((sum, provider) => 
                              sum + provider.billingInfo.totalPaid, 0
                            ) - client.medicalProviders.reduce((sum, provider) => 
                              sum + provider.billingInfo.outstandingBalance, 0
                            )).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                        <Progress 
                          value={(client.medicalProviders.reduce((sum, provider) => 
                            sum + provider.billingInfo.totalBilled, 0
                          ) - client.medicalProviders.reduce((sum, provider) => 
                            sum + provider.billingInfo.totalPaid, 0
                          ) - client.medicalProviders.reduce((sum, provider) => 
                            sum + provider.billingInfo.outstandingBalance, 0
                          )) / client.medicalProviders.reduce((sum, provider) => 
                            sum + provider.billingInfo.totalBilled, 0
                          ) * 100} 
                          className="h-2 bg-[#374151]" 
                        />
                      </div>

                      <div className="pt-3 border-t border-[#374151]">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">Client Owes</span>
                          <span className="text-red-400 text-lg font-semibold">
                            ${client.medicalProviders.reduce((sum, provider) => 
                              sum + provider.billingInfo.outstandingBalance, 0
                            ).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                        <Progress 
                          value={client.medicalProviders.reduce((sum, provider) => 
                            sum + provider.billingInfo.outstandingBalance, 0
                          ) / client.medicalProviders.reduce((sum, provider) => 
                            sum + provider.billingInfo.totalBilled, 0
                          ) * 100} 
                          className="h-2 bg-[#374151] mt-2" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Provider Breakdown */}
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
                              ${provider.billingInfo.totalBilled.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                            <p className="text-red-400 text-sm">
                              Owes: ${provider.billingInfo.outstandingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
    </div>
  )
}

