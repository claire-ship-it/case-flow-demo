"use client"

import React, { useState, useEffect } from "react"; // Import useEffect
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
import { type Client, type Document as ClientDocument } from "@/data/clients" // Import Client type and ClientDocument type
import { ChevronDown, ChevronRight, PlusCircle, FileText, DollarSign } from "lucide-react" // Import icons
// Import Dialog components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose, // Import DialogClose for the cancel button
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label" // Import Label for form

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
    offers?: boolean; // Add offers key
    [key: string]: boolean | undefined; // Allow other string keys
  };
  toggleSection: (section: keyof LitDetailsProps['expandedSections']) => void;
  SectionHeader: React.FC<{ title: string; section: keyof LitDetailsProps['expandedSections'] }>;
}

// Define Offer interface
interface Offer {
    id: number | string; // Allow string for generated IDs
    amount: string;
    date: string;
    status: string;
    type: string;
}

export function LitDetails({ client, expandedSections, toggleSection, SectionHeader }: LitDetailsProps) {
  // State to control the Add Offer dialog
  const [isAddOfferDialogOpen, setIsAddOfferDialogOpen] = useState(false);
  // Add state for the success message
  const [showCrnMessage, setShowCrnMessage] = useState(false);

  // Initial hardcoded data (can be moved outside if preferred)
  const initialOffers: Offer[] = [
    { id: 1, amount: "$100,000.00", date: "01/15/2025", status: "Rejected", type: "Defendant Offer" },
    { id: 2, amount: "$150,000.00", date: "02/10/2025", status: "Pending", type: "Firm Counter" },
  ];

  const initialPFS = [
    { id: 1, amount: "$125,000.00", fileDate: "02/20/2025", status: "Served", type: "Against Defendant" },
    { id: 2, amount: "$200,000.00", fileDate: "03/01/2025", status: "Drafting", type: "For Claimant" },
  ];

  // Use state for offers list
  const [offers, setOffers] = useState<Offer[]>(initialOffers);
  // Use state for PFS list (if you want to add to it later)
  const [pfsList, setPfsList] = useState(initialPFS);

  // Updated submit handler to add offer locally and update localStorage['clientDocuments']
  const handleAddOfferSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("[LitDetails] handleAddOfferSubmit: Function started.");

    const formData = new FormData(event.currentTarget);
    const rawAmount = formData.get('offer-amount') as string || '0';
    const dateRaw = formData.get('offer-date') as string;
    const date = dateRaw ? new Date(dateRaw + 'T00:00:00').toLocaleDateString() : new Date().toLocaleDateString();
    const type = formData.get('offer-type') as string || 'N/A';
    const status = formData.get('offer-status') as string || 'Pending';

    // Format amount as currency
    let formattedAmount = "$0.00";
    try {
      const numericAmount = parseFloat(rawAmount.replace(/[^\d.-]/g, '')); // Clean string before parsing
      if (!isNaN(numericAmount)) {
        formattedAmount = numericAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      }
    } catch (e) {
      console.error("Could not parse offer amount for formatting:", rawAmount, e);
      // Fallback to a simple $ prefix if parsing/formatting fails
      formattedAmount = `$${rawAmount}`;
    }

    const newOffer: Offer = {
        id: `offer-${Date.now()}`,
        amount: formattedAmount, // Use formatted amount
        date: date,
        type: type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        status: status.charAt(0).toUpperCase() + status.slice(1)
    };
    console.log("[LitDetails] handleAddOfferSubmit: Adding offer to local state:", newOffer);
    setOffers(prevOffers => [newOffer, ...prevOffers]);

    setIsAddOfferDialogOpen(false);
    setShowCrnMessage(true);
    setTimeout(() => {
      setShowCrnMessage(false);
    }, 5000);

    setTimeout(() => {
      console.log("[LitDetails] handleAddOfferSubmit: (After 30s delay) Updating 'clientDocuments' in localStorage.");
      const getCrnHtml = (clientData: Client): string => {
        const safeName = clientData.name || 'John Smith'; 
        const safeAddress = clientData.address || '123 Main St, Tampa, FL 33601';
        const safeEmail = clientData.email || 'john.smith@email.com';
        return `<!DOCTYPE html><html lang="en"><head>   <meta charset="UTF-8">   <meta name="viewport" content="width=device-width, initial-scale=1.0">   <title>Civil Remedy Notice</title></head><body style="margin: 0; padding: 0;">   <div style="font-family: 'Times New Roman', Times, serif; font-size: 12pt; margin-left: 0.5in; text-align: left;">       Complainant: ${safeName}<br>       <br>       ${safeAddress} <br>       Tampa,  FL 33601<br>       <br>       Email: ${safeEmail}<br>       <br>       BI Insured: Jason Miller<br>       <br>       BI Claim Number: CLM-345678<br>       <br>       BI Policy Number: PRG-456789123<br>       <br>       Progressive<br>       789 Insurance Ave<br>       Orchard City, CA 90210<br>       <br>       BI Claims Specialist: Michael Brown<br>       <br>       (555) 345-6789<br>       michael.brown@progressive.com<br>       <br>       <a href="mailto:Ryan@RyanHughesLaw.com" style="color: blue; text-decoration: underline;">Ryan@RyanHughesLaw.com</a>   </div><br><div style="font-family: 'Times New Roman', Times, serif; font-size: 12pt; margin-left: 0.5in; text-align: left;">   Reasons for Notice:<br>   <br>   <b>Claim Denial<br>   Claim Delay<br>   Unsatisfactory Settlement Offer<br>   Unfair Trade Practice<br>   Other: Failure to Tender</b><br>   <br>   <table style="width: 100%; border-collapse: collapse;">       <tr>           <td style="width: 50px; border: 1px solid #999; padding: 3pt; vertical-align: top;"><b>Re<br>mo<br>ve</b></td>           <td style="border: 1px solid #999; padding: 3pt;"><b>Other:</b> Progressive <b>has substantially delayed the claim refusing to make a reasonable offer in response to the Complainant's demand and showing of sufficient evidence</b></td>       </tr>       <tr>           <td style="width: 50px; border: 1px solid #999; padding: 3pt; vertical-align: top;"><b>Re<br>mo<br>ve</b></td>           <td style="border: 1px solid #999; padding: 3pt;"><b>Other:</b> Progressive <b>has not conducted a full and prompt investigation of the facts and circumstances of this loss</b></td>       </tr>       <tr>           <td style="width: 50px; border: 1px solid #999; padding: 3pt; vertical-align: top;"><b>Re<br>mo<br>ve</b></td>           <td style="border: 1px solid #999; padding: 3pt;"><b>Other:</b> Progressive <b>has not trained, supervised, or managed its adjusters properly so that prompt and full payment of policy limits could be tendered upon showing of sufficient evidence</b></td>       </tr>       <tr>           <td style="width: 50px; border: 1px solid #999; padding: 3pt; vertical-align: top;"><b>Re<br>mo<br>ve</b></td>           <td style="border: 1px solid #999; padding: 3pt;"><b>Other:</b> Progressive <b>is forcing the insured to litigate in order to obtain coverage under the insurance policy</b></td>       </tr>       <tr>           <td style="width: 50px; border: 1px solid #999; padding: 3pt; vertical-align: top;"><b>Re<br>mo<br>ve</b></td>           <td style="border: 1px solid #999; padding: 3pt;"><b>Other:</b> Progressive <b>has failed to pay the full value of the claim</b></td>       </tr>       <tr>           <td style="width: 50px; border: 1px solid #999; padding: 3pt; vertical-align: top;"><b>Re<br>mo<br>ve</b></td>           <td style="border: 1px solid #999; padding: 3pt;"><b>Other:</b> Progressive <b>has exploited the financial vulnerability of the insured to obtain a favorable settlement</b></td>       </tr>   </table></div><div style="font-family: 'Times New Roman', Times, serif; font-size: 12pt; margin-left: 0.5in; text-align: left;">    <p style="margin: 24pt 0 12pt 0;"><b>PURSUANT TO SECTION 624.155, F.S.</b> please indicate all statutory provisions alleged to have been violated.</p>    <p style="margin: 0 0 12pt 0;"><b>624.155(1)(b)(1)</b><br>    <b>Not attempting in good faith to settle claims when, under all the circumstances, it could and should have done so, had it acted fairly and honestly toward its insured and with due regard for her or his interests.</b></p>    <p style="margin: 0 0 12pt 0;"><b>626.9541(1)(i)(3)(a)</b><br>    <b>Failing to adopt and implement standards for the proper investigation of claims.</b></p>    <p style="margin: 0 0 12pt 0;"><b>626.9541(1)(i)(3)(d)</b><br>    <b>Denying claims without conducting reasonable investigations based upon available information.</b></p>    <p style="margin: 24pt 0 12pt 0;"><b>Policy Provisions:</b><br>    <b>"We will pay damages for "bodily injury" or "property damage" for which any "insured" becomes legally responsible because of an auto accident. Damages include prejudgment interest awarded against the "insured". We will settle or defend, as we consider appropriate, any claim or suit asking for these damages. In addition to our limit of liability, we will pay all defense costs we incur. Our duty to settle or defend ends when our limit of liability for this coverage has been exhausted by payment of judgments or settlements. We have no duty to defend any suit or settle any claim for "bodily injury" or "property damage" not covered under this policy."</b></p></div><div style="font-family: 'Times New Roman', Times, serif; font-size: 12pt; margin-left: 0.5in; text-align: left;">   <p style="margin: 0 0 12pt 0;"><b><u>CRN TEXT:</u></b></p>   <p style="margin: 0 0 12pt 0;">The subject crash occurred on Friday, March 15, 2024, at approximately 10:30 AM, at the intersection of Fletcher Avenue and Bruce B Downs Boulevard. Vehicle 1, operated by Jason Miller (the insured), was traveling northbound on Bruce B Downs Boulevard, while Vehicle 2, driven by ${safeName}, was traveling eastbound on Fletcher Avenue in the through lane. The insured failed to stop at a red light, proceeding through the intersection and causing a T-bone collision with Mr. Smith's vehicle. The insured was cited for failing to stop at a red light and careless driving. Mr. Smith was properly restrained, operating his vehicle lawfully with a green light, and no citations were issued against him. Liability rests solely with the insured due to their failure to stop at the red light, and no liability rests with ${safeName}.</p>   <p style="margin: 0 0 12pt 0;">Mr. Smith received care at multiple facilities including Advent Health Surgery Center, Active Wellness & Rehabilitation Center, and Tampa Bay Imaging. His treatment included physical therapy, orthopedic evaluation, diagnostic imaging such as X-rays and MRIs, and rehabilitation. Diagnoses included cervical strain, thoracic strain, lumbar strain, muscle spasms, and post-traumatic headaches. The medical bills total approximately $7,500.00, with treatment ongoing and pain symptoms persisting.</p>   <p style="margin: 0 0 12pt 0;">Despite numerous opportunities to settle this claim within the policy limits, Progressive has failed to make a good faith effort to resolve the matter. No reasonable offer has been extended. This lack of timely adjustment and refusal to tender the $75,000 BI policy limits has placed their insured, Jason Miller, at significant financial risk.</p>   <p style="margin: 0 0 12pt 0;">${safeName} hereby files this Civil Remedy Notice with the opportunity for Progressive to cure the violations within 60 days of receipt. Tender of the full $75,000 policy limits to "Ryan T. Hughes trust account, for the benefit of ${safeName}" will be considered a full and final settlement of all claims stemming from this incident. Failure to do so may result in a statutory bad faith action pursuant to Florida Statutes, including potential recovery of interest, attorneys' fees, and costs. This CRN serves as formal notice to Progressive of its statutory duties and the consequences of its ongoing inaction.</p></div></body></html>`;
      }

      let crnTitle = `Civil Remedy Notice - ${client.name}`;
      if (client.name === "John Smith") {
        crnTitle = `CRN Filing - ${client.name}`; // Adjusted title for John Smith
      }

      const newCrnDocument: ClientDocument = {
        id: `generated-CRN-${Date.now()}`,
        title: crnTitle, // Use potentially adjusted title
        type: "CRN",
        date: new Date().toLocaleDateString(),
        size: "0.2 MB",
        description: `Generated on ${new Date().toLocaleDateString()}`,
        htmlContent: getCrnHtml(client)
      };
      console.log("[LitDetails] handleAddOfferSubmit: New CRN Document Object being created:", JSON.stringify(newCrnDocument));

      try {
        const storedDocsString = localStorage.getItem('clientDocuments');
        let existingDocs: ClientDocument[] = [];
        if (storedDocsString) {
          try {
            existingDocs = JSON.parse(storedDocsString);
            if (!Array.isArray(existingDocs)) {
              console.warn("[LitDetails] handleAddOfferSubmit: Invalid data in localStorage['clientDocuments'], resetting.");
              existingDocs = [];
            }
          } catch (parseError) {
             console.error("[LitDetails] handleAddOfferSubmit: Error parsing localStorage['clientDocuments']:", parseError);
             existingDocs = [];
          }
        }
        const updatedDocs = [newCrnDocument, ...existingDocs];
        localStorage.setItem('clientDocuments', JSON.stringify(updatedDocs));
        console.log("[LitDetails] handleAddOfferSubmit: Successfully updated 'clientDocuments' in localStorage.");
      } catch (error) {
        console.error("[LitDetails] handleAddOfferSubmit: Error updating localStorage['clientDocuments']:", error);
      }
    }, 30000);
  };

  // Effect to clear message if section is collapsed/re-expanded (optional cleanup)
  useEffect(() => {
    if (!expandedSections.offers) {
      setShowCrnMessage(false);
    }
  }, [expandedSections.offers]);

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

      {/* --- Offers Section (Collapsible) --- */}
      <div className="w-full bg-[#0E1826] rounded-[10px] p-6">
        <SectionHeader title="Offers" section="offers" />
        {expandedSections.offers && (
          <div className="mt-6 space-y-3">
             {/* Add Offer Button wrapped in DialogTrigger */}
             <Dialog open={isAddOfferDialogOpen} onOpenChange={setIsAddOfferDialogOpen}>
               <DialogTrigger asChild>
                 <div className="flex justify-end mb-4">
                    <Button variant="outline" size="sm" className="bg-[#1A2433] border-[#374151] hover:bg-[#243042] text-gray-300">
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Add Offer
                    </Button>
                 </div>
               </DialogTrigger>
               <DialogContent className="sm:max-w-[425px] bg-[#1E293B] border-[#374151] text-white">
                 <DialogHeader>
                   <DialogTitle>Add New Offer</DialogTitle>
                   <DialogDescription className="text-gray-400">
                     Enter the details for the new offer. Click save when you're done.
                   </DialogDescription>
                 </DialogHeader>
                 {/* Add Offer Form */}
                 <form onSubmit={handleAddOfferSubmit}>
                   {/* Add Note about CRN Generation */}
                   <p className="text-xs text-yellow-400 bg-yellow-900/30 border border-yellow-700/50 rounded p-2 my-3">
                     Note: Submitting this offer will generate a Civil Remedy Notice (CRN) document, which can be found in the main Documents section after generation.
                   </p>
                   <div className="grid gap-4 py-4">
                     <div className="grid grid-cols-4 items-center gap-4">
                       <Label htmlFor="offer-amount" className="text-right text-gray-400">
                         Amount
                       </Label>
                       <Input name="offer-amount" id="offer-amount" placeholder="$0.00" className="col-span-3 bg-[#1A2433] border-[#374151]" />
                     </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                       <Label htmlFor="offer-date" className="text-right text-gray-400">
                         Date
                       </Label>
                       <Input name="offer-date" id="offer-date" type="date" className="col-span-3 bg-[#1A2433] border-[#374151]" />
                     </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                       <Label htmlFor="offer-type" className="text-right text-gray-400">
                         Type
                       </Label>
                       <Select name="offer-type">
                         <SelectTrigger id="offer-type" className="col-span-3 bg-[#1A2433] border-[#374151]">
                           <SelectValue placeholder="Select type" />
                         </SelectTrigger>
                         <SelectContent className="bg-[#1E293B] text-white border-[#374151]">
                           <SelectItem value="defendant-offer">Defendant Offer</SelectItem>
                           <SelectItem value="firm-counter">Firm Counter</SelectItem>
                           <SelectItem value="client-demand">Client Demand</SelectItem>
                         </SelectContent>
                       </Select>
                     </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                       <Label htmlFor="offer-status" className="text-right text-gray-400">
                         Status
                       </Label>
                       <Select name="offer-status">
                         <SelectTrigger id="offer-status" className="col-span-3 bg-[#1A2433] border-[#374151]">
                           <SelectValue placeholder="Select status" />
                         </SelectTrigger>
                         <SelectContent className="bg-[#1E293B] text-white border-[#374151]">
                           <SelectItem value="pending">Pending</SelectItem>
                           <SelectItem value="accepted">Accepted</SelectItem>
                           <SelectItem value="rejected">Rejected</SelectItem>
                           <SelectItem value="withdrawn">Withdrawn</SelectItem>
                         </SelectContent>
                       </Select>
                     </div>
                   </div>
                   <DialogFooter>
                     {/* Use DialogClose for the Cancel button */}
                     <DialogClose asChild>
                        <Button type="button" variant="outline" className="text-gray-300 border-[#374151] hover:bg-[#243042]">Cancel</Button>
                     </DialogClose>
                     <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Save Offer</Button>
                   </DialogFooter>
                 </form>
               </DialogContent>
             </Dialog>

             {/* Display CRN Generation Message */}
             {showCrnMessage && (
               <p className="text-sm text-green-400 bg-green-900/30 border border-green-700/50 rounded p-3 my-2 text-center">
                 Offer submitted. Generating CRN... It will appear in the Documents section shortly.
               </p>
             )}

             {/* Offer List - Map over state variable 'offers' */}
             {offers.length > 0 ? (
               offers.map((offer) => ( // Use offers state here
                 <div key={offer.id} className="bg-[#151F2D] p-3 rounded-lg flex justify-between items-center">
                   <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="text-white font-medium">{offer.amount}</p>
                        <p className="text-xs text-gray-400">{offer.type} - {offer.date}</p>
                      </div>
                   </div>
                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                     offer.status === 'Rejected' ? 'bg-red-900/50 text-red-400' :
                     offer.status === 'Accepted' ? 'bg-green-900/50 text-green-400' :
                     'bg-yellow-900/50 text-yellow-400' // Pending
                   }`}>
                     {offer.status}
                   </span>
                 </div>
               ))
             ) : (
               <p className="text-gray-500 text-sm text-center py-4">No offers recorded.</p>
             )}
          </div>
        )}
      </div>
      {/* --- END Offers Section --- */}

      {/* PFS Section (Collapsible and Simplified) */}
      <div className="w-full bg-[#0E1826] rounded-[10px] p-6">
        <SectionHeader title="PFS (Proposal for Settlement)" section="pfs" />
        {expandedSections.pfs && (
          <div className="mt-6 space-y-4">

            {/* --- Recorded PFS List --- */}
            <div>
               <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">Recorded PFS</h3>
                  {/* Add Buttons Container */}
                  <div className="flex gap-2">
                    {/* Add Generate PFS Button */}
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Generate PFS
                    </Button>
                    {/* Add PFS Record Button */}
                    <Button variant="outline" size="sm" className="bg-[#1A2433] border-[#374151] hover:bg-[#243042] text-gray-300">
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Add PFS Record
                    </Button>
                  </div>
               </div>
               <div className="space-y-3">
                  {/* Map over pfsList state */}
                  {pfsList.length > 0 ? (
                    pfsList.map((pfs) => ( // Use pfsList state here
                      <div key={pfs.id} className="bg-[#151F2D] p-3 rounded-lg flex justify-between items-center">
                         <div className="flex items-center gap-3">
                           <FileText className="w-5 h-5 text-blue-400" />
                           <div>
                             <p className="text-white font-medium">{pfs.amount}</p>
                             <p className="text-xs text-gray-400">{pfs.type} - Filed: {pfs.fileDate}</p>
                           </div>
                         </div>
                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                           pfs.status === 'Rejected' || pfs.status === 'Expired' ? 'bg-red-900/50 text-red-400' :
                           pfs.status === 'Accepted' ? 'bg-green-900/50 text-green-400' :
                           pfs.status === 'Served' ? 'bg-blue-900/50 text-blue-400' :
                           'bg-yellow-900/50 text-yellow-400' // Drafting, Pending Signature, Request Approval
                         }`}>
                           {pfs.status}
                         </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm text-center py-4">No PFS recorded.</p>
                  )}
               </div>
            </div>
            {/* --- END Recorded PFS List --- */}
          </div>
        )}
      </div>
      {/* Add more Litigation specific sections here later */}
    </div>
  )
}
