import './App.css'
import Navbar from './components/Navbar.jsx'
import HeroBanner from './components/HeroBanner.jsx'
import ServicesWeOffer from './components/ServicesWeOffer.jsx'
import Testimonials from './components/Testimonials.jsx'
import CTASection from './components/CTASection.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <>
      <Navbar />
      <HeroBanner />
      <ServicesWeOffer />
      <Testimonials />
      <CTASection />
      <Footer />
    </>
  )
}

export default App
