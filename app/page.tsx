'use client'

import { useState } from 'react'
import { MarketingLanding, Workspace } from '@/components/marketing-landing'

export default function Home() {
  const [view, setView] = useState<'landing' | 'workspace'>('landing')
  return view === 'landing' ? <MarketingLanding onOpenApp={() => setView('workspace')} /> : <Workspace onHome={() => setView('landing')} />
}
