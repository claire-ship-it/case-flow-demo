"use client"

import type { ReactNode } from "react"
import { ChevronDown, User, FileText, BarChart2 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavItemProps {
  icon: ReactNode
  label: string
  href?: string
  active?: boolean
  badge?: boolean
}

export function NavItem({ icon, label, href, active = false, badge = false }: NavItemProps) {
  const content = (
    <div
      className={`flex items-center p-2.5 rounded-full ${active ? "bg-[#3A3F5F] text-white" : "text-gray-400 hover:bg-gray-800"}`}
    >
      <span className="mr-2.5">{icon}</span>
      <span className="text-sm">{label}</span>
      {badge && <span className="ml-auto w-1.5 h-1.5 bg-orange-500 rounded-full"></span>}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    )
  }

  return content
}

export function Sidebar() {
  const pathname = usePathname()
  const isClientsPage = pathname === '/client'
  const isHolyGrailPage = pathname?.startsWith('/holy-grail')

  return (
    <div className="absolute left-0 top-0 w-[235px] h-full bg-[#0F172A] rounded-md flex flex-col">
      <div className="p-5 border-b border-gray-800">
        <div className="relative h-8">
          <Image
            src="/logo/Logo_Cropped.png"
            alt="Call Ryan Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <nav className="p-5 space-y-1">
        <div className="text-gray-400 text-sm mb-2">NAVIGATION</div>
        <NavItem 
          icon={<User size={16} />} 
          label="Clients" 
          href="/client"
          active={isClientsPage}
        />
        <NavItem icon={<FileText size={16} />} label="Tasks" />
        <NavItem 
          icon={<BarChart2 size={16} />} 
          label="Holy Grail" 
          href="/holy-grail/1"
          active={isHolyGrailPage}
        />
      </nav>

      <div className="mt-auto p-5 border-t border-gray-800">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-3">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 h-full w-full flex items-center justify-center text-xl rounded-full">
              👨‍⚖️
            </div>
          </Avatar>
          <div>
            <div className="text-sm font-medium text-white">Ryan Hughes</div>
            <div className="text-xs text-gray-400">ryan@ryanhugheslaw.com</div>
          </div>
          <ChevronDown size={16} className="ml-auto text-gray-400" />
        </div>
      </div>
    </div>
  )
}

