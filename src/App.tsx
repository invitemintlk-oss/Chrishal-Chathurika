import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  Heart,
  Calendar,
  MapPin,
  Clock,
  Music,
  VolumeX,
  Sparkles,
  Phone,
  Mail
} from 'lucide-react';
import { Toaster } from 'sonner';
import { EnvelopeOpening } from './components/EnvelopeOpening';
import { CountdownTimer } from './components/CountdownTimer';
import { PhotoGallery } from './components/PhotoGallery';
import { EventTimeline } from './components/EventTimeline';
import { RSVPForm } from './components/RSVPForm';
import { BlessingForm } from './components/BlessingForm';
import { FloatingParticles } from './components/FloatingParticles';
import { ImageWithFallback } from './components/ImageWithFallback';
import { readGuestFromLocation } from './guest';

export default function App() {
  const [guestName] = useState(() => readGuestFromLocation());
  const [showInvitation, setShowInvitation] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    audioRef.current = new Audio('/paulyudin-wedding-485932.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    audioRef.current.preload = 'auto';

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleMusicStart = () => {
    setIsMusicPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };



  if (!showInvitation) {
    return (
      <EnvelopeOpening
        onComplete={() => setShowInvitation(true)}
        onMusicStart={handleMusicStart}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100/40 relative overflow-x-hidden">
      <Toaster position="top-center" />
      <FloatingParticles />

      {/* Music Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#7d8f4e] to-[#3b4a24] text-white shadow-[0_4px_20px_rgba(125,143,78,0.4)] flex items-center justify-center hover:scale-110 transition-transform border border-lime-200/40"
      >
        {isMusicPlaying ? <Music className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
      </motion.button>

      {/* Parallax Background */}
      <motion.div
        className="fixed inset-0 pointer-events-none opacity-10"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#7d8f4e]/30 via-transparent to-transparent" />
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center justify-center px-4">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Hero Background"
            className="w-full h-full object-cover blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white/95" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          {/* Decorative Top */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="mb-8 flex justify-center"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7d8f4e] to-[#556b2f] flex items-center justify-center">
              <Heart className="w-10 h-10 text-white" fill="white" />
            </div>
          </motion.div>

          {/* Pre-title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-[#7d8f4e] text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.5em] font-serif mb-6 uppercase"
          >
            Promise Of Love
          </motion.div>

          {/* Verse */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="text-base sm:text-lg text-[#4a5d23]/80 font-serif italic mb-6"
          >
            "Thus from that time on they are no longer two, but one"
          </motion.p>

          {/* Families */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xs sm:text-sm text-gray-500 font-serif mb-8 uppercase tracking-widest leading-relaxed"
          >
            Son of Mr. C. C. Fernando & Mrs. P. H. Fernando <br className="hidden sm:block" />
            Daughter of Mr. R. W. Sirisumana & Mrs. M. M. Rani
          </motion.div>

          {/* Names */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-4xl sm:text-6xl md:text-8xl font-serif text-[#4a5d23] mb-6 leading-tight"
          >
            Chrishal
            <motion.span
              className="inline-block mx-2 sm:mx-6 text-[#7d8f4e]"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              &
            </motion.span>
            Chathurika
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-sm sm:text-base text-gray-600 font-serif mb-8 italic"
          >
            {guestName ? (
              <>
                We cordially invite{' '}
                <span className="not-italic font-semibold text-[#4a5d23] text-lg sm:text-xl">{guestName}</span>
                <br />
                to celebrate our special day with us.
              </>
            ) : (
              <>
                Request the pleasure of Mr. & Mrs. / Miss <br />
                To grace the occasion of our wedding celebration
              </>
            )}
          </motion.div>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-[#7d8f4e]" />
            <Sparkles className="w-5 h-5 text-[#7d8f4e]" />
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-[#7d8f4e]" />
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-base sm:text-xl md:text-2xl text-gray-700 font-serif max-w-2xl mx-auto leading-relaxed px-2 mb-10"
          >
            On <br />
            <span className="text-[#4a5d23] font-bold">Thursday, December 10 | 2026</span>
          </motion.p>


        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[#7d8f4e]"
          >
            <div className="w-6 h-10 border-2 border-[#7d8f4e] rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-[#7d8f4e] rounded-full" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Wedding Story Section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-5xl font-serif text-[#4a5d23] mb-12 uppercase tracking-widest">
              A Match Made In Heaven
            </h2>

            <div className="bg-gradient-to-br from-white to-stone-50 rounded-2xl p-12 shadow-xl border-2 border-[#7d8f4e]/30 relative">
              <div className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-[#7d8f4e]" />
              <div className="absolute top-6 right-6 w-16 h-16 border-r-2 border-t-2 border-[#7d8f4e]" />
              <div className="absolute bottom-6 left-6 w-16 h-16 border-l-2 border-b-2 border-[#7d8f4e]" />
              <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-[#7d8f4e]" />

              <div className="space-y-6 text-lg text-gray-700 leading-relaxed font-serif">
                <p>
                  We are getting married and would love to celebrate with you.
                  A romantic evening filled with love, flowers, music, and the people who mean the most to us.
                </p>
                <p>
                  Thank you for being part of our most beautiful chapter.
                  We're excited for a lifetime of love, joy, and togetherness.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-lime-50/50 to-transparent relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-serif text-[#4a5d23] text-center mb-16 uppercase tracking-widest"
          >
            Wedding Details
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-white to-stone-50 rounded-2xl p-8 shadow-xl border-2 border-[#7d8f4e]/30 text-center relative group"
            >
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#7d8f4e] opacity-50" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#7d8f4e] opacity-50" />

              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#7d8f4e] to-[#556b2f] flex items-center justify-center text-white">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif text-[#4a5d23] mb-3">Date</h3>
              <p className="text-xl text-gray-700 font-serif">December 10, 2026</p>
              <p className="text-sm text-gray-500 mt-2 uppercase tracking-widest">Thursday</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-white to-stone-50 rounded-2xl p-8 shadow-xl border-2 border-[#7d8f4e]/30 text-center relative group"
            >
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#7d8f4e] opacity-50" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#7d8f4e] opacity-50" />

              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#7d8f4e] to-[#556b2f] flex items-center justify-center text-white">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif text-[#4a5d23] mb-3">Time</h3>
              <p className="text-xl text-gray-700 font-serif">9:30 AM</p>
              <p className="text-sm text-gray-500 mt-2 uppercase tracking-widest">Church Ceremony</p>
              <p className="text-xl text-gray-700 font-serif mt-4">11:15 AM</p>
              <p className="text-sm text-gray-500 mt-2 uppercase tracking-widest">Poruwa Ceremony</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-white to-stone-50 rounded-2xl p-8 shadow-xl border-2 border-[#7d8f4e]/30 text-center relative group"
            >
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#7d8f4e] opacity-50" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#7d8f4e] opacity-50" />

              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#7d8f4e] to-[#556b2f] flex items-center justify-center text-white">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif text-[#4a5d23] mb-3">Venue</h3>
              <p className="text-xl text-gray-700 font-serif">St. Anne's Church</p>
              <p className="text-sm text-gray-500 mt-2 uppercase tracking-widest">Boralessa</p>
              <p className="text-xl text-gray-700 font-serif mt-4">Sewwandi Grand Castore</p>
              <p className="text-sm text-gray-500 mt-2 uppercase tracking-widest">Kirimatiyana</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-serif text-[#4a5d23] mb-4 uppercase tracking-widest">
              Counting Down
            </h2>
            <p className="text-xl text-gray-600 font-serif">
              Until the marriage of Chrishal & Chathurika
            </p>
          </motion.div>

          <CountdownTimer />
        </div>
      </section>

      {/* Event Timeline Section */}
      <section id="timeline" className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-serif text-[#4a5d23] mb-4 uppercase tracking-widest">
              Event Timeline
            </h2>
            <p className="text-xl text-gray-600 font-serif lowercase italic">
              [CHURCH CEREMONY AT 9.30AM · PORUWA CEREMONY AT 11.15AM]
            </p>
          </motion.div>

          <EventTimeline />
        </div>
      </section>

      {/* Location Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-lime-50/50 to-transparent relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-serif text-[#4a5d23] mb-4 uppercase tracking-widest">
              Location
            </h2>
            <p className="text-xl text-gray-600 font-serif">
              Church Ceremony &amp; Poruwa Ceremony
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                label: 'Church Ceremony · 9:30 AM',
                name: "St. Anne's Church",
                place: 'Boralessa',
                map: "https://www.google.com/maps/search/?api=1&query=St.+Anne's+Church+Boralessa",
              },
              {
                label: 'Poruwa Ceremony · 11:15 AM',
                name: 'Sewwandi Grand Castore',
                place: 'Kirimatiyana',
                map: 'https://www.google.com/maps/search/?api=1&query=Sewwandi+Grand+Castore+Kirimatiyana',
              },
            ].map((venue) => (
              <motion.div
                key={venue.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white to-stone-50 rounded-2xl overflow-hidden shadow-xl border-2 border-[#7d8f4e]/30"
              >
                <div className="relative bg-gradient-to-br from-[#f0f7f1] via-[#e8f4ea] to-[#ddeee0] py-12 flex flex-col items-center justify-center gap-3 border-b border-[#7d8f4e]/20 px-4 text-center">
                  <div className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: 'linear-gradient(#90b996 1px, transparent 1px), linear-gradient(90deg, #90b996 1px, transparent 1px)',
                      backgroundSize: '40px 40px'
                    }}
                  />
                  <div className="relative flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      className="absolute w-24 h-24 rounded-full bg-[#7d8f4e]/30"
                    />
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="relative z-10"
                    >
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#7d8f4e] to-[#556b2f] flex items-center justify-center shadow-xl">
                        <MapPin className="w-7 h-7 text-white" fill="white" />
                      </div>
                    </motion.div>
                  </div>
                  <p className="relative z-10 text-[#7d8f4e] font-serif text-xs tracking-widest uppercase mt-2">
                    {venue.label}
                  </p>
                  <p className="relative z-10 text-[#4a5d23] font-serif text-lg font-semibold tracking-widest uppercase">
                    {venue.name}
                  </p>
                  <p className="relative z-10 text-gray-500 text-sm uppercase tracking-widest">
                    {venue.place}
                  </p>
                </div>

                <div className="p-8 text-center font-serif">
                  <a
                    href={venue.map}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#7d8f4e] to-[#556b2f] text-white font-serif text-sm tracking-widest uppercase shadow-lg hover:scale-105 transition-transform"
                  >
                    <MapPin className="w-4 h-4" />
                    Get Directions
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <a href="tel:0773830409" className="flex items-center gap-2 text-gray-600 font-serif hover:text-[#4a5d23]">
              <Phone className="w-4 h-4 text-[#7d8f4e]" />
              <span>RSVP: Christi - 0773830409</span>
            </a>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-serif text-[#4a5d23] mb-4 uppercase tracking-widest">
              RSVP
            </h2>
            <p className="text-xl text-gray-600 font-serif">
              Christi - <a href="tel:0773830409" className="text-[#4a5d23] hover:text-[#7d8f4e]">0773830409</a>
            </p>
          </motion.div>

          <RSVPForm />
        </div>
      </section>

      {/* Blessing Messages Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-lime-50/30 to-transparent relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-serif text-[#4a5d23] mb-4 uppercase tracking-widest">
              Blessings & Wishes
            </h2>
            <p className="text-xl text-gray-600 font-serif">
              Share your love and blessings with Chrishal & Chathurika
            </p>
          </motion.div>

          <BlessingForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <Heart className="w-12 h-12 mx-auto text-[#7d8f4e] mb-4" fill="#7d8f4e" />
            </div>

            <p className="text-2xl font-serif text-[#4a5d23] mb-4">
              We would be honored to celebrate this beautiful moment with you
            </p>

            <div className="flex items-center justify-center gap-4 my-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent to-[#7d8f4e]" />
              <Sparkles className="w-5 h-5 text-[#7d8f4e]" />
              <div className="w-24 h-px bg-gradient-to-l from-transparent to-[#7d8f4e]" />
            </div>

            <div className="text-3xl font-serif text-[#4a5d23] mb-2 uppercase tracking-[0.2em]">
              Chrishal & Chathurika
            </div>

            <p className="text-gray-500 font-serif tracking-widest text-sm uppercase">
              December 10, 2026 • Boralessa & Kirimatiyana
            </p>
          </motion.div>

          <div className="mt-12 pt-6 border-t border-[#7d8f4e]/20">
            <p className="text-[#7d8f4e] text-xs mt-2 font-sans tracking-wider">
              Want a beautiful wedding website like this? Create yours with{' '}
              <a
                target="_blank"
                rel="noreferrer"
                className="text-[#4a5d23] font-semibold hover:text-[#6b7f3a] underline"
                href="https://wa.me/94707819074"
              >
                invitemint
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}