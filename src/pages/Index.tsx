import { useState, useCallback, useRef, useEffect } from "react";
import CustomCursor from "@/components/CustomCursor";
import PaintingModal, { Painting } from "@/components/PaintingModal";
import useReveal from "@/hooks/useReveal";
import { ArrowUp, X, Send } from "lucide-react";

import painting1 from "@/assets/painting-1-new.png";
import originalPainting1 from "@/assets/painting-1.jpg";
import originalPainting2 from "@/assets/painting-2.jpg";
import painting2 from "@/assets/painting-2-new.png";
import originalPainting3 from "@/assets/painting-3.jpg";
import painting3 from "@/assets/painting-3-new.png";
import originalPainting4 from "@/assets/painting-4.jpg";
import painting4 from "@/assets/painting-4-new.png";
import originalPainting5 from "@/assets/painting-5.jpg";
import painting5 from "@/assets/painting-5-new.png";
import originalPainting6 from "@/assets/painting-6.jpg";
import painting6 from "@/assets/painting-6-new.png";
import painting7 from "@/assets/painting-7-new.png";
import image888 from "@/assets/888.jpg";
import heroPainting from "@/assets/hero-painting.jpg";

const PAINTINGS: Painting[] = [
  {
    id: 1,
    title: "Рождение света",
    description: "Абстрактный образ, словно энергия или душа проявляется из тьмы",
    image: painting1,
    videoUrl: "/1.mp4",
    size: "square",
    price: 12999,
    oldPrice: 18999,
  },
  {
    id: 2,
    title: "Гнев неба",
    description: "Драматическое небо над водой, предчувствие бури",
    image: painting2,
    videoUrl: "/2.mp4",
    size: "landscape",
    price: 15999,
    oldPrice: 22999,
  },
  {
    id: 3,
    title: "Порог между мирами",
    description: "Лес и тёмный проход как переход в иное измерение",
    image: painting3,
    videoUrl: "/3.mp4",
    size: "square",
    price: 9900,
    oldPrice: 14900,
  },
  {
    id: 4,
    title: "Шёпот древнего леса",
    description: "Лицо, растворённое в стволах — дух леса",
    image: painting4,
    videoUrl: "/4.mp4",
    size: "landscape",
    price: 15999,
    oldPrice: 21999,
  },
  {
    id: 5,
    title: "Пылающая тишина",
    description: "Огненная пустыня на закате, одиночество и масштаб",
    image: painting5,
    videoUrl: "/5.mp4",
    size: "square",
    price: 13999,
    oldPrice: 19999,
  },
  {
    id: 6,
    title: "Золотая роща",
    description: "Живой, мерцающий свет в переплетении деревьев",
    image: painting6,
    videoUrl: "/6.mp4",
    size: "landscape",
    price: 9900,
    oldPrice: 14900,
  },
  {
    id: 7,
    title: "Страж огня и воды",
    description: "Фигура из стихий — соединение пламени и потока",
    image: painting7,
    videoUrl: "/7.mp4",
    size: "landscape",
    price: 12999,
    oldPrice: 18999,
  },
];

// Light effect on painting cards
const PaintingCard = ({
  painting,
  onClick,
  delay,
}: {
  painting: Painting;
  onClick: (p: Painting) => void;
  delay: number;
}) => {
  const cardRef = useReveal();
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mx", `${x}%`);
    e.currentTarget.style.setProperty("--my", `${y}%`);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (overlayRef.current) overlayRef.current.style.opacity = "1";
  }, []);
  const handleMouseLeave = useCallback(() => {
    if (overlayRef.current) overlayRef.current.style.opacity = "0";
  }, []);

  return (
    <div
      ref={cardRef}
      className="reveal painting-card painting-frame cursor-none overflow-hidden w-full h-full"
      style={{ transitionDelay: `${delay}ms` }}
      onClick={() => onClick(painting)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={painting.image}
        alt={painting.title}
        className="w-full h-full object-cover transition-transform duration-700 ease-out"
        style={{ display: "block" }}
        loading="lazy"
      />
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 flex flex-col justify-end p-5"
        style={{
          background: "linear-gradient(to top, hsl(30 15% 10% / 0.7) 0%, transparent 55%)",
          opacity: 0,
          transition: "opacity 0.35s ease",
          pointerEvents: "none",
        }}
      >
        <p
          className="text-xs tracking-widest uppercase mb-1"
          style={{ color: "hsl(var(--gold-light))", fontFamily: "Jost, sans-serif" }}
        >
          Смотреть процесс
        </p>
        <p
          className="text-lg leading-tight"
          style={{ color: "hsl(40 30% 95%)", fontFamily: "Playfair Display, serif" }}
        >
          {painting.title}
        </p>
      </div>
    </div>
  );
};

// Hero section
const Hero = () => {
  const ref = useReveal();
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center px-8 md:px-20 lg:px-32 py-24 gap-16 md:gap-24">
      <div ref={ref} className="reveal flex-1 max-w-xl">
        <p
          className="mb-6 text-xs tracking-widest uppercase fade-in-up delay-100"
          style={{ color: "hsl(var(--gold))", fontFamily: "Jost, sans-serif" }}
        >
          Авторская живопись
        </p>
        <h1
          className="text-5xl md:text-6xl lg:text-7xl mb-8 leading-[1.1] fade-in-up delay-200"
          style={{ fontFamily: "Playfair Display, serif", color: "hsl(var(--foreground))" }}
        >
          Оригинальные<br />
          <em style={{ color: "hsl(var(--gold-dark))" }}>картины</em>
        </h1>
        <p
          className="text-base mb-12 leading-relaxed fade-in-up delay-300"
          style={{ color: "hsl(var(--muted-foreground))", fontFamily: "Jost, sans-serif", maxWidth: 360 }}
        >
          Каждая работа — это живое пространство. Искусство, которое говорит.
        </p>
        <a
          href="#gallery"
          className="inline-block px-10 py-4 text-xs tracking-widest uppercase transition-all duration-400 fade-in-up delay-400"
          style={{
            border: "1px solid hsl(var(--primary))",
            color: "hsl(var(--primary))",
            fontFamily: "Jost, sans-serif",
            letterSpacing: "0.18em",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = "hsl(var(--primary))";
            el.style.color = "hsl(var(--primary-foreground))";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = "transparent";
            el.style.color = "hsl(var(--primary))";
          }}
        >
          Смотреть коллекцию
        </a>
      </div>

      {/* Hero painting */}
      <div className="flex-1 flex justify-center items-center w-full max-w-xl fade-in-up delay-500">
        <div
          className="w-full aspect-square painting-frame overflow-hidden"
          style={{ maxWidth: 520 }}
        >
          <img
            src={heroPainting}
            alt="Золотой горизонт — авторская работа"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

// Gallery section
const Gallery = ({ onSelect }: { onSelect: (p: Painting) => void }) => {
  const ref = useReveal();
  return (
    <section id="gallery" className="px-8 md:px-20 lg:px-32 py-32">
      {/* Header */}
      <div ref={ref} className="reveal flex items-end justify-between mb-20">
        <div>
          <p
            className="mb-3 text-xs tracking-widest uppercase"
            style={{ color: "hsl(var(--gold))", fontFamily: "Jost, sans-serif" }}
          >
            Коллекция
          </p>
          <h2
            className="text-4xl md:text-5xl"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Галерея
          </h2>
        </div>
        <p
          className="text-sm hidden md:block"
          style={{ color: "hsl(var(--muted-foreground))", fontFamily: "Jost, sans-serif" }}
        >
          Нажмите на картину,<br />чтобы увидеть процесс →
        </p>
      </div>

      {/* Masonry grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Row 1 */}
        <div className="relative group cursor-pointer" onClick={() => onSelect(PAINTINGS[1])}>
          <div className="overflow-hidden rounded-sm bg-white">
            <img
              src={PAINTINGS[1].image}
              alt={PAINTINGS[1].title}
              className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
              style={{ display: "block" }}
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {PAINTINGS[1].title}
            </p>
          </div>
        </div>

        <div className="relative group cursor-pointer" onClick={() => onSelect(PAINTINGS[0])}>
          <div className="overflow-hidden rounded-sm bg-white">
            <img
              src={PAINTINGS[0].image}
              alt={PAINTINGS[0].title}
              className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
              style={{ display: "block" }}
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {PAINTINGS[0].title}
            </p>
          </div>
        </div>

        {/* Row 2 */}
        <div className="relative group cursor-pointer" onClick={() => onSelect(PAINTINGS[4])}>
          <div className="overflow-hidden rounded-sm bg-white">
            <img
              src={PAINTINGS[4].image}
              alt={PAINTINGS[4].title}
              className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
              style={{ display: "block" }}
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {PAINTINGS[4].title}
            </p>
          </div>
        </div>

        <div className="relative group cursor-pointer" onClick={() => onSelect(PAINTINGS[3])}>
          <div className="overflow-hidden rounded-sm bg-white">
            <img
              src={PAINTINGS[3].image}
              alt={PAINTINGS[3].title}
              className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
              style={{ display: "block" }}
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {PAINTINGS[3].title}
            </p>
          </div>
        </div>

        {/* Row 3 */}
        <div className="relative group cursor-pointer" onClick={() => onSelect(PAINTINGS[2])}>
          <div className="overflow-hidden rounded-sm bg-white">
            <img
              src={PAINTINGS[2].image}
              alt={PAINTINGS[2].title}
              className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
              style={{ display: "block" }}
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {PAINTINGS[2].title}
            </p>
          </div>
        </div>

        {/* Row 4 */}
        <div className="relative group cursor-pointer" onClick={() => onSelect(PAINTINGS[5])}>
          <div className="overflow-hidden rounded-sm bg-white">
            <img
              src={PAINTINGS[5].image}
              alt={PAINTINGS[5].title}
              className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
              style={{ display: "block" }}
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {PAINTINGS[5].title}
            </p>
          </div>
        </div>

        <div className="relative group cursor-pointer" onClick={() => onSelect(PAINTINGS[6])}>
          <div className="overflow-hidden rounded-sm bg-white">
            <img
              src={PAINTINGS[6].image}
              alt={PAINTINGS[6].title}
              className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
              style={{ display: "block" }}
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {PAINTINGS[6].title}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Single review card — separate component to safely use hooks
const ReviewCard = ({
  name,
  city,
  text,
  painting,
  paintingTitle,
  delay,
}: {
  name: string;
  city: string;
  text: string;
  painting: string;
  paintingTitle: string;
  delay: number;
}) => {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="reveal flex flex-col gap-6"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Painting thumbnail */}
      <div
        className="painting-frame overflow-hidden"
        style={{ aspectRatio: "4/3", background: "hsl(40 25% 98%)" }}
      >
        <img
          src={painting}
          alt={paintingTitle}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Review text */}
      <div>
        <p
          className="text-xs tracking-widest uppercase mb-3"
          style={{ color: "hsl(var(--gold))", fontFamily: "Jost, sans-serif" }}
        >
          {paintingTitle}
        </p>
        <p
          className="leading-loose mb-5 italic"
          style={{
            fontFamily: "Playfair Display, serif",
            color: "hsl(var(--foreground))",
            fontSize: "0.95rem",
          }}
        >
          «{text}»
        </p>
        <div className="flex items-center gap-3">
          <div className="w-px h-6" style={{ background: "hsl(var(--gold))" }} />
          <div>
            <p
              className="text-sm"
              style={{ fontFamily: "Jost, sans-serif", color: "hsl(var(--foreground))", fontWeight: 400 }}
            >
              {name}
            </p>
            <p
              className="text-xs"
              style={{ color: "hsl(var(--muted-foreground))", fontFamily: "Jost, sans-serif" }}
            >
              {city}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const REVIEWS = [
  {
    name: "Анна М.",
    city: "Москва",
    text: "Картина превзошла все ожидания. Живая, тёплая, наполненная светом. Теперь это центр нашей гостиной.",
    painting: "/8.png",
    paintingTitle: "Золотой горизонт",
  },
  {
    name: "Дмитрий В.",
    city: "Санкт-Петербург",
    text: "Удивительная работа. Текстура масла чувствуется даже на фото. Получил в подарок жене — она была в восторге.",
    painting: "/9.png",
    paintingTitle: "Прибой",
  },
  {
    name: "Елена К.",
    city: "Екатеринбург",
    text: "Давно искала что-то особенное для кабинета. Эта работа именно то — спокойная и при этом живая.",
    painting: "/10.png",
    paintingTitle: "Горный туман",
  },
];

// Reviews section
const Reviews = () => {
  const ref = useReveal();
  return (
    <section id="reviews" className="px-8 md:px-20 lg:px-32 py-32 border-t" style={{ borderColor: "hsl(var(--border))" }}>
      <div ref={ref} className="reveal mb-20 text-center">
        <p
          className="mb-3 text-xs tracking-widest uppercase"
          style={{ color: "hsl(var(--gold))", fontFamily: "Jost, sans-serif" }}
        >
          Отзывы
        </p>
        <h2
          className="text-4xl md:text-5xl"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Говорят коллекционеры
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
        {REVIEWS.map((review, i) => (
          <ReviewCard
            key={i}
            {...review}
            delay={i * 120}
          />
        ))}
      </div>
    </section>
  );
};

// About section
const About = ({ onConsultation }: { onConsultation: () => void }) => {
  const ref = useReveal();
  return (
    <section id="about" className="px-8 md:px-20 lg:px-32 py-32 border-t" style={{ borderColor: "hsl(var(--border))" }}>
      <div ref={ref} className="reveal max-w-2xl mx-auto text-center">
        <p
          className="mb-6 text-xs tracking-widest uppercase"
          style={{ color: "hsl(var(--gold))", fontFamily: "Jost, sans-serif" }}
        >
          О художнике
        </p>
        <h2
          className="text-3xl md:text-4xl mb-8 leading-snug"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Живопись как диалог
        </h2>
        <p
          className="leading-loose mb-6"
          style={{ color: "hsl(var(--muted-foreground))", fontFamily: "Jost, sans-serif", fontWeight: 300 }}
        >
          Художник русского происхождения, в творчестве соединяет традиции русской живописи с современными техниками.
          Каждая картина рождается медленно — в тишине, из текстур и случайностей.
          Работы созданы в смешанной технике: масло, акрил, золотая фольга.
          Все работы — в единственном экземпляре.
        </p>
        <div className="flex justify-center mb-8">
          <img
            src={image888}
            alt="888"
            className="max-w-full h-auto"
            style={{ maxHeight: "180px" }}
          />
        </div>
        
        {/* Consultation Block */}
        <div
          className="p-6 rounded-sm"
          style={{
            background: "hsl(40 25% 98%)",
            border: "1px solid hsl(var(--border))",
          }}
        >
          <p
            className="mb-4 text-lg font-medium"
            style={{ color: "hsl(var(--foreground))", fontFamily: "Playfair Display, serif" }}
          >
            Нужна консультация?
          </p>
          <p
            className="mb-6 text-sm"
            style={{ color: "hsl(var(--muted-foreground))", fontFamily: "Jost, sans-serif" }}
          >
            Помогу подобрать идеальную картину для вашего интерьера
          </p>
          <div className="flex justify-center">
            <button
              onClick={onConsultation}
              className="px-6 py-3 text-sm tracking-widest uppercase transition-all duration-300"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                fontFamily: "Jost, sans-serif",
                fontWeight: 400,
                letterSpacing: "0.15em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "hsl(var(--gold))";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "hsl(var(--primary))";
              }}
            >
              Заказать звонок
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer
    id="contact"
    className="px-8 md:px-20 lg:px-32 py-12 flex flex-col md:flex-row items-center justify-between gap-4"
    style={{ borderTop: "1px solid hsl(var(--border))" }}
  >
    <p
      className="text-xs tracking-widest uppercase"
      style={{ color: "hsl(var(--muted-foreground))", fontFamily: "Jost, sans-serif" }}
    >
      © 2026 — irina-sketch
    </p>
    <p
      className="text-xs"
      style={{ color: "hsl(var(--gold))", fontFamily: "Playfair Display, serif", fontStyle: "italic" }}
    >
      Искусство, которое говорит
    </p>
  </footer>
);

const Index = () => {
  const [selected, setSelected] = useState<Painting | null>(null);
  const [showBackToGallery, setShowBackToGallery] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const reviewsEl = document.getElementById("reviews");
      if (!reviewsEl) {
        setShowBackToGallery(false);
        return;
      }

      const rect = reviewsEl.getBoundingClientRect();
      setShowBackToGallery(rect.top < 0);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Show consultation modal after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConsultationModal(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />

      {/* Subtle nav */}
      <header
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 md:px-20 py-6"
        style={{
          background: "hsl(40 30% 97% / 0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid hsl(40 15% 88% / 0.6)",
        }}
      >
        <span
          className="text-xl"
          style={{ fontFamily: "Playfair Display, serif", color: "hsl(var(--foreground))" }}
        >
          irina-sketch
        </span>
        <nav className="hidden md:flex items-center gap-10">
          {[
            { label: "Галерея", href: "#gallery" },
            { label: "О художнике", href: "#about" },
            { label: "Контакт", href: "#contact" }
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs tracking-widest uppercase transition-colors duration-200"
              style={{ color: "hsl(var(--muted-foreground))", fontFamily: "Jost, sans-serif" }}
              onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "hsl(var(--gold))")}
              onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "hsl(var(--muted-foreground))")}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <Hero />
        <Gallery onSelect={setSelected} />
        <Reviews />
        <About onConsultation={() => setShowConsultationModal(true)} />
      </main>

      <Footer />

      <PaintingModal painting={selected} onClose={() => setSelected(null)} onOrder={() => setShowOrderModal(true)} />

      {/* Order Modal */}
      {showOrderModal && selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "hsl(30 15% 10% / 0.75)", backdropFilter: "blur(12px)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowOrderModal(false);
          }}
        >
          <div
            className="relative w-full max-w-md rounded-sm p-6"
            style={{
              background: "hsl(40 25% 98%)",
              boxShadow: "0 40px 120px -20px hsl(30 20% 5% / 0.6)",
            }}
          >
            {/* Close */}
            <button
              onClick={() => setShowOrderModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200"
              style={{
                background: "hsl(40 15% 90%)",
                color: "hsl(var(--foreground))",
              }}
            >
              <X size={14} />
            </button>

            {/* Content */}
            <div className="text-center">
              <p
                className="mb-4 text-sm"
                style={{ color: "hsl(var(--muted-foreground))", fontFamily: "Jost, sans-serif" }}
              >
                Заказ будет оформлен в Telegram
              </p>
              
              <p
                className="mb-6 text-lg font-medium"
                style={{ color: "hsl(var(--foreground))", fontFamily: "Playfair Display, serif" }}
              >
                {selected.title}
              </p>
              
              <p
                className="mb-8 text-2xl"
                style={{ color: "hsl(var(--gold))", fontFamily: "Playfair Display, serif" }}
              >
                {selected.price.toLocaleString('ru-RU')} ₽
              </p>

              {/* Buttons */}
              <div className="space-y-3">
                <a
                  href={`https://t.me/Irinasketchs?text=${encodeURIComponent(`Хочу заказать картину "${selected.title}" за ${selected.price.toLocaleString('ru-RU')} ₽`)}&`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3"
                  style={{
                    background: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                    fontFamily: "Jost, sans-serif",
                    fontWeight: 400,
                    letterSpacing: "0.15em",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "hsl(var(--gold))";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "hsl(var(--primary))";
                  }}
                >
                  <Send size={20} />
                  Перейти в Telegram
                </a>
                
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="w-full py-3 text-xs tracking-widest uppercase transition-colors duration-200"
                  style={{
                    color: "hsl(var(--muted-foreground))",
                    fontFamily: "Jost, sans-serif",
                    background: "transparent",
                    border: "1px solid hsl(var(--border))",
                  }}
                >
                  Смотреть другие картины
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Consultation Modal */}
      {showConsultationModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "hsl(30 15% 10% / 0.75)", backdropFilter: "blur(12px)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowConsultationModal(false);
          }}
        >
          <div
            className="relative w-full max-w-md rounded-sm p-6"
            style={{
              background: "hsl(40 25% 98%)",
              boxShadow: "0 40px 120px -20px hsl(30 20% 5% / 0.6)",
            }}
          >
            {/* Close */}
            <button
              onClick={() => setShowConsultationModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200"
              style={{
                background: "hsl(40 15% 90%)",
                color: "hsl(var(--foreground))",
              }}
            >
              <X size={14} />
            </button>

            {/* Content */}
            <div className="text-center">
              <p
                className="mb-6 text-lg font-medium"
                style={{ color: "hsl(var(--foreground))", fontFamily: "Playfair Display, serif" }}
              >
                Нужна консультация?
              </p>
              
              <p
                className="mb-8 text-sm"
                style={{ color: "hsl(var(--muted-foreground))", fontFamily: "Jost, sans-serif" }}
              >
                Оставьте ваш номер телефона, и мы свяжемся с вами для бесплатной консультации по выбору картины
              </p>

              {/* Phone Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const phone = formData.get('phone') as string;
                  
                  // Send to Telegram bot
                  const botToken = '8259369712:AAGW6-aQ8Nw7fDnjBWuFDWIRnORL8dZ2zsM';
                  const chatId = '1076512275';
                  const message = `📞 Запрос на консультацию\n📱 Телефон: ${phone}\n🌐 Время: ${new Date().toLocaleString('ru-RU')}`;
                  
                  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      chat_id: chatId,
                      text: message,
                    }),
                  });
                  
                  setShowConsultationModal(false);
                }}
                className="space-y-4"
              >
                <input
                  type="tel"
                  name="phone"
                  placeholder="+7 (___) ___-__-__"
                  required
                  className="w-full px-4 py-3 text-sm border rounded-sm"
                  style={{
                    borderColor: "hsl(var(--border))",
                    background: "hsl(40 25% 98%)",
                    color: "hsl(var(--foreground))",
                    fontFamily: "Jost, sans-serif",
                  }}
                />
                
                <div className="space-y-3">
                  <button
                    type="submit"
                    className="w-full py-3 text-sm tracking-widest uppercase transition-all duration-300"
                    style={{
                      background: "hsl(var(--primary))",
                      color: "hsl(var(--primary-foreground))",
                      fontFamily: "Jost, sans-serif",
                      fontWeight: 400,
                      letterSpacing: "0.15em",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "hsl(var(--gold))";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "hsl(var(--primary))";
                    }}
                  >
                    Отправить
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setShowConsultationModal(false)}
                    className="w-full py-3 text-xs tracking-widest uppercase transition-colors duration-200"
                    style={{
                      color: "hsl(var(--muted-foreground))",
                      fontFamily: "Jost, sans-serif",
                      background: "transparent",
                      border: "1px solid hsl(var(--border))",
                    }}
                  >
                    Нет, спасибо
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showBackToGallery && (
        <button
          type="button"
          aria-label="Вернуться к галерее"
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-opacity"
          style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
          onClick={() => {
            const el = document.getElementById("gallery");
            el?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
};

export default Index;
