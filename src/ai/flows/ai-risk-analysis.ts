'use server';
/**
 * @fileOverview An AI agent that provides risk analysis reports for financial assets.
 *
 * - aiRiskAnalysis - A function that handles the AI-powered risk analysis process.
 * - AiRiskAnalysisInput - The input type for the aiRiskAnalysis function.
 * - AiRiskAnalysisOutput - The return type for the aiRiskAnalysis function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiRiskAnalysisInputSchema = z.object({
  assetName: z
    .string()
    .describe('The name or ticker symbol of the financial asset to analyze (e.g., "TSLA", "Bitcoin", "EUR/USD").'),
  currentPrice: z
    .number()
    .optional()
    .describe('The current market price of the asset, if available, for more precise analysis.'),
  additionalContext: z
    .string()
    .optional()
    .describe('Any additional relevant market news, recent events, or specific concerns about the asset.'),
});
export type AiRiskAnalysisInput = z.infer<typeof AiRiskAnalysisInputSchema>;

const AiRiskAnalysisOutputSchema = z.object({
  riskLevel: z
    .enum(['Low', 'Medium', 'High', 'Very High'])
    .describe('The overall risk level of the asset.'),
  riskScore: z
    .number()
    .min(0)
    .max(100)
    .describe('A numerical score representing the risk, where 0 is lowest risk and 100 is highest risk.'),
  summary: z.string().describe('A concise summary of the risk analysis.'),
  potentialDownsides: z
    .array(z.string())
    .describe('A list of potential negative scenarios or risks associated with the asset.'),
  potentialUpsides: z
    .array(z.string())
    .describe('A list of potential positive outcomes or opportunities associated with the asset.'),
  mitigationStrategies: z
    .array(z.string())
    .describe('Suggested strategies to mitigate identified risks.'),
  recommendation: z
    .string()
    .describe('A final recommendation based on the risk analysis.'),
});
export type AiRiskAnalysisOutput = z.infer<typeof AiRiskAnalysisOutputSchema>;

export async function aiRiskAnalysis(input: AiRiskAnalysisInput): Promise<AiRiskAnalysisOutput> {
  return aiRiskAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiRiskAnalysisPrompt',
  input: { schema: AiRiskAnalysisInputSchema },
  output: { schema: AiRiskAnalysisOutputSchema },
  prompt: `You are an expert financial risk analyst specializing in crypto, forex, and equities markets. Your task is to provide a comprehensive risk analysis report for a given asset.

Analyze the provided asset's information and generate a detailed report focusing on potential risks, but also acknowledging potential upsides to provide a balanced view. Ensure the output strictly adheres to the specified JSON schema.

Asset Name: {{{assetName}}}
{{#if currentPrice}}Current Price: {{{currentPrice}}}{{/if}}
{{#if additionalContext}}Additional Context: {{{additionalContext}}}{{/if}}

Consider market volatility, liquidity, macroeconomic factors, industry-specific risks, and any relevant news.

Your output MUST be a JSON object conforming to the AiRiskAnalysisOutputSchema.`,
});

const aiRiskAnalysisFlow = ai.defineFlow(
  {
    name: 'aiRiskAnalysisFlow',
    inputSchema: AiRiskAnalysisInputSchema,
    outputSchema: AiRiskAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate risk analysis report.');
    }
    return output;
  }
);
