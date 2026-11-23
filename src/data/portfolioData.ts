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
    name: 'Campus Trace',
    honestLine: 'Built it because losing your student ID shouldn’t feel like losing your identity.',
    year: '2026',
    role: 'Full-Stack Developer',
    scope: 'Lost & Found Platform · Smart Matching · Student Safety',
    image: '/src/assets/images/work_ford_hmi_1795158519236.jpg',
    caseOverview:
      'Designed and developed a secure lost-and-found platform for university students, combining intelligent report matching, cloud-based image storage, authentication, and real-time notifications to make recovering lost belongings faster and safer.',
    outcomes: [
      'Implemented smart matching between lost and found reports',
      'Built secure authentication with email verification and password recovery',
      'Integrated cloud image storage, claim verification, and real-time notifications',
    ],
  },
  {
    id: 'ufc',
    name: 'WorkSure',
    honestLine: 'One piece of a much bigger puzzle—and seeing it come together was the best part.',
    year: '2026',
    role: 'Frontend Developer & UI/UX Designer',
    scope: 'Service Marketplace · Booking System · Team Collaboration',
    image: '/src/assets/images/work_ufc_ecosystem_1795158521161.jpg',
    caseOverview:
      'Contributed to the frontend development of a full-stack service marketplace connecting users with verified professionals. Focused on building responsive interfaces, authentication flows, booking experiences, and dashboard components while collaborating in an agile development team.',
    outcomes: [
      'Developed responsive React interfaces for booking, authentication, and user dashboards',
      'Implemented secure role-based user experiences and modern UI components',
      'Selected as a Top 10 Software Engineering project at the UIU CSE Project Show',
    ],
  },
  {
    id: 'lincoln',
    name: 'IoT MedConnect',
    honestLine:
      'Built to make sure forgetting a medicine doesn’t become a life-threatening mistake.',
    year: '2026',
    role: 'IoT & Embedded Systems Developer',
    scope: 'Smart Healthcare · IoT Monitoring · Embedded Systems',
    image: '/src/assets/images/work_ford_hmi_1795158519236.jpg',
    caseOverview:
      'Developed an award-winning IoT healthcare solution that improves medication adherence for elderly patients through automated dispensing, real-time monitoring, and emergency caregiver alerts. The system combines embedded hardware with cloud connectivity to deliver a safer and more reliable medication experience.',
    outcomes: [
      'Designed a time-controlled smart medicine dispenser with physical access control',
      'Integrated ESP32, Arduino, GSM calling, sensors, and a real-time caregiver dashboard',
      'Awarded 1st Runner-Up at the UIU CSE Project Show (Microprocessors & Microcontrollers)',
    ],
  },
  {
    id: 'royal-caribbean',
    name: 'Spectra Arena',
    honestLine:
      'Started as an OOP assignment and somehow turned into eight games, an AI opponent, and real-time multiplayer.',
    year: '2025',
    role: 'Java Developer',
    scope: 'Game Development · JavaFX · Multiplayer Networking',
    image: '/src/assets/images/work_spatial_product_1795158520948.jpg',
    caseOverview:
      'Developed a JavaFX-based gaming platform featuring eight classic games within a single application. Built using object-oriented design principles, the platform includes secure user authentication, profile management, AI-powered gameplay, and real-time multiplayer functionality powered by socket programming.',
    outcomes: [
      'Built an extensible JavaFX platform featuring eight fully playable games',
      'Implemented real-time multiplayer Tic-Tac-Toe using Java Socket Programming',
      'Awarded 5th Runner-Up at the UIU CSE Project Show (Advanced Object-Oriented Programming)',
    ],
  },
  // {
  //   id: 'sleepiq',
  //   name: 'SleepIQ',
  //   honestLine:
  //     'Designed a 1M+ users product utilizing my best personal experience: sleeping.',
  //   year: '2019',
  //   role: 'Senior Product Designer',
  //   scope: 'Wellness App · Biometric Feedback · Hardware Companion',
  //   image: '/src/assets/images/work_spatial_product_1795158520948.jpg',
  //   caseOverview:
  //     'Redesigned the daily sleep-score reflection and smart-bed environmental control experience for over a million sleepers, turning nightly biometric data into calm morning clarity.',
  //   outcomes: [
  //     'Simplified dual-zone firmness and temperature controls to single-tap gestures',
  //     'Replaced dense biometric tables with scannable morning recovery narratives',
  //     'Elevated daily active engagement across iOS and Android companion apps',
  //   ],
  // },
  // {
  //   id: 'nfl',
  //   name: 'NFL',
  //   honestLine:
  //     'Explored the Future of Fantasy Football while being in a country where football means a total different sport.',
  //   year: '2020',
  //   role: 'Lead Concept Designer',
  //   scope: 'Future Vision · Interactive Fantasy · Sports Telemetry',
  //   image: '/src/assets/images/work_ufc_ecosystem_1795158521161.jpg',
  //   caseOverview:
  //     'Envisioned a next-generation fantasy league experience combining live match momentum, instant roster trade simulations, and social game-day rituals for modern fans.',
  //   outcomes: [
  //     'Prototyped dynamic player cards reacting to live play-by-play probability',
  //     'Designed friction-free draft room and Sunday matchup dashboards',
  //     'Validated high-energy dark-mode visual hierarchy for multi-hour sessions',
  //   ],
  // },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'michael',
    name: 'Merit Scholarship',
    role: '4 Consecutive Trimesters',
    company: 'United International University',
    initials: 'MS',
    avatar: '/src/assets/images/avatar_michael_gough_1795159728875.jpg',
    quote: 'Awarded merit scholarships for four consecutive trimesters, including three 50% scholarships and one 25% scholarship, for consistently ranking among the university’s top-performing students.',
    honestQuote: "My GPA survived every semester. Honestly, I'm still impressed.",
  },
  {
    id: 'peter',
    name: '1st Runner-Up',
    role: 'Microprocessors & Microcontrollers',
    company: 'UIU CSE Project Show',
    initials: '1R',
    avatar: '/src/assets/images/avatar_peter_smart_1795159728848.jpg',
    quote: 'IoT MedConnect received 1st Runner-Up for developing a smart healthcare solution that improves medication adherence for elderly patients.',
    honestQuote: "Built to solve a real problem—not just to earn a grade.",
  },
  {
    id: 'tuan',
    name: '5th Runner-Up',
    role: 'Advanced Object-Oriented Programming',
    company: 'UIU CSE Project Show',
    initials: '5R',
    avatar: '/src/assets/images/avatar_tuan_nguyen_1795159728382.jpg',
    quote: 'Spectra Arena was recognized for combining object-oriented design, AI gameplay, and real-time multiplayer using socket programming.',
    honestQuote:
      'Eight games, countless bugs, and one unforgettable semester.',
  },
];

