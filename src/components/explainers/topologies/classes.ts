import { badgeVariants } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const chipBase = cn(
	badgeVariants({ variant: "outline" }),
	"h-auto rounded-md border-transparent px-2 py-0.5 text-[11px] leading-tight font-normal",
)

export const plainChipClassName = cn(
	chipBase,
	"bg-foreground/5 text-foreground/80",
)

export const routingChipClassName = cn(
	chipBase,
	"bg-fast-path/15 text-foreground ring-fast-path/60 ring-1",
)

export const sharedChipClassName = cn(
	chipBase,
	"bg-model/15 text-foreground ring-model/50 ring-1",
)

export const delegatedChipClassName = cn(
	chipBase,
	"border-model/70 text-foreground border-dashed",
)

export const identityChipClassName = cn(
	badgeVariants({ variant: "outline" }),
	"bg-model/10 ring-model/40 h-auto gap-1.5 border-transparent py-0.5 pr-2 pl-0.5 text-[11px] font-normal ring-1",
)

export const overlayPillClassName = cn(
	badgeVariants({ variant: "outline" }),
	"bg-background text-muted-foreground h-auto px-2 py-0.5 text-[10px] font-normal",
)

export const stageClassName =
	"motion-safe:transition-[aspect-ratio] motion-safe:duration-700 motion-safe:ease-out"

export const frameClassName =
	"absolute top-0 left-0 motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out"
