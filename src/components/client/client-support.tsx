"use client"

import { Link, ChevronDown, Plus, FileText, Pencil, Clock, CheckCircle2, AlertCircle, Gavel, Folders, Code, Camera, Search, Filter, DollarSign, FileCheck, Building2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Avatar } from "@/components/ui/avatar"

export function ClientSupport() {
  const [activeTab, setActiveTab] = useState('insurance')
  const [selectedDefendant, setSelectedDefendant] = useState<number | null>(null)
  const [selectedPolicy, setSelectedPolicy] = useState<number | null>(null)
  const [selectedTreatment, setSelectedTreatment] = useState<number | null>(null)
  const [documentSearch, setDocumentSearch] = useState('')
  const [expandedSections, setExpandedSections] = useState({
    relations: true,
    policyDetails: true,
    vehicleInfo: true,
    financialInfo: true
  })
  const [isVehicleCardFlipped, setIsVehicleCardFlipped] = useState(false)

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const toggleVehicleCard = () => {
    setIsVehicleCardFlipped(!isVehicleCardFlipped)
  }

  const tabs = [
    { id: 'defendants', label: 'Defendants' },
    { id: 'insurance', label: 'Insurance Policies' },
    { id: 'medical-treatment', label: 'Medical Treatment' },
    { id: 'medical-request', label: 'Medical Request' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'logs', label: 'Logs' },
    { id: 'documents', label: 'Documents' }
  ]

  // Sample insurance policies data
  const insurancePolicies = [
    {
      id: 1,
      defendant: {
        name: "John Smith",
        role: "Primary Defendant"
      },
      provider: {
        name: "State Farm Insurance",
        type: "Primary Provider"
      },
      policyType: "BI",
      insuranceType: "Auto Insurance",
      claimNumber: "CLM123456",
      policyNumber: "POL789012",
      limit: "$50,000",
      expectedSettlement: "$35,000",
      expectedFirmFee: "$11,666",
      finalSettlement: "Pending",
      finalFirmFee: "Pending",
      documents: ["policy.pdf", "claim.pdf"],
      vehicle: {
        year: "2005",
        make: "Dodge",
        model: "Ram 1500",
        color: "Silver",
        vin: "1D7HA18N85J123456",
        licensePlate: "AL-ABC123",
        driver: {
          name: "John Smith",
          licenseNumber: "AL-12345678"
        }
      }
    },
    {
      id: 2,
      defendant: {
        name: "Jane Doe",
        role: "Secondary Defendant"
      },
      provider: {
        name: "Progressive Insurance",
        type: "Secondary Provider"
      },
      policyType: "UM",
      insuranceType: "PIP",
      claimNumber: "CLM789012",
      policyNumber: "POL345678",
      limit: "$25,000",
      expectedSettlement: "$20,000",
      expectedFirmFee: "$6,666",
      finalSettlement: "$22,000",
      finalFirmFee: "$7,333",
      documents: ["policy.pdf"],
      vehicle: {
        year: "2018",
        make: "Toyota",
        model: "Camry",
        color: "Blue",
        vin: "4T1C11AK7JU123456",
        licensePlate: "AL-XYZ789",
        driver: {
          name: "Jane Doe",
          licenseNumber: "AL-87654321"
        }
      }
    }
  ]

  // Sample defendants data
  const defendants = [
    { id: 1, name: "John Smith", role: "Primary Defendant" },
    { id: 2, name: "Jane Doe", role: "Secondary Defendant" },
    { id: 3, name: "Robert Johnson", role: "Third Party Defendant" }
  ]

  // Sample medical request data
  const medicalRequests = [
    {
      id: 1,
      title: "Medical Records",
      subtitle: "Request",
      date: "03/15/24",
      primaryAction: "Review",
      secondaryAction: "Send"
    },
    {
      id: 2,
      title: "Medical Bills",
      subtitle: "Request",
      date: "03/16/24",
      primaryAction: "Review",
      secondaryAction: "Send"
    },
    {
      id: 3,
      title: "Treatment Plan",
      subtitle: "Request",
      date: "03/17/24",
      primaryAction: "Review",
      secondaryAction: "Send"
    }
  ]

  // Sample tasks data
  const tasks = [
    {
      id: 1,
      name: "Request Medical Records",
      dueDate: "2024-03-20",
      responsibleParty: "John Doe",
      status: "In Progress"
    },
    {
      id: 2,
      name: "Follow up with Insurance",
      dueDate: "2024-03-22",
      responsibleParty: "Jane Smith",
      status: "Pending"
    },
    {
      id: 3,
      name: "Schedule Client Meeting",
      dueDate: "2024-03-25",
      responsibleParty: "Mike Johnson",
      status: "Not Started"
    },
    {
      id: 4,
      name: "File Court Documents",
      dueDate: "2024-03-28",
      responsibleParty: "Sarah Wilson",
      status: "Completed"
    }
  ]

  // Sample logs data combining tasks and timeline events
  const logs = [
    {
      id: 1,
      type: "task",
      action: "Task Completed",
      description: "Medical Records Request Sent",
      date: "2024-03-18 14:30",
      user: "John Doe",
      status: "completed"
    },
    {
      id: 2,
      type: "event",
      action: "Timeline Update",
      description: "Insurance Policy Limits Determined",
      date: "2024-03-17 10:15",
      user: "System",
      status: "info"
    },
    {
      id: 3,
      type: "task",
      action: "Task Created",
      description: "Schedule Follow-up with Client",
      date: "2024-03-16 09:45",
      user: "Jane Smith",
      status: "pending"
    },
    {
      id: 4,
      type: "event",
      action: "Document Added",
      description: "Crash Report Uploaded",
      date: "2024-03-15 16:20",
      user: "Mike Johnson",
      status: "info"
    },
    {
      id: 5,
      type: "task",
      action: "Task Updated",
      description: "Insurance Claim Status Changed",
      date: "2024-03-15 11:30",
      user: "Sarah Wilson",
      status: "in_progress"
    }
  ]

  // Sample documents data
  const documents = [
    {
      id: 1,
      icon: Gavel,
      title: "Legal Documents",
      subtitle: "Court filings and legal correspondence",
      date: "03/15/24"
    },
    {
      id: 2,
      icon: Folders,
      title: "Medical Records",
      subtitle: "Hospital and treatment records",
      date: "03/16/24"
    },
    {
      id: 3,
      icon: Code,
      title: "Insurance Documents",
      subtitle: "Policy and claim documentation",
      date: "03/17/24"
    },
    {
      id: 4,
      icon: Camera,
      title: "Evidence Photos",
      subtitle: "Accident scene documentation",
      date: "03/18/24"
    }
  ]

  // Sample treatment visits data
  const treatmentVisits = [
    {
      id: 1,
      provider: {
        name: "City General Hospital",
        type: "Hospital"
      },
      physician: "Dr. Sarah Johnson",
      treatmentDate: "2024-02-15",
      billDate: "2024-02-20",
      originalAmount: 2500.00,
      insurancePayments: 1500.00,
      firmReduction: 250.00,
      clientPayment: 0.00,
      status: "Pending Insurance",
      visitSummary: "Initial evaluation following accident. Patient presented with neck and back pain. Prescribed physical therapy and pain medication.",
      treatmentCodes: [
        { code: "99203", description: "Office Visit - Detailed", amount: 150.00 },
        { code: "72100", description: "X-Ray Lumbar Spine", amount: 250.00 }
      ],
      records: [
        { id: 1, type: "Initial Assessment", date: "2024-02-15" },
        { id: 2, type: "X-Ray Results", date: "2024-02-15" }
      ]
    },
    {
      id: 2,
      provider: {
        name: "PhysioHealth Center",
        type: "Physical Therapy"
      },
      physician: "Dr. Michael Chen",
      treatmentDate: "2024-02-20",
      billDate: "2024-02-25",
      originalAmount: 1200.00,
      insurancePayments: 800.00,
      firmReduction: 100.00,
      clientPayment: 300.00,
      status: "Paid",
      visitSummary: "First physical therapy session. Focused on neck mobility exercises and lower back strengthening.",
      treatmentCodes: [
        { code: "97110", description: "Therapeutic Exercise", amount: 75.00 },
        { code: "97140", description: "Manual Therapy", amount: 85.00 }
      ],
      records: [
        { id: 3, type: "PT Progress Notes", date: "2024-02-20" }
      ]
    }
  ]

  return (
    <div className="bg-[#1E293B] rounded-lg overflow-hidden">
      {/* Tabs navigation */}
      <div className="bg-[#111827] border-b border-gray-700">
        <div className="flex">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 cursor-pointer ${
                activeTab === tab.id
                  ? 'text-[#E7F5FF] border-b-2 border-[#74C0FC] bg-[#26303E]'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </div>
          ))}
        </div>
      </div>

      {/* Content area */}
      <div className="p-6">
        {activeTab === 'insurance' && (
          <div className="flex gap-8">
            {/* Left panel - Policy selection */}
            <div className="w-1/2 border-r border-[#374151] pr-8">
              <div className="mb-6">
                <h2 className="text-[14px] font-medium text-[#EDF2FF] mb-1">Select Insurance Policy</h2>
                <p className="text-[10px] text-[#ADB5BD]">Manage all insurance policies associated with the case. Click onto each card to see more details.</p>
              </div>

              {/* Policy cards */}
              <div className="space-y-2">
                {insurancePolicies.map((policy) => (
                  <div
                    key={policy.id}
                    onClick={() => setSelectedPolicy(policy.id)}
                    className={`relative flex items-center p-4 bg-[#151F2D] rounded-xl cursor-pointer ${
                      selectedPolicy === policy.id ? 'border-l-2 border-[#228BE6]' : ''
                    }`}
                  >
                    <div className="flex-1 flex items-center gap-4">
                      <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center overflow-hidden p-1">
                        {policy.provider.name.includes("Progressive") ? (
                          <img src="/logo/Progressive-logo.png" alt="Progressive Insurance" className="w-full h-full object-contain" />
                        ) : policy.provider.name.includes("State Farm") ? (
                          <img src="/logo/statefarm.jpg" alt="State Farm Insurance" className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-sm">{policy.policyType}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-[16px] font-medium text-[#E6E0E9]">{policy.provider.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            policy.policyType === 'UM' ? 'bg-blue-900/50 text-blue-400' :
                            policy.policyType === 'BI' ? 'bg-green-900/50 text-green-400' :
                            policy.policyType === 'PIP' ? 'bg-purple-900/50 text-purple-400' :
                            'bg-orange-900/50 text-orange-400'
                          }`}>
                            {policy.policyType}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="h-5 w-5 bg-[#374151] rounded-full flex items-center justify-center text-[#E6E0E9]">
                            👤
                          </div>
                          <p className="text-[14px] text-[#E6E0E9]">{policy.defendant.name} • #{policy.policyNumber}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add policy button */}
              <button className="w-full mt-4 flex items-center justify-between px-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-[11px] text-[#767778]">
                <span>Add New Policy</span>
                <Plus size={12} className="text-[#767778]" />
              </button>
            </div>

            {/* Right panel - Policy details */}
            <div className="w-1/2">
              {selectedPolicy ? (
                <div className="mt-4 space-y-6">
                  {/* Combined Policy Card - Removed Relations title */}
                  <div className="space-y-4">
                    {insurancePolicies.find(p => p.id === selectedPolicy) && (
                      <>
                        {/* Combined Policy Card */}
                        <div className="bg-[#151F2D] p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center overflow-hidden p-1">
                                {insurancePolicies.find(p => p.id === selectedPolicy)?.provider.name.includes("Progressive") ? (
                                  <img src="/logo/Progressive-logo.png" alt="Progressive Insurance" className="w-full h-full object-contain" />
                                ) : insurancePolicies.find(p => p.id === selectedPolicy)?.provider.name.includes("State Farm") ? (
                                  <img src="/logo/statefarm.jpg" alt="State Farm Insurance" className="w-full h-full object-contain" />
                                ) : (
                                  <span className="text-sm">{insurancePolicies.find(p => p.id === selectedPolicy)?.policyType}</span>
                                )}
                              </div>
                              <div>
                                <h4 className="text-[#E6E0E9] font-medium text-lg">{insurancePolicies.find(p => p.id === selectedPolicy)?.provider.name}</h4>
                                <p className="text-gray-400 text-sm">{insurancePolicies.find(p => p.id === selectedPolicy)?.provider.type}</p>
                              </div>
                            </div>
                            <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                              insurancePolicies.find(p => p.id === selectedPolicy)?.policyType === 'UM' ? 'bg-blue-900/50 text-blue-400' :
                              insurancePolicies.find(p => p.id === selectedPolicy)?.policyType === 'BI' ? 'bg-green-900/50 text-green-400' :
                              insurancePolicies.find(p => p.id === selectedPolicy)?.policyType === 'PIP' ? 'bg-purple-900/50 text-purple-400' :
                              'bg-orange-900/50 text-orange-400'
                            }`}>
                              {insurancePolicies.find(p => p.id === selectedPolicy)?.policyType} Policy
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-6 mt-6">
                            {/* Left Column */}
                            <div className="space-y-4">
                              <div>
                                <h5 className="text-gray-400 text-sm mb-2 font-bold">Policy Details</h5>
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Policy Number</span>
                                    <span className="text-[#E6E0E9]">#{insurancePolicies.find(p => p.id === selectedPolicy)?.policyNumber}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Claim Number</span>
                                    <span className="text-[#E6E0E9]">{insurancePolicies.find(p => p.id === selectedPolicy)?.claimNumber}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Insurance Type</span>
                                    <span className="text-[#E6E0E9]">{insurancePolicies.find(p => p.id === selectedPolicy)?.insuranceType}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Liability Determined</span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      insurancePolicies.find(p => p.id === selectedPolicy)?.id === 1 ? 'bg-red-900/50 text-red-400' : 'bg-green-900/50 text-green-400'
                                    }`}>
                                      {insurancePolicies.find(p => p.id === selectedPolicy)?.id === 1 ? '75%' : '25%'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                              <div>
                                <h5 className="text-gray-400 text-sm mb-2 font-bold">Financial Details</h5>
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Policy Limit</span>
                                    <span className="text-[#E6E0E9] font-medium">{insurancePolicies.find(p => p.id === selectedPolicy)?.limit}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Expected Settlement</span>
                                    <span className="text-[#E6E0E9]">{insurancePolicies.find(p => p.id === selectedPolicy)?.expectedSettlement}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Expected Firm Fee</span>
                                    <span className="text-red-400">{insurancePolicies.find(p => p.id === selectedPolicy)?.expectedFirmFee}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Policy Holder - Moved to bottom */}
                          <div className="mt-6">
                            <h5 className="text-gray-400 text-sm mb-2 font-bold">Policy Holder</h5>
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 bg-[#374151] rounded-full flex items-center justify-center text-[#E6E0E9]">
                                👤
                              </div>
                              <div>
                                <p className="text-[#E6E0E9]">{insurancePolicies.find(p => p.id === selectedPolicy)?.defendant.name}</p>
                                <p className="text-gray-400 text-sm">{insurancePolicies.find(p => p.id === selectedPolicy)?.defendant.role}</p>
                              </div>
                            </div>
                          </div>

                          {/* Vehicle Information - Two Column Layout */}
                          <div className="mt-6 border-t border-[#5F6979] pt-6">
                            <h2 className="text-[20px] font-medium text-white mb-4">Vehicle Information</h2>
                            <div className="grid grid-cols-2 gap-6">
                              {/* Vehicle Details Column */}
                              <div className="bg-[#151F2D] p-4 rounded-lg">
                                <h4 className="text-gray-400 mb-4 font-bold">Vehicle Details</h4>
                                <div className="space-y-3">
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Year/Make/Model</span>
                                    <span className="text-white">
                                      {`${insurancePolicies.find(p => p.id === selectedPolicy)?.vehicle.year} ${insurancePolicies.find(p => p.id === selectedPolicy)?.vehicle.make} ${insurancePolicies.find(p => p.id === selectedPolicy)?.vehicle.model}`}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Color</span>
                                    <span className="text-white">{insurancePolicies.find(p => p.id === selectedPolicy)?.vehicle.color}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-400">VIN</span>
                                    <span className="text-white">{insurancePolicies.find(p => p.id === selectedPolicy)?.vehicle.vin}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-400">License Plate</span>
                                    <span className="text-white">{insurancePolicies.find(p => p.id === selectedPolicy)?.vehicle.licensePlate}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Driver Information Column */}
                              <div className="bg-[#151F2D] p-4 rounded-lg">
                                <h4 className="text-gray-400 mb-4 font-bold">Driver Information</h4>
                                <div className="space-y-3">
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Driver Name</span>
                                    <span className="text-white">{insurancePolicies.find(p => p.id === selectedPolicy)?.vehicle.driver.name}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-400">License Number</span>
                                    <span className="text-white">{insurancePolicies.find(p => p.id === selectedPolicy)?.vehicle.driver.licenseNumber}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Select a policy to view details
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'defendants' && (
          <div className="flex gap-8">
            {/* Left panel - Defendant selection */}
            <div className="w-1/2 border-r border-[#374151] pr-8">
              <div className="mb-6">
                <h2 className="text-[14px] font-medium text-[#EDF2FF] mb-1">Select Defendant</h2>
                <p className="text-[10px] text-[#ADB5BD]">Manage all of the defendants associated with a case. Click onto each card to see more details.</p>
              </div>

              {/* Defendant cards */}
              <div className="space-y-2">
                {defendants.map((defendant) => (
                  <div
                    key={defendant.id}
                    onClick={() => setSelectedDefendant(defendant.id)}
                    className={`flex items-center p-4 bg-[#151F2D] rounded-xl cursor-pointer ${
                      selectedDefendant === defendant.id ? 'border-l-2 border-[#228BE6]' : ''
                    }`}
                  >
                    <Avatar className="h-10 w-10 bg-[#4F378B] text-white">
                      <span className="text-sm">{defendant.name.split(' ').map(n => n[0]).join('')}</span>
                    </Avatar>
                    <div className="ml-4">
                      <h3 className="text-[16px] font-medium text-[#E6E0E9]">{defendant.name}</h3>
                      <p className="text-[14px] text-[#E6E0E9]">{defendant.role}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add defendant button */}
              <button className="w-full mt-4 flex items-center justify-between px-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-[11px] text-[#767778]">
                <span>Add New Defendant</span>
                <Plus size={12} className="text-[#767778]" />
              </button>
            </div>

            {/* Right panel - Defendant details */}
            <div className="w-1/2">
              {selectedDefendant ? (
                <div className="space-y-6">
                  {/* Personal Information */}
                  <div className="border-b border-[#5F6979] pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-[20px] font-medium text-white">Personal Information</h2>
                      <ChevronDown size={20} className="text-[#D9D9D9]" />
                    </div>
                    {/* Add personal information fields here */}
                  </div>

                  {/* Contact Information */}
                  <div className="border-b border-[#5F6979] pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-[20px] font-medium text-white">Contact Information</h2>
                      <ChevronDown size={20} className="text-[#D9D9D9]" />
                    </div>
                    {/* Add contact information fields here */}
                  </div>

                  {/* Legal Information */}
                  <div className="border-b border-[#5F6979] pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-[20px] font-medium text-white">Legal Information</h2>
                      <ChevronDown size={20} className="text-[#D9D9D9]" />
                    </div>
                    {/* Add legal information fields here */}
                  </div>

                  {/* Insurance Information */}
                  <div className="border-b border-[#5F6979] pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-[20px] font-medium text-white">Insurance Information</h2>
                      <ChevronDown size={20} className="text-[#D9D9D9]" />
                    </div>
                    {/* Add insurance information fields here */}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Select a defendant to view details
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-6">
            {/* Search Header */}
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={documentSearch}
                  onChange={(e) => setDocumentSearch(e.target.value)}
                  placeholder="Search documents..."
                  className="w-full h-10 bg-[#111827] text-white rounded-lg pl-10 pr-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <Button variant="outline" className="h-10 px-4 text-gray-400 hover:text-white">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Document List */}
            <div className="flex flex-col gap-2.5">
              {documents
                .filter(doc => 
                  doc.title.toLowerCase().includes(documentSearch.toLowerCase()) ||
                  doc.subtitle.toLowerCase().includes(documentSearch.toLowerCase())
                )
                .map((doc) => (
                  <div
                    key={doc.id}
                    className="w-full h-[82.88px] bg-[#182230] rounded-[12.56px] relative backdrop-blur-[94px]"
                  >
                    {/* Icon */}
                    <div className="absolute left-[28.88px] top-[17.58px] w-[47.72px] h-[47.72px] rounded-[10.67px] bg-[#B8B8B8] bg-opacity-20 flex items-center justify-center">
                      <doc.icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Title and Subtitle */}
                    <div className="absolute left-[126.84px] top-[18.55px] flex flex-col">
                      <h3 className="text-[18.84px] font-semibold leading-[25px] tracking-[-0.29px] text-white">
                        {doc.title}
                      </h3>
                      <p className="text-[12.56px] font-light leading-[25px] tracking-[-0.29px] text-[#ADB5BD]">
                        {doc.subtitle}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="absolute right-[30px] top-[23.86px]">
                      <button className="flex items-center justify-center px-4 py-2 w-[134.09px] h-[35.34px] bg-[#2563EB] border border-[#374151] rounded-[6.6px] shadow-sm">
                        <span className="text-[11.48px] text-white mr-2">Open</span>
                        <Link className="w-[13.11px] h-[13.11px] text-white" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            {/* Add Document Button */}
            <button className="w-full h-[56.89px] flex items-center justify-center gap-2 bg-[#374151] border border-[#374151] rounded-[6.35px] shadow-sm">
              <span className="text-[16.04px] text-[#6B7280]">Add New Document</span>
              <Plus className="w-[12.62px] h-[12.62px] text-[#6B7280]" />
            </button>
          </div>
        )}
        
        {activeTab === 'medical-request' && (
          <div className="grid grid-cols-3 gap-6">
            {medicalRequests.map((request) => (
              <div
                key={request.id}
                className="relative w-[331px] h-[223px] rounded-[15px] bg-[#182230] backdrop-blur-[110px]"
              >
                {/* Title and Date */}
                <div className="absolute left-8 top-5">
                  <h3 className="text-[22px] font-semibold text-white leading-[29px] tracking-[-0.34px]">
                    {request.title}
                  </h3>
                  <p className="text-[15px] font-light text-[#ADB5BD] leading-[29px] tracking-[-0.34px] mt-1">
                    {request.subtitle}
                  </p>
                </div>
                <div className="absolute right-[31px] top-4">
                  <p className="text-[15px] font-light text-[#ADB5BD] leading-[29px] tracking-[-0.34px]">
                    {request.date}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="absolute left-8 top-[136px] flex gap-[9px]">
                  {/* Review Button */}
                  <button className="flex items-center justify-center px-4 py-2 w-[131px] h-[41px] border border-[#374151] rounded-[8px] bg-transparent">
                    <span className="text-[13.4px] text-white">
                      {request.primaryAction}
                    </span>
                  </button>

                  {/* Send Button */}
                  <button className="flex items-center justify-center px-4 py-2 w-[131px] h-[41px] bg-[#2563EB] border border-[#374151] rounded-[8px] shadow-sm">
                    <span className="text-[13.4px] text-white">
                      {request.secondaryAction}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Tasks</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus size={16} className="mr-2" />
                Add Task
              </Button>
            </div>

            {/* Tasks Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#111827] text-left">
                    <th className="p-4 text-sm font-medium text-gray-300">Task Name</th>
                    <th className="p-4 text-sm font-medium text-gray-300">Due Date</th>
                    <th className="p-4 text-sm font-medium text-gray-300">Responsible Party</th>
                    <th className="p-4 text-sm font-medium text-gray-300">Status</th>
                    <th className="p-4 text-sm font-medium text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id} className="border-b border-[#374151] hover:bg-[#1A2433]">
                      <td className="p-4">
                        <span className="text-white">{task.name}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-white">{new Date(task.dueDate).toLocaleDateString()}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6 bg-[#4F378B]">
                            <span className="text-xs text-white">
                              {task.responsibleParty.split(' ').map(n => n[0]).join('')}
                            </span>
                          </Avatar>
                          <span className="text-white">{task.responsibleParty}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          task.status === 'Completed' ? 'bg-green-900 text-green-200' :
                          task.status === 'In Progress' ? 'bg-blue-900 text-blue-200' :
                          task.status === 'Pending' ? 'bg-yellow-900 text-yellow-200' :
                          'bg-gray-900 text-gray-200'
                        }`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <Button variant="outline" size="sm" className="text-gray-400 hover:text-white">
                          <Pencil size={14} className="mr-1" />
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'logs' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-white">Activity Logs</h2>
                <p className="text-sm text-gray-400 mt-1">Recent activities and timeline events</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="text-gray-400 hover:text-white">
                  <Clock size={16} className="mr-2" />
                  Filter
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Export Logs
                </Button>
              </div>
            </div>

            {/* Logs Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#111827] text-left">
                    <th className="p-4 text-sm font-medium text-gray-300">Action</th>
                    <th className="p-4 text-sm font-medium text-gray-300">Description</th>
                    <th className="p-4 text-sm font-medium text-gray-300">Date & Time</th>
                    <th className="p-4 text-sm font-medium text-gray-300">User</th>
                    <th className="p-4 text-sm font-medium text-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id} className="border-b border-[#374151] hover:bg-[#1A2433]">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {log.type === 'task' ? (
                            <CheckCircle2 size={16} className={`${
                              log.status === 'completed' ? 'text-green-400' :
                              log.status === 'in_progress' ? 'text-blue-400' :
                              'text-gray-400'
                            }`} />
                          ) : (
                            <AlertCircle size={16} className="text-blue-400" />
                          )}
                          <span className="text-white">{log.action}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-white">{log.description}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-white">{log.date}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6 bg-[#4F378B]">
                            <span className="text-xs text-white">
                              {log.user === 'System' ? 'SY' : log.user.split(' ').map(n => n[0]).join('')}
                            </span>
                          </Avatar>
                          <span className="text-white">{log.user}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          log.status === 'completed' ? 'bg-green-900 text-green-200' :
                          log.status === 'in_progress' ? 'bg-blue-900 text-blue-200' :
                          log.status === 'pending' ? 'bg-yellow-900 text-yellow-200' :
                          'bg-gray-900 text-gray-200'
                        }`}>
                          {log.status === 'info' ? 'Event' : 
                           log.status.charAt(0).toUpperCase() + log.status.slice(1).replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'medical-treatment' && (
          <div className="flex gap-8">
            {/* Left panel - Treatment visit selection */}
            <div className="w-1/2 border-r border-[#374151] pr-8">
              <div className="mb-6">
                <h2 className="text-[14px] font-medium text-[#EDF2FF] mb-1">Treatment Visits</h2>
                <p className="text-[10px] text-[#ADB5BD]">View and manage all treatment visits. Click on each visit to see detailed information.</p>
              </div>

              {/* Treatment visit cards */}
              <div className="space-y-2">
                {treatmentVisits.map((visit) => (
                  <div
                    key={visit.id}
                    onClick={() => setSelectedTreatment(visit.id)}
                    className={`flex items-center p-4 bg-[#151F2D] rounded-xl cursor-pointer ${
                      selectedTreatment === visit.id ? 'border-l-2 border-[#228BE6]' : ''
                    }`}
                  >
                    <div className="h-10 w-10 bg-[#4F378B] rounded-full flex items-center justify-center text-white">
                      <Building2 size={20} />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-[16px] font-medium text-[#E6E0E9]">{visit.provider.name}</h3>
                      <p className="text-[14px] text-[#E6E0E9]">{new Date(visit.treatmentDate).toLocaleDateString()}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      visit.status === 'Paid' ? 'bg-green-900 text-green-200' :
                      'bg-yellow-900 text-yellow-200'
                    }`}>
                      {visit.status}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add visit button */}
              <button className="w-full mt-4 flex items-center justify-between px-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-[11px] text-[#767778]">
                <span>Add New Visit</span>
                <Plus size={12} className="text-[#767778]" />
              </button>
            </div>

            {/* Right panel - Treatment details */}
            <div className="w-1/2">
              {selectedTreatment ? (
                <div className="space-y-6">
                  {/* Provider Information */}
                  <div className="border-b border-[#5F6979] pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-[20px] font-medium text-white">Provider Information</h2>
                      <ChevronDown size={20} className="text-[#D9D9D9]" />
                    </div>
                    <div className="space-y-4">
                      {treatmentVisits.find(v => v.id === selectedTreatment) && (
                        <>
                          <div className="bg-[#151F2D] p-3 rounded-lg">
                            <span className="text-gray-400 text-sm mb-2 block">Treatment Provider</span>
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 bg-[#4F378B] text-white">
                                <Building2 size={16} />
                              </Avatar>
                              <div className="ml-3">
                                <p className="text-white text-sm font-medium">
                                  {treatmentVisits.find(v => v.id === selectedTreatment)?.provider.name}
                                </p>
                                <p className="text-gray-400 text-xs">
                                  {treatmentVisits.find(v => v.id === selectedTreatment)?.provider.type}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-[#151F2D] p-3 rounded-lg">
                            <span className="text-gray-400 text-sm mb-2 block">Physician</span>
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 bg-[#4F378B] text-white">
                                <User size={16} />
                              </Avatar>
                              <div className="ml-3">
                                <p className="text-white text-sm font-medium">
                                  {treatmentVisits.find(v => v.id === selectedTreatment)?.physician}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Visit Details */}
                  <div className="border-b border-[#5F6979] pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-[20px] font-medium text-white">Visit Details</h2>
                      <ChevronDown size={20} className="text-[#D9D9D9]" />
                    </div>
                    <div className="space-y-4">
                      {treatmentVisits.find(v => v.id === selectedTreatment) && (
                        <>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">Treatment Date</span>
                              <span className="text-white">
                                {new Date(treatmentVisits.find(v => v.id === selectedTreatment)?.treatmentDate || '').toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">Bill Date</span>
                              <span className="text-white">
                                {new Date(treatmentVisits.find(v => v.id === selectedTreatment)?.billDate || '').toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="bg-[#151F2D] p-3 rounded-lg">
                            <span className="text-gray-400 text-sm mb-2 block">Visit Summary</span>
                            <p className="text-white text-sm">
                              {treatmentVisits.find(v => v.id === selectedTreatment)?.visitSummary}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Financial Information */}
                  <div className="border-b border-[#5F6979] pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-[20px] font-medium text-white">Financial Information</h2>
                      <ChevronDown size={20} className="text-[#D9D9D9]" />
                    </div>
                    <div className="space-y-2">
                      {treatmentVisits.find(v => v.id === selectedTreatment) && (
                        <>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Original Bill Amount</span>
                            <span className="text-white">
                              ${treatmentVisits.find(v => v.id === selectedTreatment)?.originalAmount.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Insurance Payments</span>
                            <span className="text-green-400">
                              ${treatmentVisits.find(v => v.id === selectedTreatment)?.insurancePayments.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Firm Reduction</span>
                            <span className="text-blue-400">
                              ${treatmentVisits.find(v => v.id === selectedTreatment)?.firmReduction.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Client Payment</span>
                            <span className="text-white">
                              ${treatmentVisits.find(v => v.id === selectedTreatment)?.clientPayment.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <span className="text-gray-400">Status</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              treatmentVisits.find(v => v.id === selectedTreatment)?.status === 'Paid' 
                                ? 'bg-green-900 text-green-200' 
                                : 'bg-yellow-900 text-yellow-200'
                            }`}>
                              {treatmentVisits.find(v => v.id === selectedTreatment)?.status}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Treatment Codes */}
                  <div className="border-b border-[#5F6979] pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-[20px] font-medium text-white">Treatment Codes</h2>
                      <ChevronDown size={20} className="text-[#D9D9D9]" />
                    </div>
                    <div className="space-y-2">
                      {treatmentVisits.find(v => v.id === selectedTreatment)?.treatmentCodes.map((code, index) => (
                        <div key={index} className="bg-[#151F2D] p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-white font-medium">{code.code}</span>
                              <p className="text-gray-400 text-sm">{code.description}</p>
                            </div>
                            <span className="text-white">${code.amount.toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Records */}
                  <div className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-[20px] font-medium text-white">Medical Records</h2>
                      <ChevronDown size={20} className="text-[#D9D9D9]" />
                    </div>
                    <div className="space-y-2">
                      {treatmentVisits.find(v => v.id === selectedTreatment)?.records.map((record) => (
                        <div key={record.id} className="bg-[#151F2D] p-3 rounded-lg flex items-center justify-between">
                          <div className="flex items-center">
                            <FileCheck size={16} className="text-gray-400 mr-2" />
                            <div>
                              <p className="text-white text-sm">{record.type}</p>
                              <p className="text-gray-400 text-xs">
                                {new Date(record.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="text-gray-400 hover:text-white">
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Select a treatment visit to view details
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab !== 'documents' && 
         activeTab !== 'defendants' && 
         activeTab !== 'insurance' && 
         activeTab !== 'medical-request' &&
         activeTab !== 'tasks' &&
         activeTab !== 'logs' && (
          <div className="flex items-center justify-center h-[400px] text-gray-400">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} content coming soon
          </div>
        )}
      </div>
    </div>
  )
}

