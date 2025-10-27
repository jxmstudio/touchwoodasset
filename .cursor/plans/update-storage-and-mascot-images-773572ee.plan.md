<!-- 773572ee-bbee-43dc-88f6-873e8e60cf5f b7a13ac7-00ba-4778-91c3-9a0d515f41cc -->

# Add Milano Apartment Property Listing

## Overview

Create a new property listing for a fully renovated 2-bedroom apartment at The Milano Apartments with impressive 7.7% gross yield, including YouTube video and professional photo gallery.

## Property Details

**Address:** 1508/8 Franklin Street, Melbourne VIC
**Property Type:** Residential - Apartment
**Status:** FOR_RENT (investment property)
**Bedrooms:** 2
**Bathrooms:** 2
**Yield:** 7.7% gross per annum
**Phone Code:** 14110

**Key Features:**

- Brand new engineered floorboards
- Freshly painted interiors
- New reverse cycle heating/cooling
- Stylish new Holland blinds
- Double-glazed sliding door
- North-facing balcony
- Stone finishes in kitchen and bathrooms
- Dual ensuite access for both bedrooms
- 2.7m ceilings with floor-to-ceiling glazing
- 15th floor with city views
- Premium resident facilities (25m pool, spa, sauna, gym, tennis court, BBQ, cinema)
- 24-hour building attendant
- Steps from Melbourne Central, QV, Emporium
- Walk to Melbourne University and RMIT

**YouTube Video:** https://youtu.be/0_Bvl6n_HDY

## Photo Gallery (from `/public/15088/`)

Order to match domain.com.au listing style:

1. **Hero Image:** `Living room.jpg` (main living area)
2. `Kitchen.jpg`
3. `Bedroom 1.jpg`
4. `Bedroom 2.jpg`
5. `franklin_1508a_8_melbourne_bedroom_HR.jpg`
6. `Bathroom.jpg`
7. `balcony view.jpg`
8. `Main building (waterpainting).jpg`
9. `Floorplan (1508.8).jpg`
10. `Pool & Sauna.jpg`
11. `Gym.jpg`
12. `Tennis Court.jpg`
13. `Cinema.jpg`

## Implementation Steps

### 1. Add Listing to Data File

**File:** `src/data/listings.ts`

Create new listing object:

- **id:** '15088' or next available
- **slug:** 'milano-apartment-1508-8-franklin-melbourne'
- **title:** 'Fully Renovated & Turn-Key Apartment | Impressive Gross Yield of 7.7% pa'
- **summary:** 'High-performing investment in The Milano Apartments - 7.7% gross yield with strong rental returns'
- **type:** 'RESIDENTIAL'
- **status:** 'FOR_RENT'
- **address:** '1508/8 Franklin Street'
- **suburb:** 'Melbourne'
- **state:** 'VIC'
- **postcode:** '3000'
- **bedrooms:** 2
- **bathrooms:** 2
- **heroImageUrl:** '/15088/Living room.jpg'
- **videoUrl:** 'https://www.youtube.com/watch?v=0_Bvl6n_HDY'
- **description:** Full property description provided
- **features:** Array of key features
- **gallery:** Array of all photos with proper paths
- **agent:** Eamon Chau contact details
- **category:** 'properties'

### 2. Verify Photo Assets

Confirm all 13 photos exist in `/public/15088/` directory

### 3. Test Listing Page

- Navigate to `/listings/milano-apartment-1508-8-franklin-melbourne`
- Verify YouTube video embed displays correctly
- Verify all photos load in gallery
- Check responsive design on mobile/tablet
- Test photo carousel/gallery navigation

## Files to Modify

1. `src/data/listings.ts` - Add new listing entry

## Reference Link

Domain.com.au listing: https://www.realestate.com.au/sold/property-apartment-vic-melbourne-148604120

## Notes

- Follow domain.com.au photo arrangement style
- Emphasize investment features (7.7% yield, low vacancy, capital growth)
- Highlight location benefits (uni proximity, transport, facilities)
- YouTube video should be prominently displayed
- Property code 14110 for inquiries

### To-dos

- [ ] Add Milano apartment listing to src/data/listings.ts with all details, photos, and YouTube video
- [ ] Verify all 13 photos from /public/15088/ are accessible
- [ ] Test the listing page to ensure YouTube video and gallery work correctly
