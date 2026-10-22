// Pattern check: no GoF pattern (-) — rejected — presentational responsive label/control row; container query decides one or two columns.
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Label } from '@/ui/label'

/** Wraps FormRows: a container whose own width (not the window's) decides
 *  whether rows sit side by side or stack. */
export function FormGrid({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}): JSX.Element {
    return (
        <div className={cn('@container/form flex flex-col', className)}>
            {children}
        </div>
    )
}

/** Label and hint on the left, the control on the right; stacks when the
 *  form is narrow. `tone="warning"` colours the hint (e.g. unsupported). */
export function FormRow({
    label,
    htmlFor,
    hint,
    tone,
    action,
    disabled,
    children,
}: {
    label: string
    htmlFor?: string
    hint?: ReactNode
    tone?: 'warning'
    /** A small trailing action beside the label (e.g. reset to default). */
    action?: ReactNode
    disabled?: boolean
    children: ReactNode
}): JSX.Element {
    return (
        <div className="grid grid-cols-1 items-center gap-x-6 gap-y-1.5 border-b border-border py-2.5 last:border-b-0 @lg/form:grid-cols-[minmax(0,1fr)_auto]">
            <div className="min-w-0">
                <div className="flex items-center gap-1">
                    <Label
                        htmlFor={htmlFor}
                        className={cn(
                            'text-panel-title font-semibold',
                            disabled && 'text-muted-foreground',
                        )}
                    >
                        {label}
                    </Label>
                    {action}
                </div>
                {hint && (
                    <p
                        className={cn(
                            'mt-0.5 text-xs',
                            tone === 'warning'
                                ? 'text-warning'
                                : 'text-muted-foreground',
                        )}
                    >
                        {hint}
                    </p>
                )}
            </div>
            <div className="flex justify-start @lg/form:justify-end">
                {children}
            </div>
        </div>
    )
}
