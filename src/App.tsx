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
      src: "https://i.ibb.co/ymtSmfPc/Moose-and-Guest.png",
      alt: "The Moose on the slopes"
    },
    {
      src: "https://i.ibb.co/mVsW5mvC/IMG-4854.jpg",
      alt: "Moose Approved Red"
    },
    {
      src: "https://i.ibb.co/k6ggYp9R/IMG-4748.png",
      alt: "Moose Approved Red"
    },
    {
      src: "https://i.ibb.co/8L20yC3n/IMG-4348.jpg",
      alt: "Moose Approved Red"
    },
    {
      src: "https://i.ibb.co/ccBK7C4J/IMG-4216.jpg",
      alt: "Moose Approved Red"
    },
    {
      src: "https://i.ibb.co/9kkwQ1hK/IMG-0613.jpg",
      alt: "Moose Approved Red"
    },
    {
      src: "https://i.ibb.co/5hQWHCTr/IMG-7534.png",
      alt: "Moose Approved Red"
    },

    {
      src: "https://i.ibb.co/67Z5bB02/IMG-2859.jpg",
      alt: "Moose Approved Red"
    },
    {
      src: "https://i.ibb.co/hFkFykNj/IMG-1926.jpg",
      alt: "Moose Approved Red"
    },
    {
      src: "https://i.ibb.co/TxCNbrtn/IMG-1900.jpg",
      alt: "Moose Approved Red"
    },
    {
      src: "https://i.ibb.co/9H1KL1JS/IMG-4837-copy.jpg",
      alt: "Moose Approved Red"
    },
    {
      src: "https://i.ibb.co/p6BTRfqR/IMG-1797.jpg",
      alt: "Moose Approved Red"
    },
    {
      src: "https://i.ibb.co/Mx48s5LQ/IMG-1566.jpg",
      alt: "Moose Approved Red"
    },
    {
      src: "https://i.ibb.co/QjH7gddS/IMG-1334.jpg",
      alt: "Moose Approved Red"
    },
    {
      src: "https://i.ibb.co/mCtTKynP/IMG-1513.jpg",
      alt: "Moose Approved Red"
    },
    {
      src: "https://i.ibb.co/fdbFZLVH/IMG-0761.jpg",
      alt: "Moose Approved Red"
    },
    {
      src: "https://i.ibb.co/ZRtbvqyf/IMG-0064.jpg",
      alt: "Moose Approved Red"
    },
    {
      src: "https://i.ibb.co/6c20Lt2P/IMG-2849.jpg",
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