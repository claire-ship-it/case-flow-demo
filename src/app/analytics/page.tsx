"use client";

import { Card } from "@/components/ui/card";
import { Sidebar } from "@/components/navigation";
import { 
  ChevronLeft, 
  FilterIcon, 
  DollarSign, 
  Users, 
  Shield,
  ChevronDown,
  UserIcon,
  TrendingUp
} from "lucide-react";
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LabelList,
  Sector
} from "recharts";
import { useState, useCallback } from "react";
import { 
  statusMetrics, 
  performanceMetrics,
  caseValuesByPhase, 
  teamMembers, 
  caseStatusBreakdown,
  caseStatusBreakdownByPerson,
  averageCaseDuration,
  caseLoadData,
  totalCaseLoad,
  chartColors,
  caseTypesByPerson,
  treatmentTypesByPerson
} from "@/data/analytics";

// Custom CSS for 3D effect
const pieChartStyles = {
  container: {
    position: 'relative',
    perspective: '1200px',
    transformStyle: 'preserve-3d',
    height: '350px',
  } as React.CSSProperties,
  chart: {
    transform: 'rotateX(60deg) rotateZ(-15deg)',
    transformOrigin: 'center center',
    filter: 'drop-shadow(0px 20px 15px rgba(0, 0, 0, 0.7))',
    transition: 'transform 0.5s ease, filter 0.5s ease',
    ':hover': {
      transform: 'rotateX(55deg) rotateZ(-5deg)',
    }
  } as React.CSSProperties,
  cell: {
    filter: 'drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.4))',
    transition: 'transform 0.3s ease, filter 0.3s ease',
  } as React.CSSProperties,
  activeSector: {
    transform: 'translateY(-10px)',
    filter: 'drop-shadow(4px 8px 12px rgba(0, 0, 0, 0.6))',
  } as React.CSSProperties
};

// Custom Styled Title component
const GradientTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xl font-bold mb-4" style={{
    background: 'linear-gradient(90deg, #fff, #bbb)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block'
  }}>
    {children}
  </h3>
);

// Transform the data for the stacked bar chart
const transformedCaseValues = caseValuesByPhase.map(item => ({
  name: item.phase,
  emily: item.emily,
  craigAllen: item.craigAllen,
  caseAttorney: item.caseAttorney,
  maxMiller: item.maxMiller,
  ryanHughes: item.ryanHughes,
  seanDylan: item.seanDylan
}));

// Helper function to get icon based on metric type
const getMetricIcon = (iconType: string) => {
  switch (iconType) {
    case 'dollar':
      return <DollarSign size={18} className="text-green-400" />;
    case 'users':
      return <Users size={18} className="text-blue-400" />;
    case 'shield':
      return <Shield size={18} className="text-purple-400" />;
    default:
      return <DollarSign size={18} className="text-green-400" />;
  }
};

// Filter performance metrics by staff member (simplified for demo)
const getFilteredPerformanceMetrics = (staffId: string) => {
  if (staffId === "all") return performanceMetrics;
  
  // Apply a staff-specific adjustment to the metrics
  // In a real app, you would have per-staff metrics in your data
  const staffAdjustmentFactors: Record<string, number> = {
    "carmen": 1.2,
    "claire": 0.9,
    "michelle": 1.1,
    "denise": 0.95
  };
  
  const factor = staffAdjustmentFactors[staffId] || 1;
  
  return performanceMetrics.map(metric => ({
    ...metric,
    value: metric.label.includes("Case") ? 
      `$${Math.round(parseInt(metric.value.replace(/[^0-9]/g, '')) * factor).toLocaleString()}` : 
      `${Math.round(parseInt(metric.value) * factor)}`,
    change: +(metric.change * (Math.random() > 0.5 ? 0.9 : 1.1)).toFixed(1),
  }));
};

// Get filtered case values data for bar chart
const getFilteredCaseValues = (staffId: string) => {
  if (staffId === "all") {
    // Aggregate values for all staff members
    return transformedCaseValues.map(item => {
      // Sum all staff values for each phase
      const total = Object.keys(item)
        .filter(key => key !== 'name')
        .reduce((sum, key) => sum + (item[key as keyof typeof item] as number), 0);
      
      return {
        name: item.name,
        total: total
      };
    });
  }
  
  // Map staff ID to the corresponding data key
  const staffKeyMap: Record<string, string> = {
    "carmen": "emily",
    "claire": "craigAllen",
    "michelle": "caseAttorney",
    "denise": "maxMiller"
  };
  
  const staffKey = staffKeyMap[staffId];
  if (!staffKey) return transformedCaseValues;
  
  // Create filtered data showing only the selected staff member
  return transformedCaseValues.map(item => ({
    name: item.name,
    [staffKey]: item[staffKey as keyof typeof item] as number
  }));
};

// Custom value label for bar chart
const BarLabel = (props: any) => {
  const { x, y, width, height, value } = props;
  // Only show label if value is significant
  if (value < 5) return null;
  
  // Format value to display in K or M with dollar sign
  const formattedValue = formatCurrency(value);
  
  return (
    <text 
      x={x + width / 2} 
      y={y - 10} 
      fill="white" 
      textAnchor="middle" 
      dominantBaseline="middle"
      fontSize={14}
      fontWeight="bold"
      filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.5))"
    >
      {formattedValue}
    </text>
  );
};

// Helper function to format currency values based on magnitude
const formatCurrency = (value: number): string => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}K`;
  } else {
    return `$${value}`;
  }
};

// Function to create radial gradient definitions
const createRadialGradients = (data: any[], idPrefix: string) => {
  return data.map((entry, index) => (
    <radialGradient
      key={`${idPrefix}-${index}`}
      id={`${idPrefix}-${index}`}
      cx="50%"
      cy="50%"
      r="70%"
      fx="50%"
      fy="50%"
    >
      <stop offset="0%" stopColor="#fff" stopOpacity={0.2} />
      <stop offset="70%" stopColor={entry.color} stopOpacity={1} />
      <stop offset="100%" stopColor={entry.color.replace(/[^,]+\)/, '0.8)')} stopOpacity={0.9} />
    </radialGradient>
  ));
};

export default function AnalyticsPage() {
  const [selectedPerson, setSelectedPerson] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeStatusIndex, setActiveStatusIndex] = useState(0);
  const [activeCaseTypeIndex, setActiveCaseTypeIndex] = useState(0);
  const [activeTreatmentIndex, setActiveTreatmentIndex] = useState(0);

  // Get the filtered data for each chart
  const filteredMetrics = getFilteredPerformanceMetrics(selectedPerson);
  const filteredCaseValues = getFilteredCaseValues(selectedPerson);
  
  // Get the selected person's data for the pie charts
  const selectedPersonData = caseStatusBreakdownByPerson.find(
    person => person.id === selectedPerson
  ) || caseStatusBreakdownByPerson[0];

  const selectedCaseTypeData = caseTypesByPerson.find(
    person => person.id === selectedPerson
  ) || caseTypesByPerson[0];

  const selectedTreatmentData = treatmentTypesByPerson.find(
    person => person.id === selectedPerson
  ) || treatmentTypesByPerson[0];

  // Ensure we always have valid data to prevent errors
  const safeChartData = selectedPersonData && selectedPersonData.data && 
    selectedPersonData.data.length > 0 ? 
    selectedPersonData.data : 
    [{ 
      status: "No Data", 
      value: 1, 
      percentage: 100, 
      color: "var(--muted)",
      gradient: "linear-gradient(270deg, var(--muted) 0%, var(--muted) 100%)" 
    }];

  const safeCaseTypeData = selectedCaseTypeData && selectedCaseTypeData.data && 
    selectedCaseTypeData.data.length > 0 ? 
    selectedCaseTypeData.data : 
    [{ 
      type: "No Data", 
      value: 1, 
      percentage: 100, 
      color: "var(--muted)",
      gradient: "linear-gradient(270deg, var(--muted) 0%, var(--muted) 100%)" 
    }];

  const safeTreatmentData = selectedTreatmentData && selectedTreatmentData.data && 
    selectedTreatmentData.data.length > 0 ? 
    selectedTreatmentData.data : 
    [{ 
      type: "No Data", 
      value: 1, 
      percentage: 100, 
      color: "var(--muted)",
      gradient: "linear-gradient(270deg, var(--muted) 0%, var(--muted) 100%)" 
    }];

  // Custom active shape for pie chart segments
  const renderActiveShape = useCallback((props: any) => {
    const { 
      cx, cy, innerRadius, outerRadius, startAngle, endAngle, 
      fill, payload, value, percent 
    } = props;

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          strokeWidth={2}
          stroke="var(--background)"
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 12}
          outerRadius={outerRadius + 12}
          fill={fill}
        />
      </g>
    );
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#212529] text-white overflow-auto">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="ml-[235px] p-5">
        {/* Top navigation */}
        <div className="flex items-center justify-between p-4 mb-4">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
              <ChevronLeft size={16} />
              <span className="text-sm">Back</span>
            </button>
            <h1 className="text-xl font-bold">Analytics Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Staff selector dropdown */}
            <div className="relative">
              <button 
                className="flex items-center gap-2 bg-[#1F2937] hover:bg-gray-700 text-white text-sm py-1.5 px-3 rounded border border-gray-700"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <UserIcon size={14} className="text-gray-400" />
                <span>{selectedPersonData.name}</span>
                <ChevronDown size={14} />
              </button>
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-[#1F2937] border border-gray-700 rounded-md shadow-lg z-10">
                  {caseStatusBreakdownByPerson.map(person => (
                    <button
                      key={person.id}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                      onClick={() => {
                        setSelectedPerson(person.id);
                        setDropdownOpen(false);
                      }}
                    >
                      {person.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="relative">
              <input
                type="search"
                placeholder="Search..."
                className="bg-[#111827] text-white placeholder-gray-400 border border-gray-700 rounded-lg py-1.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <FilterIcon size={14} className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Performance Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {filteredMetrics.map((metric, index) => (
            <Card key={index} className="bg-[#111827] border-gray-800 p-4 rounded-lg relative overflow-hidden">
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {getMetricIcon(metric.icon)}
                    <span className="text-sm text-gray-400">{metric.label}</span>
                  </div>
                  <span className={`text-xs py-0.5 px-2 ${
                    metric.trend === 'up' 
                      ? 'bg-green-900/30 text-green-400' 
                      : 'bg-red-900/30 text-red-400'
                  } rounded-full`}>
                    {metric.trend === 'up' ? '+' : '-'}{metric.change}%
                  </span>
                </div>
                <span className="text-2xl font-bold mt-2 text-white">{metric.value}</span>
              </div>
            </Card>
          ))}
        </div>
      
        {/* Main dashboard content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          {/* Left column - Case Values by Phase */}
          <Card className="bg-[#1F2937] border-gray-800 rounded-lg col-span-3 p-0 overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold" style={{
                  background: 'linear-gradient(90deg, #fff, #bbb)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}>Case Values by Phase</h2>
                <div className="flex items-center gap-2 text-sm">
                  <span className={`py-0.5 px-2 bg-green-900/30 text-green-400 rounded-full`}>
                    +4.3%
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-400">Showing values across all case phases</p>
            </div>
            
            <div className="p-6 h-[380px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredCaseValues}
                  margin={{ top: 30, right: 30, left: 30, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="var(--muted-foreground)" 
                    tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10}
                  />
                  <YAxis 
                    stroke="var(--muted-foreground)" 
                    tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => value === 0 ? '0' : `$${value/1000}K`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                      color: 'var(--card-foreground)'
                    }}
                    labelStyle={{ color: 'var(--card-foreground)', fontWeight: 'bold', marginBottom: '5px' }}
                    itemStyle={{ color: 'var(--muted-foreground)' }}
                    formatter={(value) => [`$${value}`, '']}
                    cursor={{ fill: 'var(--muted-foreground)', opacity: 0.05, radius: 8 }}
                  />
                  {/* Conditionally render bars based on selected person */}
                  {selectedPerson === "all" ? (
                    // For "All Staff" view, show a single aggregated bar
                    <Bar 
                      dataKey="total" 
                      fill={chartColors.green ? chartColors.green.main : "#10B981"}
                      name="All Staff"
                      radius={[8, 8, 0, 0]}
                    >
                      <LabelList
                        dataKey="total"
                        position="top"
                        offset={12}
                        fill="white"
                        fontSize={14}
                        fontWeight="bold"
                        formatter={(value: number) => formatCurrency(value)}
                      />
                    </Bar>
                  ) : (
                    // For individual staff, show only their bar
                    Object.keys(filteredCaseValues[0])
                      .filter(key => key !== 'name')
                      .map((key, index) => {
                        // Find the matching team member for color
                        const teamMember = teamMembers.find(tm => 
                          tm.name.toLowerCase().replace(/\s+/g, '') === key.toLowerCase()
                        ) || teamMembers[0];
                        
                        return (
                          <Bar 
                            key={key}
                            dataKey={key} 
                            fill={teamMember.color}
                            name={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            radius={[8, 8, 0, 0]}
                          >
                            <LabelList
                              dataKey={key}
                              position="top"
                              offset={12}
                              fill="white"
                              fontSize={14}
                              fontWeight="bold" 
                              formatter={(value: number) => formatCurrency(value)}
                            />
                          </Bar>
                        );
                      })
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="p-4 border-t border-gray-800 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <div className="flex gap-2 items-center">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span>Average values trending up by 4.3% this quarter</span>
                </div>
              </div>
              <div className="flex justify-center gap-6 mt-3">
                {/* Legend - show entry for current view */}
                {selectedPerson === "all" ? (
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors.green ? chartColors.green.main : "#10B981" }}></span>
                    <span className="text-xs text-gray-400">All Staff (Total)</span>
                  </div>
                ) : (
                  // For individual staff, show just their legend item
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full" style={{ 
                      backgroundColor: teamMembers.find(tm => 
                        tm.name.toLowerCase() === selectedPersonData.name.toLowerCase()
                      )?.color || teamMembers[0].color 
                    }}></span>
                    <span className="text-xs text-gray-400">{selectedPersonData.name}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
          
          {/* Right column - Case Status chart - updated to match example */}
          <Card className="bg-[#111827] border-gray-800 rounded-lg col-span-2 p-0 overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold" style={{
                  background: 'linear-gradient(90deg, #fff, #bbb)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}>Case Status Breakdown</h2>
                <div className="flex items-center gap-2 text-sm">
                  <span className={`py-0.5 px-2 bg-green-900/30 text-green-400 rounded-full`}>
                    +2.8%
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-400">Current case distribution by status</p>
            </div>
            
            <div className="p-6 flex justify-center items-center">
              <div className="aspect-square max-h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={safeChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      nameKey="status"
                      strokeWidth={5}
                      stroke="var(--background)"
                      activeIndex={activeStatusIndex}
                      activeShape={renderActiveShape}
                      onMouseEnter={(_, index) => setActiveStatusIndex(index)}
                    >
                      {safeChartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color} 
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                        color: 'var(--card-foreground)',
                        padding: '12px'
                      }}
                      formatter={(value, name, props) => {
                        if (!props || !props.payload || typeof props.payload.index !== 'number') {
                          return ['N/A', 'Unknown'];
                        }
                        const entry = safeChartData[props.payload.index];
                        if (!entry) return ['N/A', 'Unknown'];
                        
                        // Return an array of elements for a formatted tooltip
                        return [
                          <div key="tooltip-content" className="flex flex-col gap-1">
                            <div className="font-semibold">{entry.status}</div>
                            <div className="text-sm">Count: {entry.value}</div>
                            <div className="text-sm">Percentage: {entry.percentage.toFixed(1)}%</div>
                          </div>,
                          ''
                        ];
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-800">
              <div className="flex justify-center gap-4">
                {safeChartData.map((entry, index) => (
                  <div 
                    key={entry.status} 
                    className="flex items-center gap-1.5 cursor-pointer"
                    onMouseEnter={() => setActiveStatusIndex(index)}
                  >
                    <span 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: entry.color }}
                    ></span>
                    <span className="text-xs text-gray-400">{entry.status}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400">
                <TrendingUp className="h-3 w-3 text-green-400" />
                <span>Case resolution rate up 2.8% this quarter</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom Charts Row - Case Types and Treatment Types */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Case Types Pie Chart - updated to match example */}
          <Card className="bg-[#111827] border-gray-800 rounded-lg p-0 overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold" style={{
                  background: 'linear-gradient(90deg, #fff, #bbb)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}>Active Cases by Type</h2>
                <div className="flex items-center gap-2 text-sm">
                  <span className={`py-0.5 px-2 bg-green-900/30 text-green-400 rounded-full`}>
                    +3.7%
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-400">Distribution of current case types</p>
            </div>
            
            <div className="p-6 flex justify-center items-center">
              <div className="aspect-square max-h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={safeCaseTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      nameKey="type"
                      strokeWidth={5}
                      stroke="var(--background)"
                      activeIndex={activeCaseTypeIndex}
                      activeShape={renderActiveShape}
                      onMouseEnter={(_, index) => setActiveCaseTypeIndex(index)}
                    >
                      {safeCaseTypeData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color} 
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                        color: 'var(--card-foreground)',
                        padding: '12px'
                      }}
                      formatter={(value, name, props) => {
                        if (!props || !props.payload || typeof props.payload.index !== 'number') {
                          return ['N/A', 'Unknown'];
                        }
                        const entry = safeCaseTypeData[props.payload.index];
                        if (!entry) return ['N/A', 'Unknown'];
                        
                        // Return an array of elements for a formatted tooltip
                        return [
                          <div key="tooltip-content" className="flex flex-col gap-1">
                            <div className="font-semibold">{entry.type}</div>
                            <div className="text-sm">Count: {entry.value}</div>
                            <div className="text-sm">Percentage: {entry.percentage.toFixed(1)}%</div>
                          </div>,
                          ''
                        ];
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-800">
              <div className="flex justify-center gap-4">
                {safeCaseTypeData.map((entry, index) => (
                  <div 
                    key={entry.type} 
                    className="flex items-center gap-1.5 cursor-pointer"
                    onMouseEnter={() => setActiveCaseTypeIndex(index)}
                  >
                    <span 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: entry.color }}
                    ></span>
                    <span className="text-xs text-gray-400">{entry.type}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400">
                <TrendingUp className="h-3 w-3 text-green-400" />
                <span>Motor vehicle cases up 3.7% this quarter</span>
              </div>
            </div>
          </Card>

          {/* Treatment Types Pie Chart - updated to match example */}
          <Card className="bg-[#111827] border-gray-800 rounded-lg p-0 overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold" style={{
                  background: 'linear-gradient(90deg, #fff, #bbb)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}>Medical Treatment Types</h2>
                <div className="flex items-center gap-2 text-sm">
                  <span className={`py-0.5 px-2 bg-green-900/30 text-green-400 rounded-full`}>
                    +5.2%
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-400">Most common medical treatments</p>
            </div>
            
            <div className="p-6 flex justify-center items-center">
              <div className="aspect-square max-h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={safeTreatmentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      nameKey="type"
                      strokeWidth={5}
                      stroke="var(--background)"
                      activeIndex={activeTreatmentIndex}
                      activeShape={renderActiveShape}
                      onMouseEnter={(_, index) => setActiveTreatmentIndex(index)}
                    >
                      {safeTreatmentData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color} 
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                        color: 'var(--card-foreground)',
                        padding: '12px'
                      }}
                      formatter={(value, name, props) => {
                        if (!props || !props.payload || typeof props.payload.index !== 'number') {
                          return ['N/A', 'Unknown'];
                        }
                        const entry = safeTreatmentData[props.payload.index];
                        if (!entry) return ['N/A', 'Unknown'];
                        
                        // Return an array of elements for a formatted tooltip
                        return [
                          <div key="tooltip-content" className="flex flex-col gap-1">
                            <div className="font-semibold">{entry.type}</div>
                            <div className="text-sm">Count: {entry.value}</div>
                            <div className="text-sm">Percentage: {entry.percentage.toFixed(1)}%</div>
                          </div>,
                          ''
                        ];
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-800">
              <div className="flex justify-center gap-4">
                {safeTreatmentData.map((entry, index) => (
                  <div 
                    key={entry.type} 
                    className="flex items-center gap-1.5 cursor-pointer"
                    onMouseEnter={() => setActiveTreatmentIndex(index)}
                  >
                    <span 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: entry.color }}
                    ></span>
                    <span className="text-xs text-gray-400">{entry.type}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400">
                <TrendingUp className="h-3 w-3 text-green-400" />
                <span>Physical therapy treatments up 5.2% this month</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 