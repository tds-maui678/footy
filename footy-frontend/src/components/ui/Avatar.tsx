export default function Avatar({ src, alt }: { src?: string | null; alt: string }) {
  return <img src={src || "https://placehold.co/64x64?text=?"} alt={alt} className="h-10 w-10 rounded-full object-cover border border-gray-300 dark:border-gray-700" loading="lazy" />;
}