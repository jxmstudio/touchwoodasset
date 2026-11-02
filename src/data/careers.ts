import { CONTACT } from '@/lib/site'

/**
 * Open roles on /careers. When a role is filled, delete its entry: the role
 * cards and the application form's role list both read from this array.
 */
export interface JobOpening {
  id: string
  title: string
  summary: string
  responsibilities: string[]
  requirements: string[]
}

export const LICENCE_NAME = "Agent's Representative licence"
export const JOB_LOCATION = 'Melbourne, VIC'
export const EITHER_ROLE = 'either'

const LICENCE_REQUIREMENT = `Current ${LICENCE_NAME} (required)`

export const jobOpenings: JobOpening[] = [
  {
    id: 'sales-consultant',
    title: 'Sales Consultant',
    summary:
      'Help Melbourne property owners sell with confidence, from first appraisal through to settlement.',
    responsibilities: [
      'Appraise properties and advise owners on pricing and sales strategy',
      'Manage listings, inspections and buyer enquiries',
      'Negotiate offers and guide vendors through to settlement',
      'Build your own network of vendors, buyers and investors',
    ],
    requirements: [
      LICENCE_REQUIREMENT,
      'Sales experience, ideally in Melbourne real estate',
      'Confident communication and negotiation skills',
      'Self-motivated, organised and client-focused',
    ],
  },
  {
    id: 'business-development-manager',
    title: 'Business Development Manager',
    summary:
      "Grow Touchwood's portfolio by winning new property owners and investors across Melbourne.",
    responsibilities: [
      'Find and win new landlords, vendors and investors',
      'Follow up property review and appraisal enquiries through to signed agreements',
      "Present Touchwood's residential, commercial, car park and storage services",
      'Build referral relationships across the property industry',
    ],
    requirements: [
      LICENCE_REQUIREMENT,
      'Business development or new-business experience, ideally in property',
      'Comfortable opening conversations and following up consistently',
      'Self-motivated, organised and results-driven',
    ],
  },
]

export function roleLabel(roleId: string): string {
  if (roleId === EITHER_ROLE) return 'Either role'
  return jobOpenings.find((job) => job.id === roleId)?.title ?? roleId
}

/** Opens the applicant's email app with a resume message ready to attach to. */
export function resumeMailto(roleTitle?: string): string {
  const role = roleTitle ?? 'Sales / Business Development'
  const subject = `Job application: ${role}`
  const body = [
    'Hi Touchwood team,',
    '',
    `I'd like to apply for: ${role}.`,
    `My resume is attached and I hold a current ${LICENCE_NAME}.`,
    '',
    'Name:',
    'Mobile:',
  ].join('\n')

  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
