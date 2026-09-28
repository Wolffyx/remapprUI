// Pattern check: Observer (Tier 1) — applied — MutationObserver on the root
// element's class keeps the toaster in sync with the app theme; the previous
// next-themes useTheme() had no provider mounted and always returned 'system'.
import { type CSSProperties, useEffect, useState } from 'react'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

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

    // Sonner paints toasts from its --normal-* variables, set per theme on
    // the toaster with selectors that outrank utility classes. Point them at
    // the app's tokens instead; the buttons need `!` for the same reason.
    return (
        <Sonner
            theme={theme}
            className="toaster group"
            style={
                {
                    '--normal-bg': 'var(--popover)',
                    '--normal-text': 'var(--popover-foreground)',
                    '--normal-border': 'var(--border)',
                } as CSSProperties
            }
            toastOptions={{
                classNames: {
                    toast: 'shadow-lg',
                    description: 'text-muted-foreground!',
                    actionButton: 'bg-primary! text-primary-foreground!',
                    cancelButton: 'bg-muted! text-muted-foreground!',
                },
            }}
            {...props}
        />
    )
}

export { Toaster }
