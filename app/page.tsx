import type { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

const PHONE = "+12525900240";
const EMAIL = "wsigmon@hubzonetech.org";
const BOOKING_URL = "https://calendar.app.google/YqoNTKNZMMrCfNCNA";

const VCARD_QR_SRC =
  "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=BEGIN%3AVCARD%0AVERSION%3A3.0%0AN%3ASigmon%3BWill%3B%3B%3B%0AFN%3AWill%20Sigmon%0AORG%3AHubZone%20Technology%20Initiative%0ATITLE%3ADirector%20of%20Business%20Development%0ATEL%3BTYPE%3DCELL%3A%2B12525900240%0AEMAIL%3Awsigmon%40hubzonetech.org%0AURL%3Ahttps%3A%2F%2Fthelittleguyfromhti.com%0AEND%3AVCARD";

const SITE_QR_SRC =
  "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https%3A%2F%2Fthelittleguyfromhti.com";

const STATS = [
  { num: "2,500+", label: "Devices Given" },
  { num: "15", label: "NC Counties" },
  { num: "$600K", label: "Grant Funded" },
] as const;

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-[22px] font-black bg-gradient-brand bg-clip-text text-transparent">
        {num}
      </div>
      <div className="text-[10px] text-white/70 uppercase tracking-[0.5px]">
        {label}
      </div>
    </div>
  );
}

function LinkCard({
  href,
  external,
  icon,
  title,
  description,
}: {
  href: string;
  external?: boolean;
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      className="flex items-center gap-3.5 bg-white px-4 py-3.5 rounded-xl text-dark-1 mb-2 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#eee] transition-all duration-250 ease-[ease] hover:translate-x-1 hover:border-orange-1 hover:shadow-[0_4px_15px_rgba(245,132,32,0.15)]"
    >
      {icon}
      <div>
        <h3 className="font-display text-sm font-bold mb-px">{title}</h3>
        <p className="text-xs text-ink-muted">{description}</p>
      </div>
      <span className="ml-auto text-[#ccc] text-base">→</span>
    </a>
  );
}

function QuickButton({
  href,
  label,
  path,
}: {
  href: string;
  label: string;
  path: string;
}) {
  return (
    <a
      href={href}
      className="flex-1 flex items-center justify-center gap-1.5 p-3 bg-dark-1 text-white rounded-[10px] text-[13px] font-semibold transition-all duration-250 ease-[ease] hover:bg-dark-2 hover:-translate-y-0.5"
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d={path} />
      </svg>
      {label}
    </a>
  );
}

function SocialLink({
  href,
  label,
  path,
}: {
  href: string;
  label: string;
  path: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      aria-label={label}
      className="group w-11 h-11 rounded-xl bg-white border-2 border-[#e5e5e5] flex items-center justify-center transition-all duration-300 ease-[ease] hover:border-orange-1 hover:-translate-y-[3px] hover:shadow-[0_6px_20px_rgba(245,132,32,0.2)]"
    >
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 fill-dark-1 transition-[fill] duration-300 ease-[ease] group-hover:fill-orange-1"
      >
        <path d={path} />
      </svg>
    </a>
  );
}

const iconBoxClass =
  "w-10 h-10 rounded-[10px] bg-[linear-gradient(135deg,#fff4e0,#ffe8c0)] flex items-center justify-center shrink-0";

export default function Home() {
  return (
    <div className="max-w-[480px] mx-auto bg-cream min-h-screen shadow-[0_0_80px_rgba(0,0,0,0.5)]">
      {/* Hero */}
      <section className="bg-dark-1 pt-10 px-[25px] pb-[35px] text-center relative overflow-hidden before:content-[''] before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-gold before:bg-[length:200%_100%] before:animate-slide-gradient after:content-[''] after:absolute after:-inset-1/2 after:bg-[radial-gradient(circle_at_30%_40%,rgba(253,183,21,0.1)_0%,transparent_50%)] after:animate-float-slow after:pointer-events-none">
        <div className="flex items-center justify-center gap-5 mb-5 relative z-[1]">
          <div className="bg-white p-2 rounded-xl shadow-[0_8px_25px_rgba(0,0,0,0.3)]">
            <img
              src={VCARD_QR_SRC}
              alt="Scan to save contact"
              width={80}
              height={80}
              className="block w-20 h-20"
            />
            <p className="text-[10px] text-white/60 mt-1.5 uppercase tracking-[0.5px]">
              Save Contact
            </p>
          </div>
          <div className="w-[130px] h-[130px] rounded-full bg-gradient-gold p-1 shadow-[0_15px_50px_rgba(245,132,32,0.35)] relative z-[1] shrink-0">
            <img
              src="/photo.jpg"
              alt="Will Sigmon"
              width={122}
              height={122}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
        <h1 className="font-display text-[32px] font-black text-white mb-1.5 tracking-[-0.5px] relative z-[1]">
          Will Sigmon
        </h1>
        <p className="text-[15px] text-orange-1 font-semibold mb-[15px] relative z-[1]">
          BD Director, HTI &amp; Area Director, Uniquely You!
        </p>
        <p className="text-sm text-white/85 leading-[1.6] max-w-[320px] mx-auto relative z-[1]">
          Bridging the <strong className="text-gold-2">digital divide</strong>{" "}
          at HTI and supporting the local{" "}
          <strong className="text-gold-2">disability community</strong> through
          Uniquely You! across the NC Triangle.
        </p>
      </section>

      {/* Stats */}
      <div className="flex justify-center gap-[25px] py-[18px] px-5 bg-dark-2 border-b-[3px] border-orange-1">
        {STATS.map((stat) => (
          <Stat key={stat.label} num={stat.num} label={stat.label} />
        ))}
      </div>

      {/* Testimonial */}
      <div className="bg-[linear-gradient(180deg,#fff8f0_0%,var(--color-cream)_100%)] py-5 px-[25px] text-center border-b border-[#f0e8e0]">
        <p className="testimonial-quote text-[15px] italic text-dark-1 leading-[1.55] mb-2.5">
          Has his finger on the pulse of technology like nobody I&apos;ve ever
          met in 20 years.
        </p>
        <p className="text-xs text-orange-1 font-semibold">Mike Rundle</p>
        <p className="text-[11px] text-ink-muted">CEO, Treeo</p>
      </div>

      {/* Main Content */}
      <div className="pt-[25px] px-[25px] pb-[30px]">
        <p className="font-display text-xs font-bold text-orange-1 uppercase tracking-[1px] mb-3">
          Let&apos;s Connect
        </p>

        {/* Primary CTA */}
        <a
          href={BOOKING_URL}
          target="_blank"
          className="block bg-gradient-brand text-white py-4 px-6 rounded-[14px] font-display font-bold text-base text-center shadow-[0_8px_25px_rgba(245,132,32,0.35)] mb-2.5 transition-all duration-300 ease-[ease] hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(245,132,32,0.45)]"
        >
          Book a 15-Minute Call
          <span className="block text-[11px] font-medium opacity-90 mt-[3px]">
            Partnerships, donations, or just ideas
          </span>
        </a>

        {/* Link Cards */}
        <LinkCard
          href="https://hubzonetech.vercel.app"
          title="HUBZone Technology Initiative"
          description="Our 501(c)(3) nonprofit mission to bridge the divide"
          icon={
            <div className={iconBoxClass}>
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-orange-1">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          }
        />

        <LinkCard
          href="https://uniquelyyoumag.com"
          external
          title="Uniquely You! Magazine"
          description="Mailed monthly to the local NC disability community"
          icon={
            <div className="w-10 h-10 rounded-[10px] bg-[linear-gradient(135deg,#e0f2fe,#bae6fd)] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#0284c7]">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          }
        />

        <LinkCard
          href="https://linkedin.com/in/willsigmon"
          external
          title="LinkedIn"
          description="Connect professionally"
          icon={
            <div className={iconBoxClass}>
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-orange-1">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
          }
        />

        <LinkCard
          href={`mailto:${EMAIL}?subject=Saw your page`}
          title="Email Me"
          description={EMAIL}
          icon={
            <div className={iconBoxClass}>
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-orange-1">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>
          }
        />

        <Separator className="my-5 h-px bg-[linear-gradient(90deg,transparent,#e5e5e5,transparent)]" />

        <p className="font-display text-xs font-bold text-orange-1 uppercase tracking-[1px] mb-3">
          Quick Contact
        </p>
        <div className="flex gap-2">
          <QuickButton
            href={`tel:${PHONE}`}
            label="Call"
            path="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
          />
          <QuickButton
            href={`sms:${PHONE}`}
            label="Text"
            path="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"
          />
        </div>

        {/* Social */}
        <div className="flex justify-center gap-2.5 mt-5">
          <SocialLink
            href="https://twitter.com/hubzonetech"
            label="Twitter"
            path="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
          />
          <SocialLink
            href="https://facebook.com/hubzonetech"
            label="Facebook"
            path="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
          />
          <SocialLink
            href="https://www.hubzonetech.org"
            label="Website"
            path="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
          />
        </div>
      </div>

      {/* Footer with QR */}
      <div className="text-center pt-[25px] px-5 pb-[30px] bg-dark-1">
        <div className="mb-[15px]">
          <p className="text-[13px] font-semibold text-white mb-2.5">
            Share My Website
          </p>
          <div className="inline-block bg-white p-2 rounded-xl shadow-[0_8px_25px_rgba(0,0,0,0.3)]">
            <img
              src={SITE_QR_SRC}
              alt="Scan to visit thelittleguyfromhti.com"
              width={120}
              height={120}
              className="block w-[120px] h-[120px]"
            />
          </div>
          <p className="text-[11px] text-white/50 mt-2">
            Scan to visit thelittleguyfromhti.com
          </p>
        </div>
        <p className="text-[11px] text-white/50 mt-[15px]">
          501(c)(3) Nonprofit ·{" "}
          <a href="https://hubzonetech.vercel.app" className="text-orange-1">
            hubzonetech.org
          </a>
        </p>
      </div>
    </div>
  );
}
