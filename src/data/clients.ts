export interface Client {
  id: number
  name: string
  email: string
  phone: string
  address: string | "homeless"
  dateOfLoss: string
  caseNumber: string
  status: string
  dateOfBirth: string
  caseManager: string
  ssn: string
  maritalStatus: "single" | "married" | "divorced" | "widowed"
  spouseName?: string
  defendants: Defendant[]
  insurancePolicies: InsurancePolicy[]
  vehicles: Vehicle[]
  medicalProviders: MedicalProvider[]
  medicalRequests: {
    id: number
    type: string
    provider: string
    requestedBy: string
    requestedDate: string
    status: string
    notes: string
  }[]
  tasks: {
    id: number
    title: string
    dueDate: string | null
    responsible: {
      name: string
      role: string
      avatar: string
    }
    status: string
  }[]
  caseLogs: {
    id: number
    title: string
    notes: string
    document: string
    date: string
    type: string
  }[]
  documents: {
    id: number
    title: string
    description: string
    icon: string
  }[]
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
  statusOfLimitation: string
  shortmedicalnarrative: string
  recentTreatments: {
    date: string
    provider: string
    type: string
    description: string
  }[]
  crashReport: {
    narrative: {
      accidentDescription: string
    }
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
    people: {
      name: string
      role: string
      injuries: string[]
      statements: string[]
    }[]
    liabilityStatement: string
    countyOfIncident: string
  }
}

export interface Vehicle {
  id: number
  year: string
  make: string
  model: string
  color: string
  vin: string
  licensePlate: string
  vehicleType: 'car' | 'truck' | 'motorcycle' | 'van'
  isClient: boolean
  driver: {
    name: string
    licenseNumber: string
    phone?: string
    email?: string
    address?: string
    insuranceProvider?: string
    policyNumber?: string
  }
  owner: {
    name: string
    relationship: string
    phone?: string
    email?: string
    address?: string
  }
  insurancePolicies?: InsurancePolicy[]
}

export interface Defendant {
  id: number
  name: string
  role: string
  address: string
  phone: string
  email?: string
  dateOfBirth: string
  licenseNumber: string
  insuranceProvider: string
  policyNumber: string
  defenseCounsel?: {
    name: string
    firmName: string
    address: string
    phone: string
    email: string
  }
}

export interface InsurancePolicy {
  id: number
  type: "UM" | "BI" | "PIP"
  policyType: "UM" | "BI" | "PIP"
  provider: {
    name: string
    logo: string
    type?: string
  }
  policyNumber: string
  claimNumber: string
  limit: string
  expectedSettlement: string
  expectedFirmFee: string
  finalSettlement?: string
  finalFirmFee?: string
  adjuster: {
    name: string
    role: string
    phone: string
    email: string
  }
  contact: {
    address: string
    phone: string
    email: string
    fax?: string
  }
  vehicle: {
    year: string
    make: string
    model: string
    color: string
    vin: string
    licensePlate: string
    driver: {
      name: string
      licenseNumber: string
    }
  }
  defendant: {
    name: string
    role: string
  }
}

export interface MedicalProvider {
  id: number;
  name: string;
  type: string;
  address: string;
  phone: string;
  fax?: string;
  billingInfo: {
    accountNumber: string;
    totalBilled: number;
    totalPaid: number;
    outstandingBalance: number;
    lastPaymentDate?: string;
  };
  visits: {
    id: number;
    date: string;
    type: string;
    notes?: string;
    billedAmount: number;
    paidAmount: number;
    status: 'pending' | 'paid' | 'denied';
    facility: {
      name: string;
      department: string;
      level?: string;
      address: string;
      phone: string;
      fax: string;
      email: string;
    };
    physician: {
      name: string;
      specialty: string;
      credentials: string[];
    };
    treatmentAreas: {
      name: string;
      color: "blue" | "purple" | "green" | "orange";
    }[];
    summary: string;
    description: string;
    cptCodes: {
      code: string;
      description: string;
      amount: number;
    }[];
    documents: {
      type: "record" | "bill";
      name: string;
      date: string;
      link: string;
    }[];
  }[];
  medicalRecords: {
    id: number;
    date: string;
    provider: string;
    type: string;
    description: string;
    injuries: string[];
    recommendations: string;
    additionalNotes?: string;
    billing?: {
      id: number;
      date: string;
      originalBalance: number;
      insurancePayment: number;
      insuranceAdjustment: number;
      firmAdjustment: number;
      outstandingBalance: number;
      cptCodes: {
        code: string;
        description: string;
        amount: number;
      }[];
      documents: {
        type: "record" | "bill";
        name: string;
        date: string;
        link: string;
      }[];
    };
  }[];
}

export const clients: Client[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "(813) 555-1234",
    address: "123 Main St, Tampa, FL 33601",
    dateOfLoss: "03/15/2024",
    caseNumber: "2024-001",
    status: "active",
    dateOfBirth: "01/15/1985",
    caseManager: "Sarah Wilson",
    ssn: "XXX-XX-1234",
    maritalStatus: "married",
    spouseName: "Jane Smith",
    leadAttorney: "Michael Anderson",
    paralegal: "Emily Davis",
    progress: 25,
    tasksDue: 3,
    incidentType: "car",
    gender: "male",
    stage: "Medical Treatment",
    team: {
      caseManagerGender: "female",
      leadAttorneyGender: "male",
      paralegalGender: "female"
    },
    education: "Bachelor's Degree",
    hasFelon: false,
    emergencyContact: {
      name: "Jane Smith",
      relationship: "Spouse",
      phone: "(813) 555-5678",
      address: "123 Main St, Tampa, FL 33601"
    },
    primaryPhone: "(813) 555-1234",
    primaryEmail: "john.smith@email.com",
    clientSource: "Referral",
    referralPerson: "Tom Johnson",
    vehicleDetails: "2020 Toyota Camry",
    accidentDescription: "Rear-ended at intersection",
    medicalTreatment: "Ongoing physical therapy and diagnostic imaging",
    defendants: [
      {
        id: 1,
        name: "Emily Parker",
        role: "Primary Defendant",
        address: "456 Oak Street, Orchard City, CA 90210",
        phone: "(555) 234-5678",
        email: "emily.parker@example.com",
        dateOfBirth: "08/22/1990",
        licenseNumber: "CA-87654321",
        insuranceProvider: "State Farm",
        policyNumber: "SF-123456789",
        defenseCounsel: {
          name: "Robert Smith",
          firmName: "Smith & Associates",
          address: "789 Legal Way, Orchard City, CA 90210",
          phone: "(555) 345-6789",
          email: "robert.smith@smithlaw.com"
        }
      },
      {
        id: 2,
        name: "Jason Miller",
        role: "Secondary Defendant",
        address: "789 Pine Avenue, Orchard City, CA 90210",
        phone: "(555) 345-6789",
        email: "jason.miller@example.com",
        dateOfBirth: "03/15/1985",
        licenseNumber: "CA-98765432",
        insuranceProvider: "Progressive",
        policyNumber: "PRG-456789123",
        defenseCounsel: {
          name: "Jennifer Wilson",
          firmName: "Wilson Legal Group",
          address: "321 Court Street, Orchard City, CA 90210",
          phone: "(555) 456-7890",
          email: "jennifer.wilson@wilsonlegal.com"
        }
      }
    ],
    insurancePolicies: [
      {
        id: 1,
        type: "UM",
        policyType: "UM",
        provider: {
          name: "Geico",
          logo: "/logo/geico.png"
        },
        policyNumber: "GEICO-987654321",
        claimNumber: "CLM-123456",
        limit: "$50,000",
        expectedSettlement: "$35,000",
        expectedFirmFee: "$11,666",
        adjuster: {
          name: "David Thompson",
          role: "Senior Claims Adjuster",
          phone: "(555) 123-4567",
          email: "david.thompson@geico.com"
        },
        contact: {
          address: "123 Insurance Way, Orchard City, CA 90210",
          phone: "(800) 555-1234",
          email: "claims@geico.com",
          fax: "(800) 555-5678"
        },
        vehicle: {
          year: "2020",
          make: "Dodge",
          model: "Ram 1500",
          color: "Black",
          vin: "1D7HA18N85J123456",
          licensePlate: "CA-APP123",
          driver: {
            name: "John Smith",
            licenseNumber: "CA-12345678"
          }
        },
        defendant: {
          name: "John Smith",
          role: "Client"
        }
      },
      {
        id: 2,
        type: "BI",
        policyType: "BI",
        provider: {
          name: "State Farm",
          logo: "/statefarm-logo.png"
        },
        policyNumber: "SF-123456789",
        claimNumber: "CLM-789012",
        limit: "$100,000",
        expectedSettlement: "$75,000",
        expectedFirmFee: "$25,000",
        adjuster: {
          name: "Sarah Johnson",
          role: "Claims Adjuster",
          phone: "(555) 234-5678",
          email: "sarah.johnson@statefarm.com"
        },
        contact: {
          address: "456 Insurance Blvd, Orchard City, CA 90210",
          phone: "(800) 555-2345",
          email: "claims@statefarm.com",
          fax: "(800) 555-6789"
        },
        vehicle: {
          year: "2019",
          make: "Toyota",
          model: "Camry",
          color: "Silver",
          vin: "4T1C11AK7JU123456",
          licensePlate: "CA-EMI456",
          driver: {
            name: "Emily Parker",
            licenseNumber: "CA-87654321"
          }
        },
        defendant: {
          name: "Emily Parker",
          role: "Primary Defendant"
        }
      },
      {
        id: 3,
        type: "BI",
        policyType: "BI",
        provider: {
          name: "Progressive",
          logo: "/progressive-logo.png"
        },
        policyNumber: "PRG-456789123",
        claimNumber: "CLM-345678",
        limit: "$75,000",
        expectedSettlement: "$50,000",
        expectedFirmFee: "$16,666",
        adjuster: {
          name: "Michael Brown",
          role: "Senior Claims Adjuster",
          phone: "(555) 345-6789",
          email: "michael.brown@progressive.com"
        },
        contact: {
          address: "789 Insurance Ave, Orchard City, CA 90210",
          phone: "(800) 555-3456",
          email: "claims@progressive.com",
          fax: "(800) 555-7890"
        },
        vehicle: {
          year: "2021",
          make: "Chevrolet",
          model: "Suburban",
          color: "White",
          vin: "1GNSKJKC8MR123456",
          licensePlate: "CA-JAS789",
          driver: {
            name: "Jason Miller",
            licenseNumber: "CA-98765432"
          }
        },
        defendant: {
          name: "Jason Miller",
          role: "Secondary Defendant"
        }
      }
    ],
    vehicles: [
      {
        id: 1,
        year: "2020",
        make: "Dodge",
        model: "Ram 1500",
        color: "Black",
        vin: "1D7HA18N85J123456",
        licensePlate: "CA-APP123",
        vehicleType: "truck",
        isClient: true,
        driver: {
          name: "John Smith",
          licenseNumber: "CA-12345678"
        },
        owner: {
          name: "John Smith",
          relationship: "Owner"
        }
      },
      {
        id: 2,
        year: "2019",
        make: "Toyota",
        model: "Camry",
        color: "Silver",
        vin: "4T1C11AK7JU123456",
        licensePlate: "CA-EMI456",
        vehicleType: "car",
        isClient: false,
        driver: {
          name: "Emily Parker",
          licenseNumber: "CA-87654321"
        },
        owner: {
          name: "Emily Parker",
          relationship: "Owner"
        }
      },
      {
        id: 3,
        year: "2021",
        make: "Chevrolet",
        model: "Suburban",
        color: "White",
        vin: "1GNSKJKC8MR123456",
        licensePlate: "CA-JAS789",
        vehicleType: "truck",
        isClient: false,
        driver: {
          name: "Jason Miller",
          licenseNumber: "CA-98765432"
        },
        owner: {
          name: "Jason Miller",
          relationship: "Owner"
        }
      }
    ],
    medicalProviders: [
      {
        id: 1,
        name: "Advent Health Surgery Center",
        type: "Surgery Center",
        address: "3100 E. Fletcher Ave, Tampa, FL 33613",
        phone: "(813) 971-6000",
        fax: "(813) 971-6001",
        billingInfo: {
          accountNumber: "AHSC-12345",
          totalBilled: 2500.00,
          totalPaid: 0.00,
          outstandingBalance: 2500.00
        },
        visits: [
          {
            id: 1,
            date: "03/16/2024",
            type: "Initial Consultation",
            notes: "Post-accident evaluation and treatment planning",
            billedAmount: 2500.00,
            paidAmount: 0.00,
            status: "pending",
            facility: {
              name: "Advent Health Surgery Center",
              department: "Orthopedics",
              level: "Outpatient",
              address: "3100 E. Fletcher Ave, Tampa, FL 33613",
              phone: "(813) 971-6000",
              fax: "(813) 971-6001",
              email: "records@adventhealth-fletcher.com"
            },
            physician: {
              name: "Dr. Sarah Johnson, MD",
              specialty: "Orthopedic Surgery",
              credentials: ["Board Certified"]
            },
            treatmentAreas: [
              { name: "Orthopedics", color: "blue" },
              { name: "Surgery", color: "purple" }
            ],
            summary: "Initial consultation for post-accident evaluation and treatment planning",
            description: "Patient presented with acute injuries following MVA. Recommended treatment plan developed.",
            cptCodes: [
              { code: "99203", description: "Office visit, new patient", amount: 250.00 }
            ],
            documents: []
          }
        ],
        medicalRecords: []
      },
      {
        id: 2,
        name: "Active Wellness & Rehabilitation Center",
        type: "Physical Therapy",
        address: "2205 N West Shore Blvd, Tampa, FL 33607",
        phone: "(813) 555-0123",
        fax: "(813) 555-0124",
        billingInfo: {
          accountNumber: "AWR-67890",
          totalBilled: 2000.00,
          totalPaid: 0.00,
          outstandingBalance: 2000.00
        },
        visits: [
          {
            id: 1,
            date: "03/17/2024",
            type: "Physical Therapy",
            notes: "Initial assessment and treatment plan",
            billedAmount: 500.00,
            paidAmount: 0.00,
            status: "pending",
            facility: {
              name: "Active Wellness & Rehabilitation Center",
              department: "Physical Therapy",
              level: "Outpatient",
              address: "2205 N West Shore Blvd, Tampa, FL 33607",
              phone: "(813) 555-0123",
              fax: "(813) 555-0124",
              email: "records@activewellness.com"
            },
            physician: {
              name: "Dr. Michael Chen, DPT",
              specialty: "Physical Therapy",
              credentials: ["Board Certified", "Manual Therapy Certified"]
            },
            treatmentAreas: [
              { name: "Physical Therapy", color: "blue" },
              { name: "Rehabilitation", color: "green" }
            ],
            summary: "Initial physical therapy evaluation and treatment plan",
            description: "Patient began comprehensive physical therapy program for post-accident rehabilitation",
            cptCodes: [
              { code: "97110", description: "Therapeutic exercise", amount: 150.00 },
              { code: "97140", description: "Manual therapy", amount: 150.00 }
            ],
            documents: []
          },
          {
            id: 2,
            date: "03/20/2024",
            type: "Physical Therapy",
            notes: "Follow-up session",
            billedAmount: 500.00,
            paidAmount: 0.00,
            status: "pending",
            facility: {
              name: "Active Wellness & Rehabilitation Center",
              department: "Physical Therapy",
              level: "Outpatient",
              address: "2205 N West Shore Blvd, Tampa, FL 33607",
              phone: "(813) 555-0123",
              fax: "(813) 555-0124",
              email: "records@activewellness.com"
            },
            physician: {
              name: "Dr. Michael Chen, DPT",
              specialty: "Physical Therapy",
              credentials: ["Board Certified", "Manual Therapy Certified"]
            },
            treatmentAreas: [
              { name: "Physical Therapy", color: "blue" },
              { name: "Rehabilitation", color: "green" }
            ],
            summary: "Follow-up physical therapy session",
            description: "Continued physical therapy treatment focusing on range of motion and strength",
            cptCodes: [
              { code: "97110", description: "Therapeutic exercise", amount: 150.00 },
              { code: "97140", description: "Manual therapy", amount: 150.00 }
            ],
            documents: []
          },
          {
            id: 3,
            date: "03/24/2024",
            type: "Physical Therapy",
            notes: "Progress evaluation",
            billedAmount: 500.00,
            paidAmount: 0.00,
            status: "pending",
            facility: {
              name: "Active Wellness & Rehabilitation Center",
              department: "Physical Therapy",
              level: "Outpatient",
              address: "2205 N West Shore Blvd, Tampa, FL 33607",
              phone: "(813) 555-0123",
              fax: "(813) 555-0124",
              email: "records@activewellness.com"
            },
            physician: {
              name: "Dr. Michael Chen, DPT",
              specialty: "Physical Therapy",
              credentials: ["Board Certified", "Manual Therapy Certified"]
            },
            treatmentAreas: [
              { name: "Physical Therapy", color: "blue" },
              { name: "Rehabilitation", color: "green" }
            ],
            summary: "Progress evaluation session",
            description: "Assessment of treatment progress and adjustment of therapy plan",
            cptCodes: [
              { code: "97110", description: "Therapeutic exercise", amount: 150.00 },
              { code: "97140", description: "Manual therapy", amount: 150.00 }
            ],
            documents: []
          },
          {
            id: 4,
            date: "03/27/2024",
            type: "Physical Therapy",
            notes: "Treatment session",
            billedAmount: 500.00,
            paidAmount: 0.00,
            status: "pending",
            facility: {
              name: "Active Wellness & Rehabilitation Center",
              department: "Physical Therapy",
              level: "Outpatient",
              address: "2205 N West Shore Blvd, Tampa, FL 33607",
              phone: "(813) 555-0123",
              fax: "(813) 555-0124",
              email: "records@activewellness.com"
            },
            physician: {
              name: "Dr. Michael Chen, DPT",
              specialty: "Physical Therapy",
              credentials: ["Board Certified", "Manual Therapy Certified"]
            },
            treatmentAreas: [
              { name: "Physical Therapy", color: "blue" },
              { name: "Rehabilitation", color: "green" }
            ],
            summary: "Treatment session",
            description: "Continued physical therapy focusing on functional recovery",
            cptCodes: [
              { code: "97110", description: "Therapeutic exercise", amount: 150.00 },
              { code: "97140", description: "Manual therapy", amount: 150.00 }
            ],
            documents: []
          }
        ],
        medicalRecords: []
      },
      {
        id: 3,
        name: "Tampa Bay Imaging",
        type: "Imaging Center",
        address: "4600 N Habana Ave, Tampa, FL 33614",
        phone: "(813) 555-0125",
        fax: "(813) 555-0126",
        billingInfo: {
          accountNumber: "TBI-34567",
          totalBilled: 3000.00,
          totalPaid: 0.00,
          outstandingBalance: 3000.00
        },
        visits: [
          {
            id: 1,
            date: "03/15/2024",
            type: "X-Ray",
            notes: "Initial injury assessment",
            billedAmount: 1000.00,
            paidAmount: 0.00,
            status: "pending",
            facility: {
              name: "Tampa Bay Imaging",
              department: "Radiology",
              level: "Advanced Imaging",
              address: "4600 N Habana Ave, Tampa, FL 33614",
              phone: "(813) 555-0125",
              fax: "(813) 555-0126",
              email: "records@tampabayimaging.com"
            },
            physician: {
              name: "Dr. Emily Rodriguez, MD",
              specialty: "Radiology",
              credentials: ["Board Certified", "Neuroradiology Fellowship"]
            },
            treatmentAreas: [
              { name: "Radiology", color: "blue" },
              { name: "Diagnostic Imaging", color: "purple" }
            ],
            summary: "Initial diagnostic imaging for injury assessment",
            description: "X-ray studies performed to evaluate acute injuries",
            cptCodes: [
              { code: "72040", description: "X-ray exam of neck spine", amount: 250.00 }
            ],
            documents: []
          },
          {
            id: 2,
            date: "03/18/2024",
            type: "MRI",
            notes: "Follow-up imaging for soft tissue damage",
            billedAmount: 2000.00,
            paidAmount: 0.00,
            status: "pending",
            facility: {
              name: "Tampa Bay Imaging",
              department: "Radiology",
              level: "Advanced Imaging",
              address: "4600 N Habana Ave, Tampa, FL 33614",
              phone: "(813) 555-0125",
              fax: "(813) 555-0126",
              email: "records@tampabayimaging.com"
            },
            physician: {
              name: "Dr. Emily Rodriguez, MD",
              specialty: "Radiology",
              credentials: ["Board Certified", "Neuroradiology Fellowship"]
            },
            treatmentAreas: [
              { name: "Radiology", color: "blue" },
              { name: "Diagnostic Imaging", color: "purple" }
            ],
            summary: "MRI for soft tissue evaluation",
            description: "MRI studies performed to assess soft tissue damage and internal injuries",
            cptCodes: [
              { code: "72141", description: "MRI cervical spine w/o dye", amount: 1000.00 }
            ],
            documents: []
          }
        ],
        medicalRecords: []
      }
    ],
    medicalRequests: [
      {
        id: 1,
        type: "Medical Records Request",
        provider: "Advent Health Surgery Center",
        requestedBy: "Emily Davis",
        requestedDate: "03/16/2024",
        status: "pending",
        notes: "Initial records request sent"
      }
    ],
    tasks: [
      {
        id: 1,
        title: "Follow up on medical records request",
        dueDate: "03/23/2024",
        responsible: {
          name: "Emily Davis",
          role: "Paralegal",
          avatar: "/avatars/emily.jpg"
        },
        status: "pending"
      }
    ],
    caseLogs: [
      {
        id: 1,
        title: "Initial Client Meeting",
        notes: "Met with client to discuss case details and treatment plan",
        document: "initial-meeting-notes.pdf",
        date: "03/16/2024",
        type: "meeting"
      }
    ],
    documents: [
      {
        id: 1,
        title: "Client Intake Form",
        description: "Completed intake documentation",
        icon: "📄"
      },
      {
        id: 2,
        title: "State Farm - Declaration Pages",
        description: "Insurance policy declaration pages for Emily Parker's vehicle",
        icon: "📋"
      },
      {
        id: 3,
        title: "Progressive - Declaration Pages",
        description: "Insurance policy declaration pages for Jason Miller's vehicle",
        icon: "📋"
      },
      {
        id: 4,
        title: "Geico - Declaration Pages",
        description: "Insurance policy declaration pages for client's UM coverage",
        icon: "📋"
      },
      {
        id: 5,
        title: "Medical Records Release",
        description: "Signed authorization for release of medical records",
        icon: "📝"
      },
      {
        id: 6,
        title: "Police Report",
        description: "Official accident report from responding officers",
        icon: "🚔"
      }
    ],
    statusOfLimitation: "03/15/2026",
    shortmedicalnarrative: "Patient has received comprehensive medical care from multiple providers. Star Orthopedic (10/12/2022): Dr. Park noted limited range of motion in cervical and lumbar spine, muscle spasms, tenderness, and positive straight leg raise test. TBI (01/18/2022): Dr. Vilims documented post-concussive symptoms including headaches, dizziness, memory difficulties, and neck pain. Associates MD (11/30/2022): Documented cervical, thoracic, and lumbar spine tenderness, muscle spasms, and decreased range of motion. Treatment plans include physical therapy, medication management, vestibular rehabilitation, cognitive rehabilitation, and further diagnostic imaging.",
    recentTreatments: [
      {
        date: "03/27/2024",
        provider: "Active Wellness & Rehabilitation Center",
        type: "Physical Therapy",
        description: "Treatment session focusing on functional recovery"
      },
      {
        date: "03/24/2024",
        provider: "Active Wellness & Rehabilitation Center",
        type: "Physical Therapy",
        description: "Progress evaluation and adjustment of therapy plan"
      },
      {
        date: "03/18/2024",
        provider: "Tampa Bay Imaging",
        type: "MRI",
        description: "Follow-up imaging for soft tissue damage"
      }
    ],
    crashReport: {
      narrative: {
        accidentDescription: "Client was traveling eastbound on Fletcher Avenue when defendant ran a red light at the intersection with Bruce B Downs Boulevard, causing a T-bone collision. The impact occurred on the passenger side of client's vehicle. Client was wearing a seatbelt and airbags deployed. Emergency services were called to the scene."
      },
      documentLink: "/documents/crash-report-2024-001.pdf",
      reportingOfficer: {
        name: "Officer Michael Rodriguez",
        badge: "T-4567",
        department: "Tampa Police Department"
      },
      violations: [
        {
          code: "316.074(1)",
          description: "Failure to stop at a red light",
          severity: "Moving Violation"
        },
        {
          code: "316.1925(1)",
          description: "Careless driving",
          severity: "Moving Violation"
        }
      ],
      people: [
        {
          name: "John Smith",
          role: "Driver",
          injuries: ["Cervical strain", "Post-traumatic headaches", "Thoracic muscle strain"],
          statements: ["I had the green light when the other car ran the red light and hit me."]
        },
        {
          name: "Emily Parker",
          role: "Driver",
          injuries: ["None reported"],
          statements: ["I thought I had enough time to make it through the intersection."]
        }
      ],
      liabilityStatement: "The subject crash occurred on March 15, 2024, at approximately 10:30 AM, at the intersection of Fletcher Avenue and Bruce B Downs Boulevard. Vehicle 1, operated by Emily Parker (the defendant), was traveling northbound on Bruce B Downs Boulevard, while Vehicle 2, driven by John Smith, was traveling eastbound on Fletcher Avenue in the through lane. The defendant failed to stop at a red light, proceeding through the intersection and causing a T-bone collision with Mr. Smith's vehicle. The defendant was cited for failing to stop at a red light and careless driving. Mr. Smith was properly restrained, operating his vehicle lawfully with a green light, and no citations were issued against him. Liability rests solely with the defendant due to their failure to stop at the red light, and no liability rests with John Smith.",
      countyOfIncident: "Hillsborough"
    }
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "(813) 555-5678",
    address: "456 Oak Ave, Tampa, FL 33602",
    dateOfLoss: "03/20/2024",
    caseNumber: "2024-002",
    status: "active",
    dateOfBirth: "05/22/1990",
    caseManager: "David Wilson",
    ssn: "XXX-XX-5678",
    maritalStatus: "single",
    leadAttorney: "Michael Anderson",
    paralegal: "Emily Davis",
    progress: 45,
    tasksDue: 2,
    incidentType: "ladder",
    gender: "female",
    stage: "Medical Treatment",
    team: {
      caseManagerGender: "male",
      leadAttorneyGender: "male",
      paralegalGender: "female"
    },
    education: "Master's Degree",
    hasFelon: false,
    emergencyContact: {
      name: "Robert Johnson",
      relationship: "Father",
      phone: "(813) 555-9012",
      address: "456 Oak Ave, Tampa, FL 33602"
    },
    primaryPhone: "(813) 555-5678",
    primaryEmail: "sarah.johnson@email.com",
    clientSource: "Online",
    vehicleDetails: "N/A",
    accidentDescription: "Fell from ladder while cleaning gutters",
    medicalTreatment: "Ongoing physical therapy and chiropractic care",
    defendants: [
      {
        id: 1,
        name: "Home Depot",
        role: "Primary Defendant",
        address: "789 Retail Way, Tampa, FL 33603",
        phone: "(813) 555-3456",
        email: "legal@homedepot.com",
        dateOfBirth: "N/A",
        licenseNumber: "N/A",
        insuranceProvider: "Liberty Mutual",
        policyNumber: "LM-987654321",
        defenseCounsel: {
          name: "Jennifer Wilson",
          firmName: "Wilson Legal Group",
          address: "321 Court Street, Tampa, FL 33602",
          phone: "(813) 555-7890",
          email: "jennifer.wilson@wilsonlegal.com"
        }
      }
    ],
    insurancePolicies: [
      {
        id: 1,
        type: "UM",
        policyType: "UM",
        provider: {
          name: "Progressive",
          logo: "/logo/progressive.png"
        },
        policyNumber: "PROG-123456789",
        claimNumber: "CLM-789012",
        limit: "$100,000",
        expectedSettlement: "$75,000",
        expectedFirmFee: "$25,000",
        adjuster: {
          name: "Lisa Thompson",
          role: "Senior Claims Adjuster",
          phone: "(813) 555-2345",
          email: "lisa.thompson@progressive.com"
        },
        contact: {
          address: "123 Insurance Way, Tampa, FL 33602",
          phone: "(800) 555-1234",
          email: "claims@progressive.com",
          fax: "(800) 555-5678"
        },
        vehicle: {
          year: "N/A",
          make: "N/A",
          model: "N/A",
          color: "N/A",
          vin: "N/A",
          licensePlate: "N/A",
          driver: {
            name: "Sarah Johnson",
            licenseNumber: "FL-98765432"
          }
        },
        defendant: {
          name: "Sarah Johnson",
          role: "Client"
        }
      }
    ],
    vehicles: [],
    medicalProviders: [
      {
        id: 1,
        name: "Tampa General Hospital",
        type: "Hospital",
        address: "1 Tampa General Circle, Tampa, FL 33606",
        phone: "(813) 844-7000",
        fax: "(813) 844-7001",
        billingInfo: {
          accountNumber: "TGH-67890",
          totalBilled: 5000.00,
          totalPaid: 0.00,
          outstandingBalance: 5000.00
        },
        visits: [
          {
            id: 1,
            date: "03/20/2024",
            type: "Emergency Room",
            notes: "Initial injury assessment",
            billedAmount: 5000.00,
            paidAmount: 0.00,
            status: "pending",
            facility: {
              name: "Tampa General Hospital",
              department: "Emergency",
              level: "Emergency",
              address: "1 Tampa General Circle, Tampa, FL 33606",
              phone: "(813) 844-7000",
              fax: "(813) 844-7001",
              email: "records@tgh.org"
            },
            physician: {
              name: "Dr. James Wilson, MD",
              specialty: "Emergency Medicine",
              credentials: ["Board Certified"]
            },
            treatmentAreas: [
              { name: "Emergency", color: "orange" },
              { name: "Orthopedics", color: "blue" }
            ],
            summary: "Emergency room visit for ladder fall injuries",
            description: "Patient presented with back and shoulder injuries following a fall from a ladder",
            cptCodes: [
              { code: "99284", description: "Emergency department visit", amount: 500.00 }
            ],
            documents: []
          }
        ],
        medicalRecords: []
      },
      {
        id: 2,
        name: "Tampa Bay Chiropractic",
        type: "Chiropractic",
        address: "123 Wellness Way, Tampa, FL 33602",
        phone: "(813) 555-0123",
        fax: "(813) 555-0124",
        billingInfo: {
          accountNumber: "TBC-12345",
          totalBilled: 2000.00,
          totalPaid: 0.00,
          outstandingBalance: 2000.00
        },
        visits: [
          {
            id: 1,
            date: "03/22/2024",
            type: "Initial Consultation",
            notes: "Initial chiropractic evaluation",
            billedAmount: 2000.00,
            paidAmount: 0.00,
            status: "pending",
            facility: {
              name: "Tampa Bay Chiropractic",
              department: "Chiropractic",
              level: "Outpatient",
              address: "123 Wellness Way, Tampa, FL 33602",
              phone: "(813) 555-0123",
              fax: "(813) 555-0124",
              email: "records@tampabaychiro.com"
            },
            physician: {
              name: "Dr. Michael Chen, DC",
              specialty: "Chiropractic",
              credentials: ["Board Certified"]
            },
            treatmentAreas: [
              { name: "Chiropractic", color: "green" },
              { name: "Rehabilitation", color: "blue" }
            ],
            summary: "Initial chiropractic consultation",
            description: "Patient began chiropractic treatment for back and shoulder injuries",
            cptCodes: [
              { code: "98940", description: "Chiropractic manipulative treatment", amount: 150.00 }
            ],
            documents: []
          }
        ],
        medicalRecords: []
      }
    ],
    medicalRequests: [
      {
        id: 1,
        type: "Medical Records Request",
        provider: "Tampa General Hospital",
        requestedBy: "Emily Davis",
        requestedDate: "03/21/2024",
        status: "pending",
        notes: "Initial records request sent"
      }
    ],
    tasks: [
      {
        id: 1,
        title: "Follow up on medical records request",
        dueDate: "03/28/2024",
        responsible: {
          name: "Emily Davis",
          role: "Paralegal",
          avatar: "/avatars/emily.jpg"
        },
        status: "pending"
      }
    ],
    caseLogs: [
      {
        id: 1,
        title: "Initial Client Meeting",
        notes: "Met with client to discuss case details and treatment plan",
        document: "initial-meeting-notes.pdf",
        date: "03/21/2024",
        type: "meeting"
      }
    ],
    documents: [
      {
        id: 1,
        title: "Client Intake Form",
        description: "Completed intake documentation",
        icon: "📄"
      },
      {
        id: 2,
        title: "Progressive - Declaration Pages",
        description: "Insurance policy declaration pages",
        icon: "📋"
      },
      {
        id: 3,
        title: "Medical Records Release",
        description: "Signed authorization for release of medical records",
        icon: "📝"
      },
      {
        id: 4,
        title: "Incident Report",
        description: "Official incident report from Home Depot",
        icon: "📋"
      }
    ],
    statusOfLimitation: "03/20/2026",
    shortmedicalnarrative: "Client sustained back and shoulder injuries from a fall while cleaning gutters. Currently undergoing chiropractic treatment and physical therapy.",
    recentTreatments: [
      {
        date: "03/22/2024",
        provider: "Tampa Bay Chiropractic",
        type: "Chiropractic",
        description: "Initial chiropractic evaluation and treatment"
      },
      {
        date: "03/20/2024",
        provider: "Tampa General Hospital",
        type: "Emergency Room",
        description: "Emergency room visit for initial injury assessment"
      }
    ],
    crashReport: {
      narrative: {
        accidentDescription: "Client was cleaning gutters at her residence when the ladder she was using collapsed, causing her to fall approximately 10 feet to the ground. The ladder was recently purchased from Home Depot and was being used according to manufacturer instructions."
      },
      documentLink: "/documents/incident-report-2024-002.pdf",
      reportingOfficer: {
        name: "Officer Sarah Martinez",
        badge: "T-5678",
        department: "Tampa Police Department"
      },
      violations: [],
      people: [
        {
          name: "Sarah Johnson",
          role: "Victim",
          injuries: ["Back strain", "Shoulder injury", "Minor contusions"],
          statements: ["I was using the ladder according to the instructions when it suddenly collapsed."]
        }
      ],
      liabilityStatement: "The incident occurred on March 20, 2024, at approximately 2:30 PM, at the client's residence. The client was using a ladder purchased from Home Depot to clean gutters when the ladder collapsed, causing her to fall approximately 10 feet. The ladder was being used according to manufacturer instructions and was less than 6 months old. The incident was reported to Home Depot, and an investigation is ongoing regarding potential product defects. Liability may rest with Home Depot due to potential product defects, and no liability rests with Sarah Johnson as she was using the product as intended.",
      countyOfIncident: "Hillsborough"
    }
  }
] 