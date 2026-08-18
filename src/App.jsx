import { useEffect, useRef, useState } from "react";
import {
  BASE_PATH,
  asset,
  firstFix,
  homeServices,
  privacySections,
  reviews,
  roofServices,
  routes,
  secondFix,
  site,
  trustPoints,
} from "./content";

const PAGE_TITLES = {
  "/":
    "JC Roofing & Joinery LTD | Roofing & Joinery Portfolio Concept",
  "/roof-installations-repairs": "Roof Installations & Repairs | JC Roofing & Joinery",
  "/joinery": "Joinery | JC Roofing & Joinery",
  "/contact-us": "Contact | JC Roofing & Joinery",
  "/privacy-policy": "Privacy Policy | JC Roofing & Joinery",
};

const LOGO = `${BASE_PATH}/brand/jc-logo-horizontal.svg`;
const SOCIAL_LOGO = `${BASE_PATH}/brand/jc-logo-social.svg`;

const getRoutePath = () => {
  const pathname = window.location.pathname.replace(/\/$/, "") || "/";
  if (pathname === BASE_PATH) return "/";
  if (pathname.startsWith(`${BASE_PATH}/`)) {
    return pathname.slice(BASE_PATH.length) || "/";
  }
  return pathname;
};

const getPublicPath = (href) =>
  href === "/" ? `${BASE_PATH}/` : `${BASE_PATH}${href}`;

function BrandLockup({ inverse = false }) {
  return (
    <span
      className={`brand-lockup ${inverse ? "brand-lockup-inverse" : ""}`}
      aria-label={site.brandName}
    >
      <img src={LOGO} alt="" />
    </span>
  );
}

function LocalLink({ href, children, className = "", onClick, ...props }) {
  const isLocal = href?.startsWith("/");
  const publicHref = isLocal ? getPublicPath(href) : href;
  return (
    <a
      href={publicHref}
      className={className}
      onClick={(event) => {
        onClick?.(event);
        if (!isLocal || event.defaultPrevented) return;
        event.preventDefault();
        window.history.pushState({}, "", publicHref);
        window.dispatchEvent(new PopStateEvent("popstate"));
        window.scrollTo({ top: 0, behavior: "instant" });
      }}
      {...props}
    >
      {children}
    </a>
  );
}

function Header({ onMenu }) {
  return (
    <>
      <div className="announcement">
        A warm artisan portfolio concept for roofing, joinery, and flooring.
      </div>
      <header className="site-header">
        <div className="header-inner">
          <LocalLink href="/" className="brand-home-link" aria-label={`${site.brandName} home`}>
            <BrandLockup />
          </LocalLink>
          <div className="header-actions">
            <a className="header-phone" href={site.phoneHref}>
              <span className="contact-icon" aria-hidden="true">☎</span>
              <span className="header-phone-copy">
                <span className="header-phone-kicker">Project enquiries via Novas Agency</span>
                <strong>{site.phoneDisplay}</strong>
              </span>
            </a>
            <button className="menu-button" type="button" onClick={onMenu} aria-label="Menu">
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

function Drawer({ open, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div className={`drawer-layer ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <button
        className="drawer-backdrop"
        type="button"
        onClick={onClose}
        aria-label="Close navigation"
        tabIndex={open ? 0 : -1}
      />
      <aside className="drawer" aria-label="Site navigation">
        <div className="drawer-top">
          <BrandLockup inverse />
          <button
            className="drawer-close"
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            ref={closeRef}
          >
            ×
          </button>
        </div>
        <nav>
          {routes.map((route) => (
            <LocalLink key={route.href} href={route.href} onClick={onClose}>
              {route.label}
            </LocalLink>
          ))}
        </nav>
        <div className="drawer-contact">
          <p>GET IN TOUCH</p>
          <a href={site.phoneHref}>{site.phoneDisplay}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.agencyUrl} target="_blank" rel="noreferrer">
            Visit Novas Agency
          </a>
          <div className="drawer-social">
            <a href={site.agencyUrl} target="_blank" rel="noreferrer">
              Website
            </a>
            <a href={site.agencyUrl} target="_blank" rel="noreferrer">
              Start a Project
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Hero({
  eyebrow,
  title,
  copy,
  media,
  poster,
  secondaryHref,
  secondaryLabel,
  imageOnly = false,
  titleSize = "standard",
}) {
  return (
    <section className="hero">
      <div className="hero-media" aria-hidden="true">
        <img src={asset(poster)} alt="" />
        {!imageOnly && media && (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={asset(poster)}
            disablePictureInPicture
          >
            <source src={asset(media)} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="hero-overlay" />
      <div className={`hero-content hero-content-${titleSize} reveal`}>
        <p className="hero-eyebrow">{eyebrow}</p>
        <h1 className={`hero-title-${titleSize}`}>{title}</h1>
        <a className="hero-number" href={site.phoneHref}>
          {site.phoneDisplay}
        </a>
        <p className="hero-copy">{copy}</p>
        <div className="hero-actions">
          <a className="button button-dark" href={site.phoneHref}>
            Call us NOW
          </a>
          <LocalLink className="button button-green" href={secondaryHref}>
            {secondaryLabel}
          </LocalLink>
        </div>
      </div>
      <div className="hero-waves" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
    </section>
  );
}

function SectionHeading({ kicker, title, copy, align = "center" }) {
  return (
    <div className={`section-heading section-heading-${align}`}>
      {kicker && <p className="kicker">{kicker}</p>}
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function HomePage() {
  return (
    <>
      <Hero
        eyebrow={site.brandName}
        title="Your Local Roofing & Joinery Specialists"
        copy="A local portfolio concept presenting roofing, repairs, and carpentry services for homes and businesses."
        media="videos/home-hero.mp4"
        poster="videos/home-hero-poster.jpg"
        secondaryHref="/contact-us"
        secondaryLabel="Get a FREE Quote"
      />

      <section className="service-overview section">
        <div className="container">
          <div className="home-service-grid">
            {homeServices.map((service, index) => (
              <LocalLink
                href={service.href}
                className="home-service-card"
                key={service.title}
                style={{ "--delay": `${index * 90}ms` }}
              >
                <img src={asset(service.image)} alt={service.alt} />
                <div>
                  <h2>{service.title}</h2>
                  <p>{service.copy}</p>
                  <span>Learn more</span>
                </div>
              </LocalLink>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-section">
        <div className="container split">
          <div className="masked-image reveal">
            <img
              src={asset("images/roof-repair.jpg")}
              alt="Roofer carrying out detailed repair work on a pitched roof"
            />
          </div>
          <div className="split-copy reveal">
            <SectionHeading
              align="left"
              title="Expert Roofing & Joinery Services Tailored to You"
            />
            <p>
              JC Roofing & Joinery LTD presents professional roofing and joinery
              services for homeowners and businesses. This local concept centres careful
              workmanship, reliability, and straightforward project communication.
            </p>
            <p>
              Whether you need a new roof, expert joinery, flooring installations, or
              storm damage repairs, our skilled team is here to deliver long-lasting,
              high-quality results tailored to your needs.
            </p>
            <LocalLink className="button button-green" href="/roof-installations-repairs">
              Roof Installations & Repairs
            </LocalLink>
          </div>
        </div>
      </section>

      <CallBand
        title="Roofing & Joinery Services Presented with Care"
        phone
      />

      <section className="section trust-section">
        <div className="container trust-layout">
          <div className="trust-copy">
            {trustPoints.map((point) => (
              <article className="trust-point" key={point.title}>
                <span className="tick" aria-hidden="true">
                  ✓
                </span>
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.copy}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="trust-image">
            <img
              src={asset("images/roof-installation.jpg")}
              alt="Roofer installing tiles with safety equipment"
            />
          </div>
        </div>
      </section>

      <section className="section craftsmanship">
        <div className="container split split-reverse">
          <div className="split-copy">
            <SectionHeading
              align="left"
              title="A Team You Can Trust, Quality That Lasts"
            />
            <p>
              JC Roofing & Joinery LTD is presented around careful craftsmanship and a
              dependable service approach. Whether it&apos;s roof repairs, new installations,
              expert joinery, or flooring solutions, each illustrative project is planned
              around the property, the required finish, and clear communication.
            </p>
            <p>
              From the first consultation to the final finishing touches, we ensure
              professionalism, reliability, and top-tier workmanship at every step.
            </p>
            <LocalLink className="button button-green" href="/joinery">
              Explore Joinery Services
            </LocalLink>
          </div>
          <div className="image-stack">
            <img
              src={asset("images/team-joinery-revision.jpg")}
              alt="Two joiners collaborating over a timber workbench"
            />
            <img
              src={asset("images/team-roof-color.jpg")}
              alt="Roofer restoring a weathered pitched roof"
            />
          </div>
        </div>
      </section>

      <ContactStrip />
      <Reviews />
    </>
  );
}

function CallBand({ title, phone = false }) {
  return (
    <section className="call-band">
      <div className="container call-band-inner">
        <h2>{title}</h2>
        {phone && (
          <a href={site.phoneHref} className="call-band-phone">
            {site.phoneDisplay}
          </a>
        )}
        <LocalLink className="button button-light" href="/contact-us">
          Get a FREE Quote
        </LocalLink>
      </div>
    </section>
  );
}

function ContactStrip() {
  return (
    <section className="contact-strip">
      <div className="container contact-strip-inner">
        <div>
          <h2>Ready to Enhance Your Home with Expert Roofing and Joinery?</h2>
          <a href={site.phoneHref}>{site.phoneDisplay}</a>
        </div>
        <div>
          <p>
            Email us: <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p>
            Project enquiries:{" "}
            <a href={site.agencyUrl} target="_blank" rel="noreferrer">
              Novas Agency
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const [index, setIndex] = useState(0);
  const visible = [reviews[index], reviews[(index + 1) % reviews.length]];
  return (
    <section className="section reviews-section">
      <div className="container">
        <SectionHeading
          title="Illustrative Project Feedback"
          copy="These sample reviews demonstrate how customer feedback could appear in the finished website. They are portfolio content and are not verified endorsements."
        />
        <div className="review-controls">
          <button
            type="button"
            onClick={() => setIndex((value) => (value - 1 + reviews.length) % reviews.length)}
            aria-label="Previous reviews"
          >
            Previous
          </button>
          <div className="review-grid">
            {visible.map((review, cardIndex) => (
              <article className={`review-card review-card-${cardIndex + 1}`} key={review.name}>
                <div className="stars" aria-label="Illustrative 5 out of 5 stars">
                  ★★★★★
                </div>
                <p>{review.copy}</p>
                <strong>{review.name}</strong>
                <span>{review.date}</span>
              </article>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setIndex((value) => (value + 1) % reviews.length)}
            aria-label="Next reviews"
          >
            Next
          </button>
        </div>
        <div className="review-dots" aria-label="Review slide">
          {reviews.map((review, dotIndex) => (
            <button
              key={review.name}
              type="button"
              className={dotIndex === index ? "is-active" : ""}
              onClick={() => setIndex(dotIndex)}
              aria-label={`Show reviews starting with ${review.name}`}
            />
          ))}
        </div>
        <a className="google-review-link" href={site.agencyUrl} target="_blank" rel="noreferrer">
          Start a project with Novas Agency
        </a>
      </div>
    </section>
  );
}

function ServiceGrid({ items }) {
  return (
    <div className="service-grid">
      {items.map((item) => (
        <article className="service-card" key={item.title}>
          <img src={asset(item.image)} alt={item.alt} />
          <div>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function AdviceBlock() {
  return (
    <section className="advice-block">
      <div className="container advice-inner">
        <div>
          <h2>Need Expert Roofing Advice? We’re Here to Help!</h2>
          <p>
            Got questions about roof repairs, installations, or maintenance? Whether
            you&apos;re dealing with leaks, storm damage, or planning a new roof, our
            team at JC Roofing & Joinery LTD is presented as a helpful point of contact. Get in
            touch today for professional advice and a free consultation!
          </p>
        </div>
        <LocalLink className="button button-light" href="/contact-us">
          Contact Us
        </LocalLink>
      </div>
    </section>
  );
}

function RoofPage() {
  return (
    <>
      <Hero
        eyebrow="Roofing Installation & Repairs"
        title="Reliable Roofing Solutions – Protecting Your Home & Business"
        copy="From domestic roofing to roof conversions, leak detection, and insurance claims, we provide expert roof installations and repairs tailored to your needs. Let’s keep your property safe and secure."
        media="videos/roofing-hero.mp4"
        poster="videos/roofing-hero-poster.jpg"
        secondaryHref="/joinery"
        secondaryLabel="Joinery"
        titleSize="wide"
      />
      <section className="section intro-section">
        <div className="container split">
          <div className="intro-image">
            <img
              src={asset("images/drone-roof-survey.jpg")}
              alt="Drone carrying out an aerial roof inspection"
            />
          </div>
          <div className="split-copy">
            <SectionHeading
              align="left"
              kicker="Roofing Installation & Repairs"
              title="Professional Roofing Services for Homes & Businesses"
            />
            <p>
              JC Roofing & Joinery LTD presents roofing installation and repair services
              tailored to residential properties. The concept focuses on considered,
              durable roofing solutions designed to keep homes secure and weatherproof.
            </p>
            <p>
              The illustrative service range combines suitable materials with a careful,
              practical approach to installation, maintenance, and repair.
            </p>
          </div>
        </div>
      </section>
      <CallBand title="Roofing & Joinery Services Presented with Care" phone />
      <section className="section service-list-section">
        <div className="container">
          <ServiceGrid items={roofServices} />
        </div>
      </section>
      <AdviceBlock />
    </>
  );
}

function JoineryPage() {
  return (
    <>
      <Hero
        eyebrow="Joinery"
        title="Joinery Craft for Homes & Businesses"
        copy="This portfolio concept presents precision joinery, flooring, and fitted timber work for homes and businesses."
        media="videos/joinery-hero.mp4"
        poster="videos/joinery-hero-poster.jpg"
        secondaryHref="/roof-installations-repairs"
        secondaryLabel="Roof Installations & Repairs"
      />
      <section className="section intro-section">
        <div className="container split">
          <div className="intro-image">
            <img
              src={asset("images/joinery-intro-revision.jpg")}
              alt="Two craftspeople reviewing a timber joint at a bright workshop bench"
            />
          </div>
          <div className="split-copy">
            <SectionHeading
              align="left"
              kicker="Expert Joinery Services"
              title="Bespoke Joinery Solutions Tailored to Your Needs"
            />
            <p>
              JC Roofing & Joinery LTD presents high-quality joinery services for
              homeowners and businesses. Whether the project
              involves first fix joinery, bespoke woodwork, or flooring installation,
              every detail is considered around the function and finish of the space.
            </p>
            <p>
              The concept combines traditional techniques with modern precision to show
              how carefully finished joinery can support lasting, practical results.
            </p>
            <strong>Looking for professional joinery services? Contact us today for a free quote!</strong>
          </div>
        </div>
      </section>
      <CallBand title="Roofing & Joinery Services Presented with Care" phone />
      <section className="section joinery-section">
        <div className="container">
          <SectionHeading
            kicker="First Fix Joinery"
            title="The Structural Foundation"
          />
          <ServiceGrid items={firstFix} />
        </div>
      </section>
      <section className="section joinery-section second-fix-section">
        <div className="container">
          <SectionHeading kicker="Second Fix Joinery" title="The Finishing Touches" />
          <ServiceGrid items={secondFix} />
        </div>
      </section>
      <AdviceBlock />
    </>
  );
}

function ContactForm({ compact = false }) {
  const [success, setSuccess] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const onSubmit = (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    if (!captcha) {
      event.currentTarget.querySelector("[data-captcha]")?.focus();
      return;
    }
    setSuccess(true);
    event.currentTarget.reset();
    setCaptcha(false);
  };

  if (success) {
    return (
      <div className="form-success" role="status">
        <h3>Thank you</h3>
        <p>Your message has been prepared successfully. No information was sent or stored.</p>
        <button type="button" className="button button-green" onClick={() => setSuccess(false)}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className={`contact-form ${compact ? "contact-form-compact" : ""}`} onSubmit={onSubmit}>
      <div className="form-row">
        <label>
          First Name
          <input name="firstName" autoComplete="given-name" required={!compact} />
        </label>
        <label>
          Last Name
          <input name="lastName" autoComplete="family-name" />
        </label>
      </div>
      {!compact && (
        <div className="form-row">
          <label>
            Phone
            <input name="phone" type="tel" autoComplete="tel" />
          </label>
          <label>
            Address
            <input name="address" autoComplete="street-address" />
          </label>
        </div>
      )}
      <label>
        Email *
        <input name="email" type="email" autoComplete="email" required />
      </label>
      {compact && (
        <label>
          Address
          <input name="address" autoComplete="street-address" />
        </label>
      )}
      <label>
        Message
        <textarea name="message" rows={compact ? 3 : 6} required={!compact} />
      </label>
      <div className="form-submit-row">
        <label className="captcha-control">
          <input
            data-captcha
            type="checkbox"
            checked={captcha}
            onChange={(event) => setCaptcha(event.target.checked)}
            required
          />
          <span>I&apos;m not a robot</span>
          <small>Local CAPTCHA</small>
        </label>
        <button className="button button-green" type="submit">
          Send
        </button>
      </div>
      <p className="privacy-note">This local demo does not transmit or retain personal data.</p>
    </form>
  );
}

function ContactPage() {
  return (
    <>
      <Hero
        eyebrow="Get in Touch"
        title="Let’s Bring Your Project to Life"
        copy="Need roofing, joinery, or flooring services? JC Roofing & Joinery LTD is presented as a careful, reliable local-service concept. Project enquiries are handled by Novas Agency."
        poster="images/roof-repair.jpg"
        secondaryHref="/joinery"
        secondaryLabel="Explore Joinery"
        imageOnly
        titleSize="narrow"
      />
      <section className="section contact-page-section">
        <div className="container">
          <SectionHeading
            kicker="Get in Touch with Us"
            title="Let’s Get Your Project Started"
            copy="Looking for a roofing, joinery, or flooring website concept? Contact Novas Agency by phone or email, or try the local demonstration form below."
          />
          <div className="contact-page-grid">
            <div>
              <h2>Contact Us</h2>
              <ContactForm />
            </div>
            <div className="contact-details-panel">
              <BrandLockup />
              <h3>Get in Touch</h3>
              <a href={site.phoneHref}>{site.phoneDisplay}</a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={site.agencyUrl} target="_blank" rel="noreferrer">
                novasagency.com
              </a>
              <a href={site.agencyUrl} target="_blank" rel="noreferrer" className="map-card">
                <img src={asset("images/roof-installation.jpg")} alt="Roofer working safely on a pitched roof" />
                <span className="map-card-label">Visit Novas Agency</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function PrivacyPage() {
  return (
    <section className="privacy-page">
      <div className="container privacy-inner">
        <h1>Privacy Policy</h1>
        {privacySections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph} className={paragraph.includes("\n") ? "pre-line" : ""}>
                {paragraph}
              </p>
            ))}
            {section.items && (
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-waves" aria-hidden="true">
        <i />
        <i />
      </div>
      <div className="container footer-grid">
        <div className="footer-contact">
          <h2>GET IN TOUCH</h2>
          <a className="footer-contact-link" href={site.phoneHref}>
            <span className="contact-icon" aria-hidden="true">☎</span>
            <span>{site.phoneDisplay}</span>
          </a>
          <a className="footer-contact-link" href={`mailto:${site.email}`}>
            <span className="contact-icon" aria-hidden="true">✉</span>
            <span>{site.email}</span>
          </a>
          <a
            className="footer-contact-link"
            href={site.agencyUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span className="contact-icon" aria-hidden="true">↗</span>
            <span>novasagency.com</span>
          </a>
          <h2>PROJECT ENQUIRIES</h2>
          <div className="footer-social">
            <a href={site.agencyUrl} target="_blank" rel="noreferrer" aria-label="Visit Novas Agency">
              <span aria-hidden="true">N</span>
              <span className="visually-hidden">Visit Novas Agency</span>
            </a>
            <a href={site.agencyUrl} target="_blank" rel="noreferrer" aria-label="Start a project">
              <span aria-hidden="true">↗</span>
              <span className="visually-hidden">Start a project</span>
            </a>
          </div>
          <p>Ask us anything! We’re here to answer any questions you have.</p>
        </div>
        <div className="footer-form">
          <h2>WE&apos;RE HERE TO HELP</h2>
          <ContactForm compact />
        </div>
        <a className="footer-map" href={site.agencyUrl} target="_blank" rel="noreferrer">
          <img src={asset("images/roof-installation.jpg")} alt="Professional roofing work presented by JC Roofing and Joinery" />
          <span className="map-card-label">Contact via Novas Agency</span>
        </a>
      </div>
      <div className="container footer-bottom">
        <nav>
          <LocalLink href="/roof-installations-repairs">slate roofing services</LocalLink>
          <LocalLink href="/roof-installations-repairs">flat roof repairs</LocalLink>
          <LocalLink href="/joinery">joinery services</LocalLink>
          <LocalLink href="/roof-installations-repairs">storm damage roof repair</LocalLink>
          <LocalLink href="/">flooring installations</LocalLink>
        </nav>
        <p>Copyright © 2026 JC Roofing &amp; Joinery LTD — local portfolio concept.</p>
        <p>
          Services, reviews, projects, and supporting claims shown on this local website
          are illustrative. Website concept and project enquiries by Novas Agency.
        </p>
        <LocalLink href="/privacy-policy">Privacy Policy</LocalLink>
      </div>
    </footer>
  );
}

function AgencyChat({ consentPending }) {
  const [open, setOpen] = useState(
    () => !window.matchMedia("(max-width: 767px)").matches,
  );
  const [conversation, setConversation] = useState(false);

  useEffect(() => {
    if (consentPending && window.matchMedia("(max-width: 767px)").matches) {
      setOpen(false);
    }
  }, [consentPending]);

  return (
    <div className={`chat-widget${consentPending ? " consent-pending" : ""}`}>
      {open && (
        <div className="chat-popup" role="dialog" aria-label="JC Roofing and Joinery contact">
          <button
            type="button"
            className="chat-close"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
          >
            ×
          </button>
          <strong>JC Roofing &amp; Joinery</strong>
          {!conversation ? (
            <>
              <p>
                Hi there! Thanks for visiting this JC Roofing &amp; Joinery LTD portfolio
                concept. Project enquiries are handled by Novas Agency.
              </p>
              <button type="button" onClick={() => setConversation(true)}>
                Start a chat
              </button>
            </>
          ) : (
            <>
              <p>Choose how you would like to get in touch.</p>
              <a href={site.agencyUrl} target="_blank" rel="noreferrer">
                Continue to Novas Agency
              </a>
              <a href={site.phoneHref}>Call {site.phoneDisplay}</a>
            </>
          )}
        </div>
      )}
      <button
        type="button"
        className="chat-launcher"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close contact panel" : "Open contact panel"}
      >
        <span aria-hidden="true">Contact</span>
        <img className="chat-launcher-brand" src={SOCIAL_LOGO} alt="" />
        <svg
          className="chat-launcher-whatsapp"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M16.04 3.2A12.75 12.75 0 0 0 5.22 22.7L3.4 29.36l6.82-1.79a12.76 12.76 0 1 0 5.82-24.37Zm0 23.35c-2.1 0-4.15-.57-5.94-1.65l-.43-.25-4.05 1.06 1.08-3.95-.28-.45a10.58 10.58 0 1 1 9.62 5.24Zm5.8-7.93c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.19.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.58a9.56 9.56 0 0 1-1.77-2.2c-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.31.32-.52.1-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.08-1.11 2.64 0 1.56 1.14 3.06 1.3 3.28.16.21 2.24 3.42 5.43 4.8.76.32 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.14-1.51.27-.74.27-1.38.19-1.51-.08-.14-.29-.22-.61-.38Z"
          />
        </svg>
      </button>
    </div>
  );
}

const COOKIE_KEY = "jc-roofing-cookie-preferences-v1";

function CookieInterface({ onPendingChange }) {
  const [visible, setVisible] = useState(false);
  const [settings, setSettings] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [prefs, setPrefs] = useState({
    essential: true,
    marketing: false,
    functional: false,
    analytics: false,
  });

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(COOKIE_KEY);
      if (saved) setPrefs(JSON.parse(saved));
      else setVisible(true);
    } catch {
      setVisible(true);
    } finally {
      setResolved(true);
    }
  }, []);

  useEffect(() => {
    onPendingChange?.(!resolved || visible || settings);
  }, [onPendingChange, resolved, settings, visible]);

  const save = (next) => {
    const value = next ?? prefs;
    try {
      window.localStorage.setItem(COOKIE_KEY, JSON.stringify(value));
    } catch {
      // The interface still closes when storage is unavailable.
    }
    setPrefs(value);
    setVisible(false);
    setSettings(false);
  };

  if (!visible) {
    return (
      <button type="button" className="cookie-reopen" onClick={() => setVisible(true)}>
        Cookie settings
      </button>
    );
  }

  if (settings) {
    return (
      <div className="cookie-modal-layer">
        <div className="cookie-settings" role="dialog" aria-modal="true" aria-label="Cookie settings">
          <h2>Cookie Settings</h2>
          <p>Choose which optional cookie categories you would allow. No analytics are loaded.</p>
          {Object.entries(prefs).map(([key, value]) => (
            <label key={key}>
              <span>
                <strong>{key[0].toUpperCase() + key.slice(1)}</strong>
                <small>
                  {key === "essential"
                    ? "Required for the local interface."
                    : "Optional preference only; no third-party scripts are loaded."}
                </small>
              </span>
              <input
                type="checkbox"
                checked={value}
                disabled={key === "essential"}
                onChange={(event) =>
                  setPrefs((current) => ({ ...current, [key]: event.target.checked }))
                }
              />
            </label>
          ))}
          <div className="cookie-actions">
            <button type="button" onClick={() => save()}>
              Save
            </button>
            <button type="button" onClick={() => setSettings(false)}>
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <div>
        <strong>We value your privacy</strong>
        <p>
          This local recreation uses browser storage only to remember your cookie choice.
          It does not load analytics.
        </p>
      </div>
      <div className="cookie-actions">
        <button
          type="button"
          onClick={() =>
            save({ essential: true, marketing: true, functional: true, analytics: true })
          }
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() =>
            save({ essential: true, marketing: false, functional: false, analytics: false })
          }
        >
          Decline All
        </button>
        <button type="button" onClick={() => setSettings(true)}>
          Settings
        </button>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <section className="not-found">
      <h1>Page not found</h1>
      <LocalLink href="/" className="button button-green">
        Return home
      </LocalLink>
    </section>
  );
}

function Page({ path }) {
  if (path === "/") return <HomePage />;
  if (path === "/roof-installations-repairs") return <RoofPage />;
  if (path === "/joinery") return <JoineryPage />;
  if (path === "/contact-us") return <ContactPage />;
  if (path === "/privacy-policy") return <PrivacyPage />;
  return <NotFound />;
}

export function App() {
  const [path, setPath] = useState(getRoutePath);
  const [menuOpen, setMenuOpen] = useState(false);
  const [consentPending, setConsentPending] = useState(true);

  useEffect(() => {
    const onPopState = () => {
      setPath(getRoutePath());
      setMenuOpen(false);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    document.title = PAGE_TITLES[path] ?? "JC Roofing & Joinery LTD";
  }, [path]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to Main Content
      </a>
      <Header onMenu={() => setMenuOpen(true)} />
      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main id="main-content">
        <Page path={path} />
      </main>
      <Footer />
      <AgencyChat consentPending={consentPending} />
      <CookieInterface onPendingChange={setConsentPending} />
    </>
  );
}
