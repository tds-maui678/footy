import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";

export default function UISelect({
  value, onValueChange, items, placeholder
}: { value?:string; onValueChange:(v:string)=>void; items:string[]; placeholder?:string }) {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger className="inline-flex items-center justify-between rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm w-[240px]">
        <Select.Value placeholder={placeholder || "Select..."} />
        <Select.Icon><ChevronDown className="h-4 w-4 opacity-60" /></Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={6}
          className="z-[100] overflow-hidden rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl"
        >
          <Select.Viewport className="p-1 max-h-80 overflow-y-auto">
            {items.map(v => (
              <Select.Item
                key={v}
                value={v}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Select.ItemIndicator><Check className="h-4 w-4" /></Select.ItemIndicator>
                <Select.ItemText>{v}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}