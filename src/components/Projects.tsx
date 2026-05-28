"use client";

import {useState, useEffect} from "react";
import {useInView} from "@/hooks/useInView";
import {useTranslations} from "next-intl";
import Gallery from "@/components/Image/Gallery";
import ImageSlot from "@/components/Image/Slot";

type ProjectTag = {
    label: string;
};

type ProjectHighlight = {
    text: string;
};

type Project = {
    title: string;
    category: string;
    description: string;
    highlights: ProjectHighlight[];
    tags: ProjectTag[];
    externalUrl: string;
    type: "software" | "hardware" | "model3d";
    images: string[] | null;
    imageAlt: string | null;
    hasRepo: boolean;
};

const projects: Project[] = [
    {
        title: "Weather Station",
        category: "Embedded / Hardware",
        type: "hardware",
        description: "A standalone weather monitoring station built on Raspberry Pi Pico. Measures temperature, humidity, and atmospheric pressure in real time, displaying readings on an e-ink screen. Designed as a fully self-contained device — the project includes custom PCB schematics and a 3D-printed enclosure model. It utilises solar panel as a source of energy for the internal rechargable battery",
        highlights: [
            {text: "Runs on Raspberry Pi Pico (Code in C)"},
            {text: "E-ink display for low power consumption"},
            {text: "Custom PCB design included"},
            {text: "3D model of the enclosure ready to print"},
        ],
        tags: [
            {label: "C"},
            {label: "Raspberry Pi Pico"},
            {label: "E-ink"},
            {label: "PCB Design"},
            {label: "3D Printing"},
        ],
        externalUrl: "https://github.com/Zefiryn/Temperature_sensor",
        images: ["/images/projects/weather-station.jpg", "/images/projects/weather-solar.jpg", "/images/projects/weather-inside.jpg"],
        imageAlt: "Weather Station interface and hardware",
        hasRepo: true
    },
    {
        title: "Power Monitor",
        category: "Web Application",
        type: "software",
        description: "A Symfony-based web application for tracking household electricity consumption. Built with a full backend in PHP/Symfony, database migrations, and a Twig-rendered frontend styled with TailwindCSS. Containerised with Docker for easy local deployment.",
        highlights: [
            {text: "Symfony backend with Doctrine migrations"},
            {text: "TailwindCSS + Webpack Encore frontend"},
            {text: "Docker Compose setup for local development"},
            {text: "Unit tests included"},
        ],
        tags: [
            {label: "Symfony"},
            {label: "PHP"},
            {label: "Twig"},
            {label: "TailwindCSS"},
            {label: "Docker"},
            {label: "MySQL"},
        ],
        externalUrl: "https://github.com/Zefiryn/power",
        images: ["/images/projects/power.png"],
        imageAlt: 'Dashboard of the Power Monitor application',
        hasRepo: true
    },
    {
        title: "Keyboard Tenting",
        category: "3D Model",
        type: "model3d",
        description: "I really loved A simple case for the DASBOB keyboard which fits perfectly with the pcb. However the tenting in that model was too bulky for my taste so I designed new from scratch.",
        highlights: [
            {text: "FreeCAD model"},
        ],
        tags: [
            {label: "FreeCAD"},
            {label: "3D Printing"},
        ],
        externalUrl: "https://www.printables.com/model/1186734-dasbob-keyboard-tenting",
        images: ["/images/projects/dasbob.png", "/images/projects/dasbob2.png"],
        imageAlt: 'Dashboard of the Power Monitor application',
        hasRepo: false
    },
];

const typeIconPath: Record<Project["type"], string> = {
    software: "M6.5 3.5h9a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1zm-3 3h-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h1M18.5 6.5h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M9 7.5h6M9 10.5h6M9 13.5h4",
    hardware: "M9 3H7a2 2 0 0 0-2 2v2M9 3h6M9 3v2m6-2h2a2 2 0 0 1 2 2v2M15 3v2M3 9v6M21 9v6M9 21H7a2 2 0 0 1-2-2v-2m4 4h6m-6 0v-2m6 2h2a2 2 0 0 0 2-2v-2m-4 4v-2M3 9h2m14 0h2M3 15h2m14 0h2M9 9h6v6H9z",
    model3d: "M12 2l9 5v10l-9 5-9-5V7l9-5zM12 2v10m0 10V12m9-5l-9 5m-9-5l9 5",
};



function ProjectRow({project, index, onImageClick}: {
    project: Project;
    index: number;
    onImageClick?: (images: string[], alt: string | null) => void;
}) {
    const {ref, inView} = useInView();
    const imageOnLeft = index % 2 === 0;
    const t = useTranslations('Projects');

    const content = (
        <div className="flex flex-col gap-4 justify-center">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs font-medium tracking-wide uppercase text-basic-mate mb-1">
                        {project.category}
                    </p>
                    <h3 className="text-lg font-medium text-basic">
                        {project.title}
                    </h3>
                </div>
                <div
                    className="shrink-0 w-9 h-9 rounded-lg border border-navigation text-basic flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                         strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                        <path d={typeIconPath[project.type]}/>
                    </svg>
                </div>
            </div>

            <p className="text-sm text-basic leading-relaxed">
                {project.description}
            </p>

            <ul className="space-y-1.5">
                {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-basic">
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
                             strokeLinecap="round" strokeLinejoin="round"
                             className="w-3.5 h-3.5 mt-0.5 shrink-0 text-navigation-hover" aria-hidden="true">
                            <path d="M3 8l3.5 3.5L13 4"/>
                        </svg>
                        {h.text}
                    </li>
                ))}
            </ul>

            <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                    <span key={tag.label}
                          className={`text-xs px-2 py-0.5 rounded-full font-medium text-basic bg-skill-bar`}>{tag.label}</span>
                ))}
            </div>

            <div className="pt-1 border-t border-zinc-100 dark:border-zinc-800">
                <a
                    href={project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-1.5 text-xs font-medium text-basic hover:text-dark transition-colors duration-200"
                >
                    {project.hasRepo &&
                    <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
                        <path
                            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    }
                    {t(project.hasRepo ? 'view-on-github' : 'view-on-external')}
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                         strokeLinejoin="round"
                         className="w-3 h-3 translate-x-0 group-hover/link:translate-x-0.5 transition-transform duration-200"
                         aria-hidden="true">
                        <path d="M2.5 6h7M6.5 3l3 3-3 3"/>
                    </svg>
                </a>
            </div>
        </div>
    );

    const image = (
        <ImageSlot
            images={project.images}
            imageAlt={project.imageAlt}
            onClick={() => project.images?.length && onImageClick?.(project.images, project.imageAlt)}
        />
    );

    return (
        <div
            ref={ref}
            className="transition-all duration-700 ease-out"
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(28px)",
                transitionDelay: `${index * 100}ms`,
            }}
        >
            {/* Two-column on md+, stacked on mobile (image always on top when stacked) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                {imageOnLeft ? (
                    <>
                        <div>{image}</div>
                        <div>{content}</div>
                    </>
                ) : (
                    <>
                        <div className="md:order-2">{image}</div>
                        <div className="md:order-1">{content}</div>
                    </>
                )}
            </div>
        </div>
    );
}


export default function Projects() {
    const {ref: headingRef, inView: headingInView} = useInView(0.3);
    const t = useTranslations('Projects');
    const [gallery, setGallery] = useState<{ images: string[]; alt: string | null } | null>(null);

    // Prevent scroll when gallery is open
    useEffect(() => {
        document.body.style.overflow = gallery ? 'hidden' : 'unset';
    }, [gallery]);

    return (
        <section id="projects" className="w-full">
            <div
                ref={headingRef}
                className="mb-12 transition-all duration-700 ease-out"
                style={{
                    opacity: headingInView ? 1 : 0,
                    transform: headingInView ? "translateY(0)" : "translateY(16px)",
                }}
            >
                <h2 className="text-2xl font-medium text-dark">{t('side-projects')}</h2>
            </div>

            <div className="flex flex-col gap-20">
                {projects.map((project, index) => (
                    <ProjectRow
                        key={project.externalUrl}
                        project={project}
                        index={index}
                        onImageClick={(images, alt) => setGallery({images, alt})}
                    />
                ))}
            </div>

            {gallery && (
                <Gallery
                    images={gallery.images}
                    alt={gallery.alt}
                    initialIndex={0}
                    onClose={() => setGallery(null)}
                />
            )}
        </section>
    );
}

