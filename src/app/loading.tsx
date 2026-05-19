import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0d0d12]">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-2 border-primary/20 animate-ping absolute inset-0" />
        <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center relative">
          <Sparkles className="h-10 w-10 text-primary animate-pulse" />
        </div>
      </div>
      <div className="absolute bottom-12 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Tradigo Prime</p>
        <p className="text-[8px] text-muted-foreground uppercase tracking-widest mt-2">Quantum Core Syncing...</p>
      </div>
    </div>
  );
}
