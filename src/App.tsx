import { useState, useEffect } from "react";
import { tourData, type Region, type Show } from "./data/tourData";
import { CheckoutModal } from "./components/CheckoutModal";
import { VideoBackground } from "./components/VideoBackground";
import { useTelegram } from "./hooks/useTelegram";

function formatPrice(price: number) {
  return `$${price.toLocaleString()}`;
}

function HeroSection({ onScrollToDates }: { onScrollToDates: () => void }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden z-10 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: ["#7c3aed", "#ec4899", "#3b82f6", "#f59e0b", "#10b981"][i % 5],
              opacity: 0.5 + Math.random() * 0.3,
              animation: `float ${4 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] z-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          transform: `translateY(${scrollY * 0.15}px)`,
        }}
      />

      {/* Content */}
      <div className="relative z-20 text-center px-6">
        <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <span className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 text-sm font-medium tracking-[0.2em] uppercase">
            The Historic Return of the Icons
          </span>
        </div>
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white tracking-tighter leading-[0.85] mb-2 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <span className="text-white drop-shadow-2xl">BTS</span>
        </h1>
        <h2 className="text-4xl md:text-6xl lg:text-[7rem] font-black tracking-tighter leading-[0.9] mb-2 animate-slide-up" style={{ animationDelay: "0.5s" }}>
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
            'ARIRANG'
          </span>
        </h2>
        <h3 className="text-3xl md:text-5xl lg:text-[5rem] font-black text-white/80 tracking-tighter leading-[0.9] mb-2 animate-slide-up" style={{ animationDelay: "0.55s" }}>
          WORLD TOUR
        </h3>
        <div className="text-lg md:text-2xl text-white/40 font-light tracking-[0.3em] mb-6 animate-slide-up" style={{ animationDelay: "0.6s" }}>
          2026 — 2027
        </div>
        <p className="text-base md:text-xl text-white/50 font-light tracking-wider max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.7s" }}>
          Experience the 'ARIRANG' World Tour across 40+ global stadiums. Secure exclusive VIP Residency & Standard tickets now.
        </p>
        <div className="animate-slide-up" style={{ animationDelay: "0.8s" }}>
          <button
            onClick={onScrollToDates}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-2xl shadow-purple-900/50 hover:shadow-purple-700/60 hover:scale-105 active:scale-95"
          >
            Explore Tour Dates
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}

/* Seat badge component */
function SeatBadge({ seats, type }: { seats: number; type: "standard" | "vip" }) {
  if (seats === 0) {
    return (
      <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold tracking-wider uppercase">
        Sold Out
      </span>
    );
  }
  const isLow = seats <= 15;
  if (type === "vip") {
    return (
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${
        isLow 
          ? "bg-red-500/15 text-red-400 animate-pulse" 
          : "bg-amber-500/15 text-amber-400"
      }`}>
        {seats} left
      </span>
    );
  }
  return null;
}

/* Mobile Card */
function ShowCard({ show, onBuy, haptic }: { show: Show; onBuy: (show: Show) => void; haptic: (type?: 'light' | 'medium' | 'heavy') => void }) {
  const isFullySoldOut = show.soldOut;
  const hasVipSeats = show.vipSeats > 0;
  const canBuy = !isFullySoldOut && hasVipSeats;

  return (
    <div
      className={`p-4 rounded-xl border transition-all duration-300 ${
        isFullySoldOut
          ? "border-white/5 bg-white/[0.02] opacity-50"
          : "border-white/10 bg-white/[0.04] hover:bg-white/[0.08] cursor-pointer active:scale-[0.98]"
      }`}
      onClick={() => {
        if (canBuy) {
          haptic('medium');
          onBuy(show);
        }
      }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-white/90 font-mono text-sm font-bold">{show.date}</span>
          <span className="text-white/40 text-xs">({show.day})</span>
        </div>
        {isFullySoldOut && (
          <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold tracking-wider uppercase">
            Sold Out
          </span>
        )}
      </div>

      {/* City & Venue */}
      <div className="mb-3">
        <div className="text-white font-semibold text-base">{show.city}</div>
        <div className="text-white/50 text-xs mt-0.5">{show.venue}</div>
      </div>

      {/* Prices + Button */}
      {isFullySoldOut ? (
        <button
          disabled
          className="w-full py-2.5 rounded-lg bg-white/5 text-white/30 text-xs font-medium cursor-not-allowed"
        >
          Unavailable
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <div className="flex-1 flex gap-4">
            <div className="flex flex-col">
              <span className="text-white/40 text-[10px] uppercase tracking-wider">Standard</span>
              <span className="text-white/40 font-bold text-sm line-through">{formatPrice(show.standard)}</span>
              <SeatBadge seats={show.standardSeats} type="standard" />
            </div>
            <div className="flex flex-col">
              <span className="text-amber-400/60 text-[10px] uppercase tracking-wider">VIP</span>
              <span className="text-amber-400 font-bold text-sm">{formatPrice(show.vip)}</span>
              <SeatBadge seats={show.vipSeats} type="vip" />
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (canBuy) {
                haptic('medium');
                onBuy(show);
              }
            }}
            disabled={!canBuy}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-all duration-300 active:scale-95 whitespace-nowrap ${
              canBuy
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500"
                : "bg-white/5 text-white/30 cursor-not-allowed"
            }`}
          >
            {canBuy ? "Get Tickets" : "Unavailable"}
          </button>
        </div>
      )}
    </div>
  );
}

/* Desktop Table Row */
function ShowRow({ show, index, onBuy, haptic }: { show: Show; index: number; onBuy: (show: Show) => void; haptic: (type?: 'light' | 'medium' | 'heavy') => void }) {
  const isFullySoldOut = show.soldOut;
  const hasVipSeats = show.vipSeats > 0;
  const canBuy = !isFullySoldOut && hasVipSeats;

  return (
    <tr
      className={`border-b border-white/5 transition-all duration-300 group ${
        isFullySoldOut ? "opacity-50" : canBuy ? "hover:bg-white/5 cursor-pointer" : "opacity-70"
      }`}
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={() => {
        if (canBuy) {
          haptic('medium');
          onBuy(show);
        }
      }}
    >
      <td className="py-4 px-5 text-white/90 font-mono text-base font-medium whitespace-nowrap">
        {show.date}
      </td>
      <td className="py-4 px-5">
        <div className="text-white font-semibold text-base">{show.city}</div>
      </td>
      <td className="py-4 px-5">
        <div className="text-white/80 text-sm">{show.venue}</div>
        <div className="text-white/40 text-xs mt-0.5">{show.address}</div>
      </td>
      <td className="py-4 px-5 text-white/60 text-sm hidden lg:table-cell">
        {show.day}
      </td>
      <td className="py-4 px-5 text-right">
        {isFullySoldOut ? (
          <span className="inline-block px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold tracking-wider uppercase">
            Sold Out
          </span>
        ) : (
          <div className="flex flex-col items-end gap-1">
            <span className="text-white/40 font-semibold text-base line-through">
              {formatPrice(show.standard)}
            </span>
            <SeatBadge seats={show.standardSeats} type="standard" />
          </div>
        )}
      </td>
      <td className="py-4 px-5 text-right">
        {isFullySoldOut ? (
          <span className="inline-block px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold tracking-wider uppercase">
            Sold Out
          </span>
        ) : (
          <div className="flex flex-col items-end gap-1">
            <span className="text-amber-400 font-semibold text-base">
              {formatPrice(show.vip)}
            </span>
            <SeatBadge seats={show.vipSeats} type="vip" />
          </div>
        )}
      </td>
      <td className="py-4 px-5 text-right">
        {isFullySoldOut || !canBuy ? (
          <button
            disabled
            className="px-5 py-2 rounded-full bg-white/5 text-white/30 text-sm font-medium cursor-not-allowed"
          >
            Unavailable
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              haptic('medium');
              onBuy(show);
            }}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-600/30 active:scale-95"
          >
            Get Tickets
          </button>
        )}
      </td>
    </tr>
  );
}

function CountrySection({
  name,
  flag,
  shows,
  onBuy,
  haptic,
}: {
  name: string;
  flag: string;
  shows: Show[];
  onBuy: (show: Show) => void;
  haptic: (type?: 'light' | 'medium' | 'heavy') => void;
}) {
  const allSoldOut = shows.every((s) => s.soldOut);

  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-2xl">{flag}</span>
        <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">{name}</h3>
        {allSoldOut && (
          <span className="ml-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold tracking-wider uppercase animate-pulse">
            All Sold Out
          </span>
        )}
      </div>

      {/* Mobile: Card Layout */}
      <div className="md:hidden flex flex-col gap-3">
        {shows.map((show) => (
          <ShowCard key={`${show.date}-${show.city}-mobile`} show={show} onBuy={onBuy} haptic={haptic} />
        ))}
      </div>

      {/* Desktop: Table Layout */}
      <div className="hidden md:block rounded-xl border border-white/10 bg-black/40 backdrop-blur-md">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03]">
              <th className="py-3 px-5 text-left text-white/40 text-xs font-semibold tracking-wider uppercase">
                Date
              </th>
              <th className="py-3 px-5 text-left text-white/40 text-xs font-semibold tracking-wider uppercase">
                City
              </th>
              <th className="py-3 px-5 text-left text-white/40 text-xs font-semibold tracking-wider uppercase">
                Venue
              </th>
              <th className="py-3 px-5 text-left text-white/40 text-xs font-semibold tracking-wider uppercase hidden lg:table-cell">
                Day
              </th>
              <th className="py-3 px-5 text-right text-white/40 text-xs font-semibold tracking-wider uppercase">
                Standard
              </th>
              <th className="py-3 px-5 text-right text-white/40 text-xs font-semibold tracking-wider uppercase">
                VIP
              </th>
              <th className="py-3 px-5 text-right text-white/40 text-xs font-semibold tracking-wider uppercase">
                &nbsp;
              </th>
            </tr>
          </thead>
          <tbody>
            {shows.map((show, idx) => (
              <ShowRow key={`${show.date}-${show.city}`} show={show} index={idx} onBuy={onBuy} haptic={haptic} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RegionSection({ region, onBuy, haptic }: { region: Region; onBuy: (show: Show) => void; haptic: (type?: 'light' | 'medium' | 'heavy') => void }) {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl">{region.emoji}</span>
        <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 tracking-wide uppercase">
          {region.name}
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent ml-4" />
      </div>

      {region.countries.map((country) => (
        <CountrySection
          key={country.name}
          name={country.name}
          flag={country.flag}
          shows={country.shows}
          onBuy={onBuy}
          haptic={haptic}
        />
      ))}
    </div>
  );
}

function StatsBar() {
  const totalShows = tourData.reduce(
    (acc, r) => acc + r.countries.reduce((a, c) => a + c.shows.length, 0),
    0
  );
  const totalCities = new Set(
    tourData.flatMap((r) => r.countries.flatMap((c) => c.shows.map((s) => s.city)))
  ).size;
  const totalCountries = tourData.reduce((acc, r) => acc + r.countries.length, 0);

  const stats = [
    { label: "Shows", value: totalShows },
    { label: "Cities", value: totalCities },
    { label: "Countries", value: totalCountries },
    { label: "Continents", value: tourData.length },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="text-center p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10"
        >
          <div className="text-3xl md:text-4xl font-black text-white mb-1">{stat.value}</div>
          <div className="text-white/40 text-sm font-medium tracking-wider uppercase">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function FilterBar({
  activeRegion,
  setActiveRegion,
  haptic,
}: {
  activeRegion: string;
  setActiveRegion: (r: string) => void;
  haptic: (type?: 'light' | 'medium' | 'heavy') => void;
}) {
  const regions = ["ALL", ...tourData.map((r) => r.name)];

  return (
    <div className="flex flex-wrap gap-2 mb-10 justify-center">
      {regions.map((region) => (
        <button
          key={region}
          onClick={() => {
            haptic('light');
            setActiveRegion(region);
          }}
          className={`px-4 py-2 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${
            activeRegion === region
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-800/40"
              : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 border border-white/10"
          }`}
        >
          {region}
        </button>
      ))}
    </div>
  );
}

export function App() {
  const [activeRegion, setActiveRegion] = useState("ALL");
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const { haptic, hapticNotification } = useTelegram();

  const filteredData =
    activeRegion === "ALL"
      ? tourData
      : tourData.filter((r) => r.name === activeRegion);

  const handleBuy = (show: Show) => {
    setSelectedShow(show);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedShow(null);
    document.body.style.overflow = "";
  };

  const scrollToDates = () => {
    haptic('light');
    document.getElementById("dates")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen text-white tg-webapp">
      <VideoBackground />

      <div className="relative z-10">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
            <div className="font-black tracking-tighter leading-tight">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-xl block">
                ARIRANG
              </span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-sm block">
                2026-2027
              </span>
            </div>
            <div className="flex items-center gap-3 md:gap-6">
              <a
                href="#dates"
                className="text-white/50 hover:text-white text-sm font-medium transition-colors hidden md:block"
              >
                Dates
              </a>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-400 text-xs font-semibold">USDT</span>
              </div>
              <button
                onClick={scrollToDates}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-all border border-white/10 active:scale-95"
              >
                Book Now
              </button>
            </div>
          </div>
        </nav>

        <HeroSection onScrollToDates={scrollToDates} />

        {/* Tour Dates Section */}
        <section id="dates" className="relative py-20 px-4 md:px-8">
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Tour Dates & Tickets
                </span>
              </h2>
              <p className="text-white/40 text-lg max-w-2xl mx-auto">
                Select your city and secure your spot at the most anticipated concert event of 2026-2027
              </p>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                <span className="text-green-400 text-sm font-medium">💰 Pay with USDT (TRC-20) — Fast & Secure</span>
              </div>
            </div>

            <StatsBar />
            <FilterBar activeRegion={activeRegion} setActiveRegion={setActiveRegion} haptic={haptic} />

            {filteredData.map((region) => (
              <RegionSection key={region.name} region={region} onBuy={handleBuy} haptic={haptic} />
            ))}
          </div>
        </section>

        {/* How to Buy Section */}
        <section className="relative py-20 px-4 md:px-8 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                How to Purchase
              </span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "Select Your Show",
                  desc: "Browse dates and click 'Get Tickets' on your preferred show",
                  icon: "🎫",
                },
                {
                  step: "02",
                  title: "Choose & Pay",
                  desc: "Pick VIP ticket, enter your info, and send USDT (TRC-20) to the provided address",
                  icon: "💰",
                },
                {
                  step: "03",
                  title: "Get Confirmation",
                  desc: "Receive your e-ticket via email within 30 minutes after payment verification",
                  icon: "✅",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all group"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="text-purple-400 text-xs font-bold tracking-widest mb-2">STEP {item.step}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10">
              <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                <span className="text-green-400">₮</span> Accepted Payment
              </h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 font-bold text-sm">₮</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">USDT</div>
                    <div className="text-green-400/60 text-xs">TRC-20 (TRON Network)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 py-12 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="font-black tracking-tighter mb-4 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-2xl block">
                ARIRANG
              </span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-lg block">
                2026-2027
              </span>
            </div>
            <p className="text-white/30 text-sm">
              © 2026 BTS World Tour 'ARIRANG'. All rights reserved. Prices subject to change.
            </p>
          </div>
        </footer>
      </div>

      {/* Checkout Modal */}
      {selectedShow && (
        <CheckoutModal show={selectedShow} onClose={handleCloseModal} hapticNotification={hapticNotification} />
      )}
    </div>
  );
}
