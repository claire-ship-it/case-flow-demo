import { Search, Settings, ChevronDown, Filter, BarChart2 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Sidebar } from "@/components/navigation"
import { PersonEmoji } from "@/components/person-emoji"
import { IncidentIcon } from "@/components/incident-icon"
import { clients, Client } from "@/data/clients"
import Link from "next/link"

export default function CaseManagementDashboard() {
  return (
    <div className="relative w-full h-screen bg-[#212529] text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="ml-[256px] p-5">
        {/* Top navigation */}
        <div className="flex items-center justify-between p-4 bg-[#111827] rounded-lg mb-4">
          <div className="flex items-center gap-1">
            <span className="text-gray-400 text-sm">Clients</span>
            <ChevronDown size={16} className="text-gray-300" />
            <span className="text-white text-sm">Client Information</span>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="bg-[rgba(59,130,246,0.25)] border-white text-white flex items-center gap-2"
            >
              <Settings size={16} />
              <span>Settings</span>
            </Button>
            <Avatar className="h-8 w-8 border border-gray-700">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex items-center bg-[#1F2937] rounded-lg p-4 mb-4">
          <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden">
            <Button variant="ghost" className="h-9 px-3 rounded-none">
              <span className="text-gray-400">All</span>
            </Button>
            <div className="h-9 w-px bg-gray-700"></div>
            <Button variant="ghost" className="h-9 w-9 p-0 rounded-none">
              <Filter size={20} className="text-gray-300" />
            </Button>
          </div>

          <div className="ml-auto">
            <Button variant="ghost" className="border border-gray-700 text-gray-400 flex items-center gap-2">
              <Search size={16} />
              <span>Search</span>
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#1F2937] rounded-lg p-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#111827] text-white">
                <tr>
                  <th className="p-3 text-left font-semibold">Name</th>
                  <th className="p-3 text-left font-semibold">Date of Loss</th>
                  <th className="p-3 text-center font-semibold">Tasks Due</th>
                  <th className="p-3 text-left font-semibold">Case Manager</th>
                  <th className="p-3 text-left font-semibold">Lead Attorney</th>
                  <th className="p-3 text-center font-semibold">Paralegal</th>
                  <th className="p-3 text-left font-semibold">Progress</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client: Client) => (
                  <tr key={client.id} className="border-b border-gray-700">
                    <td className="p-4 text-gray-300">
                      <div className="flex items-center gap-2">
                        <Link href={`/client/${client.id}`} className="flex items-center hover:text-blue-400">
                          <IncidentIcon
                            type={client.incidentType}
                            className={`${client.stage === "Presuit" ? "text-green-500" : "text-yellow-500"} mr-2`}
                          />
                          <PersonEmoji gender={client.gender} fallback={client.name.charAt(0)} />
                          <span className="font-bold ml-1">{client.name}</span>
                        </Link>
                        <Link
                          href={`/holy-grail/${client.id}`}
                          className="flex items-center gap-1 px-2 py-1 text-xs bg-[#3A3F5F] text-white rounded hover:bg-[#4A4F6F] transition-colors"
                        >
                          <BarChart2 size={12} />
                          <span>Holy Grail</span>
                        </Link>
                      </div>
                    </td>
                    <td className="p-4 text-gray-300">
                      {client.dateOfLoss}
                    </td>
                    <td className="p-4 text-center text-gray-300">
                      {client.tasksDue}
                    </td>
                    <td className="p-4 text-gray-300">
                      <div className="flex items-center gap-2">
                        <PersonEmoji gender={client.team.caseManagerGender} fallback={client.caseManager.charAt(0)} />
                        {client.caseManager}
                      </div>
                    </td>
                    <td className="p-4 text-gray-300">
                      <div className="flex items-center gap-2">
                        <PersonEmoji gender={client.team.leadAttorneyGender} fallback={client.leadAttorney.charAt(0)} />
                        {client.leadAttorney}
                      </div>
                    </td>
                    <td className="p-4 text-center text-gray-300">
                      <div className="flex items-center gap-2 justify-center">
                        <PersonEmoji gender={client.team.paralegalGender} fallback={client.paralegal.charAt(0)} />
                        {client.paralegal}
                      </div>
                    </td>
                    <td className="p-4 text-gray-300">
                      <Progress 
                        value={client.progress} 
                        max={100} 
                        className="[&>div]:bg-green-500" 
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}