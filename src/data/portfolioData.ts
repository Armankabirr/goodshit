export interface CapabilityItem {
  id: string;
  title: string;
  honestSummary: string;
  deliverables: string;
  tools: string;
  image: string;
  details: string;
}

export interface ExperienceItem {
  year: string;
  role: string;
  honestRole: string;
  company: string;
  location: string;
}

export interface ClientProject {
  id: string;
  name: string;
  honestLine: string;
  year: string;
  role: string;
  scope: string;
  image: string;
  caseOverview: string;
  outcomes: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  avatar: string;
  quote: string;
  honestQuote: string;
}

export const HERO_IMAGE = '/src/assets/images/hero_sculpture_dark_1795158520374.jpg';

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: '3d',
    title: 'Full-Stack Development',
    honestSummary: 'Designing and developing complete web applications that combine intuitive user experiences with scalable backend systems.',
    deliverables: 'Responsive Web Apps · REST APIs · Authentication · Admin Dashboards',
    tools: 'React · TypeScript · Node.js · Express · MongoDB · Supabase · Firebase',
    image: '/src/assets/images/hero_sculpture_dark_1795158520374.jpg',
    details:
      'From responsive user interfaces to secure backend services, I build end-to-end applications that solve real-world problems. My focus is on clean architecture, maintainable code, seamless user experiences, and scalable systems. Every project is an opportunity to turn an idea into a reliable product people enjoy using.',
  },
  {
    id: 'visual',
    title: 'Game Development',
    honestSummary:
      'Creating engaging desktop games and interactive experiences.',
    deliverables: 'Desktop Games · AI Opponents· Multiplayer Systems · Interactive UI ',
    tools: 'Java · JavaFX · OOP · Socket Programming · Scene Builder',
    image: '/src/assets/images/work_ford_hmi_1795158519236.jpg',
    details:
      'I enjoy exploring game mechanics and interactive software through object-oriented design. My work includes developing gameplay systems, AI-driven opponents, multiplayer features, and polished desktop experiences such as Spectra Arena.',
  },
  {
    id: 'motion',
    title: 'IoT Development',
    honestSummary:
      'Building connected hardware and software solutions that automate everyday tasks through embedded systems, sensors, cloud connectivity, and real-time monitoring.',
    deliverables: 'Embedded Systems · Smart Automation · IoT Dashboards · Remote Monitoring',
    tools: 'Arduino · ESP32 · C++ · SIM800L · IR Sensors · Servo Motors · Firebase',
    image: '/src/assets/images/work_ufc_ecosystem_1795158521161.jpg',
    details:
      'I build IoT solutions that bridge the physical and digital worlds through sensors, automation, and web technologies. My experience includes smart healthcare systems like IoT MedConnect, combining embedded devices with cloud-connected applications.',
  },
  {
    id: 'product',
    title: 'Research & Networking',
    honestSummary:
      'Exploring secure, scalable systems through research and simulation.',
    deliverables: 'Network Simulation · Security · Performance Analysis',
    tools: 'SUMO · ns-3 · Python',
    image: '/src/assets/images/work_spatial_product_1795158520948.jpg',
    details:
      'I enjoy understanding how complex distributed systems work and researching ways to improve their stability, efficiency, and security. My research focuses on vehicular cloud networks and clustering techniques.',
  },
  {
    id: 'tutorial',
    title: 'Developer Tools',
    honestSummary: 'Building practical tools that simplify everyday workflows and solve small but meaningful problems.',
    deliverables: 'Productivity Apps · Automation Tools · Student Utilities · Web Platforms',
    tools: 'React · TypeScript · Next.js · Firebase · AI APIs',
    image: '/src/assets/images/hero_sculpture_dark_1795158520374.jpg',
    details:
      'I enjoy creating lightweight tools that make everyday tasks faster and easier—not only for myself but for others as well. From course section planners and routine generators to CGPA calculators and student utilities, these projects are designed to save time, reduce frustration, and improve daily workflows.',
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    year: 'NOW',
    role: 'Aspiring Software Engineer',
    honestRole: 'Still learning. Still building.',
    company: 'Open to New Opportunities',
    location: 'Dhaka, Bangladesh',
  },
  {
    year: '2026',
    role: 'Final Year CSE Student',
    honestRole: 'Somehow survived all the deadlines.',
    company: 'United International University',
    location: 'Research · Awards · 4× Merit Scholarship',
  },
  {
    year: '2024',
    role: 'Full-Stack Developer',
    honestRole: 'Turning ideas into side projects.',
    company: 'Personal & Academic Projects',
    location: 'React · Node.js · TypeScript',
  },
  {
    year: '2022',
    role: 'Started Programming Journey',
    honestRole: 'Console.log was my best friend.',
    company: 'Self Learning',
    location: 'HTML · CSS · JavaScript',
  },
];

export const CLIENTS: ClientProject[] = [
  {
    id: 'ford',
    name: 'Ford',
    honestLine: 'Working on the Next-Generation HMI Experience without no driving experience.',
    year: '2022',
    role: 'Design Lead',
    scope: 'Automotive HMI · In-Vehicle OS · Motion System',
    image: '/src/assets/images/work_ford_hmi_1795158519236.jpg',
    caseOverview:
      'Reimagined the ultra-wide instrument cluster and center-stack Human Machine Interface for next-generation electric and connected Ford vehicles, prioritizing glanceable telemetry and calm night-drive contrast.',
    outcomes: [
      'Unified cockpit typography and dark-mode luminance across 3 display zones',
      'Reduced secondary navigation touch depth for key climate and media controls',
      'Built real-time motion prototypes validated with global engineering teams',
    ],
  },
  {
    id: 'ufc',
    name: 'UFC',
    honestLine: 'Developed the Future of UFC Sports Ecosystem despite not being a sports fan.',
    year: '2021',
    role: 'Lead Visual & Product Designer',
    scope: 'Broadcast Ecosystem · Interactive Fight Night · Design Language',
    image: '/src/assets/images/work_ufc_ecosystem_1795158521161.jpg',
    caseOverview:
      'Crafted an integrated cross-screen vision connecting live arena broadcast telemetry, real-time strike analytics, and second-screen interactive fight cards into one cohesive product language.',
    outcomes: [
      'Consolidated live bout telemetry, fighter reach metrics, and round pacing',
      'Created high-contrast arena visual direction built for low-light viewing',
      'Delivered modular component specs across TV, mobile, and web platforms',
    ],
  },
  {
    id: 'lincoln',
    name: 'Lincoln',
    honestLine:
      'Defined the visual concept and design language for the Lincoln Zephyr 2022 but never seen it in real life.',
    year: '2021',
    role: 'Visual Concept Lead',
    scope: 'Coast-to-Coast Display · Spatial UI · Luxury Craft',
    image: '/src/assets/images/work_ford_hmi_1795158519236.jpg',
    caseOverview:
      'Established the serene sanctuary visual philosophy for the pillar-to-pillar panoramic display inside the 2022 Lincoln Zephyr, pairing warm metallic accents with quiet atmospheric transitions.',
    outcomes: [
      'Art-directed bespoke ambient drive themes synchronized with cabin lighting',
      'Designed calm transition choreography across the 27-inch panoramic canvas',
      'Shipped foundational visual guidelines adopted into production hardware',
    ],
  },
  {
    id: 'royal-caribbean',
    name: 'Royal Caribbean',
    honestLine:
      'I was just one person on a massive team that created an entire Royal Caribbean eco-system.',
    year: '2020',
    role: 'Senior Product Designer',
    scope: 'Connected Guest Experience · Wayfinding · Mobile Companion',
    image: '/src/assets/images/work_spatial_product_1795158520948.jpg',
    caseOverview:
      'Contributed visual systems and interactive booking flows for a multi-touchpoint digital ecosystem spanning pre-trip planning, onboard spatial wayfinding, and stateroom controls.',
    outcomes: [
      'Streamlined excursion scheduling and real-time itinerary visibility',
      'Harmonized visual patterns across mobile companion and kiosk touchpoints',
      'Collaborated across distributed multi-disciplinary engineering squads',
    ],
  },
  {
    id: 'sleepiq',
    name: 'SleepIQ',
    honestLine:
      'Designed a 1M+ users product utilizing my best personal experience: sleeping.',
    year: '2019',
    role: 'Senior Product Designer',
    scope: 'Wellness App · Biometric Feedback · Hardware Companion',
    image: '/src/assets/images/work_spatial_product_1795158520948.jpg',
    caseOverview:
      'Redesigned the daily sleep-score reflection and smart-bed environmental control experience for over a million sleepers, turning nightly biometric data into calm morning clarity.',
    outcomes: [
      'Simplified dual-zone firmness and temperature controls to single-tap gestures',
      'Replaced dense biometric tables with scannable morning recovery narratives',
      'Elevated daily active engagement across iOS and Android companion apps',
    ],
  },
  {
    id: 'nfl',
    name: 'NFL',
    honestLine:
      'Explored the Future of Fantasy Football while being in a country where football means a total different sport.',
    year: '2020',
    role: 'Lead Concept Designer',
    scope: 'Future Vision · Interactive Fantasy · Sports Telemetry',
    image: '/src/assets/images/work_ufc_ecosystem_1795158521161.jpg',
    caseOverview:
      'Envisioned a next-generation fantasy league experience combining live match momentum, instant roster trade simulations, and social game-day rituals for modern fans.',
    outcomes: [
      'Prototyped dynamic player cards reacting to live play-by-play probability',
      'Designed friction-free draft room and Sunday matchup dashboards',
      'Validated high-energy dark-mode visual hierarchy for multi-hour sessions',
    ],
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'michael',
    name: 'Michael Glass',
    role: 'Group Design Director',
    company: 'Fantasy Interactive',
    initials: 'MG',
    avatar: '/src/assets/images/avatar_michael_gough_1795159728875.jpg',
    quote: 'Minh is seriously the best and he never complains.',
    honestQuote: "He's terrible, but it's his birthday so I'd say something nice.",
  },
  {
    id: 'peter',
    name: 'Peter Smart',
    role: 'Head of Product',
    company: 'Fantasy',
    initials: 'PS',
    avatar: '/src/assets/images/avatar_peter_smart_1795159728848.jpg',
    quote: 'This looks amazing. Great work!',
    honestQuote: "I didn't even open the Figma link, I just saw the thumbnail.",
  },
  {
    id: 'tuan',
    name: 'Tuan Nguyen',
    role: 'Creative Director',
    company: 'Interactive Labs',
    initials: 'TN',
    avatar: '/src/assets/images/avatar_tuan_nguyen_1795159728382.jpg',
    quote: 'Working with Minh elevated our entire studio craft in motion, 3D, and product design.',
    honestQuote:
      'He spent half the sprint complaining about feedback, then delivered the best work anyway.',
  },
];

