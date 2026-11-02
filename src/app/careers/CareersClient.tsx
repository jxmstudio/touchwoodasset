'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FadeIn } from '@/components/ui/fade-in'
import { JobApplicationForm } from '@/components/forms/job-application-form'
import {
  JOB_LOCATION,
  jobOpenings,
  LICENCE_NAME,
  resumeMailto,
} from '@/data/careers'
import { CONTACT } from '@/lib/site'
import { CheckCircle, Mail, MapPin } from 'lucide-react'

export default function CareersClient() {
  const [selectedRole, setSelectedRole] = useState('')

  return (
    <>
      {/* Open Roles */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Current Openings
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Fill out your details below or send through your resume.
              </p>
            </div>
          </FadeIn>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
            {jobOpenings.map((job, index) => (
              <FadeIn key={job.id} delay={index * 0.1}>
                <Card className="flex h-full flex-col">
                  <CardHeader>
                    <Badge variant="secondary" className="mb-2 w-fit">
                      <MapPin className="mr-1 h-3 w-3" />
                      {JOB_LOCATION}
                    </Badge>
                    <CardTitle className="text-2xl">{job.title}</CardTitle>
                    <CardDescription className="text-base">
                      {job.summary}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <h3 className="mb-3 font-semibold text-gray-900">
                      What you&apos;ll do
                    </h3>
                    <ul className="mb-6 space-y-2">
                      {job.responsibilities.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <h3 className="mb-3 font-semibold text-gray-900">
                      What you&apos;ll bring
                    </h3>
                    <ul className="mb-8 space-y-2">
                      {job.requirements.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex flex-col gap-3 sm:flex-row">
                      <Button asChild className="flex-1">
                        <a
                          href="#apply"
                          onClick={() => setSelectedRole(job.id)}
                        >
                          Apply Now
                        </a>
                      </Button>
                      <Button asChild variant="outline" className="flex-1">
                        <a href={resumeMailto(job.title)}>
                          <Mail className="mr-2 h-4 w-4" />
                          Email Your Resume
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Application */}
      <section id="apply" className="scroll-mt-20 bg-gray-50 py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-3">
            <FadeIn className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="mb-4 text-3xl font-bold text-gray-900">
                  Apply Now
                </h2>
                <p className="text-lg text-gray-600">
                  Fill out your details and the team will be in touch.
                </p>
              </div>
              <JobApplicationForm
                role={selectedRole}
                onRoleChange={setSelectedRole}
              />
            </FadeIn>

            <FadeIn delay={0.2}>
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    Prefer to send your resume?
                  </h3>
                  <p className="mb-4 text-gray-600">
                    Email it to{' '}
                    <a
                      href={resumeMailto()}
                      className="break-words text-primary hover:underline"
                    >
                      {CONTACT.email}
                    </a>{' '}
                    with the role you&apos;re applying for, and confirm that you
                    hold a current {LICENCE_NAME}.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <a href={resumeMailto()}>
                      <Mail className="mr-2 h-4 w-4" />
                      Email Your Resume
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
