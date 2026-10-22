import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/cn'

const badgeVariants = cva(
    'inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
        variants: {
            variant: {
                default:
                    'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
                secondary:
                    'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
                destructive:
                    'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
                outline: 'text-foreground',
                // Category colour from a `--badge-tone` CSS variable the caller sets
                // (e.g. a news tag): tinted, or filled with `tone-solid`.
                tone: 'border-transparent bg-[color-mix(in_oklab,var(--badge-tone)_15%,transparent)] text-[var(--badge-tone)]',
                'tone-solid':
                    'border-transparent bg-[var(--badge-tone)] text-background',
            },
            size: {
                default: '',
                // Compact uppercase status chip (role, state, stage).
                sm: 'gap-1 rounded px-1.5 py-0.5 text-meta font-bold uppercase tracking-wide [&_svg]:size-3',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
)

/** Status tones from the theme; each sets `--badge-tone` for the tone variants. */
const TONE_VAR = {
    success: 'var(--success)',
    warning: 'var(--warning)',
    info: 'var(--info)',
    danger: 'var(--danger)',
    primary: 'var(--primary)',
    muted: 'var(--muted-foreground)',
} as const

export type BadgeTone = keyof typeof TONE_VAR

export interface BadgeProps
    extends
        React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof badgeVariants> {
    /** Theme status colour; implies the `tone` variant unless one is given. */
    tone?: BadgeTone
}

function Badge({
    className,
    variant,
    size,
    tone,
    style,
    ...props
}: BadgeProps) {
    return (
        <span
            className={cn(
                badgeVariants({
                    variant: variant ?? (tone ? 'tone' : undefined),
                    size,
                }),
                className,
            )}
            style={
                tone
                    ? ({
                          '--badge-tone': TONE_VAR[tone],
                          ...style,
                      } as React.CSSProperties)
                    : style
            }
            {...props}
        />
    )
}

export { Badge, badgeVariants }
