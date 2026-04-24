import blueprintFullTeam from './assets/blueprint-full-team.jpg'
import cruzhacksAward from './assets/cruzhacks-award.jpeg'
import cruzhacksSign from './assets/cruzhacks-sign.jpeg'
import headshot2026 from './assets/headshot-2026.jpg'
import meOnTheBeach from './assets/me-on-the-beach.jpeg'
import mentraGlasses from './assets/mentra-glasses.png'
import personal0910 from './assets/personal-0910.png'
import personal0911 from './assets/personal-0911.png'
import rebootTheEarthPortrait from './assets/reboot-the-earth-portrait.jpeg'
import rebootTheEarthTeam from './assets/reboot-the-earth-team.jpeg'
import researchAriaBoxes from './assets/research-aria-boxes.png'
import researchLanguageQuery from './assets/research-language-query.jpg'
import wintersHike from './assets/winters-hike.jpeg'

type ImageAsset = {
  src: string
  alt: string
  caption?: string
}

export type InternalPage = {
  id: 'home' | 'work' | 'hackathons' | 'personal'
  label: string
}

export type ExternalLink = {
  label: string
  href: string
  external: boolean
}

export type FocusArea = {
  tag: string
  title: string
  description: string
  href: string
}

export type FeaturedWorkItem = {
  eyebrow: string
  title: string
  description: string
  tags: string[]
  href: string
}

export type ResearchGlimpse = {
  eyebrow: string
  title: string
  caption: string
  image: ImageAsset
  href: string
}

export type WorkEntry = {
  slug: string
  eyebrow: string
  title: string
  subtitle: string
  timeframe: string
  description: string
  highlights: string[]
  tags: string[]
  image?: ImageAsset
  detailSummary: string
  detailSections: Array<{
    title: string
    items: string[]
  }>
}

export type HackathonEntry = {
  slug: string
  eventType: string
  name: string
  subtitle: string
  description: string
  highlights: string[]
  tags: string[]
  image: ImageAsset
  detailSummary: string
  detailSections: Array<{
    title: string
    items: string[]
  }>
  gallery?: ImageAsset[]
}

export type PersonalEntry = {
  tag: string
  title: string
  description: string
  note: string
  image: ImageAsset
}

export const profile = {
  name: 'Michael Ramirez',
  shortTitle: 'CV, graphics, and vision-language systems',
  eyebrow: 'Undergraduate Researcher in Computer Science at UC Santa Cruz',
  title: 'Computer Vision and Graphics Engineer',
  summary:
    'UCSC computer science student focused on computer vision, graphics, and vision-language systems.',
  location: 'Folsom, California',
  school: 'Computer Science at UCSC',
  graduation: 'March 2028',
  footerNote:
    'Built to present research, engineering work, and a few of the teams that helped shape it.',
  heroImage: {
    src: headshot2026,
    alt: 'Michael Ramirez standing outdoors in a navy polo shirt.',
    caption: 'Portrait from 2026',
  },
  communityImages: [
    {
      src: blueprintFullTeam,
      alt: 'Blueprint development team group photo on a bridge.',
      caption: 'Blueprint development team',
      href: '#/work/blueprint',
    },
    {
      src: rebootTheEarthTeam,
      alt: 'AGNI Network team standing beside their Reboot the Earth demo.',
      caption: 'Reboot the Earth',
      href: '#/hackathons/reboot-the-earth',
    },
  ],
}

export const internalPages: InternalPage[] = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'hackathons', label: 'Hackathons' },
  { id: 'personal', label: 'Personal' },
]

export const externalLinks: ExternalLink[] = [
  { label: 'Email', href: 'mailto:michaelnkr808@gmail.com', external: false },
  { label: 'GitHub', href: 'https://github.com/michaelnkr808', external: true },
]

export const focusAreas: FocusArea[] = [
  {
    tag: 'Geometry',
    title: '3D Scene Reconstruction',
    description:
      'Building structure from real scenes in ways that support downstream reasoning.',
    href: '#/work/ucsc-research',
  },
  {
    tag: 'Semantics',
    title: 'Scene Understanding',
    description:
      'Using segmentation and object-level context to make scenes easier to query.',
    href: '#/work/ucsc-research',
  },
  {
    tag: 'Language',
    title: 'Vision-Language Systems',
    description:
      'Connecting visual structure to language through embeddings and guided interaction.',
    href: '#/work/ucsc-research',
  },
]

export const featuredWork: FeaturedWorkItem[] = [
  {
    eyebrow: 'Research',
    title: 'UCSC Research',
    description:
      'Scene understanding and 3D reconstruction pipelines combining geometry, segmentation, and vision-language features.',
    tags: ['Gaussian Splatting', 'SAM2', 'Kubernetes', 'Vision-Language'],
    href: '#/work/ucsc-research',
  },
  {
    eyebrow: 'Flagship Project',
    title: 'Visage',
    description:
      'A smart glasses memory assistant that links facial embeddings with conversational context.',
    tags: ['FastAPI', 'PostgreSQL + pgvector', 'MentraOS', 'InsightFace'],
    href: '#/work/visage',
  },
  {
    eyebrow: 'Collaborative Build',
    title: 'Blueprint',
    description:
      'Frontend and team-based product work for nonprofit-facing web applications.',
    tags: ['React', 'Team workflows', 'Issue tracking', 'Delivery'],
    href: '#/work/blueprint',
  },
]

export const researchGlimpses: ResearchGlimpse[] = [
  {
    eyebrow: 'Spatial Reasoning',
    title: '3D boxes projected onto Aria-captured scenes',
    caption:
      'Projecting 3D bounding boxes onto Aria-captured data to inspect object alignment across a scene.',
    image: {
      src: researchAriaBoxes,
      alt: 'Indoor Aria-captured scene with 3D bounding boxes projected over multiple objects.',
    },
    href: '#/work/ucsc-research',
  },
  {
    eyebrow: 'Language-Guided Understanding',
    title: 'Scene labels and object-level querying',
    caption:
      'Semantic labels grounded onto objects and surfaces inside a scene.',
    image: {
      src: researchLanguageQuery,
      alt: 'Indoor room image with colored 3D boxes and text labels over objects.',
    },
    href: '#/work/ucsc-research',
  },
]

export const workEntries: WorkEntry[] = [
  {
    slug: 'ucsc-research',
    eyebrow: 'UCSC',
    title: 'Undergraduate Researcher',
    subtitle: 'Computer vision, graphics, and scene understanding',
    timeframe: 'January 2026 - Present',
    description:
      'Research at the intersection of 3D scene reconstruction and scene understanding, with both experimentation and systems support.',
    highlights: [
      'Streamlined research workflows with Kubernetes-based infrastructure for senior group members.',
      'Integrated Gaussian Splatting geometry with SAM2-based segmentation and vision-language embeddings.',
      'Explored language-guided scene querying for richer scene-level interpretation.',
    ],
    tags: ['Computer Vision', 'Graphics', 'Kubernetes', 'Gaussian Splatting', 'SAM2'],
    detailSummary:
      'My research work at UCSC centers on building and supporting pipelines for scene understanding and 3D reconstruction. The work spans both experimentation and the systems work that helps a research group move faster.',
    detailSections: [
      {
        title: 'Current focus',
        items: [
          '3D scene reconstruction and geometry-aware scene reasoning.',
          'Combining Gaussian Splatting structure with segmentation and vision-language features.',
          'Language-guided querying for more usable scene interpretation.',
        ],
      },
      {
        title: 'What I have contributed',
        items: [
          'Kubernetes-based workflow support for more senior research group members.',
          'Pipeline integration work across geometry, segmentation, and embeddings.',
          'Engineering support that helps experimentation stay reproducible and easier to extend.',
        ],
      },
    ],
    image: {
      src: researchAriaBoxes,
      alt: 'Aria-captured indoor scene with projected 3D bounding boxes over labeled objects.',
      caption: 'Projecting 3D bounding boxes onto Aria-captured scene data',
    },
  },
  {
    slug: 'visage',
    eyebrow: 'Selected Project',
    title: 'Visage',
    subtitle: 'Voice-triggered memory assistance for smart glasses',
    timeframe: 'February 2026 - Present',
    description:
      'My flagship project: a face recognition and memory assistant for MentraOS smart glasses.',
    highlights: [
      'Built a full-stack system around a TypeScript front end and a Python + FastAPI backend.',
      'Stored and queried facial embeddings with PostgreSQL and pgvector.',
      'Used InsightFace for identity features and Gemini 2.5 Flash to extract structured context from transcripts.',
    ],
    tags: ['TypeScript', 'Python', 'FastAPI', 'pgvector', 'MentraOS', 'Gemini 2.5 Flash'],
    detailSummary:
      'Visage is my flagship personal project and the best example of how I like to build: a clear user problem, a full-stack system, and enough ML to make the interaction genuinely useful.',
    detailSections: [
      {
        title: 'What it does',
        items: [
          'Helps users recognize and remember people through smart glasses.',
          'Links facial embeddings with conversational context instead of treating face recognition as a standalone task.',
          'Uses voice-triggered interaction to keep the system lightweight and practical.',
        ],
      },
      {
        title: 'How it is built',
        items: [
          'TypeScript front end paired with a Python and FastAPI backend.',
          'PostgreSQL and pgvector for storing and querying facial embeddings.',
          'InsightFace for identity features and Gemini 2.5 Flash for extracting structured context from transcripts.',
        ],
      },
    ],
    image: {
      src: mentraGlasses,
      alt: 'Michael Ramirez wearing MentraOS smart glasses indoors.',
      caption: 'Testing MentraOS glasses for Visage',
    },
  },
  {
    slug: 'blueprint',
    eyebrow: 'Blueprint',
    title: 'Developer',
    subtitle: 'Product work for nonprofit-facing web applications',
    timeframe: 'December 2025 - Present',
    description:
      'Product work in a collaborative student engineering org building for nonprofit clients.',
    highlights: [
      'Contributed frontend work using React in a student-run product organization.',
      'Worked with Git-based workflows, Linear for issue tracking, and regular team coordination.',
      'Built alongside both designers and developers in a nonprofit-focused setting.',
    ],
    tags: ['React', 'Blueprint', 'Product development', 'Linear', 'Collaboration'],
    detailSummary:
      'Blueprint has been the strongest example of team-based product work in my experience so far. It gave me practice working inside a real delivery process instead of only building solo projects.',
    detailSections: [
      {
        title: 'What I worked on',
        items: [
          'Frontend development in React for nonprofit-facing web applications.',
          'Collaboration with both designers and developers around shared product goals.',
          'Feature work inside a structured team environment rather than a one-off sprint.',
        ],
      },
      {
        title: 'What I learned',
        items: [
          'How to work cleanly with Git-based team workflows.',
          'How issue tracking and team coordination shape shipping, not just coding.',
          'How to balance implementation details with the broader product context.',
        ],
      },
    ],
    image: {
      src: blueprintFullTeam,
      alt: 'Blueprint development team group photo on a bridge.',
      caption: 'Blueprint development team',
    },
  },
]

export const hackathons: HackathonEntry[] = [
  {
    slug: 'reboot-the-earth',
    eventType: 'Climate Hackathon',
    name: 'Reboot the Earth',
    subtitle: 'AGNI Network',
    description:
      'AGNI Network is a fire-risk dashboard that aggregates public weather and drought data to map California by fire danger.',
    highlights: [
      'Aggregated data from sources like weather.gov, NASA, and droughtmonitor.edu.',
      'Used an integrated AI agent to estimate danger levels and generate county-level fire risk scores.',
      'Framed the system around proactive fire prevention for first responders.',
    ],
    tags: ['AGNI Network', 'React', 'FastAPI', 'Hackathon delivery'],
    detailSummary:
      'AGNI Network was built at Reboot the Earth 2025 as a tool for proactive fire prevention. The project combined public environmental data, an AI-driven scoring pipeline, and a dashboard designed with first responders in mind.',
    detailSections: [
      {
        title: 'What we built',
        items: [
          'A dashboard that color-codes California counties by fire risk.',
          'A pipeline that pulls in public weather and drought data from multiple sources.',
          'An AI-assisted layer that turns those data points into danger levels and risk scores.',
        ],
      },
      {
        title: 'Why it mattered',
        items: [
          'The system was designed to help first responders act proactively rather than react after conditions worsen.',
          'If a county crosses a high-risk threshold, the platform is meant to alert nearby fire departments.',
          'The idea is scalable beyond California to other states and regions with fewer fire-prevention resources.',
        ],
      },
    ],
    image: {
      src: rebootTheEarthTeam,
      alt: 'AGNI Network team standing beside their Reboot the Earth demo.',
      caption: 'AGNI Network team at Reboot the Earth',
    },
    gallery: [
      {
        src: rebootTheEarthPortrait,
        alt: 'Michael Ramirez standing beside the AGNI Network demo at Reboot the Earth.',
        caption: 'Presenting AGNI Network at Reboot the Earth',
      },
      {
        src: rebootTheEarthTeam,
        alt: 'AGNI Network team standing beside their Reboot the Earth demo.',
        caption: 'AGNI Network team at Reboot the Earth',
      },
    ],
  },
  {
    slug: 'cruzhacks',
    eventType: 'Campus Hackathon',
    name: 'CruzHacks',
    subtitle: 'HardwareHub',
    description:
      'HardwareHub is an embedded systems learning platform built to make ESP32, Arduino, and hardware modules more approachable.',
    highlights: [
      'Built around structured learning paths, progress tracking, and visual project tooling.',
      'Included AI-powered note-taking and quiz generation through Opennote and Anthropic.',
      'Paired a hacker-themed frontend with a Bun, Hono, and Supabase backend.',
    ],
    tags: ['HardwareHub', 'React', 'TypeScript', 'Bun', 'Supabase'],
    detailSummary:
      'HardwareHub was our CruzHacks 2026 project: a learning platform for embedded systems meant to lower the barrier to getting started with hardware, while still being ambitious enough to support real project building.',
    detailSections: [
      {
        title: 'What we built',
        items: [
          'Structured learning paths for embedded systems topics like ESP32, Arduino, and advanced concepts.',
          'A visual project editor for designing hardware projects and module connections.',
          'Progress tracking, achievements, and portfolio-building features to make learning feel more guided.',
        ],
      },
      {
        title: 'Technical direction',
        items: [
          'Frontend built with React, TypeScript, Vite, Tailwind, and React Router.',
          'Backend built with Hono, Bun, Supabase, and TypeScript.',
          'AI-assisted notes and quiz generation powered by Opennote and Anthropic.',
        ],
      },
    ],
    image: {
      src: cruzhacksAward,
      alt: 'Michael Ramirez with teammates at CruzHacks holding a prize.',
      caption: 'CruzHacks team photo',
    },
    gallery: [
      {
        src: cruzhacksAward,
        alt: 'Michael Ramirez with teammates at CruzHacks holding a prize.',
        caption: 'Team photo after CruzHacks',
      },
      {
        src: cruzhacksSign,
        alt: 'Michael Ramirez standing in front of the CruzHacks sign.',
        caption: 'At CruzHacks 2026',
      },
    ],
  },
]

export const personalEntries: PersonalEntry[] = [
  {
    tag: 'Outdoors',
    title: 'Beach days',
    description:
      'I like having some space away from screens too. Beach trips are usually where I reset and let ideas simmer a bit.',
    note:
      'A lot of my best thinking happens when I am away from the desk for a while.',
    image: {
      src: meOnTheBeach,
      alt: 'Michael Ramirez standing on a beach during a casual day outdoors.',
      caption: 'Resetting by the water',
    },
  },
  {
    tag: 'Outside Of Tech',
    title: 'Jiu jitsu',
    description:
      'Jiu jitsu is the main thing I do outside of school and projects. I like the constant problem solving and the feeling of getting better through repetition.',
    note:
      'The tournament photo is from a win at a BJJ Tour competition, which felt like a good reminder that consistency pays off.',
    image: {
      src: personal0911,
      alt: 'Michael Ramirez standing on a jiu jitsu tournament podium with a medal.',
      caption: 'BJJ Tour tournament podium',
    },
  },
  {
    tag: 'Outdoors',
    title: 'Hiking',
    description:
      'Hiking is another way I like to get outside, clear my head, and break up long stretches of school or project work.',
    note:
      'It is a good counterweight to spending most days thinking through systems and code.',
    image: {
      src: wintersHike,
      alt: 'Michael Ramirez outdoors on a hike in colder weather.',
      caption: 'Winter hike',
    },
  },
  {
    tag: 'Community',
    title: 'Training and tournaments',
    description:
      'A lot of the fun is the people around it too. Competing and training have given me another community outside of engineering.',
    note:
      'That mix of technical work and something physical keeps me balanced.',
    image: {
      src: personal0910,
      alt: 'Michael Ramirez smiling with another competitor or coach at a jiu jitsu event.',
      caption: 'At a recent tournament',
    },
  },
]
