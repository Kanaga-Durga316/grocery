'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-product-reviews.ts';
import '@/ai/flows/chatbot.ts';
