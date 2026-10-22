// Pattern check: no GoF pattern (-) — rejected — shared presentational dock frame; a context-held portal target lets each section put its own Save in the header.
import { createContext, useContext, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X, Zap, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Button } from '@/ui/button'
import { Card } from '@/ui/card'

export interface DockTab<T extends string> {
    id: T
    label: string
    icon?: LucideIcon
}

const ActionsSlot = createContext<HTMLElement | null>(null)

/** Renders its children in the enclosing DockShell's header action area (the
 *  Save / Discard spot), wherever in the dock body it is written. Outside a
 *  dock it renders in place. */
export function DockActions({ children }: { children: ReactNode }) {
    const slot = useContext(ActionsSlot)
    return slot ? createPortal(children, slot) : <>{children}</>
}

/** The bottom dock frame shared by Lighting, Dynamic entries and Macros:
 *  icon + title, section tabs, then actions and close on one header row; the
 *  body scrolls under it. `live` docks show "Changes apply right away" in
 *  place of a Save. */
export function DockShell<T extends string>({
    icon: Icon,
    title,
    tabs,
    active,
    onTab,
    actions,
    live,
    onClose,
    children,
}: {
    icon: LucideIcon
    title: string
    tabs: DockTab<T>[]
    active: T
    onTab: (id: T) => void
    /** Dock-wide actions (e.g. Lighting's Save); sections add theirs via DockActions. */
    actions?: ReactNode
    live?: boolean
    onClose: () => void
    children: ReactNode
}): JSX.Element {
    const [slot, setSlot] = useState<HTMLElement | null>(null)
    return (
        <div className="w-full p-2">
            <Card className="relative gap-0 py-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-border px-4 py-2.5">
                    <span className="flex items-center gap-2">
                        <Icon className="size-4 text-primary" aria-hidden />
                        <span className="text-panel-title font-semibold">
                            {title}
                        </span>
                    </span>
                    {tabs.length > 1 && (
                        <nav
                            aria-label={`${title} sections`}
                            className="flex flex-wrap gap-0.5 rounded-lg bg-secondary p-0.5"
                        >
                            {tabs.map(({ id, label, icon: TabIcon }) => (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => onTab(id)}
                                    aria-current={
                                        active === id ? 'page' : undefined
                                    }
                                    className={cn(
                                        'flex items-center gap-1.5 rounded-md px-2.5 py-1 text-control font-semibold transition-colors',
                                        active === id
                                            ? 'bg-background text-foreground shadow-sm'
                                            : 'text-muted-foreground hover:text-foreground',
                                    )}
                                >
                                    {TabIcon && (
                                        <TabIcon className="size-3.5 shrink-0" />
                                    )}
                                    {label}
                                </button>
                            ))}
                        </nav>
                    )}
                    <div className="ml-auto flex items-center gap-1.5">
                        {live && (
                            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Zap className="size-3.5" />
                                Changes apply right away
                            </span>
                        )}
                        <div
                            ref={setSlot}
                            className="flex items-center gap-1.5"
                        />
                        {actions}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            aria-label={`Close ${title}`}
                            onClick={onClose}
                        >
                            <X className="size-4" />
                        </Button>
                    </div>
                </div>
                {/* Native overflow (not radix ScrollArea): a max-height-only
                    radix Root has no definite height for its h-full viewport. */}
                <div className="max-h-[40vh] overflow-y-auto p-4">
                    <ActionsSlot.Provider value={slot}>
                        {children}
                    </ActionsSlot.Provider>
                </div>
            </Card>
        </div>
    )
}
