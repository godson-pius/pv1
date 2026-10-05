export const profile = {
  name: 'Godson Pius',
  alias: 'Godson Azubuike',
  avatar: '/profPic.png',
  roles: ['Founder & Product Builder', 'Full-Stack Software Engineer', 'Technology Educator', 'Entrepreneurial Leader'],
  tagline: 'I build technology that solves real problems.',
  location: 'Kigali, Rwanda',
  email: 'godsonazubuike15@gmail.com',
  phone: '+234 814 787 1946',
  socials: [
    { label: 'GitHub', href: 'https://github.com/godson-pius' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/godson-azubuike-9b462b1b1' },
    { label: 'Twitter', href: 'https://twitter.com/azubuike_godson' },
    { label: 'Linktree', href: 'https://linktr.ee/godsonpius' },
  ],
}

export const stats = [
  { value: 8, suffix: '+', label: 'Years building & shipping' },
  { value: 2020, suffix: '', label: 'WBT founded' },
  { value: 88, suffix: '', label: 'Hackathon rivals · 2nd place' },
  { value: 12, suffix: '+', label: 'Products & ventures' },
]

export const focusAreas = [
  'Artificial Intelligence', 'Full-Stack Development', 'Mobile Applications', 'Web Applications',
  'FinTech', 'HealthTech', 'AgriTech', 'IoT', 'Robotics', 'Education Technology', 'Entrepreneurship',
]

export const stack = [
  { title: 'Frontend Development', icon: '◧', items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Material UI', 'Chakra UI'] },
  { title: 'Mobile Development', icon: '▯', items: ['React Native', 'Expo', 'Expo Router', 'EAS Build', 'Firebase Mobile'] },
  { title: 'Backend & APIs', icon: '⬡', items: ['Node.js', 'Express.js', 'REST APIs', 'Auth & JWT', 'WebSockets', 'Payment Integrations'] },
  { title: 'Databases & Storage', icon: '◍', items: ['MongoDB', 'Mongoose', 'PostgreSQL', 'Prisma', 'Firebase Realtime DB', 'Redis'] },
  { title: 'AI & Machine Learning', icon: '✦', items: ['Google Gemini', 'TensorFlow', 'MobileNetV2', 'ONNX Runtime', 'AI Translation', 'Summarization', 'Prompt Engineering'] },
  { title: 'IoT & Robotics', icon: '⌬', items: ['Raspberry Pi 4', 'Arduino', 'ESP32', 'RPLIDAR', 'ROS', 'SLAM', 'Autonomous Navigation'] },
  { title: 'Cloud & Infrastructure', icon: '☁', items: ['Vercel', 'Firebase', 'Hostinger VPS', 'Namecheap', 'GitHub CI/CD', 'Google Play Console', 'EAS'] },
]

export type Project = {
  name: string
  kicker: string
  description: string
  tags: string[]
  features?: string[]
  status?: string
  highlight?: string
  vision?: string
  accent: string
  link?: string
  repo?: string
  image?: string
}

export const featured: Project[] = [
  {
    name: 'Gabvia',
    kicker: 'AI-Powered Multilingual Communication Platform',
    description:
      "Messages are automatically translated into the recipient's preferred language, eliminating linguistic barriers from everyday conversations. Shipped end-to-end from conception to public release on Google Play with AI translations, group summaries, payments, and referral economies.",
    features: [
      'Automatic instant message translation',
      'Group chats with AI-powered summaries',
      'Real-time voice translation & audio',
      'Message scheduling & calendar event triggers',
      'End-to-end chat encryption & cloud backup',
      'GAB Points virtual reward economy',
      'Multilevel viral referral mechanics',
      'Adaptive light & dark OLED interfaces',
    ],
    tags: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Google Gemini', 'Flutterwave', 'Monnify'],
    vision: 'To make language barriers disappear from everyday communication across the globe.',
    accent: '#34d399',
    link: 'https://gabvia.app',
  },
  {
    name: 'VunaLink',
    kicker: 'AI-Powered Crop Disease Detection',
    description:
      'An offline-first Progressive Web App designed to identify agricultural crop diseases using edge machine learning. Built to function reliably even within rural African infrastructure constraints and intermittent internet.',
    tags: ['Next.js', 'PWA', 'TensorFlow', 'MobileNetV2', 'PlantVillage Dataset', 'ONNX Runtime', 'Offline-First'],
    highlight: '🥈 2nd Place out of 88 participants at TechX Hackathon Rwanda',
    status: 'Award Winner',
    accent: '#10b981',
  },
  {
    name: 'MedMask',
    kicker: 'Private Digital Healthcare Platform',
    description:
      'A health-tech venture making sexual health support safe, stigmatization-free, and private. Enables young people to consult qualified healthcare practitioners anonymously and receive medically verified sexual health education.',
    features: [
      'Anonymous verified consultations',
      'Curated sexual health knowledge base',
      'Direct doctor connection & triage',
      'Privacy-first encrypted health logs',
      'Accessible digital support pipelines',
    ],
    tags: ['HealthTech', 'Telehealth', 'Zero-Stigma Privacy', 'End-to-End Encryption'],
    vision: 'To make conversations around sexual health safer, more private, and universally accessible.',
    status: 'In Development',
    accent: '#f59e0b',
  },
  {
    name: 'Delivery Robot',
    kicker: 'Robotics & Autonomous Navigation',
    description:
      'An autonomous ground delivery robot combining embedded hardware, real-time spatial computing, and SLAM navigation algorithms to solve real-world last-mile delivery challenges.',
    features: [
      'LIDAR point-cloud 2D/3D mapping',
      'SLAM autonomous route planning',
      'Dual-mode joystick telemetry & manual override',
      'Precision motor controllers & battery management',
    ],
    tags: ['Raspberry Pi 4', 'Ubuntu Core', 'ROS', 'RPLIDAR', 'SLAM', 'Hardware-Software Interop'],
    status: 'Prototype Deployed',
    accent: '#06b6d4',
  },
]

export const ventures: Project[] = [
  {
    name: 'Gabvia',
    kicker: 'Founder & Product Builder',
    description:
      'AI-powered multilingual communication platform automatically translating messages across language barriers. Shipped end-to-end on Google Play with real-time translation, AI summaries, and localized payments.',
    tags: ['Founder', 'AI Messaging', 'Mobile App', 'Google Play'],
    accent: '#34d399',
    link: 'https://gabvia.app',
  },
  {
    name: 'MedMask',
    kicker: 'Founder & Lead Builder',
    description:
      'Private digital healthcare venture making sexual health support safe, anonymous, and universally accessible through encrypted clinical consultations.',
    tags: ['Founder', 'HealthTech', 'Telehealth', 'Privacy'],
    accent: '#f59e0b',
  },
  {
    name: 'World Brain Technology',
    kicker: 'Founder & Lead Developer · 2020 – Present',
    description:
      'Full-cycle digital innovation studio building enterprise web applications, mobile platforms, IoT automation, CRM systems, and engineering masterclasses.',
    tags: ['Founder', 'Software Engineering', 'IoT', 'CRM', 'Education'],
    accent: '#10b981',
    link: 'https://worldbraintechnology.com',
  },
  {
    name: 'WBT Academy',
    kicker: 'Technology Education & Mentorship',
    description:
      'Demystifying programming for hundreds of aspiring African developers. Flagship programs like "Code Without Fear" help newcomers bridge intimidation into high-velocity careers in software.',
    tags: ['Teaching', 'Mentorship', 'Curriculum Design', 'Community'],
    accent: '#f59e0b',
  },
  {
    name: 'SkillBridge',
    kicker: 'Marketplace Platform Concept',
    description:
      'Digital marketplace connecting verified local artisans and skilled tradespeople with everyday consumers, driving micro-economic mobility and trust in informal sectors.',
    tags: ['Marketplace', 'Gig Economy', 'FinTech Integration'],
    accent: '#34d399',
  },
  {
    name: 'AI Video Creation Platform',
    kicker: 'Generative Media Exploration',
    description:
      'Allowing creators and storytellers to turn plain-text narratives into cinematic AI-generated videos without expensive studio hardware or editing expertise.',
    tags: ['Generative AI', 'Video Automation', 'Storytelling'],
    accent: '#8b5cf6',
  },
]

export const archive: Project[] = [
  { name: 'Podpis', kicker: 'Web App', description: 'Podcast and publishing web platform engineered by WBT.', tags: ['Full-Stack Web'], accent: '#10b981', link: 'https://podpis.worldbraintechnology.com', repo: 'https://github.com/godson-pius/podpis', image: '/podpis.png' },
  { name: 'Gentle Crypto', kicker: 'FinTech Website', description: 'Institutional crypto academy and ecosystem marketing hub.', tags: ['Web', 'Crypto'], accent: '#f59e0b', link: 'https://gentlecrypto.io', repo: 'https://github.com/godson-pius/gentlecrypto', image: '/gentlecrypto.png' },
  { name: 'Elephant Packs', kicker: 'Industrial Portal', description: 'Corporate digital presence for Elephant Packs Industries Ltd.', tags: ['Corporate Portal'], accent: '#34d399', link: 'https://elephantpacksindltd.com', repo: 'https://github.com/godson-pius/elephantpack', image: '/elephantpack.png' },
  { name: 'Nadice Oil', kicker: 'Energy Enterprise', description: 'Corporate website and inventory showcases for Nadice Oil Ltd.', tags: ['Enterprise Web'], accent: '#ef4444', link: 'https://nadiceoilltd.com/', repo: 'https://github.com/godson-pius/nadice', image: '/nadice.png' },
  { name: 'ASU UK', kicker: 'Diaspora Platform', description: 'Official community hub for Anambra State Union United Kingdom.', tags: ['Community Portal'], accent: '#0ea5e9', link: 'https://anambrastateunion1.org.uk', repo: 'https://github.com/godson-pius/asu', image: '/asu.png' },
  { name: 'Mr Data', kicker: 'Telecoms Utility', description: 'Automated data reseller and VTU digital utility platform.', tags: ['Utility', 'Payments'], accent: '#f43f5e', link: 'https://mrdata.netlify.app', repo: 'https://github.com/godson-pius/mrdata', image: '/mrdata.png' },
  { name: 'Gracie Writes', kicker: 'Editorial Blog', description: 'Clean, typography-focused personal editorial publication.', tags: ['CMS', 'Editorial'], accent: '#d946ef', link: 'https://gracieblog.netlify.app', repo: 'https://github.com/godson-pius/gracie-writes', image: '/graciewrites.png' },
  { name: 'Strange Facts', kicker: 'Interactive Discovery', description: 'Curated trivia web app with high-speed randomizer algorithms.', tags: ['Interactive Web'], accent: '#84cc16', link: 'https://strangefacts.netlify.app', repo: 'https://github.com/godson-pius/facts', image: '/factapp.png' },
]

export const experience = [
  {
    role: 'Founder & Lead Developer',
    org: 'World Brain Technology Limited',
    period: '2020 – Present',
    text: 'Established and steer a technology company architecting digital products, embedded robotics, enterprise web applications, and developer empowerment programs.',
    points: ['Full-stack software engineering', 'Product strategy & discovery', 'Technical leadership', 'Client software architecture', 'Embedded IoT and robotics', 'Developer mentorship', 'Strategic partnerships'],
  },
  {
    role: 'Founder & Product Builder',
    org: 'Gabvia',
    period: '2023 – Present',
    text: 'Spearheading product architecture, machine learning integrations, and mobile development for a consumer messaging app breaking global language barriers.',
    points: ['Product lifecycle & roadmapping', 'Google Gemini AI integrations', 'React Native / Expo architecture', 'Fintech payment gateways', 'Play Store deployment & analytics', 'User retention & viral loops'],
  },
  {
    role: 'Technology Educator & Mentor',
    org: 'WBT Academy & Tech Communities',
    period: 'Ongoing',
    text: 'Author and instructor of masterclasses like "Code Without Fear". Mentoring dozens of engineers through fundamental programming concepts into real-world career placements.',
    points: ['Hands-on masterclasses', 'Algorithmic thinking coaching', '1-on-1 career mentorship', 'Open-source evangelism'],
  },
]

export const education = [
  {
    title: 'BSc (Hons) Entrepreneurial Leadership',
    org: 'African Leadership University (ALU), Rwanda',
    text: 'Bridging engineering excellence with systemic leadership, business model innovation, ethical governance, and pan-African scalable ventures.',
  },
  {
    title: 'Applied Technology Education',
    org: 'India — Graduated with Distinction',
    text: 'Intensive computer science and software development training, complemented by an Advanced Diploma in Software Engineering (2020).',
  },
]

export const achievements = [
  { icon: '🥈', title: 'TechX Hackathon', text: '2nd place out of 88 innovators for VunaLink offline-first agricultural AI.' },
  { icon: '🚀', title: 'Google Play Release', text: 'Architected and shipped Gabvia AI platform into production on Google Play.' },
  { icon: '🏢', title: 'Founded WBT (2020)', text: 'Built a sustainable digital consultancy delivering software across 3 continents.' },
  { icon: '👨🏾‍💻', title: '8+ Years in Technology', text: 'Deep domain expertise in full-stack, mobile, AI inference, IoT & fintech.' },
  { icon: '👨🏾‍🏫', title: 'Impact Educator', text: 'Empowered hundreds through "Code Without Fear" and WBT Academy.' },
  { icon: '🎓', title: 'ALU Leader', text: 'Cultivating entrepreneurial leadership in Kigali, driving global impact.' },
]

export const building = [
  { name: 'Gabvia Ecosystem', text: 'Scaling cross-language conversational intelligence with multimodal translation models.' },
  { name: 'MedMask Health', text: 'Refining privacy architectures and encrypted clinical consultation triage.' },
  { name: 'AI Video Storytelling', text: 'Prototyping automated cinematic video pipelines from structured narrative prompts.' },
  { name: 'Founder Growth', text: 'Synchronizing leadership, capital allocation, and venture scaling at ALU.' },
]

export const articles = [
  {
    title: 'Building Offline-First AI for Real African Infrastructure Constraints',
    snippet: 'Why cloud-dependent models fail in rural regions, and how we engineered VunaLink with MobileNetV2 and ONNX Runtime to diagnose crop diseases with zero connectivity.',
    date: 'Oct 2024',
    readTime: '6 min read',
    tags: ['Edge AI', 'AgriTech', 'ONNX', 'PWA'],
    category: 'Architecture',
  },
  {
    title: 'Breaking Linguistic Borders: The Multilingual Architecture of Gabvia',
    snippet: 'A deep dive into integrating Google Gemini with low-latency messaging, handling multi-lingual contextual nuance, and building localized fintech payment rails across Africa.',
    date: 'Aug 2024',
    readTime: '8 min read',
    tags: ['AI & LLMs', 'Mobile', 'React Native', 'FinTech'],
    category: 'Engineering',
  },
  {
    title: 'Code Without Fear: Why Mental Models Beat Syntax for Aspiring Engineers',
    snippet: 'Insights from mentoring hundreds of beginners at WBT Academy on conquering imposter syndrome, building intuition before code, and shipping real products faster.',
    date: 'Jun 2024',
    readTime: '5 min read',
    tags: ['Education', 'Mentorship', 'Career'],
    category: 'Leadership',
  },
  {
    title: 'Why Africa’s Next Tech Giants Will Be Built by Systems Leaders, Not Just Coders',
    snippet: 'Reflections from my studies in Entrepreneurial Leadership at ALU: why deep tech must be coupled with distribution insight, local empathy, and policy fluency to scale.',
    date: 'Mar 2024',
    readTime: '7 min read',
    tags: ['Startups', 'Leadership', 'Africa Tech'],
    category: 'Venture',
  },
]

export const songs = [
  {
    title: 'Believe Me',
    artist: 'Godson Pius',
    role: 'Vocalist & Composer',
    description: 'An uplifting gospel worship piece speaking to faith, perseverance, and divine purpose.',
    audioSrc: '/believeme.mp3',
    coverImg: '/believe.jpeg',
    duration: '3:45',
    linktree: 'https://linktr.ee/godsonpius',
  },
]

export const beliefs = [
  'Technology must solve real, tangible problems — not just chase novelty.',
  'World-class products are born by understanding human beings, not just writing syntax.',
  'Africa has unmatched potential to engineer pioneering global technology and ventures.',
  'Developers must grow into founders who grasp market distribution, user psychology, and unit economics.',
  'Every gift, line of code, and opportunity we receive must be leveraged to create lasting value for others.',
]

export const journey = [
  'Learning to code',
  'Mastering software architecture',
  'Teaching & mentoring others',
  'Building end-to-end products',
  'Founding technology companies',
  'Scaling pan-African impact',
]
