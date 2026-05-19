"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Zap, PlayCircle, Users, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/signals", label: "Signals", icon: Zap },
  { href: "/social", label: "Social", icon: PlayCircle },
  { href: "/battles", label: "Battles", icon: Users },
  { href: "/profile", label: "Profile", icon: User },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-20 bg-background/60 backdrop-blur-xl border-t border-white/5 px-4 flex items-center justify-around md:hidden rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative flex flex-col items-center justify-center gap-1 transition-all duration-300 w-16",
              isActive ? "text-primary" : "text-muted-foreground/60 hover:text-primary/70"
            )}
          >
            {isActive && (
              <motion.div 
                layoutId="nav-glow-active"
                className="absolute -top-6 w-12 h-12 bg-primary/30 blur-2xl rounded-full"
              />
            )}
            
            <motion.div
              animate={isActive ? { scale: 1.2, y: -8 } : { scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className={cn(
                "p-2.5 rounded-2xl transition-all duration-500",
                isActive ? "bg-gradient-to-tr from-primary/20 via-secondary/10 to-transparent border border-primary/30 shadow-[0_0_20px_rgba(212,175,55,0.3)]" : "bg-transparent"
              )}
            >
              <item.icon className={cn("h-6 w-6", isActive && "stroke-[2.5px] text-primary")} />
            </motion.div>
            
            <span className={cn(
              "text-[8px] font-black uppercase tracking-[0.2em]",
              isActive ? "opacity-100 text-primary" : "opacity-40"
            )}>
              {item.label}
            </span>

            {isActive && (
              <motion.div 
                layoutId="nav-indicator"
                className="absolute -bottom-1 h-1.5 w-4 rounded-full bg-primary shadow-[0_0_10px_rgba(212,175,55,0.8)]" 
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}