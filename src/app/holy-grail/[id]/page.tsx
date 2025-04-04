import { Sidebar } from "@/components/navigation"
import { Liability } from "@/components/holy-grail/liability"

interface PageProps {
  params: {
    id: string
  }
}

export default function HolyGrailPage({ params }: PageProps) {
  // Ensure params is properly awaited
  const { id } = params
  
  return (
    <div className="relative flex h-screen bg-[#0F172A]">
      {/* Sidebar - fixed */}
      <div className="fixed left-0 top-0 h-full w-64">
        <Sidebar />
      </div>

      {/* Main content - scrollable */}
      <div className="flex-1 ml-64">
        <div className="h-full overflow-auto bg-[#0F172A] text-white">
          <div className="p-5 min-h-full">
            {/* Main content will go here */}
            <div className="mb-4">
              <h1 className="text-2xl font-semibold text-white">Holy Grail</h1>
            </div>

            {/* Content sections */}
            <div className="grid grid-cols-1 gap-4">
              {/* Add your main content sections here */}
            </div>
          </div>
        </div>
      </div>

      {/* Liability sidebar */}
      <Liability />
    </div>
  )
}
