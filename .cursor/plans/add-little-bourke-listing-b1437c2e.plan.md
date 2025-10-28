<!-- b1437c2e-45c5-4e83-85a1-12b8aa396f4e a9581678-6f73-4a41-91d3-4ff5a0deb1d4 -->

# The Archive Storage Facility Implementation

## Quick Fixes

### 1. Fix Storage Image Size on Home Page

**File**: `src/components/marketing/HeroSplit.tsx`

- Investigate the Storage card image sizing issue (currently uses `imageFit="contain"`)
- Adjust container height or image styling to ensure the storage image displays at proper size
- May need to update the image itself (`/F5.jpg`) or adjust the card dimensions

### 2. Update About Page Statistics

**File**: `src/app/about/page.tsx` (line 289)

- Change "100+" to "220+" for "Assets Under Management" statistic
- Keeps it synced with the home page which already shows 220+

## Major Feature: The Archive Storage Facility Page

### 3. Create Data Structure for Storage Units

**New File**: `src/data/storage-units.ts`

- Create TypeScript interface `StorageUnit` with fields:
- id, unitNumber, size (2-10+ sqm), price, status (AVAILABLE/LEASED)
- images array, videoUrl, features, description, floor
- Start with placeholder entries (client will provide 70+ units with photos/videos tomorrow)
- Include size categories: 2sqm, 3sqm, 4sqm, 5sqm, 6sqm, 7sqm, 8sqm, 9sqm, 10sqm, 10sqm+
- All units belong to "The Archive" facility at 601 Little Collins St

### 4. Create Archive Page

**New File**: `src/app/the-archive/page.tsx`

- Hero section: Building image with title "Storage Facility - 601 Lt. Collins St, MELBOURNE"
- Video section: Placeholder for complex video (to be added by client)
- Description section with provided copy about 24/7 secure storage, goods-lift access, Southern Cross Station proximity
- Search/filter bar component
- Grid of available storage units
- Use similar layout to `/listings` page for consistency

### 5. Create Archive Filter Component

**New File**: `src/components/listings/ArchiveFilters.tsx`

- Storage Size dropdown: 2sqm, 3sqm, 4sqm, 5sqm, 6sqm, 7sqm, 8sqm, 9sqm, 10sqm, 10sqm+
- Lease Duration dropdown: Short-Term (1-3 months), Medium (3-12 months), Long-Term (12+ months)
- Price Range slider: adjustable min/max monthly rent
- Availability Date picker: date when user wants to start lease
- Apply/Clear filters functionality
- Filters only show units from The Archive facility

### 6. Create Archive Grid Component

**New File**: `src/components/listings/ArchiveGrid.tsx`

- Display storage units in responsive grid (similar to `ListingsGrid`)
- Each card shows: unit photo, unit number, size, price, status badge
- Click to view detailed unit page
- Support for filtering based on `ArchiveFilters` state
- Random order unless filtered

### 7. Update Navigation

**File**: `src/components/navigation.tsx`

- Add "The Archive" link to navigation array between "Listings" and "Articles"
- Position: After { name: 'Listings', href: '/listings', icon: Search }
- Before { name: 'Articles', href: '/blog', icon: FileText }
- Use Archive or Package icon from lucide-react
- Should appear in both desktop and mobile navigation

### 8. Update Home Page Storage Link

**File**: `src/components/marketing/HeroSplit.tsx` (line 42)

- Change Storage card `ctaLink` from `/listings?category=storage-cage` to `/the-archive`
- Update `ctaText` to "View The Archive" for clarity

### 9. Create Individual Storage Unit Page (Optional for now)

**New File**: `src/app/the-archive/[unitId]/page.tsx`

- Similar to listing detail pages
- Shows unit photos, video, features, floor plan, booking form
- Can be built after client provides unit-specific content

## Implementation Notes

- Use existing UI components (Card, Button, Badge, etc.) for consistency
- Follow same styling patterns as `/listings` page
- All content placeholders should be clearly marked for client to update
- Filters operate independently - only show Archive units
- Mobile-responsive design throughout
- Keep brand colors and typography consistent

### To-dos

- [ ] Update 150 Albert Rd and 63 Stead St pricing, remove incorrect listings
- [ ] Update contact information to +61 413 889 388 and admin@touchwoodasset.com across all pages
- [ ] Update statistics on home, sellers, and landlords pages with correct numbers
- [ ] Add For Landlords and For Sellers links to desktop navigation
- [ ] Remove mock listings and template data from sellers/landlords pages
- [ ] Remove apartment photos from 150 Albert Rd listing gallery
