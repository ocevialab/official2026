import { Outlet, useLocation } from 'react-router-dom'

export function AnimatedOutlet() {
  const { pathname } = useLocation()

  return (
    <div key={pathname} className="animate-page-enter">
      <Outlet />
    </div>
  )
}
