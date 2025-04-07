import { Card } from "@/components/ui/card"

interface LiabilityProps {
  liabilityStatement?: string
}

export function Liability({ liabilityStatement }: LiabilityProps) {
  // Format the liability statement with proper line breaks, avoiding breaks after "Mr."
  const formattedStatement = liabilityStatement?.split(/(?<=\. )(?!Mr\.)/).filter(Boolean) || []

  return (
    <div className="h-full">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M20 12V5.749C20 5.33647 19.6635 5 19.251 5H4.749C4.33647 5 4 5.33647 4 5.749V19.251C4 19.6635 4.33647 20 4.749 20H19.251C19.6635 20 20 19.6635 20 19.251V12ZM19.251 4C20.2165 4 21 4.7835 21 5.749V19.251C21 20.2165 20.2165 21 19.251 21H4.749C3.7835 21 3 20.2165 3 19.251V5.749C3 4.7835 3.7835 4 4.749 4H19.251Z"
              fill="currentColor"
            />
            <path
              d="M8 12H16V13H8V12ZM8 15H16V16H8V15ZM8 9H16V10H8V9Z"
              fill="currentColor"
            />
          </svg>
          <h2 className="text-xl font-semibold text-white">Liability Statement</h2>
        </div>
        
        <div className="space-y-6 text-gray-300">
          {formattedStatement.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed">
              {paragraph.trim()}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
