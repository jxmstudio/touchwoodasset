import type { ComparisonImage } from '@/components/marketing/BeforeAfterSlider'

export interface StagingPair {
  id: string
  room: string
  before: ComparisonImage
  after: ComparisonImage
}

export interface StagingCaseStudy {
  id: string
  address: string
  suburb: string
  propertyType: string
  /** One-line context shown under the section heading. */
  context: string
  pairs: StagingPair[]
}

// Before/after marketing photos for the virtual-staging showcase.
//
// "Before" = the photos the previous agency advertised the property with.
// "After" = the same frames virtually staged by Touchwood for the new
// campaign (Sept 2026). Every staged image carries an "Unfurnished" tag
// baked into the file, so the furniture is never mistaken for an inclusion.
//
// Source: photos supplied by Eamon Chau (Touchwood) on 14 Sep 2026.
export const stagingShowcase: StagingCaseStudy = {
  id: '17-third-ave-dandenong-north',
  address: '17 Third Avenue, Dandenong North',
  suburb: 'Dandenong North',
  propertyType: 'Three-bedroom house',
  context:
    'A three-bedroom house in Dandenong North that came across to Touchwood in September 2026. Left: how the previous agency advertised it. Right: the same rooms, virtually staged for the new campaign.',
  pairs: [
    {
      id: 'kitchen',
      room: 'Kitchen & meals area',
      before: {
        src: '/showcase/17-third-ave-dandenong-north/kitchen-before.jpg',
        alt: 'Kitchen and meals area at 17 Third Avenue, Dandenong North, as photographed by the previous agency: empty room, flat lighting',
      },
      after: {
        src: '/showcase/17-third-ave-dandenong-north/kitchen-after.jpg',
        alt: 'The same kitchen and meals area virtually staged by Touchwood with a dining setting, bar stools, sofa and plants, tagged Unfurnished',
      },
    },
    {
      id: 'bedroom',
      room: 'Main bedroom',
      before: {
        src: '/showcase/17-third-ave-dandenong-north/bedroom-before.jpg',
        alt: 'Main bedroom at 17 Third Avenue, Dandenong North, as photographed by the previous agency: empty carpeted room with blinds half drawn',
      },
      after: {
        src: '/showcase/17-third-ave-dandenong-north/bedroom-after.jpg',
        alt: 'The same bedroom virtually staged by Touchwood with a queen bed, bedside table, dresser and garden outlook, tagged Unfurnished',
      },
    },
  ],
}
