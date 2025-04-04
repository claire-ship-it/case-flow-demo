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
  // Vehicle Information
  vehicle?: {
    year: string
    make: string
    model: string
    color: string
    vin: string
    licensePlate: string
    isClientVehicle: boolean
    driver: {
      name: string
      licenseNumber: string
      insuranceProvider: string
      policyNumber: string
    }
    owner: {
      name: string
      address: string
      phone: string
      relationship: string
    }
    passengers?: {
      name: string
      age: number
      injuries?: string
      seatPosition: string
      isClient: boolean
    }[]
  }
  // Defendant Information
  defendant?: {
    name: string
    address: string
    phone: string
    dateOfBirth: string
    licenseNumber: string
    insuranceProvider: string
    policyNumber: string
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
        insuranceProvider: string
        policyNumber: string
      }
      owner: {
        name: string
        address: string
        phone: string
        relationship: string
      }
      passengers?: {
        name: string
        age: number
        injuries?: string
        seatPosition: string
      }[]
    }
  }
  // Existing fields
  email?: string
  phone?: string
  statusOfLimitation?: string
  caseType?: string
  shortmedicalnarrative?: string
  insurancePolicies?: {
    type: "auto" | "health" | "liability"
    number: string
    provider?: {
      name: string
      logo: string
    }
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
      accidentDescription: string
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
    hasFelon: true,
    liveInRelativeName: "John Smith",
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
    // Vehicle Information
    vehicle: {
      year: "2005",
      make: "Dodge",
      model: "Ram 1500",
      color: "Silver",
      vin: "1D7HA18N85J123456",
      licensePlate: "AL-ABC123",
      isClientVehicle: true,
      driver: {
        name: "John Smith",
        licenseNumber: "AL-12345678",
        insuranceProvider: "State Farm",
        policyNumber: "SF-987654321"
      },
      owner: {
        name: "John Smith",
        address: "1234 Oak Street, Mobile, AL 36602",
        phone: "+1 (251) 213-0267",
        relationship: "Self"
      },
      passengers: [
        {
          name: "Sarah Smith",
          age: 32,
          injuries: "Minor neck pain",
          seatPosition: "Front passenger",
          isClient: false
        },
        {
          name: "Michael Smith",
          age: 8,
          injuries: "None reported",
          seatPosition: "Rear right",
          isClient: false
        }
      ]
    },
    // Defendant Information
    defendant: {
      name: "Jane Doe",
      address: "5678 Maple Avenue, Mobile, AL 36603",
      phone: "+1 (251) 555-9876",
      dateOfBirth: "05/22/1990",
      licenseNumber: "AL-87654321",
      insuranceProvider: "Progressive",
      policyNumber: "PRG-123456789",
      vehicle: {
        year: "2018",
        make: "Toyota",
        model: "Camry",
        color: "Blue",
        vin: "4T1C11AK7JU123456",
        licensePlate: "AL-XYZ789",
        driver: {
          name: "Jane Doe",
          licenseNumber: "AL-87654321",
          insuranceProvider: "Progressive",
          policyNumber: "PRG-123456789"
        },
        owner: {
          name: "Jane Doe",
          address: "5678 Maple Avenue, Mobile, AL 36603",
          phone: "+1 (251) 555-9876",
          relationship: "Self"
        },
        passengers: [
          {
            name: "Robert Johnson",
            age: 45,
            injuries: "None reported",
            seatPosition: "Front passenger"
          }
        ]
      }
    },
    // Existing data
    email: "john.smith@example.com",
    phone: "+1 (251) 213-0267",
    statusOfLimitation: "1/22/2025 GMT",
    caseType: "Auto Accident",
    insurancePolicies: [
      {
        type: "auto",
        number: "AUTO-12345-X89",
        provider: {
          name: "State Farm",
          logo: "/statefarm.jpg"
        }
      },
      {
        type: "health",
        number: "HLTH-98765-B12",
        provider: {
          name: "Progressive",
          logo: "/Progressive-logo.png"
        }
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
        timeOfDay: "Daylight",
        accidentDescription: "V01 was traveling south on Oak Street and was approaching the intersection of Pine Street. V02 was traveling east on Pine Street and was stopped at the intersection of Oak Street. While traveling south D01 attempted to stop at the yellow light, however was unable to do so. As a result, V01 continued to travel in a southerly direction and collided with the rear end of V02. V01 was facing in a southerly direction on Pine Street prior to my arrival. V02 was facing east on Pine Street prior to my arrival."
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