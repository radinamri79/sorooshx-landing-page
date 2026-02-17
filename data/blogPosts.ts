export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  date: string;
  author: string;
  authorHref: string;
  category: string;
  categoryHref: string;
  color: string;
  image?: string;
  content: string;
}

function slugify(title: string, id: number): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") + `-${id}`
  );
}

const sampleContents = [
  `Economic News (Oct 19 – Oct 26, 2025)

1. U.S.–China Trade Tensions Escalate & Global Outlook Clouds
On October 19, a commentary on mounting trade tensions between the United States and China described a "new normal" emerging for the global economic outlook.

The piece highlighted how persistent tariffs, export controls, and geopolitical friction are beginning to weigh seriously on the growth trajectory of global trade flows – a critical driver of advanced economy activity.

2. Global Growth Outlook Holds Downward Risk
The International Monetary Fund (IMF) in its October 2025 "World Economic Outlook" reiterated that global growth remains sluggish: projected at ~3.2% in 2025 and ~3.1% in 2026, with advanced economies growing around 1.5% and emerging markets just above 4%.

The report emphasized that although near-term projections were marginally revised upward, the underlying trend remains one of softness – with risks including protectionism, labour-supply shocks and financial vulnerabilities.

3. Trade Compliance & Reporting Reforms in the U.S.
On October 23, U.S. customs authorities announced upgrades to the Automated Commercial Environment (ACE) system for imports of steel, aluminium and copper subject to Section 232 tariffs or IEEPA (International Emergency Economic Powers Act) duties.

This signals that trade enforcement and data-reporting burdens are rising for firms, especially those sourcing inputs globally – a subtle but important cost for supply-chain resilience.

4. Weak Economic Data in Europe / Forex Impacts
On October 19, a forex news summary noted disappointing growth data in the Eurozone – for instance, a reported GDP growth rate of only ~1.1% in Euro-area metrics – which raised questions about the region's economic momentum.

This kind of lagging performance puts pressure on the European Central Bank (ECB) and opens the possibility of more policy support, though with limited room given global inflation dynamics.

Crypto & Digital-Asset News (Oct 19 – Oct 26, 2025)

1. A Tepid October for Bitcoin: "Worst Uptober" in Years
According to a report on October 19, Bitcoin was down about 5% for October-to-date, marking its worst performance in October since 2015.

The common seasonal term "Uptober" (used because October often sees crypto up-moves) has failed to materialise this year – largely due to macro risks, weak liquidity and the U.S.–China tariff standoff.

2. Institutional Moves & Market Narrative Shifts
A weekly crypto recap (Oct 26) noted Bitcoin moving from about US$107 000 to over US$111 000, while altcoins were mixed.

Key themes: increasing institutional interest, speculation on policy shifts (for example a forthcoming rate-cut), and heightened attention on regulatory/market infrastructure developments.

3. Crypto Market Reactions to Monetary-Policy Expectations
On October 26, a crypto-markets article highlighted that major cryptocurrencies were trading higher in anticipation of a likely Federal Reserve (Fed) rate cut – a trend driven in part by hopes of looser policy and attendant risk-asset appetite.
The expectation of the Fed cutting its policy rate by around 25 bps to ~4% was flagged as a key catalyst. Crypto traders are increasingly treating macro policy as a driver of digital-asset flows.

4. Crypto Infrastructure & Token Developments

In other crypto news this week:
• A prediction market tracked whether former Changpeng Zhao ("CZ") might return to Binance by year-end.
• The NFT marketplace OpenSea confirmed its upcoming native token (SEA) to launch in Q1 2026 with 50% of supply allocated to the community.
• An AI model (DeepSeek V3.1) out-performed rivals (including a version of GPT) in a crypto-trading test, showing the increasing role of AI in digital-asset trading.`,

  `Web3 Development Best Practices

Building decentralized applications requires careful consideration of smart contract security, gas optimization, and user experience design.

1. Smart Contract Security
Every smart contract deployed on-chain is immutable and handles real value. This means that bugs and vulnerabilities can lead to irreversible financial losses. Following established security patterns — such as checks-effects-interactions, reentrancy guards, and comprehensive test coverage — is not optional.

Formal verification tools and third-party audits should be standard parts of your development workflow.

2. Gas Optimization Strategies
Gas costs directly impact user adoption. Techniques like storage packing, using calldata instead of memory for read-only function parameters, and batching transactions can significantly reduce costs.

Layer 2 solutions and rollups provide another avenue for reducing per-transaction costs while maintaining the security guarantees of the base layer.

3. User Experience in dApps
The biggest barrier to Web3 adoption remains usability. Account abstraction, social login integration, and gasless transactions through meta-transaction relayers are making dApps more accessible.

Progressive decentralization — starting with familiar Web2 UX patterns and gradually introducing Web3 concepts — helps onboard mainstream users without overwhelming them.

4. Testing and Deployment
Comprehensive testing strategies should include unit tests, integration tests, and fork tests against mainnet state. Tools like Foundry and Hardhat provide robust testing frameworks.

Deployment should follow a staged approach: local → testnet → mainnet, with monitoring and incident response plans at each stage.`,

  `The Future of SocialFi: Building Communities at Scale

SocialFi platforms are redefining how communities form, grow, and sustain themselves in the digital economy. By combining social networking with decentralized finance primitives, these platforms create new incentive structures for content creation and community participation.

1. Tokenized Social Capital
In traditional social media, engagement generates value primarily for the platform. SocialFi inverts this model by tokenizing social interactions — likes, shares, and comments can translate into tangible economic value for both creators and participants.

This creates a flywheel effect where high-quality content is directly rewarded, incentivizing better contributions and deeper community engagement.

2. Governance and Community Ownership
DAOs (Decentralized Autonomous Organizations) provide the governance backbone for SocialFi platforms. Token holders can vote on platform features, moderation policies, and treasury allocation.

This shifts power from centralized platform operators to the community itself — creating a sense of ownership that drives long-term retention and participation.

3. Scaling Challenges
Building for 100K+ users requires careful infrastructure planning. Off-chain indexing, caching layers, and hybrid architectures that balance decentralization with performance are essential.

Content delivery networks, optimistic updates, and progressive loading patterns help maintain responsive user experiences even as the network grows.

4. Monetization Without Exploitation
SocialFi's promise is sustainable monetization that doesn't rely on surveillance capitalism. Subscription models, tipping, and content-gated tokens provide revenue streams that align platform and user incentives.

The key challenge is creating economic models that are sustainable without requiring constant speculation or unsustainable yield.`,
];

export const allPosts: BlogPost[] = Array.from({ length: 32 }, (_, i) => {
  const title =
    "Engineering a High-Performance SocialFi Ecosystem for 100K+ Users.";
  return {
    id: i + 1,
    slug: slugify(title, i + 1),
    title,
    date: "feb 15 2026",
    author: "soroush osivand",
    authorHref: "#",
    category: "learning",
    categoryHref: "#",
    color: i % 2 === 0 ? "#2563EB" : "#F97316",
    image: undefined,
    content: sampleContents[i % sampleContents.length],
  };
});

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return allPosts.map((p) => p.slug);
}

export const POSTS_PER_PAGE = 8;
export const TOTAL_PAGES = Math.ceil((allPosts.length - 1) / POSTS_PER_PAGE);
