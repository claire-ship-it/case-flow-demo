"use client"

import { useState } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import { Chat } from "./chat"
import { Client } from "@/data/clients"
import Link from "next/link"

interface HeaderProps {
  client: {
    id: number
    name: string
    avatarUrl?: string
    dateOfLoss: string
    defenseAttorney: string
    biLimit: number
    umLimit: number
  }
}

export function Header({ client }: HeaderProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)

  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  return (
    <>
      <div className="px-6 pt-6 pb-3">
        <div className="bg-[#1E293B] rounded-lg">
          <div className="flex items-center justify-between p-6">
            {/* Left section - Client info */}
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                {client.avatarUrl ? (
                  <img src={client.avatarUrl} alt={client.name} />
                ) : (
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 h-full w-full flex items-center justify-center text-2xl rounded-full">
                    👩
                  </div>
                )}
              </Avatar>
              <Link 
                href={`/client/${client.id}`}
                className="text-xl font-semibold text-white hover:text-blue-400 transition-colors"
              >
                {client.name}
              </Link>
            </div>

            {/* Center section - Case details */}
            <div className="flex items-center justify-between space-x-12">
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-400">DOL</span>
                <span className="text-sm font-medium text-white">{client.dateOfLoss}</span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-400">Defense Attorney</span>
                <span className="text-sm font-medium text-white">{client.defenseAttorney}</span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-400">BI Limit Final</span>
                <span className="text-sm font-medium text-white">{formatCurrency(client.biLimit)}</span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-400">UM Limit Final</span>
                <span className="text-sm font-medium text-white">{formatCurrency(client.umLimit)}</span>
              </div>
            </div>

            {/* Right section - Chat button */}
            <Button 
              variant="secondary" 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setIsChatOpen(true)}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </Button>
          </div>
        </div>
      </div>

      <Chat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        clientName={client.name}
        clientId={client.id}
      />
    </>
  )
}
