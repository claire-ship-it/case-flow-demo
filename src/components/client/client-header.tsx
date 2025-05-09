"use client"

import { useState } from "react"
import { Link, Menu, Calendar, Car, FileCheck, BadgeDollarSign, FileWarning, Clock, FileText, ClipboardList, ScrollText, Loader2, Phone } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Client } from "@/data/clients"
import { useRouter } from "next/navigation"

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

// Helper function to format date as MM/DD/YYYY
const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

export function ClientHeader({ client }: ClientHeaderProps) {
  const caseEmoji = getCaseTypeEmoji(client.incidentType)
  const clientEmoji = getClientEmoji(client.gender)
  
  // New timeline logic
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today to midnight for accurate date comparisons

  const biDemandDueDate = new Date("2025-05-09T00:00:00"); // Updated to 5/9/2025
  
  const medicalRecordsDueDate = new Date(biDemandDueDate);
  medicalRecordsDueDate.setDate(biDemandDueDate.getDate() - 3); // 5/6/2025

  const policyLimitsDueDate = new Date(medicalRecordsDueDate);
  policyLimitsDueDate.setDate(medicalRecordsDueDate.getDate() - 4); // 5/2/2025

  const attorneyCallDueDate = new Date(biDemandDueDate);
  attorneyCallDueDate.setDate(biDemandDueDate.getDate() + 4); // 5/13/2025

  const pipProtocolDueDate = new Date(attorneyCallDueDate);
  pipProtocolDueDate.setDate(attorneyCallDueDate.getDate() + 5); // 5/18/2025

  const timelinePoints = [
    {
      date: formatDate(policyLimitsDueDate),
      label: "Policy Limits",
      icon: BadgeDollarSign, // Added BadgeDollarSign for Policy Limits consistency
      status: today > policyLimitsDueDate ? "completed" : today.getTime() === policyLimitsDueDate.getTime() ? "current" : "upcoming"
    },
    {
      date: formatDate(medicalRecordsDueDate),
      label: "Medical Records",
      icon: FileCheck,
      status: today > medicalRecordsDueDate ? "completed" : today.getTime() === medicalRecordsDueDate.getTime() ? "current" : "upcoming"
    },
    {
      date: formatDate(biDemandDueDate),
      label: "BI Demand Document",
      icon: FileText,
      status: today > biDemandDueDate ? "completed" : today.getTime() === biDemandDueDate.getTime() ? "current" : "upcoming"
    },
    {
      date: formatDate(attorneyCallDueDate),
      label: "Attorney Call #2",
      icon: Phone,
      status: today > attorneyCallDueDate ? "completed" : today.getTime() === attorneyCallDueDate.getTime() ? "current" : "upcoming"
    },
    {
      date: formatDate(pipProtocolDueDate),
      label: "PIP Protocol Start",
      icon: ClipboardList, // Added ClipboardList for PIP Protocol consistency
      status: today > pipProtocolDueDate ? "completed" : today.getTime() === pipProtocolDueDate.getTime() ? "current" : "upcoming"
    }
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Ensure sorted by date

  const router = useRouter()
  
  // New state for demand generation
  const [isGenerating, setIsGenerating] = useState(false)
  const [showGeneratingDialog, setShowGeneratingDialog] = useState(false)
  const [demandType, setDemandType] = useState<"BI" | "UM" | null>(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleHolyGrailClick = () => {
    router.push(`/holy-grail/${client.id}`)
  }

  const handleGenerateDemand = (type: "BI" | "UM") => {
    setDemandType(type)
    setShowGeneratingDialog(true)
    setIsGenerating(true)
    setShowSuccessMessage(false)
    
    localStorage.setItem('generatedDemandType', type)
    localStorage.setItem('generatedDemandTime', Date.now().toString())
    
    // Adjust title for John Smith to avoid filtering if type is BI
    let documentTitle = `${type} Demand Letter - ${client.name}`;
    if (client.name === "John Smith" && type === "BI") {
      documentTitle = `BI Client Submission - ${client.name}`;
    }

    const newDoc = {
      id: Date.now(),
      title: documentTitle, // Use the potentially adjusted title
      description: `Generated on ${new Date().toLocaleDateString()}`,
      icon: "📄", 
      date: new Date().toLocaleDateString(),
      type: type === "BI" ? "BI Generated Doc" : "UM Generated Doc", // Adjusted type slightly too for clarity
      size: "0.8 MB"
    }
    
    const existingDocs = JSON.parse(localStorage.getItem('clientDocuments') || '[]')
    localStorage.setItem('clientDocuments', JSON.stringify([newDoc, ...existingDocs]))
    
    setTimeout(() => {
      setIsGenerating(false)
      setShowSuccessMessage(true)
      
      setTimeout(() => {
        setShowGeneratingDialog(false)
        setShowSuccessMessage(false)
      }, 2000)
    }, 20000)
  }

  return (
    <>
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
              {/* <DropdownMenuItem className="text-white hover:bg-[#374151] focus:bg-[#374151]">
                <ClipboardList className="mr-2 h-4 w-4" />
                <span>Generate CRN</span>
              </DropdownMenuItem> */}
              
              {/* Updated Generate Demand with submenu */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="text-white hover:bg-[#374151] focus:bg-[#374151]">
                  <ScrollText className="mr-2 h-4 w-4" />
                  <span>Generate Demand</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="bg-[#1F2937] border-[#374151]">
                    <DropdownMenuItem 
                      className="text-white hover:bg-[#374151] focus:bg-[#374151] cursor-pointer"
                      onClick={() => handleGenerateDemand("BI")}
                    >
                      <span>BI Demand</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-white hover:bg-[#374151] focus:bg-[#374151] cursor-pointer"
                      onClick={() => handleGenerateDemand("UM")}
                    >
                      <span>UM Demand</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Action button */}
          <Button className="h-7 px-4 bg-[#2563EB] text-white text-xs flex items-center gap-2 rounded-md border border-[#374151]">
            <span>Folder</span>
            <Link size={10} className="text-white" />
          </Button>
        </div>
      </div>

      {/* Generating Demand Dialog */}
      <Dialog open={showGeneratingDialog} onOpenChange={setShowGeneratingDialog}>
        <DialogContent className="bg-[#1E293B] border-[#374151] text-white">
          <DialogHeader>
            <DialogTitle>Generating {demandType} Demand Letter</DialogTitle>
            <DialogDescription className="text-gray-400">
              {isGenerating 
                ? "Please wait while we generate the demand letter..." 
                : "Demand letter has been generated successfully!"}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center items-center py-8">
            {isGenerating ? (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                <p className="text-gray-300">This may take a few moments</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                  <FileCheck className="h-5 w-5 text-white" />
                </div>
                <p className="text-gray-300">The document has been added to the client's files</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

