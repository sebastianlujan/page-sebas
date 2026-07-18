import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getWork, work, type Work } from "@/lib/work";
import { stagger } from "@/lib/stagger";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return work.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w) return { title: "Not found" };
  return { title: `${w.role} · ${w.company}`, description: w.summary };
}

// Compose a single Markdown body from the role's highlights + named projects,
// so it renders through the same prose styles as everything else.
function toMarkdown(w: Work): string {
  const lines: string[] = [];
  if (w.intro) lines.push(w.intro, "");
  for (const h of w.highlights ?? []) lines.push(`- ${h}`);
  for (const p of w.projects ?? []) lines.push(`- **${p.name}:** ${p.description}`);
  return lines.join("\n");
}

export default async function WorkPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w) notFound();

  return (
    <article className="article">
      <Link href="/" className="back reveal">
        ← Back
      </Link>
      <h1 className="post-title reveal" style={stagger(1)}>
        {w.role}
      </h1>
      <div className="byline reveal" style={stagger(2)}>
        <span className="meta">
          {w.company} · {w.period}
        </span>
      </div>
      <div className="prose reveal" style={stagger(3)}>
        <Markdown remarkPlugins={[remarkGfm]}>{toMarkdown(w)}</Markdown>
      </div>
    </article>
  );
}
