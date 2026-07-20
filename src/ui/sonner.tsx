// Pattern check: Observer (Tier 1) — applied — MutationObserver on the root
// element's class keeps the toaster in sync with the app theme; the previous
// next-themes useTheme() had no provider mounted and always returned 'system'.
import { useEffect, useState } from 'react'
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

    return (
        <Sonner
            theme={theme}
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
                    description: 'group-[.toast]:text-muted-foreground',
                    actionButton:
                        'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
                    cancelButton:
                        'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
                },
            }}
            {...props}
        />
    )
}

export { Toaster }
