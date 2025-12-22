'use server';
/**
 * @fileOverview Summarizes product reviews using Genkit.
 *
 * - summarizeProductReviews - A function that summarizes product reviews for a given product ID.
 * - SummarizeProductReviewsInput - The input type for the summarizeProductReviews function.
 * - SummarizeProductReviewsOutput - The return type for the summarizeProductReviews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeProductReviewsInputSchema = z.object({
  productId: z.string().describe('The ID of the product to summarize reviews for.'),
  reviews: z.array(z.string()).describe('Array of user reviews for the product.'),
});

export type SummarizeProductReviewsInput = z.infer<typeof SummarizeProductReviewsInputSchema>;

const SummarizeProductReviewsOutputSchema = z.object({
  summary: z.string().describe('A summary of the product reviews.'),
});

export type SummarizeProductReviewsOutput = z.infer<typeof SummarizeProductReviewsOutputSchema>;

export async function summarizeProductReviews(input: SummarizeProductReviewsInput): Promise<SummarizeProductReviewsOutput> {
  return summarizeProductReviewsFlow(input);
}

const summarizeProductReviewsPrompt = ai.definePrompt({
  name: 'summarizeProductReviewsPrompt',
  input: {schema: SummarizeProductReviewsInputSchema},
  output: {schema: SummarizeProductReviewsOutputSchema},
  prompt: `Summarize the following product reviews into a concise paragraph highlighting the main points and overall sentiment:\n\n{%#each reviews%}\n- {{{this}}}\n{%/each%}`,
});

const summarizeProductReviewsFlow = ai.defineFlow(
  {
    name: 'summarizeProductReviewsFlow',
    inputSchema: SummarizeProductReviewsInputSchema,
    outputSchema: SummarizeProductReviewsOutputSchema,
  },
  async input => {
    const {output} = await summarizeProductReviewsPrompt(input);
    return output!;
  }
);
