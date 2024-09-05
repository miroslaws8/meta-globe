import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDarkeningFactor(count: number, step: number = 0.001): number {
  // Calculate the darkening factor based on count
  const factor = 1 - (count * step);

  // Ensure the factor doesn't go below 0 (i.e., the color doesn't become completely black)
  return Math.max(0, factor);
}

export function darkenRgbString(rgbString: string, count: number, step: number = 0.001): string {
  // Get the darkening factor based on the count
  const factor = getDarkeningFactor(count, step);

  // Extract the RGB values using a regular expression
  const rgbValues = rgbString.match(/\d+/g)?.map(Number);

  if (!rgbValues || rgbValues.length !== 3) {
    throw new Error('Invalid RGB string format');
  }

  // Destructure the RGB values
  const [r, g, b] = rgbValues;

  // Darken each channel
  const newR = Math.floor(r * factor);
  const newG = Math.floor(g * factor);
  const newB = Math.floor(b * factor);

  // Return the new RGB string
  return `rgb(${newR}, ${newG}, ${newB})`;
}