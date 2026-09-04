import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  Droplets,
  Fan,
  Gauge,
  Home,
  LineChart,
  LifeBuoy,
  Lock,
  Quote,
  Search,
  Sparkles,
  Sprout,
  Star,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/site/Countdown";
import { AuthDialog, type AuthUser } from "@/components/site/AuthDialog";
import { PaymentSection } from "@/components/site/PaymentSection";
import heroImage from "@/assets/hero-pro.jpg";
import heroVideo from "@/assets/hero-loop.mp4.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LEAD BOOST WUAZE | Websites & Growth Solutions for Local Businesses" },
      {
        name: "description",
        content:
          "US home services growth system for plumbing, roofing, cleaning, landscaping & HVAC. Audit, local SEO, and lead funnels. $1,499 value — $299 limited time.",
      },
      { property: "og:title", content: "LEAD BOOST WUAZE — Scale Your Home Services Business to 6-Figures & Beyond" },
      {
        property: "og:description",
        content:
          "Websites & Growth Solutions for Local Businesses. Limited time: $299 instead of $1,499.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const INDUSTRIES = [
  { name: "Plumbing", icon: Droplets, note: "Emergency & service calls" },
  { name: "Roofing", icon: Home, note: "Storm & replacement jobs" },
  { name: "Cleaning", icon: Trash2, note: "Residential & commercial" },
  { name: "Landscaping", icon: Sprout, note: "Design, build & maintain" },
  { name: "HVAC", icon: Fan, note: "Install & service contracts" },
];

const DELIVERABLES = [
  {
    icon: Search,
    title: "In-Depth Business & Marketing Audit",
    problem: "You're spending on ads and referrals but can't tell what actually makes money.",
    fix: "We map every lead source, quote, and job to find the exact leakage points draining your revenue.",
  },
  {
    icon: Gauge,
    title: "Automated Customer Acquisition & Local SEO",
    problem: "Your competitors show up in the Google Map Pack. You don't.",
    fix: "Google Business Profile optimization, local citations, review automation, and service-area pages built to rank.",
  },
  {
    icon: LineChart,
    title: "High-Converting Lead Generation Funnel",
    problem: "Leads call once, get voicemail, and hire the next guy.",
    fix: "A booking funnel with instant text-back, follow-up sequences, and tracked call routing that converts 2-3x higher.",
  },
  {
    icon: LifeBuoy,
    title: "24/7 Dedicated Support & Operational Roadmap",
    problem: "You're the bottleneck on every estimate, dispatch, and invoice.",
    fix: "A 90-day operational roadmap, SOPs for your crew, and a dedicated US support line whenever you're stuck.",
  },
];

const TESTIMONIALS = [
  {
    name: "Mike Delgado",
    role: "Delgado Plumbing — Phoenix, AZ",
    quote:
      "We went from 18 calls a month to 71 in nine weeks. The audit alone showed me I was burning $4k a month on a lead vendor sending me tire-kickers.",
  },
  {
    name: "Sarah Whitfield",
    role: "Whitfield Heating & Air — Columbus, OH",
    quote:
      "Booked $86,000 in install jobs in the first quarter. The instant text-back feature paid for the whole program in the first week.",
  },
  {
    name: "Tony Ricci",
    role: "Ricci Roofing Co. — Tampa, FL",
    quote:
      "After the last storm season we were the first roofer showing up in the map pack. 3.4x ROI and my crews are booked six weeks out.",
  },
  {
    name: "Danielle Brooks",
    role: "BrightNest Cleaning — Austin, TX",
    quote:
      "I finally understand my numbers. Recurring contracts jumped from 22 to 61 clients and I hired two more teams this year.",
  },
  {
    name: "Carlos Mendes",
    role: "GreenEdge Landscaping — Charlotte, NC",
    quote:
      "Honest, fast, and no fluff. Their roadmap got me off the truck and into running the business. Worth ten times the price.",
  },
];

const PARTNERS = [
  {
    name: "Lovable",
    mark: "L",
    bg: "#ff5c38",
    fg: "#ffffff",
    official: true,
    role: "Official Partner — AI development",
    detail:
      "Our official platform partner. Builds and hosts the high-converting websites and booking funnels we install for your business.",
  },
  {
    name: "Stripe",
    mark: "S",
    bg: "#635bff",
    fg: "#ffffff",
    role: "Secure payment infrastructure",
    detail:
      "Bank-grade, PCI-compliant payment processing so your customers can pay online with confidence.",
  },
  {
    name: "Supabase",
    mark: "⚡",
    bg: "#3ecf8e",
    fg: "#0b1f17",
    role: "Managed database & auth",
    detail:
      "Encrypted customer data, lead records, and secure account access — always available, always backed up.",
  },
  {
    name: "Twilio",
    mark: "T",
    bg: "#f22f46",
    fg: "#ffffff",
    role: "SMS & call routing",
    detail:
      "Powers instant text-back, missed-call follow-up, and tracked call routing so no lead ever goes cold.",
  },
  {
    name: "Google",
    mark: "G",
    bg: "#4285f4",
    fg: "#ffffff",
    role: "Local search & ads",
    detail:
      "Google Business Profile, Maps, and Ads expertise that puts you at the top of local search results.",
  },
];

function Index() {
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("hs_user");
    if (raw) {
      try {
        setUser(JSON.parse(raw) as AuthUser);
      } catch {
        localStorage.removeItem("hs_user");
      }
    }
  }, []);

  const handleAuthed = (u: AuthUser) => {
    setUser(u);
    localStorage.setItem("hs_user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("hs_user");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Urgency bar */}
      <div className="sticky top-0 z-40 border-b border-border bg-[image:var(--gradient-primary)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-2 text-primary-foreground sm:flex-row">
          <p className="text-center text-sm font-semibold">
            Limited Time Offer! Save 70% before the timer expires.
          </p>
          <div className="scale-90 sm:scale-100">
            <Countdown compact />
          </div>
        </div>
      </div>

      {/* Nav */}
      <header className="border-b border-border">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <a href="#top" className="font-display text-lg font-bold tracking-tight">
            LEAD BOOST <span className="gradient-text">WUAZE</span>
          </a>
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <span className="hidden text-sm text-muted-foreground sm:inline">{user.email}</span>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => setAuthOpen(true)}>
                  Log in
                </Button>
                <Button variant="hero" size="sm" onClick={() => setAuthOpen(true)}>
                  Sign up free
                </Button>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section id="top" className="hero-surface relative overflow-hidden border-b border-border py-16 sm:py-24">
        <video
          className="pointer-events-none absolute inset-0 size-full object-cover opacity-25"
          src={heroVideo.url}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="video-veil pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <Sparkles className="size-3.5 text-accent" /> Built for US Home Services Owners
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Scale Your Home Services Business to{" "}
              <span className="gradient-text">6-Figures &amp; Beyond</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              If your Plumbing, Roofing, Cleaning, Landscaping, or HVAC company is stuck — it isn't
              the market. It's untracked leads, invisible local search, and slow follow-up. We
              diagnose exactly what's broken and install the system that fixes it.
            </p>

            <div className="mt-8 flex flex-wrap items-end gap-4">
              <div>
                <p className="text-sm text-muted-foreground line-through">$1,499 Original Price</p>
                <p className="font-display text-4xl font-bold text-accent">
                  $299 <span className="text-base font-medium text-foreground">Limited Time</span>
                </p>
              </div>
              <span className="rounded-full bg-destructive/15 px-3 py-1 text-sm font-bold text-destructive">
                Save 70%
              </span>
            </div>

            <div className="mt-8 surface-card inline-flex flex-col gap-3 rounded-xl p-5">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                <Clock className="size-4 text-primary" /> Offer resets in
              </p>
              <Countdown />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="cta" size="xl" asChild>
                <a href="#payment">
                  Get Started Now <ArrowRight />
                </a>
              </Button>
              <Button variant="outline" size="xl" onClick={() => setAuthOpen(true)}>
                Create Free Account
              </Button>
            </div>
          </div>

          <div className="relative">
            <img
              src={heroImage}
              alt="Home services business owner standing beside a branded work van at dusk"
              width={1280}
              height={960}
              className="glow-ring w-full rounded-2xl border border-border object-cover"
            />
            <div className="surface-card absolute -bottom-6 left-6 rounded-xl px-5 py-4">
              <p className="font-display text-2xl font-bold text-success">+312%</p>
              <p className="text-xs text-muted-foreground">Avg. booked jobs in 90 days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Industries We Serve</h2>
            <p className="mt-3 text-muted-foreground">
              Specialized playbooks for the trades that run America's neighborhoods.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {INDUSTRIES.map((item) => (
              <div
                key={item.name}
                className="glitch surface-card group rounded-xl p-6 text-center"
              >
                <span className="mx-auto grid size-12 place-items-center rounded-xl bg-primary/15 text-primary transition-colors group-hover:bg-primary/25">
                  <item.icon className="size-6" />
                </span>
                <h3
                  className="glitch-title mt-4 font-display text-base font-bold"
                  data-text={item.name}
                >
                  {item.name}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              What We Fix <span className="gradient-text">&amp; What You Get</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Most home services businesses don't have a demand problem — they have a system
              problem. Here's exactly what we repair.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {DELIVERABLES.map((d) => (
              <div key={d.title} className="glitch surface-card rounded-2xl p-7">
                <span className="grid size-12 place-items-center rounded-xl bg-primary/15 text-primary">
                  <d.icon className="size-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold">{d.title}</h3>
                <p className="mt-3 text-sm text-destructive/90">
                  <strong>The problem:</strong> {d.problem}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong className="text-success">What you get:</strong> {d.fix}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">US Owners. Real Numbers.</h2>
            <p className="mt-3 text-muted-foreground">
              Over 1,200 home services companies across 42 states.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="glitch surface-card rounded-2xl p-7">
                <Quote className="size-6 text-primary" />
                <div className="mt-3 flex gap-0.5 text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-5">
                  <p className="font-display font-bold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              In Partnership With <span className="gradient-text">Industry Leaders</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              We build your growth system on the same trusted platforms that power millions of US
              businesses.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {PARTNERS.map((p) => (
              <div
                key={p.name}
                className="glitch surface-card group flex flex-col items-center gap-2 rounded-xl px-4 py-6 text-center"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-primary/15 text-primary transition-colors group-hover:bg-primary/25">
                  <p.icon className="size-6" />
                </span>
                <span className="font-display text-base font-bold tracking-tight">{p.name}</span>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">
                  {p.role}
                </span>
                <span className="text-xs leading-snug text-muted-foreground">{p.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PaymentSection user={user} onRequestAuth={() => setAuthOpen(true)} />

      {/* Footer */}
      <footer className="border-t border-border bg-background py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="font-display text-lg font-bold">
                LEAD BOOST <span className="gradient-text">WUAZE</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Websites &amp; Growth Solutions for Local Businesses.
              </p>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Lock className="size-4 text-success" /> 256-bit encrypted submissions
              </p>
              <p className="flex items-center gap-2">
                <BadgeCheck className="size-4 text-success" /> 100% Satisfaction Guarantee
              </p>
              <p className="flex items-center gap-2">
                <ShieldIcon /> Bank-grade ACH processing
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="font-display font-bold text-foreground">US Operating Hours</p>
              <p className="mt-2">Mon – Fri: 8:00 AM – 8:00 PM EST</p>
              <p>Saturday: 9:00 AM – 4:00 PM EST</p>
              <p>Sunday: Emergency support only</p>
            </div>
          </div>
          <p className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} LEAD BOOST WUAZE — Websites &amp; Growth Solutions for
            Local Businesses. All rights reserved. Results vary by market and execution.
          </p>
        </div>
      </footer>

      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} onAuthed={handleAuthed} />
    </div>
  );
}

function ShieldIcon() {
  return <BadgeCheck className="size-4 text-success" />;
}
