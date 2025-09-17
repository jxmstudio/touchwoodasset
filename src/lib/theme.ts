export const theme = {
  // Spacing scale helpers
  spacing: {
    section: 'py-16 md:py-24',
    sectionSm: 'py-12 md:py-16',
    container: 'px-4 md:px-6 lg:px-8',
    maxWidth: 'max-w-7xl',
  },
  
  // Border radius
  radius: {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    xl: 'rounded-3xl',
  },
  
  // Shadows
  shadow: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  },
  
  // Brand colors (using Tailwind tokens)
  colors: {
    primary: {
      50: 'bg-blue-50',
      100: 'bg-blue-100',
      500: 'bg-blue-500',
      600: 'bg-blue-600',
      700: 'bg-blue-700',
      800: 'bg-blue-800',
      900: 'bg-blue-900',
    },
    accent: {
      50: 'bg-yellow-50',
      100: 'bg-yellow-100',
      500: 'bg-yellow-500',
      600: 'bg-yellow-600',
    },
    neutral: {
      50: 'bg-gray-50',
      100: 'bg-gray-100',
      200: 'bg-gray-200',
      300: 'bg-gray-300',
      400: 'bg-gray-400',
      500: 'bg-gray-500',
      600: 'bg-gray-600',
      700: 'bg-gray-700',
      800: 'bg-gray-800',
      900: 'bg-gray-900',
    },
  },
  
  // Typography scale
  typography: {
    h1: 'text-4xl md:text-6xl font-bold leading-tight',
    h2: 'text-3xl md:text-4xl font-bold leading-tight',
    h3: 'text-2xl md:text-3xl font-semibold leading-tight',
    h4: 'text-xl md:text-2xl font-semibold leading-tight',
    body: 'text-base leading-relaxed',
    bodySm: 'text-sm leading-relaxed',
    bodyLg: 'text-lg leading-relaxed',
  },
  
  // Animation durations
  animation: {
    fast: 'duration-150',
    normal: 'duration-200',
    slow: 'duration-300',
  },
  
  // Container utilities
  container: 'container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl',
} as const

export type Theme = typeof theme
