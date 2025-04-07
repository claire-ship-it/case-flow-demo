"use client"

import { Link, Menu, Calendar, Car, FileCheck, BadgeDollarSign, FileWarning, Clock, FileText, ClipboardList, ScrollText } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Client } from "@/data/clients"
import { useRouter } from "next/navigation"
import { getHeaderTimelinePoints } from "@/utils/timeline"

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

// Helper function to calculate SOL date (2 years from date of loss)
const calculateSOLDate = (dateOfLoss: string): Date => {
  const lossDate = new Date(dateOfLoss)
  const solDate = new Date(lossDate)
  solDate.setFullYear(solDate.getFullYear() + 2)
  return solDate
}

// Helper function to get timeline points
const getTimelinePoints = (client: Client) => {
  const start = new Date(client.dateOfLoss)
  const now = new Date()
  
  // Calculate specific dates
  const medicalRecordsDate = new Date(start)
  medicalRecordsDate.setDate(start.getDate() + 7) // 7 days after date of loss

  const demandDate = new Date(start)
  demandDate.setDate(start.getDate() + 30) // 30 days after date of loss

  const solDate = calculateSOLDate(client.dateOfLoss)

  const timelinePoints = [
    {
      date: medicalRecordsDate.toLocaleDateString(),
      label: "Medical Records",
      icon: FileCheck,
      status: now > medicalRecordsDate ? "completed" : now.toDateString() === medicalRecordsDate.toDateString() ? "current" : "upcoming"
    },
    {
      date: demandDate.toLocaleDateString(),
      label: "Demand Letter",
      icon: BadgeDollarSign,
      status: now > demandDate ? "completed" : now.toDateString() === demandDate.toDateString() ? "current" : "upcoming"
    },
    {
      date: solDate.toLocaleDateString(),
      label: "SOL Date",
      icon: Clock,
      status: now > solDate ? "completed" : now.toDateString() === solDate.toDateString() ? "current" : "upcoming"
    }
  ]

  return timelinePoints
}

export function ClientHeader({ client }: ClientHeaderProps) {
  const caseEmoji = getCaseTypeEmoji(client.incidentType)
  const clientEmoji = getClientEmoji(client.gender)
  const timelinePoints = getHeaderTimelinePoints(client.dateOfLoss, client.statusOfLimitation || "")
  const router = useRouter()

  const handleHolyGrailClick = () => {
    router.push(`/holy-grail/${client.id}`)
  }

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
            {/* Progress line showing completed steps */}
            <div 
              className="absolute top-0 left-0 h-full bg-blue-500"
              style={{
                width: `${(timelinePoints.filter(point => point.status === "completed").length / timelinePoints.length) * 100}%`
              }}
            ></div>
          </div>
          
          {/* Timeline points */}
          <div className="relative flex justify-between">
            {timelinePoints.map((point, index) => {
              const Icon = point.icon

              return (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center relative z-10 ${
                    point.status === 'completed' ? 'bg-blue-500' :
                    point.status === 'current' ? 'bg-green-500' :
                    'bg-gray-600'
                  }`}>
                    <Icon className={`w-3 h-3 ${
                      point.status === 'completed' || point.status === 'current' ? 'text-white' : 'text-gray-300'
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

        {/* Menu button with dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-7 w-7 border-[#374151] bg-[#1F2937]">
              <Menu className="h-4 w-4 text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-[#1F2937] border-[#374151]">
            <DropdownMenuItem 
              className="text-white hover:bg-[#374151] focus:bg-[#374151] cursor-pointer"
              onClick={handleHolyGrailClick}
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>Holy Grail</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-[#374151] focus:bg-[#374151]">
              <ClipboardList className="mr-2 h-4 w-4" />
              <span>Generate CRN</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-[#374151] focus:bg-[#374151]">
              <ScrollText className="mr-2 h-4 w-4" />
              <span>Generate Demand</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Action button */}
        <Button className="h-7 px-4 bg-[#2563EB] text-white text-xs flex items-center gap-2 rounded-md border border-[#374151]">
          <span>Folder</span>
          <Link size={10} className="text-white" />
        </Button>
      </div>
    </div>
  )
}

