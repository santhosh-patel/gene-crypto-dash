
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";

interface Payment {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  date: string;
  price: string;
  status: "success" | "failed";
  change: number;
  background?: string;
}

const payments: Payment[] = [
  {
    id: "1",
    name: "Achain",
    symbol: "A",
    logo: "#",
    date: "12 Jun, 2024",
    price: "$14,922.33",
    status: "success",
    change: -8.43,
    background: "bg-purple-500"
  },
  {
    id: "2",
    name: "Cardano",
    symbol: "C",
    logo: "#",
    date: "16 May, 2024",
    price: "$2,432.20",
    status: "success",
    change: 2.34,
    background: "bg-cardano"
  },
  {
    id: "3",
    name: "Digibyte",
    symbol: "D",
    logo: "#",
    date: "21 Feb, 2024",
    price: "$201.45",
    status: "success",
    change: 16.84,
    background: "bg-digibyte"
  },
  {
    id: "4",
    name: "Ethereum",
    symbol: "E",
    logo: "#",
    date: "19 Dec, 2023",
    price: "$3,456.78",
    status: "failed",
    change: -34.34,
    background: "bg-ethereum"
  }
];

interface PaymentHistoryProps {
  className?: string;
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({ className }) => {
  return (
    <Card className={cn("bg-card border-gray-800", className)}>
      <CardHeader className="pt-4 px-4 pb-0">
        <CardTitle className="text-lg font-medium">Payment History</CardTitle>
      </CardHeader>
      <CardContent className="p-4 overflow-auto scrollbar-hide">
        <div className="rounded-md border border-gray-800">
          <div className="grid grid-cols-12 border-b border-gray-800 bg-secondary/30 py-2 px-4 text-xs font-medium text-muted-foreground">
            <div className="col-span-4">NAME</div>
            <div className="col-span-2 text-center">DATE</div>
            <div className="col-span-2 text-center">PRICE</div>
            <div className="col-span-2 text-center">STATUS</div>
            <div className="col-span-2 text-right">CHANGE</div>
          </div>
          
          {payments.map((payment) => (
            <div key={payment.id} className="grid grid-cols-12 items-center py-3 px-4 hover:bg-secondary/10 transition-colors">
              <div className="col-span-4 flex items-center gap-3">
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white", payment.background)}>
                  {payment.symbol}
                </div>
                <span className="font-medium">{payment.name}</span>
              </div>
              
              <div className="col-span-2 text-center text-sm text-muted-foreground">
                {payment.date}
              </div>
              
              <div className="col-span-2 text-center font-medium">
                {payment.price}
              </div>
              
              <div className="col-span-2 flex justify-center">
                {payment.status === "success" ? (
                  <div className="flex items-center gap-1 text-success text-xs">
                    <CheckCircle className="h-3 w-3" />
                    <span>Successfully</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-danger text-xs">
                    <XCircle className="h-3 w-3" />
                    <span>Failed</span>
                  </div>
                )}
              </div>
              
              <div className={cn(
                "col-span-2 text-right text-sm font-medium",
                payment.change > 0 ? "text-success" : "text-danger"
              )}>
                {payment.change > 0 ? "+" : ""}{payment.change}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentHistory;
