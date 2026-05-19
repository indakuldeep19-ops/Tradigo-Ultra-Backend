
"use client";

import { use, useState, useEffect, useRef } from "react";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, Send, Mic, MoreVertical, Paperclip } from "lucide-react";
import Link from "next/link";

const MOCK_MESSAGES = [
  { id: 1, sender: "CaptainCrypto", text: "Watch out for the ETH support at 3400. Might be a bounce zone.", time: "10:02 AM", isMe: false },
  { id: 2, sender: "Alex Sterling", text: "Confirmed. RSI is oversold on the 4h timeframe.", time: "10:03 AM", isMe: true },
  { id: 3, sender: "BullTrader", text: "I'm scaling in here. SL below 3350.", time: "10:05 AM", isMe: false },
];

export default function ChatRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = {
      id: messages.length + 1,
      sender: "Alex Sterling",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <main className="min-h-screen bg-background flex flex-col h-screen overflow-hidden">
      <header className="p-4 border-b border-border/50 flex items-center justify-between bg-card/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link href="/battles">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold">
              WS
            </div>
            <div>
              <h2 className="text-sm font-bold leading-none">Wall Street Open Call</h2>
              <p className="text-[10px] text-green-500 flex items-center gap-1 mt-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> 124 Online
              </p>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5 text-muted-foreground" />
        </Button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} gap-2`}>
            {!msg.isMe && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={`https://i.pravatar.cc/100?u=${msg.sender}`} />
                <AvatarFallback>{msg.sender[0]}</AvatarFallback>
              </Avatar>
            )}
            <div className={`max-w-[75%] space-y-1`}>
              {!msg.isMe && <span className="text-[10px] text-muted-foreground ml-1">{msg.sender}</span>}
              <div className={`px-4 py-2 rounded-2xl text-sm ${
                msg.isMe 
                  ? 'bg-primary text-primary-foreground rounded-tr-none shadow-[0_4px_12px_rgba(212,175,55,0.2)]' 
                  : 'bg-muted/50 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
              <div className={`text-[8px] text-muted-foreground ${msg.isMe ? 'text-right mr-1' : 'ml-1'}`}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <div className="p-4 bg-card/50 border-t border-border/30 mb-16 md:mb-0">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Paperclip className="h-5 w-5" />
          </Button>
          <div className="relative flex-1">
            <Input 
              className="bg-muted/30 border-none h-11 pr-12 rounded-xl focus-visible:ring-1 focus-visible:ring-primary/30" 
              placeholder="Type your message..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button 
              size="icon" 
              variant="ghost" 
              className="absolute right-1 top-1/2 -translate-y-1/2 text-primary hover:bg-transparent"
              onClick={handleSend}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <Button size="icon" className="h-11 w-11 rounded-xl bg-primary text-primary-foreground shadow-lg">
            <Mic className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </main>
  );
}
