export type BenefitIcon = 'trending-up' | 'zap' | 'shield' | 'palette' | 'clock';

export interface Benefit {
  text: string;
  icon: BenefitIcon;
}

export const benefits = [
  { text: 'Increased property value', icon: 'trending-up' },
  { text: 'Enhanced energy efficiency', icon: 'zap' },
  { text: 'Improved safety features', icon: 'shield' },
  { text: 'Customizable design options', icon: 'palette' },
  { text: 'Streamlined project timelines', icon: 'clock' }
] as const;

export const processSteps = [
  'Conduct a detailed consultation for personalized recommendations',
  'Create a transparent estimate outlining scope and cost',
  'Select materials based on durability and style preferences',
  'Execute projects with precision-focused craftsmanship',
  'Perform final walkthroughs ensuring every detail is addressed'
] as const;
