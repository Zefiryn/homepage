"use client";

import {useTranslations} from "next-intl";
import {useInView} from "@/hooks/useInView";

export default function About() {
    const {ref: headingRef, inView: headingInView} = useInView(0.3);
    const t = useTranslations('About');

    return (
        <div className="max-w-full text-justify">
            <div
                ref={headingRef}
                className="transition-all duration-700 ease-out text-basic"
                style={{
                    opacity: headingInView ? 1 : 0,
                    transform: headingInView ? "translateY(0)" : "translateY(16px)",
                    whiteSpace: "pre-line"
                }}
            >
                {t('bio')}
            </div>
        </div>
    );
}
