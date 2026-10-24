// Pattern check: no GoF pattern (-) — rejected — presentational two-line label; the plain name leads, the raw firmware id follows.
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** A plain name with the firmware's own id under it (design review f6, A):
 *  the name semibold, the id smaller, mono and muted. Used for card titles,
 *  dropdown options and setting labels whose value is a raw id. */
export function NamedId({
    name,
    id,
    className,
}: {
    name: ReactNode
    /** The raw id (devicetree string, behavior token, …); omitted when it
     *  would only repeat the name. */
    id?: string
    className?: string
}): JSX.Element {
    return (
        <span className={cn('flex min-w-0 flex-col gap-px', className)}>
            <span className="truncate font-semibold text-foreground">
                {name}
            </span>
            {id && (
                <span className="truncate font-mono text-[11px] font-normal text-muted-foreground">
                    {id}
                </span>
            )}
        </span>
    )
}
