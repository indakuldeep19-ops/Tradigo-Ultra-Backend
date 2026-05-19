'use server';
/**
 * @fileOverview An AI News Alchemist agent that summarizes and sentiment-analyzes global news for crypto and forex pairs.
 *
 * - summarizeNews - A function that handles the news summarization and sentiment analysis process.
 * - AiNewsSummarizerInput - The input type for the summarizeNews function.
 * - AiNewsSummarizerOutput - The return type for the summarizeNews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiNewsArticleSchema = z.object({
  title: z.string().describe('The title of the news article.'),
  content: z.string().describe('The full content of the news article.'),
  url: z.string().url().describe('The URL of the news article.'),
});

const AiNewsSummarizerInputSchema = z.object({
  asset: z
    .string()
    .describe('The crypto or forex pair for which to analyze the news (e.g., "BTC/USD", "EUR/JPY").'),
  newsArticles: z
    .array(AiNewsArticleSchema)
    .describe('An array of recent news articles to be summarized and analyzed.'),
});
export type AiNewsSummarizerInput = z.infer<typeof AiNewsSummarizerInputSchema>;

const AiNewsSummarizerOutputSchema = z.object({
  summary: z.string().describe('A concise, AI-generated summary of the market-moving events from the news articles.'),
  sentiment: z
    .enum(['Positive', 'Negative', 'Neutral', 'Mixed'])
    .describe('The overall sentiment of the news articles specifically towards the specified asset.'),
  relevanceScore: z
    .number()
    .min(0)
    .max(1)
    .describe('A score from 0 (not relevant) to 1 (extremely relevant) indicating how pertinent the news is to the asset.'),
  keyEvents: z
    .array(z.string())
    .describe('A list of key market-moving events or facts mentioned in the news that could impact the asset.'),
});
export type AiNewsSummarizerOutput = z.infer<typeof AiNewsSummarizerOutputSchema>;

export async function summarizeNews(input: AiNewsSummarizerInput): Promise<AiNewsSummarizerOutput> {
  return aiNewsSummarizerFlow(input);
}

const aiNewsSummarizerPrompt = ai.definePrompt({
  name: 'aiNewsSummarizerPrompt',
  input: {schema: AiNewsSummarizerInputSchema},
  output: {schema: AiNewsSummarizerOutputSchema},
  prompt: `You are an AI News Alchemist, specializing in summarizing real-time global financial news and performing sentiment analysis for specific crypto and forex pairs.
Your goal is to provide traders with a quick and accurate understanding of market-moving events, along with sentiment and relevance to a given asset.

Analyze the following news articles in the context of the asset: {{{asset}}}.
Identify key events and determine the overall sentiment (Positive, Negative, Neutral, or Mixed) specifically towards {{{asset}}}. Also, provide a relevance score from 0 to 1, where 1 means extremely relevant.

Summarize the information concisely and extract the most important market-moving events.

News Articles:
{{#each newsArticles}}
Title: {{{this.title}}}
URL: {{{this.url}}}
Content: {{{this.content}}}
---
{{/each}}

Provide your response in JSON format according to the output schema.
`,
});

const aiNewsSummarizerFlow = ai.defineFlow(
  {
    name: 'aiNewsSummarizerFlow',
    inputSchema: AiNewsSummarizerInputSchema,
    outputSchema: AiNewsSummarizerOutputSchema,
  },
  async input => {
    const {output} = await aiNewsSummarizerPrompt(input);
    return output!;
  }
);
