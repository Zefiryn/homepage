"use client";

import {useTranslations} from "next-intl";
import {useInView} from "@/hooks/useInView";

type Post = {
    title: string;
    excerpt: string;
    source: "Hatimeria" | "Medium";
    readingTime: string;
    url: string;
    date: string;
};

const posts: Post[] = [
    {
        title: "The Rake case study",
        excerpt: "A case study of our collaboration with The Rake — a globally recognized luxury fashion and lifestyle platform. We designed and implemented a scalable architecture that seamlessly integrates eCommerce and editorial coe.ntent, improving performance, simplifying content management, and supporting future growth. Discover how thoughtful architectural decisions and modern technology helped deliver a premium digital experience for a global luxury audienc",
        source: "Hatimeria",
        readingTime: "8 min",
        date: "2020",
        url: "https://www.hatimeria.com/our-work/the-rake",
    },
    {
        title: "Apple Pay - a way to increase your sales",
        excerpt: "How do you turn a luxury shopping experience into a seamless one-tap purchase? We did it with adding Apple Pay into the store. It created a faster, smoother checkout experience. The result is a story about reducing friction, improving conversions, and rethinking how premium customers complete their purchases.",
        source: "Hatimeria",
        readingTime: "7 min",
        date: "2022",
        url: "https://www.hatimeria.com/our-work/apple-pay",
    },
    {
        title: "Mastering queue usage in Magento 2: handling application state changes",
        excerpt:
            "Learn how to handle long-running queue consumers in Magento 2 and avoid issues caused by outdated in-memory application states. This article explains how Magento queues work, the risks of stale configuration and cached data, and how poison pill mechanisms can safely restart consumers to keep integrations reliable and up to date.",
        source: "Hatimeria",
        readingTime: "10 min",
        date: "2024",
        url: "https://www.hatimeria.com/blog/article/mastering-queue-usage-in-magento-2-handling-application-state-changes",
    },
    {
        title: "Bug: the masquerade",
        excerpt:
            "What started as a seemingly random Magento bug turned into a deep investigation into race conditions, image processing, and hidden interactions between two independent modules. In this article, I walk through the debugging journey step by step — from misleading disk error clues to uncovering how concurrent image regeneration and WebP conversion caused intermittent failures in production, and how a small architectural fix ultimately solved the problem.",
        source: "Hatimeria",
        readingTime: "12 min",
        date: "2023",
        url: "https://www.hatimeria.com/blog/article/Bug-the-masquerade",
    },
    {
        title: "The Taming of the Project",
        excerpt:
            "Follow the story behind HAT (Hatimeria Automation Toolkit) — a project created to solve the repetitive setup, deployment, and maintenance problems developers face on a daily basis. In this article, I share how I designed and built a flexible CLI tool that automates workflows across Magento, WordPress, Symfony, and Node.js projects, turning years of development experience into a practical toolkit used to speed up and simplify complex environments.",
        source: "Hatimeria",
        readingTime: "8 min",
        date: "2023",
        url: "https://www.hatimeria.com/blog/article/the-taming-of-the-project",
    },
    {
        title: "Coding with philosophy",
        excerpt:
            "In this article, I explore how philosophical thinking can shape better software development practices. Drawing inspiration from classical philosophy and everyday engineering challenges, I reflect on how concepts like logic, abstraction, and critical thinking influence the way we design systems, solve problems, and write maintainable code beyond pure technical implementation.",
        source: "Medium",
        readingTime: "7 min",
        date: "2020",
        url: "https://medium.com/hatimeria/coding-with-philosophy-6f0ab96e1f68",
    },
    {
        title: "The three metamorphoses",
        excerpt:
            "This article uses Nietzsche’s concept of the three metamorphoses as a lens to reflect on the growth in software development. It follows the transformation from the “camel” stage of carrying responsibility and learning fundamentals through the “lion” stage of challenging constraints and questioning established patterns, to the “child” stage where creativity, simplicity, and genuine problem-solving take over. The piece connects philosophical evolution with a developer’s changing mindset over time in real-world engineering work.",
        source: "Medium",
        readingTime: "6 min",
        date: "2020",
        url: "https://medium.com/hatimeria/the-three-metamorphoses-e245768ce6d6",
    },
];

function PostCard({post, index, t}: { post: Post; index: number, t: any }) {
    const {ref, inView} = useInView();

    return (
        <a
            ref={ref as unknown as React.RefObject<HTMLAnchorElement>}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block border border-basic-mate-dark rounded-xl p-5 hover:border-navigation-hover hover:shadow-sm transition-all duration-300"
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 600ms ease-out ${index * 100}ms, transform 600ms ease-out ${index * 100}ms, border-color 200ms, box-shadow 200ms`,
            }}
        >
            <div className="flex items-start justify-between gap-3 mb-3">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full text-basic bg-skill-bar`}>{post.source}</span>
                <div className="flex items-center gap-2 text-xs text-basic shrink-0">
                    <span>{post.date}</span> <span>·</span> <span>{post.readingTime} read</span>
                </div>
            </div>

            <h3 className="text-sm font-medium text-basic leading-snug mb-2 group-hover:text-navigation-hover transition-colors duration-200">
                {post.title}
            </h3>

            <p className="text-sm text-basic leading-relaxed">
                {post.excerpt}
            </p>

            <div
                className="mt-4 flex items-center gap-1 text-xs font-medium text-basic group-hover:text-navigation-hover transition-colors duration-200">
                <span>{t('read-article')}</span>
                <svg
                    className="w-3 h-3 translate-x-0 group-hover:translate-x-0.5 transition-transform duration-200"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                >
                    <path d="M2.5 6h7M6.5 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </a>
    );
}

export default function Blog() {
    const {ref: headingRef, inView: headingInView} = useInView(0.3);
    const t = useTranslations('Blog');

    return (
        <div className="max-w-full">
            <div
                ref={headingRef}
                className="mb-8 transition-all duration-700 ease-out"
                style={{opacity: headingInView ? 1 : 0, transform: headingInView ? "translateY(0)" : "translateY(16px)"}}
            >
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                    <h2 className="text-2xl font-medium text-dark">{t('title')}</h2>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                {posts.map((post, index) => (
                    <PostCard key={post.url} post={post} index={index} t={t}/>
                ))}
            </div>
        </div>
    );
}

