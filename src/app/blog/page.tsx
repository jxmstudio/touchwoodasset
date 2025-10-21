import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FadeIn } from '@/components/ui/fade-in'
import { Section } from '@/components/ui/section'
import { articles } from '@/data/articles'
import { ExternalLink, Calendar, Tag } from 'lucide-react'

export const metadata: Metadata = {
  title: 'News & Articles - Touchwood Asset Management',
  description:
    'Stay updated with the latest news, insights, and media features from Touchwood Asset Management. Expert perspectives on property investment, car parks, and real estate trends.',
  openGraph: {
    title: 'News & Articles - Touchwood Asset Management',
    description:
      'Stay updated with the latest news, insights, and media features from Touchwood Asset Management.',
  },
}

export default function BlogPage() {
  const featuredArticles = articles.filter((article) => article.featured)
  const regularArticles = articles.filter((article) => !article.featured)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-brand-600 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              News & Articles
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Industry insights, media features, and expert perspectives on
              property investment and real estate trends
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <Section
          title="Featured"
          subtitle="Highlighted media appearances and industry insights"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredArticles.map((article, index) => (
              <FadeIn key={article.id} delay={index * 0.1}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  {article.featuredImage && (
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={article.featuredImage}
                        alt={article.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                      <span className="font-medium text-primary">
                        {article.publication}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(article.date).toLocaleDateString('en-AU', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-2xl mb-2">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-end">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.category.slice(0, 3).map((cat) => (
                        <span
                          key={cat}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {cat}
                        </span>
                      ))}
                    </div>
                    <Button asChild className="w-full">
                      <a
                        href={article.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Original Article
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Section>
      )}

      {/* Regular Articles */}
      {regularArticles.length > 0 && (
        <Section
          title="All Articles"
          subtitle="Browse our complete collection of articles and insights"
          className="bg-gray-50"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article, index) => (
              <FadeIn key={article.id} delay={index * 0.1}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                  {article.featuredImage && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={article.featuredImage}
                        alt={article.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                      <span className="font-medium text-primary">
                        {article.publication}
                      </span>
                      <span>•</span>
                      <span>
                        {new Date(article.date).toLocaleDateString('en-AU', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{article.title}</CardTitle>
                    <CardDescription>{article.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-end">
                    <Button asChild className="w-full">
                      <a
                        href={article.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Original Article
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-brand-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stay Informed
            </h2>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Want to learn more about property investment opportunities? Get in
              touch with our expert team today.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white hover:bg-gray-100 text-black shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
