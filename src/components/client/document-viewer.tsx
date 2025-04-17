"use client"

import { useState } from "react"
import { X, Download, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface DocumentViewerProps {
  isOpen: boolean
  onClose: () => void
  documentTitle: string
  documentType: "BI Demand" | "UM Demand" | "Medical Records" | "Other"
  clientName: string
}

export function DocumentViewer({ isOpen, onClose, documentTitle, documentType, clientName }: DocumentViewerProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1E293B] border-[#374151] text-white max-w-4xl w-[90vw] max-h-[90vh] flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-gray-700 pb-4">
          <div>
            <DialogTitle className="text-lg">{documentTitle}</DialogTitle>
            <p className="text-sm text-gray-400 mt-1">Document type: {documentType}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8 border-[#374151] bg-[#1F2937]">
              <Download className="h-4 w-4 text-gray-300" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 border-[#374151] bg-[#1F2937]">
              <Printer className="h-4 w-4 text-gray-300" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 border-[#374151] bg-[#1F2937]" onClick={onClose}>
              <X className="h-4 w-4 text-gray-300" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto p-6 bg-white text-black">
          {/* Placeholder for document content */}
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">DEMAND LETTER</h1>
              <p className="text-lg">{documentType}</p>
              <p className="text-sm mt-4">Date: {new Date().toLocaleDateString()}</p>
            </div>
            
            <div className="mb-6">
              <p className="mb-2">RE: {clientName}</p>
              <p className="mb-2">Claim Number: CL-{Math.floor(1000000 + Math.random() * 9000000)}</p>
              <p>Date of Loss: {new Date().toLocaleDateString()}</p>
            </div>
            
            <p className="mb-4">Dear Claims Representative,</p>
            
            <p className="mb-4">
              Please accept this correspondence as our formal demand for settlement of the above-referenced claim.
              This letter will outline the facts of the incident, the injuries sustained by our client, the medical
              treatment received, and our evaluation of damages.
            </p>
            
            <h2 className="text-xl font-semibold mb-3 mt-6">FACTS OF THE INCIDENT</h2>
            <p className="mb-4">
              [Placeholder for accident description - This will be populated with actual case details in a production environment]
            </p>
            
            <h2 className="text-xl font-semibold mb-3 mt-6">INJURIES AND TREATMENT</h2>
            <p className="mb-4">
              As a result of this incident, our client sustained the following injuries:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Cervical strain/sprain</li>
              <li>Thoracic strain/sprain</li>
              <li>Lumbar strain/sprain</li>
              <li>Post-traumatic headaches</li>
            </ul>
            
            <h2 className="text-xl font-semibold mb-3 mt-6">MEDICAL EXPENSES</h2>
            <p className="mb-4">
              Our client has incurred the following medical expenses:
            </p>
            <table className="w-full border-collapse mb-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left">Provider</th>
                  <th className="border border-gray-300 p-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">Emergency Care</td>
                  <td className="border border-gray-300 p-2 text-right">$3,500.00</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Physical Therapy</td>
                  <td className="border border-gray-300 p-2 text-right">$2,800.00</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Diagnostic Imaging</td>
                  <td className="border border-gray-300 p-2 text-right">$1,200.00</td>
                </tr>
                <tr className="font-semibold">
                  <td className="border border-gray-300 p-2">Total</td>
                  <td className="border border-gray-300 p-2 text-right">$7,500.00</td>
                </tr>
              </tbody>
            </table>
            
            <h2 className="text-xl font-semibold mb-3 mt-6">DEMAND</h2>
            <p className="mb-6">
              Based on the facts of this case, the injuries sustained, and the damages incurred, we hereby demand
              the sum of $25,000.00 to resolve this claim in its entirety.
            </p>
            
            <p className="mb-4">
              This offer will remain open for 30 days from the date of this letter. We look forward to your response.
            </p>
            
            <p className="mb-8">
              Sincerely,
            </p>
            
            <p className="font-semibold">
              Law Firm Name<br />
              Attorney Name<br />
              Bar Number
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 