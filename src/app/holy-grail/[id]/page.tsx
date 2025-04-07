import { Sidebar } from "@/components/navigation"
import { Liability } from "@/components/holy-grail/liability"
import { Header } from "@/components/holy-grail/header"
import { Injuries } from "@/components/holy-grail/injuries"
import { MedicalBills } from "@/components/holy-grail/medical-bill"
import { clients } from "@/data/clients"

interface PageProps {
  params: {
    id: string
  }
}

export default function HolyGrailPage({ params }: PageProps) {
  // Find the client by ID
  const client = clients.find(c => c.id === parseInt(params.id))

  if (!client) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-white">Client not found</div>
      </div>
    )
  }

  // Format client data for header
  const clientData = {
    name: client.name,
    dateOfLoss: client.dateOfLoss,
    defenseAttorney: client.defendants[0]?.defenseCounsel?.name || 'Not Assigned',
    biLimit: client.insurancePolicies
      .filter(p => p.type === "BI")
      .reduce((total, policy) => {
        const limit = parseFloat(policy.limit.replace(/[^0-9.-]+/g, ''))
        return total + (isNaN(limit) ? 0 : limit)
      }, 0),
    umLimit: client.insurancePolicies
      .filter(p => p.type === "UM")
      .reduce((total, policy) => {
        const limit = parseFloat(policy.limit.replace(/[^0-9.-]+/g, ''))
        return total + (isNaN(limit) ? 0 : limit)
      }, 0)
  }

  // Format medical bills data
  const bills = client.medicalProviders.map(provider => ({
    provider: provider.name,
    originalBalance: provider.billingInfo.totalBilled,
    reduction: provider.medicalRecords.reduce((total, record) => {
      if (record.billing) {
        return total + record.billing.insuranceAdjustment + record.billing.firmAdjustment
      }
      return total
    }, 0),
    finalBalance: provider.billingInfo.outstandingBalance
  }))

  // Format providers data
  const providers = client.medicalProviders.map(provider => ({
    name: provider.name,
    details: {
      date: provider.visits[0]?.date || 'No visits recorded',
      provider: provider.name,
      description: provider.visits[0]?.summary || 'No summary available',
      injuries: provider.visits[0]?.treatmentAreas.map(area => area.name) || [],
      recommendations: provider.visits[0]?.description || 'No recommendations available',
      additionalNotes: provider.visits[0]?.notes || 'No additional notes'
    }
  }))
  
  return (
    <div className="min-h-screen bg-[#0F172A] flex">
      {/* Sidebar */}
      <div className="w-64 fixed inset-y-0 left-0">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 ml-64">
        <div className="max-w-[1600px] mx-auto min-h-screen flex flex-col">
          {/* Header */}
          <div className="w-full">
            <Header client={clientData} />
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-auto">
            <div className="p-6 space-y-6">
              {/* Two-column layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#1E293B] rounded-lg overflow-hidden">
                  <Injuries providers={providers} defendants={client.defendants} />
                </div>
                <div className="bg-[#1E293B] rounded-lg overflow-hidden">
                  <Liability liabilityStatement={client.crashReport.liabilityStatement} />
                </div>
              </div>

              {/* Medical Bills */}
              <div className="bg-[#1E293B] rounded-lg overflow-hidden">
                <MedicalBills bills={bills} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
