import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface ImageSlideshowProps {
  images: {
    src: string;
    alt: string;
  }[];
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
}

export function ImageSlideshow({ 
  images, 
  autoPlay = true, 
  interval = 2000, 
  showDots = false, 
  showArrows = false 
}: ImageSlideshowProps) {
  const swiperRef = useRef<any>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  if (images.length === 0) {
    return <div className="text-center text-gray-400">No images to display</div>;
  }

  return (
    <>
      <div className="relative w-screen -mx-4 px-4 sm:px-0">
        <Swiper
          ref={swiperRef}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          spaceBetween={30}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={showDots ? {
            clickable: true,
            dynamicBullets: true,
          } : false}
          navigation={showArrows}
          autoplay={autoPlay ? {
            delay: interval,
            disableOnInteraction: false,
          } : false}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="w-full"
          style={{
            paddingTop: '20px',
            paddingBottom: '20px',
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide 
              key={index}
              style={{ 
                width: '400px',
                height: '600px', // 2:3 aspect ratio (even taller)
              }}
              className="sm:w-[500px] sm:h-[750px] lg:w-[700px] lg:h-[1050px] xl:w-[800px] xl:h-[1400px]"
            >
              <div 
                className="relative w-full h-full rounded-lg overflow-hidden shadow-xl cursor-pointer bg-gray-100"
                onClick={() => setFullscreenImage(image.src)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Fullscreen Modal */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <div className="relative max-w-7xl max-h-full">
            <img
              src={fullscreenImage}
              alt="Fullscreen view"
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
} 