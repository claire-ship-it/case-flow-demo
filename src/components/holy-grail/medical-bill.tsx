import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface MedicalBill {
  provider: string
  originalBalance: number
  reduction: number
  finalBalance: number
}

interface MedicalBillsProps {
  bills: MedicalBill[]
}

export function MedicalBills({ bills }: MedicalBillsProps) {
  // Calculate totals
  const totals = bills.reduce(
    (acc, bill) => ({
      originalBalance: acc.originalBalance + bill.originalBalance,
      reduction: acc.reduction + bill.reduction,
      finalBalance: acc.finalBalance + bill.finalBalance,
    }),
    { originalBalance: 0, reduction: 0, finalBalance: 0 }
  )

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-white mb-6">Medical Bills</h2>
      
      <div className="rounded-lg overflow-hidden border border-gray-700">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-gray-700">
              <TableHead className="text-gray-300">Provider</TableHead>
              <TableHead className="text-right text-gray-300">Original Balance</TableHead>
              <TableHead className="text-right text-gray-300">Reduction</TableHead>
              <TableHead className="text-right text-gray-300">Final Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bills.map((bill, index) => (
              <TableRow key={index} className="hover:bg-[#2E3B4E] border-gray-700">
                <TableCell className="font-medium text-gray-300">{bill.provider}</TableCell>
                <TableCell className="text-right text-gray-300">{formatCurrency(bill.originalBalance)}</TableCell>
                <TableCell className="text-right text-red-400">-{formatCurrency(bill.reduction)}</TableCell>
                <TableCell className="text-right text-green-400">{formatCurrency(bill.finalBalance)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Summary Section */}
      <div className="mt-6 bg-[#2E3B4E] rounded-lg p-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-between w-full">
            <div className="text-center flex-1">
              <div className="text-gray-300 mb-2">Billed</div>
              <div className="text-2xl font-semibold text-gray-300">{formatCurrency(totals.originalBalance)}</div>
            </div>
            <div className="text-gray-400 text-2xl">−</div>
            <div className="text-center flex-1">
              <div className="text-gray-300 mb-2">Paid/Adjusted</div>
              <div className="text-2xl font-semibold text-red-400">{formatCurrency(totals.reduction)}</div>
            </div>
            <div className="text-gray-400 text-2xl">=</div>
            <div className="text-center flex-1">
              <div className="text-gray-300 mb-2">Balance</div>
              <div className="text-2xl font-semibold text-green-400">{formatCurrency(totals.finalBalance)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const defaultBills: MedicalBill[] = [
  {
    provider: "Advent Health Hospital-Fletcher",
    originalBalance: 12500.00,
    reduction: 4375.00,
    finalBalance: 8125.00
  },
  {
    provider: "Advanced Wellness & Rehabilitation Center",
    originalBalance: 4800.00,
    reduction: 1200.00,
    finalBalance: 3600.00
  },
  {
    provider: "Tampa Bay Imaging",
    originalBalance: 3200.00,
    reduction: 960.00,
    finalBalance: 2240.00
  },
  {
    provider: "Genisis Brain Institute",
    originalBalance: 6500.00,
    reduction: 1950.00,
    finalBalance: 4550.00
  }
]
