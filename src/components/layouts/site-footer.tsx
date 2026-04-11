import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface FooterLink {
  href: string;
  label: string;
  description?: string;
}

interface FooterGroup {
  title: string;
  description?: string;
  links: FooterLink[];
}

function FooterLinkItem({ href, label }: FooterLink) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "flex w-full min-w-0 items-center border-2 border-border bg-background px-3 py-2.5 font-semibold text-foreground text-sm leading-snug tracking-tight transition-colors",
          "hover:bg-primary hover:text-primary-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
      >
        <span className="truncate">{label}</span>
      </Link>
    </li>
  );
}

function FooterGroupColumn({ title, links }: FooterGroup) {
  return (
    <section className="flex min-w-0 flex-col gap-3">
      <h3 className="border-border border-b-2 pb-2 font-bold text-foreground text-xs tracking-tight sm:text-sm">
        {title}
      </h3>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <FooterLinkItem key={`${link.href}-${link.label}`} {...link} />
        ))}
      </ul>
    </section>
  );
}

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tMarketing = await getTranslations("marketing");

  const groups: FooterGroup[] = [
    {
      title: t("groupConvertersTitle"),
      description: t("groupConvertersDescription"),
      links: [
        { href: "/csv-to-json", label: tNav("csvToJson") },
        { href: "/json-to-csv", label: tNav("jsonToCsv") },
        { href: "/csv-to-parquet", label: tNav("csvToParquet") },
        { href: "/parquet-to-csv", label: tNav("parquetToCsv") },
        { href: "/json-to-parquet", label: tNav("jsonToParquet") },
        { href: "/parquet-to-json", label: tNav("parquetToJson") },
        { href: "/csv-to-markdown-table", label: tNav("csvToMarkdownTable") },
      ],
    },
    {
      title: t("groupViewersTitle"),
      description: t("groupViewersDescription"),
      links: [
        { href: "/", label: tNav("viewer") },
        { href: "/compare", label: tNav("compare") },
        { href: "/xls-viewer", label: tNav("xlsViewer") },
        { href: "/parquet-viewer", label: tNav("parquetViewer") },
      ],
    },
    {
      title: t("groupExcelTitle"),
      description: t("groupExcelDescription"),
      links: [
        { href: "/csv-to-excel", label: tNav("csvToExcel") },
        { href: "/xls-to-csv", label: tNav("xlsToCsv") },
        { href: "/json-to-excel", label: tNav("jsonToExcel") },
      ],
    },
    {
      title: t("groupCompanyTitle"),
      description: t("groupCompanyDescription"),
      links: [
        { href: "/guides", label: tNav("guides") },
        { href: "/tools", label: tNav("tools") },
        { href: "/blog", label: tNav("blog") },
        { href: "/privacy", label: tNav("privacy") },
        { href: "/terms", label: tNav("terms") },
      ],
    },
    {
      title: "Color",
      description: "Color tools: generators and trending galleries.",
      links: [
        { href: "/palettes/trending", label: "Color palette generator" },
        { href: "/gradients", label: "Gradient generator" },
        { href: "/palettes/best", label: "Trending palettes" },
        { href: "/gradients/best", label: "Trending gradients" },
      ],
    },
  ];

  return (
    <footer className="bg-background font-mono text-foreground [-webkit-font-smoothing:auto]">
      <div className="mx-auto w-full max-w-[1600px] px-3 py-6 sm:px-4 sm:py-8 md:px-8 md:py-10">
        <div className="min-w-0 pr-2 pb-2 sm:pr-2.5 sm:pb-2.5 md:pr-3 md:pb-3">
          <div className="flex w-full min-w-0 flex-col border-4 border-border bg-background shadow-brutal max-sm:shadow-brutal-sm">
            <header className="shrink-0 border-border border-b-4 bg-primary p-4 text-primary-foreground sm:p-6 md:p-8 lg:p-10">
              <p className="font-bold text-[11px] tracking-tight opacity-95 sm:text-xs">
                {t("kicker")}
              </p>
              <h2 className="mt-3 text-balance font-black text-2xl leading-[1.05] tracking-tight sm:mt-4 sm:text-3xl md:text-4xl">
                {t("title", { name: siteConfig.name })}
              </h2>
              <p className="mt-4 max-w-3xl font-bold text-primary-foreground/85 text-sm leading-snug sm:mt-5 md:text-base">
                {t("subtitle")}
              </p>
            </header>

            <div className="bg-background px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 lg:px-12">
              <div className="columns-1 gap-8 md:columns-2 md:gap-10 lg:columns-3">
                {groups.map((group) => (
                  <div
                    key={group.title}
                    className="mb-8 inline-block w-full break-inside-avoid align-top md:mb-10"
                  >
                    <FooterGroupColumn
                      title={group.title}
                      links={group.links}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex w-full min-w-0 flex-col gap-8 border-black/20 border-t-4 bg-[#f6d44a] px-4 py-8 text-black sm:gap-10 md:px-10 md:py-10 lg:px-12">
              <p className="w-full text-balance font-black text-[clamp(2.5rem,11vw,10rem)] leading-[0.9] tracking-[-0.04em]">
                {siteConfig.name}
              </p>

              <div className="flex flex-col gap-6 border-black/20 border-t pt-8 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                <p className="max-w-2xl font-bold text-black/90 text-xs leading-relaxed md:text-sm">
                  {tMarketing("privacyBody")}{" "}
                  <Link
                    className="ms-0.5 inline-block rounded-none border-2 border-black/45 px-2 py-1 font-black text-black transition-colors hover:border-transparent hover:bg-black hover:text-[#f6d44a]"
                    href="/privacy"
                  >
                    {tNav("privacy")}
                  </Link>{" "}
                  <span className="text-black/40" aria-hidden>
                    |
                  </span>{" "}
                  <Link
                    className="inline-block rounded-none border-2 border-black/45 px-2 py-1 font-black text-black transition-colors hover:border-transparent hover:bg-black hover:text-[#f6d44a]"
                    href="/terms"
                  >
                    {tNav("terms")}
                  </Link>
                </p>

                <p className="shrink-0 font-semibold text-[10px] text-black/70 tracking-tight sm:text-xs">
                  {t("copyright", {
                    year: siteConfig.copyrightYear,
                    name: siteConfig.name,
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
