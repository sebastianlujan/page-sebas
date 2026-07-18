import Link from "next/link";
import { work } from "@/lib/work";
import { awards, profile } from "@/lib/profile";
import { stagger } from "@/lib/stagger";

export default function Home() {
  return (
    <div className="home">
      <p className="tagline reveal">{profile.tagline}</p>

      <section className="section reveal" style={stagger(1)}>
        <h2 className="section-title">Experience</h2>
        <div className="entries">
          {work.map((w) => (
            <Link className="entry" href={`/work/${w.slug}`} key={w.slug}>
              <span className="entry-period">{w.period}</span>
              <span className="entry-role">
                {w.role} <span className="entry-at">· {w.company}</span>
              </span>
              <span className="entry-tag">{w.tag}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section reveal" style={stagger(2)}>
        <h2 className="section-title">Awards</h2>
        <div className="awards">
          {awards.map((a) => (
            <div className="award" key={`${a.year}-${a.title}`}>
              <span className="award-year">{a.year}</span>
              <span className="award-body">
                <span className="award-title">{a.title}</span>
                <span className="award-event">
                  First prize · {a.event}
                  {a.city ? ` · ${a.city}` : ""}
                </span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="section reveal" style={stagger(3)}>
        <h2 className="section-title">Skills</h2>
        <div className="skills">
          {profile.skills.map((group) => (
            <div className="skill-row" key={group.label}>
              <span className="skill-label">{group.label}</span>
              <span className="skill-items">{group.items.join(" · ")}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
