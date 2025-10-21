import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/ui/fade-in'
import { articles } from '@/data/articles'
import { ArrowLeft, ExternalLink, Calendar, Building2, Tag } from 'lucide-react'

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const article = articles.find((a) => a.slug === params.slug)

  if (!article) {
    return {
      title: 'Article Not Found - Touchwood Asset Management',
    }
  }

  return {
    title: `${article.title} - Touchwood Asset Management`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} - Touchwood Asset Management`,
      description: article.excerpt,
      images: article.featuredImage ? [article.featuredImage] : [],
    },
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = articles.find((a) => a.slug === params.slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Navigation */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button asChild variant="ghost" size="sm">
            <Link href="/blog" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Articles
            </Link>
          </Button>
        </div>
      </section>

      {/* Hero Image */}
      {article.featuredImage && (
        <section className="relative h-[400px] md:h-[500px] w-full overflow-hidden bg-gray-900">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover opacity-90"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </section>
      )}

      {/* Article Content */}
      <article className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <FadeIn>
            {/* Article Header */}
            <header className="mb-12">
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  <span className="font-medium text-primary">
                    {article.publication}
                  </span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={article.date}>
                    {new Date(article.date).toLocaleDateString('en-AU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {article.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {article.excerpt}
              </p>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-8">
                {article.category.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {cat}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="flex-1 sm:flex-none">
                  <a
                    href={article.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Read Full Article on {article.publication}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="flex-1 sm:flex-none"
                >
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </header>

            {/* Article Body */}
            {article.content && (
              <div className="prose prose-lg max-w-none bg-white rounded-xl p-8 md:p-12 shadow-sm">
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  {article.content.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Footer CTA */}
            <div className="mt-12 bg-gray-100 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Interested in Property Investment?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our expert team can help you explore investment opportunities in
                car parks, residential, and commercial properties across
                Melbourne and Victoria.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/contact">Contact Our Team</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/services">Our Services</Link>
                </Button>
              </div>
            </div>
          </FadeIn>

          {/* Related Articles */}
          <FadeIn delay={0.2}>
            <div className="mt-16 pt-16 border-t">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                More Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles
                  .filter((a) => a.slug !== article.slug)
                  .slice(0, 2)
                  .map((relatedArticle) => (
                    <Link
                      key={relatedArticle.id}
                      href={`/blog/${relatedArticle.slug}`}
                      className="group bg-white rounded-lg p-6 hover:shadow-lg transition-all duration-300 border"
                    >
                      <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                        {relatedArticle.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3">
                        {relatedArticle.excerpt}
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span className="font-medium text-primary">
                          {relatedArticle.publication}
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          {new Date(relatedArticle.date).toLocaleDateString(
                            'en-AU',
                            {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            }
                          )}
                        </span>
                      </div>
                    </Link>
                  ))}
              </div>
              {articles.length <= 1 && (
                <p className="text-gray-500 text-center py-8">
                  More articles coming soon. Stay tuned!
                </p>
              )}
            </div>
          </FadeIn>
        </div>
      </article>
    </div>
  )
}
