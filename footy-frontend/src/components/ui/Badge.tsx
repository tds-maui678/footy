export default function Badge({ children }: { children:React.ReactNode }) {
  return <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-700 px-2 py-0.5 text-xs">{children}</span>;
}