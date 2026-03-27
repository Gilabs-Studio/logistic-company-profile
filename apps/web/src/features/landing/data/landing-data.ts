import type { LucideIcon } from "lucide-react";
import {
  Activity,
  CheckCircle2,
  Globe2,
  Plane,
  ShieldCheck,
  Ship,
  Truck,
  Warehouse,
} from "lucide-react";

export type LandingService = {
  icon: LucideIcon;
  title: string;
  description: string;
  span: string;
};

export type LandingValue = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
};

export type Certification = {
  id: string;
  title: string;
  description: string;
  icon: string | LucideIcon;
  pdfUrl?: string;
};

export type Industry = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image?: string;
};

export type SampleArc = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export const SERVICES: LandingService[] = [
  {
    icon: Plane,
    title: "Air Freight",
    description:
      "Move critical shipments with precision timing and priority handling across global networks",
    span: "md:col-span-2 lg:col-span-2",
  },
  {
    icon: Ship,
    title: "Sea Freight",
    description:
      "Scale operations seamlessly from consolidated cargo to full container loads on optimized routes",
    span: "md:col-span-1 lg:col-span-1",
  },
  {
    icon: Truck,
    title: "Land Transport",
    description:
      "Ensure the last mile performs optimally with integrated ground distribution systems",
    span: "md:col-span-1 lg:col-span-1",
  },
  {
    icon: Warehouse,
    title: "Warehousing",
    description:
      "Turn storage facilities into operational assets that accelerate your distribution workflow",
    span: "md:col-span-2 lg:col-span-1",
  },
  {
    icon: ShieldCheck,
    title: "Customs Compliance",
    description: "Navigate border complexity efficiently so your operations stay uninterrupted",
    span: "md:col-span-3 lg:col-span-1 bg-zinc-900 text-white invert-colors",
  },
];

export const VALUES: LandingValue[] = [
  {
    icon: Activity,
    title: "Complete Control",
    description: "Real-time visibility and structured execution across every distribution endpoint",
  },
  {
    icon: CheckCircle2,
    title: "Integrated Operations",
    description: "Connect into your existing workflows as a unified extension of your team",
  },
  {
    icon: Globe2,
    title: "Global Reach",
    description: "International logistics capability executed with localized precision",
  },
  {
    icon: ShieldCheck,
    title: "Risk Management",
    description: "Anticipate supply chain disruptions before they impact your business",
  },
];

export const SAMPLE_ARCS: SampleArc[] = [
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -22.9068,
    endLng: -43.1729,
    arcAlt: 0.1,
    color: "#06b6d4",
  },
  {
    order: 1,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.2,
    color: "#3b82f6",
  },
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -1.303396,
    endLng: 36.852443,
    arcAlt: 0.5,
    color: "#6366f1",
  },
  {
    order: 2,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.2,
    color: "#06b6d4",
  },
  {
    order: 2,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.3,
    color: "#3b82f6",
  },
  {
    order: 3,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: "#6366f1",
  },
  {
    order: 4,
    startLat: 11.986597,
    startLng: 8.571831,
    endLat: -15.595412,
    endLng: -56.05918,
    arcAlt: 0.5,
    color: "#06b6d4",
  },
  {
    order: 4,
    startLat: -34.6037,
    startLng: -58.3816,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.7,
    color: "#3b82f6",
  },
  {
    order: 4,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 48.8566,
    endLng: -2.3522,
    arcAlt: 0.1,
    color: "#6366f1",
  },
];
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "David Oktavianus",
    role: "Operations Manager",
    company: "TechGlobal Indonesia",
    content: "The crew is very friendly and highly responsive. Our logistics needs are always handled with priority.",
    rating: 5,
  },
  {
    id: "2",
    name: "Abaw Abaw",
    role: "Supply Chain Director",
    company: "Artha Niaga",
    content: "Trusted export-import service with friendly and patient service. Thank you for the smooth process.",
    rating: 5,
  },
  {
    id: "3",
    name: "Thomas Wijaya",
    role: "Owner",
    company: "Wijaya Electronics",
    content: "Fast response, safe goods, and friendly service. Highly recommended for business partners.",
    rating: 5,
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "iso-9001",
    title: "ISO 9001:2015",
    description: "Quality Management System ensuring efficient processes and reliable service delivery worldwide.",
    icon: ShieldCheck,
  },
  {
    id: "iso-45001",
    title: "ISO 45001:2018",
    description: "Safety Management System promoting a safe work environment across all transport hubs.",
    icon: ShieldCheck,
  },
  {
    id: "iso-14001",
    title: "ISO 14001:2015",
    description: "Environmental Management System supporting sustainable and eco-friendly logistics solutions.",
    icon: ShieldCheck,
  },
  {
    id: "halal",
    title: "Halal Certified",
    description: "Guarantees Halal-compliant handling and transport for food and pharmaceutical supply chains.",
    icon: ShieldCheck,
  },
];

export const INDUSTRIES: Industry[] = [
  {
    id: "machinery",
    title: "Machinery",
    description: "Efficient import and export logistics for industrial equipment and heavy machinery.",
    icon: Activity,
    image: "/industries/machinery.png",
  },
  {
    id: "automotive",
    title: "Automotive",
    description: "Seamless regional distribution for dynamic manufacturing and EV sectors.",
    icon: Activity,
    image: "/industries/automotive.png",
  },
  {
    id: "chemicals",
    title: "Chemicals",
    description: "Specialized expertise in navigating complex DG handling and dangerous goods logistics.",
    icon: Activity,
    image: "/industries/chemicals.png",
  },
  {
    id: "healthcare",
    title: "Life Sciences",
    description: "GDP-compliant warehousing and temperature-controlled logistics for pharmaceutical integrity.",
    icon: Activity,
    image: "/industries/healthcare.png",
  },
];
