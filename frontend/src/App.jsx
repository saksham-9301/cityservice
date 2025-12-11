import './App.css'
<<<<<<< HEAD
=======
<<<<<<< Updated upstream
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
>>>>>>> 7750bf83ff9f433a1327aba961a1ff6fb3d1d97e
import Navbar from './components/Navbar.jsx'
import HeroBanner from './components/HeroBanner.jsx'
import ServicesWeOffer from './components/ServicesWeOffer.jsx'
import Testimonials from './components/Testimonials.jsx'
import CTASection from './components/CTASection.jsx'
import Footer from './components/Footer.jsx'
<<<<<<< HEAD
=======
import AuthPage from './pages/AuthPage.jsx'
import CategoriesPage from './pages/CategoriesPage.jsx'
import ProvidersPage from './pages/ProvidersPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import BecomeProviderPage from './pages/BecomeProviderPage.jsx'
>>>>>>> Stashed changes
>>>>>>> 7750bf83ff9f433a1327aba961a1ff6fb3d1d97e

function App() {
  return (
<<<<<<< HEAD
    <>
      <Navbar />
      <HeroBanner />
      <ServicesWeOffer />
      <Testimonials />
      <CTASection />
      <Footer />
    </>
=======
<<<<<<< Updated upstream
   <>
   <div>
    <h1 className="text-3xl font-bold underline">
    </h1>
   </div>
   </>
=======
    <Router>
      <Navbar />
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/providers" element={<ProvidersPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/become-provider" element={<BecomeProviderPage />} />
        <Route path="/" element={
          <>
            <HeroBanner />
            <ServicesWeOffer />
            <Testimonials />
            <CTASection />
          </>
        } />
      </Routes>
      <Footer />
    </Router>
>>>>>>> Stashed changes
>>>>>>> 7750bf83ff9f433a1327aba961a1ff6fb3d1d97e
  )
}

export default App
