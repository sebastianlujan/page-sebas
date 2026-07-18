import type { Metadata } from "next";
import { profile } from "@/lib/profile";
import { stagger } from "@/lib/stagger";

export const metadata: Metadata = {
  title: "About",
};

export default function About() {
  const { education } = profile;

  return (
    <section className="about prose">
      <h1 className="reveal">About</h1>

      <div className="about-intro reveal" style={stagger(1)}>
        <div className="bio">
          {profile.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <div className="avatar" aria-label={profile.name}>
          SL
        </div>
      </div>

      <div className="reveal" style={stagger(2)}>
        <h2>Education</h2>
        <p>
          <strong>{education.school}</strong> — {education.degree}, {education.location}{" "}
          <span className="muted">({education.period})</span>
        </p>
        <ul>
          {education.programs.map((program) => (
            <li key={program}>{program}</li>
          ))}
        </ul>
      </div>

      <div className="reveal" style={stagger(3)}>
        <h2>Contact</h2>
        <p className="contact">
          <a href={profile.social.email}>{profile.email}</a>
          <a href={profile.social.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </p>
      </div>
    </section>
  );
}
