import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import HealthCenters from './pages/HealthCenters'
import HealthCenterDetail from './pages/HealthCenterDetail'
import Beds from './pages/Beds'
import Medicines from './pages/Medicines'
import Recommendations from './pages/Recommendations'

export default function App() {
  return (
    <div className="app-shell">
      <Sidebar pulseIntensity={0.4} />
      <div className="main-column">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/health-centers" element={<HealthCenters />} />
          <Route path="/health-centers/:centerId" element={<HealthCenterDetail />} />
          <Route path="/beds" element={<Beds />} />
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/recommendations" element={<Recommendations />} />
        </Routes>
      </div>
    </div>
  )
}
