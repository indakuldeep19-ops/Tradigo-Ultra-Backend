
"use client";

import { use } from "react";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Clock, Award, Users, ChevronLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useCurrency } from "@/context/currency-context";

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { format } = useCurrency();

  const COURSE = {
    id: resolvedParams.id,
    title: "Smart Money Concepts: The Institutional Edge",
    instructor: "David Sterling",
    price: 199,
    students: "1,240",
    rating: 4.9,
    duration: "12 Hours",
    lessons: 24,
    description: "Learn how to trade like the 1% by understanding institutional order flow, liquidity hunts, and premium/discount arrays.",
    curriculum: [
      "Market Structure 2.0",
      "Identifying Institutional Order Blocks",
      "The Art of Liquidity Engineering",
      "Advanced Entry Drills",
      "Risk Management for Pros"
    ]
  };

  return (
    <main className="min-h-screen pb-20">
      <div className="relative h-64 bg-muted">
        <img src="https://picsum.photos/seed/course-hero/1200/800" className="h-full w-full object-cover" alt="Hero" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <Link href="/market" className="absolute top-6 left-6">
          <Button variant="ghost" size="icon" className="bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60">
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </Link>
        <div className="absolute bottom-6 left-6 right-6">
          <Badge className="bg-primary mb-2">MOST POPULAR</Badge>
          <h1 className="text-2xl font-headline text-white leading-tight">{COURSE.title}</h1>
        </div>
      </div>

      <div className="p-6 space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-4 w-4" /> {COURSE.duration}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <PlayCircle className="h-4 w-4" /> {COURSE.lessons} Lessons
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="h-4 w-4" /> {COURSE.students} Students
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Award className="h-4 w-4" /> Certificate included
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-headline">Description</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{COURSE.description}</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-headline">What you'll learn</h2>
          <div className="space-y-3">
            {COURSE.curriculum.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="fixed bottom-20 left-6 right-6 z-40 md:relative md:bottom-auto md:left-auto md:right-auto">
          <Card className="border-primary/20 bg-card/90 backdrop-blur-md p-4 flex items-center justify-between shadow-xl">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Price</p>
              <p className="text-2xl font-bold text-primary">{format(COURSE.price, 'USD')}</p>
            </div>
            <Button className="h-12 px-8 bg-primary text-primary-foreground font-bold rounded-lg shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              Enroll Now
            </Button>
          </Card>
        </div>
      </div>

      <MobileNav />
    </main>
  );
}
