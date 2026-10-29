'use client'

import { useEffect, useState } from 'react'
import { MarketingLanding, MockAuth, Workspace, type DemoUser } from '@/components/marketing-landing'

export default function Home() {
  const [user, setUser] = useState<DemoUser | null>(null)
  const [screen, setScreen] = useState<'landing' | 'auth'>('landing')

  useEffect(() => {
    const saved = window.localStorage.getItem('agenda-demo-user')
    if (saved) setUser(JSON.parse(saved))
  }, [])

  const login = (nextUser: DemoUser) => {
    window.localStorage.setItem('agenda-demo-user', JSON.stringify(nextUser))
    setUser(nextUser)
  }
  const logout = () => {
    window.localStorage.removeItem('agenda-demo-user')
    setUser(null)
    setScreen('landing')
  }

  if (user) return <Workspace user={user} onLogout={logout} />
  if (screen === 'auth') return <MockAuth onLogin={login} onBack={() => setScreen('landing')} />
  return <MarketingLanding onOpenApp={() => setScreen('auth')} />
}
