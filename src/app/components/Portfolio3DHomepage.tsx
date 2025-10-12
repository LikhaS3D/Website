'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  ChevronRight,
  Play,
  Palette,
  Layers,
  Box,
  Menu,
  X,
  ArrowRight,
  Star,
  Shield,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Dribbble
} from 'lucide-react';

// Costanti statiche
const brandColors = {
  primary: 'rgb(0, 60, 90)',
  primaryLight: 'rgb(0, 80, 120)',
  primaryDark: 'rgb(0, 40, 60)',
  accent: 'rgb(0, 100, 150)',
  transparent: {
    light: 'rgba(0, 60, 90, 0.1)',
    medium: 'rgba(0, 60, 90, 0.3)',
    heavy: 'rgba(0, 60, 90, 0.8)',
    full: 'rgba(0, 60, 90, 0.95)'
  }
};

const portfolioImages = [
  '/images/presentazione-1.png',
  '/images/presentazione-2.png',
  '/images/presentazione-3.png',
  '/images/presentazione-4.png',
  '/images/presentazione-5.png'
];

const Portfolio3DHomepage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Gestione dello scroll
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
    setScrollPosition(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Carosello automatico
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % portfolioImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Calcola l'opacità dello sfondo
  const getBackgroundOpacity = () => {
    if (typeof window === 'undefined' || !servicesRef.current) return 1;
    const servicesPosition = servicesRef.current.offsetTop;
    const windowHeight = window.innerHeight;
    if (scrollPosition < servicesPosition - windowHeight) return 1;
    else if (scrollPosition < servicesPosition) {
      const progress = (scrollPosition - (servicesPosition - windowHeight)) / windowHeight;
      return 1 - progress;
    } else return 0;
  };

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
            <div className="flex items-center space-x-2 flex-shrink-0 -ml-4">
              <div
                className="w-48 h-16 bg-contain bg-no-repeat bg-left"
                style={{ backgroundImage: "url('/images/logo.png')" }}
              />
            </div>
            <nav className="hidden md:flex items-center space-x-4">
              {['Home', 'Servizi', 'Portfolio'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="px-4 py-2 text-white font-medium rounded-full shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300 text-sm"
                  style={{
                    background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.accent} 100%)`
                  }}
                >
                  {item}
                </a>
              ))}
              <button
                className="px-6 py-2 text-white font-medium rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.accent} 100%)`
                }}
              >
                Contattami
              </button>
            </nav>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ backgroundColor: brandColors.transparent.light }}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden backdrop-blur-xl border-t border-gray-700" style={{ backgroundColor: 'rgba(31, 41, 55, 0.98)' }}>
            <nav className="px-4 py-6 space-y-4">
              {['Home', 'Servizi', 'Portfolio'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block py-2 text-gray-300 hover:text-white transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button
                className="w-full py-3 text-white font-medium rounded-full shadow-lg mt-4"
                style={{
                  background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.accent} 100%)`
                }}
              >
                Contattami
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Background Image */}
      <div
        className="fixed top-0 left-0 w-full h-screen z-0"
        style={{ opacity: getBackgroundOpacity(), transition: 'opacity 0.3s ease' }}
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-gray-900">
          <Image
            src={portfolioImages[currentImageIndex]}
            alt={`Portfolio 3D Rendering Background ${currentImageIndex + 1}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen w-full overflow-hidden pt-20 z-10">
        <div className="relative z-10 w-full h-[calc(100vh-80px)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="absolute bottom-0 left-0 right-0 pb-20 md:pb-28 lg:pb-36 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-2xl space-y-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span
                  className="bg-gradient-to-r bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.accent} 100%)`
                  }}
                >
                  Progettazione 3D
                </span>
                <br />
                <span className="text-white">e Rendering</span>
                <br />
                <span className="text-gray-300">Professionale</span>
              </h1>
              <p className="text-base md:text-lg text-gray-200 leading-relaxed max-w-xl">
                Trasformo le tue idee in visualizzazioni fotorealistiche.
              </p>
              <div className="mt-8">
                <button
                  className="px-8 py-4 font-medium rounded-full border-2 backdrop-blur-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center"
                  style={{
                    borderColor: brandColors.accent,
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }}
                  aria-label="Guarda Showreel"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Guarda Showreel
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {portfolioImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
              }`}
              aria-label={`Vai alla immagine ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Servizi Section */}
      <section id="servizi" ref={servicesRef} className="relative py-24 bg-gray-800/80 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              Soluzioni 3D Complete
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Dalla concezione alla realizzazione finale, offro servizi completi di progettazione 3D per dare vita alle tue idee
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Box className="h-7 w-7" />,
                title: "Modellazione 3D",
                description: "Creazione di modelli 3D ad alta precisione per ogni esigenza progettuale. Dal concept iniziale al modello finale ottimizzato per produzione o visualizzazione.",
                features: ["Modellazione CAD professionale", "Design di prodotto e packaging", "Ottimizzazione per stampa 3D"]
              },
              {
                icon: <Palette className="h-7 w-7" />,
                title: "Rendering Fotorealistico",
                description: "Immagini fotorealistiche di altissima qualità che trasformano i tuoi modelli 3D in presentazioni professionali pronte per marketing e comunicazione.",
                features: ["Illuminazione studio professionale", "Materiali PBR avanzati", "Post-produzione cinematografica"]
              },
              {
                icon: <Layers className="h-7 w-7" />,
                title: "Scansione 3D",
                description: "Acquisizione digitale precisa di oggetti reali trasformati in modelli 3D modificabili. Ideale per reverse engineering e digitalizzazione del patrimonio.",
                features: ["Scansione ad alta risoluzione", "Reverse engineering preciso", "Ricostruzione mesh ottimizzata"]
              }
            ].map((service, index) => (
              <div key={index} className="group relative flex">
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{
                    background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.accent} 100%)`
                  }}
                />
                <div className="relative bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-700 flex flex-col w-full">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.accent} 100%)`
                    }}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                  <p className="text-gray-300 mb-6 flex-grow">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-200">
                        <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" style={{ color: brandColors.accent }} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-gray-900 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span
              className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{
                backgroundColor: brandColors.transparent.light,
                color: 'white'
              }}
            >
              Portfolio
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span
                className="bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${brandColors.primaryDark} 0%, ${brandColors.accent} 100%)`
                }}
              >
                Progetti Recenti
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Una selezione dei miei lavori più recenti nel settore mobile e design di prodotto
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioImages.slice(0, 5).map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-gray-800 border border-gray-700">
                <div className="aspect-w-16 aspect-h-12">
                  <Image
                    src={image}
                    alt={`Progetto ${index + 1}`}
                    width={600}
                    height={400}
                    className="w-full h-[280px] object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold mb-2 text-white">Progetto Mobile {index + 1}</h3>
                    <p className="text-gray-300 text-sm mb-4">Design e rendering fotorealistico</p>
                    <button className="flex items-center text-white font-medium hover:translate-x-2 transition-transform">
                      Vedi Dettagli
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-gray-800 border border-gray-700">
              <div className="aspect-w-16 aspect-h-12">
                <Image
                  src={portfolioImages[0]}
                  alt="Altro progetto"
                  width={600}
                  height={400}
                  className="w-full h-[280px] object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">Progetto Mobile 6</h3>
                  <p className="text-gray-300 text-sm mb-4">Design e rendering fotorealistico</p>
                  <button className="flex items-center text-white font-medium hover:translate-x-2 transition-transform">
                    Vedi Dettagli
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <button
              className="px-8 py-4 text-white font-medium rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center mx-auto group"
              style={{
                background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.accent} 100%)`
              }}
            >
              Esplora Tutto il Portfolio
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden z-10">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${brandColors.primaryDark} 0%, ${brandColors.primary} 50%, ${brandColors.accent} 100%)`
          }}
        />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 border-8 border-white rounded-full -translate-x-20 -translate-y-20" />
          <div className="absolute bottom-0 right-0 w-60 h-60 border-8 border-white rounded-full translate-x-30 translate-y-30" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Pronto a Dare Vita alle Tue Idee?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            Trasformiamo insieme il tuo progetto in visualizzazioni straordinarie che catturano attenzione e comunicano valore.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-white text-gray-900 font-medium rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center group">
              <span style={{ color: brandColors.primary }}>Inizia Ora il Tuo Progetto</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" style={{ color: brandColors.primary }} />
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-medium rounded-full border-2 border-white/30 hover:bg-white/20 transform hover:-translate-y-1 transition-all duration-300">
              Scarica Portfolio PDF
            </button>
          </div>
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center space-x-2 text-white/80">
              <Shield className="h-5 w-5" />
              <span>100% Soddisfazione Garantita</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <Star className="h-5 w-5 text-yellow-400" />
              <span>5★ Valutazione Clienti</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-16 border-t border-gray-700 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div
                  className="w-32 h-12 bg-contain bg-no-repeat bg-center"
                  style={{ backgroundImage: "url('/images/logo.png')" }}
                />
              </div>
              <p className="text-gray-400 text-sm">
                Eccellenza nel design 3D e rendering fotorealistico per progetti innovativi.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Servizi</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                {['Modellazione 3D', 'Rendering', 'Animazione', 'Consulenza'].map((service) => (
                  <li key={service}>
                    <a href="#" className="hover:text-white transition-colors">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Contatti</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  info@likhastudio3d.com
                </li>
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  +39 347 3209167
                </li>
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Manzano, Italia
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Seguimi</h3>
              <div className="flex space-x-4">
                {[
                  { icon: <Linkedin className="h-5 w-5" />, href: "#" },
                  { icon: <Instagram className="h-5 w-5" />, href: "#" },
                  { icon: <Dribbble className="h-5 w-5" />, href: "#" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/10"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 Portfolio Studio. Tutti i diritti riservati. | P.IVA: 00000000000</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio3DHomepage;