// Pattern check: no GoF pattern (-) — rejected — shared presentational settings row (label + hint left, switch right); replaces the per-feature copies.
import { useId } from 'react'
import { cn } from '@/lib/cn'
import { Switch } from '@/ui/switch'

/** A settings row: label and optional hint on the left, the switch on the
 *  right (design system Field, horizontal). `boxed` draws it as a bordered
 *  tile for dense panels. The whole row toggles. */
export function SwitchRow({
    label,
    hint,
    checked,
    disabled,
    onChange,
    boxed,
    className,
}: {
    label: string
    hint?: string
    checked: boolean
    disabled?: boolean
    onChange: (checked: boolean) => void
    boxed?: boolean
    className?: string
}): JSX.Element {
    const id = useId()
    return (
        <div
            className={cn(
                'flex items-center gap-2.5',
                boxed
                    ? 'rounded-lg border border-border bg-background px-2.5 py-2'
                    : 'py-[7px]',
                className,
            )}
        >
            <label htmlFor={id} className="min-w-0 flex-1 cursor-pointer">
                <span className="block text-panel-title font-semibold">
                    {label}
                </span>
                {hint ? (
                    <span className="block text-xs text-muted-foreground">
                        {hint}
                    </span>
                ) : null}
            </label>
            <Switch
                id={id}
                checked={checked}
                disabled={disabled}
                onCheckedChange={onChange}
            />
        </div>
    )
}
