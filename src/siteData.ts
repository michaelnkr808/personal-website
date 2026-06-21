import meOnTheBeach from './assets/me-on-the-beach.jpeg'
import personalBjj from './assets/personal-0911.png'
import wintersHike from './assets/winters-hike.jpeg'
import personalTraining from './assets/personal-0910.png'
import researchAriaBoxes from './assets/research-aria-boxes.png'
import mentraGlasses from './assets/mentra-glasses.png'
import blueprintTeam from './assets/blueprint-full-team.jpg'
import cruzhacksAward from './assets/cruzhacks-award.jpeg'
import rebootTeam from './assets/reboot-the-earth-team.jpeg'

type EntryImage = {
  src: string
  alt: string
}

export const profile = {
  name: 'Michael Ramirez',
  phone: '808-300-9954',
  email: 'michaelnkr808@gmail.com',
  github: 'https://github.com/michaelnkr808',
  linkedin: 'https://linkedin.com/in/',
  location: 'Folsom, California',
}

export const education = {
  school: 'University of California, Santa Cruz',
  location: 'Santa Cruz, CA',
  degree: 'B.S. in Computer Science',
  gpa: '3.73 / 4.0',
  graduation: 'Expected December 2027',
}

export type ExperienceEntry = {
  title: string
  org: string
  location: string
  timeframe: string
  bullets: string[]
  image?: EntryImage
}

export const experience: ExperienceEntry[] = [
  {
    title: 'Undergraduate Researcher',
    org: 'UC Santa Cruz',
    location: 'Santa Cruz, CA',
    timeframe: 'January 2026 – Present',
    bullets: [
      'Built a 3D scene understanding pipeline integrating Gaussian Splatting geometry modeling with language-aligned feature learning on Meta ARIA glasses data.',
      'Combined SAM2 segmentation with vision-language embeddings to enable open-vocabulary scene reconstruction and agent-based natural language querying.',
      'Streamlined research workflows by containerizing training pipelines with Kubernetes for senior research group members.',
    ],
    image: {
      src: researchAriaBoxes,
      alt: '3D bounding boxes projected onto an Aria-captured indoor scene.',
    },
  },
  {
    title: 'Developer',
    org: 'Blueprint (UCSC student org)',
    location: 'Santa Cruz, CA',
    timeframe: 'December 2025 – Present',
    bullets: [
      'Contributed to frontend development of web applications for local nonprofit organizations using React, React Native, TypeScript, and TailwindCSS.',
      'Collaborated in a team environment using Git-based workflows and Linear for issue tracking and project coordination.',
    ],
    image: {
      src: blueprintTeam,
      alt: 'Blueprint development team on a bridge.',
    },
  },
]

export type ProjectEntry = {
  name: string
  url: string
  stack: string
  timeframe: string
  bullets: string[]
  image?: EntryImage
}

export const projects: ProjectEntry[] = [
  {
    name: 'Visage',
    url: 'https://github.com/michaelnkr808/visage',
    stack: 'TypeScript, Bun, Python, FastAPI, PostgreSQL/pgvector, InsightFace, Gemini 2.5',
    timeframe: 'Feb 2026 – Present',
    bullets: [
      'Built a voice-activated face recognition and memory assistant for MentraOS smart glasses that links facial embeddings with conversational context.',
      'Designed a Python/FastAPI backend storing and querying face embeddings in PostgreSQL with pgvector, served from a TypeScript/Bun on-device client (MentraOS SDK).',
      'Integrated InsightFace for face detection/encoding and Gemini 2.5 Flash to extract structured identity and context from raw conversation transcripts.',
    ],
    image: {
      src: mentraGlasses,
      alt: 'Michael wearing MentraOS smart glasses.',
    },
  },
  {
    name: 'HardwareHub',
    url: 'https://github.com/michaelnkr808/cruzhacks-26',
    stack: 'React, TypeScript, Vite, TailwindCSS, Hono, Supabase, Claude API',
    timeframe: 'Jan 2026',
    bullets: [
      'Won Best Hardware Hack at CruzHacks 2026 — embedded-systems learning platform teaching ESP32/Arduino projects without requiring users to own hardware up front.',
      'Built 27+ lessons across 5 learning paths with role-based progression, a drag-and-drop visual circuit editor, and gamified progress tracking backed by Supabase/PostgreSQL.',
      'Integrated the Anthropic Claude API to generate personalized quizzes from student notes captured through the Opennote SDK.',
    ],
    image: {
      src: cruzhacksAward,
      alt: 'HardwareHub team at CruzHacks 2026 holding a TurtleBot prize.',
    },
  },
  {
    name: 'AGNI-Network',
    url: 'https://github.com/beong789/AGNI-Network',
    stack: 'TypeScript, Python, Docker Compose, public climate APIs',
    timeframe: '2025',
    bullets: [
      "Placed 3rd at the UN's Reboot the Earth 2025 hackathon — wildfire risk dashboard scoring California counties on a color-coded heat map using live data from Weather.gov, NASA, and the U.S. Drought Monitor.",
      'Implemented an AI agent that answers location-specific fire-risk questions and recommends mitigation strategies to fire departments when risk thresholds are exceeded.',
    ],
    image: {
      src: rebootTeam,
      alt: 'AGNI Network team at Reboot the Earth.',
    },
  },
]

export const awards: string[] = [
  'Best Hardware Hack — CruzHacks 2026 (UCSC\'s annual hackathon)',
  '3rd Place — Reboot the Earth 2025 (hackathon hosted by the United Nations)',
]

export const skills = {
  languages: 'Python, TypeScript/JavaScript, C, SQL (PostgreSQL)',
  frameworks: 'PyTorch, FastAPI, React, React Native, TailwindCSS, Bun',
  tools: 'Docker, Kubernetes, Git, PostgreSQL/pgvector',
}

export type PersonalPhoto = {
  src: string
  alt: string
  caption: string
}

export const personalPhotos: PersonalPhoto[] = [
  {
    src: personalBjj,
    alt: 'Michael on a jiu jitsu tournament podium.',
    caption: 'BJJ tournament podium',
  },
  {
    src: personalTraining,
    alt: 'Michael with a coach at a jiu jitsu event.',
    caption: 'At a BJJ tournament',
  },
  {
    src: meOnTheBeach,
    alt: 'Michael at the beach.',
    caption: 'Beach day',
  },
  {
    src: wintersHike,
    alt: 'Michael on a winter hike.',
    caption: 'Winters, CA hike',
  },
]

export const personalNote =
  'Outside of school and projects I train jiu jitsu, hike, and spend time at the beach.'
