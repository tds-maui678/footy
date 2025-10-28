export default function Card({ children, className="" }: {children:React.ReactNode; className?:string}) {
  return <div className={`bg-white dark:bg-gray-900 shadow-xl shadow-black/5 rounded-xl p-5 ${className}`}>{children}</div>;
}