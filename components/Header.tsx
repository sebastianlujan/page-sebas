import Link from "next/link";
import { profile } from "@/lib/profile";

export function Header() {
  return (
    <header className="header">
      <Link href="/" className="brand">
        {profile.name}
      </Link>
      <nav className="nav">
        <Link href="/about">About</Link>
        <a href={profile.social.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </nav>
    </header>
  );
}
