import { Card } from "@/components/ui/card";
import { Sidebar } from "@/components/navigation";
import {
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Flag,
  MoreHorizontal,
  Bell,
  AlertCircle,
  User,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

// Mock data for upcoming tasks
const upcomingTasks = [
  {
    id: "task-1",
    title: "Prepare deposition for Smith v. Johnson",
    dueDate: "Today",
    priority: "High",
    client: "Johnson, Michael",
    isOverdue: false
  },
  {
    id: "task-2",
    title: "Review medical records for Martinez case",
    dueDate: "Tomorrow",
    priority: "Medium",
    client: "Martinez, Sofia",
    isOverdue: false
  },
  {
    id: "task-3",
    title: "Submit settlement proposal for Williams case",
    dueDate: "Mar 15, 2025",
    priority: "High",
    client: "Williams, James",
    isOverdue: false
  },
  {
    id: "task-4",
    title: "Schedule client meeting with Thompson",
    dueDate: "Mar 16, 2025",
    priority: "Medium",
    client: "Thompson, Lisa",
    isOverdue: false
  },
  {
    id: "task-5",
    title: "Follow up on Garcia medical records",
    dueDate: "Mar 18, 2025",
    priority: "Low",
    client: "Garcia, Ana",
    isOverdue: true
  }
];

// Mock data for case milestones
const caseMilestones = [
  {
    id: "milestone-1",
    title: "Smith v. Johnson Mediation",
    date: "Mar 20, 2025",
    client: "Johnson, Michael",
    type: "Mediation",
    status: "Upcoming"
  },
  {
    id: "milestone-2",
    title: "Thompson Case Settlement Conference",
    date: "Mar 23, 2025",
    client: "Thompson, Lisa",
    type: "Settlement",
    status: "Upcoming"
  },
  {
    id: "milestone-3",
    title: "Williams Trial Date",
    date: "Apr 5, 2025",
    client: "Williams, James",
    type: "Trial",
    status: "Preparation"
  },
  {
    id: "milestone-4",
    title: "Martinez Medical Evaluation",
    date: "Apr 12, 2025",
    client: "Martinez, Sofia",
    type: "Medical",
    status: "Scheduled"
  },
  {
    id: "milestone-5",
    title: "Garcia Case Status Conference",
    date: "Apr 18, 2025",
    client: "Garcia, Ana",
    type: "Conference",
    status: "Upcoming"
  }
];

// Priority badge component
function PriorityBadge({ priority }: { priority: string }) {
  const getColorClass = () => {
    switch (priority) {
      case "High":
        return "bg-red-900/30 text-red-400";
      case "Medium":
        return "bg-orange-900/30 text-orange-400";
      case "Low":
        return "bg-blue-900/30 text-blue-400";
      default:
        return "bg-gray-900/30 text-gray-400";
    }
  };

  return (
    <span className={`text-xs py-0.5 px-2 rounded-full ${getColorClass()}`}>
      {priority}
    </span>
  );
}

// Status badge component
function StatusBadge({ status }: { status: string }) {
  const getColorClass = () => {
    switch (status) {
      case "Upcoming":
        return "bg-purple-900/30 text-purple-400";
      case "Preparation":
        return "bg-yellow-900/30 text-yellow-400";
      case "Scheduled":
        return "bg-green-900/30 text-green-400";
      default:
        return "bg-gray-900/30 text-gray-400";
    }
  };

  return (
    <span className={`text-xs py-0.5 px-2 rounded-full ${getColorClass()}`}>
      {status}
    </span>
  );
}

export default function HomePage() {
  // Get current date for greeting
  const now = new Date();
  const hours = now.getHours();
  let greeting = "Good morning";
  
  if (hours >= 12 && hours < 17) {
    greeting = "Good afternoon";
  } else if (hours >= 17) {
    greeting = "Good evening";
  }

  const formattedDate = now.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="relative w-full h-screen bg-[#212529] text-white overflow-auto">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="ml-[235px] p-6">
        {/* Header section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">{greeting}, Ryan</h1>
              <p className="text-gray-400">{formattedDate}</p>
            </div>
            
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <button className="p-2 bg-[#111827] rounded-lg border border-gray-800 hover:bg-gray-800 transition-colors">
                <Bell size={18} className="text-gray-400" />
              </button>
              <button className="p-2 bg-[#111827] rounded-lg border border-gray-800 hover:bg-gray-800 transition-colors">
                <AlertCircle size={18} className="text-gray-400" />
              </button>
              <button className="flex items-center gap-2 bg-[#3A3F5F] hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                <User size={16} />
                <span>New Client</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="bg-[#0F172A] border-gray-800 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-blue-900/30 p-3 rounded-lg">
                  <FileText size={24} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Active Cases</p>
                  <p className="text-xl font-bold text-white">28</p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-[#0F172A] border-gray-800 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-green-900/30 p-3 rounded-lg">
                  <CheckCircle2 size={24} className="text-green-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Tasks This Week</p>
                  <p className="text-xl font-bold text-white">12</p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-[#0F172A] border-gray-800 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-purple-900/30 p-3 rounded-lg">
                  <Calendar size={24} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Upcoming Deadlines</p>
                  <p className="text-xl font-bold text-white">7</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Main dashboard content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Tasks */}
          <Card className="bg-[#1F2937] border-gray-800 rounded-lg p-0 overflow-hidden">
            <div className="p-5 border-b border-gray-800 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white">Upcoming Tasks</h2>
                <p className="text-sm text-gray-400">Your prioritized task list</p>
              </div>
              <Link href="/tasks" className="text-blue-400 hover:text-blue-300 text-sm flex items-center">
                View all <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="p-1">
              {upcomingTasks.map((task) => (
                <div 
                  key={task.id} 
                  className="p-4 hover:bg-[#111827] border-b border-gray-800 last:border-0 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium mb-1 text-white">{task.title}</h3>
                      <div className="flex items-center text-sm text-gray-400">
                        <User size={14} className="mr-1" />
                        <span className="mr-3">{task.client}</span>
                        <Clock size={14} className="mr-1" />
                        <span className={task.isOverdue ? "text-red-400" : ""}>
                          {task.dueDate}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <PriorityBadge priority={task.priority} />
                      <button className="text-gray-500 hover:text-white">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          {/* Case Milestones */}
          <Card className="bg-[#1F2937] border-gray-800 rounded-lg p-0 overflow-hidden">
            <div className="p-5 border-b border-gray-800 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white">Case Milestones</h2>
                <p className="text-sm text-gray-400">Important upcoming dates</p>
              </div>
              <Link href="/milestones" className="text-blue-400 hover:text-blue-300 text-sm flex items-center">
                View calendar <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="p-1">
              {caseMilestones.map((milestone) => (
                <div 
                  key={milestone.id} 
                  className="p-4 hover:bg-[#111827] border-b border-gray-800 last:border-0 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium mb-1 text-white">{milestone.title}</h3>
                      <div className="flex items-center text-sm text-gray-400">
                        <User size={14} className="mr-1" />
                        <span className="mr-3">{milestone.client}</span>
                        <Calendar size={14} className="mr-1" />
                        <span>{milestone.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={milestone.status} />
                      <button className="text-gray-500 hover:text-white">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
