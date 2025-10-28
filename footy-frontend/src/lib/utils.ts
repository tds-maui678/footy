import { type ClassValue } from "clsx";
import clsx from "clsx";
export function cn(...v: ClassValue[]) { return clsx(v); }

export const API_BASE = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "";