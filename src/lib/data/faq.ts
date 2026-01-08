import type { FAQ } from '$types';
import { SERVICE_AREAS, BUSINESS_INFO } from '$utils/constants';

const formatServiceAreaAnswer = (areas: readonly string[]): string => {
  const areaList = areas.join(', ');
  return `We provide comprehensive services throughout our established service area, including ${areaList}. We serve clients within a ${BUSINESS_INFO.serviceRadius} radius of ${BUSINESS_INFO.city}, ${BUSINESS_INFO.state}.`;
};

export const faq: FAQ[] = [
  {
    id: '1',
    question: 'What is your service coverage area and how far do you typically travel for a job?',
    answer: formatServiceAreaAnswer(SERVICE_AREAS),
    category: 'Service Areas'
  },
  {
    id: '2',
    question: 'What types of properties do you typically service with your remodeling and repair solutions?',
    answer: 'We specialize in working with both residential and commercial properties. Our experience spans interior and exterior remodeling, siding upgrades, roofing improvements, and structural carpentry. Whether it\'s a home renovation or a business space update, we apply consistent methodologies to ensure the integrity of each structure while meeting aesthetic goals.',
    category: 'Services'
  },
  {
    id: '3',
    question: 'How can I request an estimate for your services and what should I expect during the process?',
    answer: 'Requesting an estimate is simple—just contact us directly to schedule a consultation. As an affordable general contractor, we offer free estimates tailored to your needs. Our team conducts thorough site evaluations, discusses project goals, and outlines clear timelines and costs to set proper expectations from the start.',
    category: 'Estimates'
  },
  {
    id: '4',
    question: 'What should homeowners consider when planning a siding replacement or upgrade?',
    answer: 'When planning a siding replacement, focus on energy-efficient materials that reduce heat loss and stand up well to weather. Consider insulation performance, durability, and maintenance needs. Think about your local climate and proper ventilation to ensure long-lasting results.',
    category: 'Siding'
  },
  {
    id: '5',
    question: 'How do I know if my roof needs shingle repairs or a full replacement?',
    answer: 'When signs like curling shingles, granule loss, or water intrusion appear, professional inspection is crucial. In our practice, we assess roof age, underlayment condition, and surface damage to determine whether targeted shingle repair suffices or if full replacement aligns better with structural longevity standards.',
    category: 'Roofing'
  },
  {
    id: '6',
    question: 'What should I expect during a typical carpentry project in my home or business?',
    answer: `Using our advanced carpentry methods developed through ${BUSINESS_INFO.yearsOfExperience} years of team expertise, we implement precision framing and finish work tailored to each space. Our team coordinates design alignment, material selection, and phased execution while maintaining minimal disruption to your daily routine.`,
    category: 'Carpentry'
  },
  {
    id: '7',
    question: 'How long does a framing job usually take for residential vs. commercial spaces?',
    answer: 'Project duration depends on scope complexity, structural layout, access logistics, and material availability. Residential framing typically takes 1-2 weeks, while commercial projects may range from 2-6 weeks depending on scope. We ensure each framing phase progresses according to professional timing benchmarks without sacrificing quality control.',
    category: 'Framing'
  },
  {
    id: '8',
    question: 'What is involved in an interior remodeling project from start to finish?',
    answer: 'A full interior remodeling project includes concept planning, demolition (if needed), infrastructure updates (excluding electrical/plumbing), framing adjustments, drywall installation, flooring application, painting finishes, and final walkthroughs. Our approach ensures each stage follows sequential industry-standard processes for safety compliance and visual consistency.',
    category: 'Remodeling'
  },
  {
    id: '9',
    question: 'What steps should be taken during an emergency repair to ensure safety and minimize damage?',
    answer: 'When emergencies occur—such as storm damage or structural compromise—our mobile response team prioritizes securing affected zones using temporary barriers or reinforcements before repair begins. We specialize in executing immediate stabilization strategies that reduce property loss while preparing for full restoration under controlled conditions.',
    category: 'Emergency'
  },
  {
    id: '10',
    question: 'How can I prepare my space for a professional flooring installation?',
    answer: 'Understanding subfloor readiness is key before installing new flooring materials. We recommend clearing all movable items from the area and ensuring humidity levels meet manufacturer specifications. Our team performs surface inspections beforehand to verify flatness tolerance so adhesive bonds form correctly during installation for lasting results.',
    category: 'Flooring'
  }
];
