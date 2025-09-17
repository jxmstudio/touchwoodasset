import { Building2, Mail, CheckCircle } from 'lucide-react'

export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Check Your Email
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            We've sent you a sign in link to your email address.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-blue-600" />
              <span className="text-blue-800 font-medium">
                Sign in link sent successfully
              </span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-6">
            Click the link in your email to sign in to your Touchwood admin account. 
            The link will expire in 24 hours for security.
          </p>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Didn't receive the email? Check your spam folder or contact support.
            </p>
            
            <a
              href="/auth/signin"
              className="inline-block text-blue-600 hover:text-blue-500 hover:underline"
            >
              Try signing in again
            </a>
          </div>
        </div>
        
        <div className="pt-6">
          <a
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 hover:underline"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
