import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface PersonEmojiProps {
  gender: "male" | "female"
  fallback: string
  className?: string
}

export function PersonEmoji({ gender, fallback, className = "h-5 w-5 mr-3 border border-gray-300" }: PersonEmojiProps) {
  const emoji = gender === "male" ? "👨‍💼" : "👩‍💼"

  return (
    <Avatar className={className}>
      <AvatarFallback className="text-xs">{emoji}</AvatarFallback>
    </Avatar>
  )
}

