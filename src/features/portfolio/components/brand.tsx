import { ZeelMark } from "@/components/zeel-mark";
import { ChanhDaiWordmark } from "@/components/chanhdai-wordmark";

import { Panel, PanelHeader, PanelTitle } from "./panel";

export function Brand() {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>Brand</PanelTitle>
      </PanelHeader>

      <div className="grid grid-cols-[2rem_1fr]">
        <div className="flex h-28 items-center justify-center border-r border-dashed border-edge bg-background">
          <span className="rotate-270 text-sm text-muted-foreground select-none">
            Mark
          </span>
        </div>

        <div className="screen-line-after flex items-center justify-center pr-8 after:z-1">
          <ZeelMark className="h-8 w-auto sm:h-12" />
        </div>

        <div className="flex h-28 items-center justify-center border-r border-dashed border-edge bg-background">
          <span className="rotate-270 text-sm text-muted-foreground select-none">
            Logotype
          </span>
        </div>

        <div className="screen-line-after flex items-center justify-center pr-8 after:z-1">
          <ChanhDaiWordmark className="h-6 w-auto sm:h-10" />
        </div>
      </div>
    </Panel>
  );
}
