import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Home() {
  const { user } = useAuth()

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #e0e7ff, #dbeafe)', padding: '48px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#111827', marginBottom: '12px' }}>
            K-Swap
          </h1>
          <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '600px', margin: '0 auto 32px' }}>
            Learn. Help. Earn. Locally.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              to="/skills"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 32px',
                backgroundColor: '#4f46e5',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '500',
                fontSize: '16px'
              }}
            >
              Browse Skills
            </Link>
            {user ? (
              <Link
                to="/offer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px 32px',
                  backgroundColor: 'white',
                  color: '#4f46e5',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontWeight: '500',
                  fontSize: '16px',
                  border: '1px solid #e5e7eb'
                }}
              >
                Offer Your Skill
              </Link>
            ) : (
              <Link
                to="/register"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px 32px',
                  backgroundColor: 'white',
                  color: '#4f46e5',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontWeight: '500',
                  fontSize: '16px',
                  border: '1px solid #e5e7eb'
                }}
              >
                Sign Up
              </Link>
            )}
          </div>
        </div>

        <div style={{ marginTop: '64px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
                <div style={{ padding: '12px', backgroundColor: '#4f46e5', borderRadius: '8px', color: 'white' }}>
                  <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '20px', textAlign: 'center' }}>Academic Help</h3>
              <p style={{ fontSize: '16px', color: '#6b7280', textAlign: 'center' }}>
                Tutoring, homework help, note-making, and study support from fellow students.
              </p>
            </div>

            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
                <div style={{ padding: '12px', backgroundColor: '#4f46e5', borderRadius: '8px', color: 'white' }}>
                  <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '20px', textAlign: 'center' }}>Creative Services</h3>
              <p style={{ fontSize: '16px', color: '#6b7280', textAlign: 'center' }}>
                Poster design, video editing, drawing, and digital art services.
              </p>
            </div>

            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
                <div style={{ padding: '12px', backgroundColor: '#4f46e5', borderRadius: '8px', color: 'white' }}>
                  <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '20px', textAlign: 'center' }}>Digital Skills</h3>
              <p style={{ fontSize: '16px', color: '#6b7280', textAlign: 'center' }}>
                Social media management, data entry, and basic tech support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
