"use client"

import React, { useEffect } from 'react'
import { Link, ChevronDown, Plus, FileText, Pencil, Clock, CheckCircle2, AlertCircle, Gavel, Folders, Code, Camera, Search, Filter, DollarSign, FileCheck, Building2, User, Mail, Phone, Calendar, Printer, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Client, MedicalProvider } from "@/data/clients"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

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
  const [selectedProvider, setSelectedProvider] = useState<MedicalProvider | null>(null)
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
  const [documents, setDocuments] = useState(client.documents || [])
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [viewingDocumentId, setViewingDocumentId] = useState<number | null>(null)

  // Auto-select first provider and visit when switching to medical-providers tab
  useEffect(() => {
    if (activeTab === 'medical-providers' && client.medicalProviders && client.medicalProviders.length > 0) {
      setSelectedProvider(client.medicalProviders[0]);
      if (client.medicalProviders[0].visits.length > 0) {
        setSelectedVisit(client.medicalProviders[0].visits[0].id);
      }
    }
  }, [activeTab, client.medicalProviders]);

  // Auto-select first request when switching to medical-requests tab
  useEffect(() => {
    if (activeTab === 'medical-requests' && client.medicalRequests.length > 0 && selectedRequest === null) {
      setSelectedRequest(client.medicalRequests[0].id);
    }
  }, [activeTab, client.medicalRequests]);

  // Auto-select first task when switching to tasks tab
  useEffect(() => {
    if (activeTab === 'tasks' && client.tasks.length > 0 && selectedTask === null) {
      setSelectedTask(client.tasks[0].id);
    }
  }, [activeTab, client.tasks]);

  // Auto-select first log when switching to case-logs tab
  useEffect(() => {
    if (activeTab === 'case-logs' && client.caseLogs.length > 0 && selectedLog === null) {
      setSelectedLog(client.caseLogs[0].id);
    }
  }, [activeTab, client.caseLogs]);

  // Auto-select first document when switching to documents tab
  useEffect(() => {
    if (activeTab === 'documents' && client.documents.length > 0 && selectedDocument === null) {
      setSelectedDocument(client.documents[0].id);
    }
  }, [activeTab, client.documents]);

  // Add this useEffect to check for new documents
  useEffect(() => {
    // Check localStorage for new documents
    const storedDocs = JSON.parse(localStorage.getItem('clientDocuments') || '[]')
    if (storedDocs.length > 0) {
      // Merge with existing documents, avoiding duplicates
      const updatedDocs = [...documents]
      storedDocs.forEach(newDoc => {
        if (!updatedDocs.some(doc => doc.id === newDoc.id)) {
          updatedDocs.unshift(newDoc)
        }
      })
      setDocuments(updatedDocs)
    }
    
    // Set up interval to check for new documents
    const interval = setInterval(() => {
      const refreshedDocs = JSON.parse(localStorage.getItem('clientDocuments') || '[]')
      if (refreshedDocs.length > 0) {
        setDocuments(prevDocs => {
          const updatedDocs = [...prevDocs]
          refreshedDocs.forEach(newDoc => {
            if (!updatedDocs.some(doc => doc.id === newDoc.id)) {
              updatedDocs.unshift(newDoc)
            }
          })
          return updatedDocs
        })
      }
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // Function to navigate between visits for current provider
  const navigateVisit = (direction: 'prev' | 'next') => {
    if (!selectedVisit) return;
    
    const currentProvider = client.medicalProviders.find(p => p.visits.some(v => v.id === selectedVisit));
    if (!currentProvider) return;

    // Filter visits for current provider
    const providerVisits = currentProvider.visits.filter(
      v => v.facility.name === currentProvider.name
    );
    
    const currentIndex = providerVisits.findIndex(v => v.id === selectedVisit);
    if (currentIndex === -1) return;
    
    if (direction === 'prev' && currentIndex > 0) {
      setSelectedVisit(providerVisits[currentIndex - 1].id);
    } else if (direction === 'next' && currentIndex < providerVisits.length - 1) {
      setSelectedVisit(providerVisits[currentIndex + 1].id);
    }
  };

  const handleViewProvider = (provider: MedicalProvider) => {
    setSelectedProvider(provider);
    if (provider.visits.length > 0) {
      setSelectedVisit(provider.visits[0].id);
    }
  }

  // Add this function to handle viewing a document
  const handleViewDocument = (docId: number) => {
    setViewingDocumentId(docId)
    setIsViewerOpen(true)
  }

  // Add this to close the viewer
  const closeViewer = () => {
    setIsViewerOpen(false)
    setViewingDocumentId(null)
  }

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
                {client.medicalProviders.map((provider) => (
                  <div
                    key={provider.id}
                    onClick={() => handleViewProvider(provider)}
                    className={`flex items-center justify-between p-4 bg-[#151F2D] rounded-xl cursor-pointer ${
                      selectedProvider?.id === provider.id ? 'border-l-2 border-[#228BE6]' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-[#374151] rounded-full flex items-center justify-center text-[#E6E0E9]">
                        🏥
                      </div>
                      <div>
                        <h3 className="text-[16px] font-medium text-[#E6E0E9]">{provider.name}</h3>
                        <p className="text-[14px] text-[#ADB5BD]">{provider.visits[0]?.date}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs ${
                      provider.visits[0]?.status === 'paid' ? 'bg-green-900/50 text-green-400' : 'bg-yellow-900/50 text-yellow-400'
                    }`}>
                      {provider.visits[0]?.status === 'paid' ? 'Paid' : 'Pending Insurance'}
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
                            <p className="text-[12px] text-[#ADB5BD]">{client.medicalProviders.find(p => p.visits.some(v => v.id === selectedVisit))?.visits.find(v => v.id === selectedVisit)?.date}</p>
                          </div>
                          <div className="text-right">
                            <h3 className="text-[14px] text-[#E6E0E9] font-medium">Number of Visits</h3>
                            <p className="text-[12px] text-[#ADB5BD]">{client.medicalProviders.find(p => p.visits.some(v => v.id === selectedVisit))?.visits.length} visits</p>
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
                          const currentProvider = client.medicalProviders.find(p => p.visits.some(v => v.id === selectedVisit));
                          const currentVisit = currentProvider?.visits.find(v => v.id === selectedVisit);
                          if (!currentProvider || !currentVisit) return null;

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
                              const currentProvider = client.medicalProviders.find(p => p.visits.some(v => v.id === selectedVisit));
                              const currentVisit = currentProvider?.visits.find(v => v.id === selectedVisit);
                              if (!currentProvider || !currentVisit) return null;

                              // Filter visits for current provider
                              const providerVisits = currentProvider.visits.filter(
                                v => v.facility.name === currentProvider.name
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
                                      <p className="text-[14px] text-[#E6E0E9] font-medium">{currentVisit.date}</p>
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
                                      {currentVisit.summary}
                                    </p>
                                  </div>
                                </div>
                              );

                            case 'codes':
                              const selectedProvider = client.medicalProviders.find(p => p.visits.some(v => v.id === selectedVisit));
                              const selectedVisitData = selectedProvider?.visits.find(v => v.id === selectedVisit);
                              
                              if (!selectedProvider || !selectedVisitData) return null;

                              return (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-3 gap-4">
                                    <div>
                                      <span className="text-[12px] text-[#ADB5BD]">CPT Code</span>
                                    </div>
                                    <div>
                                      <span className="text-[12px] text-[#ADB5BD]">Description</span>
                                    </div>
                                    <div className="text-right">
                                      <span className="text-[12px] text-[#ADB5BD]">Amount</span>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    {selectedVisitData.cptCodes.map((code, index) => (
                                      <div key={index} className="grid grid-cols-3 gap-4 items-center py-2 border-b border-gray-700">
                                        <div>
                                          <span className="text-[#E6E0E9] font-mono">{code.code}</span>
                                        </div>
                                        <div>
                                          <span className="text-[#E6E0E9] text-sm">{code.description}</span>
                                        </div>
                                        <div className="text-right">
                                          <span className="text-[#E6E0E9] text-sm">${code.amount.toFixed(2)}</span>
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
                            const activeProvider = client.medicalProviders.find(p => p.visits.some(v => v.id === selectedVisit));
                            const activeVisit = activeProvider?.visits.find(v => v.id === selectedVisit);
                            if (activeVisit?.documents?.find(d => d.type === "bill")) {
                              window.open(activeVisit.documents.find(d => d.type === "bill")?.link, '_blank');
                            }
                          }}
                        >
                          <FileText size={14} />
                          View Latest Bill
                        </button>
                      </div>
                      {(() => {
                        const billingProvider = client.medicalProviders.find(p => p.visits.some(v => v.id === selectedVisit));
                        
                        if (!billingProvider) return null;

                        return (
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-[#ADB5BD]">Total Billed</span>
                              <span className="text-[#E6E0E9]">${billingProvider.billingInfo.totalBilled.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#ADB5BD]">Total Paid</span>
                              <span className="text-green-400">-${billingProvider.billingInfo.totalPaid.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#ADB5BD]">Outstanding Balance</span>
                              <span className="text-[#E6E0E9]">${billingProvider.billingInfo.outstandingBalance.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                              <span className="text-[#ADB5BD]">Last Payment Date</span>
                              <span className="text-[#E6E0E9] text-sm">
                                {billingProvider.billingInfo.lastPaymentDate || 'No payments yet'}
                              </span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Provider Information */}
                  {selectedVisit && client.medicalProviders.find(p => p.visits.some(v => v.id === selectedVisit)) && (
                    <div className="bg-[#151F2D] rounded-lg overflow-hidden">
                      <div className="p-4">
                        <h2 className="text-[16px] font-medium text-white mb-4">Provider Information</h2>
                        <div className="space-y-4">
                          {(() => {
                            const visit = client.medicalProviders.find(p => p.visits.some(v => v.id === selectedVisit))?.visits.find(v => v.id === selectedVisit)!;
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
            {client.medicalRequests.map((request) => (
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
                  {client.tasks.map((task) => (
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
                        <div className="flex items-center justify-start gap-2">
                          <div className="h-8 w-8 bg-[#374151] rounded-full flex items-center justify-center text-lg">
                            {task.responsible.role === "Paralegal" ? "👩‍⚖️" : 
                             task.responsible.role === "Attorney" ? "⚖️" : 
                             task.responsible.role === "Case Manager" ? "📋" : 
                             "👤"}
                          </div>
                          <span className="text-[#E6E0E9] text-sm">{task.responsible.name}</span>
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
                  {client.caseLogs.map((log) => (
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
                placeholder="Search documents..."
                className="w-full bg-[#1E293B] text-white placeholder-gray-400 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Search className="w-4 h-4 text-gray-400" />
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
                    <button 
                      className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors"
                      onClick={() => handleViewDocument(doc.id)}
                    >
                      <span>View</span>
                      <FileText className="w-4 h-4" />
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

      {/* Document Viewer Dialog */}
      {isViewerOpen && (
        <Dialog open={isViewerOpen} onOpenChange={closeViewer}>
          <DialogContent className="max-w-none w-full h-[90vh] bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col p-0 overflow-hidden text-black">
            <DialogHeader className="px-6 py-4 border-b border-gray-300">
              <DialogTitle className="text-lg font-semibold text-black">
                {documents.find(d => d.id === viewingDocumentId)?.title || "Document"}
              </DialogTitle>
              <DialogDescription className="text-gray-700 mt-1">
                {documents.find(d => d.id === viewingDocumentId)?.description || ""}
              </DialogDescription>
            </DialogHeader>
            <div
              className="flex-1 h-full overflow-y-auto bg-white p-6 md:p-8"
              dangerouslySetInnerHTML={{
                __html: `
                  <!DOCTYPE html>
<html lang="en" style="margin: 0; padding: 0; line-height: 0; box-sizing: border-box;">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hughes Law Demand Letter</title>
</head>
<body style="margin: 0; padding: 0; border: 0; line-height: 0;">
    <img src="data:image/png;base64,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 gm+ioUKFCtKiZUtJOkQ2ogVLlyyRB+67T2+6m5enJFlY5AR4ueI5hczctm1bVPbG 27Vrl45vy5Ytev8ggKcW97h27txp+0IO4S5H6i0/y5G2YdoKdZsfG2yTv+3bt+t3 Qk6TfwsLC4v8QsKDCs7fEWHdunXytjJI3K7JzH4x09ldGRxRQ5zIzu9myO5ZP+Ud oUK86trz0y+ye+482bdosaTvUAO5Es4JySUlPhdHo6argSVlyVLZ9+dC2Tn1G9k4 5gXZ9s5kSfFLNLhQuvf5UuqcbhJfNPtTfDgOeed302Xr62/l234pmVBlGUjZL8Va t5QijRroY0uzA21nv1Ku9v72u+zfstW5ezCKNmksyWef6XyLLWz/+DPZq+o5FArX qCbJXc+QhNKlnTuxA/YR4pSrgA8lJL5IESl75SW6bwTDu++8I38vDF0OBhf26yd1 6tRxvoXH5s2bZPyrr8pun95O4YDi/t9//0mDhg2l/tFH67bnB5wSgzfHor//ln/+ +UcbGNFE+fLl5Ywzz5TatWs7d8Jj9qxZ2pshJcX//kQGNY46Svpdconvd/02f768 psofz5Ro5zs7UD+lSpWSFq1aSbly5Zy74QFZRPms/jf0cfDEeeVVV/k6/QflHKJj 1kzVR/Io/+vXr5e9e/ZIx86dfR3HjbHJEcvhgKdT02OOkTPOOCOqJOAfv/8uX3/1 lU6DG11OPVXatG3re0Njv0DP+O2332Tp0qWycuXKoNfGjRulZMmSur388ccf8rfq p9wnjeyh413qRD2uXr1aFixYICtUu6b8CectJ8KtWrVKvvnmGx1XtWrVnF8OYNOm TTJ37tzMtJDe0krO0zd/+eUXWbZsmb6/YcMGvWywIJddkR9jdCYmJvpKC2TqF198 IePHj5effvpJ702UnFzK+TVnIJ5XlUz58ssvdR88Sskk9MoJEybIpEmTdJnWq1dP ivrQdwzIG2VMW6Hc582bp9sBeS1TpkxYLzz6OHKdZ6hLPv/8809dbxA/tA2/XnwF DdryG2+8IW8pHZ2xrn79+vl2yhl95CslG6jbadOmSZMmTXTZ5yVon1OmTJFXXnlF 5syZo/sop/FZZA9IKNq6kVFcyLu1a9fqY/wZi5ATAGJs0aJFmf2CC3lZQo23gP6L PF2+fLnuS4B+49axkD3I0jVr1ug6MnEb0FdJD3HQjosXL55FBvAO9m1DZpNG5Czj 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 7yO/9QAAAABJRU5ErkJggg==" alt="Hughes Law Header" style="display: block; width: 600px; margin: 0 auto;">
   <br><div style="font-family: 'Times New Roman', Times, serif; font-size: 11pt; margin: 0; padding: 0;">
April 14, 2025<br><br>
<b><u>Sent via Fax and Certified Mail</u></b><br><br>
Progressive Insurance<br>
<b>Attn: Claims</b><br>
The Progressive Corporation<br>
300 North Commons Blvd.<br>
Mayfield Village, OH 44143<br><br>

<table border="0" cellspacing="0" cellpadding="0" style="margin-left: 40px;">
    <tr>
        <td width="40">Re:</td>
        <td width="120">Claim No.:</td>
        <td width="300">CLM-345678</td>
    </tr>
    <tr>
        <td></td>
        <td>Our Client:</td>
        <td>John Smith (01.15.85)</td>
    </tr>
    <tr>
        <td></td>
        <td>Your Insured:</td>
        <td>Jason Miller</td>
    </tr>
    <tr>
        <td></td>
        <td>Date of Loss:</td>
        <td>March 15, 2024</td>
    </tr>
</table>
<br>
<p>To Whom it May Concern,</p>
<br>
<p style="text-indent: 40px">As you know our client, John Smith (01.15.85), was involved in the above-referenced accident. Any information or materials submitted herein are not to be utilized in a later trial or proceeding and are not to be considered an admission by them. Further, any materials submitted shall remain our property and, accordingly, should be returned upon our request.</p>
<br>
<p style="text-indent: 40px">The negotiation initiated by this demand package is for a Bodily Injury settlement only. Therefore, in the event we reach a settlement of this claim, any release shall include the following language:</p>
<br>
<p style="text-indent: 40px">This document does not release any other parties except the Releasee(s), insured and their insurance company. Further this document does not extinguish any rights for Releaser(s) first party benefits. Finally, this document does not release Releaser(s) rights or their insurance company(s) subrogation right for any property damage. This release is for BI only.</p>
<br>

<center><p><b><u>LIABILITY</u></b></p></center><br>
The subject crash occurred on Friday, March 15, 2024. The crash occurred while Mr. John Smith was traveling eastbound on Fletcher Avenue when Jason Miller, traveling northbound on Bruce B Downs Boulevard, ran a red light, causing a T-bone collision on the passenger side of Mr. Smith's vehicle.

Based on the above, it is clear that Mr. Miller acted negligently and was the sole and proximate cause of the crash, which resulted in personal injuries to my client. No liability rests with our client, Mr. Smith, who was properly restrained and abiding by all relevant traffic laws.

<p style="text-indent: 40px"><i><b>Please refer to Crash Pictures and Crash Report attached.</i></b></p>

<center><p><b><u>INJURIES</u></b></p></center>
<br><b><u>Advent Health Surgery Center</b></u><br><br>
<p>Mr. Smith was initially seen at Advent Health Surgery Center on March 16, 2024, presenting complaints of acute injuries following a motor vehicle accident. The evaluation revealed significant orthopedic injuries requiring further treatment planning, including potential surgical intervention.</p>
<p>A treatment plan was recommended, including ongoing diagnostic imaging and orthopedic consultations.</p>
<br>
<p style="text-indent: 40px"><i><b>Please refer to Advent Health Surgery Center's reports and billing ledger attached.</p></i></b><br><b><u>Active Wellness & Rehabilitation Center</b></u><br><br>
<p>Mr. Smith received comprehensive physical therapy beginning March 17, 2024, focusing on rehabilitation of cervical, thoracic, and lumbar spine injuries sustained in the collision. Treatment has included therapeutic exercises and manual therapy to address pain, mobility, and functional recovery.</p>
<p>Continued treatment and evaluations remain ongoing.</p>
<br>
<p style="text-indent: 40px"><i><b>Please refer to Active Wellness & Rehabilitation Center's reports and billing ledger attached.</p></i></b><br><b><u>Tampa Bay Imaging</b></u><br><br>
<p>Mr. Smith underwent diagnostic imaging on March 15 and March 18, 2024, revealing cervical, thoracic, and lumbar injuries consistent with traumatic impact from the collision, necessitating ongoing medical attention.</p>

<br>
<p style="text-indent: 40px"><i><b>Please refer to Tampa Bay Imaging's reports and billing ledger attached.</p></i></b>

<center><p><b><u>MEDICAL SPECIALS</u></b></p></center>
<center><p>Below is a breakdown of the medical expenses incurred as a result of this loss.</p></center><br>
<table border="1" style="border-collapse: collapse; width: 100%;">
<thead>
   <tr>
       <th style="border: 1px solid black; text-align: center;"><b>PROVIDER</b></th>
       <th style="border: 1px solid black; text-align: center;"><b>BILLED</b></th>
       <th style="border: 1px solid black; text-align: center;"><b>PAID/ADJUSTED</b></th>
       <th style="border: 1px solid black; text-align: center;"><b>BALANCE</b></th>
   </tr>
</thead>
<tbody>
<tr>
   <td style="border: 1px solid black; text-align: center;"><b>Advent Health Surgery Center</b></td>
   <td style="border: 1px solid black; text-align: center;">$2,500.00</td>
   <td style="border: 1px solid black; text-align: center;">$0.00</td>
   <td style="border: 1px solid black; text-align: center;">$2,500.00</td>
</tr><tr>
   <td style="border: 1px solid black; text-align: center;"><b>Active Wellness & Rehabilitation Center</b></td>
   <td style="border: 1px solid black; text-align: center;">$2,000.00</td>
   <td style="border: 1px solid black; text-align: center;">$0.00</td>
   <td style="border: 1px solid black; text-align: center;">$2,000.00</td>
</tr><tr>
   <td style="border: 1px solid black; text-align: center;"><b>Tampa Bay Imaging</b></td>
   <td style="border: 1px solid black; text-align: center;">$3,000.00</td>
   <td style="border: 1px solid black; text-align: center;">$0.00</td>
   <td style="border: 1px solid black; text-align: center;">$3,000.00</td>
</tr>
</tbody>
<tfoot>
   <tr>
       <td style="border: 1px solid black; text-align: center;"><strong>Total</strong></td>
       <td style="border: 1px solid black; text-align: center;"><strong>$7,500.00</strong></td>
       <td style="border: 1px solid black; text-align: center;"><strong>$0.00</strong></td>
       <td style="border: 1px solid black; text-align: center;"><strong>$7,500.00</strong></td>
   </tr>
</tfoot>
</table><br><br>

<p style="text-indent: 40px"><b>HUGHES LAW DEMANDS THAT PROGRESSIVE INSURANCE TENDER THEIR POLICY LIMITS AND WILL ONLY BE ACCEPTED IF THE SETTLEMENT DRAFT AND RELEASE ARE RECEIVED IN OUR OFFICE BY NO LATER THAN 4:00 PM, WEDNESDAY, MAY 14, 2025.</b></p><br>

<p style="text-indent: 40px">The settlement draft should be made payable to Ryan T. Hughes trust account <strong>ONLY</strong>. Our tax id number is 46-4140008.</p><br>

<center><p>Sincerely,<br>
<img src="data:image/png;base64,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" alt="Signature" style="width: 150px;"><br>
<i>Ryan T. Hughes, Esq.</i>
</div>
</p></center>
</div>
</body>
</html>
                `
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
