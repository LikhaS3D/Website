'use client';
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
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
  Dribbble,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

const brandColors = {
  primary: 'rgb(0, 60, 90)',
  primaryLight: 'rgb(0, 80, 120)',
  primaryDark: 'rgb(0, 40, 60)',
  accent: 'rgb(0, 100, 150)',
  accentBright: 'rgb(0, 150, 220)',
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
  '/images/presentazione-5.png',
];

const Portfolio3DHomepage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const servicesRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
    setScrollPosition(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % portfolioImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [portfolioImages.length]);

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

  const [screenType, setScreenType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

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

  const getMosaicLayout = () => {
    const layouts: Record<'mobile' | 'tablet' | 'desktop', { images: number; cols: number; config: Array<{ width: number; height: number }> }> = {
      desktop: {
        images: 10,
        cols: 6,
        config: [
          { width: 2, height: 2 }, { width: 1, height: 1 }, { width: 1, height: 1 }, { width: 2, height: 2 }, { width: 1, height: 1 }, { width: 1, height: 1 },
          { width: 1, height: 1 }, { width: 1, height: 1 }, { width: 2, height: 1 }, { width: 2, height: 1 },
        ]
      },
      tablet: {
        images: 12,
        cols: 4,
        config: [
          { width: 2, height: 2 }, { width: 1, height: 1 }, { width: 1, height: 1 }, { width: 2, height: 1 },
          { width: 1, height: 1 }, { width: 1, height: 1 }, { width: 2, height: 2 }, { width: 1, height: 1 },
          { width: 1, height: 1 }, { width: 2, height: 1 }, { width: 1, height: 1 }, { width: 1, height: 1 },
        ]
      },
      mobile: {
        images: 8,
        cols: 2,
        config: [
          { width: 1, height: 1 }, { width: 1, height: 1 }, { width: 2, height: 1 }, { width: 1, height: 1 },
          { width: 1, height: 1 }, { width: 2, height: 1 }, { width: 1, height: 1 }, { width: 1, height: 1 },
        ]
      }
    };

    return layouts[screenType];
  };

  const currentLayout = useMemo(() => getMosaicLayout(), [screenType]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validazione client-side
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      console.error('Errore: Completa tutti i campi');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const dataToSend = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      };

      console.log('Dati inviati:', dataToSend);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitStatus('error');
        console.error('Errore API:', data.error);
        return;
      }

      setSubmitStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
      setTimeout(() => {
        setIsContactOpen(false);
        setSubmitStatus('idle');
      }, 2000);

    } catch (error) {
      console.error('Errore network:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
              <a
                href="#servizi"
                className="px-4 py-2 text-white font-medium rounded-full shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300 text-sm"
                style={{
                  background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.accent} 100%)`
                }}
              >
                Servizi
              </a>
              <button
                onClick={() => {
                  setIsContactOpen(true);
                  setSubmitStatus('idle');
                }}
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
              <Link href="/" className="block py-2 text-gray-300 hover:text-white transition-all">Home</Link>
              <Link href="/portfolio" className="block py-2 text-gray-300 hover:text-white transition-all">Portfolio</Link>
              <a href="#servizi" className="block py-2 text-gray-300 hover:text-white transition-all">Servizi</a>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsContactOpen(true);
                  setSubmitStatus('idle');
                }}
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
        <div className="absolute inset-0 w-full h-screen overflow-hidden bg-gray-900">
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
              aria-label={`Vai all'immagine ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 md:py-24 bg-gray-900 relative z-10 w-full">
        <div className="text-center mb-12 md:mb-16 px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight text-white">
            Progetti Recenti
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            Una selezione dei miei lavori più recenti nel settore mobile e design di prodotto
          </p>
        </div>

        <div
          id="portfolio-grid"
          className="w-full mx-auto"
          style={{
            maxWidth: '100%',
            display: 'grid',
            gridTemplateColumns: `repeat(${currentLayout.cols}, 1fr)`,
            gap: '10px',
            padding: '0 10px',
          }}
        >
          {Array.from({ length: currentLayout.images }).map((_, index) => {
            const layout = currentLayout.config[index];

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
                <Image
                  src={`/images/portfolio/${index + 1}.jpg`}
                  alt={`Progetto ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  priority={index < 3}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
              </div>
            );
          })}
        </div>

        <style jsx>{`
          #portfolio-grid {
            grid-template-columns: var(--grid-cols, repeat(6, 1fr));
          }
        `}</style>

        <div className="text-center mt-16 px-6">
          <Link
            href="/portfolio"
            className="px-8 py-4 text-white font-medium rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center group"
            style={{
              background: `linear-gradient(135deg, ${brandColors.accentBright} 0%, ${brandColors.accentBright} 100%)`,
              boxShadow: `0 0 30px ${brandColors.accentBright}40`
            }}
          >
            Esplora Tutto il Portfolio
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Servizi Section */}
      <section id="servizi" ref={servicesRef} className="relative py-12 md:py-24 bg-gray-800/80 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-white">
              Soluzioni 3D Complete
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl md:max-w-3xl mx-auto">
              Dalla concezione alla realizzazione finale, offro servizi completi di progettazione 3D per dare vita alle tue idee
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
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
                <div className="relative bg-gray-800 rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-700 flex flex-col w-full h-full">
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.accent} 100%)`
                    }}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">{service.title}</h3>
                  <p className="text-gray-300 mb-4 md:mb-6 flex-grow text-sm md:text-base">
                    {service.description}
                  </p>
                  <ul className="space-y-2 md:space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-200 text-sm md:text-base">
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3 flex-shrink-0" style={{ color: brandColors.accent }} />
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

      {/* CTA Section */}
      <section className="py-12 md:py-24 relative overflow-hidden z-10">
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Pronto a Dare Vita alle Tue Idee?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 md:mb-10 max-w-2xl md:max-w-3xl mx-auto">
            Trasformiamo insieme il tuo progetto in visualizzazioni straordinarie che catturano l&#39;attenzione e comunicano valore.
          </p>
          <div className="flex flex-col gap-3 md:gap-4 justify-center items-center">
            <button 
              onClick={() => {
                setIsContactOpen(true);
                setSubmitStatus('idle');
              }}
              className="px-6 md:px-8 py-3 md:py-4 bg-white text-gray-900 font-medium rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center group text-sm md:text-base"
            >
              <span style={{ color: brandColors.primary }}>Inizia Ora il Tuo Progetto</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" style={{ color: brandColors.primary }} />
            </button>
          </div>
          <div className="mt-12 md:mt-16 flex flex-wrap justify-center items-center gap-6 md:gap-8">
            <div className="flex items-center space-x-2 text-white/80 text-sm md:text-base">
              <Shield className="h-4 w-4 md:h-5 md:w-5" />
              <span>100% Soddisfazione Garantita</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80 text-sm md:text-base">
              <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-400" />
              <span>5★ Valutazione Clienti</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsContactOpen(false)}
          />
          <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-lg z-10">
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-gray-200">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Contact Sales</h2>
              <button
                onClick={() => setIsContactOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            
            <div className="p-6 md:p-8">
              {submitStatus === 'success' && (
                <div className="flex items-center space-x-3 bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Email inviata con successo!</p>
                    <p className="text-sm text-green-700">Ti contatterò presto.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center space-x-3 bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-medium text-red-900">Errore nell'invio</p>
                    <p className="text-sm text-red-700">Riprova più tardi.</p>
                  </div>
                </div>
              )}

              {submitStatus !== 'success' && (
                <>
                  <p className="text-gray-600 mb-6 text-sm md:text-base">
                    Let's get this conversation started. Tell us a bit about yourself, and we'll get in touch as soon as we can.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleFormChange}
                          disabled={isSubmitting}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleFormChange}
                          disabled={isSubmitting}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Work Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        disabled={isSubmitting}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100 text-gray-900 placeholder-gray-500"
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        disabled={isSubmitting}
                        required
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none disabled:bg-gray-100 text-gray-900 placeholder-gray-500"
                        placeholder="Tell us about your project..."
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 text-white font-medium rounded-lg transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.accent} 100%)`
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                          Invio in corso...
                        </>
                      ) : (
                        'Contact Sales'
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 md:py-16 border-t border-gray-700 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-3 md:mb-4">
                <div
                  className="w-28 md:w-32 h-10 md:h-12 bg-contain bg-no-repeat bg-center"
                  style={{ backgroundImage: "url('/images/logo.png')" }}
                />
              </div>
              <p className="text-gray-400 text-xs md:text-sm">
                Eccellenza nel design 3D e rendering fotorealistico per progetti innovativi.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 md:mb-4 text-white text-sm md:text-base">Servizi</h3>
              <ul className="space-y-1.5 md:space-y-2">
                {['Modellazione 3D', 'Rendering', 'Animazione', 'Consulenza'].map((service) => (
                  <li key={service}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-xs md:text-sm">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 md:mb-4 text-white text-sm md:text-base">Contatti</h3>
              <ul className="space-y-1.5 md:space-y-2">
                <li className="flex items-center text-gray-400 text-xs md:text-sm">
                  <Mail className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 md:mr-2" />
                  info@likhastudio3d.com
                </li>
                <li className="flex items-center text-gray-400 text-xs md:text-sm">
                  <MapPin className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 md:mr-2" />
                  Manzano, Italia
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 md:mb-4 text-white text-sm md:text-base">Seguimi</h3>
              <div className="flex space-x-3 md:space-x-4">
                {[
                  { icon: <Linkedin className="h-4 w-4 md:h-5 md:w-5" />, href: "#" },
                  { icon: <Instagram className="h-4 w-4 md:h-5 md:w-5" />, href: "#" },
                  { icon: <Dribbble className="h-4 w-4 md:h-5 md:w-5" />, href: "#" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/10"
                    aria-label={`Seguimi su ${['LinkedIn', 'Instagram', 'Dribbble'][index]}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-gray-400 text-xs md:text-sm">
            <p>© 2025 Likha Studio. Tutti i diritti riservati. | P.IVA: 00000000000</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio3DHomepage;