"use client";
import {
  Car,
  CalendarCheck,
  CreditCard,
  FileText,
  Heart,
  HelpCircle,
  Home,
  Star,
} from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const menuItems = [
  { href: "/home", icon: Home, label: "Home" },
  { href: "/vehicles", icon: Car, label: "Browse" },
  { href: "/bookings", icon: CalendarCheck, label: "Bookings" },
  { href: "/favorites", icon: Heart, label: "Favorites" },
  { href: "/payments", icon: CreditCard, label: "Payments" },
  { href: "/invoices", icon: FileText, label: "Invoices" },
  { href: "/loyalty", icon: Star, label: "Loyalty" },
  { href: "/support", icon: HelpCircle, label: "Support" },
];

export default function BottomMenuCustomer() {
  return (
    <TooltipProvider>
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-full px-6 py-3 flex justify-around items-center gap-4 max-w-[90%]  z-50 dark:bg-gray-950 dark:outline-1">
        {menuItems.map(({ href, icon: Icon, label }) => (
          <Tooltip key={href}>
            <TooltipTrigger asChild>
              <Link
                href={href}
                className="flex flex-col items-center text-gray-600 hover:text-primary transition"
              >
                <Icon className="w-6 h-6 dark:text-white"/>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="top">{label}</TooltipContent>
          </Tooltip>
        ))}
      </nav>
    </TooltipProvider>
  );
}
