"use client"

import React from "react"; // Import React
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button" // Import Button if needed
import { type Client } from "@/data/clients" // Import Client type
import { ChevronDown, ChevronRight, PlusCircle } from "lucide-react" // Import icons

// Define props for LitDetails
interface LitDetailsProps {
  client: Client;
  expandedSections: {
    discoveryPretrial?: boolean; // Keep existing keys optional
    mediationPretrial?: boolean;
    expertReportsMedical?: boolean;
    cmeDetails?: boolean;
    depositions?: boolean;
    pfs?: boolean; // Add pfs key
    [key: string]: boolean | undefined; // Allow other string keys
  };
  toggleSection: (section: keyof LitDetailsProps['expandedSections']) => void;
  SectionHeader: React.FC<{ title: string; section: keyof LitDetailsProps['expandedSections'] }>;
}

export function LitDetails({ client, expandedSections, toggleSection, SectionHeader }: LitDetailsProps) {
  return (
    <div className="w-full space-y-6">
      {/* Discovery & Pretrial Section */}
      <div className="w-full bg-[#0E1826] rounded-[10px] p-6">
        <SectionHeader title="Discovery & Pretrial" section="discoveryPretrial" />
        {expandedSections.discoveryPretrial && (
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pre-Discovery Sent to Client */}
              <div className="space-y-2">
                <label htmlFor="pre-discovery-sent" className="text-sm font-medium text-gray-400">Pre-Discovery Sent to Client</label>
                <Select>
                  <SelectTrigger id="pre-discovery-sent" className="w-full bg-[#1A2433] border-[#374151]">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1E293B] text-white border-[#374151]">
                    <SelectItem value="not-started">Not Started</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="received">Received</SelectItem>
                    <SelectItem value="na">N/A</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Deposition Prep */}
              <div className="space-y-2">
                <label htmlFor="deposition-prep" className="text-sm font-medium text-gray-400">Deposition Prep</label>
                <Select>
                  <SelectTrigger id="deposition-prep" className="w-full bg-[#1A2433] border-[#374151]">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1E293B] text-white border-[#374151]">
                    <SelectItem value="not-started">Not Started</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="na">N/A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Northrup */}
            <div className="space-y-2">
              <label htmlFor="northrup" className="text-sm font-medium text-gray-400">Northrup</label>
              <Select>
                <SelectTrigger id="northrup" className="w-full bg-[#1A2433] border-[#374151]">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent className="bg-[#1E293B] text-white border-[#374151]">
                  <SelectItem value="not-started">Not Started</SelectItem>
                  <SelectItem value="requested">Requested</SelectItem>
                  <SelectItem value="received">Received</SelectItem>
                  <SelectItem value="na">N/A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Authorizations */}
            <div className="space-y-2">
              <label htmlFor="authorizations" className="text-sm font-medium text-gray-400">Authorizations</label>
              <Select>
                <SelectTrigger id="authorizations" className="w-full bg-[#1A2433] border-[#374151]">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent className="bg-[#1E293B] text-white border-[#374151]">
                  <SelectItem value="not-started">Not Started</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="received">Received</SelectItem>
                   <SelectItem value="partial">Partially Received</SelectItem>
                  <SelectItem value="na">N/A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Expert Rad Read */}
            <div className="space-y-2">
              <label htmlFor="expert-rad-read" className="text-sm font-medium text-gray-400">Expert Rad Read</label>
              <Select>
                <SelectTrigger id="expert-rad-read" className="w-full bg-[#1A2433] border-[#374151]">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent className="bg-[#1E293B] text-white border-[#374151]">
                   <SelectItem value="not-needed">Not Needed</SelectItem>
                   <SelectItem value="pending-review">Pending Review</SelectItem>
                  <SelectItem value="requested">Requested</SelectItem>
                  <SelectItem value="received">Received</SelectItem>
                   <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Expert Discovery Sent */}
            <div className="space-y-2">
              <label htmlFor="expert-discovery-sent" className="text-sm font-medium text-gray-400">Expert Discovery Sent</label>
              <Select>
                <SelectTrigger id="expert-discovery-sent" className="w-full bg-[#1A2433] border-[#374151]">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent className="bg-[#1E293B] text-white border-[#374151]">
                  <SelectItem value="not-started">Not Started</SelectItem>
                  <SelectItem value="drafting">Drafting</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="served">Served</SelectItem>
                  <SelectItem value="na">N/A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Mediation & Pretrial Section */}
      <div className="w-full bg-[#0E1826] rounded-[10px] p-6">
        <SectionHeader title="Mediation & Pretrial" section="mediationPretrial" />
        {expandedSections.mediationPretrial && (
          <div className="mt-6 space-y-4">
            {/* Mediation Prep Complete */}
            <div className="space-y-2">
              <label htmlFor="mediation-prep-complete" className="text-sm font-medium text-gray-400">Mediation Prep Complete</label>
              <Select>
                <SelectTrigger id="mediation-prep-complete" className="w-full bg-[#1A2433] border-[#374151]">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent className="bg-[#1E293B] text-white border-[#374151]">
                  <SelectItem value="not-started">Not Started</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="na">N/A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mediation Date */}
            <div className="space-y-2">
              <label htmlFor="mediation-date" className="text-sm font-medium text-gray-400 flex flex-col">
                Mediation Date
                <span className="text-xs text-gray-500">Needed for client letter</span>
              </label>
              <div className="flex gap-2">
                <Input id="mediation-date" type="text" placeholder="mm/dd/yyyy" className="w-1/2 bg-[#1A2433] border-[#374151]" />
                <Input type="text" placeholder="hh:mm pm" className="w-1/2 bg-[#1A2433] border-[#374151]" />
                {/* Replace with actual DatePicker and TimePicker if available */}
              </div>
            </div>

            {/* Mediation Company */}
            <div className="space-y-2">
              <label htmlFor="mediation-company" className="text-sm font-medium text-gray-400 flex flex-col">
                Mediation Company
                <span className="text-xs text-gray-500">Needed for client letter</span>
                </label>
              <Input id="mediation-company" type="text" placeholder="Enter company name" className="w-full bg-[#1A2433] border-[#374151]" />
            </div>

            {/* Mediation Meeting Type */}
            <div className="space-y-2">
               <label htmlFor="mediation-meeting-type" className="text-sm font-medium text-gray-400 flex flex-col">
                 Mediation Meeting Type
                 <span className="text-xs text-gray-500">Needed for client letter</span>
               </label>
              <Select>
                <SelectTrigger id="mediation-meeting-type" className="w-full bg-[#1A2433] border-[#374151]">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent className="bg-[#1E293B] text-white border-[#374151]">
                  <SelectItem value="in-person">In Person</SelectItem>
                  <SelectItem value="zoom">Zoom</SelectItem>
                  <SelectItem value="phone">Phone Conference</SelectItem>
                   <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mediation Location */}
            <div className="space-y-2">
              <label htmlFor="mediation-location" className="text-sm font-medium text-gray-400 flex flex-col">
                Mediation Location
                <span className="text-xs text-gray-500">Needed for client letter. Address or Zoom Link</span>
                </label>
              <Input id="mediation-location" type="text" placeholder="Enter address or link" className="w-full bg-[#1A2433] border-[#374151]" />
            </div>

            {/* Highest Mediation Offer */}
             <div className="space-y-2">
              <label htmlFor="highest-mediation-offer" className="text-sm font-medium text-gray-400">Highest Mediation Offer</label>
              <Input id="highest-mediation-offer" type="text" placeholder="Enter amount" className="w-full bg-[#1A2433] border-[#374151]" />
            </div>

            {/* Mediation Complete Checkbox */}
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="mediation-complete" className="border-[#374151] data-[state=checked]:bg-blue-500 data-[state=checked]:text-white"/>
              <label
                htmlFor="mediation-complete"
                className="text-sm font-medium text-gray-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Mediation Complete
              </label>
            </div>

            {/* Two Column Grid for Pretrial/CMC/Trial/Witness */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-4 border-t border-gray-700 mt-4">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Pretrial Date (Left) */}
                 <div className="space-y-2">
                   <label htmlFor="pretrial-date-left" className="text-sm font-medium text-gray-400">Pretrial Date</label>
                   <Input id="pretrial-date-left" type="text" placeholder="mm/dd/yyyy" className="w-full bg-[#1A2433] border-[#374151]" />
                 </div>
                 {/* CMC Date */}
                 <div className="space-y-2">
                    <label htmlFor="cmc-date" className="text-sm font-medium text-gray-400">CMC Date</label>
                    <Input id="cmc-date" type="text" placeholder="mm/dd/yyyy" className="w-full bg-[#1A2433] border-[#374151]" />
                 </div>
                 {/* Trial Date Start */}
                 <div className="space-y-2">
                    <label htmlFor="trial-date-start" className="text-sm font-medium text-gray-400">Trial Date Start</label>
                     <Input id="trial-date-start" type="text" placeholder="mm/dd/yyyy" className="w-full bg-[#1A2433] border-[#374151]" />
                 </div>
                 {/* Witness Deadline */}
                 <div className="space-y-2">
                    <label htmlFor="witness-deadline" className="text-sm font-medium text-gray-400">Witness Deadline</label>
                    <Input id="witness-deadline" type="text" placeholder="mm/dd/yyyy" className="w-full bg-[#1A2433] border-[#374151]" />
                 </div>
                 {/* Witness List Completed Checkbox */}
                 <div className="flex items-center space-x-2 pt-2">
                   <Checkbox id="witness-list-complete" className="border-[#374151] data-[state=checked]:bg-blue-500 data-[state=checked]:text-white"/>
                   <label
                     htmlFor="witness-list-complete"
                     className="text-sm font-medium text-gray-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                   >
                     Witness List Completed
                   </label>
                 </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                 {/* Pretrial Date (Right) - Input Field */}
                 <div className="space-y-2">
                   <label htmlFor="pretrial-date-notes" className="text-sm font-medium text-gray-400">Pretrial Date Notes</label>
                   <Textarea id="pretrial-date-notes" placeholder="Enter notes" className="w-full bg-[#1A2433] border-[#374151] h-16" />
                 </div>
                 {/* CMC Notes */}
                  <div className="space-y-2">
                    <label htmlFor="cmc-notes" className="text-sm font-medium text-gray-400">CMC Notes</label>
                    <Textarea id="cmc-notes" placeholder="Enter notes" className="w-full bg-[#1A2433] border-[#374151] h-16" />
                 </div>
                 {/* Trial Date Notes */}
                  <div className="space-y-2">
                    <label htmlFor="trial-date-notes" className="text-sm font-medium text-gray-400">Trial Date Notes</label>
                     <Textarea id="trial-date-notes" placeholder="Enter notes" className="w-full bg-[#1A2433] border-[#374151] h-16" />
                 </div>
                 {/* Witness List */}
                 <div className="space-y-2">
                    <label htmlFor="witness-list" className="text-sm font-medium text-gray-400">Witness List</label>
                    <Textarea id="witness-list" placeholder="Enter witness list" className="w-full bg-[#1A2433] border-[#374151] h-24" />
                 </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Expert Reports & Medical Section */}
      <div className="w-full bg-[#0E1826] rounded-[10px] p-6">
        <SectionHeader title="Expert Reports & Medical" section="expertReportsMedical" />
        {expandedSections.expertReportsMedical && (
          <div className="mt-6 space-y-4">
            {/* LCP Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* LCP Select */}
              <div className="space-y-2">
                <label htmlFor="lcp-select" className="text-sm font-medium text-gray-400">LCP</label>
                <Select>
                  <SelectTrigger id="lcp-select" className="w-full bg-[#1A2433] border-[#374151]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1E293B] text-white border-[#374151]">
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* LCP Company Input */}
              <div className="space-y-2">
                <label htmlFor="lcp-company" className="text-sm font-medium text-gray-400">LCP Company</label>
                <Input id="lcp-company" type="text" placeholder="Enter company" className="w-full bg-[#1A2433] border-[#374151]" />
              </div>
               {/* LCP Amount Input */}
               <div className="space-y-2">
                <label htmlFor="lcp-amount" className="text-sm font-medium text-gray-400">LCP Amount</label>
                <Input id="lcp-amount" type="text" placeholder="Enter amount" className="w-full bg-[#1A2433] border-[#374151]" />
              </div>
              {/* LCP Doc Select */}
              <div className="space-y-2">
                <label htmlFor="lcp-doc" className="text-sm font-medium text-gray-400">LCP Doc</label>
                <Select>
                  <SelectTrigger id="lcp-doc" className="w-full bg-[#1A2433] border-[#374151]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1E293B] text-white border-[#374151]">
                     <SelectItem value="requested">Requested</SelectItem>
                     <SelectItem value="received">Received</SelectItem>
                     <SelectItem value="na">N/A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Engineer Report Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Engineer Rept Requested Select */}
              <div className="space-y-2">
                <label htmlFor="engineer-req" className="text-sm font-medium text-gray-400">Engineer Rept Requested</label>
                 <Select>
                  <SelectTrigger id="engineer-req" className="w-full bg-[#1A2433] border-[#374151]">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1E293B] text-white border-[#374151]">
                     <SelectItem value="yes">Yes</SelectItem>
                     <SelectItem value="no">No</SelectItem>
                     <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Engineer Rpt Received Select */}
              <div className="space-y-2">
                <label htmlFor="engineer-rec" className="text-sm font-medium text-gray-400">Engineer Rpt Received</label>
                <Select>
                  <SelectTrigger id="engineer-rec" className="w-full bg-[#1A2433] border-[#374151]">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1E293B] text-white border-[#374151]">
                     <SelectItem value="yes">Yes</SelectItem>
                     <SelectItem value="no">No</SelectItem>
                     <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Videographer & Defense Experts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Videographer Retained Select */}
               <div className="space-y-2">
                <label htmlFor="videographer-retained" className="text-sm font-medium text-gray-400">Videographer Retained</label>
                <Select>
                  <SelectTrigger id="videographer-retained" className="w-full bg-[#1A2433] border-[#374151]">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1E293B] text-white border-[#374151]">
                     <SelectItem value="yes">Yes</SelectItem>
                     <SelectItem value="no">No</SelectItem>
                     <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Defense Experts Textarea */}
              <div className="space-y-2">
                 <label htmlFor="defense-experts" className="text-sm font-medium text-gray-400">Defense Experts</label>
                 <Textarea id="defense-experts" placeholder="Enter defense expert details" className="w-full bg-[#1A2433] border-[#374151] h-24" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CME Details Section */}
      <div className="w-full bg-[#0E1826] rounded-[10px] p-6">
        <SectionHeader title="CME Details" section="cmeDetails" />
        {expandedSections.cmeDetails && (
          <div className="mt-6 space-y-4">
            {/* CME Date & Specialty Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CME Date */}
              <div className="space-y-2">
                <label htmlFor="cme-date" className="text-sm font-medium text-gray-400 flex flex-col">
                  CME Date
                  <span className="text-xs text-gray-500">Select a date to generate CME Letter</span>
                </label>
                {/* Replace with actual DatePicker if available */}
                <Input id="cme-date" type="text" placeholder="mm/dd/yyyy" className="w-full bg-[#1A2433] border-[#374151]" />
              </div>
              {/* CME Exam Speciality */}
              <div className="space-y-2">
                <label htmlFor="cme-specialty" className="text-sm font-medium text-gray-400">CME Exam Speciality</label>
                <p id="cme-specialty" className="text-gray-300 pt-2">-</p> {/* Placeholder */}
              </div>
            </div>

            {/* CME Doctor */}
            <div className="space-y-2">
              <label htmlFor="cme-doctor" className="text-sm font-medium text-gray-400 flex flex-col">
                CME Doctor
                <span className="text-xs text-gray-500">Select a doctor to generate CME Letter</span>
              </label>
              {/* Add functionality for selecting/adding a doctor */}
              <Button variant="outline" className="bg-[#1A2433] border-[#374151] hover:bg-[#243042]">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add record
              </Button>
            </div>

            {/* CME Notes */}
            <div className="space-y-2">
              <label htmlFor="cme-notes" className="text-sm font-medium text-gray-400">CME Notes</label>
              <Textarea id="cme-notes" placeholder="Enter CME notes" className="w-full bg-[#1A2433] border-[#374151] h-24" />
            </div>

            {/* CME Exam Location */}
            <div className="space-y-2">
              <label htmlFor="cme-location" className="text-sm font-medium text-gray-400">CME Exam Location</label>
               <p id="cme-location" className="text-gray-300">-</p> {/* Placeholder */}
            </div>

             {/* CME Exam Address */}
             <div className="space-y-2">
              <label htmlFor="cme-address" className="text-sm font-medium text-gray-400">CME Exam Address</label>
               <p id="cme-address" className="text-gray-300">-</p> {/* Placeholder */}
            </div>

            {/* CME Report Received */}
            <div className="space-y-2">
              <label htmlFor="cme-report-received" className="text-sm font-medium text-gray-400">CME Report Received</label>
              <p id="cme-report-received" className="text-gray-300">-</p> {/* Placeholder */}
            </div>
          </div>
        )}
      </div>

      {/* Depositions Section */}
      <div className="w-full bg-[#0E1826] rounded-[10px] p-6">
        <SectionHeader title="Depositions" section="depositions" />
        {expandedSections.depositions && (
          <div className="mt-6 space-y-4">
            {/* Deposition Date & Time Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Deposition Date */}
              <div className="space-y-2">
                <label htmlFor="deposition-date" className="text-sm font-medium text-gray-400">Deposition Date</label>
                {/* Replace with actual DatePicker if available */}
                <Input id="deposition-date" type="text" placeholder="mm/dd/yyyy" className="w-full bg-[#1A2433] border-[#374151]" />
              </div>
               {/* Deposition Time */}
              <div className="space-y-2">
                <label htmlFor="deposition-time" className="text-sm font-medium text-gray-400">Deposition Time</label>
                 {/* Replace with actual TimePicker if available */}
                 <Input id="deposition-time" type="text" placeholder="hh:mm pm" className="w-full bg-[#1A2433] border-[#374151]" />
              </div>
            </div>

             {/* Deposition Location */}
             <div className="space-y-2">
              <label htmlFor="deposition-location" className="text-sm font-medium text-gray-400">Deposition Location</label>
              <Input id="deposition-location" type="text" placeholder="Enter location or Zoom link" className="w-full bg-[#1A2433] border-[#374151]" />
            </div>

            {/* Status Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-700 mt-4">
              {/* Deposition Prep Complete Select */}
              <div className="space-y-2">
                <label htmlFor="depo-prep-complete" className="text-sm font-medium text-gray-400">Prep Complete</label>
                <Select>
                  <SelectTrigger id="depo-prep-complete" className="w-full bg-[#1A2433] border-[#374151]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1E293B] text-white border-[#374151]">
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="na">N/A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Deposition Scheduled Select */}
              <div className="space-y-2">
                <label htmlFor="depo-scheduled" className="text-sm font-medium text-gray-400">Scheduled</label>
                <Select>
                  <SelectTrigger id="depo-scheduled" className="w-full bg-[#1A2433] border-[#374151]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1E293B] text-white border-[#374151]">
                     <SelectItem value="yes">Yes</SelectItem>
                     <SelectItem value="no">No</SelectItem>
                     <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Deposition Completed Select */}
               <div className="space-y-2">
                <label htmlFor="depo-completed" className="text-sm font-medium text-gray-400">Completed</label>
                <Select>
                  <SelectTrigger id="depo-completed" className="w-full bg-[#1A2433] border-[#374151]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1E293B] text-white border-[#374151]">
                     <SelectItem value="yes">Yes</SelectItem>
                     <SelectItem value="no">No</SelectItem>
                     <SelectItem value="pending">Pending</SelectItem>
                     <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* PFS Section */}
      <div className="w-full bg-[#0E1826] rounded-[10px] p-6 relative"> {/* Added relative positioning */}
        {/* Generate Button (Top Right) */}
        <Button className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white">
          Generate PFS Documents
        </Button>

        <SectionHeader title="PFS" section="pfs" />
        {expandedSections.pfs && (
          <div className="mt-6 space-y-4 pt-4"> {/* Added pt-4 for spacing below button */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="pfs-file-date" className="text-sm font-medium text-gray-400">File Date</label>
                  <Input id="pfs-file-date" type="text" placeholder="mm/dd/yyyy" className="w-full bg-[#1A2433] border-[#374151]" defaultValue="2/20/2025" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="pfs-order" className="text-sm font-medium text-gray-400">Order</label>
                  <Input id="pfs-order" type="number" placeholder="1" className="w-full bg-[#1A2433] border-[#374151]" defaultValue={1} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="pfs-type" className="text-sm font-medium text-gray-400">PFS Type</label>
                  <Select defaultValue="against-defendant">
                    <SelectTrigger id="pfs-type" className="w-full bg-[#1A2433] border-[#374151]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1E293B] text-white border-[#374151]">
                      <SelectItem value="against-defendant">Against Defendant</SelectItem>
                      <SelectItem value="for-claimant">For Claimant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="pfs-status" className="text-sm font-medium text-gray-400 flex flex-col">
                     Status - Defendant
                     <span className="text-xs text-gray-500">Status need to be "Generate Letter" for button to be visible.</span>
                  </label>
                  <Select defaultValue="request-approval">
                    <SelectTrigger id="pfs-status" className="w-full bg-[#1A2433] border-[#374151]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1E293B] text-white border-[#374151]">
                      <SelectItem value="request-approval">Request Approval from Craig</SelectItem>
                      <SelectItem value="drafting">Drafting</SelectItem>
                      <SelectItem value="pending-signature">Pending Signature</SelectItem>
                      <SelectItem value="served">Served</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                 <div className="space-y-2">
                  <label htmlFor="pfs-amount" className="text-sm font-medium text-gray-400 flex flex-col">
                    Amount
                     <span className="text-xs text-gray-500">Field needs a value for button to be visible.</span>
                  </label>
                  <Input id="pfs-amount" type="text" placeholder="$0.00" className="w-full bg-[#1A2433] border-[#374151]" defaultValue="$125,000.00" />
                </div>
                 <div className="space-y-2">
                  <label htmlFor="pfs-beat" className="text-sm font-medium text-gray-400">Beat</label>
                  <Input id="pfs-beat" type="text" placeholder="$0.00" className="w-full bg-[#1A2433] border-[#374151]" defaultValue="$156,250.00" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="pfs-notes" className="text-sm font-medium text-gray-400">Notes</label>
                  <Textarea id="pfs-notes" placeholder="Enter notes" className="w-full bg-[#1A2433] border-[#374151] h-24" />
                </div>
              </div>
            </div>

            {/* Defendants Block */}
             <div className="space-y-2 pt-4 border-t border-gray-700 mt-4">
                <label className="text-sm font-medium text-gray-400 flex flex-col">
                  Defendants
                  <span className="text-xs text-gray-500">Field needs a value for button to be visible.</span>
                </label>
                {/* Placeholder for Defendant Display - Fetch/Map actual defendants */} 
                <div className="bg-[#1A2433] border border-[#374151] rounded p-4 text-sm">
                  <p className="font-medium text-white">Another Entity</p>
                  <p className="text-gray-400">Client Name</p> 
                  <p className="text-gray-400">Josh Yazdiya - 11/14/2024</p>
                  {/* Map through client.defendants here later */}
                </div>
             </div>

            {/* Files Section */}
            <div className="pt-4 border-t border-gray-700 mt-4">
              <h3 className="text-lg font-medium text-white mb-4">Files</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left File Column */}
                 <div className="space-y-4">
                    <div className="flex gap-2 flex-wrap">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Cover Letter</Button>
                      <Button size="sm" variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-900/50 hover:text-blue-300">Authorization (Not Signed)</Button>
                    </div>
                     <div className="space-y-2">
                      <label htmlFor="link-auth" className="text-sm font-medium text-gray-400">Link to Authorization</label>
                       <Input id="link-auth" type="text" className="w-full bg-[#1A2433] border-[#374151]" defaultValue="https://www.dropbox.com/scl/fi/49ispf7mi9..." />
                    </div>
                     <div className="space-y-2">
                      <label htmlFor="link-cover" className="text-sm font-medium text-gray-400">Link to Cover Letter</label>
                       <Input id="link-cover" type="text" className="w-full bg-[#1A2433] border-[#374151]" defaultValue="https://www.dropbox.com/scl/fi/e1wdx5nf0..." />
                    </div>
                 </div>
                 {/* Right File Column */}
                 <div className="space-y-4">
                    <div className="flex gap-2 flex-wrap">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">PFS</Button>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="auth-signed" className="text-sm font-medium text-gray-400">Authorization Signed</label>
                      <Input id="auth-signed" type="text" placeholder="Link or Date" className="w-full bg-[#1A2433] border-[#374151]" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="link-pfs" className="text-sm font-medium text-gray-400">Link to PFS</label>
                      <Input id="link-pfs" type="text" className="w-full bg-[#1A2433] border-[#374151]" defaultValue="https://www.dropbox.com/scl/fi/3i9wuzpg8..." />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Add more Litigation specific sections here later */}
    </div>
  )
}
