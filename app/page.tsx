"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { Lock, Shield, ArrowRight, Phone, MapPin, Key, Car, ChevronLeft, ChevronRight, Home as HomeIcon } from "lucide-react";
import { useState, useRef, useEffect, ReactNode } from "react";

// --- KOMPONEN COUNTER (ANGKA BERJALAN) ---
function Counter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const totalMiliseconds = duration * 1000;
      const incrementTime = totalMiliseconds / end;

      const timer = setInterval(() => {
        start += Math.ceil(end / 100); // Naik per 1% agar halus
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, incrementTime * (end / 100));

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={nodeRef}>{count.toLocaleString()}</span>;
}

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  // --- STATE & REF UNTUK FITUR SCROLL ---
  const servicesRef = useRef<HTMLDivElement>(null);
  const scrollServices = (direction: 'left' | 'right') => {
    if (servicesRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      servicesRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const reviewsRef = useRef<HTMLDivElement>(null);
  const scrollReviews = (direction: 'left' | 'right') => {
    if (reviewsRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      reviewsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Galeri Melengkung
  // State & Logika untuk Galeri Melengkung (Curved Carousel)
  const galleryItems = [
    { 
      id: 1, 
      title: 'Duplikat Sepeda Listrik', 
      // Ganti src dengan nama foto Anda di folder public
      img: <img src="gallery1.jpeg" alt="Duplikat Motor" className="w-full h-full object-cover" /> 
    },
    { 
      id: 2, 
      title: 'Sentuhan Ahli', 
      img: <img src="gallery2.jpeg" alt="Immobilizer" className="w-full h-full object-cover" /> 
    },
    { 
      id: 3, 
      title: 'Logika Tanpa Beban', 
      img: <img src="gallery3.jpeg" alt="Smartkey" className="w-full h-full object-cover" /> 
    },
    { 
      id: 4, 
      title: 'Presisi Brankas', 
      img: <img src="hero1.jpeg" alt="Brankas" className="w-full h-full object-cover" /> 
    },
    { 
      id: 5, 
      title: 'Duplikat Pintu Rumah', 
      img: <img src="gallery4.jpeg" alt="Kunci Rumah" className="w-full h-full object-cover" /> 
    },
  ];
  const [activeGal, setActiveGal] = useState(2);

  const nextGallery = () => setActiveGal((prev) => (prev + 1) % galleryItems.length);
  const prevGallery = () => setActiveGal((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);

  // Auto-scroll untuk galeri
  useEffect(() => {
    const interval = setInterval(nextGallery, 4000);
    return () => clearInterval(interval);
  }, []);

  // --- TAMBAHAN: Auto-scroll untuk ulasan (berjalan otomatis tiap 3.5 detik) ---
  useEffect(() => {
    const reviewInterval = setInterval(() => {
      if (reviewsRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = reviewsRef.current;
        // Jika sudah mentok di ujung kanan, kembali ke awal
        if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth) {
          reviewsRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Geser ke kanan sebesar lebar 1 card (sekitar 340px)
          reviewsRef.current.scrollBy({ left: 340, behavior: 'smooth' });
        }
      }
    }, 3500);

    return () => clearInterval(reviewInterval);
  }, []);

  // --- STATE UNTUK FORMULIR WA ---
  const [namaWA, setNamaWA] = useState("");
  const [layananWA, setLayananWA] = useState("Home Servis (Panggilan Darurat)");
  const [pesanWA, setPesanWA] = useState("");

  const kirimKeWhatsApp = (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah halaman reload
    
    // Membentuk format pesan tebal dan baris baru (%0A)
    const teksPesan = `Halo *Kunci Eman*, saya butuh bantuan layanan Anda.%0A%0A*Nama:* ${namaWA}%0A*Jenis Layanan:* ${layananWA}%0A*Alamat / Detail Masalah:* ${pesanWA}%0A%0AMohon segera direspons, terima kasih!`;
    
    // Membuka tab baru ke WhatsApp dengan pesan yang sudah terisi otomatis
    window.open(`https://wa.me/628978744356?text=${teksPesan}`, "_blank");
  };



  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans overflow-x-hidden selection:bg-[#0a5c7a] selection:text-white">
      
      {/* NAVBAR */}
      <nav className="w-full bg-white/90 backdrop-blur-sm flex justify-between items-center px-6 md:px-16 py-6 fixed top-0 z-50 border-b border-slate-100">
        
        {/* LOGO - Menggantikan Teks 'Kunci Eman' */}
        <div className="flex items-center">
          <img 
            src="logo.png" // Ganti dengan nama file logo PNG Anda. Taruh di folder 'public'.
            alt="Logo Kunci Eman" 
            className="h-15 w-auto" // Sesuaikan ukuran tinggi (h-10) logo. Lebar otomatis (w-auto).
          />
        </div>
        {/* ------------------------------------------- */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-500">
          <a href="#layanan" className="hover:text-[#0a5c7a] transition-colors">Layanan</a>
          <a href="#galeri" className="hover:text-[#0a5c7a] transition-colors">Galeri</a>
          <a href="#ulasan" className="hover:text-[#0a5c7a] transition-colors">Testimoni</a>
          <a href="#kontak" className="hover:text-[#0a5c7a] transition-colors">Kontak</a>
        </div>
        <a href="https://wa.me/628978744356" target="_blank" rel="noreferrer" className="bg-[#0a5c7a] text-white px-6 py-2.5 rounded text-sm font-semibold hover:bg-[#07465e] transition-colors shadow-lg">
          Hubungi Kami
        </a>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative pt-40 pb-20 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(135deg,#ffffff_50%,#e2edf2_50%)]" />
        <div className="px-6 md:px-16 max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center w-full relative z-10">
          <motion.div className="w-full md:w-1/2 z-10" initial="hidden" animate="visible" variants={fadeInUp}>
            <h1 className="text-6xl md:text-8xl font-light text-slate-800 leading-[1.1] tracking-tight mb-2">Solusi</h1>
            <h1 className="text-6xl md:text-8xl font-bold italic text-[#0a5c7a] leading-[1.1] tracking-tight mb-2">Presisi</h1>
            <h1 className="text-6xl md:text-8xl font-light text-slate-800 leading-[1.1] tracking-tight mb-6 bg-white/50 backdrop-blur-sm inline-block rounded-lg pr-4">Kunci Eman</h1>
            <p className="text-slate-600 text-sm md:text-base max-w-md mb-10 leading-relaxed font-medium bg-white/60 p-4 rounded-xl backdrop-blur-sm border border-white">
              Mendefinisikan ulang akurasi duplikat kunci. Kami tidak hanya membuka ruang yang terkunci; kami mengembalikan ketenangan Anda.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://wa.me/628978744356" target="_blank" rel="noreferrer" className="bg-[#0a5c7a] text-white px-8 py-3.5 rounded text-sm font-semibold hover:bg-[#07465e] transition-all shadow-xl shadow-[#0a5c7a]/20">Hubungi Kami</a>
              <a href="#layanan" className="bg-white text-slate-700 border-2 border-white px-8 py-3.5 rounded text-sm font-semibold shadow-lg">Mulai dari 20k</a>
            </div>
          </motion.div>
          {/* Bagian Kanan: Hero Image dengan Efek Frame Miring di Belakang */}
          <motion.div 
            className="w-full md:w-1/2 mt-20 md:mt-0 relative h-[500px] flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Elemen Dekoratif: Frame Miring di Belakang (Agak Serong) */}
            <div className="absolute w-[350px] h-[400px] md:w-[450px] md:h-[500px] bg-white shadow-xl rotate-[10deg] rounded-sm border border-slate-100 z-0"></div>

            {/* Kontainer Utama Foto (Lurus, Tidak Serong) */}
            <div className="w-[350px] h-[400px] md:w-[450px] md:h-[500px] bg-white shadow-2xl rounded-sm overflow-hidden relative border-[12px] border-white group z-10 transition-transform duration-300 hover:-translate-y-2">
               {/* Gambar bersih tanpa lapisan gelap */}
               <img 
                 src="hero1.jpeg" // Pastikan file hero1.jpeg ada di folder public
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                 alt="Keahlian Kunci Eman" 
               />
               
               {/* Hover Effect Opsional: Menampilkan ikon kunci tipis saat kursor di atas foto */}
               <div className="absolute inset-0 bg-[#0a5c7a]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* IMPACT STATS SECTION - DENGAN ANGKA BERJALAN */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            
            {/* Stat 1 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <span className="bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded mb-4 inline-block">
                Keahlian
              </span>
              <h2 className="text-5xl md:text-6xl font-bold text-[#0a5c7a] mb-4">
                <Counter value={5000} />+
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed max-w-[200px] mx-auto">
                Kunci sukses terduplikat & diservis sejak kami berdiri.
              </p>
            </motion.div>

            {/* Stat 2 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.2 }}>
              <span className="bg-blue-100 text-[#0a5c7a] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded mb-4 inline-block">
                Respons
              </span>
              <h2 className="text-5xl md:text-6xl font-bold text-[#0a5c7a] mb-4">
                <Counter value={24} /> Jam
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed max-w-[200px] mx-auto">
                Siap siaga melayani panggilan darurat di seluruh Palembang.
              </p>
            </motion.div>

            {/* Stat 3 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.4 }}>
              <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded mb-4 inline-block">
                Presisi
              </span>
              <h2 className="text-5xl md:text-6xl font-bold text-[#0a5c7a] mb-4">
                <Counter value={100} />%
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed max-w-[200px] mx-auto">
                Jaminan keakuratan dan kepuasan pelanggan kami.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

    {/* 2. SERVICES SECTION - Grid Layout Desktop & Scroll Mobile + Hover Effects */}
      <section id="layanan" className="py-24 px-6 md:px-16 max-w-screen-2xl mx-auto">
        <div className="mb-12 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight">
              Keahlian dalam <span className="font-semibold text-[#0a5c7a]">Kepresisian</span>.
            </h2>
            <p className="text-slate-500 mt-3 text-sm max-w-lg font-light">
              <span className="md:hidden">Geser untuk melihat layanan kami. </span>
              Melayani segala macam kunci dengan teknologi modern dan pengerjaan halus.
            </p>
          </motion.div>
        </div>

        {/* Wrapper Relative untuk posisi panah samping di Mobile */}
        <div className="relative w-full">
          
          {/* Tombol Panah Kiri (Mobile Only - Di samping frame) */}
          <button 
            onClick={() => scrollServices('left')} 
            className="md:hidden absolute -left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white text-slate-400 shadow-x1 hover:bg-[#0a5c7a] hover:text-white transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Tombol Panah Kanan (Mobile Only - Di samping frame) */}
          <button 
            onClick={() => scrollServices('right')} 
            className="md:hidden absolute -right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white text-slate-400 shadow-x1 hover:bg-[#0a5c7a] hover:text-white transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Container: Scroll Horizontal (Mobile) & Grid 4 Kolom (Desktop) */}
          <div 
            ref={servicesRef}
            className="flex overflow-x-auto md:overflow-x-visible md:grid md:grid-cols-2 xl:grid-cols-4 gap-6 pb-6 snap-x snap-mandatory hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Card 1: Rumah & Brankas */}
            <motion.div className="group w-[85vw] md:w-auto shrink-0 snap-center bg-white hover:bg-[#0a5c7a] p-8 lg:p-10 rounded-2xl shadow-xl shadow-slate-200/50 hover:shadow-2xl border border-slate-100 hover:border-[#0d6e91] flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-2">
              <div>
                <div className="w-12 h-12 bg-[#f4f8fa] group-hover:bg-white/10 flex items-center justify-center rounded-xl mb-6 text-[#0a5c7a] group-hover:text-white transition-colors duration-300">
                  <HomeIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 group-hover:text-white mb-3 transition-colors duration-300">Rumah & Brankas</h3>
                <p className="text-sm text-slate-500 group-hover:text-blue-100 mb-8 font-light leading-relaxed transition-colors duration-300">
                  Solusi duplikat dan servis untuk segala jenis pintu rumah, gembok, hingga penanganan brankas macet. Dikerjakan halus tanpa merusak aset.
                </p>
              </div>
              <a href="#galeri" className="text-xs font-bold text-[#0a5c7a] group-hover:text-white flex items-center gap-2 uppercase tracking-wide transition-colors duration-300">
                Lihat Detail <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Card 2: Immobilizer */}
            <motion.div className="group w-[85vw] md:w-auto shrink-0 snap-center bg-white hover:bg-[#0a5c7a] p-8 lg:p-10 rounded-2xl shadow-xl shadow-slate-200/50 hover:shadow-2xl border border-slate-100 hover:border-[#0d6e91] flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-2">
              <div>
                <div className="w-12 h-12 bg-[#f4f8fa] group-hover:bg-white/10 flex items-center justify-center rounded-xl mb-6 text-[#0a5c7a] group-hover:text-white transition-colors duration-300">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 group-hover:text-white mb-3 transition-colors duration-300">Immobilizer & Smartkey</h3>
                <p className="text-sm text-slate-500 group-hover:text-blue-100 mb-8 font-light leading-relaxed transition-colors duration-300">
                  Spesialisasi pemrograman chip immobilizer dan duplikat smartkey teknologi terkini. Akses kendaraan kembali normal tanpa repot ke dealer.
                </p>
              </div>
              <a href="https://wa.me/628978744356" target="_blank" rel="noreferrer" className="text-xs font-bold text-[#0a5c7a] group-hover:text-white flex items-center gap-2 uppercase tracking-wide transition-colors duration-300">
                Konsultasi Langsung <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Card 3: Kendaraan Bermotor */}
            <motion.div className="group w-[85vw] md:w-auto shrink-0 snap-center bg-white hover:bg-[#0a5c7a] p-8 lg:p-10 rounded-2xl shadow-xl shadow-slate-200/50 hover:shadow-2xl border border-slate-100 hover:border-[#0d6e91] flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-2">
              <div>
                <div className="w-12 h-12 bg-[#f4f8fa] group-hover:bg-white/10 flex items-center justify-center rounded-xl mb-6 text-[#0a5c7a] group-hover:text-white transition-colors duration-300">
                  <Car className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 group-hover:text-white mb-3 transition-colors duration-300">Mobil, Motor & E-Bike</h3>
                <p className="text-sm text-slate-500 group-hover:text-blue-100 mb-8 font-light leading-relaxed transition-colors duration-300">
                  Pemotongan tingkat presisi tinggi untuk kendaraan operasional Anda, dari kunci mobil, motor harian, hingga kunci sepeda listrik.
                </p>
              </div>
              <a href="#galeri" className="text-xs font-bold text-[#0a5c7a] group-hover:text-white flex items-center gap-2 uppercase tracking-wide transition-colors duration-300">
                Lihat Presisi <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Card 4: Operasional */}
            <motion.div className="group w-[85vw] md:w-auto shrink-0 snap-center bg-white hover:bg-[#0a5c7a] p-8 lg:p-10 rounded-2xl shadow-xl shadow-slate-200/50 hover:shadow-2xl border border-slate-100 hover:border-[#0d6e91] flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-2">
              <div>
                <div className="w-12 h-12 bg-[#f4f8fa] group-hover:bg-white/10 flex items-center justify-center rounded-xl mb-6 text-[#0a5c7a] group-hover:text-white transition-colors duration-300">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 group-hover:text-white mb-3 transition-colors duration-300">Toko & Home Servis</h3>
                <p className="text-sm text-slate-500 group-hover:text-blue-100 mb-8 font-light leading-relaxed transition-colors duration-300">
                  Kunjungi toko kami atau gunakan layanan panggilan. Tim siap meluncur langsung ke lokasi Anda 24 jam penuh untuk area Palembang dan sekitarnya.
                </p>
              </div>
              <a href="#kontak" className="text-xs font-bold text-[#0a5c7a] group-hover:text-white flex items-center gap-2 uppercase tracking-wide transition-colors duration-300">
                Hubungi Kami <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. GALLERY SECTION - Curved Carousel Diperbarui */}
      <section id="galeri" className="py-32 px-6 overflow-hidden relative bg-slate-50 border-y border-slate-100">
        
        {/* Background Decor (Bercak cahaya biru halus agar tidak polos) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-b from-[#e2edf2]/60 to-transparent blur-3xl -z-10"></div>

        <div className="text-center mb-16 md:mb-24 relative z-10">
          <h2 className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight">
            Dokumentasi <span className="font-semibold text-[#0a5c7a]">Kerja</span>
          </h2>
          <p className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-slate-400 mt-4">
            PRESISI TINGGI DI SETIAP KUNCI
          </p>
        </div>

        {/* Container Curved Carousel - Tinggi disesuaikan agar pas di Desktop */}
        <div className="relative h-[450px] md:h-[650px] max-w-[1400px] mx-auto flex justify-center items-center">
          
          <AnimatePresence mode="popLayout">
            {galleryItems.map((item, index) => {
              let offset = index - activeGal;
              if (offset < -2) offset += galleryItems.length;
              if (offset > 2) offset -= galleryItems.length;

              // Menggunakan string persentase agar responsif mengikuti ukuran layar (HP vs Laptop)
              let xPos: string | number = 0;
              let yPos = 0;
              let rotation = 0;
              let scale = 1;
              let opacity = 1;
              let zIndex = 10;

              if (offset === 0) {
                // Item Tengah (Puncak Kurva)
                xPos = 0; yPos = -20; rotation = 0; scale = 1.1; zIndex = 30; opacity = 1;
              } else if (offset === -1 || offset === 1) {
                // Sisi Kiri & Kanan
                xPos = offset === -1 ? "-110%" : "110%";
                yPos = 40; rotation = offset * 10; scale = 0.85; zIndex = 20; opacity = 0.7;
              } else if (offset === -2 || offset === 2) {
                // Sisi Terluar Kiri & Kanan (Menghilang)
                xPos = offset === -2 ? "-180%" : "180%";
                yPos = 120; rotation = offset * 18; scale = 0.6; zIndex = 10; opacity = 0; 
              } else {
                opacity = 0;
              }

              return (
                <motion.div
                  key={item.id}
                  initial={false}
                  animate={{ x: xPos, y: yPos, rotate: rotation, scale: scale, opacity: opacity, zIndex: zIndex }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
                  // Lebar responsif: 260px di HP, 450px di Laptop
                  className="absolute bg-white p-3 pb-10 md:pb-12 shadow-2xl rounded-2xl w-[260px] md:w-[450px] border border-slate-100"
                >
                  {/* Tinggi foto responsif: 240px di HP, 350px di Laptop */}
                  <div className="w-full h-[240px] md:h-[350px] bg-slate-100 bg-center bg-cover flex items-center justify-center text-slate-400 font-bold border border-slate-100 rounded-xl overflow-hidden">
                    {/* FOTO DARI VARIABEL ARRAY */}
                    {item.img}
                  </div>
                  <p className="text-center italic text-sm md:text-lg mt-4 md:mt-6 text-slate-600 font-serif font-medium">
                    {item.title}
                  </p>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Tombol Navigasi Kiri Kanan - Posisinya ditarik ke samping */}
          <button 
            onClick={prevGallery} 
            className="absolute left-0 md:left-10 top-1/2 -translate-y-1/2 p-4 md:p-5 rounded-full bg-white text-slate-600 shadow-xl hover:bg-[#0a5c7a] hover:text-white transition-all z-40 border border-slate-100 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          
          <button 
            onClick={nextGallery} 
            className="absolute right-0 md:right-10 top-1/2 -translate-y-1/2 p-4 md:p-5 rounded-full bg-white text-slate-600 shadow-xl hover:bg-[#0a5c7a] hover:text-white transition-all z-40 border border-slate-100 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </div>
      </section>

      {/* 4. TESTIMONIALS SECTION - Split Layout & Auto-Scrollable Reviews + WA Grids */}
      <section id="ulasan" className="py-24 px-6 md:px-16 max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Kiri: Teks Judul (Tetap di Samping) */}
        <motion.div className="lg:w-1/3 relative shrink-0" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <div className="sticky top-32 flex flex-col justify-between h-full min-h-[300px]">
            <div>
              <div className="absolute w-32 h-32 bg-[#e2edf2] rounded-full blur-3xl -left-10 -top-10 -z-10"></div>
              <h2 className="text-5xl md:text-6xl font-light text-slate-800 leading-tight mb-6">
                Dipercaya oleh <br />
                <span className="font-bold text-slate-900">Masyarakat</span> <br />
                Palembang.
              </h2>
              <p className="text-slate-500 mb-6">Bukti nyata dari dedikasi kami memberikan layanan kunci terbaik siang dan malam.</p>
              
              {/* Tambahan Teks agar seimbang ke bawah */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0a5c7a] mt-2"></div>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">Lebih dari sekadar pelanggan, mereka adalah mitra yang mempercayakan keamanan aset berharganya kepada keahlian kami.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0a5c7a] mt-2"></div>
                  <p className="text-sm text-slate-600 font-light leading-relaxed">Setiap ulasan adalah cerminan dari komitmen kami terhadap presisi, kecepatan, dan kepuasan tanpa kompromi.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Kanan: Content Review */}
        <div className="lg:w-2/3 w-full flex flex-col gap-10">
          
          {/* Wrapper Relative untuk Kotak Teks */}
          <div className="relative w-full">
            
            {/* Scrollable Text Reviews (Sekarang Auto-Scroll, tanpa tombol) */}
            <div 
              ref={reviewsRef}
              className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory hide-scrollbar items-stretch px-2 md:px-0"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Card 1 */}
              <div className="w-[280px] md:w-[320px] snap-start bg-white p-6 md:p-8 border border-slate-200 rounded-2xl shadow-lg shrink-0 flex flex-col justify-between cursor-default">
                <p className="text-slate-600 font-light leading-relaxed mb-8 italic">
                  "Kunci Eman tidak sekadar menduplikat; pelayanan panggilan 24 jamnya sangat membantu. Kerjaannya diam, cepat, dan tingkat presisinya luar biasa."
                </p>
                <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full shrink-0"></div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest leading-tight">Warga Bukit Kecil</h4>
                    <p className="text-[10px] text-slate-400 mt-1">Review Langsung</p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="w-[280px] md:w-[320px] snap-start bg-white p-6 md:p-8 border border-slate-200 rounded-2xl shadow-lg shrink-0 flex flex-col justify-between cursor-default">
                <p className="text-slate-600 font-light leading-relaxed mb-8 italic">
                  "Pengerjaan chip immobilizer mobil saya beres tanpa harus repot bawa ke dealer resmi. Harga bersahabat hasil maksimal!"
                </p>
                <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-green-200 rounded-full shrink-0"></div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest leading-tight">Klien Home Servis</h4>
                    <p className="text-[10px] text-slate-400 mt-1">Review WhatsApp</p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="w-[280px] md:w-[320px] snap-start bg-white p-6 md:p-8 border border-slate-200 rounded-2xl shadow-lg shrink-0 flex flex-col justify-between cursor-default">
                <p className="text-slate-600 font-light leading-relaxed mb-8 italic">
                  "Malam-malam kunci motor patah di dalam, untung Kunci Eman fast respon datang ke lokasi. Pengerjaan sangat rapi."
                </p>
                <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-full shrink-0"></div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest leading-tight">Mahasiswa UIN</h4>
                    <p className="text-[10px] text-slate-400 mt-1">Panggilan Malam</p>
                  </div>
                </div>
              </div>
              
              {/* Card 4 */}
              <div className="w-[280px] md:w-[320px] snap-start bg-white p-6 md:p-8 border border-slate-200 rounded-2xl shadow-lg shrink-0 flex flex-col justify-between cursor-default">
                <p className="text-slate-600 font-light leading-relaxed mb-8 italic">
                  "Duplikat kunci rumah sangat presisi, langsung pas tanpa macet. Layanannya juga ramah banget. Sangat direkomendasikan!"
                </p>
                <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full shrink-0"></div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest leading-tight">Bapak RT Setempat</h4>
                    <p className="text-[10px] text-slate-400 mt-1">Pelanggan Toko</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Frame Kotak untuk Screenshot Review WA */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-2">
            <h4 className="text-sm font-semibold text-slate-600 mb-5 border-b border-slate-200 pb-3 flex items-center justify-between">
              <span>Galeri Bukti Percakapan Pelanggan</span>
            </h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* UBAH NAMA FILE DI BAWAH INI SESUAI DENGAN FOTO ANDA DI FOLDER PUBLIC */}
              {["wa1.jpeg", "wa2.jpeg", "wa3.jpeg", "wa4.jpeg"].map((gambar, index) => (
                <div key={index} className="aspect-[9/16] bg-white rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center relative group cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1">
                  
                  {/* Efek gelap tipis saat di-hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/10 group-hover:opacity-0 transition-opacity z-10"></div>
                  
                  {/* Ini adalah gambar aslinya */}
                  <img 
                    src={gambar} 
                    alt={`Review WA ${index + 1}`} 
                    className="w-full h-full object-cover relative z-0" 
                  />
                  
                </div>
              ))}
            </div>
            
          </div>

        </div>
      </section>

      {/* 5. CONTACT SECTION - Penambahan Frame Peta Google Maps */}
      <section id="kontak" className="py-24 px-6 md:px-16 max-w-screen-2xl mx-auto border-t border-slate-100 bg-slate-50 rounded-t-[3rem] mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight mb-4">
              Hubungi <span className="font-semibold text-[#0a5c7a]">Kunci Eman</span>.
            </h2>
            <p className="text-slate-500 text-sm font-light leading-relaxed mb-10">
              Entah itu masalah terkunci tengah malam atau kebutuhan pembaruan keamanan strategis, kami siap mengembalikan akses Anda dengan cepat.
            </p>

            <div className="space-y-8 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex gap-4 items-center">
                <div className="bg-[#e2edf2] p-4 rounded-xl text-[#0a5c7a]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">CALL CENTER / WA 24 JAM</h4>
                  <p className="text-xl text-slate-800 font-bold">0897-8744-356</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="bg-[#e2edf2] p-4 rounded-xl text-[#0a5c7a]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">LOKASI TOKO</h4>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">
                    Jln Radial Samping Spbu Lama Radial<br/>
                    24 Ilir, Kec. Bukit Kecil - Palembang
                  </p>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-semibold mt-1 inline-block">Buka: Jam 9 - 17 WIB</span>
                </div>
              </div>

              {/* Tambahan Sosial Media Instagram (Aman dari error Lucide) */}
              <div className="flex gap-4 items-center">
                <div className="bg-[#e2edf2] p-4 rounded-xl text-[#0a5c7a]">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-6 h-6"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">SOSIAL MEDIA</h4>
                  <a 
                    href="https://www.instagram.com/duplikatkunciradial_eman?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-sm text-slate-800 font-medium leading-relaxed hover:text-[#0a5c7a] transition-colors"
                  >
                    @duplikatkunciradial_eman
                  </a>
                </div>
              </div>
            </div>

            {/* Anda bisa biarkan frame Peta Google Maps di bawah sini yang sudah ada sebelumnya */}

            {/* Frame Peta Servis (Google Maps Iframe Placeholder) */}
            <div className="mt-8 rounded-2xl overflow-hidden border border-slate-200 shadow-sm h-[250px] w-full bg-slate-200 relative group">
              {/* Anda bisa mengganti URL src di bawah ini dengan Embed Link Google Maps asli milik Kunci Eman */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.4124721171497!2d104.74718660841361!3d-2.9829229969805966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b7597d400f01d%3A0x7d2d3eb7d558a3f7!2sDuplikat%20Kunci%20Radial%20Eman%20PALEMBANG.%20Buka%2024jam(Pelayanan%20Panggilan%20Bukan%20Toko)!5e0!3m2!1sid!2sid!4v1775301004293!5m2!1sid!2sid"
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 z-10"
              ></iframe>
            </div>
          </motion.div>

          <motion.div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h3 className="text-2xl font-semibold mb-8 text-slate-800">Formulir Panggilan Cepat</h3>
            
            {/* Form sekarang menjalankan fungsi kirimKeWhatsApp saat disubmit */}
            <form className="space-y-8" onSubmit={kirimKeWhatsApp}>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">NAMA LENGKAP</label>
                <input 
                  type="text" 
                  required
                  value={namaWA}
                  onChange={(e) => setNamaWA(e.target.value)}
                  placeholder="Contoh: Budi Santoso" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-800 focus:outline-none focus:border-[#0a5c7a] focus:ring-1 focus:ring-[#0a5c7a] transition-all" 
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">PILIH LAYANAN</label>
                <select 
                  value={layananWA}
                  onChange={(e) => setLayananWA(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-800 focus:outline-none focus:border-[#0a5c7a] focus:ring-1 focus:ring-[#0a5c7a] transition-all cursor-pointer"
                >
                  <option value="Home Servis (Panggilan Darurat)">Home Servis (Panggilan Darurat)</option>
                  <option value="Duplikat Kunci Motor/Mobil">Duplikat Kunci Motor/Mobil</option>
                  <option value="Servis Kunci Brankas / Pintu">Servis Kunci Brankas / Pintu</option>
                  <option value="Pembuatan Chip Immobilizer">Pembuatan Chip Immobilizer</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">ALAMAT / DETAIL MASALAH</label>
                <textarea 
                  rows={4} 
                  required
                  value={pesanWA}
                  onChange={(e) => setPesanWA(e.target.value)}
                  placeholder="Jelaskan detail kunci yang rusak dan alamat Anda..." 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-800 focus:outline-none focus:border-[#0a5c7a] focus:ring-1 focus:ring-[#0a5c7a] transition-all resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors mt-8 shadow-lg shadow-green-200"
              >
                Kirim via WhatsApp <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </motion.div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white pt-16 pb-8 px-6 md:px-16 border-t border-slate-200 mt-20">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Kolom 1: Brand & Tagline */}
          <div>
            <h4 className="text-2xl font-bold text-[#0a5c7a] mb-4 tracking-tight">Kunci Eman.</h4>
            <p className="text-sm text-slate-500 font-light leading-relaxed max-w-xs">
              Solusi keamanan terpercaya di Palembang. Menyediakan layanan duplikat, servis brankas, hingga chip immobilizer dengan tingkat presisi buatan pabrik.
            </p>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-5">AKSES CEPAT</h4>
            <div className="flex flex-col gap-3 text-sm text-slate-600 font-medium">
              <a href="#layanan" className="hover:text-[#0a5c7a] transition-colors w-fit">Layanan Kami</a>
              <a href="#galeri" className="hover:text-[#0a5c7a] transition-colors w-fit">Dokumentasi Kerja</a>
              <a href="#ulasan" className="hover:text-[#0a5c7a] transition-colors w-fit">Ulasan Pelanggan</a>
              <a href="#kontak" className="hover:text-[#0a5c7a] transition-colors w-fit">Formulir Panggilan</a>
            </div>
          </div>

          {/* Kolom 3: Info Operasional */}
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-5">WAKTU OPERASIONAL</h4>
            <div className="flex flex-col gap-4 text-sm text-slate-600 font-light">
              <div>
                <p className="font-semibold text-slate-800">Toko Fisik / Bengkel</p>
                <p>Setiap Hari: 09:00 - 17:00 WIB</p>
              </div>
              <div>
                <p className="font-semibold text-emerald-600 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Home Servis (Darurat)
                </p>
                <p>Siaga 24 Jam Non-Stop</p>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright Line */}
        <div className="max-w-screen-2xl mx-auto border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">
            © {new Date().getFullYear()} KUNCI EMAN. HAK CIPTA DILINDUNGI.
          </p>
          <p className="text-[10px] text-slate-400 font-medium tracking-wide">
            Didesain dan dikembangkan oleh <a href="#" className="text-[#0a5c7a] font-bold hover:underline">A-dev</a>
          </p>
        </div>
      </footer>
    </div>
  );
}