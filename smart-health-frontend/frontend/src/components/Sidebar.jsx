import { NavLink } from 'react-router-dom'
import PulseStrip from './PulseStrip'

const links = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/health-centers', label: 'Health Centers' },
  { to: '/beds', label: 'Beds' },
  { to: '/medicines', label: 'Medicines' },
  { to: '/recommendations', label: 'Recommendations' },
]

export default function Sidebar({ pulseIntensity = 0.4 }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <span className="brand-mark">+</span>
        <div>
          <div className="brand-name">Smart Health</div>
          <div className="brand-sub">Operations</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-foot">
        <PulseStrip intensity={pulseIntensity} label="System pulse" />
      </div>
    </aside>
  )
}
