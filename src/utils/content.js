import {
  FaBullhorn,
  FaChartLine,
  FaCheckCircle,
  FaCloudUploadAlt,
  FaCode,
  FaComments,
  FaHeadset,
  FaHospital,
  FaHotel,
  FaLaptopCode,
  FaMobileAlt,
  FaRobot,
  FaRocket,
  FaShieldAlt,
  FaShoppingBag,
  FaStore,
  FaUsers,
  FaWhatsapp
} from 'react-icons/fa';
import { MdAnalytics, MdAutoAwesome, MdOutlineHealthAndSafety, MdRestaurant } from 'react-icons/md';
import { RiBuilding4Fill, RiHomeGearFill } from 'react-icons/ri';

export const siteConfig = {
  name: 'IdeaClap India',
  title: 'IdeaClap India - Digital & AI Solutions',
  domain: 'https://ideaclapindia.com',
  description:
    'Premium website development, AI solutions, digital marketing, mobile apps, and business automation services for growth-focused businesses.',
  phone: '+91 70672 44561',
  email: 'operations@ideaclapindia.com',
  address: 'Indore, Madhya Pradesh, India',
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '917067244561',
  socials: {
    facebook: 'https://www.facebook.com/profile.php?id=61591509852916',
    instagram: 'https://www.instagram.com/ideaclapindia/',
    linkedin: 'https://www.linkedin.com/company/ideaclapindia/',
    twitter: 'https://x.com/IdeaClapIndia'
  }
};

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'AI Solutions', href: '/ai-solutions' },
  { label: 'Industries', href: '/industries' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' }
];

export const highlights = [
  {
    title: 'Affordable Solutions',
    description: 'Smart packages for startups, local businesses, and growing teams.',
    icon: FaRocket
  },
  {
    title: 'Fast Delivery',
    description: 'Lean execution, tight feedback loops, and launch-ready delivery.',
    icon: FaCheckCircle
  },
  {
    title: 'AI Powered',
    description: 'Automation, chatbots, analytics, and workflows built around measurable outcomes.',
    icon: MdAutoAwesome
  },
  {
    title: 'Dedicated Support',
    description: 'Reliable support after launch so your digital systems keep performing.',
    icon: FaHeadset
  }
];

export const stats = [
  { label: 'Projects Completed', value: 150, suffix: '+' },
  { label: 'Happy Clients', value: 90, suffix: '+' },
  { label: 'Business Solutions', value: 35, suffix: '+' },
  { label: 'Support', value: 24, suffix: '/7' },
  { label: 'Customer Satisfaction', value: 98, suffix: '%' }
];

export const featuredServices = [
  {
    title: 'Website & E-Commerce Solutions',
    description: 'High-converting business websites, e-commerce stores, and landing pages.',
    icon: FaLaptopCode,
    href: '/services'
  },
  {
    title: 'Software & Mobile App Development',
    description: 'Android, iOS, React Native, and Flutter apps for modern businesses.',
    icon: FaMobileAlt,
    href: '/services'
  },
  {
    title: 'Digital Marketing & Brand Growth',
    description: 'SEO, paid ads, social campaigns, and lead-generation funnels.',
    icon: FaChartLine,
    href: '/services'
  },
  {
    title: 'Paid Advertising & Performance Marketing',
    description: 'Google Ads, Meta Ads, and data-driven performance campaigns.',
    icon: FaBullhorn,
    href: '/services'
  },
  {
    title: 'Branding & Creative Design Solutions',
    description: 'Logos, branding, and beautiful graphic design for your business.',
    icon: FaCode,
    href: '/services'
  },
  {
    title: 'AI & Business Automation Solutions',
    description: 'Lead capture, customer support, FAQs, and WhatsApp automation.',
    icon: FaRobot,
    href: '/ai-solutions'
  },
  {
    title: 'Communication & Customer Engagement',
    description: 'Email, messenger, and lifecycle marketing campaigns.',
    icon: FaComments,
    href: '/services'
  },
  {
    title: 'Cloud, DevOps & Infrastructure Services',
    description: 'Cloud consulting, deployments, and performance optimization.',
    icon: FaCloudUploadAlt,
    href: '/services'
  }
];

export const serviceGroups = [
  {
    title: 'Website Development',
    description: 'Conversion-focused websites engineered for speed, SEO, and lead capture.',
    icon: FaCode,
    items: ['Business Websites', 'Corporate Websites', 'E-Commerce', 'Landing Pages', 'Website Maintenance']
  },
  {
    title: 'AI Solutions',
    description: 'AI tools that improve response time, customer experience, and team productivity.',
    icon: FaRobot,
    items: ['AI Chatbots', 'WhatsApp Automation', 'Voice AI', 'Customer Support AI', 'Appointment Booking AI']
  },
  {
    title: 'Digital Marketing',
    description: 'Performance marketing systems built to generate quality enquiries.',
    icon: FaChartLine,
    items: ['SEO', 'Google Ads', 'Facebook Ads', 'Instagram Ads', 'Lead Generation', 'Email Marketing']
  },
  {
    title: 'Software Development',
    description: 'Custom internal tools that remove manual work and operational friction.',
    icon: RiHomeGearFill,
    items: ['CRM', 'ERP', 'Billing Software', 'Inventory Software', 'Custom Software']
  },
  {
    title: 'Mobile App Development',
    description: 'Modern mobile experiences for customers, teams, and operations.',
    icon: FaMobileAlt,
    items: ['Android', 'iOS', 'React Native', 'Flutter']
  }
];

export const aiSolutions = [
  {
    title: 'AI Lead Assistant',
    description: 'Captures, qualifies, and routes leads across website chat and WhatsApp.',
    result: 'Shorter response time'
  },
  {
    title: 'Support Automation',
    description: 'Answers repeat questions, escalates complex issues, and logs conversations.',
    result: 'Lower support load'
  },
  {
    title: 'Appointment AI',
    description: 'Books, reschedules, reminds, and syncs appointments for clinics, salons, and services.',
    result: 'Fewer missed bookings'
  },
  {
    title: 'Voice AI',
    description: 'Handles call flows, captures intent, and sends structured follow-up notes.',
    result: 'Better call coverage'
  },
  {
    title: 'Business Intelligence',
    description: 'Turns enquiries, sales, and campaign data into clear dashboards.',
    result: 'Faster decisions'
  },
  {
    title: 'Workflow Automation',
    description: 'Connects CRM, billing, marketing, spreadsheets, and notifications.',
    result: 'Less manual work'
  }
];

export const industries = [
  { title: 'Restaurants', icon: MdRestaurant, description: 'Menus, ordering, reviews, campaigns, and WhatsApp bookings.' },
  { title: 'Clinics', icon: MdOutlineHealthAndSafety, description: 'Appointment systems, patient enquiries, and reminder automation.' },
  { title: 'Hospitals', icon: FaHospital, description: 'Department pages, care journeys, support automation, and lead routing.' },
  { title: 'Gyms', icon: FaUsers, description: 'Membership funnels, trainer profiles, class leads, and retention campaigns.' },
  { title: 'Retail Stores', icon: FaStore, description: 'Local SEO, e-commerce, catalogue sites, and inventory tools.' },
  { title: 'Coaching Institutes', icon: RiBuilding4Fill, description: 'Course pages, admission leads, LMS integrations, and parent updates.' },
  { title: 'Hotels', icon: FaHotel, description: 'Booking-focused websites, offers, chat support, and reputation growth.' },
  { title: 'Real Estate', icon: RiHomeGearFill, description: 'Project microsites, lead funnels, CRM pipelines, and brochure automation.' },
  { title: 'E-Commerce', icon: FaShoppingBag, description: 'Storefronts, payments, product discovery, and remarketing systems.' }
];

export const testimonials = [
  {
    quote:
      'IdeaClap India Private Limited helped us move from scattered enquiries to a clean website and WhatsApp automation flow. The difference was visible in the first month.',
    name: 'Ankit Sharma',
    role: 'Founder, Urban Foods'
  },
  {
    quote:
      'Their team understood our service business quickly and shipped a premium site with proper lead tracking. Communication was crisp throughout.',
    name: 'Priya Nair',
    role: 'Director, CarePlus Clinic'
  },
  {
    quote:
      'We needed digital marketing and automation without complexity. IdeaClap India Private Limited gave us a practical system that our sales team actually uses.',
    name: 'Rohit Mehta',
    role: 'Sales Head, Prime Realty'
  }
];

export const faqs = [
  { question: 'What is IdeaClap India Private Limited?', answer: 'IdeaClap India Private Limited is a Digital & AI Solutions company helping businesses grow with websites, AI, automation, and digital marketing.' },
  { question: 'What services do you offer?', answer: 'We provide website development, AI solutions, digital marketing, SEO, automation, custom software, and more.' },
  { question: 'Do you build business websites?', answer: 'Yes. We create modern, responsive, and SEO-friendly websites for businesses of all sizes.' },
  { question: 'Can you redesign my existing website?', answer: 'Yes. We can upgrade your website\'s design, speed, features, and overall performance.' },
  { question: 'Do you develop e-commerce websites?', answer: 'Yes. We build secure online stores with payment gateways and inventory management.' },
  { question: 'What is an AI chatbot?', answer: 'An AI chatbot answers customer queries, captures leads, and provides 24/7 support automatically.' },
  { question: 'Do you provide WhatsApp automation?', answer: 'Yes. We automate customer support, follow-ups, reminders, and lead management through WhatsApp.' },
  { question: 'What is business automation?', answer: 'Business automation reduces manual work by automating repetitive tasks and workflows.' },
  { question: 'Do you offer Agentic AI solutions?', answer: 'Yes. We build AI agents that can automate tasks, assist teams, and improve business operations.' },
  { question: 'Do you provide digital marketing?', answer: 'Yes. We offer Google Ads, Meta Ads, SEO, social media marketing, and lead generation services.' },
  { question: 'Can you help my business rank on Google?', answer: 'Yes. Our SEO services improve your website\'s visibility and search engine rankings.' },
  { question: 'Do you manage social media?', answer: 'Yes. We create content, manage pages, and run campaigns across major social platforms.' },
  { question: 'Do you develop custom software?', answer: 'Yes. We build software tailored to your business requirements and workflows.' },
  { question: 'Can you integrate AI into my existing business?', answer: 'Absolutely. We can add AI chatbots, automation, and intelligent workflows to your existing systems.' },
  { question: 'Do you work with startups?', answer: 'Yes. We support startups, SMEs, and established enterprises.' },
  { question: 'Which industries do you serve?', answer: 'We work with healthcare, restaurants, gyms, education, retail, real estate, and many more.' },
  { question: 'Do you provide ongoing support?', answer: 'Yes. We offer maintenance, updates, and technical support after project delivery.' },
  { question: 'How long does a project take?', answer: 'Project timelines depend on the scope and complexity. We\'ll provide a timeline before starting.' },
  { question: 'How much do your services cost?', answer: 'Pricing depends on your business requirements. Contact us for a customized quote.' },
  { question: 'Do you offer free consultations?', answer: 'Yes. We offer a free consultation to understand your business needs.' },
  { question: 'Can I hire you for a single service?', answer: 'Yes. You can choose one service or a complete digital transformation package.' },
  { question: 'Do you work with international clients?', answer: 'Yes. We serve businesses in India and clients worldwide.' },
  { question: 'Is my business data secure?', answer: 'Yes. We follow industry best practices to keep your data safe and secure.' },
  { question: 'How do I get started?', answer: 'Simply contact us through our website, email, or WhatsApp to schedule a consultation.' },
  { question: 'Why choose IdeaClap India Private Limited?', answer: 'We combine AI, technology, and digital expertise to deliver practical solutions that help businesses grow.' },
  { question: 'Do I need technical knowledge to work with IdeaClap India Private Limited?', answer: 'No. We handle everything from planning to deployment.' },
  { question: 'Can you automate my existing business processes?', answer: 'Yes. We automate repetitive tasks to improve efficiency and save time.' },
  { question: 'Will I receive training after the project is completed?', answer: 'Yes. We provide guidance and training to help you use your solution effectively.' },
  { question: 'Can you help generate more leads for my business?', answer: 'Yes. We use websites, SEO, digital marketing, and automation to attract and convert more customers.' },
  { question: 'How can I contact IdeaClap India Private Limited?', answer: 'You can reach us via phone, email, WhatsApp, or the contact form on our website.' }
];

export const portfolioFallback = [
  {
    title: 'Clinic Growth Platform',
    category: 'Healthcare',
    description: 'A booking-focused clinic website with appointment forms, FAQ chatbot, and local SEO.',
    technologies: ['React', 'Node.js', 'SEO', 'WhatsApp']
  },
  {
    title: 'Restaurant Ordering Funnel',
    category: 'Restaurants',
    description: 'A fast menu and ordering experience connected to campaign landing pages.',
    technologies: ['Vite', 'Analytics', 'Meta Ads']
  },
  {
    title: 'Real Estate Lead Hub',
    category: 'Real Estate',
    description: 'Project microsites, brochure capture, CRM routing, and sales follow-up automation.',
    technologies: ['MERN', 'CRM', 'Automation']
  }
];

export const pricingPlans = [
  {
    name: 'Launch',
    price: '₹24,999',
    description: 'For startups and local businesses that need a polished online presence.',
    features: ['5-page business website', 'Responsive UI', 'Contact forms', 'Basic SEO', 'Analytics setup']
  },
  {
    name: 'Growth',
    price: '₹59,999',
    description: 'For teams that need lead generation, automation, and campaign-ready pages.',
    featured: true,
    features: ['Everything in Launch', 'Landing pages', 'WhatsApp integration', 'Lead dashboard', 'Performance optimization']
  },
  {
    name: 'AI Scale',
    price: 'Custom',
    description: 'For businesses that want AI, custom software, and ongoing growth systems.',
    features: ['AI chatbot', 'CRM or ERP workflows', 'Marketing automation', 'Custom integrations', 'Priority support']
  }
];

export const blogFallback = [
  {
    title: 'How AI Chatbots Help Small Businesses Convert More Leads',
    slug: 'ai-chatbots-small-business-leads',
    category: 'AI Solutions',
    excerpt: 'A practical guide to using AI chatbots for faster replies, better qualification, and improved sales follow-up.',
    createdAt: new Date().toISOString()
  },
  {
    title: 'What Every Business Website Needs Before Running Ads',
    slug: 'business-website-before-ads',
    category: 'Website Development',
    excerpt: 'Before investing in traffic, make sure your website has the basics that turn visitors into enquiries.',
    createdAt: new Date().toISOString()
  }
];

export const jobFallback = [
  {
    title: 'Digital Marketing Intern',
    location: 'Remote / India',
    type: 'Internship',
    description: 'Work on SEO, campaign research, reporting, and content ideas for growth-focused clients.'
  },
  {
    title: 'MERN Stack Developer',
    location: 'Hybrid',
    type: 'Full-time',
    description: 'Build production websites, dashboards, APIs, and automation tools with React and Node.js.'
  }
];

export const howItWorksSteps = [
  { 
    title: 'Free Consultation & Business Discovery', 
    subtitle: 'We begin by understanding your business.',
    description: 'Every successful project starts with a conversation. We discuss your business goals, challenges, target audience, competitors, and digital requirements to identify the best solution for your needs.',
    items: ['Business requirement discussion', 'Goal identification', 'Industry analysis', 'Free expert consultation']
  },
  { 
    title: 'Strategy & Solution Planning', 
    subtitle: 'Creating a roadmap for success.',
    description: 'Our team analyzes your requirements and designs a customized strategy tailored to your business. We define the project scope, features, timeline, technology stack, and expected outcomes before development begins.',
    items: ['Project roadmap', 'Feature planning', 'Technology selection', 'Cost & timeline estimation']
  },
  { 
    title: 'Design & User Experience', 
    subtitle: 'Designing experiences your customers will love.',
    description: 'We create modern, responsive, and user-friendly interfaces that reflect your brand while ensuring a seamless experience across all devices.',
    items: ['UI/UX Design', 'Wireframes', 'Responsive layouts', 'Brand-focused visuals']
  },
  { 
    title: 'Development & AI Integration', 
    subtitle: 'Turning ideas into powerful digital solutions.',
    description: "Our developers build secure, scalable, and high-performance applications using modern technologies. Whether it's a website, mobile app, AI chatbot, automation system, or custom software, every solution is built with quality and future scalability in mind.",
    items: ['Business Websites', 'AI Chatbots', 'Business Automation', 'Custom Software', 'Mobile Apps', 'API Integrations']
  },
  { 
    title: 'Testing & Quality Assurance', 
    subtitle: 'Ensuring everything works perfectly.',
    description: 'Before launch, every project undergoes rigorous testing to ensure optimal performance, security, responsiveness, and reliability.',
    items: ['Performance', 'Security', 'Mobile responsiveness', 'Bug fixing', 'User experience']
  },
  { 
    title: 'Launch & Deployment', 
    subtitle: 'Your solution goes live.',
    description: 'Once approved, we deploy your project securely and configure everything for smooth operation, including domains, hosting, cloud deployment, SSL certificates, analytics, and integrations.',
    items: ['Website launch', 'Server setup', 'Domain configuration', 'Performance optimization']
  },
  { 
    title: 'Growth, Support & Optimization', 
    subtitle: 'Our partnership continues after launch.',
    description: "We don't just deliver projects—we help businesses grow. Our team provides ongoing maintenance, performance monitoring, updates, digital marketing support, AI enhancements, and technical assistance whenever you need it.",
    items: ['Website maintenance', 'AI improvements', 'Digital marketing', 'Performance optimization', 'Technical support']
  }
];

export const trustSignals = [
  { label: 'Secure architecture', icon: FaShieldAlt },
  { label: 'Cloud-ready deployment', icon: FaCloudUploadAlt },
  { label: 'WhatsApp-first lead flow', icon: FaWhatsapp },
  { label: 'Human support', icon: FaHeadset }
];

export const comprehensiveServices = [
  {
    title: 'Website & E-Commerce Solutions',
    description: 'We build fast, secure, and conversion-focused websites that act as your 24/7 sales engine.',
    icon: FaLaptopCode,
    items: [
      'Website Development', 'Corporate Websites', 'Dynamic Websites', 'Custom Web Applications',
      'WordPress Websites', 'Landing Pages', 'UI/UX Design', 'Website Maintenance',
      'Website Hosting', 'Business Email Setup', 'Multi-Location Websites', 'E-Commerce Development',
      'Conversion Rate Optimization (CRO)', 'A/B Testing', 'Funnel Optimization'
    ]
  },
  {
    title: 'Software & Mobile Application Development',
    description: 'Custom internal tools and mobile experiences that remove manual work and operational friction.',
    icon: FaMobileAlt,
    items: [
      'Custom Software Development', 'Enterprise Software Solutions', 'CRM Development', 'ERP Solutions',
      'Web Application Development', 'Android App Development', 'iOS App Development',
      'Cross-Platform Applications', 'API Integration', 'Software Maintenance'
    ]
  },
  {
    title: 'Digital Marketing & Brand Growth',
    description: 'Data-driven marketing strategies to increase your visibility, traffic, and organic growth.',
    icon: FaChartLine,
    items: [
      'SEO (Search Engine Optimization)', 'Local SEO', 'On-Page SEO', 'Off-Page SEO',
      'Multi-Location SEO', 'Social Media Marketing', 'Social Media Optimization',
      'Content Marketing', 'Influencer Marketing', 'Online Reputation Management', 'Lead Generation Campaigns'
    ]
  },
  {
    title: 'Paid Advertising & Performance Marketing',
    description: 'High-ROI paid campaigns that put your brand in front of customers ready to buy.',
    icon: FaBullhorn,
    items: [
      'Google Ads', 'Meta Ads', 'Facebook Ads', 'Instagram Ads', 'YouTube Ads',
      'Search Advertising', 'Shopping Ads', 'Display Advertising', 'Remarketing',
      'PPC Services', 'Conversion Tracking', 'Performance Analytics'
    ]
  },
  {
    title: 'Branding & Creative Design Solutions',
    description: 'Premium visual identities and marketing collateral that build trust and authority.',
    icon: FaCode,
    items: [
      'Logo Design', 'Graphic Design', 'Brochure Design', 'Banner Design',
      'Social Media Creatives', 'Business Card Design', 'Corporate Branding',
      'Brand Identity Development', 'Web Branding', 'Advertising Creatives'
    ]
  },
  {
    title: 'AI & Business Automation Solutions',
    description: 'Intelligent AI agents and workflows that automate support, qualification, and daily tasks.',
    icon: FaRobot,
    items: [
      'AI Chatbots', 'Customer Support Bots', 'Lead Qualification Bots', 'AI Automation',
      'Workflow Automation', 'WhatsApp Automation', 'Social Media Automation',
      'Email Automation', 'Appointment Scheduling Bots', 'Marketing Automation',
      'Chatbot Integration', 'AI-Powered Customer Engagement'
    ]
  },
  {
    title: 'Communication & Customer Engagement',
    description: 'Targeted messaging and lifecycle marketing that turns leads into loyal customers.',
    icon: FaComments,
    items: [
      'Email Marketing', 'Messenger Marketing', 'Bulk Email Campaigns',
      'Customer Lifecycle Marketing', 'Newsletter Campaigns', 'Marketing Automation Setup', 'Lead Nurturing'
    ]
  },
  {
    title: 'Cloud, DevOps & Infrastructure Services',
    description: 'Scalable, secure, and optimized cloud architectures for modern enterprise applications.',
    icon: FaCloudUploadAlt,
    items: [
      'Cloud Consulting', 'Cloud Migration', 'Server Deployment', 'Hosting Solutions',
      'DevOps Consulting', 'CI/CD Pipeline Setup', 'Infrastructure Management', 'Performance Optimization'
    ]
  },
  {
    title: 'Cybersecurity & Quality Assurance',
    description: 'Robust security measures and rigorous testing to protect your data and ensure flawless operation.',
    icon: FaShieldAlt,
    items: [
      'Cybersecurity Solutions', 'Website Security', 'Application Security', 'Security Audits',
      'Application Testing', 'Functional Testing', 'Performance Testing', 'Quality Assurance', 'Bug Fixing & Maintenance'
    ]
  },
  {
    title: 'Business Consulting & Emerging Technologies',
    description: 'Strategic guidance and cutting-edge tech integration to keep you ahead of the competition.',
    icon: MdAnalytics,
    items: [
      'Market Research', 'Competitor Analysis', 'Digital Transformation Consulting',
      'Business Strategy Consulting', 'Blockchain Solutions', 'Technology Consulting', 'Growth Strategy Planning'
    ]
  }
];






