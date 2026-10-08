import meOnTheBeach from './assets/me-on-the-beach.jpeg'
import personalBjj from './assets/personal-0911.png'
import wintersHike from './assets/winters-hike.jpeg'
import personalTraining from './assets/personal-0910.png'
import researchAriaBoxes from './assets/research-aria-boxes.png'
import mentraGlasses from './assets/mentra-glasses.png'
import blueprintTeam from './assets/blueprint-full-team.jpg'
import cruzhacksAward from './assets/cruzhacks-award-cropped.jpeg'
import rebootTeam from './assets/reboot-the-earth-team.jpeg'
import acmIntel from './assets/acm2025.jpg'

type EntryImage = {
  src: string
  alt: string
}

export const profile = {
  name: 'Michael Ramirez',
  phone: '808-330-9954',
  email: 'michaelnkr808@gmail.com',
  github: 'https://github.com/michaelnkr808',
  linkedin: 'https://linkedin.com/in/',
  location: 'Folsom, California',
}

export const education = {
  school: 'University of California, Santa Cruz',
  location: 'Santa Cruz, CA',
  degree: 'B.S. in Computer Science',
  gpa: '3.82 / 4.0',
  graduation: 'Expected December 2027',
  coursework:
    'Data Structures & Algorithms, Artificial Intelligence, Machine Learning (Graduate), Probability Theory, Computer Systems & Assembly Language, C Programming',
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
    title: 'Group Tutor, CSE 13S (Computer Systems & C Programming)',
    org: 'UC Santa Cruz',
    location: 'Santa Cruz, CA',
    timeframe: 'Sep 2026 – Present',
    bullets: [
      'Lead group tutoring sessions on C programming, memory management, pointers, and debugging.',
      'Help students work through assignments using GDB, Valgrind, and Makefiles.',
      'Explain systems concepts including bit manipulation, dynamic memory allocation, and implementing data structures in C.',
      'Guide students through tracking down segfaults and memory leaks by walking through their code line by line.',
    ],
  },
  {
    title: 'Undergraduate ML Researcher',
    org: 'UC Santa Cruz',
    location: 'Santa Cruz, CA',
    timeframe: 'Jan 2026 – Present',
    bullets: [
      'Reconstructed 3D scenes from Meta ARIA glasses data by modeling geometry with 3D Gaussian Splatting.',
      'Enabled open-vocabulary 3D scene search by fusing SAM2 segmentation masks with vision-language embeddings.',
      'Answered natural language questions about reconstructed scenes through agent-based querying.',
      'Standardized training for 5+ researchers in a 15-person lab by containerizing pipelines with Docker and Kubernetes.',
      'Presented research outcomes and pipeline progress to the 15-person lab group and supervising professor.',
    ],
    image: {
      src: researchAriaBoxes,
      alt: '3D bounding boxes projected onto an Aria-captured indoor scene.',
    },
  },
  {
    title: 'Software Developer',
    org: 'Blueprint',
    location: 'Santa Cruz, CA',
    timeframe: 'Dec 2025 – Jun 2026',
    bullets: [
      "Shipped 6+ frontend features for a nonprofit client's web and mobile app as part of a 20-person team.",
      'Implemented UI components in React, React Native, TypeScript, and TailwindCSS across web and mobile.',
      "Collaborated across dev and design teams, turning the design team's Figma mockups into working web and mobile screens.",
      'Delivered changes through pull-request-based Git workflows with peer code review, tracking tasks in Linear.',
    ],
    image: {
      src: blueprintTeam,
      alt: 'Blueprint development team on a bridge.',
    },
  },
]

export const leadership: ExperienceEntry[] = [
  {
    title: 'Research Lab Lead & Instruction Officer',
    org: 'Association for Computing Machinery (ACM), UC Santa Cruz',
    location: 'Santa Cruz, CA',
    timeframe: 'Oct 2026 – Present',
    bullets: [
      "Lead ACM's student research lab, guiding members through ML and systems research projects.",
      'Run technical workshops and instructional sessions for ACM members.',
    ],
    image: {
      src: acmIntel,
      alt: 'UCSC ACM members in front of the Intel sign.',
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
      'Helped users remember people through voice commands to save, recognize, look up, and forget contacts on MentraOS glasses.',
      'Linked faces to conversation context by pairing InsightFace encodings with Gemini 2.5 Flash transcript extraction.',
      'Matched returning faces per user with pgvector L2-distance search over 512-d embeddings in a FastAPI backend.',
      'Cut photo capture latency by triggering the camera on partial speech transcriptions before commands finalized.',
      'Filtered false face detections with confidence thresholds, minimum size checks, and upscaling of small glasses images.',
    ],
    image: {
      src: mentraGlasses,
      alt: 'Michael wearing MentraOS smart glasses.',
    },
  },
  {
    name: 'HardwareHub',
    url: 'https://github.com/michaelnkr808/cruzhacks-26',
    stack: 'TypeScript, Hono, Supabase, Auth0, React, Opennote API',
    timeframe: 'Jan 2026',
    bullets: [
      'Designed the backend of an ESP32/Arduino learning platform, exposing 39 REST endpoints in Hono over 6 Supabase tables.',
      'Built a KiCad-style board editor where users drag 17 hardware modules onto a canvas and wire inputs to outputs.',
      'Personalized studying by generating quizzes from lesson content and student notes through the Opennote Practice API.',
      'Secured accounts with Auth0 passwordless email login and JWT verification middleware.',
      'Motivated learners with 17 unlockable achievements for finishing lessons, acing quizzes, taking notes, and keeping streaks.',
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
  languages: 'Python, TypeScript/JavaScript, C, C++, SQL (PostgreSQL), RISC-V Assembly, Bash',
  frameworks: 'PyTorch, FastAPI, React, React Native, TailwindCSS, Bun, Vite, Hono, LangChain/LangGraph',
  tools: 'Docker, Kubernetes, Git, Linux, PostgreSQL/pgvector, Supabase',
  concepts: 'REST APIs, vector search & embeddings, computer vision, LLM agent workflows',
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
