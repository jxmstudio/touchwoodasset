export interface ServiceFeature {
  id: string
  feature: string
  touchwood: boolean
  genericAgency: boolean
}

export const serviceFeatures: ServiceFeature[] = [
  {
    id: '1',
    feature: '1,388 RM transferred to your nominated bank account (t&c applies)',
    touchwood: true,
    genericAgency: false
  },
  {
    id: '2',
    feature: 'Personalise WhatsApp or WeChat group for a Faster Response',
    touchwood: true,
    genericAgency: false
  },
  {
    id: '3',
    feature: 'Proactive Leasing Strategy',
    touchwood: true,
    genericAgency: true
  },
  {
    id: '4',
    feature: 'Strategic Rental Pricing & Marketing Insight',
    touchwood: true,
    genericAgency: true
  },
  {
    id: '5',
    feature: 'Quality Photos & Virtual Staging',
    touchwood: true,
    genericAgency: false
  },
  {
    id: '6',
    feature: 'Videography',
    touchwood: true,
    genericAgency: false
  },
  {
    id: '7',
    feature: 'Engaging Property Copywriting',
    touchwood: true,
    genericAgency: false
  },
  {
    id: '8',
    feature: 'Listing on REA & Domain',
    touchwood: true,
    genericAgency: true
  },
  {
    id: '9',
    feature: 'Rapid Tenant Onboarding Process (24-hr application turnaround)',
    touchwood: true,
    genericAgency: false
  },
  {
    id: '10',
    feature: 'Detailed Entry/Exit Reporting',
    touchwood: true,
    genericAgency: true
  },
  {
    id: '11',
    feature: 'Routine Inspection invites to Owners',
    touchwood: true,
    genericAgency: false
  },
  {
    id: '12',
    feature: 'End-to-End Property Management',
    touchwood: true,
    genericAgency: true
  },
  {
    id: '13',
    feature: 'Transparent Communication to our Owners',
    touchwood: true,
    genericAgency: false
  },
  {
    id: '14',
    feature: 'Hands on approach to Maintenance',
    touchwood: true,
    genericAgency: false
  },
  {
    id: '15',
    feature: 'Legacy-Focused Property Stewardship',
    touchwood: true,
    genericAgency: false
  }
]

export const getFeatureStats = () => {
  const totalFeatures = serviceFeatures.length
  const touchwoodFeatures = serviceFeatures.filter(f => f.touchwood).length
  const genericAgencyFeatures = serviceFeatures.filter(f => f.genericAgency).length
  const touchwoodExclusive = serviceFeatures.filter(f => f.touchwood && !f.genericAgency).length
  
  return {
    totalFeatures,
    touchwoodFeatures,
    genericAgencyFeatures,
    touchwoodExclusive,
    touchwoodPercentage: Math.round((touchwoodFeatures / totalFeatures) * 100),
    genericAgencyPercentage: Math.round((genericAgencyFeatures / totalFeatures) * 100)
  }
}
