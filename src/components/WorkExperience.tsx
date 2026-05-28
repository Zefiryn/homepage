"use client";

import {useTranslations} from "next-intl";
import {useInView} from "@/hooks/useInView";

type Job = {
    title: string;
    company: string;
    period: string;
    bullets: string[];
    tags: string[];
    accent: "blue" | "teal" | "gray";
};

const jobs: Job[] = [
    {
        title: "Senior Fullstack Developer",
        company: "Hatimeria",
        period: "2018 – 2026",
        accent: "gray",
        tags: ["Hyvä", "Magento 2", "GraphQL", "Elasticsearch", "Laravel", "Docker"],
        bullets: [
            "E-commerce dla branży motoryzacyjnej na Hyvä/Magento (Adobe Commerce) — integracja BankID i moduł \"Mój garaż\" do przechowywania danych pojazdu.",
            "Backend (zespół dwóch osób) dla multi-tenant platformy e-commerce dla 4 marek fashion — 3 000–15 000 SKU każda.",
            "Optymalizacja wydajności projektów Laravel: 18M rekordów, eksport setek tysięcy wierszy skrócony z 6–8h do 30–50min.",
            "Budowa i utrzymanie wewnętrznego narzędzia DevOps do budowania i deploymentu projektów (Docker + Warden) — używanego przez 10+ deweloperów w ponad 12 projektach.",
            "R&D i proof-of-concept integracji kryptowalutowej (Java, Node.js, REST API) — koncepcja zwalidowana przed pivotem projektu.",
            "Udział w rekrutacji: prowadzenie rozmów technicznych z kandydatami.",
            "Mentoring juniora w zakresie GraphQL i Elasticsearch.",
        ],
    },
    {
        title: "PHP Developer",
        company: "Hatimeria",
        period: "2015 – 2018",
        accent: "gray",
        tags: ["PHP", "Magento 1", "Magento 2", "MySQL"],
        bullets: [
            "Główny developer sklepu e-commerce sprzedającego żarówki.",
            "Przeprowadzenie migracji platformy z Magento 1 do Magento 2.",
        ],
    },
    {
        title: "PHP & RoR Developer",
        company: "Polcode",
        period: "2011 – 2015",
        accent: "gray",
        tags: ["PHP", "Magento", "Ruby on Rails"],
        bullets: [
            "Utrzymanie i rozwój kilku sklepów e-commerce opartych na platformie Magento.",
            "Rozwój aplikacji Ruby on Rails dla kanadyjskiego operatora sprzedającego bilety kolejowe.",
        ],
    },
];


function JobCard({job, index}: { job: Job; index: number }) {
    const {ref, inView} = useInView();
    const colors =  {
        dot: "bg-basic",
        line: "border-basic-mate"
    };
    const isLast = index === jobs.length - 1;

    return (
        <div
            ref={ref}
            className="relative flex gap-6 transition-all duration-700 ease-out"
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${index * 120}ms`,
            }}
        >
            <div className="flex flex-col items-center pt-1 w-4 shrink-0">
                <div className={`w-3 h-3 rounded-full shrink-0 mt-1 ${colors.dot}`}/>
                {!isLast && (
                    <div className={`flex-1 border-l mt-2 ${colors.line}`}/>
                )}
            </div>

            <div className={`pb-12 ${isLast ? "pb-0" : ""} flex-1 min-w-0`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                    <div>
                        <span className="text-base font-medium text-dark">{job.title}</span>
                        <span className="ml-2 text-sm text-basic">{job.company}</span>
                    </div>
                    <span className="text-sm font-medium tabular-nums text-basic">{job.period}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                    {job.tags.map((tag) => (
                        <span key={tag} className={`text-xs px-2 py-0.5 rounded-full text-basic bg-skill-bar font-medium`}>{tag}</span>
                    ))}
                </div>

                <ul className="space-y-1.5">
                    {job.bullets.map((bullet, i) => (
                        <li key={i} className="text-sm text-basic leading-relaxed flex gap-2">
                            <span className="mt-2 w-1 h-1 rounded-full bg-dark shrink-0"/>
                            {bullet}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default function WorkExperience() {
    const {ref: headingRef, inView: headingInView} = useInView(0.3);
    const t = useTranslations('WorkExperience');

    return (
        <div id="experience" className="max-w-full">
            <div
                ref={headingRef}
                className="mb-14 transition-all duration-700 ease-out"
                style={{
                    opacity: headingInView ? 1 : 0,
                    transform: headingInView ? "translateY(0)" : "translateY(16px)",
                }}
            >
                <h2 className="text-2xl font-medium text-dark">{t('title')}</h2>
            </div>

            <div>
                {jobs.map((job, index) => (
                    <JobCard key={`${job.company}-${job.period}`} job={job} index={index}/>
                ))}
            </div>
        </div>
    );
}
