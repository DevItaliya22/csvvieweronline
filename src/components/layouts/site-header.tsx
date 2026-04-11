"use client";

import { ChevronDown, Github, MenuIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/layouts/language-switcher";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { Link, usePathname } from "@/i18n/navigation";
import { headerRepoOutboundUrl } from "@/lib/marketing/utm";
import { cn } from "@/lib/utils";

interface HeaderLink {
  href: string;
  label: string;
  description: string;
}

interface HeaderGroup {
  title: string;
  href: string;
  description: string;
  links: HeaderLink[];
}

function isActiveHref(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/" || pathname === "";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function HeaderGroupDropdown({
  group,
  pathname,
}: {
  group: HeaderGroup;
  pathname: string;
}) {
  const isActive = isActiveHref(pathname, group.href);

  return (
    <div className="group relative">
      <Link
        href={group.href}
        className={cn(
          "inline-flex h-11 items-center gap-1 border-2 border-transparent bg-background px-3 font-bold text-foreground text-sm tracking-tight transition-colors",
          "hover:border-border hover:bg-primary hover:text-primary-foreground",
          "focus-visible:border-border focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:outline-none",
          isActive &&
            "border-border bg-primary text-primary-foreground hover:border-border hover:bg-primary",
        )}
      >
        <span>{group.title}</span>
        <ChevronDown className="size-4 stroke-[2.2]" />
      </Link>

      <div className="pointer-events-none absolute top-full left-0 z-40 pt-2 opacity-0 transition duration-150 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100">
        <div className="w-[min(30rem,calc(100vw-2rem))] border-4 border-border bg-background p-4 shadow-brutal-sm">
          <p className="border-border border-b-2 pb-2 font-bold text-muted-foreground text-xs tracking-tight">
            {group.description}
          </p>

          <ul className="mt-3 grid gap-2">
            {group.links.map((link) => {
              const linkActive = isActiveHref(pathname, link.href);

              return (
                <li key={`${group.title}-${link.href}`}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block border-2 border-transparent px-3 py-2 transition-colors",
                      "hover:border-border hover:bg-primary hover:text-primary-foreground",
                      "focus-visible:border-border focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:outline-none",
                      linkActive &&
                        "border-border bg-primary text-primary-foreground",
                    )}
                  >
                    <span className="block font-bold text-sm tracking-tight">
                      {link.label}
                    </span>
                    <span
                      className={cn(
                        "mt-1 block text-xs leading-relaxed",
                        linkActive
                          ? "text-primary-foreground/85"
                          : "text-muted-foreground",
                      )}
                    >
                      {link.description}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ groups }: { groups: HeaderGroup[] }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-none border-[3px] border-border bg-background"
          aria-label="Open navigation"
        >
          <MenuIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[92vw] max-w-none border-border border-r-4 bg-background p-0 sm:max-w-md"
      >
        <SheetHeader className="border-border border-b-4 bg-primary p-5 text-primary-foreground">
          <SheetTitle className="font-black text-2xl text-primary-foreground tracking-tight">
            {siteConfig.name}
          </SheetTitle>
          <p className="max-w-sm font-bold text-primary-foreground/80 text-sm leading-relaxed">
            Explore converters, viewers, Excel tools, guides, and color tools.
          </p>
        </SheetHeader>

        <div className="no-scrollbar flex-1 overflow-y-auto px-4 py-4">
          <div className="grid gap-5">
            {groups.map((group) => (
              <section key={group.title} className="grid gap-2">
                <Link
                  href={group.href}
                  className="border-border border-b-2 pb-2 font-black text-foreground text-sm tracking-tight"
                >
                  {group.title}
                </Link>

                <ul className="grid gap-2">
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.href}`}>
                      <Link
                        href={link.href}
                        className="block border-2 border-border bg-background px-3 py-2.5 transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        <span className="block font-bold text-sm tracking-tight">
                          {link.label}
                        </span>
                        <span className="mt-1 block text-muted-foreground text-xs leading-relaxed">
                          {link.description}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const githubHref = siteConfig.links.github?.trim();

  const groups: HeaderGroup[] = [
    {
      title: tFooter("groupConvertersTitle"),
      href: "/tools",
      description: tFooter("groupConvertersDescription"),
      links: [
        {
          href: "/csv-to-json",
          label: tNav("csvToJson"),
          description:
            "Turn CSV rows into JSON records locally in the browser.",
        },
        {
          href: "/json-to-csv",
          label: tNav("jsonToCsv"),
          description:
            "Convert JSON arrays into CSV for spreadsheets and tools.",
        },
        {
          href: "/csv-to-parquet",
          label: tNav("csvToParquet"),
          description: "Export CSV data into columnar Parquet files.",
        },
        {
          href: "/parquet-to-csv",
          label: tNav("parquetToCsv"),
          description:
            "Flatten Parquet datasets back into shareable CSV files.",
        },
        {
          href: "/json-to-parquet",
          label: tNav("jsonToParquet"),
          description: "Transform structured JSON data into Parquet.",
        },
        {
          href: "/parquet-to-json",
          label: tNav("parquetToJson"),
          description: "Inspect Parquet as JSON without leaving the browser.",
        },
        {
          href: "/csv-to-markdown-table",
          label: tNav("csvToMarkdownTable"),
          description: "Generate markdown tables from CSV instantly.",
        },
      ],
    },
    {
      title: tFooter("groupViewersTitle"),
      href: "/",
      description: tFooter("groupViewersDescription"),
      links: [
        {
          href: "/",
          label: tNav("viewer"),
          description: "Open large CSV files in a fast local-first data grid.",
        },
        {
          href: "/compare",
          label: tNav("compare"),
          description: "Review two CSV files side by side without uploads.",
        },
        {
          href: "/xls-viewer",
          label: tNav("xlsViewer"),
          description: "Inspect old Excel files directly in the browser.",
        },
        {
          href: "/parquet-viewer",
          label: tNav("parquetViewer"),
          description: "Preview Parquet columns and rows with grid controls.",
        },
      ],
    },
    {
      title: tFooter("groupExcelTitle"),
      href: "/csv-to-excel",
      description: tFooter("groupExcelDescription"),
      links: [
        {
          href: "/csv-to-excel",
          label: tNav("csvToExcel"),
          description:
            "Convert CSV into Excel-ready files for office workflows.",
        },
        {
          href: "/xls-to-csv",
          label: tNav("xlsToCsv"),
          description: "Extract CSV from legacy Excel spreadsheets.",
        },
        {
          href: "/json-to-excel",
          label: tNav("jsonToExcel"),
          description: "Create Excel output from structured JSON data.",
        },
      ],
    },
    {
      title: tFooter("groupCompanyTitle"),
      href: "/guides",
      description: tFooter("groupCompanyDescription"),
      links: [
        {
          href: "/guides",
          label: tNav("guides"),
          description: "Read practical guides for CSV cleanup and conversion.",
        },
        {
          href: "/tools",
          label: tNav("tools"),
          description: "Browse the full tool library by workflow and category.",
        },
        {
          href: "/blog",
          label: tNav("blog"),
          description: "Explore articles about file workflows and privacy.",
        },
        {
          href: "/privacy",
          label: tNav("privacy"),
          description: "See how local-first processing protects your data.",
        },
        {
          href: "/terms",
          label: tNav("terms"),
          description: "Review terms for the product and website.",
        },
      ],
    },
    {
      title: "Color",
      href: "/palettes/trending",
      description: "Color tools, generators, and gallery-style inspiration.",
      links: [
        {
          href: "/palettes/trending",
          label: "Color palette generator",
          description:
            "Build palettes and explore combinations for brand work.",
        },
        {
          href: "/gradients",
          label: "Gradient generator",
          description: "Create bold gradients for interfaces and assets.",
        },
        {
          href: "/palettes/best",
          label: "Trending palettes",
          description: "Browse popular palette collections and ideas.",
        },
        {
          href: "/gradients/best",
          label: "Trending gradients",
          description: "Scan standout gradients curated from the gallery.",
        },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-border border-b-4 bg-background">
      <div className="container">
        <div className="flex min-h-18 items-center gap-3 py-3">
          <div className="lg:hidden">
            <MobileMenu groups={groups} />
          </div>

          <Link
            href="/"
            aria-label={tNav("homeAria", { name: siteConfig.name })}
            className="flex size-14 shrink-0 items-center justify-center border-[3px] border-border bg-primary shadow-brutal-sm transition-transform hover:-translate-y-0.5"
          >
            <Image src="/icon.png" alt="" width={36} height={36} priority />
          </Link>

          <div className="min-w-0 flex-1">
            <div className="hidden lg:flex lg:flex-col lg:gap-2">
              <div className="flex items-center justify-between gap-4">
                <nav className="flex min-w-0 items-center gap-1">
                  {groups.map((group) => (
                    <HeaderGroupDropdown
                      key={group.title}
                      group={group}
                      pathname={pathname}
                    />
                  ))}
                </nav>

                <div className="flex shrink-0 items-center gap-2">
                  {githubHref ? (
                    <a
                      aria-label={tNav("sourceRepo")}
                      href={headerRepoOutboundUrl(githubHref)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex size-10 items-center justify-center border-[3px] border-border bg-background text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <Github className="size-5" />
                    </a>
                  ) : null}

                  <div className="rounded-none border-[3px] border-border bg-background">
                    <LanguageSwitcher />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex min-w-0 items-center justify-between gap-3 lg:hidden">
              <div className="min-w-0">
                <Link
                  href="/"
                  className="block font-black text-foreground text-lg tracking-tight"
                >
                  {siteConfig.name}
                </Link>
                <p className="truncate text-muted-foreground text-xs">
                  Local-first converters, viewers, and file tools
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                {githubHref ? (
                  <a
                    aria-label={tNav("sourceRepo")}
                    href={headerRepoOutboundUrl(githubHref)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-10 items-center justify-center border-[3px] border-border bg-background text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <Github className="size-5" />
                  </a>
                ) : null}

                <div className="rounded-none border-[3px] border-border bg-background">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
