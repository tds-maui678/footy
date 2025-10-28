export function Table({ children }:{children:React.ReactNode}) {
  return <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">{children}</div>;
}
export function TSimple({ children }:{children:React.ReactNode}) {
  return <table className="min-w-full text-sm">{children}</table>;
}
export function TH({ children }:{children:React.ReactNode}) {
  return <th className="text-left bg-gray-50 dark:bg-gray-900 p-3 font-medium">{children}</th>;
}
export function TD({ children }:{children:React.ReactNode}) {
  return <td className="p-3 border-t border-gray-100 dark:border-gray-800">{children}</td>;
}