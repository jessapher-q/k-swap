import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Layout({ children }) {
  const { user, signOut } = useAuth()
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Browse Skills', href: '/skills' },
    { name: 'Offer Skill', href: '/offer' },
    { name: 'Messages', href: '/messages' },
    { name: 'Profile', href: '/profile' },
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <nav style={{ backgroundColor: 'white', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#4f46e5' }}>K-Swap</h1>
              </div>
              <div style={{ display: 'flex', marginLeft: '32px', gap: '32px' }}>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      paddingTop: '4px',
                      paddingBottom: '4px',
                      borderBottom: location.pathname === item.href ? '2px solid #4f46e5' : '2px solid transparent',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: location.pathname === item.href ? '#111827' : '#6b7280',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '14px', color: '#374151' }}>
                    Hi, {user.name || user.email}
                  </span>
                  <button
                    onClick={signOut}
                    style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      textDecoration: 'none',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.color = '#374151'}
                    onMouseOut={(e) => e.target.style.color = '#6b7280'}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '16px' }}>
                  <Link
                    to="/login"
                    style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      textDecoration: 'none',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.color = '#374151'}
                    onMouseOut={(e) => e.target.style.color = '#6b7280'}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      textDecoration: 'none',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.color = '#374151'}
                    onMouseOut={(e) => e.target.style.color = '#6b7280'}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  )
}
