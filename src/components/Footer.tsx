import Link from "next/link";
import { useTranslations } from "next-intl";

const links = [
  {
    key: "email",
    label: "artur@jewula.net",
    href: "mailto:artur@jewula.net",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4"
        aria-hidden="true"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
  },
  {
    key: "github",
    label: "github.com/Zefiryn",
    href: "https://github.com/Zefiryn",
    icon: (
      <svg
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-4 h-4"
        aria-hidden="true"
      >
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
      </svg>
    ),
  },
  {
    key: "linkedin",
    label: "linkedin.com/in/artur-jewula",
    href: "https://linkedin.com/in/artur-jewula/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4"
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    key: "medium",
    label: "medium.com/@artur.jewula",
    href: "https://medium.com/@artur.jewula",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4"
        aria-hidden="true"
      >
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-footer mt-auto">
      <div className="max-w-4xl mx-auto px-8 lg:px-16 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

          {/* Left — name + tagline */}
          <div>
            <p className="text-sm font-medium text-dark">Artur Jewuła</p>
            <p className="text-xs text-basic mt-0.5">{t("tagline")}</p>
          </div>

          {/* Right — contact links */}
          <nav aria-label={t("aria_label")}>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {links.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="group flex items-center gap-1.5 text-xs text-basic hover:text-navigation-hover dark:hover:text-pale transition-colors duration-200"
                  >
                    <span className="group-hover:scale-110 transition-transform duration-200">
                      {link.icon}
                    </span>
                    <span className="hidden sm:inline">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom row */}
        <div className="mt-8 pt-6 border-t border-footer flex flex-col gap-1 sm:flex-row sm:justify-between">
          <p className="text-xs text-basic">
            © {currentYear} Artur Jewuła
          </p>
          <p className="text-xs text-basic">{t("built_with")}</p>
        </div>
      </div>
    </footer>
  );
}
