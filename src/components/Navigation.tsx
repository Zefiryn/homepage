'use client';

import {useTranslations} from 'next-intl';
import Link from 'next/link';
import {useEffect, useState} from 'react';


export default function Navigation() {
    const t = useTranslations('Navigation');
    const [activeSection, setActiveSection] = useState<string>('');

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-25% 0px -25% 0px',
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        };

        const intersectingSections = new Set<string>();

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    intersectingSections.add(entry.target.id);
                } else {
                    intersectingSections.delete(entry.target.id);
                }
            });

            // Special handling for the very top of the page (About section)
            if (window.scrollY < 200) {
                setActiveSection('about');
                return;
            }

            // Special handling for the very bottom of the page (Articles section)
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
                setActiveSection('articles');
                return;
            }

            if (intersectingSections.size > 0) {
                // If multiple are intersecting, we want to pick the most "relevant" one.
                // Since we are scrolling vertically, we can check their bounding rects
                // and pick the one that is closest to the middle of the viewport
                
                const sections = Array.from(intersectingSections)
                    .map(id => ({ id, element: document.getElementById(id) }))
                    .filter(item => item.element !== null)
                    .map(item => {
                        const rect = item.element!.getBoundingClientRect();
                        const viewportCenter = window.innerHeight / 2;
                        const sectionCenter = rect.top + rect.height / 2;
                        const distanceToCenter = Math.abs(viewportCenter - sectionCenter);
                        return { id: item.id, distanceToCenter, rect };
                    });

                if (sections.length > 0) {
                    // Pick the section whose center is closest to the viewport center
                    sections.sort((a, b) => a.distanceToCenter - b.distanceToCenter);
                    setActiveSection(sections[0].id);
                }
            }
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        const sections = ['about', 'work-experience', 'projects', 'articles'];
        sections.forEach((id) => {
            const section = document.getElementById(id);
            if (section) {
                observer.observe(section);
            }
        });

        const handleScroll = () => {
            const bottomOfPage = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
            if (bottomOfPage) {
                setActiveSection('articles');
                return;
            }

            if (window.scrollY < 200) {
                setActiveSection('about');
                return;
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            sections.forEach((id) => {
                const section = document.getElementById(id);
                if (section) {
                    observer.unobserve(section);
                }
            });
        };
    }, []);

    const getLinkClassName = (href: string) => {
        const baseClass = "hover:text-navigation-hover transition-colors px-3 py-1";
        const activeClass = activeSection === href.replace('#', '') ? "px-2.5 py-1 rounded-full  text-basic bg-skill-bar" : "text-navigation";
        
        return `${baseClass} ${activeClass}`;
    };

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-footer flex flex-row justify-end gap-1 md:gap-3 w-full mb-6 cursor-pointer text-sm md:text-base py-4 px-4">
            <Link href="#about" className={getLinkClassName("#about")}>
                {t('link-home')}
            </Link>
            <Link href="#work-experience" className={getLinkClassName("#work-experience")}>
                {t('link-experience')}
            </Link>
            <Link href="#projects" className={getLinkClassName("#projects")}>
                {t('link-projects')}
            </Link>
            <Link href="#articles" className={getLinkClassName("#articles")}>
                {t('link-articles')}
            </Link>
        </nav>
    );
}
