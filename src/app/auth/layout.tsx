import type { Metadata } from 'next'

// Sign-in / verification screens have no search value and were previously
// indexable (the pages export no metadata of their own).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
