export interface Client {
  id: number
  name: string
  dateOfLoss: string
  dateOfBirth: string
  caseManager: string
  leadAttorney: string
  paralegal: string
  progress: number
  tasksDue: number
  incidentType: "car" | "ladder"
  gender: "male" | "female"
  stage: string
  team: {
    caseManagerGender: "male" | "female"
    leadAttorneyGender: "male" | "female"
    paralegalGender: "male" | "female"
  }
  // Personal Information
  ssn: string
  address: string | "homeless"
  maritalStatus: "single" | "married" | "divorced" | "widowed"
  spouseName?: string
  education: string
  hasFelon: boolean
  liveInRelativeName?: string
  emergencyContact: {
    name: string
    relationship: string
    phone: string
    address: string
  }
  primaryPhone: string
  backupPhone?: string
  primaryEmail: string
  backupEmail?: string
  clientSource: string
  referralPerson?: string
  // Client Perspective
  vehicleDetails?: string
  accidentDescription?: string
  medicalTreatment?: string
  // Existing fields
  email?: string
  phone?: string
  statusOfLimitation?: string
  caseType?: string
  shortmedicalnarrative?: string
  insurancePolicies?: {
    type: "auto" | "health" | "liability"
    number: string
  }[]
  recentTreatments?: {
    provider: string
    type: string
    date: string
  }[]
  crashReport?: {
    documentLink: string
    reportingOfficer: {
      name: string
      badge: string
      department: string
    }
    violations: {
      code: string
      description: string
      severity: string
    }[]
    narrative: {
      summary: string
      weatherConditions: string
      roadConditions: string
      timeOfDay: string
    }
    people: {
      role: "driver" | "passenger" | "witness"
      name: string
      statement?: string
      injuries?: string
    }[]
    liabilityStatement: string
    countyOfIncident: string
  }
}

export const clients: Client[] = [
  {
    id: 1,
    name: "John Smith",
    dateOfBirth: "03/15/1985",
    dateOfLoss: "01/15/2023",
    caseManager: "Michelle O'bonnon",
    leadAttorney: "Craig Astrin",
    paralegal: "Michelle O'bonnon",
    progress: 46,
    tasksDue: 3,
    incidentType: "car",
    stage: "Pre-suit",
    gender: "male",
    team: {
      caseManagerGender: "female",
      leadAttorneyGender: "male",
      paralegalGender: "female",
    },
    // Personal Information
    ssn: "XXX-XX-4321",
    address: "1234 Oak Street, Mobile, AL 36602",
    maritalStatus: "married",
    spouseName: "Sarah Smith",
    education: "Bachelor's Degree",
    hasFelon: false,
    liveInRelativeName: undefined,
    emergencyContact: {
      name: "Mary Smith",
      relationship: "Mother",
      phone: "(251) 555-0123",
      address: "1235 Pine Street, Mobile, AL 36602"
    },
    primaryPhone: "+1 (251) 213-0267",
    backupPhone: "+1 (251) 213-0268",
    primaryEmail: "john.smith@example.com",
    backupEmail: "john.smith.backup@example.com",
    clientSource: "Website",
    referralPerson: "Dr. James Wilson",
    // Client Perspective
    vehicleDetails: "2005. Dodge-   Vehicle T/L.   At home parked",
    accidentDescription: "Rear-ended at intersectionThe client was traveling on hwy 27 S in Frostproof when he struck the rear of a vehicle stalled on the road.   The car had been involved in prior accident, however, it had no lights on and it was 9 to 9:30 pm.k and back pain reported",
    medicalTreatment: "Client was taken via ambulance to Advent Health Hospital Avon Park.     He started to treat at Complete Care in Winter Haven.  He will be going for MRI to Akumin Winter Haven.",
    // Existing data
    email: "john.smith@example.com",
    phone: "+1 (251) 213-0267",
    statusOfLimitation: "1/22/2025 GMT",
    caseType: "Auto Accident",
    insurancePolicies: [
      {
        type: "auto",
        number: "AUTO-12345-X89"
      },
      {
        type: "health",
        number: "HLTH-98765-B12"
      }
    ],
    shortmedicalnarrative: "Ms. Walker is currently undergoing extensive medical treatment, including neurological rehabilitation sessions involving photobiomodulation, neurofeedback, neuromuscular re-education, vestibular rehabilitation, electrical stimulation, and cognitive training. Additionally, Dr. Gruber has recommended surgical procedures including radiofrequency ablations with autologous stem cell transplantation and a right anterior cervical diskectomy at the C5-6 segment.",
    recentTreatments: [
      {
        provider: "Complete Care Winter Haven",
        type: "Physical Therapy",
        date: "03/15/2024"
      },
      {
        provider: "Akumin Winter Haven",
        type: "MRI Scan",
        date: "03/10/2024"
      },
      {
        provider: "Advent Health Hospital Avon Park",
        type: "Emergency Care",
        date: "03/01/2024"
      }
    ],
    crashReport: {
      documentLink: "https://example.com/crash-report-123.pdf",
      reportingOfficer: {
        name: "Officer Michael Johnson",
        badge: "MPD-4567",
        department: "Mobile Police Department"
      },
      violations: [
        {
          code: "32-5A-350",
          description: "Following Too Closely",
          severity: "Class C Misdemeanor"
        },
        {
          code: "32-5A-171",
          description: "Failure to Yield Right of Way",
          severity: "Class C Misdemeanor"
        }
      ],
      narrative: {
        summary: "Vehicle 1 rear-ended Vehicle 2 at intersection of Oak and Pine Street",
        weatherConditions: "Clear",
        roadConditions: "Dry",
        timeOfDay: "Daylight"
      },
      people: [
        {
          role: "driver",
          name: "John Smith",
          statement: "Light turned yellow, vehicle in front stopped suddenly",
          injuries: "Neck and back pain reported"
        },
        {
          role: "driver",
          name: "Jane Doe",
          statement: "Stopped at yellow light, was hit from behind",
          injuries: "None reported"
        },
        {
          role: "witness",
          name: "Tom Wilson",
          statement: "Saw rear vehicle following too closely before collision"
        }
      ],
      liabilityStatement: "Based on physical evidence and witness statements, Vehicle 1 appears to be at fault",
      countyOfIncident: "Mobile County"
    },
  },
  // ... rest of the clients array
] 