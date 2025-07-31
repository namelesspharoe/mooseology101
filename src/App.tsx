import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { About } from './components/About';
import { BookingSection } from './components/BookingSection';
import { Contact } from './components/Contact';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { ImageSection } from './components/ImageSection';
import { ImageSlideshow } from './components/ImageSlideshow';
import { TheMountain } from './components/TheMountain';
import { TripTips } from './components/TripTips';
import { Navigation } from './components/Navigation';
import { Testimonials } from './components/Testimonials';
import { Venmo } from './components/Venmo';

function App() {
  const slideshowImages = [
    {
      src: "https://i.ibb.co/vMnBxMP/IMG-7497.png",
      alt: "The Moose on the slopes"
    },
    {
      src: "https://i.ibb.co/tPpBVKkj/IMG-1274.jpg",
      alt: "Moose Approved Red"
    },
    {
      src: "https://i.ibb.co/0pcCWK41/IMG-0564.jpg",
      alt: "Moose Approved Red"
    },
    {
      src: "https://i.ibb.co/LhJxTSwN/IMG-1164.jpg",
      alt: "Moose Approved Red"
    },
    {
      src: "https://i.ibb.co/mrMvTmYb/IMG-1926.jpg",
      alt: "Moose Approved Red"
    },
    {
      src: "https://i.ibb.co/9kkwQ1hK/IMG-0613.jpg",
      alt: "Moose Approved Red"
    },
  ];

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Toaster position="bottom-center" />
      <Navigation />
      <main>
        <Hero />
        <div className="container mx-auto px-4 space-y-24">
          
          <About />
          <div className="py-12">
            <ImageSlideshow 
              images={slideshowImages}
              autoPlay={true}
              interval={8000}
              showDots={true}
              showArrows={false}
            />
          </div>
          <ImageSection />
          <TheMountain />
          <TripTips />
          <BookingSection />
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