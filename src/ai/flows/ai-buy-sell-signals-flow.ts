'use server';
/**
 * @fileOverview This file implements an AI-powered buy/sell signal generator for crypto and forex pairs.
 *
 * - getAiBuySellSignals - A function that generates trading signals based on market analysis.
 * - AiBuySellSignalsInput - The input type for the getAiBuySellSignals function.
 * - AiBuySellSignalsOutput - The return type for the getAiBuySellSignals function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiBuySellSignalsInputSchema = z.object({
  assetPair: z.string().describe('The crypto or forex trading pair (e.g., "BTC/USD", "EUR/JPY").'),
  marketAnalysis: z.string().describe('A summary of current market conditions and technical analysis for the asset pair.'),
});
export type AiBuySellSignalsInput = z.infer<typeof AiBuySellSignalsInputSchema>;

const AiBuySellSignalsOutputSchema = z.object({
  signal: z.enum(['BUY', 'SELL', 'HOLD']).describe('The trading signal: BUY, SELL, or HOLD.'),
  targetPrice: z.number().describe('The recommended target price for the trade.'),
  stopLossPrice: z.number().describe('The recommended stop-loss price to limit potential losses.'),
  rationale: z.string().describe('A concise explanation for the generated signal.'),
  confidence: z.number().min(0).max(100).describe('A confidence score (0-100) for the signal strength.'),
});
export type AiBuySellSignalsOutput = z.infer<typeof AiBuySellSignalsOutputSchema>;

export async function getAiBuySellSignals(input: AiBuySellSignalsInput): Promise<AiBuySellSignalsOutput> {
  return aiBuySellSignalsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiBuySellSignalsPrompt',
  input: {schema: AiBuySellSignalsInputSchema},
  output: {schema: AiBuySellSignalsOutputSchema},
  prompt: `You are an expert financial analyst for Tradigo Prime, specializing in cryptocurrency and forex markets. Your task is to provide precise, AI-powered trading signals.

Based on the provided market analysis for the trading pair {{{assetPair}}}, generate a clear trading signal (BUY, SELL, or HOLD), a target price, a stop-loss price, a concise rationale, and a confidence score (0-100) indicating the strength of your signal.

Current Market Pair: {{{assetPair}}}
Market Analysis: {{{marketAnalysis}}}

Consider the volatility and current trends when making your decision. Provide numerical values for target and stop-loss prices.`,
});

const aiBuySellSignalsFlow = ai.defineFlow(
  {
    name: 'aiBuySellSignalsFlow',
    inputSchema: AiBuySellSignalsInputSchema,
    outputSchema: AiBuySellSignalsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
