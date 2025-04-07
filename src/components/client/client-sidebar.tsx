import { User, Briefcase, Users, CheckCircle, Mail, Phone, Calendar, FileText, CreditCard } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import type { Client } from "@/data/clients"

interface ClientSidebarProps {
  client: Client
}

const getTeamMemberEmoji = (gender: "male" | "female", role: "caseManager" | "attorney" | "paralegal") => {
  const emojiMap = {
    caseManager: {
      male: "👨‍💼",
      female: "👩‍💼"
    },
    attorney: {
      male: "👨‍⚖️",
      female: "👩‍⚖️"
    },
    paralegal: {
      male: "👨‍💻",
      female: "👩‍💻"
    }
  }
  return emojiMap[role][gender]
}

// Helper function to calculate SOL date (2 years from date of loss)
const calculateSOLDate = (dateOfLoss: string): string => {
  const lossDate = new Date(dateOfLoss)
  const solDate = new Date(lossDate)
  solDate.setFullYear(solDate.getFullYear() + 2)
  return solDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit' 
  })
}

export function ClientSidebar({ client }: ClientSidebarProps) {
  return (
    <div className="w-full lg:w-1/3 bg-[#1E293B] rounded-lg p-4">
      <div className="border-b border-gray-700 pb-3 mb-3">
        <h3 className="text-white font-medium">Client Summary</h3>
      </div>

      <div className="space-y-6">
        {/* Case Manager */}
        <div className="flex items-center">
          <User className="h-5 w-5 text-gray-400 mr-4" />
          <span className="text-gray-400 w-32">Case Manager</span>
          <div className="flex items-center">
            <Avatar className="h-6 w-6 mr-3 flex items-center justify-center">
              <AvatarFallback className="text-lg">
                {getTeamMemberEmoji(client.team.caseManagerGender, "caseManager")}
              </AvatarFallback>
            </Avatar>
            <span className="text-white">{client.caseManager}</span>
          </div>
        </div>

        {/* Attorney */}
        <div className="flex items-center">
          <Briefcase className="h-5 w-5 text-gray-400 mr-4" />
          <span className="text-gray-400 w-32">Attorney</span>
          <div className="flex items-center">
            <Avatar className="h-6 w-6 mr-3 flex items-center justify-center">
              <AvatarFallback className="text-lg">
                {getTeamMemberEmoji(client.team.leadAttorneyGender, "attorney")}
              </AvatarFallback>
            </Avatar>
            <span className="text-white">{client.leadAttorney}</span>
          </div>
        </div>

        {/* Paralegal */}
        <div className="flex items-center">
          <Users className="h-5 w-5 text-gray-400 mr-4" />
          <span className="text-gray-400 w-32">Paralegal</span>
          <div className="flex items-center">
            <Avatar className="h-6 w-6 mr-3 flex items-center justify-center">
              <AvatarFallback className="text-lg">
                {getTeamMemberEmoji(client.team.paralegalGender, "paralegal")}
              </AvatarFallback>
            </Avatar>
            <span className="text-white">{client.paralegal}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-gray-400 mr-4" />
          <span className="text-gray-400 w-32">Progress</span>
          <div className="w-full max-w-[300px]">
            <Progress value={client.progress} className="h-2.5 bg-gray-600 [&>div]:bg-[#12B886]" />
            <div className="text-right text-xs text-green-500 mt-1">{client.progress}%</div>
          </div>
        </div>

        {/* Insurance Policies */}
        {client.insurancePolicies && client.insurancePolicies.map((policy, index) => (
          <div key={index} className="flex items-center">
            <CreditCard className="h-5 w-5 text-gray-400 mr-4" />
            <span className="text-gray-400 w-32">{policy.type.charAt(0).toUpperCase() + policy.type.slice(1)} Policy</span>
            <span className="text-white truncate">{policy.policyNumber}</span>
          </div>
        ))}

        {/* Date of Birth */}
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-gray-400 mr-4" />
          <span className="text-gray-400 w-32">Date of Birth</span>
          <span className="text-white">{client.dateOfBirth}</span>
        </div>

        {/* Contact Info */}
        <div className="flex items-center">
          <Mail className="h-5 w-5 text-gray-400 mr-4" />
          <span className="text-gray-400 w-32">Email</span>
          <span className="text-white truncate">
            {client.email || `${client.name.toLowerCase().replace(" ", ".")}@example.com`}
          </span>
        </div>

        <div className="flex items-center">
          <Phone className="h-5 w-5 text-gray-400 mr-4" />
          <span className="text-gray-400 w-32">Phone</span>
          <span className="text-white">{client.phone || "(555) 123-4567"}</span>
        </div>

        {/* Case Info */}
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-gray-400 mr-4" />
          <span className="text-gray-400 w-32">SOL Date</span>
          <span className="text-white">{calculateSOLDate(client.dateOfLoss)}</span>
        </div>

        <div className="flex items-center">
          <FileText className="h-5 w-5 text-gray-400 mr-4" />
          <span className="text-gray-400 w-32">Case Type</span>
          <span className="text-white">
            {client.incidentType === "car" ? "Auto Accident" : "Ladder Fall"}
          </span>
        </div>
      </div>
    </div>
  )
}

