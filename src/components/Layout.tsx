import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { BottomPickPanel } from './BottomPickPanel'

export function Layout() {
  const isHome = useLocation().pathname === '/'

  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink to="/" className="app-brand" end>
          Pet Emotion Study by Ananya Kher
        </NavLink>
      </header>
      <main className={'app-main' + (isHome ? ' app-main--home' : '')}>
        <Outlet />
      </main>
      <BottomPickPanel />
    </div>
  )
}
