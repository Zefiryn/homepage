'use client';

import {useTranslations} from 'next-intl';
import Link from 'next/link';
import {useEffect, useState} from 'react';

const validSections = ['about', 'work-experience', 'projects', 'articles'];

export default function Navigation() {
    const t = useTranslations('Navigation');
    const [activeSection, setActiveSection] = useState<string>('about');



    useEffect(() => {
        // Handle initial load and "onload" hook logic
        const handleInitialHash = () => {
            if (window.location.hash) {
                const hash = window.location.hash.replace('#', '');
                if (validSections.includes(hash)) {
                    setActiveSection(hash);
                    return true;
                }
            }
            return false;
        };

        let hasHash = handleInitialHash();
        if (hasHash) {
            setTimeout(() => {
                hasHash = false;
            }, 1000);
        }

        const onHashChange = () => {
            handleInitialHash();
            hasHash = true;
            // After 1 second, allow scroll logic to take over again
            setTimeout(() => {hasHash = false;}, 1000);
        };

        // Also listen for hash changes
        window.addEventListener('hashchange', onHashChange);

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
                if (hasHash) return;
                setActiveSection('about');
                if (window.location.hash === '#about') {
                    window.history.replaceState(null, '', window.location.pathname);
                }
                return;
            }

            // Special handling for the very bottom of the page (Articles section)
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
                setActiveSection('articles');
                return;
            }

            if (intersectingSections.size > 0) {
                // If multiple sections are intersecting, we want to pick the most "relevant" one.
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

        validSections.forEach((id) => {
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
                if (hasHash) return;
                setActiveSection('about');
                if (window.location.hash === '#about') {
                    window.history.replaceState(null, '', window.location.pathname);
                }
                return;
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('hashchange', onHashChange);
            window.removeEventListener('scroll', handleScroll);
            validSections.forEach((id) => {
                const section = document.getElementById(id);
                if (section) {
                    observer.unobserve(section);
                }
            });
        };
    }, []);

    const getLinkClassName = (href: string) => {
        const baseClass = "hover:text-navigation-hover transition-colors px-3 py-1";
        const sectionId = href.includes('#') ? href.split('#')[1] : '';
        const activeClass = activeSection === sectionId ? "px-2.5 py-1 rounded-full  text-basic bg-skill-bar" : "text-navigation";
        
        return `${baseClass} ${activeClass}`;
    };

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-footer w-full mb-6">
            <div className="max-w-4xl m-auto flex flex-row justify-end gap-1 md:gap-3 w-full  cursor-pointer text-sm md:text-base py-4">
                <Link href="/#about" replace className={getLinkClassName("/#about")}>
                    {t('link-home')}
                </Link>
                <Link href="/#work-experience" replace className={getLinkClassName("/#work-experience")}>
                    {t('link-experience')}
                </Link>
                <Link href="/#projects" replace className={getLinkClassName("/#projects")}>
                    {t('link-projects')}
                </Link>
                <Link href="/#articles" replace className={getLinkClassName("/#articles")}>
                    {t('link-articles')}
                </Link>
            </div>
        </nav>
    );
}
