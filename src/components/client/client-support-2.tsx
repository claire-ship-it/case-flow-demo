"use client"

import React, { useEffect, useState, useMemo } from 'react'
import { Link, ChevronDown, Plus, FileText, Pencil, Clock, CheckCircle2, AlertCircle, Gavel, Folders, Code, Camera, Search, Filter, DollarSign, FileCheck, Building2, User, Mail, Phone, Calendar, Printer, Car, X, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Client, MedicalProvider } from "@/data/clients"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { BI_DEMAND_HTML_TEMPLATE } from './html/bi-demand-template'
import { CRN_HTML_TEMPLATE } from './html/crn-template'

// Define DocumentType based on usage, assuming at least id and title are strings
type ClientDocument = {
  id: any;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  type?: string;
  htmlContent?: string;
  [key: string]: any; // Allow other properties
};

// Helper function to filter documents
const filterDocumentsForClient = (
  docsToFilter: ClientDocument[],
  currentClientName: string | undefined
): ClientDocument[] => {
  if (currentClientName === "John Smith") {
    const crnRegex = /^civil remedy notice/i;
    const demandRegex = /demand/i; // Matches "demand" anywhere, case-insensitive
    return docsToFilter.filter(doc => {
      if (!doc || typeof doc.title !== 'string') {
        return true; // Keep malformed or untitled documents by default
      }
      return !(crnRegex.test(doc.title) || demandRegex.test(doc.title));
    });
  }
  return docsToFilter;
};

interface TreatmentVisit {
  id: number
  date: string
  type: string
  facility: {
    name: string
    department: string
    level?: string
    address: string
    phone: string
    fax: string
    email: string
  }
  physician: {
    name: string
    specialty: string
    credentials: string[]
  }
  treatmentAreas: {
    name: string
    color: "blue" | "purple" | "green" | "orange"
  }[]
  summary: string
  description: string
  cost: number
  paid: boolean
  documents: {
    type: "record" | "bill"
    name: string
    date: string
    link: string
  }[]
}

interface CPTCode {
  code: string
  description: string
  amount: number
}

interface BillingDetail {
  id: number
  date: string
  originalBalance: number
  insurancePayment: number
  insuranceAdjustment: number
  firmAdjustment: number
  outstandingBalance: number
  cptCodes: CPTCode[]
  documents: {
    type: "record" | "bill"
    name: string
    date: string
    link: string
  }[]
}

interface MedicalRecord {
  id: number
  date: string
  provider: string
  type: string
  description: string
  injuries: string[]
  recommendations: string
  additionalNotes?: string
  billing?: BillingDetail
  cptCodes?: CPTCode[]
}

// Define ClientTask interface based on usage
interface ClientTask {
  id: number;
  title: string;
  status: string;
  dueDate?: string | null;
  responsible: {
    name: string;
    role: string;
  };
}

interface ClientSupport2Props {
  client: Client
  activeTab: string
}

export function ClientSupport2({ client, activeTab }: ClientSupport2Props) {
  // --- LOG: Component Render Start ---
  console.log(`[ClientSupport2 Render] =====================================`);
  console.log(`[ClientSupport2 Render] Props: activeTab=${activeTab}, client.id=${client?.id}`);

  const [selectedProvider, setSelectedProvider] = useState<MedicalProvider | null>(null)
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null)
  const [selectedTask, setSelectedTask] = useState<number | null>(null)
  const [selectedLog, setSelectedLog] = useState<number | null>(null)
  const [selectedDocument, setSelectedDocument] = useState<number | null>(null)
  const [selectedVisit, setSelectedVisit] = useState<number | null>(null)
  const [selectedTreatmentTab, setSelectedTreatmentTab] = useState('plan')
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    quickLinks: true,
    billing: true,
    contact: true,
    medicalRecords: true,
    treatmentTimeline: true
  })
  const [documents, setDocuments] = useState<ClientDocument[]>(() => {
    const initialPropDocs = client?.documents || [];
    return filterDocumentsForClient(initialPropDocs, client?.name);
  })
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [viewingDocumentId, setViewingDocumentId] = useState<number | null>(null)
  const [completedDemoTaskIds, setCompletedDemoTaskIds] = useState<number[]>([])

  // --- LOG: State Variables on Render ---
  console.log(`[ClientSupport2 Render] State: documents.length=${documents.length}, viewingDocumentId=${viewingDocumentId}, isViewerOpen=${isViewerOpen}`);

  useEffect(() => {
    if (activeTab === 'medical-providers' && client.medicalProviders && client.medicalProviders.length > 0) {
      setSelectedProvider(client.medicalProviders[0]);
      if (client.medicalProviders[0].visits.length > 0) {
        setSelectedVisit(client.medicalProviders[0].visits[0].id);
      }
    }
  }, [activeTab, client.medicalProviders]);

  useEffect(() => {
    if (activeTab === 'medical-requests' && client.medicalRequests.length > 0 && selectedRequest === null) {
      setSelectedRequest(client.medicalRequests[0].id);
    }
  }, [activeTab, client.medicalRequests]);

  useEffect(() => {
    if (activeTab === 'tasks' && client.tasks.length > 0 && selectedTask === null) {
      setSelectedTask(client.tasks[0].id);
    }
  }, [activeTab, client.tasks]);

  useEffect(() => {
    if (activeTab === 'case-logs' && client.caseLogs.length > 0 && selectedLog === null) {
      setSelectedLog(client.caseLogs[0].id);
    }
  }, [activeTab, client.caseLogs]);

  useEffect(() => {
    if (activeTab === 'documents' && client.documents.length > 0 && selectedDocument === null) {
      const currentlyVisibleDocuments = documents; // Use the filtered state
      if (currentlyVisibleDocuments.length > 0) {
         setSelectedDocument(currentlyVisibleDocuments[0].id);
      } else {
         setSelectedDocument(null);
      }
    }
  }, [activeTab, client.documents, documents]); // Added 'documents' state as dependency

  useEffect(() => {
    // This effect handles:
    // 1. Initial load from localStorage, merging with prop-derived state, and filtering.
    // 2. Re-filtering and re-evaluation if the `client` prop changes.
    // 3. Periodically syncing with localStorage and filtering.

    // Initial load from localStorage
    const storedDocsRaw = localStorage.getItem('clientDocuments');
    if (storedDocsRaw) {
      try {
        const storedDocsFromLocalStorage: ClientDocument[] = JSON.parse(storedDocsRaw);
        if (Array.isArray(storedDocsFromLocalStorage)) {
          setDocuments(prevDocs => {
            // prevDocs is the current state, already filtered based on initial client.documents
            let updatedDocs = [...prevDocs];
            storedDocsFromLocalStorage.forEach(newDoc => {
              if (newDoc && typeof newDoc === 'object' && newDoc.id && !updatedDocs.some(doc => doc.id === newDoc.id)) {
                updatedDocs.unshift(newDoc); // Add new, unique docs from localStorage
              }
            });
            return filterDocumentsForClient(updatedDocs, client?.name); // Re-filter combined list
          });
        }
      } catch (error) {
        console.error("Error parsing documents from localStorage:", error);
        // Fallback: ensure current state is filtered according to the current client
        setDocuments(prevDocs => filterDocumentsForClient(prevDocs, client?.name));
      }
    } else {
      // No localStorage item, ensure current documents (from props originally) are filtered based on current client
      // This is important if client changes and this effect re-runs.
      setDocuments(filterDocumentsForClient(client?.documents || [], client?.name));
    }

    const interval = setInterval(() => {
      const refreshedDocsRaw = localStorage.getItem('clientDocuments');
      if (refreshedDocsRaw) {
         try {
            const refreshedDocsFromLocalStorage: ClientDocument[] = JSON.parse(refreshedDocsRaw);
            if (Array.isArray(refreshedDocsFromLocalStorage)) {
              setDocuments(prevDocs => {
                let updatedDocs = [...prevDocs];
                refreshedDocsFromLocalStorage.forEach(newDoc => {
                  if (newDoc && typeof newDoc === 'object' && newDoc.id && !updatedDocs.some(doc => doc.id === newDoc.id)) {
                    updatedDocs.unshift(newDoc);
                  }
                });
                return filterDocumentsForClient(updatedDocs, client?.name); // Re-filter after interval update
              });
            }
         } catch (error) {
            console.error("Error parsing refreshed documents from localStorage:", error);
         }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [client]); // Depend on client to re-run when client changes

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const navigateVisit = (direction: 'prev' | 'next') => {
    if (!selectedProvider) return;
    const providerVisits = selectedProvider.visits;
    const currentIndex = providerVisits.findIndex(v => v.id === selectedVisit);
    if (currentIndex === -1) return;

    let nextIndex;
    if (direction === 'prev') {
      nextIndex = Math.max(0, currentIndex - 1);
    } else {
      nextIndex = Math.min(providerVisits.length - 1, currentIndex + 1);
    }
    setSelectedVisit(providerVisits[nextIndex].id);
  };

  const handleViewProvider = (providerId: number) => {
    const provider = client.medicalProviders.find(p => p.id === providerId);
    if (provider) {
      setSelectedProvider(provider);
      if (provider.visits.length > 0) {
        setSelectedVisit(provider.visits[0].id);
      } else {
        setSelectedVisit(null);
      }
    }
  };

  const handleViewDocument = (docId: number) => {
    // --- LOG: handleViewDocument Called ---
    console.log(`[handleViewDocument] Click detected for docId: ${docId}`);
    console.log(`[handleViewDocument] Setting viewingDocumentId to: ${docId} and isViewerOpen to true`);
    setViewingDocumentId(docId);
    setIsViewerOpen(true);
  };

  const closeViewer = () => {
    // --- LOG: closeViewer Called ---
    console.log(`[closeViewer] Setting viewingDocumentId to null and isViewerOpen to false`);
    setIsViewerOpen(false);
    setViewingDocumentId(null);
  };

  if (!client) {
    console.error("[ClientSupport2 Render] CRITICAL: Client prop is null or undefined!");
    return <div className="p-6 text-center text-gray-500">No client data available</div>;
  }

  // --- LOG: Document Finding Logic ---
  console.log(`[ClientSupport2 Render] Attempting to find document with ID: ${viewingDocumentId}`);
  const viewingDocument = documents.find(d => d.id === viewingDocumentId);
  console.log(`[ClientSupport2 Render] Result of documents.find():`, viewingDocument ? { id: viewingDocument.id, title: viewingDocument.title } : 'Not Found');

  let documentHtml = "";
  let selectedTemplateName = "None";

  if (viewingDocument) {
    console.log(`[ClientSupport2 Render] Processing viewingDocument: ID=${viewingDocument.id}, Title='${viewingDocument.title}', Type='${viewingDocument.type}'`);
    // const titleLower = viewingDocument.title.toLowerCase(); // Keep if used elsewhere, or remove
    // console.log(`[ClientSupport2 Render] Title converted to lowercase: '${titleLower}'`);

    let isCRN = false;
    if (viewingDocument.type === "CRN") {
      isCRN = true;
      console.log("[ClientSupport2 Render] Document type is CRN. Setting isCRN to true.");
    } else {
      // Fallback to title check if type is not explicitly CRN
      const isCRNRegex = /^civil remedy notice/i;
      isCRN = isCRNRegex.test(viewingDocument.title);
      console.log(`[ClientSupport2 Render] Document type is NOT CRN. Regex test /^civil remedy notice/i on title ('${viewingDocument.title}') resulted in: ${isCRN}`);
    }

    const baseHtml = isCRN
      ? CRN_HTML_TEMPLATE
      : BI_DEMAND_HTML_TEMPLATE;

    selectedTemplateName = isCRN ? "CRN_HTML_TEMPLATE" : "BI_DEMAND_HTML_TEMPLATE";
    console.log(`[ClientSupport2 Render] Selected template variable: ${selectedTemplateName}`);
    // console.log(`[ClientSupport2 Render] Raw template snippet: ${baseHtml.substring(0, 150)}...`); // Keep if needed

    // Check if the viewingDocument itself has pre-rendered htmlContent
    // This is important because LitDetails.tsx now puts fully formed CRN HTML into htmlContent
    if (viewingDocument.type === "CRN" && viewingDocument.htmlContent) {
        console.log("[ClientSupport2 Render] Using pre-rendered htmlContent from viewingDocument for CRN.");
        documentHtml = viewingDocument.htmlContent;
    } else {
        console.log("[ClientSupport2 Render] Applying template replacements for document type:", viewingDocument.type);
        documentHtml = baseHtml
          .replace(/{CLIENT_NAME_PLACEHOLDER}/g, client?.name || 'N/A')
          .replace(/{DOCUMENT_TITLE_PLACEHOLDER}/g, viewingDocument.title);
    }
    // console.log(`[ClientSupport2 Render] Final documentHtml snippet: ${documentHtml.substring(0, 150)}...`); // Keep if needed

  } else if (isViewerOpen) {
    console.warn(`[ClientSupport2 Render] Viewer is open (isViewerOpen=true), but no viewingDocument found for ID: ${viewingDocumentId}. Check documents array.`);
    console.log('[ClientSupport2 Render] Current documents state:', documents);
  }

  // --- LOG: Dialog Rendering Check ---
  console.log(`[ClientSupport2 Render] Dialog render check: isViewerOpen=${isViewerOpen}, viewingDocument found=${!!viewingDocument}`);
  console.log(`[ClientSupport2 Render] ===================================== END`);

  // Prepare tasks for display, potentially modifying them for John Smith
  const tasksToDisplayForTab: ClientTask[] = useMemo(() => {
    console.log("[useMemo tasksToDisplayForTab] Recalculating tasks. Client:", client?.name, "Completed IDs:", completedDemoTaskIds);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    if (client?.name === "John Smith") {
      const allJohnSmithDemoTasks: ClientTask[] = [
        { id: 1001, title: "Policy Limits", dueDate: "05/02/2025", status: "pending", responsible: client.tasks[0]?.responsible || { name: "System", role: "Automation" } },
        { id: 1002, title: "Medical Records", dueDate: "05/06/2025", status: "pending", responsible: client.tasks[0]?.responsible || { name: "System", role: "Automation" } },
        { id: 1003, title: "Prepare BI Demand Document", dueDate: "05/09/2025", status: "pending", responsible: client.tasks[0]?.responsible || { name: "System", role: "Automation" } },
        { id: 1004, title: "Attorney Call #2", dueDate: "05/13/2025", status: "pending", responsible: client.tasks[0]?.responsible || { name: "System", role: "Automation" } },
        { id: 1005, title: "PIP Protocol Start", dueDate: "05/18/2025", status: "pending", responsible: client.tasks[0]?.responsible || { name: "System", role: "Automation" } }
      ].map(task => ({ 
        ...task,
        status: completedDemoTaskIds.includes(task.id) ? "completed" : task.status
      }));
      
      const upcomingJohnSmithTasks = allJohnSmithDemoTasks.filter(task => {
        if (!task.dueDate) return true; 
        const taskDueDate = new Date(task.dueDate);
        taskDueDate.setHours(0,0,0,0);
        return task.status === "completed" || taskDueDate >= today;
      });

      console.log("[useMemo tasksToDisplayForTab] John Smith - Constructed UPCOMING/COMPLETED demo tasks:", upcomingJohnSmithTasks.map(t => ({id: t.id, title: t.title, status: t.status, dueDate: t.dueDate })));
      
      return upcomingJohnSmithTasks.sort((a, b) => {
        const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
        if (dateA !== dateB) return dateA - dateB;
        return a.title.localeCompare(b.title);
      });
    }
    
    const otherClientTasks = (client.tasks || []) as ClientTask[];
    const upcomingOtherClientTasks = otherClientTasks.filter(task => {
        if (!task.dueDate) return true; 
        const taskDueDate = new Date(task.dueDate);
        taskDueDate.setHours(0,0,0,0);
        return taskDueDate >= today;
    });
    console.log("[useMemo tasksToDisplayForTab] Other client - Filtered UPCOMING tasks:", upcomingOtherClientTasks.map(t => ({id: t.id, title: t.title, dueDate: t.dueDate })));
    return upcomingOtherClientTasks.sort((a, b) => {
        const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
        if (dateA !== dateB) return dateA - dateB;
        return a.title.localeCompare(b.title);
    });
  }, [client, completedDemoTaskIds]); // Added completedDemoTaskIds to dependencies

  useEffect(() => {
    if (activeTab === 'tasks') {
      console.log("[Tasks Tab Active] Client:", client?.name, "Current selectedTask ID before update:", selectedTask);
      console.log("[Tasks Tab Active] tasksToDisplayForTab (upcoming only):", tasksToDisplayForTab.map(t => ({id: t.id, title: t.title, dueDate: t.dueDate })));

      let taskToSelectById: number | null = null;

      if (client?.name === "John Smith") {
        // Try to select BI Demand if it's in the upcoming list
        const biDemandTask = tasksToDisplayForTab.find(task => task.title === "Prepare BI Demand Document");
        if (biDemandTask) {
          taskToSelectById = biDemandTask.id;
          console.log("[Tasks Tab Active] John Smith - BI Demand is UPCOMING. Candidate ID:", taskToSelectById);
        } else if (tasksToDisplayForTab.length > 0) {
          // If BI Demand is past (not in list), select the first (most upcoming) task
          taskToSelectById = tasksToDisplayForTab[0].id;
          console.log("[Tasks Tab Active] John Smith - BI Demand is PAST or not found. Fallback to MOST UPCOMING task ID:", taskToSelectById);
        }
      } else {
        // Logic for clients other than John Smith: select first upcoming task
        if (tasksToDisplayForTab.length > 0 ) {
          taskToSelectById = tasksToDisplayForTab[0].id;
          console.log("[Tasks Tab Active] Other client - Candidate for selectedTask (first upcoming):", taskToSelectById);
        }
      }

      // Apply selection if a candidate is chosen and is different, or if current selection is invalid
      if (taskToSelectById !== null && selectedTask !== taskToSelectById) {
         console.log("[Tasks Tab Active] Setting selected task. From:", selectedTask, "To:", taskToSelectById);
         setSelectedTask(taskToSelectById);
      } else if (selectedTask === null && taskToSelectById !== null){
         console.log("[Tasks Tab Active] Setting selected task (was null). To:", taskToSelectById);
         setSelectedTask(taskToSelectById);
      } else if (selectedTask !== null && !tasksToDisplayForTab.find(t => t.id === selectedTask)) {
        // Current selection is invalid (not in the new upcoming list)
        if (taskToSelectById !== null) {
            console.log("[Tasks Tab Active] Current selectedTask ID:", selectedTask, "is invalid. Resetting to new candidate:", taskToSelectById);
            setSelectedTask(taskToSelectById); // Reset to new candidate
        } else {
            console.log("[Tasks Tab Active] Current selectedTask ID:", selectedTask, "is invalid. No new candidate. Setting to null.");
            setSelectedTask(null); // Or select first if tasksToDisplayForTab has items
        }
      } else if (tasksToDisplayForTab.length === 0 && selectedTask !== null) {
        console.log("[Tasks Tab Active] No upcoming tasks to display, clearing selectedTask.");
        setSelectedTask(null);
      }
    } 
  }, [activeTab, tasksToDisplayForTab, client?.name]); // Removed selectedTask from deps to avoid re-triggering on its own change, relying on tasksToDisplayForTab for reset

  useEffect(() => {
    if (activeTab === 'tasks') {
      // ... (existing console logs and logic for selecting initial task)
      // This effect will re-run if tasksToDisplayForTab changes (e.g. a task is completed)
      // and will re-evaluate the selected task, which is fine.
    } else {
      // If we navigate away from the tasks tab, reset completed demo tasks for John Smith
      if (client?.name === "John Smith" && completedDemoTaskIds.length > 0) {
        console.log("[Tasks Tab Inactive] Resetting completed demo tasks for John Smith.");
        setCompletedDemoTaskIds([]);
      }
    }
  }, [activeTab, tasksToDisplayForTab, client?.name]);
  
  // Effect to reset completed tasks if client changes while on tasks tab
  useEffect(() => {
    if (activeTab === 'tasks' && completedDemoTaskIds.length > 0) {
        console.log("[Client Changed on Tasks Tab] Resetting completed demo tasks.");
        setCompletedDemoTaskIds([]);
    }
  }, [client, activeTab]); // Listen to client changes specifically for this reset

  const handleMarkTaskComplete = () => {
    console.log("[Mark as Complete Clicked] Attempting to mark task complete.");
    console.log("[Mark as Complete Clicked] Client Name:", client?.name);
    console.log("[Mark as Complete Clicked] Selected Task ID:", selectedTask);

    if (client?.name === "John Smith" && selectedTask !== null) {
      if (!completedDemoTaskIds.includes(selectedTask)) {
        console.log("[Mark as Complete Clicked] John Smith - Adding task ID to completedDemoTaskIds:", selectedTask);
        setCompletedDemoTaskIds(prevIds => [...prevIds, selectedTask as number]);
      }
      
      // Logic to select next task (remains the same)
      const currentIndex = tasksToDisplayForTab.findIndex(task => task.id === selectedTask);
      console.log("[Mark as Complete Clicked] John Smith - Current Index:", currentIndex);
      if (currentIndex !== -1 && currentIndex < tasksToDisplayForTab.length - 1) {
        const nextTaskId = tasksToDisplayForTab[currentIndex + 1].id;
        console.log("[Mark as Complete Clicked] John Smith - Advancing to next task ID:", nextTaskId);
        setSelectedTask(nextTaskId);
      } else {
        console.log("[Mark as Complete Clicked] John Smith - Last task or task not found in sequence. Current index:", currentIndex);
        // Optionally: if it's the last task, clear selection or select the first one again if it's still upcoming
        if (tasksToDisplayForTab.length > 0 && tasksToDisplayForTab[0].id !== selectedTask) {
            // setSelectedTask(tasksToDisplayForTab[0].id); 
        } else if (tasksToDisplayForTab.length === 0) {
            // setSelectedTask(null);
        }
      }
    } else {
      console.log("[Mark as Complete Clicked] Conditions not met for John Smith logic (or not John Smith). Client:", client?.name, "Selected Task ID:", selectedTask);
    }
  };

  return (
    <div className="bg-[#1E293B] rounded-lg">
      <div className="flex border-b border-[#374151]">
        {['overview', 'medical-providers', 'medical-requests', 'tasks', 'case-logs', 'documents'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === tab
                ? 'text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === 'overview' && (
          <div>Overview Content Placeholder</div>
        )}

        {activeTab === 'medical-providers' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 bg-[#151F2D] rounded-lg p-4 space-y-3 overflow-y-auto max-h-[70vh]">
              <h2 className="text-lg font-semibold text-white mb-3">Medical Providers</h2>
              {client.medicalProviders.map((provider) => (
                <div
                  key={provider.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedProvider?.id === provider.id ? 'bg-[#2D3B4E]' : 'hover:bg-[#253041]'
                  }`}
                  onClick={() => handleViewProvider(provider.id)}
                >
                  <h3 className="text-sm font-medium text-white">{provider.name}</h3>
                  <p className="text-xs text-gray-400">{provider.type}</p>
                </div>
              ))}
            </div>

            {selectedProvider && (
              <div className="md:col-span-2 space-y-6">
                <div className="bg-[#151F2D] rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-white">{selectedProvider.name}</h2>
                      <p className="text-sm text-gray-400">{selectedProvider.type}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" className="text-xs">Edit Provider</Button>
                      <Button variant="destructive" size="sm" className="text-xs">Delete</Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex justify-between items-center mb-2 cursor-pointer" onClick={() => toggleSection('quickLinks')}>
                        <h3 className="text-base font-medium text-white">Quick Links</h3>
                        <ChevronDown size={18} className={`transition-transform ${expandedSections.quickLinks ? 'rotate-180' : ''}`} />
                      </div>
                      {expandedSections.quickLinks && (
                        <div className="space-y-2 text-sm">
                          <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 w-full text-left">
                            <FileText size={14} /> Review Latest Medical Record
                          </button>
                          <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 w-full text-left">
                            <DollarSign size={14} /> View Latest Bill
                          </button>
                          <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 w-full text-left">
                            <Plus size={14} /> Add New Visit/Record
                          </button>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2 cursor-pointer" onClick={() => toggleSection('billing')}>
                        <h3 className="text-base font-medium text-white">Billing Summary</h3>
                        <ChevronDown size={18} className={`transition-transform ${expandedSections.billing ? 'rotate-180' : ''}`} />
                      </div>
                      {expandedSections.billing && (
                        <div className="space-y-1 text-sm text-gray-300">
                          <div className="flex justify-between"><span>Total Billed:</span> <span>${selectedProvider.billingInfo.totalBilled.toFixed(2)}</span></div>
                          <div className="flex justify-between"><span>Total Paid:</span> <span>${selectedProvider.billingInfo.totalPaid.toFixed(2)}</span></div>
                          <div className="flex justify-between font-semibold text-white"><span>Outstanding:</span> <span>${selectedProvider.billingInfo.outstandingBalance.toFixed(2)}</span></div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2 cursor-pointer" onClick={() => toggleSection('contact')}>
                      <h3 className="text-base font-medium text-white">Contact Information</h3>
                      <ChevronDown size={18} className={`transition-transform ${expandedSections.contact ? 'rotate-180' : ''}`} />
                    </div>
                    {expandedSections.contact && (
                      <div className="space-y-2 text-sm text-gray-300">
                        <p><Building2 size={14} className="inline mr-2" /> {selectedProvider.address}</p>
                        <p><Phone size={14} className="inline mr-2" /> {selectedProvider.phone}</p>
                        <p><Printer size={14} className="inline mr-2" /> {selectedProvider.fax}</p>
                      </div>
                    )}
                  </div>
                </div>

                {selectedVisit !== null && client.medicalProviders.find(p => p.id === selectedProvider.id)?.visits.find(v => v.id === selectedVisit) ? (
                   <div className="bg-[#151F2D] rounded-lg p-6">
                     <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => toggleSection('treatmentTimeline')}>
                       <h2 className="text-lg font-semibold text-white">Treatment Timeline & Details</h2>
                       <ChevronDown size={20} className={`transition-transform ${expandedSections.treatmentTimeline ? 'rotate-180' : ''}`} />
                     </div>
                     {expandedSections.treatmentTimeline && (() => {
                        const currentProvider = client.medicalProviders.find(p => p.id === selectedProvider.id);
                        const providerVisits = currentProvider?.visits || [];
                        const currentIndex = providerVisits.findIndex(v => v.id === selectedVisit);
                        const currentVisit = providerVisits[currentIndex];

                        if (!currentVisit) return <p className="text-gray-400">No visit selected or found.</p>;

                        return (
                          <div className="space-y-6">
                            <div className="flex items-center justify-between mb-6">
                              <button
                                onClick={() => navigateVisit('prev')}
                                className={`p-2 rounded-full ${
                                  currentIndex > 0
                                    ? 'text-blue-400 hover:bg-blue-400/10'
                                    : 'text-gray-600 cursor-not-allowed'
                                }`}
                                disabled={currentIndex === 0}
                              >
                                <ChevronDown className="w-5 h-5 transform rotate-90" />
                              </button>
                              <div className="text-center">
                                <p className="text-sm text-gray-400">Visit {currentIndex + 1} of {providerVisits.length}</p>
                                <p className="text-base font-medium text-white">{currentVisit.date}</p>
                                <p className="text-sm text-gray-300">{currentVisit.type}</p>
                              </div>
                              <button
                                onClick={() => navigateVisit('next')}
                                className={`p-2 rounded-full ${
                                  currentIndex < providerVisits.length - 1
                                    ? 'text-blue-400 hover:bg-blue-400/10'
                                    : 'text-gray-600 cursor-not-allowed'
                                }`}
                                disabled={currentIndex === providerVisits.length - 1}
                              >
                                <ChevronDown className="w-5 h-5 transform -rotate-90" />
                              </button>
                            </div>

                            <div className="flex border-b border-gray-700 mb-4">
                              <button
                                className={`px-4 py-2 text-sm font-medium ${
                                  selectedTreatmentTab === 'plan'
                                    ? 'text-white border-b-2 border-blue-500'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                                onClick={() => setSelectedTreatmentTab('plan')}
                              >
                                Plan
                              </button>
                              <button
                                className={`px-4 py-2 text-sm font-medium ${
                                  selectedTreatmentTab === 'summary'
                                    ? 'text-white border-b-2 border-blue-500'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                                onClick={() => setSelectedTreatmentTab('summary')}
                              >
                                Summary
                              </button>
                              <button
                                className={`px-4 py-2 text-sm font-medium ${
                                  selectedTreatmentTab === 'codes'
                                    ? 'text-white border-b-2 border-blue-500'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                                onClick={() => setSelectedTreatmentTab('codes')}
                              >
                                Codes
                              </button>
                              <button
                                className={`px-4 py-2 text-sm font-medium ${
                                  selectedTreatmentTab === 'facility'
                                    ? 'text-white border-b-2 border-blue-500'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                                onClick={() => setSelectedTreatmentTab('facility')}
                              >
                                Facility
                              </button>
                            </div>

                            {(() => {
                              switch (selectedTreatmentTab) {
                                case 'plan':
                                  return (
                                    <div className="space-y-4 text-sm text-gray-300">
                                      <h3 className="text-base font-medium text-white mb-2">Treatment Plan</h3>
                                      <div className="bg-[#1F2937] p-3 rounded">Cervical Strain: Manual therapy, exercises.</div>
                                      <div className="bg-[#1F2937] p-3 rounded">Headaches: Mobilization, postural education.</div>
                                    </div>
                                  );
                                case 'summary':
                                   return (
                                    <div className="space-y-4 text-sm text-gray-300">
                                      <h3 className="text-base font-medium text-white mb-2">Visit Summary</h3>
                                      <p className="leading-relaxed">{currentVisit.summary || "No summary available for this visit."}</p>
                                      {currentVisit.description && <p className="mt-2 leading-relaxed">Details: {currentVisit.description}</p>}
                                      {currentVisit.notes && <p className="mt-2 italic">Notes: {currentVisit.notes}</p>}
                                    </div>
                                  );
                                case 'codes':
                                  return (
                                    <div className="space-y-4">
                                      <h3 className="text-base font-medium text-white mb-3">CPT Codes</h3>
                                      {currentVisit.cptCodes && currentVisit.cptCodes.length > 0 ? (
                                        <>
                                          <div className="grid grid-cols-3 gap-4 text-xs text-gray-400 mb-2 px-2">
                                            <span>Code</span>
                                            <span>Description</span>
                                            <span className="text-right">Amount</span>
                                          </div>
                                          <div className="space-y-1">
                                            {currentVisit.cptCodes.map((code, index) => (
                                              <div key={index} className="grid grid-cols-3 gap-4 items-center py-1 px-2 rounded bg-[#1F2937] text-sm">
                                                <span className="text-gray-300 font-mono">{code.code}</span>
                                                <span className="text-gray-300">{code.description}</span>
                                                <span className="text-gray-300 text-right">${code.amount.toFixed(2)}</span>
                                              </div>
                                            ))}
                                          </div>
                                        </>
                                      ) : (
                                        <p className="text-gray-400 text-sm">No CPT codes recorded for this visit.</p>
                                      )}
                                    </div>
                                  );
                                case 'facility':
                                  return (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                      <div>
                                        <h3 className="text-base font-medium text-white mb-2">Facility Details</h3>
                                        <div className="flex items-center gap-3 mb-3">
                                          <div className="h-10 w-10 bg-[#374151] rounded-full flex items-center justify-center text-xl">
                                            {currentVisit.facility.name.includes("Hospital") ? '🏥' : '🏢'}
                                          </div>
                                          <div>
                                            <span className="text-white font-medium">{currentVisit.facility.name}</span>
                                            <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                                              <span>{currentVisit.facility.department}</span>
                                              {currentVisit.facility.level && (
                                                <>
                                                  <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                                                  <span>{currentVisit.facility.level}</span>
                                                </>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="space-y-1 text-gray-300">
                                          <p><Building2 size={14} className="inline mr-2" /> {currentVisit.facility.address}</p>
                                          <p><Phone size={14} className="inline mr-2" /> {currentVisit.facility.phone}</p>
                                          <p><Printer size={14} className="inline mr-2" /> {currentVisit.facility.fax}</p>
                                          <p><Mail size={14} className="inline mr-2" /> {currentVisit.facility.email}</p>
                                        </div>
                                      </div>
                                      <div>
                                        <h3 className="text-base font-medium text-white mb-2">Physician</h3>
                                         <div className="flex items-center gap-3 mb-3">
                                           <Avatar className="h-10 w-10">
                                             <div className="bg-blue-500 rounded-full h-full w-full flex items-center justify-center text-white font-semibold">
                                                {currentVisit.physician.name.split(' ').map(n => n[0]).join('')}
                                             </div>
                                           </Avatar>
                                           <div>
                                             <p className="text-white font-medium">{currentVisit.physician.name}</p>
                                             <p className="text-xs text-gray-400">{currentVisit.physician.specialty}</p>
                                             <p className="text-xs text-gray-400">{currentVisit.physician.credentials.join(', ')}</p>
                                           </div>
                                         </div>
                                        <h3 className="text-base font-medium text-white mb-2 mt-4">Treatment Areas</h3>
                                        <div className="flex flex-wrap gap-2">
                                          {currentVisit.treatmentAreas.map((area, index) => (
                                            <span key={index} className={`px-2 py-0.5 rounded text-xs bg-${area.color}-500/20 text-${area.color}-400`}>
                                              {area.name}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                default: return null;
                              }
                            })()}
                          </div>
                        );
                     })()}
                   </div>
                ) : (
                  <div className="bg-[#151F2D] rounded-lg p-6 text-center text-gray-400">
                    {selectedProvider?.visits.length === 0 ? "No visits recorded for this provider." : "Select a visit to see details."}
                  </div>
                )}
              </div>
            )}
            {!selectedProvider && (
              <div className="md:col-span-2 bg-[#151F2D] rounded-lg p-6 flex items-center justify-center text-gray-500 h-[70vh]">
                Select a provider from the list to view details.
              </div>
            )}
          </div>
        )}

        {activeTab === 'medical-requests' && (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="md:col-span-1 bg-[#151F2D] rounded-lg p-4 space-y-3 overflow-y-auto max-h-[70vh]">
               <div className="flex justify-between items-center mb-3">
                 <h2 className="text-lg font-semibold text-white">Medical Requests</h2>
                 <Button size="sm" className="text-xs"><Plus size={14} className="mr-1" /> New Request</Button>
               </div>
              {client.medicalRequests.map((request) => (
                <div
                  key={request.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedRequest === request.id ? 'bg-[#2D3B4E]' : 'hover:bg-[#253041]'
                  }`}
                  onClick={() => setSelectedRequest(request.id)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-white">{request.type}</h3>
                     <span className={`text-xs px-2 py-0.5 rounded-full ${
                       request.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                       request.status === 'received' ? 'bg-green-500/20 text-green-400' :
                       'bg-gray-500/20 text-gray-400'
                     }`}>{request.status}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{request.provider}</p>
                  <p className="text-xs text-gray-400">Requested: {request.requestedDate}</p>
                </div>
              ))}
             </div>

             <div className="md:col-span-2 bg-[#151F2D] rounded-lg p-6">
               {selectedRequest !== null ? (() => {
                 const request = client.medicalRequests.find(r => r.id === selectedRequest);
                 if (!request) return <p className="text-gray-500">Select a request to view details.</p>;
                 return (
                   <div className="space-y-4">
                     <div className="flex justify-between items-start">
                       <div>
                         <h2 className="text-xl font-semibold text-white">{request.type}</h2>
                         <p className="text-sm text-gray-400">To: {request.provider}</p>
                       </div>
                       <span className={`text-sm px-3 py-1 rounded-full ${
                         request.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                         request.status === 'received' ? 'bg-green-500/20 text-green-400' :
                         'bg-gray-500/20 text-gray-400'
                       }`}>{request.status}</span>
                     </div>
                     <div className="text-sm text-gray-300 space-y-1">
                       <p><strong>Requested By:</strong> {request.requestedBy}</p>
                       <p><strong>Requested Date:</strong> {request.requestedDate}</p>
                     </div>
                     <div>
                       <h3 className="text-base font-medium text-white mb-1">Notes</h3>
                       <p className="text-sm text-gray-300 bg-[#1F2937] p-3 rounded">{request.notes || "No notes for this request."}</p>
                     </div>
                     <div className="flex gap-2 pt-4">
                       <Button variant="secondary" size="sm" className="text-xs">Edit Request</Button>
                       <Button size="sm" className="text-xs">Mark as Received</Button>
                     </div>
                   </div>
                 );
               })() : (
                 <div className="flex items-center justify-center h-full text-gray-500">
                   Select a request from the list to view details.
                 </div>
               )}
             </div>
           </div>
        )}

        {activeTab === 'tasks' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 bg-[#151F2D] rounded-lg p-4 space-y-3 overflow-y-auto max-h-[70vh]">
              <div className="flex justify-between items-center mb-3">
                 <h2 className="text-lg font-semibold text-white">Tasks</h2>
                 <Button size="sm" className="text-xs"><Plus size={14} className="mr-1" /> New Task</Button>
               </div>
              {tasksToDisplayForTab.map((task: ClientTask) => (
                <div
                  key={task.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedTask === task.id ? 'bg-[#2D3B4E]' : 'hover:bg-[#253041]'
                  }`}
                  onClick={() => setSelectedTask(task.id)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-white">{task.title}</h3>
                     <span className={`text-xs px-2 py-0.5 rounded-full ${
                       task.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                       task.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                       'bg-gray-500/20 text-gray-400'
                     }`}>{task.status}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Due: {task.dueDate || 'No due date'}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="h-5 w-5">
                       <div className="bg-purple-500 rounded-full h-full w-full flex items-center justify-center text-white text-xs">
                         {task.responsible.name.split(' ').map((n: string) => n[0]).join('')}
                       </div>
                    </Avatar>
                    <span className="text-xs text-gray-400">{task.responsible.name}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="md:col-span-2 bg-[#151F2D] rounded-lg p-6">
               {selectedTask !== null ? (() => {
                 const task = tasksToDisplayForTab.find((t: ClientTask) => t.id === selectedTask);
                 if (!task) return <p className="text-gray-500">Select a task to view details.</p>;
                 return (
                   <div className="space-y-4">
                     <div className="flex justify-between items-start">
                       <h2 className="text-xl font-semibold text-white">{task.title}</h2>
                       <span className={`text-sm px-3 py-1 rounded-full ${
                          task.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          task.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>{task.status}</span>
                     </div>
                     <div className="text-sm text-gray-300 space-y-1">
                       <p><strong>Due Date:</strong> {task.dueDate || 'Not set'}</p>
                       <div className="flex items-center gap-2">
                         <strong>Responsible:</strong>
                         <Avatar className="h-6 w-6">
                            <div className="bg-purple-500 rounded-full h-full w-full flex items-center justify-center text-white text-sm">
                              {task.responsible.name.split(' ').map((n: string) => n[0]).join('')}
                            </div>
                         </Avatar>
                         <span>{task.responsible.name} ({task.responsible.role})</span>
                       </div>
                     </div>
                      <div className="flex flex-row items-center gap-2 pt-4">
                        <Button variant="secondary" size="sm" className="text-xs">Edit Task</Button>
                        <Button size="sm" className="text-xs" onClick={handleMarkTaskComplete}>Mark as Complete</Button>
                      </div>
                   </div>
                 );
               })() : (
                 <div className="flex items-center justify-center h-full text-gray-500">
                   Select a task from the list to view details.
                 </div>
               )}
             </div>
          </div>
        )}

        {activeTab === 'case-logs' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="md:col-span-1 bg-[#151F2D] rounded-lg p-4 space-y-3 overflow-y-auto max-h-[70vh]">
               <div className="flex justify-between items-center mb-3">
                 <h2 className="text-lg font-semibold text-white">Case Logs</h2>
                 <Button size="sm" className="text-xs"><Plus size={14} className="mr-1" /> New Log</Button>
               </div>
              {client.caseLogs.map((log) => (
                <div
                  key={log.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedLog === log.id ? 'bg-[#2D3B4E]' : 'hover:bg-[#253041]'
                  }`}
                  onClick={() => setSelectedLog(log.id)}
                >
                  <h3 className="text-sm font-medium text-white">{log.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">{log.date} - {log.type}</p>
                </div>
              ))}
             </div>

             <div className="md:col-span-2 bg-[#151F2D] rounded-lg p-6">
               {selectedLog !== null ? (() => {
                 const log = client.caseLogs.find(l => l.id === selectedLog);
                 if (!log) return <p className="text-gray-500">Select a log entry to view details.</p>;
                 return (
                   <div className="space-y-4">
                     <h2 className="text-xl font-semibold text-white">{log.title}</h2>
                     <div className="text-sm text-gray-400">
                       <span>{log.date}</span> | <span className="capitalize">{log.type}</span>
                     </div>
                     <div>
                       <h3 className="text-base font-medium text-white mb-1">Notes</h3>
                       <p className="text-sm text-gray-300 bg-[#1F2937] p-3 rounded">{log.notes || "No notes for this log entry."}</p>
                     </div>
                     {log.document && (
                       <div>
                         <h3 className="text-base font-medium text-white mb-1">Associated Document</h3>
                         <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                           <FileText size={14} /> {log.document}
                         </button>
                       </div>
                     )}
                      <div className="flex gap-2 pt-4">
                       <Button variant="secondary" size="sm" className="text-xs">Edit Log</Button>
                     </div>
                   </div>
                 );
               })() : (
                 <div className="flex items-center justify-center h-full text-gray-500">
                   Select a log entry from the list to view details.
                 </div>
               )}
             </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="bg-[#151F2D] rounded-lg p-6 space-y-4">
            <div className="flex gap-4 mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  className="w-full bg-[#1E293B] border border-[#374151] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <Button variant="secondary" size="sm" className="text-xs"><Filter size={14} className="mr-1" /> Filter</Button>
              <Button size="sm" className="text-xs"><Plus size={14} className="mr-1" /> Add Document</Button>
            </div>

            <div className="space-y-2">
              {documents.map((doc) => (
                <div key={doc.id} className="bg-[#1E293B] rounded-lg p-4 hover:bg-[#2D3B4E] transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-[#2D3B4E] rounded-full text-white text-xl">
                        {doc.icon || <FileText className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{doc.title}</h3>
                        <p className="text-gray-400 text-sm">{doc.description}</p>
                      </div>
                    </div>
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors text-sm"
                      onClick={() => handleViewDocument(doc.id)}
                    >
                      <span>View</span>
                      <FileText className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
               {documents.length === 0 && (
                 <p className="text-center text-gray-500 py-4">No documents found for this client.</p>
               )}
            </div>
          </div>
        )}

      </div>

      {isViewerOpen && viewingDocument && (
        <Dialog open={isViewerOpen} onOpenChange={closeViewer}>
          <DialogContent className="max-w-none w-full h-full sm:h-[95vh] sm:w-[95vw] bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col p-0 overflow-hidden text-black">
            <DialogHeader className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-300 flex flex-row justify-between items-center">
              <div>
                <DialogTitle className="text-base sm:text-lg font-semibold text-black">
                  {viewingDocument.title}
                </DialogTitle>
                <DialogDescription className="text-xs sm:text-sm text-gray-600 mt-1">
                  {viewingDocument.description}
                </DialogDescription>
              </div>
               <div className="flex items-center gap-2 mr-8">
                 <Button variant="outline" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 border-gray-300 bg-gray-50 hover:bg-gray-100">
                   <Download className="h-4 w-4 text-gray-600" />
                 </Button>
                 <Button variant="outline" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 border-gray-300 bg-gray-50 hover:bg-gray-100">
                   <Printer className="h-4 w-4 text-gray-600" />
                 </Button>
               </div>
            </DialogHeader>
            <div
              className="flex-1 h-full overflow-y-auto bg-white p-4 sm:p-6 md:p-8"
              dangerouslySetInnerHTML={{
                __html: documentHtml
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

