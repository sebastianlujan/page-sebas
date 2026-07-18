export type SkillGroup = {
  label: string;
  items: string[];
};

export type Award = {
  year: string;
  title: string;
  event: string;
  city?: string;
};

export const profile = {
  name: "Sebastián Luján",
  role: "Senior Backend Engineer",
  location: "Buenos Aires, Argentina",
  email: "glujan.recalde@gmail.com",

  // Short hook shown under the header on the homepage.
  tagline:
    "Senior backend engineer with a fintech and crypto background. I build reliable backend systems and smart contracts — fluent across TypeScript/Node and Solidity/Rust, with a focus on scalability, security, and clean architecture.",

  // Longer bio for the About page (kept faithful to the résumé).
  bio: [
    "Senior backend engineer with a fintech and crypto background. I build reliable backend systems (APIs, services, and infrastructure) and move fluently between TypeScript/Node for production backends and Solidity/Rust for smart contracts and low-latency systems, with a strong focus on scalability and clean architecture.",
    "Based in Buenos Aires, I studied Computer Science at the Facultad de Ingeniería (UdelaR) in Montevideo, and have continued through programs like the Atrium Uniswap Hook Incubator and the Ethereum Foundation Core Program. Most of my work sits at the intersection of DeFi, infrastructure, and applied cryptography — from vault architecture and lending protocols to zero-knowledge proving systems.",
  ],

  // NOTE: best-guess handles derived from the résumé — confirm/replace these.
  social: {
    github: "https://github.com/sebastianlujan",
    linkedin: "https://www.linkedin.com/in/sebastianlujan/",
    email: "mailto:glujan.recalde@gmail.com",
  },

  education: {
    school: "Facultad de Ingeniería, UdelaR (FING)",
    location: "Montevideo",
    degree: "Computer Science",
    period: "2012 – 2017",
    programs: [
      "Atrium Uniswap Hook Incubator (2025)",
      "Ethereum Foundation Core Program — Cryptography and DeFi",
      "Turbin3 — Rust / Solana",
      "Encode — Solidity Bootcamp",
    ],
  },

  skills: [
    {
      label: "Languages",
      items: ["Rust", "Solidity", "EVM Assembly", "TypeScript", "React", "Node", "NestJS"],
    },
    {
      label: "Cryptography, ZK & DeFi",
      items: ["Noir", "Aztec", "ZK circuits", "Zcash shielded tx", "DeFi", "AMM"],
    },
    {
      label: "Tooling & Infra",
      items: ["Hardhat", "Foundry", "Docker", "Kubernetes", "Vagrant", "AWS", "PostgreSQL", "Git"],
    },
  ] as SkillGroup[],
};

// Every award below is a first-place finish (see the "First prize" prefix in the UI).
export const awards: Award[] = [
  {
    year: "2025",
    title: "ZK location proofs from Galileo satellite data",
    event: "Aztec NoirHack",
    city: "Berlin",
  },
  {
    year: "2025",
    title: "Privacy layer for Gnosis Pay on Noir and Aztec",
    event: "Web3 Privacy Now",
    city: "Berlin",
  },
  {
    year: "2023",
    title: "Cross-chain conviction voting for DAOs (ZChain Bounty)",
    event: "ETH Argentina",
  },
  {
    year: "2022",
    title: "Reverse blind Dutch auction for NFT tickets (Brink)",
    event: "Devcon",
    city: "Bogotá",
  },
];
