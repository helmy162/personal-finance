"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Home, Folder, Users, DollarSign } from "lucide-react";

const sidebarItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Categories", href: "/categories", icon: Folder },
  { name: "Payees", href: "/payees", icon: Users },
  { name: "Expenses", href: "/expenses", icon: DollarSign },
];

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <MobileNav pathname={pathname} setOpen={setOpen} />
        </SheetContent>
      </Sheet>
      <nav className="hidden md:block">
        <ScrollArea className="py-6 pr-6 lg:py-8">
          <SidebarItems pathname={pathname} />
        </ScrollArea>
      </nav>
    </>
  );
}

function MobileNav({
  pathname,
  setOpen,
}: {
  pathname: string;
  setOpen: (open: boolean) => void;
}) {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold">ExpenseTree</span>
        </Link>
      </div>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="flex flex-col space-y-2">
          <SidebarItems pathname={pathname} setOpen={setOpen} />
        </div>
      </ScrollArea>
    </div>
  );
}

function SidebarItems({
  pathname,
  setOpen,
}: {
  pathname: string;
  setOpen?: (open: boolean) => void;
}) {
  return (
    <>
      {sidebarItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setOpen?.(false)}
          className={cn(
            "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === item.href ? "bg-accent" : "transparent"
          )}
        >
          <item.icon className="mr-2 h-4 w-4" />
          <span>{item.name}</span>
        </Link>
      ))}
    </>
  );
}
