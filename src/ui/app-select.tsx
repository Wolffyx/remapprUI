// Pattern check: Adapter (Tier 1) — applied — takes the native <select>/<option> call shape and renders the app's Radix Select, so native selects swap in place.
import {
    Children,
    isValidElement,
    type ReactElement,
    type ReactNode,
} from 'react'
import { cn } from '@/lib/cn'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/ui/select'

// Radix Select reserves the empty string; an empty option maps to this.
const EMPTY = '__empty__'
const toRadix = (v: string | number): string =>
    String(v) === '' ? EMPTY : String(v)
const fromRadix = (v: string): string => (v === EMPTY ? '' : v)

type OptionEl = ReactElement<{
    value: string | number
    disabled?: boolean
    children?: ReactNode
}>

/** The app Select, written like a native one: `<option>` children and an
 *  `onChange` that receives `{ target: { value } }`. */
export function AppSelect({
    value,
    onChange,
    disabled,
    className,
    children,
    'aria-label': ariaLabel,
}: {
    value: string | number
    onChange: (e: { target: { value: string } }) => void
    disabled?: boolean
    className?: string
    children: ReactNode
    'aria-label'?: string
}): JSX.Element {
    const options = Children.toArray(children).filter(
        (c): c is OptionEl => isValidElement(c) && c.type === 'option',
    )
    return (
        <Select
            value={toRadix(value)}
            onValueChange={(v) => onChange({ target: { value: fromRadix(v) } })}
            disabled={disabled}
        >
            <SelectTrigger
                aria-label={ariaLabel}
                className={cn('h-8 w-full text-xs font-semibold', className)}
            >
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {options.map((o) => (
                    <SelectItem
                        key={toRadix(o.props.value)}
                        value={toRadix(o.props.value)}
                        disabled={o.props.disabled}
                    >
                        {o.props.children}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
