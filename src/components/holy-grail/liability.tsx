import { Card } from "@/components/ui/card"

interface LiabilityProps {
  // Add props as needed
}

export function Liability({}: LiabilityProps) {
  return (
    <Card className="fixed right-5 top-[184px] w-[403px] h-[635px] bg-[#1F2937] rounded-lg border-none shadow-lg">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Liability</h2>
        
        {/* Content sections will go here */}
        <div className="space-y-6">
          {/* Placeholder sections */}
          <div className="bg-[#374151] rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-200 mb-3">Section 1</h3>
            <div className="space-y-2">
              {/* Content will go here */}
            </div>
          </div>

          <div className="bg-[#374151] rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-200 mb-3">Section 2</h3>
            <div className="space-y-2">
              {/* Content will go here */}
            </div>
          </div>

          <div className="bg-[#374151] rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-200 mb-3">Section 3</h3>
            <div className="space-y-2">
              {/* Content will go here */}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
