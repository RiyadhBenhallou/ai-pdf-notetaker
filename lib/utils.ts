import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function genPrompt(question: string, answer: string) {
  return `
  given the following question and answer, rewrite the answer in a more concise and professional manner and in an HTML form and provide the HTML directly witout any additional labeling.

  Question: ${question}
  Answer: ${answer}
  `;
}
