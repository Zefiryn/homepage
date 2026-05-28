'use client';

import {useTranslations} from 'next-intl';
import Link from 'next/link';


export default function Navigation() {
    const t = useTranslations('Navigation');

    return (
        <nav className="flex flex-row justify-end gap-3 w-full mb-6 text-olive-200 cursor-pointer">
            <Link href="#about"
                  className={`after:inline-block after:ml-3 after:content-['::'] after:w-auto`}>{t('link-home')}</Link>
            <Link href="#work-experience"
                  className={`after:inline-block after:ml-3 after:content-['::'] after:w-auto`}>{t('link-experience')}</Link>
            <Link href="#projects"
                  className={`after:inline-block after:ml-3 after:content-['::'] after:w-auto`}>{t('link-projects')}</Link>
            <Link href="#articles">{t('link-articles')}</Link>
        </nav>
    );
}
