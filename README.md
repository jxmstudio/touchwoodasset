# Touchwood Asset Management Website

A production-ready, dynamic website for Touchwood Asset Management built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- **Property Listings**: Dynamic listings with search, filtering, and pagination
- **Admin CMS**: Full CRUD operations for listings, media upload, and enquiry management
- **Responsive Design**: Mobile-first design with excellent accessibility
- **SEO Optimized**: Built-in SEO features with next-seo and sitemap generation
- **Authentication**: NextAuth with role-based access control
- **Database**: PostgreSQL with Prisma ORM (SQLite fallback for development)
- **Forms**: React Hook Form with Zod validation
- **Performance**: Optimized for <3s LCP on mobile devices

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: PostgreSQL + Prisma
- **Authentication**: NextAuth.js
- **Forms**: React Hook Form + Zod
- **File Upload**: UploadThing
- **Email**: Resend
- **Maps**: Leaflet (Mapbox integration ready)
- **Testing**: Playwright + Vitest

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (or SQLite for development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd touchwood
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/touchwood"
# For development, you can use SQLite:
# DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Email (Resend)
RESEND_API_KEY="your-resend-api-key"
ENQUIRY_INBOX="enquiries@touchwood.com.au"

# File Upload (UploadThing)
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"
```

4. Set up the database:
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database (development)
npm run db:push

# Or run migrations (production)
npm run db:migrate

# Seed with sample data
npm run db:seed
```

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard and CMS
│   ├── api/               # API routes
│   ├── about/             # About Us page
│   ├── services/          # Services page
│   ├── contact/           # Contact page
│   └── listings/          # Property listings
├── components/             # Reusable components
│   ├── ui/                # shadcn/ui components
│   ├── forms/             # Form components
│   ├── navigation.tsx     # Main navigation
│   └── footer.tsx         # Footer component
├── lib/                    # Utility libraries
│   ├── prisma.ts          # Prisma client
│   ├── auth.ts            # NextAuth configuration
│   └── utils.ts           # Utility functions
└── types/                  # TypeScript type definitions
```

## Database Schema

The application uses three main models:

- **User**: Admin users with role-based access
- **Listing**: Property listings with comprehensive details
- **Enquiry**: Customer enquiries and requests

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

## Admin Access

After seeding the database, you can access the admin panel:

- **URL**: `/admin`
- **Email**: `admin@touchwood.com.au`
- **Password**: Use NextAuth magic link authentication

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | Database connection string | Yes |
| `NEXTAUTH_URL` | NextAuth base URL | Yes |
| `NEXTAUTH_SECRET` | NextAuth secret key | Yes |
| `RESEND_API_KEY` | Resend email API key | No |
| `UPLOADTHING_SECRET` | UploadThing secret | No |
| `UPLOADTHING_APP_ID` | UploadThing app ID | No |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary software owned by Touchwood Asset Management.

## Support

For support and questions, please contact the development team or create an issue in the repository.

## Roadmap

- [ ] Advanced search and filtering
- [ ] Property comparison tools
- [ ] Virtual tours integration
- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Advanced reporting features
