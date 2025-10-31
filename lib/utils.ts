import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function clsx(inputs: ClassValue[]): import("tailwind-merge").ClassNameValue {
  return inputs
    .flat()
    .filter(Boolean)
    .join(' ');
}
