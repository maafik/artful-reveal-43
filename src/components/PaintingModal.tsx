import { useEffect, useRef, useState } from "react";
import { X, Play, Send } from "lucide-react";

interface Painting {
  id: number;
  title: string;
  description: string;
  image: string;
  videoUrl: string;
  size: "portrait" | "landscape" | "square";
  price: number;
  oldPrice: number;
}

interface PaintingModalProps {
  painting: Painting | null;
  onClose: () => void;
  onOrder?: () => void;
}

const PaintingModal = ({ painting, onClose, onOrder }: PaintingModalProps) => {
  const [playing, setPlaying] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!painting) return;
    setPlaying(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [painting, onClose]);

  if (!painting) return null;

  return (
    <div
      ref={backdropRef}
      className="modal-backdrop fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 md:p-8"
      style={{ background: "hsl(30 15% 10% / 0.75)", backdropFilter: "blur(12px)" }}
      onClick={(e) => e.target === backdropRef.current && onClose()}
    >
      <div
        className="modal-content relative w-full max-w-5xl rounded-sm overflow-hidden"
        style={{
          background: "hsl(40 25% 98%)",
          boxShadow: "0 40px 120px -20px hsl(30 20% 5% / 0.6)",
          maxHeight: "90vh",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200"
          style={{
            background: "hsl(40 15% 90%)",
            color: "hsl(var(--foreground))",
          }}
        >
          <X size={16} />
        </button>

        <div className="flex flex-col md:flex-row overflow-y-auto" style={{ maxHeight: "90vh" }}>
          {/* Video side */}
          <div className="relative md:w-[56%] aspect-square md:aspect-auto md:min-h-[480px] overflow-hidden bg-charcoal flex-shrink-0">
            {!playing ? (
              <>
                <img
                  src={painting.image}
                  alt={painting.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "hsl(30 15% 5% / 0.3)" }}>
                  <button
                    onClick={() => setPlaying(true)}
                    className="group flex items-center justify-center w-18 h-18 rounded-full transition-all duration-300"
                    style={{
                      width: 72,
                      height: 72,
                      background: "hsl(40 25% 98% / 0.92)",
                      boxShadow: "0 8px 32px hsl(30 20% 5% / 0.3)",
                    }}
                  >
                    <Play
                      size={26}
                      className="ml-1 transition-transform duration-200 group-hover:scale-110"
                      style={{ color: "hsl(var(--gold))", fill: "hsl(var(--gold))" }}
                    />
                  </button>
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 px-5 py-3 text-xs tracking-widest uppercase"
                  style={{
                    background: "linear-gradient(transparent, hsl(30 15% 5% / 0.7))",
                    color: "hsl(40 30% 90%)",
                    fontFamily: "Jost, sans-serif",
                    fontWeight: 300,
                  }}
                >
                  Процесс создания
                </div>
              </>
            ) : (
              <video
                src={painting.videoUrl}
                className="w-full h-full object-cover"
                controls
                autoPlay
                title={`${painting.title} — процесс`}
              />
            )}
          </div>

          {/* Info side */}
          <div className="flex-1 flex flex-col justify-between p-8 md:p-12">
            <div>
              <p
                className="mb-3 text-xs tracking-widest uppercase"
                style={{ color: "hsl(var(--gold))", fontFamily: "Jost, sans-serif" }}
              >
                Оригинальная работа
              </p>
              <h2
                className="text-3xl md:text-4xl mb-6 leading-tight"
                style={{ fontFamily: "Playfair Display, serif", color: "hsl(var(--foreground))" }}
              >
                {painting.title}
              </h2>
              <p
                className="leading-relaxed mb-10"
                style={{ color: "hsl(var(--muted-foreground))", fontFamily: "Jost, sans-serif", fontWeight: 300, fontSize: "0.9rem" }}
              >
                {painting.description}
              </p>

              {/* Price */}
              <div className="mb-10">
                <p className="price-old text-sm mb-1">{painting.oldPrice.toLocaleString('ru-RU')} ₽</p>
                <p className="price-new text-4xl">{painting.price.toLocaleString('ru-RU')} ₽</p>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-3">
              <button
                className="w-full py-4 text-sm tracking-widest uppercase transition-all duration-300"
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
                onClick={onOrder}
              >
                Заказать картину
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 text-xs tracking-widest uppercase transition-colors duration-200"
                style={{
                  color: "hsl(var(--muted-foreground))",
                  fontFamily: "Jost, sans-serif",
                  background: "transparent",
                  border: "1px solid hsl(var(--border))",
                }}
              >
                Вернуться в галерею
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaintingModal;
export type { Painting };
