import heroImage from '@/assets/hero-banner-new.jpg';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative overflow-hidden h-96 md:h-[500px]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
      
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-wider">
            UDI SMASH
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light mt-4 tracking-wide">
            HAMBURGUERIA
          </p>
        </div>
      </div>
    </section>
  );
}