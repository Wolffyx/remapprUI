// Pattern check: no GoF pattern (-) — rejected — presentational number field sized to its content, unit inside the field.
import * as React from 'react'
import { cn } from '@/lib/cn'
import { Input } from '@/ui/input'

/** A number field sized for its value (not the dialog), with the unit
 *  written inside it on the right. */
export const NumberInput = React.forwardRef<
    HTMLInputElement,
    Omit<React.ComponentProps<typeof Input>, 'type'> & { unit?: string }
>(({ unit, className, ...props }, ref) => (
    <div className={cn('relative w-32 shrink-0', className)}>
        <Input
            ref={ref}
            type="number"
            inputMode="numeric"
            className={cn('tabular-nums', unit && 'pr-10')}
            {...props}
        />
        {unit && (
            <span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-xs text-muted-foreground">
                {unit}
            </span>
        )}
    </div>
))
NumberInput.displayName = 'NumberInput'
