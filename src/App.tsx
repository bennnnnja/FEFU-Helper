import { Route, Routes } from 'react-router-dom'
import PhoneFrame from './components/PhoneFrame'
import BottomNav from './components/BottomNav'
import WeatherModal from './components/WeatherModal'
import { Outlet } from 'react-router-dom'

import Home from './pages/Home'
import Schedule from './pages/Schedule'
import MapPage from './pages/MapPage'
import Chats from './pages/Chats'
import ChatRoom from './pages/ChatRoom'
import Profile from './pages/Profile'
import Translator from './pages/Translator'
import Weather from './pages/Weather'
import Support from './pages/Support'
import SingleWindow from './pages/SingleWindow'
import PsychHelp from './pages/PsychHelp'
import Events from './pages/Events'
import Shuttles from './pages/Shuttles'
import TourBooking from './pages/TourBooking'
import FindFriends from './pages/FindFriends'
import CityAdaptation from './pages/CityAdaptation'
import Notifications from './pages/Notifications'

function Layout() {
  return (
    <PhoneFrame>
      <WeatherModal />
      <main className="flex-1 overflow-y-auto no-scrollbar">
        <Outlet />
      </main>
      <BottomNav />
    </PhoneFrame>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/chats/:id" element={<ChatRoom />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/translator" element={<Translator />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/support" element={<Support />} />
        <Route path="/single-window" element={<SingleWindow />} />
        <Route path="/psych-help" element={<PsychHelp />} />
        <Route path="/events" element={<Events />} />
        <Route path="/shuttles" element={<Shuttles />} />
        <Route path="/tour-booking" element={<TourBooking />} />
        <Route path="/find-friends" element={<FindFriends />} />
        <Route path="/city-adaptation" element={<CityAdaptation />} />
        <Route path="/notifications" element={<Notifications />} />
      </Route>
    </Routes>
  )
}
