export default function Placeholder({ imageAlt }: { imageAlt: string | null }) {
    return (
        <div
            className="w-full min-h-52 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center gap-2 text-zinc-400 dark:text-zinc-600 bg-zinc-50 dark:bg-zinc-900"
            aria-label={`Image placeholder: ${imageAlt || 'Project image'}`}
        >
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8"
                aria-hidden="true"
            >
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="M21 15l-5-5L5 21"/>
            </svg>
        </div>
    );
}