"use client"

import { ChevronDown } from "lucide-react"
import * as Collapsible from "@radix-ui/react-collapsible"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Defendant } from "@/data/clients"

interface Provider {
  name: string
  client?: string
  presuit?: string
  logo?: string
  details?: {
    date: string
    provider: string
    title?: string
    description: string
    injuries?: string[]
    recommendations?: string
    additionalNotes?: string
  }
}

interface InjuriesProps {
  providers: Provider[]
  defendants: Defendant[]
}

export function Injuries({ providers = [], defendants = [] }: InjuriesProps) {
  const [openSections, setOpenSections] = useState<Set<number>>(new Set())

  const toggleSection = (index: number) => {
    const newOpenSections = new Set(openSections)
    if (newOpenSections.has(index)) {
      newOpenSections.delete(index)
    } else {
      newOpenSections.add(index)
    }
    setOpenSections(newOpenSections)
  }

  const toggleAll = () => {
    if (openSections.size === providers.length) {
      // If all are open, close all
      setOpenSections(new Set())
    } else {
      // If some or none are open, open all
      setOpenSections(new Set(providers.map((_, i) => i)))
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-white">Defendants</h2>

      {/* Defendants Section */}
      {defendants.map((defendant, index) => (
        <div key={index} className="bg-[#1E293B] rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0071DC] to-[#0059B3] rounded-full flex items-center justify-center text-xl">
              🚛
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">{defendant.name}</h3>
              <p className="text-sm text-gray-400">{defendant.role}</p>
            </div>
          </div>
          {defendant.defenseCounsel && (
            <div className="mt-2 text-sm text-gray-300">
              <p>Defense Counsel: {defendant.defenseCounsel.name}</p>
              <p>Firm: {defendant.defenseCounsel.firmName}</p>
            </div>
          )}
        </div>
      ))}

      {/* Medical Providers */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Medical Providers</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleAll}
          className="text-gray-400 hover:text-white"
        >
          {openSections.size === providers.length ? 'Collapse All' : 'Expand All'}
        </Button>
      </div>
      
      <div className="space-y-2">
        {providers.map((provider, index) => (
          <Collapsible.Root 
            key={index} 
            className="w-full"
            open={openSections.has(index)}
            onOpenChange={() => toggleSection(index)}
          >
            <Collapsible.Trigger asChild>
              <button className="w-full">
                <div className="flex items-center justify-between w-full p-4 rounded-lg bg-[#1E293B] hover:bg-[#2E3B4E] transition-colors">
                  <span className="text-lg font-medium text-white">{provider.name}</span>
                  <ChevronDown 
                    className={cn(
                      "h-5 w-5 text-gray-400 transition-transform duration-200",
                      openSections.has(index) ? "rotate-180" : ""
                    )}
                  />
                </div>
              </button>
            </Collapsible.Trigger>
            
            <Collapsible.Content>
              <div className="p-6 bg-[#1E293B] rounded-b-lg border-t border-gray-700">
                {provider.details && (
                  <div className="space-y-4 text-gray-300">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-400">Visit Date:</span>
                      <span>{provider.details.date}</span>
                    </div>

                    <div className="space-y-2">
                      <p>{provider.details.description}</p>

                      {provider.details.injuries && provider.details.injuries.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-white font-medium mb-2">Injuries Noted:</h4>
                          <ul className="list-disc pl-6 space-y-1">
                            {provider.details.injuries.map((injury, i) => (
                              <li key={i}>{injury}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {provider.details.recommendations && (
                        <div className="mt-4">
                          <h4 className="text-white font-medium mb-2">Treatment Plan & Recommendations:</h4>
                          <p>{provider.details.recommendations}</p>
                        </div>
                      )}

                      {provider.details.additionalNotes && (
                        <div className="mt-4">
                          <h4 className="text-white font-medium mb-2">Additional Notes:</h4>
                          <p className="text-sm">{provider.details.additionalNotes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Collapsible.Content>
          </Collapsible.Root>
        ))}
      </div>
    </div>
  )
}
