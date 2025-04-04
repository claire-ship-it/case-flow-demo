import type { ReactNode } from "react"
import { ChevronDown, User, FileText, BarChart2 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface NavItemProps {
  icon: ReactNode
  label: string
  active?: boolean
  badge?: boolean
}

export function NavItem({ icon, label, active = false, badge = false }: NavItemProps) {
  return (
    <div
      className={`flex items-center p-2.5 rounded-full ${active ? "bg-[#3A3F5F] text-white" : "text-gray-400 hover:bg-gray-800"}`}
    >
      <span className="mr-2.5">{icon}</span>
      <span className="text-sm">{label}</span>
      {badge && <span className="ml-auto w-1.5 h-1.5 bg-orange-500 rounded-full"></span>}
    </div>
  )
}

export function Sidebar() {
  return (
    <div className="absolute left-0 top-0 w-[235px] h-full bg-[#0F172A] rounded-md flex flex-col">
      <div className="p-5 border-b border-gray-800">
        <div className="text-xl font-semibold">Hughes Law</div>
      </div>

      <nav className="p-5 space-y-1">
        <div className="text-gray-400 text-sm mb-2">NAVIGATION</div>
        <NavItem icon={<User size={16} />} label="Clients" active />
        <NavItem icon={<FileText size={16} />} label="Tasks" />
        <NavItem icon={<BarChart2 size={16} />} label="Holy Grail" />
      </nav>

      <div className="mt-auto p-5 border-t border-gray-800">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-3 bg-amber-500">
            <AvatarFallback>HL</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-medium">Hughes Law</div>
            <div className="text-xs text-gray-400">info@hugheslaw.com</div>
          </div>
          <ChevronDown size={16} className="ml-auto" />
        </div>
      </div>
    </div>
  )
}

