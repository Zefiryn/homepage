import {useCallback, useEffect, useState} from "react";
import Image from "next/image";

type GalleryOverlayProps = {
    images: string[];
    alt: string | null;
    initialIndex: number;
    onClose: () => void;
};

export default function Gallery({images, alt, initialIndex, onClose}: GalleryOverlayProps) {
    const [current, setCurrent] = useState(initialIndex);

    const prev = useCallback(() => setCurrent(i => (i - 1 + images.length) % images.length), [images.length]);
    const next = useCallback(() => setCurrent(i => (i + 1) % images.length), [images.length]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose, prev, next]);

    return (
        <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            {/* Top bar */}
            <div className="absolute top-0 inset-x-0 flex items-center justify-between px-4 py-3 pointer-events-none z-60">
                <span className="text-white/50 text-sm tabular-nums">
                    {current + 1} / {images.length}
                </span>
                <button
                    onClick={onClose}
                    className="pointer-events-auto text-white/60 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                    aria-label="Close gallery"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>

            {/* Main image */}
            <div
                className="relative w-full max-w-5xl px-16 flex-1 flex items-center justify-center"
                onClick={e => e.stopPropagation()}
            >
                <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center">
                    <Image
                        key={current}
                        src={images[current]}
                        alt={alt ? `${alt} — image ${current + 1}` : `Image ${current + 1}`}
                        fill
                        className="object-contain"
                        priority
                        sizes="90vw"
                    />
                </div>

                {/* Prev / Next buttons */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prev}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all duration-150"
                            aria-label="Previous image"
                        >
                            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
                                      d="M15 19l-7-7 7-7"/>
                            </svg>
                        </button>
                        <button
                            onClick={next}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all duration-150"
                            aria-label="Next image"
                        >
                            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
                <div
                    className="flex items-center gap-2 pb-4 px-4 mt-3 overflow-x-auto"
                    onClick={e => e.stopPropagation()}
                >
                    {images.map((src, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`
                                relative shrink-0 w-14 h-10 rounded-md overflow-hidden border-2 transition-all duration-150
                                ${i === current
                                ? "border-navigation-hover opacity-100 scale-105"
                                : "border-transparent opacity-40 hover:opacity-70"}
                            `}
                            aria-label={`Go to image ${i + 1}`}
                            aria-current={i === current}
                        >
                            <Image
                                src={src}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="56px"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}