// Pattern check: no GoF pattern (-) — rejected — presentational eyebrow label over the `eyebrow` utility.
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** The design system's eyebrow: an uppercase section label above a group. */
export function SectionLabel({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}): JSX.Element {
    return <div className={cn('eyebrow', className)}>{children}</div>
}
