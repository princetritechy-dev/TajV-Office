// /app/page.tsx
import { getHomePage } from "@/lib/contentful";
import ClientInteractions from "@/components/ClientInteractions";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";

export const revalidate = 60;

function RT({ value }: { value?: Document | string }) {
  if (!value) return null;
  if (typeof value === "string") return <>{value}</>;
  return <>{documentToReactComponents(value)}</>;
}

export default async function Home() {
  const page = await getHomePage();
  if (!page) return <div style={{ padding: 24 }}>Home page not found in Contentful.</div>;

  const f = page.fields || {};

  // Safe mappers (handles linked entries + missing fields)
  const benefits = (f.benefits || []).map((x: any) => x?.fields || null).filter(Boolean);

  // NOTE: Contentful key is misspelled in your model: "recieveCards"
  const recieveCards = (f.recieveCards || []).map((x: any) => x?.fields || null).filter(Boolean);

  const steps = (f.steps || [])
    .map((x: any) => x?.fields || null)
    .filter(Boolean)
    .sort((a: any, b: any) => (a.number ?? 0) - (b.number ?? 0));

  const features = (f.platformFeatures || []).map((x: any) => x?.fields || null).filter(Boolean);
  const testimonials = (f.testimonials || []).map((x: any) => x?.fields || null).filter(Boolean);
  const faqs = (f.faqs || []).map((x: any) => x?.fields || null).filter(Boolean);

  // PICK LOCATIONS (Pick Your Perfect Business Address)
  const pickLocations = (f.pickLocations || []).map((x: any) => x?.fields || null).filter(Boolean);

  // Debug (remove after fixed)
  console.log("benefits fields:", benefits);
  console.log("recieveCards fields:", recieveCards);
  console.log("HOME fields keys:", Object.keys(f || {}));
  console.log("recieveCards raw:", f.recieveCards);
  console.log("pickLocations fields:", pickLocations);
  console.log("pickLocations raw:", f.pickLocations);
  console.log("Hero BG:", f.heroBannerImage);
  console.log("compilanceSection raw:", f?.complianceSection);


  const heroTitle1 = f.heroTitleLine1 || "Your UK Business";
  const heroTitle2 = f.heroTitleLine2 || "Address. Anywhere.";
  const heroBtn1Text = f.heroButton1Text || "Get Started";
  const heroBtn1Url = f.heroButton1Url || "#";
  const heroBtn2Text = f.heroButton2Text || "Choose Your Address";
  const heroBtn2Url = f.heroButton2Url || "#";
  const heroBg =
  f.heroBannerImage?.fields?.file?.url
    ? `https:${f.heroBannerImage.fields.file.url}`
    : "";

  const pickTitle = f.pickTitle || "Pick Your Perfect Business Address";
  const pickSubtitle =
    f.pickSubtitle ||
    "Choose a professional location that supports the image you want for your business. Our Mayfair address is known for its reputation, quality and high-quality surroundings.";

  return (
    <>
      <ClientInteractions />

      <header className="site-header">
        <div className="container header-inner">
          <div className="virtualoffice_logo_wrapper">
          <a className="brand" href="#">
            <img src="/logo.png" alt=""/>
          </a>
        </div>
          <button className="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className="site-nav" aria-label="Primary">
            <a href="#">Plans</a>
            <a href="#">Locations</a>
            <a href="#">Support</a>
            <a href="#">About Us</a>
            <a href="#">Contact Us</a>
            <a className="nav-login" href="#">
              Login
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-bg"
              aria-hidden="true"
              style={{ backgroundImage: heroBg ? `url(${heroBg})` : "none" }}>

<div className="container hero-inner">
            <div className="hero-left">
              <h1 className="hero-title">
                {heroTitle1} 
                <span>{heroTitle2}</span>
              </h1>

              <div className="hero-sub">
                <RT value={f.heroDescription} />
              </div>

              <div className="hero-actions">
                <a className="btn btn-primary1" href={heroBtn1Url}>
                  {heroBtn1Text}
                </a>
                <a className="btn btn-outline" href={heroBtn2Url}>
                  {heroBtn2Text}
                </a>
              </div>

              <p className="hero-note">
                A virtual office gives you the freedom to work from anywhere while using a company address for important business mail and to boost credibility.
              </p>
            </div>

            <div className="hero-right">
              <div className="hero-card">
                <div className="hero-card-top">
                  <div className="topcard-imgsec"><img src="/icon.png" alt="Building Icon" className="hc-icon" /></div>
                  <div className="top-card-titlesec">
                    <span className="hc-label">Active Address</span>
                  <div className="hc-title">Mayfair, London</div>
                  </div>
                </div>
                <div className="hc-lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
          </div>
          
        </section>

        {/* WHY + BENEFITS */}
        <section className="why">
          <div className="why-inner sec-max-wid">
            <div className="why-left why-col-common">
              <h2 className="section-title">{f.whyTitle || "Why Choose Virtual Office Anywhere"}</h2>
              <p className="section-lead">{f.whySubtitle || "A virtual office service designed to support your business"}</p>

              <div className="muted">
                <RT value={f.whyParagraph1} />
              </div>
              <div className="muted">
                <RT value={f.whyParagraph2} />
              </div>
            </div>

            <div className="why-right why-col-common">
              <div className="benefits-card">
                <h3 className="benefits-title">Benefits of choosing us</h3>

                <ul className="benefits-list">
                  {benefits.length ? (
                    benefits.map((b: any, i: number) => (
                      <li key={i}>
                        <span className="check" aria-hidden="true">
                            <img src="/symbol.png" alt="" width="16" height="16" />
                        </span>

                        {b.text ?? b.title ?? b.benefitText ?? b.label ?? ""}
                      </li>
                    ))
                  ) : (
                    <li>
                      <span className="check" aria-hidden="true"></span>
                      Add benefits entries in Contentful
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT YOU RECEIVE */}
        <section className="receive">
          <div className="container">
            <h2 className="section-title center">What You Receive</h2>

            <div className="receive-grid">
              {recieveCards.length ? (
                recieveCards.map((c: any, i: number) => {
                  const href = c.linkUrl || c.url || "#";
                  const linkText = c.linkText || "";

                  return (
                    <article
                    key={i}
                    className={`rcard ${c.isHighlighted ? "rcard-active" : ""}`}
                  >
                  <div className="rcard-icon" aria-hidden="true">
                    {c.icon?.fields?.file?.url && (
                      <img
                        src={`https:${c.icon.fields.file.url}`}
                        alt={c.icon.fields.title ?? ""}
                        width={22}
                        height={22}
                      />
                    )}
                  </div>

                  <h3>{c.title ?? ""}</h3>
                  <p className="rcard-meta">{c.metaLabel ?? ""}</p>
                  <p className="rcard-text">{c.description ?? ""}</p>

                  {linkText ? (
                    <a className="rcard-link" href={href}>
                      {linkText}
                    </a>
                  ) : null}

                  <p className="rcard-subtext">{c.subText ?? ""}</p>
                </article>

                  );
                })
              ) : (
                <div style={{ padding: 12, color: "#5f6b86" }}>
                  Add “Receive Card” entries in Contentful and link them to Home page → recieveCards. <br />
                  <strong>Important:</strong> Publish the Home page entry (Delivery API shows only Published).
                </div>
              )}
            </div>
          </div>
        </section>

        {/* PICK YOUR PERFECT BUSINESS ADDRESS */}
        <section className="pick">
          <div className="container">
            <h2 className="section-title center">{pickTitle}</h2>

            <p className="muted center" style={{ maxWidth: 820, margin: "10px auto 0" }}>
              <RT value={pickSubtitle} />
            </p>

            <div className="pick-list">
              {pickLocations.length ? (
                pickLocations.map((loc: any, i: number) => {
                  const imgUrl = loc?.image?.fields?.file?.url ? `https:${loc.image.fields.file.url}` : "";
                  const btnText = loc.buttonText || "View Plans";
                  const btnUrl = loc.buttonUrl || "#";

                  return (
                    <article className="pick-card" key={i}>
                      <div className="pick-media">
                        {imgUrl ? <img src={imgUrl} alt={loc.title || "Location"} /> : <div className="pick-media-placeholder" />}
                      </div>

                      <div className="pick-content">
                        {loc.badgeText ? <span className="pick-badge">{loc.badgeText}</span> : null}
                        <h3 className="pick-title">{loc.title || ""}</h3>
                        <p className="pick-desc">{loc.description || ""}</p>

                        <a className="btn btn-primary pick-btn" href={btnUrl}>
                          {btnText}
                        </a>
                      </div>
                    </article>
                  );
                })
              ) : (
                <div style={{ padding: 12, color: "#5f6b86", textAlign: "center" }}>
                  Add Location entries in Contentful and link them to Home → pickLocations, then publish.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="how">
          <div className="container">
            <h2 className="section-title center light" style={{color:"#FFFFFF"}}>How It Works</h2>
            <p className="muted center light-sub howitworks" style={{color:"#D1D5DB"}}>A simple setup with support at every step</p>

            <div className="how-grid">
              {steps.map((s: any, i: number) => (
                <article className="how-card" key={i}>
                  <div className="step">{s.number}</div>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </article>
              ))}
            </div>

            <p className="how-note">Complete setup in as little as one business day once documents are approved.</p>
          </div>
        </section>
       {/* COMPLIANCE & SECURITY */}
        {(() => {
          // compilanceSection is ARRAY in your API response
          const csEntry = Array.isArray(f?.compilanceSection)
            ? f.compilanceSection[0]
            : f?.compilanceSection;

          const cs = csEntry?.fields;
          if (!cs) return null;

          // complianceItem is also array (or sometimes single)
          const raw = cs?.complianceItem || [];
          const items = Array.isArray(raw) ? raw : raw ? [raw] : [];

          const finalItems = items
            .map((x: any) => x?.fields || null)
            .filter(Boolean);

          return (
            <section className="compliance">
              <div className="container">
                <h2 className="section-title">
                  {cs.title || "Compliance and Security"}
                </h2>

                <p className="muted">
                  {cs.subtitle || "We keep things simple while protecting your business"}
                </p>

                <div className="compliance-grid">
                  {finalItems.map((item: any, i: number) => (
                    <div className="compliance-card" key={i}>
                      <h3>{item.title || ""}</h3>
                      <p>{item.description || ""}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })()}


        {/* PLATFORM FEATURES */}
        <section className="platform">
          <div className="container">
            <h2 className="section-title center platform-heading">Platform Features</h2>
            <p className="muted center platform plaform-subtitle">Everything you need in one place.</p>

            <div className="platform-grid">
              {features.map((p: any, i: number) => (
                <div className="p-card" key={i}>
                  <div className="p-ic" aria-hidden="true">
                    {p.icon?.fields?.file?.url ? (
                      <img
                        src={`https:${p.icon.fields.file.url}`}
                        alt=""
                        width="22"
                        height="22"
                      />
                    ) : null}
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="trusted">
          <div className="container">
            <h2 className="section-title center light">Trusted by businesses of all sizes</h2>

            <div className="testi-grid">
              {testimonials.map((t: any, i: number) => (
                <article className="testi-card" key={i}>
                  <div className="stars" aria-hidden="true">
                    {Array.from({ length: Math.min(5, Number(t.stars || 5)) }).map((_, i) => (
                      <i key={i} className="fas fa-star" />
                    ))}
                  </div>
                  <p>“{t.quote}”</p>
                  <div className="testi-name">— {t.name}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq">
          <div className="container">
            <h2 className="section-title center faq">Frequently Asked Questions</h2>

            <div className="faq-box">
              {faqs.map((q: any, i: number) => (
                <div className="fq-content" key={i}>
                  <button className="faq-q" type="button" aria-expanded="false">
                    <span>{q.question}</span>
                  </button>
                  <div className="faq-a">
                    {q.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <div className="brand-text">
              <img src="/logo2.png" alt="" style={{height:"60px"}} />
            </div>
          </div>
          <div className="footer-copy">© 2025 Virtual Office Anywhere. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}