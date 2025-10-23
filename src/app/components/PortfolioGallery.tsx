'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Colori brand coerenti con la homepage
const brandColors = {
  primary: 'rgb(0, 60, 90)',
  accent: 'rgb(0, 100, 150)',
  accentBright: 'rgb(0, 150, 220)',
};

// Array di 30 progetti con titoli specifici
const portfolioProjects = [
  { id: 1, title: 'Architettura Residenziale 01' },
  { id: 2, title: 'Design di Prodotto 02' },
  { id: 3, title: 'Visualizzazione Interni 03' },
  { id: 4, title: 'Rendering Architettonico 04' },
  { id: 5, title: 'Concept Design 05' },
  { id: 6, title: 'Spazi Commerciali 06' },
  { id: 7, title: 'Arredamento Moderno 07' },
  { id: 8, title: 'Progetto Residenziale 08' },
  { id: 9, title: 'Design d\'Interni 09' },
  { id: 10, title: 'Ristrutturazione 3D 10' },
  { id: 11, title: 'Furniture Rendering 11' },
  { id: 12, title: 'Visualizzazione Prodotto 12' },
  { id: 13, title: 'Progetto Hotel 13' },
  { id: 14, title: 'Design Industriale 14' },
  { id: 15, title: 'Rendering Esterno 15' },
  { id: 16, title: 'Uffici Moderni 16' },
  { id: 17, title: 'Showroom Design 17' },
  { id: 18, title: 'Retail Space 18' },
  { id: 19, title: 'Packaging 3D 19' },
  { id: 20, title: 'Prototipo Digitale 20' },
  { id: 21, title: 'Ambiente Wellness 21' },
  { id: 22, title: 'Cucina Contemporanea 22' },
  { id: 23, title: 'Spazio Espositivo 23' },
  { id: 24, title: 'Design Sostenibile 24' },
  { id: 25, title: 'Ambiente Creativo 25' },
  { id: 26, title: 'Progetto Luxury 26' },
  { id: 27, title: 'Visualizzazione Urbana 27' },
  { id: 28, title: 'Interior Moderno 28' },
  { id: 29, title: 'Rendering Notturno 29' },
  { id: 30, title: 'Concept Architettonico 30' },
];

interface PortfolioItem {
  id: number;
  title: string;
}

const PortfolioGallery: React.FC = () => {
  const [screenType, setScreenType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [scrolled, setScrolled] = useState(false);

  // Rileva il tipo di schermo e adatta il layout
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setScreenType('mobile');
      else if (window.innerWidth < 1024) setScreenType('tablet');
      else setScreenType('desktop');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Gestione dello scroll per l'header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Configurazione del layout a mosaico per diverse risoluzioni
  const getMosaicLayout = () => {
    const layouts: Record<'mobile' | 'tablet' | 'desktop', { images: number; cols: number; config: Array<{ width: number; height: number }> }> = {
      desktop: {
        images: 30,
        cols: 6,
        config: [
          { width: 2, height: 2 }, { width: 1, height: 1 }, { width: 1, height: 1 }, { width: 2, height: 2 }, { width: 1, height: 1 }, { width: 1, height: 1 },
          { width: 1, height: 1 }, { width: 1, height: 1 }, { width: 2, height: 1 }, { width: 2, height: 1 }, { width: 1, height: 1 }, { width: 1, height: 1 },
          { width: 2, height: 2 }, { width: 1, height: 1 }, { width: 1, height: 1 }, { width: 2, height: 2 }, { width: 1, height: 1 }, { width: 1, height: 1 },
          { width: 1, height: 1 }, { width: 1, height: 1 }, { width: 2, height: 1 }, { width: 2, height: 1 }, { width: 1, height: 1 }, { width: 1, height: 1 },
          { width: 2, height: 2 }, { width: 1, height: 1 }, { width: 1, height: 1 }, { width: 2, height: 1 }, { width: 1, height: 1 }, { width: 1, height: 1 },
        ]
      },
      tablet: {
        images: 30,
        cols: 4,
        config: [
          { width: 2, height: 2 }, { width: 1, height: 1 }, { width: 1, height: 1 }, { width: 2, height: 1 },
          { width: 1, height: 1 }, { width: 1, height: 1 }, { width: 2, height: 2 }, { width: 1, height: 1 },
          { width: 1, height: 1 }, { width: 2, height: 1 }, { width: 1, height: 1 }, { width: 1, height: 1 },
          { width: 2, height: 2 }, { width: 1, height: 1 }, { width: 1, height: 1 }, { width: 2, height: 1 },
          { width: 1, height: 1 }, { width: 1, height: 1 }, { width: 2, height: 2 }, { width: 1, height: 1 },
          { width: 1, height: 1 }, { width: 2, height: 1 }, { width: 1, height: 1 }, { width: 1, height: 1 },
          { width: 2, height: 2 }, { width: 1, height: 1 }, { width: 1, height: 1 }, { width: 2, height: 1 },
          { width: 1, height: 1 }, { width: 1, height: 1 },
        ]
      },
      mobile: {
        images: 30,
        cols: 2,
        config: [
          { width: 1, height: 1 }, { width: 1, height: 1 }, { width: 2, height: 1 }, { width: 1, height: 1 },
          { width: 1, height: 1 }, { width: 2, height: 1 }, { width: 1, height: 1 }, { width: 1, height: 1 },
          { width: 2, height: 1 }, { width: 1, height: 1 }, { width: 1, height: 1 }, { width: 1, height: 1 },
          { width: 1, height: 1 }, { width: 2, height: 1 }, { width: 1, height: 1 }, { width: 1, height: 1 },
          { width: 2, height: 1 }, { width: 1, height: 1 }, { width: 1, height: 1 }, { width: 1, height: 1 },
          { width: 1, height: 1 }, { width: 2, height: 1 }, { width: 1, height: 1 }, { width: 1, height: 1 },
          { width: 2, height: 1 }, { width: 1, height: 1 }, { width: 1, height: 1 }, { width: 1, height: 1 },
          { width: 1, height: 1 }, { width: 1, height: 1 },
        ]
      }
    };

    return layouts[screenType];
  };

  const currentLayout = useMemo(() => getMosaicLayout(), [screenType]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-xl bg-gray-900/80 shadow-lg border-b border-gray-700'
            : 'backdrop-blur-sm bg-gray-900/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2 flex-shrink-0 -ml-4 hover:opacity-80 transition-opacity">
              <div
                className="w-48 h-16 bg-contain bg-no-repeat bg-left"
                style={{ backgroundImage: "url('/images/logo.png')" }}
              />
            </Link>
            <nav className="hidden md:flex items-center space-x-4">
              <Link
                href="/"
                className="px-4 py-2 text-white font-medium rounded-full shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300 text-sm"
                style={{
                  background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.accent} 100%)`
                }}
              >
                Home
              </Link>
              <Link
                href="/portfolio"
                className="px-4 py-2 text-white font-medium rounded-full shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300 text-sm"
                style={{
                  background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.accent} 100%)`
                }}
              >
                Portfolio
              </Link>
              <Link
                href="/#servizi"
                className="px-4 py-2 text-white font-medium rounded-full shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300 text-sm"
                style={{
                  background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.accent} 100%)`
                }}
              >
                Servizi
              </Link>
              <button
                className="px-6 py-2 text-white font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.accent} 100%)`
                }}
              >
                Contattami
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Torna alla Home
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Portfolio Completo</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
            Scopri tutti i miei progetti di progettazione 3D e rendering fotorealistico
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${currentLayout.cols}, 1fr)`,
              gap: '10px',
            }}
          >
            {Array.from({ length: currentLayout.images }).map((_, index) => {
              const layout = currentLayout.config[index];
              const project = portfolioProjects[index];

              return (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-xl group"
                  style={{
                    gridColumn: `span ${layout.width}`,
                    gridRow: `span ${layout.height}`,
                    aspectRatio: `${layout.width} / ${layout.height}`,
                  }}
                >
                  {/* Immagine con fallback nel caso non esista ancora */}
                  <div className="relative w-full h-full bg-gray-700">
                    <Image
                      src={`/images/portfolio/${project.id}.jpg`}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      priority={index < 6}
                      onError={(e) => {
                        // Se l'immagine non carica, mostra uno sfondo grigio con il numero
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    {/* Overlay scuro al caricamento */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />

                    {/* Titolo in sovraimpressione - angolo basso sinistro */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <p className="text-white font-semibold text-xs md:text-sm truncate">
                        {project.title}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-700">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Hai un Progetto in Mente?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Contattami per discutere il tuo prossimo progetto di visualizzazione 3D
          </p>
          <button
            className="px-8 py-4 text-white font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${brandColors.accentBright} 0%, ${brandColors.accentBright} 100%)`,
              boxShadow: `0 0 30px ${brandColors.accentBright}40`
            }}
          >
            Inizia una Conversazione
          </button>
        </div>
      </section>
    </div>
  );
};

export default PortfolioGallery;