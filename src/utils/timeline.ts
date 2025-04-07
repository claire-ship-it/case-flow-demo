import { FileCheck, BadgeDollarSign, Clock, Car, FileWarning } from "lucide-react"

export interface TimelinePoint {
  date: string
  label: string
  icon: any
  status: "completed" | "current" | "upcoming"
}

export const getTimelinePoints = (dateOfLoss: string, statusOfLimitation: string): TimelinePoint[] => {
  const start = new Date(dateOfLoss)
  const now = new Date()
  const end = new Date(statusOfLimitation.split(" ")[0]) // Remove GMT from SOL date

  // Calculate specific dates
  const medicalRecordsDate = new Date(start)
  medicalRecordsDate.setDate(start.getDate() + 7) // 7 days after date of loss

  const policyLimitsDate = new Date(start)
  policyLimitsDate.setDate(start.getDate() + 14) // 14 days after date of loss

  const demandDate = new Date(start)
  demandDate.setDate(start.getDate() + 30) // 30 days after date of loss

  const crnDueDate = new Date(start)
  crnDueDate.setDate(start.getDate() + 90) // 90 days from sign up

  const getStatus = (date: Date): "completed" | "current" | "upcoming" => {
    if (now > date) return "completed"
    if (now.toDateString() === date.toDateString()) return "current"
    return "upcoming"
  }

  return [
    {
      date: start.toLocaleDateString(),
      label: "Date of Loss",
      icon: Car,
      status: getStatus(start)
    },
    {
      date: medicalRecordsDate.toLocaleDateString(),
      label: "Medical Records",
      icon: FileCheck,
      status: getStatus(medicalRecordsDate)
    },
    {
      date: policyLimitsDate.toLocaleDateString(),
      label: "Policy Limits",
      icon: FileWarning,
      status: getStatus(policyLimitsDate)
    },
    {
      date: demandDate.toLocaleDateString(),
      label: "Demand Letter",
      icon: BadgeDollarSign,
      status: getStatus(demandDate)
    },
    {
      date: end.toLocaleDateString(),
      label: "SOL Date",
      icon: Clock,
      status: getStatus(end)
    }
  ]
}

export const getHeaderTimelinePoints = (dateOfLoss: string, statusOfLimitation: string): TimelinePoint[] => {
  const allPoints = getTimelinePoints(dateOfLoss, statusOfLimitation)
  
  // Return Medical Records, Policy Limits, and Demand Letter points
  return [
    {
      ...allPoints[1], // Medical Records
      date: "3/22/2024",
      status: "completed"
    },
    {
      ...allPoints[2], // Policy Limits
      date: "3/29/2024",
      status: "current"
    },
    {
      ...allPoints[3], // Demand Letter
      date: "4/14/2024",
      status: "upcoming"
    }
  ]
} 