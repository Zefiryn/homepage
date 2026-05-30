"use client";

import {useTranslations} from "next-intl";
import {useInView} from "@/hooks/useInView";

type Skill = {
    name: string;
    years: number;
    maxYears?: number;
};

type SkillGroup = {
    label: string;
    skills: Skill[];
};

type Tag = {
    name: string;
};

const skillGroups: SkillGroup[] = [
    {
        label: "Core",
        skills: [
            {name: "PHP", years: 15},
            {name: "MySQL", years: 15},
            {name: "Adobe Commerce / Magento 2", years: 10},
            {name: "Rest API", years: 5},
            {name: "Node.js", years: 6},
            {name: "Elasticsearch", years: 4},
            {name: "Laravel", years: 3},
            {name: "MongoDB / Redis", years: 3},
            {name: "Symfony", years: 1},
        ],
    },
    {
        label: "Frontend",
        skills: [
            {name: "Knockout.js", years: 8},
            {name: "Hyvä", years: 3},
            {name: "Alpine.js", years: 3},
            {name: "Vue", years: 3},
            {name: "SASS / Less", years: 3},
            {name: "TailwindCSS", years: 3},
            {name: "React", years: 2},
        ],
    },
];

const toolTags: Tag[] = [
    {name: "Git"},
    {name: "Docker"},
    {name: "RabbitMQ"},
    {name: "AWS Lambda"},
    {name: "Unit Testing"},
    {name: "Scrum"},
    {name: "Ruby on Rails"},
    {name: ".Net"},
    {name: "Java"},
];

const MAX_YEARS = 15;


function SkillBar({
                      skill,
                      index,
                      animate,
                  }: {
    skill: Skill;
    index: number;
    animate: boolean;
}) {
    const pct = Math.round((skill.years / (skill.maxYears ?? MAX_YEARS)) * 100);
    const t = useTranslations('Skills');

    return (
        <div
            className="transition-all duration-500 ease-out"
            style={{
                opacity: animate ? 1 : 0,
                transform: animate ? "translateX(0)" : "translateX(-8px)",
                transitionDelay: `${index * 60}ms`,
            }}
        >
            <div className="flex items-baseline justify-between mb-1 gap-2">
                <span className="text-sm text-basic leading-tight">{skill.name}</span>
                <span
                    className="text-xs tabular-nums text-basic shrink-0">{skill.years} {t('years_' + (skill.years > 1 ? 'plural' : 'singular'))}</span>
            </div>
            <div className="h-1 w-full rounded-full bg-skill-bar overflow-hidden">
                <div
                    className="h-full rounded-full bg-skill dark:bg-skill-dark transition-all duration-700 ease-out"
                    style={{
                        width: animate ? `${pct}%` : "0%",
                        transitionDelay: `${index * 60 + 100}ms`,
                    }}
                />
            </div>
        </div>
    );
}

function SkillColumn({group, animate}: { group: SkillGroup; animate: boolean }) {
    return (
        <div>
            <p className="text-xs font-medium tracking-widest uppercase text-navigation mb-4">
                {group.label}
            </p>
            <div className="space-y-3.5">
                {group.skills.map((skill, i) => (
                    <SkillBar key={skill.name} skill={skill} index={i} animate={animate}/>
                ))}
            </div>
        </div>
    );
}

export default function Skills() {
    const {ref: headingRef, inView: headingInView} = useInView(0.3);
    const {ref: contentRef, inView: contentInView} = useInView(0.1);
    const t = useTranslations('Skills');

    return (
        <section className="w-full">
            <div
                ref={headingRef}
                className="mb-8 transition-all duration-700 ease-out"
                style={{
                    opacity: headingInView ? 1 : 0,
                    transform: headingInView ? "translateY(0)" : "translateY(16px)",
                }}
            >
                <h2 className="text-2xl font-medium text-dark">{t('title')}</h2>
            </div>

            <div ref={contentRef} className="grid gap-10 sm:grid-cols-2 mb-12">
                {skillGroups.map((group) => (
                    <SkillColumn key={group.label} group={group} animate={contentInView}/>
                ))}
            </div>

            <div
                className="transition-all duration-700 ease-out"
                style={{
                    opacity: contentInView ? 1 : 0,
                    transform: contentInView ? "translateY(0)" : "translateY(12px)",
                    transitionDelay: "300ms"
                }}
            >
                <p className="text-xs font-medium tracking-widest uppercase text-navigation mb-3">{t('toolTags')}</p>
                <div className="flex flex-wrap gap-2">
                    {toolTags.map((tag) => (
                        <span
                            key={tag.name}
                            className="text-xs px-2.5 py-1 rounded-full  text-basic bg-skill-bar"
                        >
                            {tag.name}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
