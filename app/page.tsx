"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Play, Users2, Trophy, ArrowRight, Music2, Globe, Award, Star, Instagram, Twitter, Linkedin, Disc, Mic2, Headphones, Calendar, MapPin, Ticket, Clock } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 25 }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-black/90 backdrop-blur-xl py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="text-3xl font-black tracking-tighter">
              <span className="text-white">SOFA</span>
              <span className="text-amber-500">PROD</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {[
              { name: "Artists", href: "/artists" },
              { name: "Releases", href: "/releases" },
              { name: "Events", href: "/events" },
              { name: "Studios", href: "/studios" },
              { name: "About", href: "/about" },
            ].map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.href}
                  className="text-lg font-medium text-white/80 hover:text-amber-400 transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/contact")}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full text-black font-bold text-lg shadow-lg hover:shadow-amber-500/30 transition-all"
            >
              Contact
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden z-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="w-8 flex flex-col gap-1.5">
              <motion.span 
                animate={{ 
                  rotate: menuOpen ? 45 : 0,
                  y: menuOpen ? 8 : 0,
                  width: menuOpen ? '100%' : '100%'
                }}
                className="h-0.5 bg-white w-full"
              />
              <motion.span 
                animate={{ opacity: menuOpen ? 0 : 1 }}
                className="h-0.5 bg-white w-full"
              />
              <motion.span 
                animate={{ 
                  rotate: menuOpen ? -45 : 0,
                  y: menuOpen ? -8 : 0,
                  width: menuOpen ? '100%' : '100%'
                }}
                className="h-0.5 bg-white w-full"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 25 }}
            className="lg:hidden fixed inset-0 bg-black/95 backdrop-blur-2xl pt-32 px-6 z-40"
          >
            <div className="flex flex-col gap-8 text-2xl">
              {[
                { name: "Artists", href: "/artists" },
                { name: "Releases", href: "/releases" },
                { name: "Events", href: "/events" },
                { name: "Studios", href: "/studios" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <motion.div
                  key={item.name}
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.1 * (["Artists", "Releases", "Events", "Studios", "About", "Contact"].indexOf(item.name) + 1) }}
                >
                  <Link
                    href={item.href}
                    className="text-white/80 hover:text-amber-400 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="absolute bottom-12 left-6 right-6 flex gap-6">
              {[Instagram, Twitter, Linkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white/60 hover:text-amber-400 transition-colors"
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Featured artists data
  const featuredArtists = [
    {
      name: "NOVA",
      genre: "Electronic",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=2070",
      followers: "2.5M",
      latestRelease: "Cosmic Dreams"
    },
    {
      name: "LUNA",
      genre: "R&B/Soul",
      image: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=2070",
      followers: "3.2M",
      latestRelease: "Midnight Serenade"
    },
    {
      name: "THE GROOVE",
      genre: "Rock/Pop",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=2070",
      followers: "1.8M",
      latestRelease: "Electric Soul"
    }
  ];

  // Upcoming events data
  const upcomingEvents = [
    {
      title: "SUMMER FESTIVAL 2024",
      date: "JULY 15-17, 2024",
      location: "PARIS, FRANCE",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=2070",
      status: "ON SALE NOW"
    },
    {
      title: "WORLD TOUR 2024",
      date: "SEPT - DEC 2024",
      location: "EUROPE & ASIA",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=2070",
      status: "COMING SOON"
    }
  ];


  const featuredEvent = {
    title: "SOFAPALOOZA 2024",
    date: "JULY 20, 2024",
    location: "STADE DE FRANCE, PARIS",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1974",
    artists: [
      { name: "NOVA", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=2070" },
      { name: "LUNA", image: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=2070" },
      { name: "THE GROOVE", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=2070" },
      { name: "+15 SPECIAL GUESTS", image: "" }
    ],
    targetDate: new Date("2024-07-20T20:00:00")
  };

  const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
    const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    });
  
    useEffect(() => {
      const interval = setInterval(() => {
        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();
  
        if (difference <= 0) {
          clearInterval(interval);
          return;
        }
  
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
        setTimeLeft({ days, hours, minutes, seconds });
      }, 1000);
  
      return () => clearInterval(interval);
    }, [targetDate]);
  
    return (
      <div className="flex gap-4 md:gap-8">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="text-center">
            <div className="text-4xl md:text-6xl font-black bg-gradient-to-b from-amber-500 to-amber-600 bg-clip-text text-transparent">
              {value.toString().padStart(2, '0')}
            </div>
            <div className="text-sm md:text-base uppercase tracking-wider text-white/60">
              {unit}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <main className="relative bg-black text-white overflow-hidden" ref={containerRef}>
      {/* Noise overlay */}
      <div className="fixed inset-0 opacity-5 noise z-0 pointer-events-none" />
      
      {/* Glow effects */}
      <div className="fixed top-1/4 -left-20 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl -z-10" />
      <div className="fixed bottom-1/4 -right-20 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl -z-10" />

      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity, scale }}
          className="absolute inset-0 z-0"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-crowd-of-people-at-a-concert-1462-large.mp4" type="video/mp4" />
          </video>
        </motion.div>

        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center"
          >
            <h1 className="text-[10vw] font-black leading-none tracking-tighter mb-6">
              <span className="text-white">SOFA</span>
              <br />
              <span className="text-amber-500">PRODUCTIONS</span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-12"
            >
              Shaping the future of music and entertainment through innovative production and artist development.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <Link
                href="/artists"
                className="inline-flex items-center gap-3 text-lg border-2 border-amber-500 px-8 py-4 rounded-full hover:bg-amber-500 hover:text-black transition-all duration-300 group"
              >
                Explore Our Artists
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          style={{ y }}
          className="absolute bottom-12 left-0 right-0 flex justify-center z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/60">
              <path d="M7 13L12 18L17 13M7 6L12 11L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Marquee Section */}
      <section className="py-16 overflow-hidden border-y border-white/10 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/0 to-black z-10" />
        <div className="marquee">
          <div className="marquee-content text-[5vw] font-black uppercase tracking-wider opacity-20">
            {Array(5).fill("ARTIST DEVELOPMENT • MUSIC PRODUCTION • WORLD TOURS • LABEL SERVICES • EVENT PRODUCTION • BRAND PARTNERSHIPS •").map((item, i) => (
              <span key={i} className="whitespace-nowrap mx-8">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

         {/* Featured Event Section - SOFAPALOOZA 2024 */}
         <section id="featured-event" className="relative min-h-screen py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={featuredEvent.image}
            alt={featuredEvent.title}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-black/90" />
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-white">FEATURED</span>
              <span className="text-amber-500"> EVENT</span>
            </h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mb-8" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="mb-12">
                <h3 className="text-5xl md:text-7xl font-black mb-6 text-amber-500">{featuredEvent.title}</h3>
                <div className="flex items-center gap-4 text-xl mb-6">
                  <Calendar className="w-6 h-6 text-amber-500" />
                  <span>{featuredEvent.date}</span>
                </div>
                <div className="flex items-center gap-4 text-xl mb-8">
                  <MapPin className="w-6 h-6 text-amber-500" />
                  <span>{featuredEvent.location}</span>
                </div>
                <p className="text-xl text-white/80 mb-12 leading-relaxed">
                  The most anticipated music festival of the year featuring our entire roster plus special guests. An unforgettable night of music, art, and immersive experiences.
                </p>
              </div>

              <div className="mb-16">
                <h4 className="text-2xl font-bold mb-6">COUNTDOWN TO EVENT</h4>
                <CountdownTimer targetDate={featuredEvent.targetDate} />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-amber-500 text-black rounded-full font-bold text-lg hover:bg-amber-600 transition-colors flex items-center gap-2 justify-center">
                  <Ticket className="w-5 h-5" />
                  GET TICKETS
                </button>
                <button className="px-8 py-4 border-2 border-white rounded-full font-bold text-lg hover:bg-white hover:text-black transition-colors flex items-center gap-2 justify-center">
                  <Clock className="w-5 h-5" />
                  FULL LINEUP
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {featuredEvent.artists.map((artist, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -10 }}
                    className={`relative rounded-xl overflow-hidden ${index === 3 ? "bg-gradient-to-br from-purple-500/20 to-amber-500/20 p-8 flex items-center justify-center" : "aspect-square"}`}
                  >
                    {artist.image ? (
                      <>
                        <img
                          src={artist.image}
                          alt={artist.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute inset-0 p-4 flex flex-col justify-end">
                          <h4 className="text-xl font-bold">{artist.name}</h4>
                        </div>
                      </>
                    ) : (
                      <h4 className="text-xl font-bold text-center">{artist.name}</h4>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Event Highlights */}
        <div className="relative z-10 container mx-auto px-6 mt-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-black mb-6">
              <span className="text-white">EVENT</span>
              <span className="text-amber-500"> HIGHLIGHTS</span>
            </h3>
            <div className="w-16 h-1 bg-amber-500 mx-auto mb-8" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Music2 className="w-8 h-8" />,
                title: "3 STAGES",
                description: "Main stage, electronic tent, and intimate acoustic lounge"
              },
              {
                icon: <Disc className="w-8 h-8" />,
                title: "SPECIAL COLLAB",
                description: "Exclusive live performances you won't see anywhere else"
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "VIP EXPERIENCE",
                description: "Premium viewing areas, private bars, and artist meet & greets"
              }
            ].map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-b from-white/5 to-white/0 rounded-2xl p-8 border border-white/10 hover:border-amber-500/30 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mb-6 text-amber-500">
                  {highlight.icon}
                </div>
                <h4 className="text-2xl font-bold mb-4">{highlight.title}</h4>
                <p className="text-white/70">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-black mb-8">
                <span className="text-white">GLOBAL MUSIC</span>
                <br />
                <span className="text-amber-500">POWERHOUSE</span>
              </h2>
              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                Founded in 2010, SOFA Productions has grown into a leading international music production and artist management company. We specialize in discovering and developing exceptional talent, creating unforgettable live experiences, and producing cutting-edge music.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-12">
                {[
                  { value: "500+", label: "Events Produced" },
                  { value: "50+", label: "Countries" },
                  { value: "100M+", label: "Streams" },
                  { value: "20+", label: "Awards" }
                ].map((stat, index) => (
                  <div key={index} className="border-l-2 border-amber-500 pl-4">
                    <p className="text-3xl font-bold mb-1">{stat.value}</p>
                    <p className="text-white/60">{stat.label}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-3 text-lg border-2 border-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 group"
              >
                Our Story
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=2070"
                  alt="SOFA Productions Team"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-8 -right-8 w-2/3"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-dj-mixing-vinyls-1230-large.mp4" type="video/mp4" />
                  </video>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-gradient-to-b from-black to-black/50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-black mb-6">
              <span className="text-white">OUR</span>
              <span className="text-amber-500"> SERVICES</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Comprehensive solutions for artists and brands at every stage of their journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Mic2 className="w-8 h-8" />,
                title: "Artist Management",
                description: "Full-service career development, strategic planning, and day-to-day management for emerging and established artists.",
                features: ["Brand Development", "Tour Management", "Contract Negotiation"]
              },
              {
                icon: <Disc className="w-8 h-8" />,
                title: "Music Production",
                description: "World-class recording, mixing, and mastering services in our state-of-the-art studios.",
                features: ["Album Production", "Songwriting Camps", "Sound Design"]
              },
              {
                icon: <Headphones className="w-8 h-8" />,
                title: "Label Services",
                description: "Comprehensive distribution, marketing, and promotion for independent artists and labels.",
                features: ["Global Distribution", "Playlist Pitching", "Radio Promotion"]
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-b from-white/5 to-white/0 rounded-2xl p-8 border border-white/10 hover:border-amber-500/30 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mb-6 text-amber-500">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-white/70 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/80">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-amber-500">
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artists Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16"
          >
            <div>
              <h2 className="text-5xl font-black mb-4">
                <span className="text-white">FEATURED</span>
                <span className="text-amber-500"> ARTISTS</span>
              </h2>
              <p className="text-xl text-white/70 max-w-xl">
                Discover the exceptional talent we're proud to represent.
              </p>
            </div>
            <Link
              href="/artists"
              className="inline-flex items-center gap-3 mt-8 md:mt-0 text-lg border-2 border-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 group"
            >
              View All Artists
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArtists.map((artist, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4]"
              >
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-amber-500 font-medium mb-2">{artist.genre}</p>
                    <h3 className="text-4xl font-black mb-2">{artist.name}</h3>
                    <p className="text-white/80 mb-4">{artist.followers} Followers</p>
                    <p className="text-white/60 mb-6">Latest: {artist.latestRelease}</p>
                    <Link
                      href={`/artists/${artist.name.toLowerCase()}`}
                      className="inline-flex items-center gap-2 text-sm font-medium hover:text-amber-500 transition-colors"
                    >
                      View Profile
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-32 bg-gradient-to-b from-black/50 to-black relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-black mb-6">
              <span className="text-white">UPCOMING</span>
              <span className="text-amber-500"> EVENTS</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Experience the energy of our live productions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl aspect-[16/9]"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-4 py-1 bg-amber-500 text-black rounded-full text-sm font-bold mb-4">
                      {event.status}
                    </span>
                    <h3 className="text-4xl font-black mb-2">{event.title}</h3>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                      <div className="flex items-center gap-3 text-white/80 mb-2">
                        <Calendar className="w-5 h-5" />
                        <p>{event.date}</p>
                      </div>
                      <div className="flex items-center gap-3 text-white/80">
                        <MapPin className="w-5 h-5" />
                        <p>{event.location}</p>
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-amber-500 transition-colors">
                      Get Tickets
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Releases Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16"
          >
            <div>
              <h2 className="text-5xl font-black mb-4">
                <span className="text-white">LATEST</span>
                <span className="text-amber-500"> RELEASES</span>
              </h2>
              <p className="text-xl text-white/70 max-w-xl">
                Discover our newest music productions.
              </p>
            </div>
            <Link
              href="/releases"
              className="inline-flex items-center gap-3 mt-8 md:mt-0 text-lg border-2 border-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 group"
            >
              View All Releases
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                title: "Cosmic Dreams",
                artist: "NOVA",
                cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=2070",
                date: "March 2024",
                type: "Single"
              },
              {
                title: "Midnight Serenade",
                artist: "LUNA",
                cover: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=2070",
                date: "February 2024",
                type: "EP"
              },
              {
                title: "Electric Soul",
                artist: "THE GROOVE",
                cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=2070",
                date: "January 2024",
                type: "Album"
              },
              {
                title: "Urban Beats Vol. 3",
                artist: "Various Artists",
                cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=2070",
                date: "December 2023",
                type: "Compilation"
              }
            ].map((release, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative aspect-square mb-4 rounded-xl overflow-hidden">
                  <img
                    src={release.cover}
                    alt={release.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-black" />
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg">{release.title}</h3>
                  <p className="text-white/60">{release.artist}</p>
                  <div className="flex justify-between items-center mt-2 text-sm">
                    <span className="text-white/50">{release.date}</span>
                    <span className="px-2 py-1 bg-white/10 rounded-full">{release.type}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-purple-500/10 -z-10" />
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/5 to-white/0 rounded-3xl p-12 md:p-16 border border-white/10 backdrop-blur-lg"
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-black mb-8">
                <span className="text-white">READY TO ELEVATE</span>
                <span className="text-amber-500"> YOUR CAREER?</span>
              </h2>
              <p className="text-xl text-white/70 mb-12">
                Whether you're an artist looking for representation, a brand seeking partnership opportunities, or an event organizer, we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-amber-500 text-black rounded-full font-bold text-lg hover:bg-amber-600 transition-colors"
                >
                  Get In Touch
                </Link>
                <Link
                  href="/services"
                  className="px-8 py-4 border-2 border-white rounded-full font-bold text-lg hover:bg-white hover:text-black transition-colors"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/90 backdrop-blur-lg border-t border-white/10 pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div>
              <h3 className="text-3xl font-black mb-6">
                <span className="text-white">SOFA</span>
                <span className="text-amber-500">PROD</span>
              </h3>
              <p className="text-white/60 mb-6 leading-relaxed">
                Leading the future of music production and artist development since 2010.
              </p>
              <div className="flex gap-4">
                {[Instagram, Twitter, Linkedin].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-white/60 hover:text-amber-500 transition-colors"
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">Navigation</h4>
              <ul className="space-y-3">
                {[
                  { name: "Home", href: "/" },
                  { name: "Artists", href: "/artists" },
                  { name: "Releases", href: "/releases" },
                  { name: "Events", href: "/events" },
                  { name: "Studios", href: "/studios" },
                  { name: "About", href: "/about" },
                  { name: "Contact", href: "/contact" }
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-white/60 hover:text-amber-500 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">Services</h4>
              <ul className="space-y-3">
                {[
                  "Artist Management",
                  "Music Production",
                  "Event Production",
                  "Label Services",
                  "Brand Partnerships",
                  "Tour Management",
                  "Creative Direction"
                ].map((service, index) => (
                  <li key={index}>
                    <a href="#" className="text-white/60 hover:text-amber-500 transition-colors">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">Contact</h4>
              <address className="not-italic text-white/60 space-y-3">
                <p>123 Music Avenue</p>
                <p>Paris, France 75000</p>
                <p>
                  <a href="mailto:info@sofaprod.com" className="hover:text-amber-500 transition-colors">
                    info@sofaprod.com
                  </a>
                </p>
                <p>
                  <a href="tel:+33123456789" className="hover:text-amber-500 transition-colors">
                    +33 1 23 45 67 89
                  </a>
                </p>
              </address>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40">
              © {new Date().getFullYear()} SOFA Productions. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-white/40 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors text-sm">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
