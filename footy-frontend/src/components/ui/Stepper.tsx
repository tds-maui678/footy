// src/components/ui/Stepper.tsx
export default function Stepper({ steps, active, onNext }:{
  steps:string[]; active:number; onNext:()=>void;
}) {
  return (
    <div className="flex items-center gap-3 mb-3">
      {steps.map((s,i)=>(
        <div key={s} className={`px-3 py-1 rounded-full text-xs ${i<=active ? "bg-blue-600 text-white":"bg-gray-200 dark:bg-gray-800"}`}>
          {i+1}. {s}
        </div>
      ))}
      <button onClick={onNext} className="ml-auto rounded-lg px-3 py-1 text-sm border hover:bg-gray-100 dark:hover:bg-gray-800">
        Continue
      </button>
    </div>
  );
}