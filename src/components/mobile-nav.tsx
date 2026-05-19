
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Zap, PlayCircle, Users, User, Sparkles } from "lucide-react";
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
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-20 glass-nav px-4 flex items-center justify-around md:hidden rounded-t-[2.5rem]">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative flex flex-col items-center justify-center gap-1.5 transition-all duration-300 w-16",
              isActive ? "text-primary" : "text-muted-foreground hover:text-primary/70"
            )}
          >
            {isActive && (
              <motion.div 
                layoutId="nav-glow"
                className="absolute -top-4 w-10 h-10 bg-primary/20 blur-xl rounded-full"
              />
            )}
            
            <motion.div
              animate={isActive ? { scale: 1.2, y: -5 } : { scale: 1, y: 0 }}
              className={cn(
                "p-2 rounded-2xl transition-all duration-500",
                isActive ? "bg-gradient-to-tr from-primary/20 to-secondary/20 border border-primary/40 shadow-[0_0_15px_rgba(212,175,55,0.2)]" : "bg-transparent"
              )}
            >
              <item.icon className={cn("h-6 w-6", isActive && "stroke-[2.5px] text-primary")} />
            </motion.div>
            
            <span className={cn(
              "text-[9px] font-bold uppercase tracking-widest",
              isActive ? "opacity-100" : "opacity-40"
            )}>
              {item.label}
            </span>

            {isActive && (
              <motion.div 
                layoutId="nav-dot"
                className="absolute -bottom-1 h-1 w-3 rounded-full bg-primary" 
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
