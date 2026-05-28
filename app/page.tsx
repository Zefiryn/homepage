import {getTranslations} from 'next-intl/server';
import WorkExperience from "@/components/WorkExperience";
import Blog from "@/components/Blog";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Projects from "@/components/Projects";

export default async function Home() {
    const t = await getTranslations('HomePage');
    const p = await getTranslations('Projects');
    const a = await getTranslations('Articles');

    return (
        <article className="flex flex-col gap-24">
            <section id="about" className="flex flex-col items-center justify-center">
                <About />
            </section>
            <section id="work-experience" className="flex flex-col items-center justify-center gap-12">
                <Skills />
                <WorkExperience />
            </section>
            <section id="projects" className="flex flex-col items-center justify-center">
                <Projects />
            </section>
            <section id="articles" className="flex flex-col items-center justify-center">
                <Blog />
            </section>
        </article>

    );
}
