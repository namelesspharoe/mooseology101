import { useRef } from 'react';
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
  showDots = true, 
  showArrows = true 
}: ImageSlideshowProps) {
  const swiperRef = useRef<any>(null);

  if (images.length === 0) {
    return <div className="text-center text-gray-400">No images to display</div>;
  }

  return (
    <div className="relative w-full mx-auto">
      <Swiper
        ref={swiperRef}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
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
              width: '280px',
              height: '320px',
            }}
            className="sm:w-[35rem] sm:h-[40rem]"
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
} 