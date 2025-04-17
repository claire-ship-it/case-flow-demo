"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Send, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface ChatProps {
  isOpen: boolean
  onClose: () => void
  clientName: string
}

export function Chat({ isOpen, onClose, clientName }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [conversationStep, setConversationStep] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Hardcoded responses for John Smith
  const getAIResponse = (questionIndex: number) => {
    switch(questionIndex) {
      case 0: // Injuries
        return `${clientName} sustained several injuries in the accident including cervical strain, post-traumatic headaches, and thoracic muscle strain. These injuries were documented in the initial medical assessment and are consistent with the type of collision that occurred.`;
      case 1: // Accident details
        return `The accident occurred on March 15, 2024, at approximately 10:30 AM at the intersection of Fletcher Avenue and Bruce B Downs Boulevard. ${clientName} was traveling eastbound on Fletcher Avenue with a green light when the defendant (Emily Parker) ran a red light and caused a T-bone collision. The defendant was cited for failing to stop at a red light and careless driving.`;
      case 2: // Medical providers
        return `${clientName} is currently being treated by three medical providers: Advent Health Surgery Center for orthopedic evaluation, Active Wellness & Rehabilitation Center for physical therapy (4 sessions completed so far), and Tampa Bay Imaging for diagnostic imaging including X-rays and MRI. The most recent treatment was a physical therapy session on March 27, 2024.`;
      default:
        return `I don't have specific information about that question. Would you like me to check with the case manager?`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)
    
    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(conversationStep),
        role: "assistant",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
      
      // Move to next conversation step
      setConversationStep(prev => Math.min(prev + 1, 2))
    }, 1000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-[#1E293B] rounded-lg shadow-xl flex flex-col overflow-hidden z-50">
      {/* Header */}
      <div className="bg-[#2E3B4E] p-4 flex items-center justify-between">
        <h3 className="text-white font-semibold">Chat with AI Assistant</h3>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex flex-col space-y-1",
              message.role === "user" ? "items-end" : "items-start"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-lg p-3",
                message.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-[#2E3B4E] text-gray-100"
              )}
            >
              {message.content}
            </div>
            <span className="text-xs text-gray-500">
              {message.timestamp.toLocaleTimeString()}
            </span>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center space-x-2 text-gray-400">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>AI is typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 bg-[#2E3B4E]">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-[#1E293B] border-gray-700 text-white placeholder-gray-400 focus:ring-blue-500"
          />
          <Button 
            type="submit" 
            disabled={!input.trim() || isTyping}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
