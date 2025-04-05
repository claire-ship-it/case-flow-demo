"use client"

import { useState, useEffect } from "react"
import { ClientSupport1 } from "./client-support-1"
import { ClientSupport2 } from "./client-support-2"
import { Client } from "@/data/clients"

interface ClientSupportProps {
  client: Client
}

export function ClientSupport({ client }: ClientSupportProps) {
  const [activeTab, setActiveTab] = useState('defendants')

  // Add event listener for tab changes
  useEffect(() => {
    const handleTabChange = (event: CustomEvent) => {
      setActiveTab(event.detail);
    };

    window.addEventListener('changeTab', handleTabChange as EventListener);
    return () => {
      window.removeEventListener('changeTab', handleTabChange as EventListener);
    };
  }, []);

  // Safety check for client
  if (!client) {
    return <div className="p-6 text-center text-gray-500">No client data available</div>;
  }

  const tabs = [
    { id: 'defendants', label: 'Defendants' },
    { id: 'insurance-policies', label: 'Insurance Policies' },
    { id: 'vehicles', label: 'Vehicles' },
    { id: 'medical-providers', label: 'Medical Providers' },
    { id: 'medical-requests', label: 'Medical Requests' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'case-logs', label: 'Case Logs' },
    { id: 'documents', label: 'Documents' }
  ]

  const renderTabContent = () => {
    // First three tabs are handled by ClientSupport1
    if (['defendants', 'insurance-policies', 'vehicles'].includes(activeTab)) {
      return <ClientSupport1 client={client} activeTab={activeTab} />
    }
    // Remaining tabs are handled by ClientSupport2
    return <ClientSupport2 client={client} activeTab={activeTab} />
  }

  return (
    <div className="bg-[#1E293B] rounded-lg overflow-hidden">
      {/* Tabs navigation */}
      <div className="bg-[#111827] border-b border-gray-700">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 cursor-pointer whitespace-nowrap ${
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
        {renderTabContent()}
      </div>
    </div>
  )
}

