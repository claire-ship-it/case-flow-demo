import { Sidebar } from "@/components/navigation"
import { Liability } from "@/components/holy-grail/liability"
import { Header } from "@/components/holy-grail/header"
import { Injuries } from "@/components/holy-grail/injuries"
import { MedicalBills } from "@/components/holy-grail/medical-bill"

interface PageProps {
  params: {
    id: string
  }
}

export default function HolyGrailPage({ params }: PageProps) {
  // Mock client data - in a real app, this would come from an API or database
  const clientData = {
    name: "Delmarie Walker",
    dateOfLoss: "3 / 15 / 2024",
    defenseAttorney: "Kenny Seyer",
    biLimit: "$1M / 2M",
    umLimit: "N/A"
  }

  const bills = [
    {
      provider: "Advent Health Hospital-Fletcher",
      originalBalance: 12500.00,
      reduction: 4375.00,
      finalBalance: 8125.00
    },
    {
      provider: "Advanced Wellness & Rehabilitation Center",
      originalBalance: 4800.00,
      reduction: 1200.00,
      finalBalance: 3600.00
    },
    {
      provider: "Tampa Bay Imaging",
      originalBalance: 3200.00,
      reduction: 960.00,
      finalBalance: 2240.00
    },
    {
      provider: "Genisis Brain Institute",
      originalBalance: 6500.00,
      reduction: 1950.00,
      finalBalance: 4550.00
    }
  ]

  const providers = [
    {
      name: "Advent Health Hospital-Fletcher",
      client: "Delmarie Walker",
      presuit: "Delmarie Walker",
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
      client: "Delmarie Walker",
      presuit: "Delmarie Walker",
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
      client: "Delmarie Walker",
      presuit: "Delmarie Walker",
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
      client: "Delmarie Walker",
      presuit: "Delmarie Walker",
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
  
  return (
    <div className="min-h-screen bg-[#0F172A] flex">
      {/* Sidebar */}
      <div className="w-64 fixed inset-y-0 left-0">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 ml-64">
        <div className="max-w-[1600px] mx-auto min-h-screen flex flex-col">
          {/* Header */}
          <div className="w-full">
            <Header client={clientData} />
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-auto">
            <div className="p-6 space-y-6">
              {/* Two-column layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#1E293B] rounded-lg overflow-hidden">
                  <Injuries providers={providers} />
                </div>
                <div className="bg-[#1E293B] rounded-lg overflow-hidden">
                  <Liability />
                </div>
              </div>

              {/* Medical Bills */}
              <div className="bg-[#1E293B] rounded-lg overflow-hidden">
                <MedicalBills bills={bills} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
