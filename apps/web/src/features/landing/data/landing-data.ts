import type { LucideIcon } from "lucide-react";
import {
  Activity,
  CheckCircle2,
  Globe2,
  Plane,
  ShieldCheck,
  Ship,
  Truck,
} from "lucide-react";

export type LandingService = {
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
  image?: string;
};

export type LandingValue = {
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
};

export type Testimonial = {
  id: string;
  nameKey: string;
  roleKey: string;
  companyKey: string;
  contentKey: string;
  rating: number;
  avatar?: string;
};

export type Certification = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: string | LucideIcon;
  pdfUrl?: string;
};

export type Industry = {
  id: string;
  titleKey: string;
  descriptionKey: string;
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
    titleKey: "services.items.airFreight.title",
    descriptionKey: "services.items.airFreight.description",
    image: "/services/air.png",
  },
  {
    icon: Ship,
    titleKey: "services.items.seaTransport.title",
    descriptionKey: "services.items.seaTransport.description",
    image: "/services/sea.png",
  },
  {
    icon: Truck,
    titleKey: "services.items.roadTransport.title",
    descriptionKey: "services.items.roadTransport.description",
    image: "/services/road.png",
  },
  {
    icon: Activity,
    titleKey: "services.items.projectLogistics.title",
    descriptionKey: "services.items.projectLogistics.description",
    image: "/services/project.png",
  },
  {
    icon: Activity,
    titleKey: "services.items.commodityLogistics.title",
    descriptionKey: "services.items.commodityLogistics.description",
    image: "/services/commodity.png",
  },
  {
    icon: Activity,
    titleKey: "services.items.fourPL.title",
    descriptionKey: "services.items.fourPL.description",
    image: "/services/4pl.png",
  },
  {
    icon: ShieldCheck,
    titleKey: "services.items.customs.title",
    descriptionKey: "services.items.customs.description",
    image: "/services/customs.png",
  },
];

export const VALUES: LandingValue[] = [
  {
    icon: Activity,
    titleKey: "systemThinking.values.completeControl.title",
    descriptionKey: "systemThinking.values.completeControl.description",
  },
  {
    icon: CheckCircle2,
    titleKey: "systemThinking.values.integratedOperations.title",
    descriptionKey: "systemThinking.values.integratedOperations.description",
  },
  {
    icon: Globe2,
    titleKey: "systemThinking.values.globalReach.title",
    descriptionKey: "systemThinking.values.globalReach.description",
  },
  {
    icon: ShieldCheck,
    titleKey: "systemThinking.values.riskManagement.title",
    descriptionKey: "systemThinking.values.riskManagement.description",
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
    nameKey: "testimonials.items.one.name",
    roleKey: "testimonials.items.one.role",
    companyKey: "testimonials.items.one.company",
    contentKey: "testimonials.items.one.content",
    rating: 5,
  },
  {
    id: "2",
    nameKey: "testimonials.items.two.name",
    roleKey: "testimonials.items.two.role",
    companyKey: "testimonials.items.two.company",
    contentKey: "testimonials.items.two.content",
    rating: 5,
  },
  {
    id: "3",
    nameKey: "testimonials.items.three.name",
    roleKey: "testimonials.items.three.role",
    companyKey: "testimonials.items.three.company",
    contentKey: "testimonials.items.three.content",
    rating: 5,
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "iso-9001",
    titleKey: "certifications.iso9001.title",
    descriptionKey: "certifications.iso9001.description",
    icon: ShieldCheck,
  },
  {
    id: "iso-45001",
    titleKey: "certifications.iso45001.title",
    descriptionKey: "certifications.iso45001.description",
    icon: ShieldCheck,
  },
  {
    id: "iso-14001",
    titleKey: "certifications.iso14001.title",
    descriptionKey: "certifications.iso14001.description",
    icon: ShieldCheck,
  },
  {
    id: "halal",
    titleKey: "certifications.halal.title",
    descriptionKey: "certifications.halal.description",
    icon: ShieldCheck,
  },
];

export const INDUSTRIES: Industry[] = [
  {
    id: "machinery",
    titleKey: "industryExpertise.items.machinery.title",
    descriptionKey: "industryExpertise.items.machinery.description",
    icon: Activity,
    image: "/industries/machinery.png",
  },
  {
    id: "automotive",
    titleKey: "industryExpertise.items.automotive.title",
    descriptionKey: "industryExpertise.items.automotive.description",
    icon: Activity,
    image: "/industries/automotive.png",
  },
  {
    id: "chemicals",
    titleKey: "industryExpertise.items.chemicals.title",
    descriptionKey: "industryExpertise.items.chemicals.description",
    icon: Activity,
    image: "/industries/chemicals.png",
  },
  {
    id: "healthcare",
    titleKey: "industryExpertise.items.healthcare.title",
    descriptionKey: "industryExpertise.items.healthcare.description",
    icon: Activity,
    image: "/industries/healthcare.png",
  },
];
