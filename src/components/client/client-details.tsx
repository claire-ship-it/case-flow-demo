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

interface ClientDetailsProps {
  client: Client
}

interface Document {
  id: string
  title: string
  type: "BI Demand" | "UM Demand" | "Medical Records" | "Other"
  date: string
  size: string
}

export function ClientDetails({ client }: ClientDetailsProps) {
  const [expandedSections, setExpandedSections] = useState({
    timeline: true,
    accident: false,
    crash: false,
    medical: false,
    billing: false
  })
  const [documents, setDocuments] = useState<Document[]>([])
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  
  const timelinePoints = getTimelinePoints(client.dateOfLoss, client.statusOfLimitation || "")

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // Initial documents - only set on first render
  useEffect(() => {
    // Initial documents
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
  }, []) // Empty dependency array - only run once on mount

  // Check for pending documents immediately on mount
  useEffect(() => {
    const storedDemandType = localStorage.getItem('generatedDemandType')
    const storedDemandTime = localStorage.getItem('generatedDemandTime')
    
    if (storedDemandType && storedDemandTime) {
      const demandTime = parseInt(storedDemandTime)
      const now = new Date().getTime()
      
      // If demand was generated in the last 5 minutes
      if (now - demandTime < 300000) {
        const newDoc: Document = {
          id: `doc-${Math.random().toString(36).substr(2, 9)}`,
          title: `${storedDemandType} Demand Letter - ${client.name}`,
          type: storedDemandType === "BI" ? "BI Demand" : "UM Demand",
          date: new Date().toLocaleDateString(),
          size: "0.8 MB"
        }
        
        setDocuments(prev => [newDoc, ...prev])
        localStorage.removeItem('generatedDemandType')
        localStorage.removeItem('generatedDemandTime')
      }
    }
  }, [client.name])

  // Separate effect for checking new documents
  useEffect(() => {
    // This simulates checking for newly generated documents
    const checkForNewDocuments = () => {
      const storedDemandType = localStorage.getItem('generatedDemandType')
      const storedDemandTime = localStorage.getItem('generatedDemandTime')
      
      console.log('Checking for new documents:', { storedDemandType, storedDemandTime })
      
      if (storedDemandType && storedDemandTime) {
        const demandTime = parseInt(storedDemandTime)
        const now = new Date().getTime()
        
        // If demand was generated in the last 5 minutes
        if (now - demandTime < 300000) {
          setDocuments(prev => {
            // Check if we already have this document
            if (prev.some(doc => doc.title.includes(storedDemandType))) {
              return prev;
            }
            
            // Add new document
            const newDoc: Document = {
              id: `doc-${prev.length + 1}`,
              title: `${storedDemandType} Demand Letter - ${client.name}`,
              type: storedDemandType === "BI" ? "BI Demand" : "UM Demand",
              date: new Date().toLocaleDateString(),
              size: "0.8 MB"
            }
            
            localStorage.removeItem('generatedDemandType')
            localStorage.removeItem('generatedDemandTime')
            return [newDoc, ...prev];
          });
        }
      }
    }
    
    const interval = setInterval(checkForNewDocuments, 5000)
    return () => clearInterval(interval)
  }, [client.name]) // Only depend on client.name

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document)
    setIsViewerOpen(true)
  }

  return (
    <div className="w-full lg:w-2/3 space-y-6">
      {/* Client Details Section */}
      <div className="bg-[#1E293B] rounded-lg p-6">
        <div className="border-b border-gray-700 pb-3 mb-3">
          <h3 className="text-white font-medium">Client Details</h3>
        </div>

        <div className="space-y-6">
          {/* Timeline Section */}
          <div className="w-full bg-[#0E1826] rounded-[10px] p-6">
            <div 
              className="flex justify-between items-center cursor-pointer" 
              onClick={() => toggleSection('timeline')}
            >
              <h3 className="text-[16px] font-semibold text-white">Timeline</h3>
              <div className="text-gray-400">
                {expandedSections.timeline ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </div>
            </div>
            {expandedSections.timeline && (
              <div className="mt-6">
                {/* Timeline visualization */}
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute top-4 left-0 w-full h-[2px] bg-gray-700">
                    {/* Progress line */}
                    <div className="absolute top-0 left-0 h-full bg-blue-500 w-[40%]"></div>
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
            )}
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
            <div className="space-y-4">
              {client.medicalProviders.slice(0, 3).map((provider, index) => (
                <div key={index} className="bg-[#151F2D] p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-medium">{provider.name}</h4>
                    <span className="text-gray-400 text-sm">{provider.visits[0]?.date || "No date"}</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    {provider.visits[0]?.summary || "No treatment summary available."}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Accident Info Section */}
          <div className="w-full bg-[#0E1826] rounded-[10px] p-6">
            <div 
              className="flex justify-between items-center cursor-pointer" 
              onClick={() => toggleSection('accident')}
            >
              <h3 className="text-[16px] font-semibold text-white">Accident Info</h3>
              <div className="text-gray-400">
                {expandedSections.accident ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </div>
            </div>
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
            <div 
              className="flex justify-between items-center cursor-pointer" 
              onClick={() => toggleSection('crash')}
            >
              <h3 className="text-[16px] font-semibold text-white">Crash Report</h3>
              <div className="text-gray-400">
                {expandedSections.crash ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </div>
            </div>
            {expandedSections.crash && client?.crashReport && (
              <div className="mt-4 space-y-6">
                {/* Accident Narrative - Non-collapsible */}
                <div className="bg-[#151F2D] rounded-lg p-4">
                  <h3 className="text-white font-medium mb-3">Accident Narrative</h3>
                  <p className="text-gray-300 text-sm leading-6">
                    {client.crashReport.narrative || "No accident narrative available."}
                  </p>
                </div>

                {/* Liability Statement - Non-collapsible */}
                <div className="bg-[#151F2D] rounded-lg p-4">
                  <h3 className="text-white font-medium mb-3">Liability Statement</h3>
                  <p className="text-gray-300 text-sm leading-6">
                    {client.crashReport.liabilityStatement || "No liability statement available."}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Medical Billing Section */}
          <div className="w-full bg-[#0E1826] rounded-[10px] p-6">
            <div 
              className="flex justify-between items-center cursor-pointer" 
              onClick={() => toggleSection('billing')}
            >
              <h3 className="text-[16px] font-semibold text-white">Medical Billing</h3>
              <div className="text-gray-400">
                {expandedSections.billing ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </div>
            </div>
            {expandedSections.billing && (
              <div className="mt-4 space-y-6">
                {/* Billing Summary */}
                <div className="bg-[#151F2D] p-4 rounded-lg">
                  <h3 className="text-white font-medium mb-3">Billing Summary</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Total Billed</p>
                      <p className="text-white text-lg font-medium">
                        ${client.medicalProviders.reduce((total, provider) => total + provider.billingInfo.totalBilled, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Outstanding</p>
                      <p className="text-red-400 text-lg font-medium">
                        ${client.medicalProviders.reduce((total, provider) => total + provider.billingInfo.outstandingBalance, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
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
      </div>

      {/* Document Viewer */}
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

