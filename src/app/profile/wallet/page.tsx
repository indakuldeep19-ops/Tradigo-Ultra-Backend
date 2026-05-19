
'use client';

import { useState } from 'react';
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, ArrowUpRight, ArrowDownLeft, History, Plus, Coins } from "lucide-react";
import { useCurrency } from "@/context/currency-context";
import { PaymentButton } from "@/components/payment-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MOCK_HISTORY = [
  { id: 1, type: 'credit', category: 'wallet_recharge', amount: 500, currency: 'USD', date: '2024-05-20', status: 'completed' },
  { id: 2, type: 'debit', category: 'subscription', amount: 49.99, currency: 'USD', date: '2024-05-18', status: 'completed' },
  { id: 3, type: 'debit', category: 'marketplace', amount: 25.00, currency: 'USD', date: '2024-05-15', status: 'completed' },
];

export default function WalletPage() {
  const { format, convert } = useCurrency();
  const [balance, setBalance] = useState(1240.50); // Mock initial balance in USD

  const handleRechargeSuccess = (paymentId: string) => {
    // In a real app, this would be updated via Firestore listener
    setBalance(prev => prev + 100); 
  };

  return (
    <main className="min-h-screen pb-20">
      <header className="p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-headline">Digital Vault</h1>
          <p className="text-sm text-muted-foreground">Manage your funds and earnings</p>
        </div>
        <Wallet className="h-6 w-6 text-primary" />
      </header>

      <div className="px-6 space-y-6">
        {/* Balance Card */}
        <Card className="border-primary/20 bg-gradient-to-br from-card to-background relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <Coins className="h-16 w-16 text-primary opacity-10" />
          </div>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Balance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-4xl font-bold font-headline">{format(balance, 'USD')}</div>
            <div className="flex gap-3">
              <PaymentButton 
                amount={100} 
                currency="USD" 
                label="Add Funds" 
                onSuccess={handleRechargeSuccess}
                className="flex-1 bg-primary text-primary-foreground"
              />
              <Button variant="outline" className="flex-1 border-primary/20">Withdraw</Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Buy Coins */}
        <div className="space-y-4">
          <h2 className="text-lg font-headline flex items-center gap-2">
            <Coins className="h-5 w-5 text-yellow-500" /> Buy Prime Coins
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { amount: 500, price: 5, bonus: 0 },
              { amount: 1200, price: 10, bonus: 200 },
              { amount: 3000, price: 25, bonus: 500 },
              { amount: 7500, price: 50, bonus: 1500 },
            ].map((pack) => (
              <Card key={pack.amount} className="border-border/50 bg-card/50">
                <CardContent className="p-4 space-y-2">
                  <div className="text-lg font-bold flex items-center gap-1">
                    <Coins className="h-4 w-4 text-yellow-500" /> {pack.amount.toLocaleString()}
                  </div>
                  {pack.bonus > 0 && (
                    <Badge className="bg-green-500/20 text-green-500 text-[10px]">+{pack.bonus} Bonus</Badge>
                  )}
                  <PaymentButton 
                    amount={pack.price} 
                    currency="USD" 
                    label={`Buy for ${format(pack.price, 'USD')}`}
                    variant="ghost"
                    className="w-full text-xs h-8 p-0 text-primary hover:bg-primary/10"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Transactions */}
        <div className="space-y-4">
          <h2 className="text-lg font-headline flex items-center gap-2">
            <History className="h-5 w-5 text-muted-foreground" /> Transaction History
          </h2>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full bg-muted/50">
              <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
              <TabsTrigger value="credits" className="flex-1">Credits</TabsTrigger>
              <TabsTrigger value="debits" className="flex-1">Debits</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-3 mt-4">
              {MOCK_HISTORY.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/30">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${tx.type === 'credit' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                      {tx.type === 'credit' ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold capitalize">{tx.category.replace('_', ' ')}</p>
                      <p className="text-[10px] text-muted-foreground">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${tx.type === 'credit' ? 'text-green-500' : 'text-foreground'}`}>
                      {tx.type === 'credit' ? '+' : '-'}{format(tx.amount, tx.currency as any)}
                    </p>
                    <Badge variant="outline" className="text-[8px] h-4 py-0 uppercase">{tx.status}</Badge>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <MobileNav />
    </main>
  );
}
