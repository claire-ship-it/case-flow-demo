"use client"

import { Link, ChevronDown, Plus, FileText, Pencil, Clock, CheckCircle2, AlertCircle, Gavel, Folders, Code, Camera, Search, Filter, DollarSign, FileCheck, Building2, User, Mail, Phone, Calendar, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Client, Vehicle } from "@/data/clients"

interface ClientSupport1Props {
  client: Client
  activeTab: string
}

export function ClientSupport1({ client, activeTab }: ClientSupport1Props) {
  const [selectedDefendant, setSelectedDefendant] = useState<number | null>(null)
  const [selectedPolicy, setSelectedPolicy] = useState<number | null>(null)
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)

  // Auto-select first defendant when switching to defendants tab
  useEffect(() => {
    if (activeTab === 'defendants' && defendants.length > 0 && selectedDefendant === null) {
      setSelectedDefendant(defendants[0].id);
    }
  }, [activeTab]);

  // Auto-select first policy when switching to insurance-policies tab
  useEffect(() => {
    if (activeTab === 'insurance-policies' && insurancePolicies.length > 0 && selectedPolicy === null) {
      setSelectedPolicy(insurancePolicies[0].id);
    }
  }, [activeTab]);

  // Auto-select first vehicle when switching to vehicles tab
  useEffect(() => {
    if (activeTab === 'vehicles' && client?.vehicles && client.vehicles.length > 0 && selectedVehicle === null) {
      setSelectedVehicle(client.vehicles[0]);
    }
  }, [activeTab, client?.vehicles]);

  // Sample insurance policies data
  const insurancePolicies = [
    {
      id: 1,
      defendant: {
        name: "John Smith",
        role: "Primary Defendant"
      },
      provider: {
        name: "State Farm",
        type: "Primary Provider"
      },
      policyType: "BI",
      claimNumber: "CLM123456",
      policyNumber: "AUTO-12345-X89",
      limit: "$50,000",
      expectedSettlement: "$35,000",
      expectedFirmFee: "$11,666",
      finalSettlement: "Pending",
      finalFirmFee: "Pending",
      documents: ["policy.pdf", "claim.pdf"],
      adjuster: {
        name: "Sarah Johnson",
        role: "Claims Adjuster",
        phone: "(555) 123-4567",
        email: "sarah.johnson@statefarm.com"
      },
      contact: {
        address: "123 Insurance Way, Tampa, FL 33601",
        phone: "(800) 555-1234",
        email: "claims@statefarm.com",
        fax: "(800) 555-5678"
      },
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
        name: "Progressive",
        type: "Secondary Provider"
      },
      policyType: "UM",
      claimNumber: "CLM789012",
      policyNumber: "HLTH-98765-B12",
      limit: "$25,000",
      expectedSettlement: "$20,000",
      expectedFirmFee: "$6,666",
      finalSettlement: "$22,000",
      finalFirmFee: "$7,333",
      documents: ["policy.pdf"],
      adjuster: {
        name: "Michael Brown",
        role: "Senior Claims Adjuster",
        phone: "(555) 987-6543",
        email: "michael.brown@progressive.com"
      },
      contact: {
        address: "456 Insurance Blvd, Tampa, FL 33602",
        phone: "(800) 777-4321",
        email: "claims@progressive.com",
        fax: "(800) 777-8765"
      },
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
  interface Defendant {
    id: number
    name: string
    role: string
    email?: string
    phone?: string
    dateOfBirth?: string
    licenseNumber?: string
    address?: string
  }

  const defendants: Defendant[] = [
    { 
      id: 1, 
      name: "John Smith", 
      role: "Primary Defendant",
      email: "john.smith@example.com",
      phone: "(555) 123-4567",
      dateOfBirth: "05/15/1980",
      licenseNumber: "DL123456789",
      address: "123 Main St, Anytown, ST 12345"
    },
    { 
      id: 2, 
      name: "Jane Doe", 
      role: "Secondary Defendant",
      email: "jane.doe@example.com",
      phone: "(555) 987-6543",
      dateOfBirth: "08/22/1975",
      licenseNumber: "DL987654321",
      address: "456 Oak Ave, Somewhere, ST 67890"
    },
    { 
      id: 3, 
      name: "Robert Johnson", 
      role: "Third Party Defendant",
      email: "robert.j@example.com",
      phone: "(555) 456-7890",
      dateOfBirth: "11/30/1982",
      licenseNumber: "DL456789123",
      address: "789 Pine Rd, Elsewhere, ST 13579"
    }
  ]

  // Add this after the interface Defendant definition
  interface DefendantPolicy {
    defendantId: number;
    policyId: number;
  }

  // Add this after the defendants array
  const defendantPolicies: DefendantPolicy[] = [
    { defendantId: 1, policyId: 1 }, // John Smith -> State Farm Insurance
    { defendantId: 2, policyId: 2 }, // Jane Doe -> Progressive Insurance
  ];

  // Add this function before the return statement
  const handleViewPolicy = (defendantId: number) => {
    const policy = defendantPolicies.find(dp => dp.defendantId === defendantId);
    if (policy) {
      setSelectedPolicy(policy.policyId);
      // Switch to the insurance policies tab
      if (activeTab !== 'insurance-policies') {
        // We need to update the parent component's activeTab state
        // Since we don't have direct access to it, we'll use a custom event
        const event = new CustomEvent('changeTab', { detail: 'insurance-policies' });
        window.dispatchEvent(event);
      }
    }
  };

  // Add this function to handle viewing a vehicle's associated policy
  const handleViewVehiclePolicy = (vehicle: Vehicle) => {
    if (vehicle.insurancePolicies && vehicle.insurancePolicies.length > 0) {
      // Find the first auto insurance policy
      const autoPolicy = vehicle.insurancePolicies.find(p => p.type === 'auto');
      if (autoPolicy) {
        // Find the matching policy in the insurancePolicies array by matching provider name and policy number
        const matchingPolicy = insurancePolicies.find(p => {
          const providerMatch = p.provider.name === autoPolicy.provider?.name;
          const vinMatch = p.vehicle?.vin === vehicle.vin;
          const policyMatch = p.policyNumber === autoPolicy.number;
          
          return providerMatch && (vinMatch || policyMatch);
        });
        
        if (matchingPolicy) {
          setSelectedPolicy(matchingPolicy.id);
          // Switch to the insurance policies tab
          if (activeTab !== 'insurance-policies') {
            const event = new CustomEvent('changeTab', { detail: 'insurance-policies' });
            window.dispatchEvent(event);
          }
        }
      }
    }
  };

  // Add this function to handle viewing a vehicle from a policy
  const handleViewVehicle = (vehicle: any) => {
    // Find the matching vehicle in the client's vehicles array
    if (client.vehicles && client.vehicles.length > 0) {
      const matchingVehicle = client.vehicles.find(v => 
        v.year === vehicle.year && 
        v.make === vehicle.make && 
        v.model === vehicle.model
      );
      
      if (matchingVehicle) {
        setSelectedVehicle(matchingVehicle);
        // Switch to the vehicles tab
        if (activeTab !== 'vehicles') {
          // We need to update the parent component's activeTab state
          // Since we don't have direct access to it, we'll use a custom event
          const event = new CustomEvent('changeTab', { detail: 'vehicles' });
          window.dispatchEvent(event);
        }
      }
    }
  };

  // Add this function to find a policy associated with a vehicle
  const findPolicyForVehicle = (vehicle: Vehicle) => {
    if (vehicle.insurancePolicies && vehicle.insurancePolicies.length > 0) {
      // Find the first auto insurance policy
      const autoPolicy = vehicle.insurancePolicies.find(p => p.type === 'auto');
      if (autoPolicy) {
        // Find the matching policy in the insurancePolicies array
        const matchingPolicy = insurancePolicies.find(p => p.policyNumber === autoPolicy.number);
        if (matchingPolicy) {
          return matchingPolicy.id;
        }
      }
    }
    return null;
  };

  // Safety check for client
  if (!client) {
    return <div className="p-6 text-center text-gray-500">No client data available</div>;
  }

  return (
    <div className="bg-[#1E293B] rounded-lg overflow-hidden">
      {/* Content area */}
      <div className="p-6">
        {/* Defendants Tab Content */}
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
                    <div className="h-10 w-10 bg-[#374151] rounded-full flex items-center justify-center text-[#E6E0E9]">
                      👤
                    </div>
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
                  {/* Contact Information */}
                  <div className="border-b border-[#5F6979] pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-[20px] font-medium text-white">Contact Information</h2>
                      <ChevronDown size={20} className="text-[#D9D9D9]" />
                    </div>
                    <div className="mt-4 space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Email</span>
                            <div className="flex items-center gap-2">
                              <span className="text-white">{defendants.find(d => d.id === selectedDefendant)?.email}</span>
                              <button className="text-blue-400 hover:text-blue-300">
                                <Mail size={14} />
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Phone</span>
                            <div className="flex items-center gap-2">
                              <span className="text-white">{defendants.find(d => d.id === selectedDefendant)?.phone}</span>
                              <button className="text-blue-400 hover:text-blue-300">
                                <Phone size={14} />
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Date of Birth</span>
                            <div className="flex items-center gap-2">
                              <span className="text-white">{defendants.find(d => d.id === selectedDefendant)?.dateOfBirth}</span>
                              <Calendar size={14} className="text-gray-400" />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Driver's License</span>
                            <div className="flex items-center gap-2">
                              <span className="text-white">{defendants.find(d => d.id === selectedDefendant)?.licenseNumber}</span>
                              <FileText size={14} className="text-gray-400" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-gray-400">Address</span>
                            <span className="text-white text-right">{defendants.find(d => d.id === selectedDefendant)?.address}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Legal Information */}
                  <div className="border-b border-[#5F6979] pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-[20px] font-medium text-white">Legal Information</h2>
                      <ChevronDown size={20} className="text-[#D9D9D9]" />
                    </div>
                    <div className="mt-4">
                      {/* Defense Counsel Card */}
                      <div className="bg-[#151F2D] rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="h-10 w-10 bg-[#374151] rounded-full flex items-center justify-center text-[#E6E0E9]">
                            👨‍⚖️
                          </div>
                          <div>
                            <h3 className="text-white font-medium">Defense Counsel</h3>
                            <p className="text-gray-400 text-sm">Defendant Lawyer</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          {/* Left Column */}
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">First Name</span>
                              <span className="text-white">Defendant</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">Last Name</span>
                              <span className="text-white">Lawyer</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">Email</span>
                              <div className="flex items-center gap-2">
                                <a href="mailto:test@test.com" className="text-blue-400 hover:text-blue-300">test@test.com</a>
                                <Mail size={14} className="text-blue-400" />
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">Phone</span>
                              <div className="flex items-center gap-2">
                                <span className="text-white">44456554646</span>
                                <Phone size={14} className="text-blue-400" />
                              </div>
                            </div>
                          </div>

                          {/* Right Column */}
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">Firm Name</span>
                              <span className="text-white">Law Firm 1</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">Street Address</span>
                              <span className="text-white">123 Main Street</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">City</span>
                              <span className="text-white">Miami</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">State</span>
                              <span className="text-white">FL</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Insurance Policy Link Button */}
                      {selectedDefendant && defendantPolicies.find(dp => dp.defendantId === selectedDefendant) && (
                        <div className="mt-4">
                          <button
                            onClick={() => handleViewPolicy(selectedDefendant)}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg text-white transition-colors"
                          >
                            <DollarSign size={16} />
                            <span>View Associated Insurance Policy</span>
                          </button>
                        </div>
                      )}
                    </div>
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

        {/* Insurance Policies Tab Content */}
        {activeTab === 'insurance-policies' && (
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
                                <h4 className="text-sm font-medium text-gray-500">Policy Details</h4>
                                <dl className="mt-2 space-y-4">
                                  <div className="flex justify-between items-center">
                                    <dt className="text-sm font-medium text-gray-400">Policy</dt>
                                    <dd className="text-sm text-[#E6E0E9]">
                                      #{insurancePolicies.find(p => p.id === selectedPolicy)?.policyNumber}
                                    </dd>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <dt className="text-sm font-medium text-gray-400">Claim</dt>
                                    <dd className="text-sm text-[#E6E0E9]">
                                      {insurancePolicies.find(p => p.id === selectedPolicy)?.claimNumber}
                                    </dd>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <dt className="text-sm font-medium text-gray-400">Liability Determined</dt>
                                    <dd>
                                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        insurancePolicies.find(p => p.id === selectedPolicy)?.id === 1 ? 'bg-red-900/50 text-red-400' : 'bg-green-900/50 text-green-400'
                                      }`}>
                                        {insurancePolicies.find(p => p.id === selectedPolicy)?.id === 1 ? '75%' : '25%'}
                                      </span>
                                    </dd>
                                  </div>
                                </dl>
                              </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                              <div>
                                <h4 className="text-sm font-medium text-gray-500">Financial Details</h4>
                                <dl className="mt-2 space-y-4">
                                  <div className="flex justify-between items-center">
                                    <dt className="text-sm font-medium text-gray-400">Policy Limit</dt>
                                    <dd className="text-sm text-[#E6E0E9]">
                                      {insurancePolicies.find(p => p.id === selectedPolicy)?.limit}
                                    </dd>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <dt className="text-sm font-medium text-gray-400">Settlement</dt>
                                    <dd className="text-sm text-[#E6E0E9]">
                                      {insurancePolicies.find(p => p.id === selectedPolicy)?.expectedSettlement}
                                    </dd>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <dt className="text-sm font-medium text-gray-400">Firm Fee</dt>
                                    <dd className="text-sm text-red-400">
                                      {insurancePolicies.find(p => p.id === selectedPolicy)?.expectedFirmFee}
                                    </dd>
                                  </div>
                                </dl>
                              </div>
                            </div>
                          </div>

                          {/* Policy Holder and Vehicle Information - Two Column Layout */}
                          <div className="mt-6 grid grid-cols-2 gap-6">
                            {/* Policy Holder */}
                            <div>
                              <h5 className="text-gray-400 text-sm mb-2 font-bold">Policy Holder</h5>
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 bg-[#374151] rounded-full flex items-center justify-center text-[#E6E0E9]">
                                  👤
                                </div>
                                <div>
                                  <p 
                                    className="text-[#E6E0E9] hover:text-blue-400 cursor-pointer border-b border-dashed border-current"
                                    onClick={() => {
                                      const defendantId = defendants.find(d => 
                                        d.name === insurancePolicies.find(p => p.id === selectedPolicy)?.defendant.name
                                      )?.id;
                                      if (defendantId) {
                                        setSelectedDefendant(defendantId);
                                        const event = new CustomEvent('changeTab', { detail: 'defendants' });
                                        window.dispatchEvent(event);
                                      }
                                    }}
                                  >
                                    {insurancePolicies.find(p => p.id === selectedPolicy)?.defendant.name}
                                  </p>
                                  <p className="text-gray-400 text-sm">{insurancePolicies.find(p => p.id === selectedPolicy)?.defendant.role}</p>
                                </div>
                              </div>
                            </div>

                            {/* Vehicle Information */}
                            <div>
                              <h5 className="text-gray-400 text-sm mb-2 font-bold">Vehicle Information</h5>
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 bg-[#374151] rounded-full flex items-center justify-center text-[#E6E0E9]">
                                  🚗
                                </div>
                                <div className="flex-1">
                                  <p 
                                    className="text-[#E6E0E9] hover:text-blue-400 cursor-pointer border-b border-dashed border-current"
                                    onClick={() => handleViewVehicle(insurancePolicies.find(p => p.id === selectedPolicy)?.vehicle)}
                                  >
                                    {`${insurancePolicies.find(p => p.id === selectedPolicy)?.vehicle.year} ${insurancePolicies.find(p => p.id === selectedPolicy)?.vehicle.make} ${insurancePolicies.find(p => p.id === selectedPolicy)?.vehicle.model}`}
                                  </p>
                                  <p className="text-gray-400 text-sm">{insurancePolicies.find(p => p.id === selectedPolicy)?.vehicle.color} • {insurancePolicies.find(p => p.id === selectedPolicy)?.vehicle.licensePlate}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Adjuster and Insurance Contact Information */}
                          <div className="mt-6 grid grid-cols-2 gap-6 pt-6 border-t border-[#5F6979]">
                            {/* Adjuster Information */}
                            <div>
                              <h5 className="text-gray-400 text-sm mb-2 font-bold">Adjuster Information</h5>
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 bg-[#374151] rounded-full flex items-center justify-center text-[#E6E0E9]">
                                  👤
                                </div>
                                <div>
                                  <p className="text-[#E6E0E9]">{insurancePolicies.find(p => p.id === selectedPolicy)?.adjuster?.name || 'Not Assigned'}</p>
                                  <p className="text-gray-400 text-sm">{insurancePolicies.find(p => p.id === selectedPolicy)?.adjuster?.role || 'Claims Adjuster'}</p>
                                </div>
                              </div>
                              {insurancePolicies.find(p => p.id === selectedPolicy)?.adjuster?.phone && (
                                <div className="mt-2 flex items-center gap-2">
                                  <Phone size={14} className="text-gray-400" />
                                  <span className="text-[#E6E0E9]">{insurancePolicies.find(p => p.id === selectedPolicy)?.adjuster?.phone}</span>
                                </div>
                              )}
                              {insurancePolicies.find(p => p.id === selectedPolicy)?.adjuster?.email && (
                                <div className="mt-2 flex items-center gap-2">
                                  <Mail size={14} className="text-gray-400" />
                                  <span className="text-[#E6E0E9]">{insurancePolicies.find(p => p.id === selectedPolicy)?.adjuster?.email}</span>
                                </div>
                              )}
                            </div>

                            {/* Insurance Contact Information */}
                            <div>
                              <h5 className="text-gray-400 text-sm mb-2 font-bold">Insurance Contact</h5>
                              <div className="space-y-2">
                                {insurancePolicies.find(p => p.id === selectedPolicy)?.contact?.address && (
                                  <div className="flex items-center gap-2">
                                    <Building2 size={14} className="text-gray-400" />
                                    <span className="text-[#E6E0E9]">{insurancePolicies.find(p => p.id === selectedPolicy)?.contact?.address}</span>
                                  </div>
                                )}
                                {insurancePolicies.find(p => p.id === selectedPolicy)?.contact?.phone && (
                                  <div className="flex items-center gap-2">
                                    <Phone size={14} className="text-gray-400" />
                                    <span className="text-[#E6E0E9]">{insurancePolicies.find(p => p.id === selectedPolicy)?.contact?.phone}</span>
                                  </div>
                                )}
                                {insurancePolicies.find(p => p.id === selectedPolicy)?.contact?.email && (
                                  <div className="flex items-center gap-2">
                                    <Mail size={14} className="text-gray-400" />
                                    <span className="text-[#E6E0E9]">{insurancePolicies.find(p => p.id === selectedPolicy)?.contact?.email}</span>
                                  </div>
                                )}
                                {insurancePolicies.find(p => p.id === selectedPolicy)?.contact?.fax && (
                                  <div className="flex items-center gap-2">
                                    <FileText size={14} className="text-gray-400" />
                                    <span className="text-[#E6E0E9]">{insurancePolicies.find(p => p.id === selectedPolicy)?.contact?.fax}</span>
                                  </div>
                                )}
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

        {/* Vehicles Tab Content */}
        {activeTab === 'vehicles' && (
          <div className="flex gap-8">
            {/* Left panel - Vehicle selection */}
            <div className="w-1/2 border-r border-[#374151] pr-8">
              <div className="mb-6">
                <h2 className="text-[14px] font-medium text-[#EDF2FF] mb-1">Select Vehicle</h2>
                <p className="text-[10px] text-[#ADB5BD]">Manage all vehicles associated with the case. Click onto each card to see more details.</p>
              </div>

              {/* Vehicle cards */}
              <div className="space-y-2">
                {client && client.vehicles && client.vehicles.length > 0 ? (
                  client.vehicles.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      onClick={() => setSelectedVehicle(vehicle)}
                      className={`relative flex items-center p-4 bg-[#151F2D] rounded-xl cursor-pointer ${
                        selectedVehicle?.id === vehicle.id ? 'border-l-2 border-[#228BE6]' : ''
                      }`}
                    >
                      <div className="flex-1 flex items-center gap-4">
                        <div className="h-10 w-10 bg-[#374151] rounded-full flex items-center justify-center text-[#E6E0E9]">
                          {vehicle.vehicleType === 'car' ? '🚗' : 
                           vehicle.vehicleType === 'truck' ? '🚛' : 
                           vehicle.vehicleType === 'motorcycle' ? '🏍️' : '🚐'}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-[16px] font-medium text-[#E6E0E9]">
                              {vehicle.year} {vehicle.make} {vehicle.model}
                            </h3>
                            {vehicle.isClient && (
                              <span className="text-yellow-400">★</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-[14px] text-[#E6E0E9]">{vehicle.color} • {vehicle.licensePlate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-400">
                    No vehicles found for this client.
                  </div>
                )}
              </div>

              {/* Add vehicle button */}
              <button className="w-full mt-4 flex items-center justify-between px-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-[11px] text-[#767778]">
                <span>Add New Vehicle</span>
                <Plus size={12} className="text-[#767778]" />
              </button>
            </div>

            {/* Right panel - Vehicle details */}
            <div className="w-1/2">
              {selectedVehicle ? (
                <div className="mt-4 space-y-6">
                  {/* Vehicle Card */}
                  <div className="space-y-4">
                    <div className="bg-[#151F2D] p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 bg-[#374151] rounded-full flex items-center justify-center text-[#E6E0E9]">
                            🚗
                          </div>
                          <div>
                            <h4 className="text-[#E6E0E9] font-medium text-lg">
                              {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
                            </h4>
                            <p className="text-gray-400 text-sm">{selectedVehicle.color} • {selectedVehicle.licensePlate}</p>
                          </div>
                        </div>
                        <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                          selectedVehicle.isClient ? 'bg-green-900/50 text-green-400' : 'bg-gray-900/50 text-gray-400'
                        }`}>
                          {selectedVehicle.isClient ? 'Client Vehicle' : 'Other Vehicle'}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        {/* Vehicle Details */}
                        <div>
                          <h5 className="text-gray-400 text-sm mb-2 font-bold">Vehicle Details</h5>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">VIN</span>
                              <span className="text-[#E6E0E9]">{selectedVehicle.vin}</span>
                            </div>
                          </div>
                        </div>

                        {/* Insurance Information */}
                        {selectedVehicle.insurancePolicies && selectedVehicle.insurancePolicies.length > 0 && (
                          <div>
                            <h5 className="text-gray-400 text-sm mb-2 font-bold">Insurance Information</h5>
                            <div className="space-y-4">
                              {selectedVehicle.insurancePolicies.map((policy, index) => {
                                // Find the matching policy in insurancePolicies array
                                const fullPolicy = insurancePolicies.find(p => 
                                  p.provider.name === policy.provider?.name &&
                                  (p.vehicle?.vin === selectedVehicle.vin || p.policyNumber === policy.number)
                                );
                                return (
                                  <div key={index} className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                      <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center overflow-hidden p-1">
                                        {policy.provider?.name.includes("Progressive") ? (
                                          <img src="/logo/Progressive-logo.png" alt="Progressive Insurance" className="w-full h-full object-contain" />
                                        ) : policy.provider?.name.includes("State Farm") ? (
                                          <img src="/logo/statefarm.jpg" alt="State Farm Insurance" className="w-full h-full object-contain" />
                                        ) : (
                                          <span className="text-sm">{policy.type}</span>
                                        )}
                                      </div>
                                      <span className="text-[#E6E0E9]">{policy.provider?.name || 'Unknown Provider'}</span>
                                    </div>
                                    <button
                                      onClick={() => handleViewVehiclePolicy(selectedVehicle)}
                                      className="text-blue-400 hover:text-blue-300 text-sm underline"
                                    >
                                      {fullPolicy ? 
                                        `#${fullPolicy.claimNumber || fullPolicy.policyNumber}` : 
                                        `#${policy.number}`
                                      }
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Second Row - Owner and Driver Information */}
                      <div className="grid grid-cols-2 gap-6 mt-6 pt-6 border-t border-[#5F6979]">
                        {/* Owner Information */}
                        {selectedVehicle.owner && (
                          <div>
                            <h5 className="text-gray-400 text-sm mb-2 font-bold">Owner</h5>
                            <div className="relative group">
                              <div className="flex items-center gap-3 p-3 rounded-lg bg-[#1F2937] cursor-pointer">
                                <div className="h-10 w-10 bg-[#374151] rounded-full flex items-center justify-center text-xl">
                                  {selectedVehicle.owner.relationship === 'Self' ? '👤' : '👥'}
                                </div>
                                <div>
                                  <p className="text-[#E6E0E9] text-sm font-medium">{selectedVehicle.owner.name}</p>
                                  <p className="text-gray-400 text-xs">{selectedVehicle.owner.relationship || 'Owner'}</p>
                                </div>
                              </div>
                              {/* Hover Card */}
                              <div className="absolute left-0 mt-2 w-64 p-4 bg-[#1F2937] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 space-y-2">
                                {selectedVehicle.owner.phone && (
                                  <div className="flex items-center gap-2">
                                    <Phone size={14} className="text-gray-400" />
                                    <span className="text-[#E6E0E9] text-sm">{selectedVehicle.owner.phone}</span>
                                  </div>
                                )}
                                {selectedVehicle.owner.email && (
                                  <div className="flex items-center gap-2">
                                    <Mail size={14} className="text-gray-400" />
                                    <span className="text-[#E6E0E9] text-sm">{selectedVehicle.owner.email}</span>
                                  </div>
                                )}
                                {selectedVehicle.owner.address && (
                                  <div className="flex items-center gap-2">
                                    <Building2 size={14} className="text-gray-400" />
                                    <span className="text-[#E6E0E9] text-sm">{selectedVehicle.owner.address}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Driver Information */}
                        {selectedVehicle.driver && (
                          <div>
                            <h5 className="text-gray-400 text-sm mb-2 font-bold">Driver</h5>
                            <div className="relative group">
                              <div className="flex items-center gap-3 p-3 rounded-lg bg-[#1F2937] cursor-pointer">
                                <div className="h-10 w-10 bg-[#374151] rounded-full flex items-center justify-center text-xl">
                                  {selectedVehicle.driver.name === selectedVehicle.owner.name ? '👤' : '🚗'}
                                </div>
                                <div>
                                  <p className="text-[#E6E0E9] text-sm font-medium">{selectedVehicle.driver.name}</p>
                                  <p className="text-gray-400 text-xs">Driver</p>
                                </div>
                              </div>
                              {/* Hover Card */}
                              <div className="absolute left-0 mt-2 w-64 p-4 bg-[#1F2937] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 space-y-2">
                                {selectedVehicle.driver.licenseNumber && (
                                  <div className="flex items-center gap-2">
                                    <FileText size={14} className="text-gray-400" />
                                    <span className="text-[#E6E0E9] text-sm">DL: {selectedVehicle.driver.licenseNumber}</span>
                                  </div>
                                )}
                                {selectedVehicle.driver.phone && (
                                  <div className="flex items-center gap-2">
                                    <Phone size={14} className="text-gray-400" />
                                    <span className="text-[#E6E0E9] text-sm">{selectedVehicle.driver.phone}</span>
                                  </div>
                                )}
                                {selectedVehicle.driver.email && (
                                  <div className="flex items-center gap-2">
                                    <Mail size={14} className="text-gray-400" />
                                    <span className="text-[#E6E0E9] text-sm">{selectedVehicle.driver.email}</span>
                                  </div>
                                )}
                                {selectedVehicle.driver.address && (
                                  <div className="flex items-center gap-2">
                                    <Building2 size={14} className="text-gray-400" />
                                    <span className="text-[#E6E0E9] text-sm">{selectedVehicle.driver.address}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Select a vehicle to view details
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
