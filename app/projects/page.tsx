import {useTranslations} from 'next-intl';
import Link from 'next/link';

export default function Projects() {
    const t = useTranslations('Projects');
    const h = useTranslations('HomePage');

    return (
        <div className="flex flex-col flex-1 items-center justify-center font-sans bg-linear-to-br from-neutral-600 to-stone-800">
            <header className="pt-32 pb-8 px-16 text-right max-w-3xl w-full text-4xl font-audiowide">{t('title')}</header>
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-start pb-32 px-16 sm:items-start">
                <nav className="flex flex-row justify-end gap-3 w-full mb-6 text-olive-200 cursor-pointer underline">
                    <Link href="/" className="after:inline-block after:ml-3 after:content-['::'] after:w-auto">{h('link-home') || 'Home'}</Link>
                    <Link href="/articles">{h('link-articles')}</Link>
                </nav>
                <div className="flex flex-col items-center gap-6 text-justify sm:items-start">
                    {t('description')}
                </div>
            </main>
        </div>
    );
}
