import { PrismaClient, ListingType, ListingStatus, UserRole, EnquiryType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@touchwood.com.au' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@touchwood.com.au',
      role: UserRole.ADMIN,
    },
  })

  console.log('✅ Admin user created:', adminUser.email)

  // Create sample listings
  const listings = [
    {
      slug: 'luxury-apartment-sydney-harbour',
      title: 'Luxury Apartment with Sydney Harbour Views',
      summary: 'Stunning 3-bedroom apartment with panoramic harbour views and premium finishes',
      description: 'This exceptional apartment offers the perfect blend of luxury and location. Featuring 3 spacious bedrooms, 2 designer bathrooms, and an open-plan living area that opens to a private balcony with breathtaking Sydney Harbour views. The gourmet kitchen includes stone benchtops, premium appliances, and a breakfast bar. Master bedroom features a walk-in wardrobe and ensuite. Building amenities include a swimming pool, gym, and secure parking.',
      type: ListingType.RESIDENTIAL,
      status: ListingStatus.AVAILABLE,
      price: 2500000,
      address: '123 Harbour Drive',
      suburb: 'Sydney',
      state: 'NSW',
      postcode: '2000',
      latitude: -33.8688,
      longitude: 151.2093,
      bedrooms: 3,
      bathrooms: 2,
      carSpaces: 2,
      floorAreaSqm: 180,
      features: JSON.stringify(['Harbour Views', 'Balcony', 'Pool', 'Gym', 'Secure Parking', 'Air Conditioning']),
      heroImageUrl: '/images/placeholder-1.jpg',
      gallery: JSON.stringify(['/images/placeholder-1.jpg', '/images/placeholder-2.jpg']),
      published: true,
      seoTitle: 'Luxury Sydney Harbour Apartment for Sale | Touchwood',
      seoDescription: 'Stunning 3-bedroom apartment with panoramic Sydney Harbour views. Premium finishes, pool, gym, secure parking. Contact Touchwood Asset Management.',
    },
    {
      slug: 'modern-office-space-cbd',
      title: 'Modern Office Space in Sydney CBD',
      summary: 'Premium office space in the heart of Sydney CBD with modern amenities',
      description: 'Located in the prestigious Sydney CBD, this modern office space offers businesses a prestigious address with contemporary design and functionality. The space features open-plan layouts, modern meeting rooms, breakout areas, and state-of-the-art technology infrastructure. Building amenities include 24/7 access, security, cleaning services, and proximity to public transport.',
      type: ListingType.COMMERCIAL,
      status: ListingStatus.AVAILABLE,
      price: 85000,
      address: '456 Business Street',
      suburb: 'Sydney',
      state: 'NSW',
      postcode: '2000',
      latitude: -33.8688,
      longitude: 151.2093,
      floorAreaSqm: 200,
      features: JSON.stringify(['Open Plan', 'Meeting Rooms', 'Breakout Areas', '24/7 Access', 'Security', 'Cleaning']),
      heroImageUrl: '/images/placeholder-2.jpg',
      gallery: JSON.stringify(['/images/placeholder-2.jpg', '/images/placeholder-3.jpg']),
      published: true,
      seoTitle: 'Modern CBD Office Space for Lease | Touchwood',
      seoDescription: 'Premium office space in Sydney CBD with modern amenities, meeting rooms, and 24/7 access. Contact Touchwood Asset Management.',
    },
    {
      slug: 'secure-storage-units-parramatta',
      title: 'Secure Storage Units in Parramatta',
      summary: 'Convenient and secure storage solutions in the heart of Parramatta',
      description: 'Our secure storage facility in Parramatta offers a range of storage unit sizes to meet all your storage needs. Features include 24/7 access, climate control options, security monitoring, and flexible rental terms. Perfect for personal storage, business inventory, or during renovations.',
      type: ListingType.ANCILLARY,
      status: ListingStatus.AVAILABLE,
      price: 150,
      address: '789 Storage Lane',
      suburb: 'Parramatta',
      state: 'NSW',
      postcode: '2150',
      latitude: -33.8150,
      longitude: 151.0010,
      floorAreaSqm: 25,
      features: JSON.stringify(['24/7 Access', 'Climate Control', 'Security Monitoring', 'Flexible Terms', 'Clean Facility']),
      heroImageUrl: '/images/placeholder-3.jpg',
      gallery: JSON.stringify(['/images/placeholder-3.jpg', '/images/placeholder-1.jpg']),
      published: true,
      seoTitle: 'Secure Storage Units Parramatta | Touchwood',
      seoDescription: 'Secure storage units in Parramatta with 24/7 access, climate control, and flexible terms. Contact Touchwood Asset Management.',
    },
    {
      slug: 'family-home-northern-beaches',
      title: 'Family Home in Northern Beaches',
      summary: 'Spacious 4-bedroom family home in sought-after Northern Beaches location',
      description: 'This beautiful family home offers the perfect lifestyle in the Northern Beaches. Featuring 4 generous bedrooms, 3 bathrooms, and multiple living areas. The open-plan kitchen and dining area opens to a large covered outdoor entertaining area with a sparkling pool. Located close to beaches, schools, and transport.',
      type: ListingType.RESIDENTIAL,
      status: ListingStatus.UNDER_OFFER,
      price: 3200000,
      address: '321 Beach Road',
      suburb: 'Manly',
      state: 'NSW',
      postcode: '2095',
      latitude: -33.7969,
      longitude: 151.2854,
      bedrooms: 4,
      bathrooms: 3,
      carSpaces: 3,
      floorAreaSqm: 280,
      features: JSON.stringify(['Pool', 'Outdoor Entertaining', 'Multiple Living Areas', 'Close to Beach', 'Schools Nearby']),
      heroImageUrl: '/images/placeholder-4.jpg',
      gallery: JSON.stringify(['/images/placeholder-4.jpg', '/images/placeholder-5.jpg']),
      published: true,
      seoTitle: 'Family Home Northern Beaches | Touchwood',
      seoDescription: 'Spacious 4-bedroom family home in Manly with pool, outdoor entertaining, and close to beaches. Contact Touchwood Asset Management.',
    },
    {
      slug: 'retail-space-chatswood',
      title: 'Prime Retail Space in Chatswood',
      summary: 'High-traffic retail space in the bustling Chatswood shopping district',
      description: 'Located in the heart of Chatswood, this prime retail space offers excellent foot traffic and visibility. The space features a modern design with high ceilings, large display windows, and flexible layout options. Perfect for retail, food service, or professional services. Includes utilities and basic fit-out.',
      type: ListingType.COMMERCIAL,
      status: ListingStatus.LEASED,
      price: 65000,
      address: '654 Shopping Centre Drive',
      suburb: 'Chatswood',
      state: 'NSW',
      postcode: '2067',
      latitude: -33.7969,
      longitude: 151.1804,
      floorAreaSqm: 150,
      features: JSON.stringify(['High Foot Traffic', 'Large Windows', 'High Ceilings', 'Flexible Layout', 'Utilities Included']),
      heroImageUrl: '/images/placeholder-5.jpg',
      gallery: JSON.stringify(['/images/placeholder-5.jpg', '/images/placeholder-6.jpg']),
      published: true,
      seoTitle: 'Retail Space Chatswood | Touchwood',
      seoDescription: 'Prime retail space in Chatswood shopping district with high foot traffic and modern design. Contact Touchwood Asset Management.',
    },
    {
      slug: 'car-park-spaces-cbd',
      title: 'CBD Car Park Spaces',
      summary: 'Convenient car parking spaces in Sydney CBD for daily or monthly rental',
      description: 'Secure car parking spaces available in the heart of Sydney CBD. Options include daily, weekly, and monthly rentals. 24/7 access with security monitoring. Perfect for commuters, visitors, or business parking needs.',
      type: ListingType.ANCILLARY,
      status: ListingStatus.SOLD,
      price: 80,
      address: '987 Parking Street',
      suburb: 'Sydney',
      state: 'NSW',
      postcode: '2000',
      latitude: -33.8688,
      longitude: 151.2093,
      features: JSON.stringify(['24/7 Access', 'Security Monitoring', 'Flexible Terms', 'CBD Location']),
      heroImageUrl: '/images/placeholder-6.jpg',
      gallery: JSON.stringify(['/images/placeholder-6.jpg', '/images/placeholder-1.jpg']),
      published: true,
      seoTitle: 'CBD Car Park Spaces | Touchwood',
      seoDescription: 'Secure car parking spaces in Sydney CBD with 24/7 access and flexible rental terms. Contact Touchwood Asset Management.',
    },
  ]

  for (const listingData of listings) {
    const listing = await prisma.listing.upsert({
      where: { slug: listingData.slug },
      update: {},
      create: listingData,
    })
    console.log(`✅ Listing created: ${listing.title}`)
  }

  // Create sample enquiries
  const enquiries = [
    {
      type: EnquiryType.GENERAL,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+61 400 123 456',
      message: 'I\'m interested in learning more about your property management services. Could you please send me some information about your fees and what\'s included?',
    },
    {
      type: EnquiryType.VALUATION,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+61 400 234 567',
      message: 'I\'m looking to get a valuation on my investment property in Bondi. It\'s a 2-bedroom apartment that I\'m considering selling. Could you arrange for someone to come out and assess it?',
    },
    {
      type: EnquiryType.INSPECTION,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+61 400 345 678',
      message: 'I\'d like to book an inspection for the luxury apartment in Sydney Harbour. I\'m available this weekend or next week. Please let me know what times are available.',
      preferredDate: new Date('2024-02-15T10:00:00Z'),
    },
  ]

  for (const enquiryData of enquiries) {
    const enquiry = await prisma.enquiry.create({
      data: enquiryData,
    })
    console.log(`✅ Enquiry created: ${enquiry.name} - ${enquiry.type}`)
  }

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
