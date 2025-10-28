import * as TT from "@radix-ui/react-tooltip";
export default function Tooltip({ content, children }:{content:string; children:React.ReactNode}) {
  return (
    <TT.Provider delayDuration={150}>
      <TT.Root>
        <TT.Trigger asChild>{children}</TT.Trigger>
        <TT.Portal>
          <TT.Content className="rounded-md bg-black text-white text-xs px-2 py-1 shadow-lg" sideOffset={6}>
            {content}
            <TT.Arrow className="fill-black" />
          </TT.Content>
        </TT.Portal>
      </TT.Root>
    </TT.Provider>
  );
}