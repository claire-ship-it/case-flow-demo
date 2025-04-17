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
          <DialogContent className="max-w-4xl h-[80vh] bg-[#1E293B] border-[#374151] text-white">
            <DialogHeader>
              <DialogTitle>
                {documents.find(d => d.id === viewingDocumentId)?.title || "Document"}
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                {documents.find(d => d.id === viewingDocumentId)?.description || ""}
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 h-full mt-4">
              <iframe 
                src="https://docs.google.com/document/d/11MeaNMYq2_f_81bM1uW9k6WV1FBYS5RB4o3vk7ncPAg/edit?tab=t.0"
                className="w-full h-[calc(100%-2rem)]"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
