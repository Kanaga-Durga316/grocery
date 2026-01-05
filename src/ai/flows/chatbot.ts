
'use server';

import { ai } from '@/ai/genkit';
import { getProductById, getProducts } from '@/lib/data';
import { z } from 'zod';

const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  stock: z.number(),
  category: z.string(),
});

const searchProducts = ai.defineTool(
  {
    name: 'searchProducts',
    description: 'Search for products based on a query.',
    inputSchema: z.object({ query: z.string() }),
    outputSchema: z.array(ProductSchema),
  },
  async ({ query }) => {
    const products = getProducts();
    return products
      .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
      .map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        stock: p.stock,
        category: p.categoryId,
      }));
  }
);

const getProductDetails = ai.defineTool(
    {
        name: 'getProductDetails',
        description: 'Get details for a specific product by its ID.',
        inputSchema: z.object({ productId: z.string() }),
        outputSchema: ProductSchema.optional(),
    },
    async ({ productId }) => {
        const product = getProductById(productId);
        if (!product) return undefined;
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            category: product.categoryId,
        };
    }
);

export const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
    tools: [searchProducts, getProductDetails],
  },
  async (prompt) => {
    const llmResponse = await ai.generate({
      prompt: prompt,
      model: 'googleai/gemini-2.5-flash',
      tools: [searchProducts, getProductDetails],
      config: {
        temperature: 0.3,
      },
    });

    return llmResponse.text;
  }
);

export async function chat(prompt: string): Promise<string> {
    return chatbotFlow(prompt);
}
