import { useState, useCallback, useRef } from "react";
import CustomCursor from "@/components/CustomCursor";
import PaintingModal, { Painting } from "@/components/PaintingModal";
import useReveal from "@/hooks/useReveal";

import painting1 from "@/assets/painting-1.jpg";
import painting2 from "@/assets/painting-2.jpg";
import painting3 from "@/assets/painting-3.jpg";
import painting4 from "@/assets/painting-4.jpg";
import painting5 from "@/assets/painting-5.jpg";
import painting6 from "@/assets/painting-6.jpg";
import heroPainting from "@/assets/hero-painting.jpg";

const PAINTINGS: Painting[] = [
  {
    id: 1,
    title: "Золотой горизонт",
    description: "Пространство между небом и землёй, где свет становится материей. Масло, золотая фольга на холсте. 80×80 см.",
    image: painting1,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    size: "square",
  },
  {
    id: 2,
    title: "Белый сад",
    description: "Цветение как внутреннее состояние. Акрил, масло на холсте. 60×80 см.",
    image: painting2,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    size: "landscape",
  },
  {
    id: 3,
    title: "Прибой",
    description: "Волна, застывшая в золотом мгновении. Масло, золотая патина. 70×70 см.",
    image: painting3,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    size: "square",
  },
  {
    id: 4,
    title: "Туманный лес",
    description: "Лес на рассвете — место между сном и явью. Масло на холсте. 100×80 см.",
    image: painting4,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    size: "landscape",
  },
  {
    id: 5,
    title: "Горный туман",
    description: "Молчание гор. Смешанная техника, холст. 60×60 см.",
    image: painting5,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    size: "square",
  },
  {
    id: 6,
    title: "Дюны",
    description: "Ритм песчаных волн под вечерним светом. Масло на холсте. 90×60 см.",
    image: painting6,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
    size: "landscape",
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

      {/* Masonry-ish grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {/* Row 1: landscape | square */}
        <div className="lg:col-span-2 aspect-[16/9]">
          <PaintingCard painting={PAINTINGS[1]} onClick={onSelect} delay={0} />
        </div>
        <div className="aspect-square">
          <PaintingCard painting={PAINTINGS[0]} onClick={onSelect} delay={100} />
        </div>

        {/* Row 2: square | landscape */}
        <div className="aspect-square">
          <PaintingCard painting={PAINTINGS[4]} onClick={onSelect} delay={200} />
        </div>
        <div className="lg:col-span-2 aspect-[16/9]">
          <PaintingCard painting={PAINTINGS[3]} onClick={onSelect} delay={300} />
        </div>

        {/* Row 3 */}
        <div className="aspect-[16/9]">
          <PaintingCard painting={PAINTINGS[2]} onClick={onSelect} delay={400} />
        </div>
        <div className="aspect-[16/9]">
          <PaintingCard painting={PAINTINGS[5]} onClick={onSelect} delay={500} />
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
      <div className="painting-frame overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <img
          src={painting}
          alt={paintingTitle}
          className="w-full h-full object-cover"
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
    painting: painting1,
    paintingTitle: "Золотой горизонт",
  },
  {
    name: "Дмитрий В.",
    city: "Санкт-Петербург",
    text: "Удивительная работа. Текстура масла чувствуется даже на фото. Получил в подарок жене — она была в восторге.",
    painting: painting3,
    paintingTitle: "Прибой",
  },
  {
    name: "Елена К.",
    city: "Екатеринбург",
    text: "Давно искала что-то особенное для кабинета. Эта работа именно то — спокойная и при этом живая.",
    painting: painting5,
    paintingTitle: "Горный туман",
  },
];

// Reviews section
const Reviews = () => {
  const ref = useReveal();
  return (
    <section className="px-8 md:px-20 lg:px-32 py-32 border-t" style={{ borderColor: "hsl(var(--border))" }}>
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
const About = () => {
  const ref = useReveal();
  return (
    <section className="px-8 md:px-20 lg:px-32 py-32 border-t" style={{ borderColor: "hsl(var(--border))" }}>
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
          className="leading-loose"
          style={{ color: "hsl(var(--muted-foreground))", fontFamily: "Jost, sans-serif", fontWeight: 300 }}
        >
          Каждая картина рождается медленно — в тишине, из текстур и случайностей.
          Работы созданы в смешанной технике: масло, акрил, золотая фольга.
          Все работы — в единственном экземпляре.
        </p>
      </div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer
    className="px-8 md:px-20 lg:px-32 py-12 flex flex-col md:flex-row items-center justify-between gap-4"
    style={{ borderTop: "1px solid hsl(var(--border))" }}
  >
    <p
      className="text-xs tracking-widest uppercase"
      style={{ color: "hsl(var(--muted-foreground))", fontFamily: "Jost, sans-serif" }}
    >
      © 2024 — Авторская живопись
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
          Artefact
        </span>
        <nav className="hidden md:flex items-center gap-10">
          {["Галерея", "О художнике", "Контакт"].map((item) => (
            <a
              key={item}
              href="#gallery"
              className="text-xs tracking-widest uppercase transition-colors duration-200"
              style={{ color: "hsl(var(--muted-foreground))", fontFamily: "Jost, sans-serif" }}
              onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "hsl(var(--gold))")}
              onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "hsl(var(--muted-foreground))")}
            >
              {item}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <Hero />
        <Gallery onSelect={setSelected} />
        <Reviews />
        <About />
      </main>

      <Footer />

      <PaintingModal painting={selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default Index;
