import { useMemo } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import OfferSection from "./components/OfferSection";
import ProcessSection from "./components/ProcessSection";
import ReviewsSection from "./components/ReviewsSection";
import BookingSection from "./components/BookingSection";
import FAQSection, { type FAQ } from "./components/FAQSection";
import PortfolioCarousel from "./components/PortfolioCarousel";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import SkipLink from "./components/SkipLink";
import { useReveal } from "./hooks/useReveal";

const logoPath = "/src/assets/logo.jpeg";

export default function Landing() {
  // Hooki muszą być wewnątrz komponentu – tu uruchamiamy „reveal on scroll”
  useReveal();

  const faqs: FAQ[] = useMemo(
    () => [
      {
        q: "Czy muszę mieć pozwolenie na broń?",
        a: "Nie. Zajęcia dla początkujących odbywają się pod okiem instruktora, na legalnie udostępnionej broni i strzelnicy. Wymagany dokument tożsamości i trzeźwość.",
      },
      {
        q: "Gdzie odbywają się szkolenia?",
        a: "Instruktor dojeżdża na różne strzelnice w Lublinie i okolicach. Miejsce dobieramy do terminu i preferencji uczestnika.",
      },
      {
        q: "Jak działa rezerwacja?",
        a: "Wybierasz termin w kalendarzu, rezerwacja trafia do akceptacji. Po potwierdzeniu dostajesz e-mail ze szczegółami.",
      },
      {
        q: "Czy mogę przyjść z osobą towarzyszącą?",
        a: "Tak, oferujemy treningi 1:1 oraz mini-grupy (2–4 osoby).",
      },
    ],
    []
  );

  const packages = useMemo(
    () => [
      {
        name: "Trening 1:1",
        price: "od X zł",
        desc: "60–90 min z instruktorem, fundamenty bezpieczeństwa, praca na pistolecie.",
        features: ["prowadzenie 1:1", "plan pod cel klienta", "dla początkujących i średniozaawansowanych"],
      },
      {
        name: "Mini-grupa 2–4 os.",
        price: "od X zł/os",
        popular: true,
        desc: "Dynamiczne zajęcia w kameralnej grupie — bezpieczeństwo + praktyka.",
        features: ["wspólny tor", "zdrowa rywalizacja", "sprzęt/wypożyczenie wg strzelnicy"],
      },
      {
        name: "Pakiety / przygotowanie",
        price: "indywidualnie",
        desc: "Cykl spotkań, przygotowanie do patentu/licencji lub cele firmowe.",
        features: ["rabaty pakietowe", "program pod egzamin", "możliwe eventy firmowe"],
      },
    ],
    []
  );

const portfolioImages = useMemo(
  () => [
    "https://images.pexels.com/photos/6090833/pexels-photo-6090833.jpeg",
    "https://images.pexels.com/photos/29228878/pexels-photo-29228878.jpeg",
    "https://images.pexels.com/photos/4969500/pexels-photo-4969500.jpeg",
    "https://images.pexels.com/photos/17314919/pexels-photo-17314919.jpeg",
    "https://images.pexels.com/photos/5202418/pexels-photo-5202418.jpeg",
    "https://images.pexels.com/photos/5202424/pexels-photo-5202424.jpeg",
  ],
  []
);


  return (
    <div className="min-h-screen bg-[var(--bg)] text-white">
      {/* Skip link dla klawiatury/WSR */}
      <SkipLink />

      <Header logoSrc={logoPath} />

      <main id="main" role="main">
        <Hero logoSrc={logoPath} />
        <OfferSection items={packages} />
        <ProcessSection />
        <ReviewsSection />
        <BookingSection />
        <FAQSection items={faqs} />
        <PortfolioCarousel images={portfolioImages} />
        <ContactSection />
      </main>

      <Footer logoSrc={logoPath} />
    </div>
  );
}
