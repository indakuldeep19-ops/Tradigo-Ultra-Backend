
"use client";

import { useCurrency, SUPPORTED_CURRENCIES, CurrencyCode } from "@/context/currency-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

export function CurrencySelector() {
  const { selectedCurrency, setCurrency } = useCurrency();

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <Select 
        value={selectedCurrency.code} 
        onValueChange={(value) => setCurrency(value as CurrencyCode)}
      >
        <SelectTrigger className="w-[140px] h-9 text-xs border-none bg-muted/50 focus:ring-0">
          <SelectValue placeholder="Select Currency" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(SUPPORTED_CURRENCIES).map((currency) => (
            <SelectItem key={currency.code} value={currency.code} className="text-xs">
              <span className="font-bold mr-2">{currency.symbol}</span>
              {currency.code} - {currency.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
