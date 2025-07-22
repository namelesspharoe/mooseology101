import { About } from './components/About';
import { BookingSection } from './components/BookingSection';
import { Contact } from './components/Contact';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { ImageSection } from './components/ImageSection';
import { Lessons } from './components/Lessons';
import { Navigation } from './components/Navigation';
import { Testimonials } from './components/Testimonials';
import { Venmo } from './components/Venmo';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <div className="container mx-auto px-4 space-y-24">
          <Lessons />
          <BookingSection />
          <About />
          <ImageSection />
          <Testimonials />
          <FAQ />
          <Venmo />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App; 