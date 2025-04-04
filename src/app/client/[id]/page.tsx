import { Sidebar } from "@/components/navigation"
import { clients } from "@/data/clients"
import { ClientHeader, ClientDetails, ClientSidebar, ClientSupport } from "@/components/client"

interface PageProps {
  params: {
    id: string
  }
}

export default async function ClientDetailPage({ params }: PageProps) {
  // Ensure params is properly awaited
  const { id } = await Promise.resolve(params)
  const clientId = Number(id)
  
  // Find the client by ID with fallback to first client
  const client = clients.find((c) => c.id === clientId) || clients[0]

  return (
    <div className="relative flex h-screen bg-[#0F172A]">
      {/* Sidebar - fixed */}
      <div className="fixed left-0 top-0 h-full w-64">
        <Sidebar />
      </div>

      {/* Main content - scrollable */}
      <div className="flex-1 ml-64">
        <div className="h-full overflow-auto bg-[#0F172A] text-white">
          <div className="p-5 min-h-full">
            {/* Client header */}
            <ClientHeader client={client} />

            {/* Client info section */}
            <div className="flex gap-4 mb-4">
              {/* Left panel - Client details */}
              <ClientDetails client={client} />

              {/* Right panel - Client sidebar */}
              <ClientSidebar client={client} />
            </div>

            {/* Support section */}
            <div className="mb-5">
              <ClientSupport />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

