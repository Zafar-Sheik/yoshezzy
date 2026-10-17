/**
 * All site copy lives here so it can be updated without touching components.
 * Facts sourced from the Independent on Saturday / IOL profile (30 June 2025)
 * and Shezzy's public social bios. Numbers are "at time of writing" — update
 * them before launch.
 */

export const site = {
  name: 'YoShezzy',
  realName: 'Shehzaad Shaik',
  catchphrase: 'Watkine, Booooi!',
  tagline: 'Real. Raw. Relatable.',
  city: 'Durban, South Africa',
  email: 'info4yoshezzy@gmail.com',
  url: 'https://yoshezzy.co.za', // change to the real domain
};

/** Drop real photos in /public/images and set the paths here. null = art placeholder. */
export const images: Record<string, string | null> = {
  hero: null, // e.g. '/images/hero.jpg'  (portrait, ~1200x1600)
  about: null, // e.g. '/images/about.jpg'
  apparel: null, // e.g. '/images/apparel.jpg'
  influencer: null,
  model: null,
  actor: null,
  baller: null,
  artist: null,
};

export const socials = [
  { name: 'Instagram', handle: '@yoshezzy', url: 'https://www.instagram.com/yoshezzy/' },
  { name: 'TikTok', handle: '@yoshezzzy', url: 'https://www.tiktok.com/@yoshezzzy' },
  { name: 'YouTube', handle: 'YoShezzy', url: 'https://www.youtube.com/channel/UCkA5xDLVqoE9vSkExRQj5oQ' },
  { name: 'Shez Apparel', handle: 'WhatsApp community', url: 'https://chat.whatsapp.com/BjlM2wnBM6E9hH5rxV8xEg' },
];

export const roles = [
  { key: 'influencer', title: 'Influencer', line: 'Durban street humour, skits and lifestyle — straight to your For You page.' },
  { key: 'model', title: 'Model', line: 'Gen-Z drip with a camera-ready grin. Lookbooks, campaigns, editorials.' },
  { key: 'actor', title: 'Actor', line: 'On-point character work that turns a 30-second skit into a running joke.' },
  { key: 'baller', title: 'Baller', line: 'Soccer was the first love. The boots are never too far away.' },
  { key: 'artist', title: 'Artist', line: 'Music on the side — the next chapter is already being written.' },
];

export const chapters = [
  {
    n: '01',
    place: 'Town',
    title: 'Raised between the suburbs',
    body: 'Town, Sydenham, Overport, Wyebank — Shezzy grew up moving between Durban neighbourhoods, picking up the accent, the humour and the people that now fill his videos.',
  },
  {
    n: '02',
    place: 'Sydenham',
    title: "Dad's lesson",
    body: 'Raised by his dad, he learnt early to stand on his own two feet. No waiting around, no asking for handouts — just figuring it out.',
  },
  {
    n: '03',
    place: 'Overport',
    title: 'The schoolyard hustle',
    body: 'Before the views, there was buying and selling at school. That side hustle is where the confidence — and the business brain — first showed up.',
  },
  {
    n: '04',
    place: 'Wyebank',
    title: 'One video. 400K views.',
    body: 'He watched another creator get stopped for selfies and thought: why not me? He posted a video. By the next morning it had crossed 400,000 views.',
  },
  {
    n: '05',
    place: 'Durban',
    title: 'Then he became Shezzy',
    body: 'The moment he stopped caring what people thought and just stayed himself, the character clicked. What you see online is him — unfiltered.',
  },
];

export const stats = [
  { value: 400, suffix: 'K', label: 'views on his very first video — overnight' },
  { value: 84, suffix: 'K+', label: 'followers on Instagram and climbing' },
  { value: 10, suffix: ' mo', label: 'from first post to one of SA’s most recognisable faces' },
  { value: 1, suffix: '', label: 'catchphrase the whole country copies' },
];

export const services = [
  {
    title: 'Sponsored Content',
    body: 'Skits, reels and TikToks that feel like Shezzy first and an ad second — so audiences actually watch to the end.',
    tags: ['TikTok', 'Reels', 'Shorts'],
  },
  {
    title: 'Brand Ambassador',
    body: 'Long-term partnerships for brands that want a face Gen-Z South Africa already knows and trusts.',
    tags: ['Retainers', 'Campaigns', 'Launches'],
  },
  {
    title: 'Appearances & Meet-and-Greets',
    body: 'Store openings, activations and events. Fans show up in numbers — and they bring their phones.',
    tags: ['Events', 'Activations', 'Hosting'],
  },
  {
    title: 'Modelling & Acting',
    body: 'Lookbooks, campaign shoots, commercials and character roles, on location or in studio.',
    tags: ['Editorial', 'Commercial', 'Film'],
  },
  {
    title: 'Campaign Strategy',
    body: 'Shezzy and his team help shape the idea, not just post it — concepts built for how Mzansi scrolls.',
    tags: ['Concepts', 'Scripts', 'Rollouts'],
  },
];

export const press = {
  outlet: 'Independent on Saturday · IOL',
  headline: 'How ‘Yo Shezzy’ became Durban’s viral phenom',
  url: 'https://independentonsaturday.co.za/entertainment/celebrity-news/2025-06-30-watkine-booooi-how-yo-shezzy-became-durbans-viral-phenom',
  summary:
    'The paper profiled Shezzy as part of a new wave of young South African creators — entrepreneurial, self-aware and brand-savvy — proving there are fresh ways to win in a tough economy.',
};
