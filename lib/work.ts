export type WorkProject = {
  name: string;
  description: string;
};

export type Work = {
  slug: string;
  company: string;
  role: string;
  /** Display period, e.g. "2025 – 2026" */
  period: string;
  /** Short right-aligned tag on the index row */
  tag: string;
  /** One-line summary used for the page description + index hover */
  summary: string;
  /** Optional lead paragraph on the detail page */
  intro?: string;
  /** Bullet highlights (Markdown allowed) */
  highlights?: string[];
  /** Named sub-projects (used for the contractor role) */
  projects?: WorkProject[];
};

// Newest first — mirrors the order on the résumé.
export const work: Work[] = [
  {
    slug: "ratherlabs",
    company: "Ratherlabs",
    role: "Rust Blockchain Engineer, R&D",
    period: "2025 – 2026",
    tag: "Rust · ZK",
    summary:
      "Research and development across MoveVM/Arbitrum EVM compatibility, ZK integrations, and AI-driven detection.",
    highlights: [
      "Integrating **MoveVM with Arbitrum** for EVM compatibility, as part of a **$500K proposal**.",
      "**ZK integration with Stellar**, and a proposal for a high-performance perpetuals exchange based on dYdX.",
      "Developing **AI-generated image detection** with FFT and statistical methods; exploring **Bitcoin–Cosmos** integration via IBC and rollups.",
    ],
  },
  {
    slug: "mercado-libre",
    company: "Mercado Libre",
    role: "Cyber Security Engineer",
    period: "2023 – 2024",
    tag: "Security · Crypto",
    summary:
      "Blockchain engineering and smart-contract security for Melicoin and mission-critical stablecoin components.",
    highlights: [
      "Blockchain engineering and smart-contract security at **Melicoin**.",
      "Contributed to **cryptographic primitives for mission-critical systems**, including stablecoin components tested in the Brazilian market with **over 3.5M users**.",
    ],
  },
  {
    slug: "independent",
    company: "Independent",
    role: "Senior Blockchain Engineer, Contractor",
    period: "2021 – 2024",
    tag: "Solidity · DeFi",
    summary:
      "Vault architecture, DeFi integrations, ZK proving, and secure messaging across DeFi, infra, and privacy projects.",
    intro: "Selected engagements across DeFi, infrastructure, and privacy:",
    projects: [
      {
        name: "DAMM Capital",
        description:
          "Re-architected the vault and role-based access-control layer (Zodiac) and integrated multiple DeFi lending/borrowing protocols and strategies, owning the design and security model.",
      },
      {
        name: "Gatta.io",
        description:
          "Designed and operated TEE-backed backend infrastructure with end-to-end observability, and built ZK proving (SP1) for on-chain reputation systems.",
      },
      {
        name: "Zingolabs",
        description:
          "Shipped the first secure messaging feature in Zingo Wallet over Zcash shielded transactions, and overhauled the CI/CD pipeline and tooling for Zingo Mobile.",
      },
      {
        name: "W3eGames",
        description:
          "Designed the smart-contract architecture for an IDO launchpad (App Storage + Proxy Beacon Factory) and owned its tokenomics and production deployment.",
      },
      {
        name: "Num Finance, Init, P4 Games",
        description:
          "Built and tested DeFi flashloan flows (Morpho, AAVE) in Foundry, NFT marketplaces on Polygon, and an ICO crowdsale contract with full TDD coverage.",
      },
    ],
  },
];

export function getWork(slug: string): Work | undefined {
  return work.find((w) => w.slug === slug);
}
