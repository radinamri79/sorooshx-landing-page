export interface ProjectMeta {
  label: string;
  value: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface StackItem {
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  year: string;
  category: string;
  title: string;
  headline: string;
  projectUrl: string;
  mainBg: string;
  imageBg: string;
  darkText: boolean;
  image?: string;
  overview: string;
  problem: string;
  solution: string;
  meta: ProjectMeta[];
  metrics: ProjectMetric[];
  stack: StackItem[];
  galleryColors: string[];
}

export const allProjects: Project[] = [
  {
    slug: "sorooshx",
    year: "2022",
    category: "web3 & socialfi",
    title: "sorooshx",
    headline:
      "engineering a high-performance socialfi ecosystem for 100k+ users.",
    projectUrl: "#",
    mainBg: "#FF6200",
    imageBg: "#F05400",
    darkText: true,
    image: "/iMockup - iPhone 15 Pro Max.png",
    overview:
      "sorooshx is a premier smart socialfi exchange designed to bridge the gap between master traders and the global community. it is a platform where education, real-time signals, and decentralized trading converge. codefi has been the core development partner for over 5 years, evolving the platform from a visionary concept into a scaling powerhouse that processes $100m+ in weekly trading volume.",
    problem:
      "building a platform that combines the high-speed requirements of a crypto exchange with the social engagement of a content platform, all while maintaining absolute security for 100k users.",
    solution:
      "we provided a full-stack engineering & marketing lifecycle. this included designing a secure multi-chain wallet infrastructure, a high-concurrency trading engine, and a social layer where master traders can monetize their expertise. we managed the transition from mvp to a massive scale, ensuring the architecture remained resilient under high volatility.",
    meta: [
      { label: "industry", value: "socialfi / web3 / fintech" },
      { label: "role", value: "lead engineering & strategy partner" },
      { label: "timeline", value: "5+ years (long-term partnership)" },
      {
        label: "service",
        value:
          "product design / full-stack development / support / product management",
      },
    ],
    metrics: [
      { value: "100k", label: "registered active users" },
      { value: "$100m", label: "weekly trading volume" },
      { value: "5 years", label: "full-cycle development" },
      { value: "$0", label: "security breaches\n(maintained integrity)" },
    ],
    stack: [
      {
        title: "mobile",
        description:
          "hybrid-native architecture using react native with custom native modules (swift/kotlin) for maximum performance.",
      },
      {
        title: "web",
        description:
          "next.js for a lightning-fast, seo-optimized front-end.",
      },
      {
        title: "back-end",
        description:
          "a high-performance microservices architecture powered by rust (for trading logic), django (for robust api management), and serverless infrastructures for elastic scaling.",
      },
      {
        title: "web3 integration",
        description:
          "secure smart contracts and dapp layers for rewards and on-chain growth.",
      },
    ],
    galleryColors: ["#FF6200", "#00FF77", "#2563EB", "#FFDEAD"],
  },
  {
    slug: "doyo",
    year: "2025",
    category: "ai agent",
    title: "doyo",
    headline:
      "building an intelligent ai agent for personalized financial insights.",
    projectUrl: "#",
    mainBg: "#FFDD00",
    imageBg: "#FFC300",
    darkText: true,
    image: "/Doyo.png",
    overview:
      "doyo is an ai-powered financial assistant that delivers personalized market insights, portfolio analysis, and trading signals through natural language interaction. codefi designed and built the entire platform from concept to market-ready product in record time.",
    problem:
      "creating an ai agent that can process real-time market data, understand user portfolios, and deliver actionable financial advice through a conversational interface — while maintaining regulatory compliance.",
    solution:
      "we architected a modular ai pipeline combining llm orchestration with real-time data feeds, custom fine-tuned models for financial sentiment analysis, and a secure user-data layer. the system processes thousands of concurrent queries while maintaining sub-second response times.",
    meta: [
      { label: "industry", value: "ai / fintech / saas" },
      { label: "role", value: "full-stack development partner" },
      { label: "timeline", value: "8 months (rapid delivery)" },
      {
        label: "service",
        value: "product design / ai engineering / full-stack development",
      },
    ],
    metrics: [
      { value: "50k", label: "beta users" },
      { value: "95%", label: "query accuracy" },
      { value: "<1s", label: "response time" },
      { value: "24/7", label: "market coverage" },
    ],
    stack: [
      {
        title: "ai/ml",
        description:
          "custom llm orchestration with rag pipelines, fine-tuned models for financial sentiment analysis.",
      },
      {
        title: "web",
        description:
          "react with real-time streaming ui for conversational ai interactions.",
      },
      {
        title: "back-end",
        description:
          "python microservices with fastapi, real-time market data ingestion, and caching layers.",
      },
      {
        title: "infrastructure",
        description:
          "kubernetes-based deployment with auto-scaling for handling traffic spikes during market events.",
      },
    ],
    galleryColors: ["#FFDD00", "#FF6200", "#1F00FF", "#FF003B"],
  },
  {
    slug: "bitvpn",
    year: "2020",
    category: "decentralized vpn",
    title: "bitvpn",
    headline:
      "architecting a decentralized vpn network for privacy-first internet access.",
    projectUrl: "#",
    mainBg: "#1F00FF",
    imageBg: "#FFFFFF",
    darkText: false,
    overview:
      "bitvpn is a decentralized virtual private network that leverages blockchain technology to provide censorship-resistant, anonymous internet access. codefi built the core infrastructure from protocol design to consumer-facing applications.",
    problem:
      "traditional vpns rely on centralized servers that can be compromised, censored, or monitored. building a truly decentralized network that maintains performance while ensuring anonymity required novel protocol design.",
    solution:
      "we developed a peer-to-peer relay network with blockchain-based node incentivization, encrypted traffic routing through a multi-hop architecture, and native applications across all major platforms with one-tap connection simplicity.",
    meta: [
      { label: "industry", value: "privacy / web3 / security" },
      { label: "role", value: "lead engineering partner" },
      { label: "timeline", value: "2+ years" },
      {
        label: "service",
        value: "protocol design / full-stack development / mobile apps",
      },
    ],
    metrics: [
      { value: "200k", label: "downloads" },
      { value: "50+", label: "server locations" },
      { value: "0", label: "data logs kept" },
      { value: "99.9%", label: "uptime guarantee" },
    ],
    stack: [
      {
        title: "mobile",
        description:
          "native ios (swift) and android (kotlin) apps with custom vpn tunnel implementations.",
      },
      {
        title: "protocol",
        description:
          "custom wireguard-based protocol with multi-hop relay routing for enhanced privacy.",
      },
      {
        title: "back-end",
        description:
          "go-based relay infrastructure with distributed node coordination and health monitoring.",
      },
      {
        title: "blockchain",
        description:
          "smart contract-based node incentivization and bandwidth marketplace on ethereum l2.",
      },
    ],
    galleryColors: ["#1F00FF", "#FF6200", "#FFDD00", "#FF003B"],
  },
  {
    slug: "coco-ai",
    year: "2026",
    category: "smart financial ai",
    title: "coco ai",
    headline:
      "designing an ai-driven platform for automated portfolio management.",
    projectUrl: "#",
    mainBg: "#FF003B",
    imageBg: "#FFFFFF",
    darkText: false,
    overview:
      "coco ai is an intelligent portfolio management platform that uses machine learning to automate investment strategies, risk assessment, and rebalancing. codefi is building the platform from the ground up with a focus on institutional-grade reliability.",
    problem:
      "automated portfolio management systems often lack transparency and adaptability. building a platform that provides institutional-level risk management while remaining accessible to retail investors required innovative ai/ux design.",
    solution:
      "we designed a transparent ai engine that explains its investment decisions, combined with a real-time risk monitoring dashboard and customizable strategy builder. the platform adapts to market regime changes and user risk profiles dynamically.",
    meta: [
      { label: "industry", value: "ai / fintech / investment" },
      { label: "role", value: "technical co-founder & engineering partner" },
      { label: "timeline", value: "ongoing (2026 launch)" },
      {
        label: "service",
        value:
          "product strategy / ai engineering / full-stack development / devops",
      },
    ],
    metrics: [
      { value: "beta", label: "current phase" },
      { value: "15%+", label: "target annual return" },
      { value: "ml", label: "risk models" },
      { value: "multi", label: "asset classes" },
    ],
    stack: [
      {
        title: "ai/ml",
        description:
          "reinforcement learning for strategy optimization, nlp for market sentiment, and explainable ai for transparency.",
      },
      {
        title: "web",
        description:
          "next.js dashboard with real-time portfolio visualization and interactive strategy builder.",
      },
      {
        title: "back-end",
        description:
          "python-based quantitative engine with rust-powered execution layer for low-latency trading.",
      },
      {
        title: "data",
        description:
          "real-time market data pipelines, historical backtesting infrastructure, and ml feature stores.",
      },
    ],
    galleryColors: ["#FF003B", "#FF6200", "#FFDD00", "#1F00FF"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return allProjects.map((p) => p.slug);
}

export function getOtherProjects(slug: string): Project[] {
  return allProjects.filter((p) => p.slug !== slug);
}
