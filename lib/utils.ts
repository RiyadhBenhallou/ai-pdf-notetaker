import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function genPrompt(query: string, context: string) {
  return `
    You are an AI assistant helping a user with their document.
    
    User Query: ${query}
    
    Context from the document:
    ${context}
    
    Based on the context provided, please answer the user's query in a clear and concise manner.
    If the context doesn't contain relevant information to answer the query, please state that and provide general information if possible.
    Format your response in markdown for better readability.
  `;
}

export function truncateText(text: string, maxLength = 100): string {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}
