
"use client";

import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ShoppingCart, Star, Zap } from "lucide-react";
import { useCurrency } from "@/context/currency-context";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const MARKET_ITEMS = [
  { id: 1, title: "Pro Scalper Indicator", creator: "AlgoWizard", price: 99, rating: 4.8, reviews: 245, type: "Indicator", image: "https://picsum.photos/seed/ind1/400/300" },
  { id: 2, title: "Smart Money Concepts", creator: "TradigoAcademy", price: 199, rating: 4.9, reviews: 120, type: "Course", image: "https://picsum.photos/seed/course1/400/300" },
  { id: 3, title: "Gold Master Strategy", creator: "BullMaster", price: 49, rating: 4.7, reviews: 89, type: "Strategy", image: "https://picsum.photos/seed/strat1/400/300" },
  { id: 4, title: "Whale Wallet Tracker", creator: "DataWhale", price: 149, rating: 4.9, reviews: 56, type: "Tool", image: "https://picsum.photos/seed/tool1/400/300" },
];

export default function MarketplacePage() {
  const { format } = useCurrency();

  return (
    <main className="min-h-screen pb-20">
      <header className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-headline">Marketplace</h1>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-primary text-[10px]">2</Badge>
          </Button>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9 h-10 bg-muted/30 border-none" placeholder="Search indicators, courses..." />
          </div>
          <Button variant="outline" size="icon" className="h-10 w-10 border-border/50">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="px-6 space-y-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['All', 'Indicators', 'Courses', 'Strategies', 'Tools'].map((cat) => (
            <Badge key={cat} variant={cat === 'All' ? 'default' : 'outline'} className="whitespace-nowrap rounded-lg px-4 py-1">
              {cat}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6">
          {MARKET_ITEMS.map((item) => (
            <Card key={item.id} className="overflow-hidden border-border/50 bg-card/50">
              <div className="aspect-[16/9] relative">
                <img src={item.image} className="h-full w-full object-cover" alt={item.title} />
                <Badge className="absolute top-2 right-2 bg-black/60 backdrop-blur-md border-none">{item.type}</Badge>
              </div>
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg leading-tight">{item.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">By {item.creator}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{format(item.price, 'USD')}</p>
                    <div className="flex items-center gap-1 text-[10px] text-yellow-500 justify-end">
                      <Star className="h-2 w-2 fill-current" /> {item.rating} ({item.reviews})
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-primary text-primary-foreground font-bold">Buy Now</Button>
                  <Link href={`/courses/${item.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <MobileNav />
    </main>
  );
}
