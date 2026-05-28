import Placeholder from "@/components/Image/Placeholder";
import Image from "next/image";

// Stack offsets for the layered photo effect (index 0 = frontmost)
const STACK_OFFSETS = [
    {rotate: 0, translateX: 0, translateY: 0, zIndex: 30},
    {rotate: -3, translateX: -6, translateY: 4, zIndex: 20},
    {rotate: 2.5, translateX: 6, translateY: 6, zIndex: 10},
];

export default function ImageSlot({images, imageAlt, onClick}: {
    images: string[] | null;
    imageAlt: string | null;
    onClick?: () => void;
}) {
    if (!images || images.length === 0) {
        return (
            <Placeholder imageAlt={imageAlt}/>
        );
    }

    // Show single image without stack chrome
    if (images.length === 1) {
        return (
            <div
                onClick={onClick}
                className="relative w-full h-full min-h-52 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 cursor-zoom-in group"
            >
                <Image
                    src={images[0]}
                    alt={imageAlt || ""}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
        );
    }

    // Multi-image stack
    const visibleCount = Math.min(images.length, STACK_OFFSETS.length);

    return (
        <div
            onClick={onClick}
            className="relative w-full min-h-52 cursor-zoom-in select-none"
            aria-label={`${images.length} images — click to view gallery`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
            style={{paddingBottom: "12px"}} // room for the back cards peeking below
        >
            {/* Render back cards first (highest index = furthest back) */}
            {Array.from({length: visibleCount}).map((_, i) => {
                const offset = STACK_OFFSETS[i];
                const isFront = i === 0;
                return (
                    <div
                        key={i}
                        className={`
                            absolute inset-0 rounded-xl overflow-hidden min-h-52
                            border-2 dark:border-zinc-200 border-zinc-700
                            transition-transform duration-300
                            ${isFront ? "group relative shadow-md hover:shadow-lg" : "shadow-sm"}
                        `}
                        style={{
                            transform: `rotate(${offset.rotate}deg) translate(${offset.translateX}px, ${offset.translateY}px)`,
                            zIndex: offset.zIndex,
                            // Front card scales up on hover via parent group
                        }}
                    >
                        <Image
                            src={images[i]}
                            alt={i === 0 ? (imageAlt || "") : `${imageAlt || "Project image"} ${i + 1}`}
                            fill
                            className={`object-cover ${isFront ? "transition-transform duration-500 group-hover:scale-105" : ""}`}
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                );
            })}

            <div
                className="absolute bottom-2 right-2 z-40 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium pointer-events-none"
                aria-hidden="true"
            >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                     strokeLinejoin="round" className="w-3 h-3">
                    <rect x="1" y="4" width="10" height="10" rx="1.5"/>
                    <path d="M5 4V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1"/>
                </svg>
                {images.length}
            </div>
        </div>
    );
}