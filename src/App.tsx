import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { About } from './components/About';
import { BookingSection } from './components/BookingSection';
import { Contact } from './components/Contact';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { ImageSection } from './components/ImageSection';
import { TheMountain } from './components/TheMountain';
import { TripTips } from './components/TripTips';
import { Lessons } from './components/Lessons';
import { Navigation } from './components/Navigation';
import { Testimonials } from './components/Testimonials';
import { Venmo } from './components/Venmo';

function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Toaster position="bottom-center" />
      <Navigation />
      <main>
        <Hero />
        <div className="container mx-auto px-4 space-y-24">
          <BookingSection />
          <About />
          <ImageSection />
          <TheMountain />
          <TripTips />
          <Testimonials />
          <FAQ />
          <Venmo />
          <Contact />
        </div>
      </main>
      <Footer />
    </ErrorBoundary>
  );
}

export default App;