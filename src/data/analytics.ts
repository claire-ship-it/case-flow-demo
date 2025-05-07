// Case status metrics
export const statusMetrics = [
  { 
    label: "Presuit", 
    value: 72.97, 
    change: 1.2, 
    trend: "up" 
  },
  { 
    label: "Onboarding", 
    value: 10.81, 
    change: 0.5, 
    trend: "up" 
  },
  { 
    label: "Discharge", 
    value: 8.11, 
    change: 0.3, 
    trend: "up" 
  },
  { 
    label: "Litigation", 
    value: 5.4, 
    change: 0.1, 
    trend: "up" 
  },
  { 
    label: "Fired", 
    value: 2.70, 
    change: 0.2, 
    trend: "down" 
  }
];

// New performance metrics
export const performanceMetrics = [
  {
    label: "Average Case Settlement",
    value: "$45,250",
    rawValue: 45250,
    change: 12.5,
    trend: "up",
    icon: "dollar"
  },
  {
    label: "Average Case Fee",
    value: "$15,775",
    rawValue: 15775,
    change: 8.3,
    trend: "up",
    icon: "dollar"
  },
  {
    label: "Monthly Case Sign ups",
    value: "87",
    rawValue: 87,
    change: 23.4,
    trend: "up",
    icon: "users"
  },
  {
    label: "Average Policy Amount",
    value: "$100,000",
    rawValue: 100000,
    change: 5.2,
    trend: "up",
    icon: "shield"
  }
];

// Case values by phase (stacked bar chart data)
export const caseValuesByPhase = [
  {
    phase: "Presuit",
    emily: 30000,
    craigAllen: 40000,
    caseAttorney: 50000,
    maxMiller: 35000,
    ryanHughes: 25000,
    seanDylan: 20000
  },
  {
    phase: "Litigation",
    emily: 200000,
    craigAllen: 250000,
    caseAttorney: 300000,
    maxMiller: 150000,
    ryanHughes: 120000,
    seanDylan: 80000
  },
  {
    phase: "Post-Settlement",
    emily: 120000,
    craigAllen: 150000,
    caseAttorney: 130000,
    maxMiller: 90000,
    ryanHughes: 70000,
    seanDylan: 40000
  }
];

// Define the color scheme based on provided CSS gradients
export const chartColors = {
  // Purple theme
  purple: {
    main: "#8979FF",
    gradient: "linear-gradient(270deg, #6D5AFF 0%, #9886FF 50%, #BDB0FF 100%)",
    dark: "#3811FF",
    medium: "#5337FF",
    light: "#BDB0FF"
  },
  // Red theme
  red: {
    main: "#FF928A",
    gradient: "linear-gradient(270deg, #FF5950 0%, #FF2C27 50%, #F90002 100%)",
    dark: "#FF100F",
    medium: "#FF5950",
    light: "#FFADAB"
  },
  // Teal theme
  teal: {
    main: "#3CC3DF",
    gradient: "linear-gradient(270deg, #6BCBE7 0%, #40C1E0 50%, #21ABC8 100%)",
    dark: "#125A71",
    medium: "#21ABC8",
    light: "#6BCBE7"
  },
  // Orange theme
  orange: {
    main: "#FFAE4C",
    gradient: "linear-gradient(270deg, #FFAC50 0%, #FFBD7B 50%, #FFC389 100%)",
    dark: "#E17100",
    medium: "#F57E00",
    light: "#FFC389"
  },
  // Blue theme
  blue: {
    main: "#537FF1",
    gradient: "linear-gradient(270deg, #356AEF 0%, #4674F0 50%, #5880F1 100%)",
    dark: "#103DCB",
    medium: "#356AEF",
    light: "#5880F1"
  },
  // Green theme
  green: {
    main: "#10B981",
    gradient: "linear-gradient(270deg, #059669 0%, #10B981 50%, #34D399 100%)",
    dark: "#047857",
    medium: "#059669",
    light: "#34D399"
  }
};

// Team members and colors for legend - using CSS variables
export const teamMembers = [
  { name: "Emily", color: chartColors.purple.main },
  { name: "Craig Allen", color: chartColors.red.main },
  { name: "Case Attorney", color: chartColors.teal.main },
  { name: "Max Miller", color: chartColors.orange.main },
  { name: "Ryan Hughes", color: chartColors.blue.main },
  { name: "Sean Dylan", color: chartColors.purple.dark }
];

// Case status breakdown for pie/donut chart
export const caseStatusBreakdown = [
  { status: "Presuit", value: 130, percentage: 50.78, color: chartColors.blue.main, gradient: chartColors.blue.gradient },
  { status: "Discharge", value: 47, percentage: 18.36, color: chartColors.teal.main, gradient: chartColors.teal.gradient },
  { status: "Litigation", value: 61, percentage: 23.83, color: chartColors.orange.main, gradient: chartColors.orange.gradient },
  { status: "Fired", value: 18, percentage: 7.03, color: chartColors.red.main, gradient: chartColors.red.gradient }
];

// Average case duration data (for line chart)
export const averageCaseDuration = {
  summary: {
    totalFiles: 30,
    firedFiles: 23,
    avgDuration: 70
  },
  trend: [
    { day: 1, duration: 65 },
    { day: 5, duration: 67 },
    { day: 10, duration: 70 },
    { day: 15, duration: 68 },
    { day: 20, duration: 72 },
    { day: 25, duration: 73 },
    { day: 30, duration: 69 },
    { day: 35, duration: 71 },
    { day: 40, duration: 75 },
    { day: 45, duration: 73 },
    { day: 50, duration: 70 }
  ]
};

// Case load data for the table
export interface CaseLoadRow {
  name: string;
  onboarding: number;
  presuit: number;
  litigation: number;
  discharged: number;
  fired: number;
  total: number;
}

export const caseLoadData: CaseLoadRow[] = [
  { 
    name: "(Empty)", 
    onboarding: 8, 
    presuit: 8, 
    litigation: 1, 
    discharged: 2, 
    fired: 1, 
    total: 20 
  },
  { 
    name: "Carmen Lima", 
    onboarding: 0, 
    presuit: 8, 
    litigation: 5, 
    discharged: 0, 
    fired: 0, 
    total: 13 
  },
  { 
    name: "Claire Case Manager", 
    onboarding: 0, 
    presuit: 2, 
    litigation: 0, 
    discharged: 3, 
    fired: 0, 
    total: 5 
  },
  { 
    name: "Michelle O'Donnon", 
    onboarding: 0, 
    presuit: 0, 
    litigation: 0, 
    discharged: 0, 
    fired: 4, 
    total: 4 
  },
  { 
    name: "Denise Del Monte-Pujols", 
    onboarding: 0, 
    presuit: 0, 
    litigation: 1, 
    discharged: 0, 
    fired: 0, 
    total: 1 
  },
  { 
    name: "Michelle O'Donnon", 
    onboarding: 2, 
    presuit: 5, 
    litigation: 2, 
    discharged: 2, 
    fired: 0, 
    total: 11 
  }
];

// Total case load (calculated from the data)
export const totalCaseLoad: CaseLoadRow = {
  name: "Total",
  onboarding: 10,
  presuit: 23,
  litigation: 9,
  discharged: 7,
  fired: 5,
  total: 54
};

// Case status breakdown by person
export type CaseStatusBreakdownPerson = {
  id: string;
  name: string;
  data: {
    status: string;
    value: number;
    percentage: number;
    color: string;
    gradient: string;
  }[];
};

export const caseStatusBreakdownByPerson: CaseStatusBreakdownPerson[] = [
  {
    id: "all",
    name: "All Staff",
    data: caseStatusBreakdown
  },
  {
    id: "carmen",
    name: "Carmen Lima",
    data: [
      { status: "Presuit", value: 52, percentage: 61.9, color: chartColors.blue.main, gradient: chartColors.blue.gradient },
      { status: "Discharge", value: 15, percentage: 17.86, color: chartColors.teal.main, gradient: chartColors.teal.gradient },
      { status: "Litigation", value: 13, percentage: 15.48, color: chartColors.orange.main, gradient: chartColors.orange.gradient },
      { status: "Fired", value: 4, percentage: 4.76, color: chartColors.red.main, gradient: chartColors.red.gradient }
    ]
  },
  {
    id: "claire",
    name: "Claire Case Manager",
    data: [
      { status: "Presuit", value: 24, percentage: 45.28, color: chartColors.blue.main, gradient: chartColors.blue.gradient },
      { status: "Discharge", value: 14, percentage: 26.42, color: chartColors.teal.main, gradient: chartColors.teal.gradient },
      { status: "Litigation", value: 12, percentage: 22.64, color: chartColors.orange.main, gradient: chartColors.orange.gradient },
      { status: "Fired", value: 3, percentage: 5.66, color: chartColors.red.main, gradient: chartColors.red.gradient }
    ]
  },
  {
    id: "michelle",
    name: "Michelle O'Donnon",
    data: [
      { status: "Presuit", value: 32, percentage: 46.38, color: chartColors.blue.main, gradient: chartColors.blue.gradient },
      { status: "Discharge", value: 10, percentage: 14.49, color: chartColors.teal.main, gradient: chartColors.teal.gradient },
      { status: "Litigation", value: 18, percentage: 26.09, color: chartColors.orange.main, gradient: chartColors.orange.gradient },
      { status: "Fired", value: 9, percentage: 13.04, color: chartColors.red.main, gradient: chartColors.red.gradient }
    ]
  },
  {
    id: "denise",
    name: "Denise Del Monte-Pujols",
    data: [
      { status: "Presuit", value: 22, percentage: 48.89, color: chartColors.blue.main, gradient: chartColors.blue.gradient },
      { status: "Discharge", value: 8, percentage: 17.78, color: chartColors.teal.main, gradient: chartColors.teal.gradient },
      { status: "Litigation", value: 13, percentage: 28.89, color: chartColors.orange.main, gradient: chartColors.orange.gradient },
      { status: "Fired", value: 2, percentage: 4.44, color: chartColors.red.main, gradient: chartColors.red.gradient }
    ]
  }
];

// Case types data for pie chart
export type CaseTypeData = {
  id: string;
  name: string;
  data: {
    type: string;
    value: number;
    percentage: number;
    color: string;
    gradient: string;
  }[];
};

export const caseTypesByPerson: CaseTypeData[] = [
  {
    id: "all",
    name: "All Staff",
    data: [
      { 
        type: "Motor Vehicle", 
        value: 142, 
        percentage: 55.47, 
        color: chartColors.blue.main, 
        gradient: chartColors.blue.gradient 
      },
      { 
        type: "Slip and Fall", 
        value: 78, 
        percentage: 30.47, 
        color: chartColors.orange.main, 
        gradient: chartColors.orange.gradient 
      },
      { 
        type: "Medical Malpractice", 
        value: 36, 
        percentage: 14.06, 
        color: chartColors.teal.main, 
        gradient: chartColors.teal.gradient 
      }
    ]
  },
  {
    id: "carmen",
    name: "Carmen Lima",
    data: [
      { 
        type: "Motor Vehicle", 
        value: 42, 
        percentage: 63.64, 
        color: chartColors.blue.main, 
        gradient: chartColors.blue.gradient 
      },
      { 
        type: "Slip and Fall", 
        value: 18, 
        percentage: 27.27, 
        color: chartColors.orange.main, 
        gradient: chartColors.orange.gradient 
      },
      { 
        type: "Medical Malpractice", 
        value: 6, 
        percentage: 9.09, 
        color: chartColors.teal.main, 
        gradient: chartColors.teal.gradient 
      }
    ]
  },
  {
    id: "claire",
    name: "Claire Case Manager",
    data: [
      { 
        type: "Motor Vehicle", 
        value: 35, 
        percentage: 51.47, 
        color: chartColors.blue.main, 
        gradient: chartColors.blue.gradient 
      },
      { 
        type: "Slip and Fall", 
        value: 22, 
        percentage: 32.35, 
        color: chartColors.orange.main, 
        gradient: chartColors.orange.gradient 
      },
      { 
        type: "Medical Malpractice", 
        value: 11, 
        percentage: 16.18, 
        color: chartColors.teal.main, 
        gradient: chartColors.teal.gradient 
      }
    ]
  },
  {
    id: "michelle",
    name: "Michelle O'Donnon",
    data: [
      { 
        type: "Motor Vehicle", 
        value: 38, 
        percentage: 52.78, 
        color: chartColors.blue.main, 
        gradient: chartColors.blue.gradient 
      },
      { 
        type: "Slip and Fall", 
        value: 24, 
        percentage: 33.33, 
        color: chartColors.orange.main, 
        gradient: chartColors.orange.gradient 
      },
      { 
        type: "Medical Malpractice", 
        value: 10, 
        percentage: 13.89, 
        color: chartColors.teal.main, 
        gradient: chartColors.teal.gradient 
      }
    ]
  },
  {
    id: "denise",
    name: "Denise Del Monte-Pujols",
    data: [
      { 
        type: "Motor Vehicle", 
        value: 27, 
        percentage: 54.0, 
        color: chartColors.blue.main, 
        gradient: chartColors.blue.gradient 
      },
      { 
        type: "Slip and Fall", 
        value: 14, 
        percentage: 28.0, 
        color: chartColors.orange.main, 
        gradient: chartColors.orange.gradient 
      },
      { 
        type: "Medical Malpractice", 
        value: 9, 
        percentage: 18.0, 
        color: chartColors.teal.main, 
        gradient: chartColors.teal.gradient 
      }
    ]
  }
];

// Medical treatment types data for pie chart
export type TreatmentTypeData = {
  id: string;
  name: string;
  data: {
    type: string;
    value: number;
    percentage: number;
    color: string;
    gradient: string;
  }[];
};

export const treatmentTypesByPerson: TreatmentTypeData[] = [
  {
    id: "all",
    name: "All Staff",
    data: [
      { 
        type: "Surgery", 
        value: 87, 
        percentage: 29.0, 
        color: chartColors.purple.main, 
        gradient: chartColors.purple.gradient 
      },
      { 
        type: "Physical Therapy", 
        value: 126, 
        percentage: 42.0, 
        color: chartColors.teal.main, 
        gradient: chartColors.teal.gradient 
      },
      { 
        type: "Chiropractor", 
        value: 54, 
        percentage: 18.0, 
        color: chartColors.orange.main, 
        gradient: chartColors.orange.gradient 
      },
      { 
        type: "Pain Management", 
        value: 33, 
        percentage: 11.0, 
        color: chartColors.red.main, 
        gradient: chartColors.red.gradient 
      }
    ]
  },
  {
    id: "carmen",
    name: "Carmen Lima",
    data: [
      { 
        type: "Surgery", 
        value: 22, 
        percentage: 33.33, 
        color: chartColors.purple.main, 
        gradient: chartColors.purple.gradient 
      },
      { 
        type: "Physical Therapy", 
        value: 25, 
        percentage: 37.88, 
        color: chartColors.teal.main, 
        gradient: chartColors.teal.gradient 
      },
      { 
        type: "Chiropractor", 
        value: 12, 
        percentage: 18.18, 
        color: chartColors.orange.main, 
        gradient: chartColors.orange.gradient 
      },
      { 
        type: "Pain Management", 
        value: 7, 
        percentage: 10.61, 
        color: chartColors.red.main, 
        gradient: chartColors.red.gradient 
      }
    ]
  },
  {
    id: "claire",
    name: "Claire Case Manager",
    data: [
      { 
        type: "Surgery", 
        value: 19, 
        percentage: 27.94, 
        color: chartColors.purple.main, 
        gradient: chartColors.purple.gradient 
      },
      { 
        type: "Physical Therapy", 
        value: 31, 
        percentage: 45.59, 
        color: chartColors.teal.main, 
        gradient: chartColors.teal.gradient 
      },
      { 
        type: "Chiropractor", 
        value: 11, 
        percentage: 16.18, 
        color: chartColors.orange.main, 
        gradient: chartColors.orange.gradient 
      },
      { 
        type: "Pain Management", 
        value: 7, 
        percentage: 10.29, 
        color: chartColors.red.main, 
        gradient: chartColors.red.gradient 
      }
    ]
  },
  {
    id: "michelle",
    name: "Michelle O'Donnon",
    data: [
      { 
        type: "Surgery", 
        value: 24, 
        percentage: 33.33, 
        color: chartColors.purple.main, 
        gradient: chartColors.purple.gradient 
      },
      { 
        type: "Physical Therapy", 
        value: 28, 
        percentage: 38.89, 
        color: chartColors.teal.main, 
        gradient: chartColors.teal.gradient 
      },
      { 
        type: "Chiropractor", 
        value: 13, 
        percentage: 18.06, 
        color: chartColors.orange.main, 
        gradient: chartColors.orange.gradient 
      },
      { 
        type: "Pain Management", 
        value: 7, 
        percentage: 9.72, 
        color: chartColors.red.main, 
        gradient: chartColors.red.gradient 
      }
    ]
  },
  {
    id: "denise",
    name: "Denise Del Monte-Pujols",
    data: [
      { 
        type: "Surgery", 
        value: 14, 
        percentage: 28.0, 
        color: chartColors.purple.main, 
        gradient: chartColors.purple.gradient 
      },
      { 
        type: "Physical Therapy", 
        value: 19, 
        percentage: 38.0, 
        color: chartColors.teal.main, 
        gradient: chartColors.teal.gradient 
      },
      { 
        type: "Chiropractor", 
        value: 10, 
        percentage: 20.0, 
        color: chartColors.orange.main, 
        gradient: chartColors.orange.gradient 
      },
      { 
        type: "Pain Management", 
        value: 7, 
        percentage: 14.0, 
        color: chartColors.red.main, 
        gradient: chartColors.red.gradient 
      }
    ]
  }
];
