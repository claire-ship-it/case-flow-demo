"use client"

import { ChevronDown } from "lucide-react"
import * as Collapsible from "@radix-ui/react-collapsible"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"

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
}

export function Injuries({ providers = defaultProviders }: InjuriesProps) {
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
      <div className="bg-[#1E293B] rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#0071DC] to-[#0059B3] rounded-full flex items-center justify-center text-xl">
            🚛
          </div>
          <h3 className="text-lg font-medium text-white">Walmart-Transportation LLC</h3>
        </div>
      </div>

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

const defaultProviders: Provider[] = [
  {
    name: "Advent Health Hospital-Fletcher",
    details: {
      date: "March 15, 2024",
      provider: "Advent Health Hospital-Fletcher",
      description: "Initial emergency room visit following the motor vehicle collision with Walmart Transportation LLC semi-truck. Patient presented with acute injuries and was evaluated by the ER team.",
      injuries: [
        "Cervical strain, acute",
        "Injury of head",
        "Epistaxis (nosebleed)",
        "Muscle strain of the chest wall"
      ],
      recommendations: "The attending provider, Jamie Lynn Kazar, PA-C, recommended a treatment plan that included muscle relaxers and ibuprofen for pain management. Ms. Walker was advised to follow up with her primary care provider within the next 2-3 days.",
      additionalNotes: "Initial imaging studies were performed to rule out acute trauma. Patient was discharged with prescribed medications and specific follow-up instructions. All documentation and billing records are available in the attached reports."
    }
  },
  {
    name: "Advanced Wellness & Rehabilitation Center",
    details: {
      date: "March 18, 2024",
      provider: "Advanced Wellness & Rehabilitation Center",
      description: "Patient began comprehensive physical therapy and rehabilitation program. Initial evaluation revealed significant cervical and thoracic dysfunction with associated muscular guarding and restricted range of motion.",
      injuries: [
        "Persistent cervical strain",
        "Post-traumatic headaches",
        "Thoracic muscle strain"
      ],
      recommendations: "Treatment plan includes physical therapy sessions 3 times per week for 4 weeks, focusing on manual therapy, therapeutic exercises, and neuromuscular re-education. Patient was also provided with a home exercise program to complement in-clinic treatments.",
      additionalNotes: "Patient reports consistent 7/10 pain levels in cervical region with radiation into bilateral upper trapezius. Treatment response has been positive with noted improvements in range of motion following each session."
    }
  },
  {
    name: "Tampa Bay Imaging",
    details: {
      date: "March 20, 2024",
      provider: "Tampa Bay Imaging",
      description: "Comprehensive diagnostic imaging session to evaluate the extent of injuries sustained in the MVA. Multiple studies were performed including cervical spine MRI and brain MRI with and without contrast.",
      recommendations: "MRI studies revealed evidence of cervical disc bulging at C5-C6 with mild neural foraminal narrowing. Brain MRI showed no acute intracranial abnormalities but noted soft tissue swelling consistent with trauma.",
      additionalNotes: "Follow-up imaging may be necessary in 6-8 weeks to monitor healing progress. Complete radiological reports have been forwarded to treating physicians for review and treatment planning."
    }
  },
  {
    name: "Genisis Brain Institute",
    details: {
      date: "March 25, 2024",
      provider: "Genisis Brain Institute",
      description: "Specialized neurological evaluation following head injury and persistent post-concussive symptoms. Comprehensive assessment included cognitive testing, balance assessment, and vestibular examination.",
      injuries: [
        "Post-concussive syndrome",
        "Cervicogenic headaches",
        "Vestibular dysfunction"
      ],
      recommendations: "Patient will begin an intensive neurological rehabilitation program incorporating cognitive therapy, vestibular rehabilitation, and specialized exercises. Treatment frequency is recommended at 2-3 times per week for 6-8 weeks.",
      additionalNotes: "Patient demonstrates significant symptoms consistent with post-concussive syndrome, including persistent headaches, dizziness, and cognitive fog. Prognosis is good with appropriate treatment adherence."
    }
  }
]
