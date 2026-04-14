import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Cpu, Database, Shield,
  Menu, X, ArrowRight, ArrowUpRight, Mail, MapPin,
  Linkedin, Twitter, Github, FileText, Languages, Leaf, Send
} from 'lucide-react';

// Images
const heroImage       = new URL('./images/ai_research-hero.jpg',    import.meta.url).href;
const stiLogo         = new URL('./images/STI-Logo.png',            import.meta.url).href;
const marconiLogoDark = new URL('./images/marconi_mak_black.png',   import.meta.url).href;
const makAILogo       = new URL('./images/Mak-AI neutral.png',      import.meta.url).href;
const renuLogo        = new URL('./images/RENU_logo.png',           import.meta.url).href;

const CATALOG_URL = 'https://staging-makerere-university-ai4d-hub.marconilab.org/';

const NAV_LINKS = [
  { label: 'Infrastructure', href: '#infrastructure' },
  { label: 'Datasets',       href: '#datasets' },
  { label: 'Partners',       href: '#partners' },
  { label: 'About',          href: '#about' },
];

const FEATURES = [
  {
    icon: <Cpu className="w-6 h-6" />,
    title: 'High-Performance GPU Clusters',
    desc: 'State of the art GPU infrastructure for deep learning training, large scale inference, and distributed scientific computing, available to every Ugandan researcher.',
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: 'National Data Repository',
    desc: 'Curated, high quality datasets spanning agriculture, healthcare, linguistics and climate, built for African research contexts.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Sovereign and Secure',
    desc: 'Data stays in Uganda. Built on open source foundations with institutional controls aligned to national data protection policy.',
  },
];

type Category = 'Agriculture' | 'Linguistics' | 'Computer Vision';
const CAT_ICON: Record<Category, React.ReactNode> = {
  Agriculture:      <Leaf className="w-4 h-4" />,
  Linguistics:      <Languages className="w-4 h-4" />,
  'Computer Vision':<FileText className="w-4 h-4" />,
};

const DATASETS: Array<{
  title: string; category: Category; license: string; date: string; desc: string;
}> = [
  {
    title: 'Dataset of Crops Part One',
    category: 'Agriculture',
    license: 'CC0 1.0',
    date: 'January 03, 2024',
    desc: 'Five classes of training data: cassava, sugarcane, maize, cashew, and coffee images. Part one of a seven class crop classification dataset totalling 4,074 images across train, validation and test splits with augmentation.',
  },
  {
    title: 'Data of Crops Part Two',
    category: 'Agriculture',
    license: 'CC BY 4.0',
    date: 'January 03, 2024',
    desc: 'Companion to Part One. Contains the remaining weeds and unknown classes plus validation and test data across all seven classes. Combine with Part One for full classification training.',
  },
  {
    title: 'Multilingual Parallel Text Corpora for East African Languages',
    category: 'Linguistics',
    license: 'CC BY 4.0',
    date: 'December 05, 2023',
    desc: 'Partial multilingual parallel corpora of five East African languages. An English text corpus translated into Acholi, Runyankore, Luganda, Lumasaba and Swahili.',
  },
  {
    title: 'Coffee and Cashew Nut Dataset',
    category: 'Computer Vision',
    license: 'CC0 1.0',
    date: 'November 10, 2023',
    desc: 'High resolution UAV imagery of coffee and cashew plants from small and large scale farms across Uganda. Each image is annotated with bounding boxes and geotagged metadata.',
  },
  {
    title: 'Makerere Luganda Agricultural Text Data',
    category: 'Linguistics',
    license: 'CC BY 4.0',
    date: 'May 02, 2023',
    desc: 'Domain specific Luganda sentences covering farming, animal breeding, crop cultivation, storage, yield and marketing. Built for machine translation, language modelling and named entity recognition.',
  },
  {
    title: 'Sentiment Tagged Parallel Corpus for Luganda and Swahili',
    category: 'Linguistics',
    license: 'CC BY 4.0',
    date: 'March 24, 2023',
    desc: '10,000 parallel sentiment tagged sentences. English sentences translated by language experts to both Luganda and Swahili, each carrying a sentiment code aligned to the English source.',
  },
  {
    title: 'Kiswahili Monolingual Corpus',
    category: 'Linguistics',
    license: 'CC BY 4.0',
    date: 'March 22, 2023',
    desc: '100,000 Kiswahili sentences sourced in collaboration with Makerere AI Lab, Marconi Lab, Ai Kenya, Maseno University, USIU Africa, Kabarak University and TYD Innovation Incubator. Supported by Lacuna Fund.',
  },
  {
    title: 'Luganda Monolingual Corpus',
    category: 'Linguistics',
    license: 'CC BY 4.0',
    date: 'March 22, 2023',
    desc: '100,000 Luganda sentences curated with the Department of African Languages at Makerere University, Ekibiina Ky\'Olulimi Oluganda (EKO) and the Buganda Kingdom.',
  },
];

const PARTNERS = [
  { src: stiLogo,         alt: 'STI',         name: 'Ministry of Science, Technology & Innovation' },
  { src: marconiLogoDark, alt: 'Marconi Lab', name: 'Marconi Lab, Makerere University' },
  { src: makAILogo,       alt: 'Mak-AI',      name: 'Mak-AI Research Centre' },
  { src: renuLogo,        alt: 'RENU',        name: 'Research & Education Network of Uganda' },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="min-h-screen bg-paper font-body text-ink">

      {/* NAV */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-paper-line shadow-sm'
          : 'bg-white/85 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            <a href="#" className="flex items-baseline">
              <span className="font-display font-bold text-base md:text-lg text-ink tracking-tight">
                National AI Research Cloud
              </span>
            </a>

            <nav className="hidden lg:flex items-center gap-9">
              {NAV_LINKS.map(link => (
                <a key={link.label} href={link.href}
                  className="nav-link font-body text-[15px] font-medium text-ink-soft hover:text-brand transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <a href="#about"
                className="btn-solid px-6 py-2.5 font-display font-semibold text-sm inline-flex items-center gap-2"
              >
                Request for Access
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <button className="lg:hidden text-ink p-2" onClick={() => setMenuOpen(v => !v)}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="lg:hidden overflow-hidden bg-white border-t border-paper-line"
          >
            <div className="px-6 py-6 space-y-5">
              {NAV_LINKS.map(link => (
                <a key={link.label} href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block font-display font-medium text-ink-soft hover:text-brand"
                >{link.label}</a>
              ))}
              <a href="#about" onClick={() => setMenuOpen(false)}
                className="btn-solid w-full block text-center py-3 font-display font-semibold text-sm"
              >
                Request for Access
              </a>
            </div>
          </motion.div>
        )}
      </header>

      {/* HERO */}
      <section className="relative pt-28 lg:pt-36 pb-0 blue-wash overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />

        {/* Decorative blueprint marks */}
        <div className="hidden md:block absolute top-28 left-10 w-16 h-px bg-brand/40" />
        <div className="hidden md:block absolute top-28 left-10 w-px h-16 bg-brand/40" />
        <div className="hidden md:block absolute top-28 right-10 w-16 h-px bg-brand/40" />
        <div className="hidden md:block absolute top-28 right-10 w-px h-16 bg-brand/40 right-[calc(2.5rem)]" />

        <div className="max-w-5xl mx-auto px-6 lg:px-10 relative text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold text-[clamp(2.25rem,5.4vw,5.25rem)] leading-[1.02] tracking-tight text-ink"
          >
            Powering Uganda's <br className="hidden sm:block" />
            <span className="text-brand relative inline-block">
              AI Research
              <span className="absolute left-0 right-0 -bottom-1 h-[6px] bg-brand/15 -z-10" />
            </span>{' '}
            Frontier.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg text-ink-dim leading-[1.7] max-w-2xl mx-auto mt-7"
          >
            The National AI Research Cloud delivers high performance compute
            and curated datasets to every Ugandan researcher.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4 pt-9 justify-center"
          >
            <a href="#about"
              className="btn-solid px-7 py-3.5 font-display font-semibold text-[15px] inline-flex items-center gap-2"
            >
              Request for Access
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#datasets"
              className="btn-outline px-7 py-3.5 font-display font-semibold text-[15px] inline-flex items-center gap-2"
            >
              Browse Datasets
            </a>
          </motion.div>

          {/* Vertical bridge line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="mx-auto mt-14 w-px h-20 bg-gradient-to-b from-transparent via-brand/40 to-brand origin-top"
          />
        </div>

        {/* Image band — integrated via overlap + frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-7xl mx-auto px-6 lg:px-10 relative -mt-4"
        >
          <div className="relative">
            {/* Offset blue frame behind image */}
            <div className="absolute -inset-3 md:-inset-4 bg-brand translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 -z-10" />

            <div className="hero-frame aspect-[21/10] md:aspect-[21/9] shadow-2xl shadow-brand/40 ring-1 ring-brand/20">
              <img
                src={heroImage}
                alt="AI Research at National AI Research Cloud Uganda"
                className="w-full h-full object-cover"
              />

              {/* Corner tag — top left */}
              <div className="absolute top-0 left-0 bg-brand text-white px-4 py-2 font-display font-semibold text-[11px] uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg">
                <span className="w-1.5 h-1.5 bg-white animate-pulse" />
                Research in Progress
              </div>

              {/* Gradient overlay at bottom for depth */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-deep/40 to-transparent pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* Bottom spacer band that transitions to next section */}
        <div className="h-20 lg:h-28" />
      </section>

      {/* INFRASTRUCTURE */}
      <section id="infrastructure" className="py-24 lg:py-32 bg-brand-tint">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mb-16">
            <span className="eyebrow mb-5">What We Offer</span>
            <h2 className="font-display font-bold text-4xl md:text-5xl leading-[1.1] text-ink mt-5 mb-5">
              World class infrastructure, <span className="text-brand">built for Ugandan researchers.</span>
            </h2>
            <p className="text-lg text-ink-dim leading-[1.7]">
              Everything you need to compete on the global stage of artificial
              intelligence, hosted at home, governed locally, open to every
              member institution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="feature-card p-8 lg:p-10"
              >
                <div className="w-12 h-12 bg-brand-soft text-brand flex items-center justify-center mb-6">
                  {f.icon}
                </div>
                <h3 className="font-display font-bold text-xl text-ink mb-3">{f.title}</h3>
                <p className="text-ink-dim leading-[1.7]">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DATASETS */}
      <section id="datasets" className="py-24 lg:py-32 deep-blue relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-light opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <div className="max-w-2xl">
              <span className="inline-block font-display font-semibold text-xs uppercase tracking-[0.18em] text-white/70 mb-4">
                <span className="inline-block w-3 h-[2px] bg-white/70 align-middle mr-3" />
                National Data Catalog
              </span>
              <h2 className="font-display font-bold text-4xl md:text-5xl leading-[1.1] text-white mt-2">
                Datasets for <span className="text-brand-soft/90 italic">research.</span>
              </h2>
              <p className="text-white/70 mt-5 leading-[1.7] max-w-xl">
                Open, locally curated datasets spanning agriculture, linguistics,
                computer vision, health and climate.
              </p>
            </div>
            <a href={CATALOG_URL} target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-white text-brand px-6 py-3 font-display font-semibold text-sm self-start md:self-end hover:bg-brand-soft transition-colors"
            >
              View Full Catalog
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {DATASETS.map((ds, i) => (
              <motion.a
                key={i}
                href={CATALOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="ds-card p-6 flex flex-col group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="inline-flex items-center gap-2 text-brand">
                    <span className="w-8 h-8 bg-brand-tint flex items-center justify-center">
                      {CAT_ICON[ds.category]}
                    </span>
                    <span className="font-display font-semibold text-xs uppercase tracking-wider text-ink-soft">
                      {ds.category}
                    </span>
                  </div>
                  <ArrowUpRight className="ds-arrow w-5 h-5 text-ink-faint" />
                </div>

                <h3 className="font-display font-bold text-lg text-ink leading-[1.3] mb-3 group-hover:text-brand transition-colors">
                  {ds.title}
                </h3>
                <p className="text-sm text-ink-dim leading-[1.65] mb-6 flex-grow">
                  {ds.desc}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-paper-line">
                  <span className="license-badge">{ds.license}</span>
                  <span className="text-xs text-ink-faint font-display font-medium">
                    {ds.date}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a href={CATALOG_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white font-display font-semibold text-sm border-b border-white/30 hover:border-white pb-1 transition-all"
            >
              Explore the full Makerere AI4D Hub
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section id="partners" className="py-20 bg-paper-off border-y border-paper-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <span className="eyebrow">In Partnership With</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 bg-white border border-paper-line">
            {PARTNERS.map(({ src, alt }, i) => (
              <motion.div
                key={alt}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`flex items-center justify-center px-6 py-12 hover:bg-brand-tint transition-colors ${
                  i < PARTNERS.length - 1 ? 'md:border-r' : ''
                } border-paper-line ${i < 2 ? 'border-b md:border-b-0' : ''}`}
              >
                <img src={src} alt={alt}
                  className="max-h-16 max-w-[160px] object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="about" className="py-24 lg:py-32 bg-brand relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-light opacity-50 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 lg:px-10 relative text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display font-bold text-4xl md:text-6xl leading-[1.05] text-white mb-8"
          >
            Join the researchers building Uganda's AI future.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-white/85 max-w-2xl mx-auto mb-10 leading-[1.7]"
          >
            Hundreds of scientists, students and institutions rely on the
            National AI Research Cloud to push the frontier of AI in healthcare,
            agriculture, language and climate, anchored in Uganda and open to
            all of Africa.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <a href="mailto:andrew.katumba@mak.ac.ug"
              className="bg-white text-brand px-8 py-4 font-display font-semibold inline-flex items-center gap-2 hover:bg-brand-soft transition-colors"
            >
              Request for Access <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink text-white pt-20 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-light opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-14">

            <div className="md:col-span-5 space-y-6">
              <div className="leading-tight">
                <div className="font-display font-bold text-xl text-white">
                  National AI Research Cloud
                </div>
              </div>
              <p className="text-white/70 leading-[1.7] text-[15px] max-w-md">
                Get in touch with us to collaborate on machine learning based projects.
              </p>

              <div>
                <h4 className="font-display font-semibold text-white text-xs uppercase tracking-[0.18em] mb-3">
                  Follow Us
                </h4>
                <div className="flex items-center gap-3">
                  <a href="#" className="w-9 h-9 border border-white/20 flex items-center justify-center hover:bg-brand hover:border-brand transition-colors" aria-label="Twitter">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-9 h-9 border border-white/20 flex items-center justify-center hover:bg-brand hover:border-brand transition-colors" aria-label="LinkedIn">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-9 h-9 border border-white/20 flex items-center justify-center hover:bg-brand hover:border-brand transition-colors" aria-label="GitHub">
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="md:col-span-4">
              <h4 className="font-display font-semibold text-white text-xs uppercase tracking-[0.18em] mb-5">
                Contact Us
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-sm text-white/75 leading-[1.65]">
                  <MapPin className="w-4 h-4 text-brand-soft mt-0.5 flex-shrink-0" />
                  <span>
                    Makerere University, College of Engineering, Design,
                    Art and Technology<br />
                    Old Building, Room 171
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/75">
                  <Mail className="w-4 h-4 text-brand-soft flex-shrink-0" />
                  <a href="mailto:andrew.katumba@mak.ac.ug" className="hover:text-white transition-colors">
                    andrew.katumba@mak.ac.ug
                  </a>
                </div>
              </div>
            </div>

            <div className="md:col-span-3">
              <h4 className="font-display font-semibold text-white text-xs uppercase tracking-[0.18em] mb-3">
                Newsletter
              </h4>
              <p className="text-sm text-white/70 leading-[1.65] mb-4">
                Get updates, news or events on your mail.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  placeholder="Enter your email.."
                  className="bg-white/5 border border-white/15 text-white placeholder:text-white/40 text-sm px-4 py-3 focus:outline-none focus:border-brand-soft transition-colors"
                />
                <button
                  type="submit"
                  className="bg-brand hover:bg-brand-mid text-white px-5 py-3 font-display font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors"
                >
                  Subscribe <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/50">
              Copyright © 2026. National AI Research Cloud
            </p>
            <div className="flex items-center gap-6 text-xs text-white/50">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              <a href={CATALOG_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1">
                Data Catalog <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
