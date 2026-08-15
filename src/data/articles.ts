export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content?: string
  publication: string
  publicationUrl?: string
  author?: string
  date: string
  category: string[]
  /**
   * Set only for press mentions that live on another publication's site.
   * Original articles written by Touchwood omit it, so no "read the original
   * elsewhere" link is rendered and the page keeps its own link equity.
   */
  externalLink?: string
  featuredImage?: string
  featured?: boolean
}

export const articles: Article[] = [
  {
    id: '1',
    slug: 'investing-in-car-parks',
    title: 'Investing in car parks',
    excerpt:
      'Discover why car park investments are becoming an attractive asset class for property investors seeking stable returns in urban areas.',
    content: `Car parks are emerging as a compelling investment opportunity in the Australian commercial real estate market. With increasing urbanisation and limited parking availability in city centres, car park assets offer investors a unique combination of stable income and capital growth potential.

The article explores key considerations for investors looking at car park opportunities, including location analysis, revenue streams, and management strategies. As referenced in this Commercial Real Estate feature, industry experts highlight the growing demand for secure parking solutions in metropolitan areas.

Car parks provide several advantages as an investment asset:
- Consistent cash flow from daily, monthly, or lease arrangements
- Lower maintenance costs compared to traditional commercial properties
- Resilience during economic downturns as parking remains essential
- Potential for technology integration and automation
- Diversification benefits for property portfolios

For investors considering entry into this market, understanding local parking demand, zoning regulations, and operational requirements is essential. The car park sector continues to evolve with smart parking technologies and changing urban mobility patterns, making it an exciting space for forward-thinking investors.`,
    publication: 'Commercial Real Estate',
    publicationUrl: 'https://www.commercialrealestate.com.au',
    date: '2024-03-15',
    category: ['Investment', 'Car Parks', 'Commercial Real Estate', 'Media'],
    externalLink:
      'https://www.commercialrealestate.com.au/news/investing-in-car-parks-1442519/',
    featuredImage: '/hero/parking.jpg',
    featured: true,
  },

  // ── Original articles ────────────────────────────────────────────────────
  // No externalLink: these are written by Touchwood and live here, so the page
  // keeps its own link equity instead of pushing readers to another domain.

  {
    id: '3',
    slug: 'cost-to-rent-car-park-melbourne-cbd',
    title: 'What does it cost to rent a car park in Melbourne CBD?',
    excerpt:
      'Monthly car park rents across Melbourne CBD and the inner suburbs typically run from $220 to $365 a month. Here is what drives the difference, and what to check before you sign.',
    content: `If you work in the city or live in an apartment without a bay, renting a car park is usually far cheaper than paying daily rates. A commercial car park in the CBD can run $25 to $40 a day. A leased bay in the same area is generally $220 to $365 a month — often less than a fortnight of daily parking.

This guide covers what you should expect to pay across Melbourne, what changes the price, and the questions worth asking before you commit.

## Typical monthly car park rents in Melbourne

Across the bays Touchwood manages, monthly rents currently sit in these bands:

- Inner suburbs such as Carlton, East Melbourne and St Kilda: roughly $220 to $250 a month
- Docklands and South Wharf: roughly $240 to $290 a month
- Melbourne CBD proper, including La Trobe Street and the immediate city grid: roughly $290 to $365 a month

These are rates for a single secure bay on a month-to-month licence. Rates in any building move with demand, and a bay with a wider footprint or better access will sit at the upper end of its band.

## What actually drives the price

Four things account for most of the variation between two bays that look similar on paper.

**Walking distance to where you need to be.** This matters more than the suburb name. A bay a three-minute walk from Southern Cross will price above one fifteen minutes away in the same postcode.

**Access hours.** A bay with genuine 24/7 access is worth more than one tied to building hours. If you work shifts, or want the car available on weekends, confirm this before anything else.

**Security.** Secure boom or swipe access, lighting and camera coverage all lift the rate — and they are worth paying for. An unsecured open-air space in the same street can be $50 to $80 a month cheaper, and that gap reflects real risk.

**The bay itself.** Width, column placement, clearance height and whether you have to reverse around a tight corner all matter. A bay rated for an SUV or a dual cab prices differently from one that only comfortably takes a hatchback.

## What to check before you sign

- **Clearance height**, if you drive anything taller than a sedan. Many older CBD buildings run 1.9 to 2.1 metres, which rules out roof boxes and some four-wheel drives.
- **Access method** — swipe card, fob, app or remote — and what a replacement costs if you lose it.
- **Notice period.** Month-to-month with one month's notice is standard and is what you want. Be cautious of anything asking for a fixed twelve-month term on a parking bay.
- **Whether the rate is inclusive.** Ask specifically about owners corporation fees and any access-card charges.
- **Visitor and overnight rules**, if anyone else will occasionally use the space.

## Is renting a bay cheaper than daily parking?

For anyone parking in the city more than about eight days a month, a leased bay is almost always cheaper. At $30 a day, eight days is $240 — roughly the monthly rate for a bay in Carlton or Docklands with unlimited access.

The calculation changes if you only come into the city occasionally, or if your employer subsidises parking. It also changes if you can sublicense the bay on weekends, though you should check your agreement permits that before assuming it.

## Renting out a bay you already own

If you own a car space you are not using — a common situation for apartment owners in the CBD and Docklands — it can be leased separately from the apartment in most buildings. A bay returning $250 a month is $3,000 a year against essentially no maintenance cost.

The main things to get right are the licence terms, insurance, and confirming your owners corporation rules permit leasing to a non-resident. Some buildings restrict this; most do not.

## Available bays

Touchwood manages secure car park bays across Melbourne CBD, Carlton, Docklands, South Wharf, East Melbourne, South Yarra, St Kilda and Kew, all on flexible month-to-month terms. You can see current availability, photos and pricing for each bay on our car parks page.

If you own a bay and want to know what it should be earning, we will benchmark it against comparable spaces in your building and suburb at no cost.`,
    publication: 'Touchwood Asset Management',
    author: 'Touchwood Asset Management',
    date: '2026-08-13',
    category: ['Car Parks', 'Melbourne', 'Renting', 'Guide'],
    featuredImage: '/hero/parking.jpg',
    featured: true,
  },

  {
    id: '4',
    slug: 'property-management-fees-melbourne',
    title: 'Property management fees in Melbourne: what you should actually be paying',
    excerpt:
      'Melbourne management fees typically run 5.5% to 8.8% of rent collected, but the headline percentage is rarely the whole cost. Here is how to work out what you are really paying.',
    content: `Most Melbourne landlords can tell you their management percentage. Far fewer can tell you their total annual cost of management, because the headline rate is only part of it.

This is a plain breakdown of what agencies charge, which extras are normal and which are not, and how to work out your real number.

## The standard management fee

Across metropolitan Melbourne, ongoing management fees generally fall between 5.5% and 8.8% of rent collected, including GST. Where an agency sits in that range depends on the suburb, the type of property and how much competition there is locally.

A percentage of rent *collected* — rather than rent *due* — is the arrangement you want. It means the agency is not paid for weeks the property sits empty or a tenant falls into arrears, which aligns their incentives with yours.

## The fees that sit on top

The management percentage is rarely the full picture. Common additional charges include:

- **Letting or leasing fee** — typically one to two weeks' rent plus GST, charged each time a new tenant is secured
- **Lease renewal fee** — often a few hundred dollars to re-sign an existing tenant
- **Advertising and marketing** — photography, floor plans and portal listings, commonly $300 to $900 per campaign
- **Routine inspection fees** — sometimes included, sometimes charged per inspection
- **Monthly or annual statement and administration fees**
- **End of financial year statement fee**
- **Tribunal attendance** at an hourly or per-appearance rate
- **Maintenance coordination**, sometimes charged as a percentage on top of the invoice

None of these are inherently unreasonable. The problem is that they make two quoted percentages impossible to compare directly.

## How to work out what you are really paying

Take your last twelve months of statements and add up every dollar that went to the agency, not just the management fee. Divide that by the rent you actually received.

The result is your effective management rate. Landlords doing this for the first time are often surprised: a headline 6.6% can land closer to 9% or 10% once a letting fee, a renewal fee and a marketing campaign are counted in a year with a tenant change.

That effective rate is the only number worth comparing between agencies.

## What a lower fee can cost you

Cheaper is not automatically better. Management fees buy attention, and attention shows up in three numbers that dwarf the fee itself.

**Vacancy.** Every week empty costs roughly 1.9% of your annual rent. On a property renting at $600 a week, three weeks of avoidable vacancy is about $1,800 — more than a full year of the difference between a 6% and a 7% management fee.

**Rent level.** A manager who is not reviewing your rent against the market at each renewal can leave you 5% to 10% behind within a couple of years. That gap compounds, because each future increase starts from a lower base.

**Arrears and damage.** Tenant selection is the single highest-leverage thing a property manager does, and it is invisible until it goes wrong.

The right question is not "what is the cheapest fee" but "what is the net return after fees, vacancy and rent level".

## Questions worth asking your current manager

- What is my property's current market rent, and when was that last reviewed?
- How many days was it vacant in the last two years?
- What is your average days-on-market for a property like mine?
- What is the total I have paid you in the last twelve months, across all fees?
- Who will actually manage my property, and how many others do they manage?

That last one matters more than most landlords realise. A portfolio manager handling 200 properties cannot give yours the same attention as one handling 80.

## Switching is easier than most owners expect

Most management agreements can be ended with 30 to 90 days' notice. The incoming agency handles the transfer of keys, records, bond and tenant contact. Your tenant stays where they are — nothing changes for them beyond who they contact.

If you are not sure whether your current arrangement is competitive, we will benchmark your rent, your fees and your vacancy history against comparable Melbourne properties at no cost and with no obligation to switch.`,
    publication: 'Touchwood Asset Management',
    author: 'Touchwood Asset Management',
    date: '2026-08-13',
    category: ['Property Management', 'Melbourne', 'Landlords', 'Guide'],
    featuredImage: '/hero/residential.jpg',
    featured: true,
  },

  {
    id: '5',
    slug: 'self-storage-melbourne-cbd-sizes-and-costs',
    title: 'Self storage in Melbourne CBD: what the sizes cost and how to pick one',
    excerpt:
      'Storage in the Melbourne CBD runs from about $80 a month for a small locker to $400 for a large unit. Here is what each size actually holds and how to avoid paying for space you do not need.',
    content: `Storage pricing is quoted by square metre, which is not much help when what you actually want to know is whether your things will fit.

This guide translates the sizes into what they hold, sets out what each band costs in the Melbourne CBD, and covers the questions worth asking before you sign.

## What each size actually holds

**2 to 3 sqm — from about $80 a month.** A large cupboard. Seasonal items, archive boxes, sporting equipment, a bike or two, suitcases. This is the right size for apartment overflow, and it is the most commonly under-estimated: people book it expecting to fit furniture and find they cannot.

**4 to 6 sqm — roughly $130 to $200 a month.** Comfortably takes the contents of a one-bedroom apartment: a bed, a sofa, boxed kitchenware and a wardrobe's worth of clothing. Also the practical minimum for business stock or trade equipment you need to access regularly.

**7 to 10 sqm — roughly $250 to $400 a month.** The contents of a two-bedroom apartment or a small office fit-out. White goods, a dining setting, multiple bed frames and thirty-plus boxes with room to walk in.

Prices vary with floor level, access and how close the unit sits to the goods lift. Units on the ground floor or immediately by the lift carry a premium because moving in and out of them is faster.

## Working out the size you need

The reliable method is to stack everything you plan to store in one room at home, in the footprint you would use in the unit — boxes to head height, furniture upright where possible. Measure that footprint. That is your minimum.

Then add roughly 20% if you will need to get to things regularly, because a unit packed wall to wall means unloading half of it to reach anything at the back.

Two common mistakes are worth avoiding. The first is measuring floor area but forgetting height: most units allow stacking well above shoulder level, so a small footprint goes further than people expect. The second is booking the smallest unit that technically fits, then paying to upgrade a month later.

## What to check before you sign

- **Access hours.** Seven-day access is standard; confirm the actual hours and whether after-hours entry is possible.
- **Lift and loading access.** If you are moving furniture, ask where you park, how far the walk is, and whether the goods lift needs booking.
- **Climate conditions.** Documents, electronics, timber furniture and anything upholstered all suffer in an uncontrolled space over a Melbourne summer.
- **Security.** Individual locks, monitored access and camera coverage. Ask who else can enter your unit and under what circumstances.
- **Insurance.** Storage contents are usually not covered by the facility's policy. Check whether your home and contents insurance extends to goods in storage — often it does, up to a limit.
- **Notice period.** One month is standard. Avoid fixed terms longer than that for personal storage.

## CBD storage versus outer-suburban

Storage in an outer suburb is cheaper per square metre — sometimes materially so. Whether that is a saving depends entirely on how often you need to visit.

If you are storing genuine long-term archive material you touch once a year, distance costs nothing and outer-suburban is the rational choice. If you are a city resident storing seasonal items, or a business storing stock you access weekly, an hour of round-trip driving each visit erases the difference quickly.

For anyone living or working in the CBD, being able to walk to the unit is usually worth the premium.

## Storage at 601 Little Collins Street

Touchwood manages The Archive, a self-storage facility at 601 Little Collins Street in the Melbourne CBD, with units ranging from 2.2 sqm to 10 sqm on flexible month-to-month terms. Every unit has individual locks, monitored access, goods lift access and seven-day entry.

You can see each available unit with photos, exact dimensions and pricing on our storage page, so you can check the fit before enquiring.`,
    publication: 'Touchwood Asset Management',
    author: 'Touchwood Asset Management',
    date: '2026-08-13',
    category: ['Storage', 'Melbourne CBD', 'Guide'],
    featuredImage: '/hero/storage.jpg',
  },
]
