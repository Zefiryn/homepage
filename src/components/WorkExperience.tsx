"use client";

import {useTranslations} from "next-intl";
import {useInView} from "@/hooks/useInView";

type Job = {
    title: string;
    company: string;
    period: string;
    bullets: string[];
    tags: string[];
};

const jobs: Job[] = [
    {
        title: "Senior Fullstack Developer",
        company: "Hatimeria",
        period: "2018 – 2026",
        tags: ["Hyvä", "Magento 2", "Adobe Commerce", "Akaneo", "Laravel", "GraphQL", "MySQL", "Elasticsearch", "MongoDB", "Docker", "Node.js", "TailwindCSS"],
        bullets: [
            "Delivered full-stack e-commerce solutions for the automotive industry on Hyvä/Magento (Adobe Commerce), including a BankID-based authentication flow and a \"My Garage\" feature that stores customers' vehicle profiles to power smarter product filtering and search.",
            "Co-built (two-person team) the backend for a multi-tenant e-commerce platform serving 4 fashion brands simultaneously, handling catalogs of 3,000–15,000 SKUs each using Magento, GraphQL, and Elasticsearch.",
            "Achieved a ~10× performance gain on large-scale Laravel data pipelines: bulk exports across 18M records dropped from 6–8 hours down to 30–50 minutes through query optimization and architectural improvements.",
            "Designed and maintained an internal DevOps CLI tool for standardized project builds and deployments (Docker + Warden), adopted by 10+ developers across more than 12 concurrent projects — significantly reducing environment setup friction.",
            "Led R&D and built a working proof-of-concept for a cryptocurrency payment integration (Java, Node.js, third-party REST APIs); the concept was validated and the decision to pivot was made based on business — not technical — grounds.",
            "Contributed to hiring by conducting technical interviews, helping assess candidate quality and maintain engineering standards within the team.",
            "Mentored a junior developer through hands-on coaching in GraphQL schema design and Elasticsearch query patterns, accelerating their ramp-up on production-level tasks.",
        ],
    },
    {
        title: "PHP Developer",
        company: "Hatimeria",
        period: "2015 – 2018",
        tags: ["PHP", "Magento 1", "Magento 2", "MySQL"],
        bullets: [
            "Served as the primary developer responsible for a live e-commerce store selling lighting products — owning feature development, bug fixes, and day-to-day platform health end-to-end.",
            "Planned and executed a full platform migration from Magento 1 to Magento 2, including data mapping, custom module rewriting, and cutover strategy — a technically demanding upgrade that modernized the entire codebase.",
        ],
    },
    {
        title: "PHP & RoR Developer",
        company: "Polcode",
        period: "2011 – 2015",
        tags: ["PHP", "Magento", "Ruby on Rails"],
        bullets: [
            "Maintained and extended multiple Magento-based e-commerce sites, handling a diverse client portfolio with varying business requirements, custom extensions, and third-party integrations.",
            "Developed Ruby on Rails applications for a Canadian rail operator's ticket sales platform — gaining cross-language experience and exposure to transactional, booking-flow systems with real-time availability constraints.",
        ],
    },
    {
        title: "Freelance Developer",
        company: "Various clients",
        period: "2009 – 2011",
        tags: ["PHP", "CSS", "Zend", "knockout.js"],
        bullets: [
            "Built and launched a submission management platform for an international design competition spanning 4 countries, processing around 300 entries per year. The application remained in active production use for 4 years — a strong signal of reliability and long-term fit to the client's operational needs.",
            "Developed Ruby on Rails applications for a Canadian rail operator's ticket sales platform — gaining cross-language experience and exposure to transactional, booking-flow systems with real-time availability constraints.",
        ],
    }
]


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
                        <span key={tag} className={`text-xs px-2 py-0.5 rounded-full text-basic bg-skill-bar dark:bg-basic dark:text-gradient-start font-medium`}>{tag}</span>
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
