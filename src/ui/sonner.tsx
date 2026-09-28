// Pattern check: Observer (Tier 1) — applied — MutationObserver on the root
// element's class keeps the toaster in sync with the app theme; the previous
// next-themes useTheme() had no provider mounted and always returned 'system'.
//
// shadcn v4 sonner.tsx, with two local changes: the theme comes from the
// class on <html> (useRootTheme) instead of next-themes, and the action
// button wears the primary colour.
import { type CSSProperties, useEffect, useState } from 'react'
import {
    CircleCheckIcon,
    InfoIcon,
    Loader2Icon,
    OctagonXIcon,
    TriangleAlertIcon,
} from 'lucide-react'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

const readRootTheme = (): 'light' | 'dark' =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'

// The app's ThemeProvider stamps `light`/`dark` on <html> — watch that class
// instead of depending on a theming library the app doesn't use.
function useRootTheme(): 'light' | 'dark' {
    const [theme, setTheme] = useState<'light' | 'dark'>(readRootTheme)
    useEffect(() => {
        const observer = new MutationObserver(() => setTheme(readRootTheme()))
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        })
        return () => observer.disconnect()
    }, [])
    return theme
}

const Toaster = ({ ...props }: ToasterProps): JSX.Element => {
    const theme = useRootTheme()

    return (
        <Sonner
            theme={theme}
            className="toaster group"
            icons={{
                success: <CircleCheckIcon className="size-4" />,
                info: <InfoIcon className="size-4" />,
                warning: <TriangleAlertIcon className="size-4" />,
                error: <OctagonXIcon className="size-4" />,
                loading: <Loader2Icon className="size-4 animate-spin" />,
            }}
            style={
                {
                    '--normal-bg': 'var(--popover)',
                    '--normal-text': 'var(--popover-foreground)',
                    '--normal-border': 'var(--border)',
                    '--border-radius': 'var(--radius)',
                } as CSSProperties
            }
            // Sonner's own button rule outranks a plain utility class.
            toastOptions={{
                classNames: {
                    actionButton: 'bg-primary! text-primary-foreground!',
                },
            }}
            {...props}
        />
    )
}

export { Toaster }
