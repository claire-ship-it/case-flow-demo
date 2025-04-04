import { Link, Menu, Calendar, Car, FileCheck, BadgeDollarSign, FileWarning } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { Client } from "@/data/clients"

interface ClientHeaderProps {
  client: Client
}

const getCaseTypeEmoji = (incidentType: "car" | "ladder") => {
  const emojiMap = {
    car: "🚗",
    ladder: "🪜"
  }
  return emojiMap[incidentType]
}

const getClientEmoji = (gender: "male" | "female") => {
  const emojiMap = {
    male: "👨",
    female: "👩"
  }
  return emojiMap[gender]
}

// Helper function to get timeline points
const getTimelinePoints = (client: Client) => {
  const start = new Date(client.dateOfLoss)
  
  // Calculate specific dates
  const crashReportDate = new Date(start)
  crashReportDate.setDate(start.getDate() + 7) // 7 days after date of loss

  const policyLimitsDate = new Date(start)
  policyLimitsDate.setDate(start.getDate() + 14) // 14 days after date of loss

  const crnDueDate = new Date(start)
  crnDueDate.setDate(start.getDate() + 90) // 90 days from sign up

  return [
    {
      date: crashReportDate.toLocaleDateString(),
      label: "Crash Report",
      status: "completed" // Past
    },
    {
      date: policyLimitsDate.toLocaleDateString(),
      label: "Policy Limits",
      status: "current" // Current
    },
    {
      date: crnDueDate.toLocaleDateString(),
      label: "CRN Due",
      status: "upcoming" // Future
    }
  ]
}

export function ClientHeader({ client }: ClientHeaderProps) {
  const caseEmoji = getCaseTypeEmoji(client.incidentType)
  const clientEmoji = getClientEmoji(client.gender)
  const timelinePoints = getTimelinePoints(client)

  return (
    <div className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg mb-4 h-[74px]">
      {/* Left side - Avatar and name */}
      <div className="flex items-center w-1/5">
        <Avatar className="h-8 w-8 border border-[#374151] flex items-center justify-center text-lg">
          <AvatarFallback>{clientEmoji}</AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <div className="flex items-center gap-2">
            <span className="text-white text-lg font-normal">{client.name}</span>
            <span className="text-2xl" title={client.incidentType === "car" ? "Auto Accident" : "Ladder Fall"}>
              {caseEmoji}
            </span>
          </div>
        </div>
      </div>

      {/* Center - Timeline */}
      <div className="flex justify-center w-3/5">
        <div className="w-4/5 relative">
          {/* Timeline line with progress */}
          <div className="absolute top-[14px] left-0 w-full h-[2px] bg-gray-600">
            {/* Progress line showing completed steps (1/3 of the way) */}
            <div className="absolute top-0 left-0 w-1/3 h-full bg-blue-500"></div>
          </div>
          
          {/* Timeline points */}
          <div className="relative flex justify-between">
            {timelinePoints.map((point, index) => {
              // Define icon based on point label
              const Icon = point.label === "Crash Report" ? FileCheck :
                         point.label === "Policy Limits" ? BadgeDollarSign :
                         FileWarning // CRN Due

              return (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center relative z-10 ${
                    point.status === 'completed' ? 'bg-blue-500' : // Past events
                    point.status === 'current' ? 'bg-green-500 ring-2 ring-green-300 ring-opacity-50' : // Current event
                    'bg-gray-600' // Future events
                  }`}>
                    <Icon className={`w-3 h-3 ${
                      point.status === 'completed' ? 'text-white' :
                      point.status === 'current' ? 'text-white' :
                      'text-gray-300'
                    }`} />
                  </div>
                  <div className="mt-2 text-center">
                    <p className={`text-[10px] ${
                      point.status === 'completed' ? 'text-gray-300' :
                      point.status === 'current' ? 'text-green-400' :
                      'text-gray-500'
                    }`}>{point.label}</p>
                    <p className={`text-[8px] ${
                      point.status === 'completed' ? 'text-gray-400' :
                      point.status === 'current' ? 'text-green-400' :
                      'text-gray-500'
                    }`}>{point.date}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Right side - Controls */}
      <div className="flex items-center space-x-4 w-1/5 justify-end">
        {/* Stage and DOL */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3 text-gray-400" />
            <span className="text-gray-400 text-xs">DOL: {client.dateOfLoss}</span>
          </div>
        </div>

        {/* Menu button */}
        <Button variant="outline" size="icon" className="h-7 w-7 border-[#374151] bg-[#1F2937]">
          <Menu className="h-4 w-4 text-white" />
        </Button>

        {/* Action button */}
        <Button className="h-7 px-4 bg-[#2563EB] text-white text-xs flex items-center gap-2 rounded-md border border-[#374151]">
          <span>Folder</span>
          <Link size={10} className="text-white" />
        </Button>
      </div>
    </div>
  )
}

