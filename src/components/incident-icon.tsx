import { Car, Construction } from "lucide-react"

interface IncidentIconProps {
  type: "car" | "ladder"
  className?: string
}

export function IncidentIcon({ type, className = "h-4 w-4 mr-2 text-gray-400" }: IncidentIconProps) {
  return type === "car" ? <Car className={className} /> : <Construction className={className} />
}

