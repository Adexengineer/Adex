import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Quickstart from './components/Quickstart'
import Testimonials from './components/Testimonials'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Agents from './components/Agents'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Quickstart />
        <Testimonials />
        <Features />
        <HowItWorks />
        <Agents />
      </main>
      <Footer />
    </div>
  )
}

export default App
