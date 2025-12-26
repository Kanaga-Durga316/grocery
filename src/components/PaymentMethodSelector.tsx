"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, Landmark, Wallet, CircleDollarSign } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PaymentMethodSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const paymentMethods = [
  {
    id: "card",
    label: "Credit/Debit Card",
    icon: CreditCard,
  },
  {
    id: "upi",
    label: "UPI / Google Pay / PhonePe",
    customIcon: (
      <div className="flex items-center gap-2">
        <Image src="/logos/gpay.svg" alt="Google Pay" width={24} height={24} />
        <Image src="/logos/phonepe.svg" alt="PhonePe" width={24} height={24} />
        <Image src="/logos/upi.svg" alt="UPI" width={24} height={24} />
      </div>
    ),
  },
  {
    id: "paypal",
    label: "PayPal",
    customIcon: <Image src="/logos/paypal.svg" alt="PayPal" width={70} height={24} />,
  },
  {
    id: "netbanking",
    label: "Wallet / Net Banking",
    icon: Landmark,
  },
];

export function PaymentMethodSelector({ value, onChange, disabled }: PaymentMethodSelectorProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className="space-y-4"
      disabled={disabled}
    >
      {paymentMethods.map((method) => (
        <Label
          key={method.id}
          htmlFor={`payment-${method.id}`}
          className={cn(
            "flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border-2 p-4 transition-all",
            "cursor-pointer hover:border-primary/80",
            value === method.id && "border-primary shadow-md",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <div className="flex items-center gap-4 mb-2 sm:mb-0">
            <RadioGroupItem value={method.id} id={`payment-${method.id}`} />
            <span className="font-medium text-foreground">{method.label}</span>
          </div>
          {method.customIcon ? (
            method.customIcon
          ) : (
            <method.icon className="h-6 w-6 text-muted-foreground" />
          )}
        </Label>
      ))}
    </RadioGroup>
  );
}
