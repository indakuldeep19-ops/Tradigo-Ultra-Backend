
"use client";

import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, DollarSign, BarChart3, ChevronRight, PlusCircle, Star } from "lucide-react";
import { useCurrency } from "@/context/currency-context";
import Link from "next/link";

export default function CreatorDashboardPage() {
  const { format } = useCurrency();

  return (
    <main className="min-h-screen pb-20">
      <header className="p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-headline">Creator Lab</h1>
          <p className="text-sm text-muted-foreground">Manage your trading assets & signals</p>
        </div>
        <Link href="/profile">
          <Button variant="ghost" size="icon">
            <Star className="h-5 w-5 text-primary" />
          </Button>
        </Link>
      </header>

      <div className="px-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-border/50 bg-card/30">
            <CardContent className="p-4">
              <div className="p-2 rounded-lg bg-primary/10 w-fit mb-3">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Total Earnings</p>
              <p className="text-xl font-bold mt-1">{format(4520.80, 'USD')}</p>
              <p className="text-[10px] text-green-500 mt-1">+12% this month</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/30">
            <CardContent className="p-4">
              <div className="p-2 rounded-lg bg-secondary/10 w-fit mb-3">
                <Users className="h-4 w-4 text-secondary" />
              </div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Subscribers</p>
              <p className="text-xl font-bold mt-1">1,240</p>
              <p className="text-[10px] text-primary mt-1">89 active today</p>
            </CardContent>
          </Card>
        </div>

        {/* Action Center */}
        <div className="space-y-4">
          <h2 className="text-lg font-headline">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-20 flex-col gap-2 border-primary/20 bg-primary/5 hover:bg-primary/10">
              <PlusCircle className="h-5 w-5" />
              <span className="text-xs">New Signal</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 border-secondary/20 bg-secondary/5 hover:bg-secondary/10">
              <TrendingUp className="h-5 w-5" />
              <span className="text-xs">Publish Course</span>
            </Button>
          </div>
        </div>

        {/* My Assets */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-headline">Your Published Assets</h2>
            <Link href="/market"><span className="text-xs text-primary font-bold">View Market</span></Link>
          </div>
          <div className="space-y-3">
            {[
              { title: "Elite Scalping Pro", type: "Indicator", sales: 45, earned: 4455 },
              { title: "Forex Mastery 101", type: "Course", sales: 12, earned: 2388 },
            ].map((asset, i) => (
              <Card key={i} className="border-border/50 bg-card/30">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold">{asset.title}</h3>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-[8px] h-4 py-0">{asset.type}</Badge>
                        <span className="text-[10px] text-muted-foreground">{asset.sales} Sales</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">{format(asset.earned, 'USD')}</p>
                    <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <MobileNav />
    </main>
  );
}
