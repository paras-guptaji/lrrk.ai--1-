export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  conversionRate: string;
  speedRating: string;
  imageAccent: string;
  description: string;
  previewUrl?: string;
  imageUrl?: string;
  tags: string[];
}

export interface MetricCard {
  label: string;
  value: string;
  change: string;
  suffix?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
}

export interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  metricLabel: string;
  iconName: string;
}
