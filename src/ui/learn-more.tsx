// Pattern check: no GoF pattern (-) — rejected — presentational docs link; replaces spec-section references (§7.4.1 …) in product text.
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { DOCS_URL } from '@/lib/constants'

/** "Learn more ↗": opens a page of the docs site (`path`, e.g.
 *  "guide/app/advanced#link-profile") in the browser. Sits at the end of a
 *  help line, so the spec section lives in the docs, not in the UI. */
export function LearnMore({
    path,
    className,
}: {
    path: string
    className?: string
}): JSX.Element {
    return (
        <a
            href={`${DOCS_URL}/${path}`}
            target="_blank"
            rel="noreferrer"
            className={cn(
                'inline-flex items-center gap-0.5 font-semibold whitespace-nowrap text-primary hover:underline',
                className,
            )}
        >
            Learn more
            <ArrowUpRight className="size-3" aria-hidden />
        </a>
    )
}
