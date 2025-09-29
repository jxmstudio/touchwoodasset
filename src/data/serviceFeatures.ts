export interface ServiceFeature {
  id: string
  feature: string
  touchwood: boolean
  genericAgency: boolean
}

export const serviceFeatures: ServiceFeature[] = [
  {
    id: '1',
    feature: '$500 VISA Card or cashback, $100 for ancillaries assets (t&c applies)',
    touchwood: true,
    genericAgency: false
  },
  {
    id: '2',
    feature: 'Enjoy complimentary insurance coverage (up to $2,000) for property management negligence',
    touchwood: true,
    genericAgency: false
  },
  {
    id: '3',
    feature: 'Personalise WhatsApp or WeChat group for a Faster Response',
    touchwood: true,
    genericAgency: false
  },
  {
    id: '4',
    feature: 'Proactive Leasing Strategy',
    touchwood: true,
    genericAgency: true
  },
  {
    id: '5',
    feature: 'Strategic Rental Pricing & Marketing Insight',
    touchwood: true,
    genericAgency: true
  },
  {
    id: '6',
    feature: 'Quality Photos & Virtual Staging',
    touchwood: true,
    genericAgency: false
  },
  {
    id: '7',
    feature: 'Videography',
    touchwood: true,
    genericAgency: false
  },
  {
    id: '8',
    feature: 'Engaging Property Copywriting',
    touchwood: true,
    genericAgency: false
  },
  {
    id: '9',
    feature: 'Listing on REA & Domain',
    touchwood: true,
    genericAgency: true
  },
  {
    id: '10',
    feature: 'Rapid Tenant Onboarding Process (24-hr application turnaround)',
    touchwood: true,
    genericAgency: false
  },
  {
    id: '11',
    feature: 'Detailed Entry/Exit Reporting',
    touchwood: true,
    genericAgency: true
  },
  {
    id: '12',
    feature: 'Routine Inspection invites to Owners',
    touchwood: true,
    genericAgency: false
  },
  {
    id: '13',
    feature: 'End-to-End Property Management',
    touchwood: true,
    genericAgency: true
  },
  {
    id: '14',
    feature: 'Transparent Communication to our Owners',
    touchwood: true,
    genericAgency: false
  },
  {
    id: '15',
    feature: 'Hands on approach to Maintenance',
    touchwood: true,
    genericAgency: false
  },
  {
    id: '16',
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
