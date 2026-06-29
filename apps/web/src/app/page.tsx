import { buttonVariants } from '@unwired/ui/components/button';
import { cn } from '@unwired/ui/lib/utils';
import Link from 'next/link';

import { ArrowUpRight, ProductVisual } from '@/components/product-visual';

const bookingUrl = 'https://cal.com/jan-silhan-unwired/frontend-consultation';

const services = [
  {
    index: '01',
    title: 'Implementation',
    description:
      'Hands-on delivery for critical React interfaces where quality, momentum, and senior judgment matter.',
  },
  {
    index: '02',
    title: 'Frontend direction',
    description:
      'Clear technical leadership for teams making consequential product and interface decisions.',
  },
  {
    index: '03',
    title: 'UI architecture',
    description:
      'Structures that keep complex interfaces understandable, maintainable, and ready to evolve.',
  },
  {
    index: '04',
    title: 'Design systems',
    description:
      'Reusable foundations shaped by production needs, not component-library theatre.',
  },
];

const experience = [
  'Senior frontend implementation across product teams and React codebases.',
  'UI architecture and design-system judgment grounded in shipping interfaces.',
  'Founder-led product work behind Unwired Mail and Unwired Calendar.',
];

export default function Home() {
  return (
    <main
      className="site-main home-page"
      id="main-content">
      <section className="home-hero page-grid reveal">
        <div className="home-hero__copy">
          <p className="eyebrow">
            <span>00</span>
            Products &amp; frontend consultancy
          </p>
          <h1 className="display-title">
            Better products. <em>Better frontends.</em>
          </h1>
          <p className="home-hero__lead">
            Unwired builds on-device AI products and helps ambitious teams ship
            clearer, stronger React interfaces.
          </p>
          <div className="home-hero__actions">
            <Link
              className={cn(buttonVariants({ size: 'lg' }), 'cta-button')}
              href="#products">
              Explore products
              <ArrowUpRight />
            </Link>
            <a
              className={cn(
                buttonVariants({ size: 'lg', variant: 'outline' }),
                'cta-button',
              )}
              href={bookingUrl}
              rel="noreferrer"
              target="_blank">
              Book a consultation
              <ArrowUpRight />
            </a>
          </div>
        </div>

        <aside
          aria-label="Unwired disciplines"
          className="home-hero__register">
          <p className="home-hero__register-label">Practice register</p>
          <ol>
            <li>
              <span>01</span>
              On-device AI products
            </li>
            <li>
              <span>02</span>
              Frontend implementation
            </li>
            <li>
              <span>03</span>
              UI architecture
            </li>
            <li>
              <span>04</span>
              Design systems
            </li>
          </ol>
          <p className="home-hero__register-note">
            Independent, founder-led, and close to the work.
          </p>
        </aside>
      </section>

      <section
        className="home-products page-grid"
        id="products">
        <div className="home-section-intro reveal">
          <p className="eyebrow">
            <span>01</span>
            Products
          </p>
          <h2>Personal context should stay personal.</h2>
          <p>
            Unwired Mail and Unwired Calendar are separate products shaped by
            one idea: useful AI can work close to your communication and time.
          </p>
        </div>

        <Link
          className="product-feature product-feature--mail reveal"
          href="/unwired-mail">
          <ProductVisual kind="mail" />
          <div className="product-feature__copy">
            <div>
              <p className="eyebrow">
                <span>01</span>
                Coming soon
              </p>
              <h3>Unwired Mail</h3>
            </div>
            <p>Privacy-first email with on-device AI.</p>
            <span className="product-feature__link">
              Read the product story
              <ArrowUpRight />
            </span>
          </div>
        </Link>

        <Link
          className="product-feature product-feature--calendar reveal reveal--delay"
          href="/unwired-calendar">
          <ProductVisual kind="calendar" />
          <div className="product-feature__copy">
            <div>
              <p className="eyebrow">
                <span>02</span>
                Coming soon
              </p>
              <h3>Unwired Calendar</h3>
            </div>
            <p>Remember what matters with on-device AI.</p>
            <span className="product-feature__link">
              Read the product story
              <ArrowUpRight />
            </span>
          </div>
        </Link>
      </section>

      <section
        aria-labelledby="services-title"
        className="home-services"
        id="services">
        <div className="page-grid">
          <div className="home-services__intro reveal">
            <p className="eyebrow">
              <span>02</span>
              Frontend Consultancy
            </p>
            <h2 id="services-title">
              Senior frontend help, without the hand‑off chain.
            </h2>
            <p>
              The same product judgment behind Unwired Mail and Unwired Calendar
              is available directly to teams that need implementation and
              frontend leadership.
            </p>
            <a
              className={cn(buttonVariants({ size: 'lg' }), 'cta-button')}
              href={bookingUrl}
              rel="noreferrer"
              target="_blank">
              Book a frontend consultation
              <ArrowUpRight />
            </a>
          </div>

          <ol className="service-list reveal reveal--delay">
            {services.map((service) => (
              <li key={service.index}>
                <span>{service.index}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="home-experience page-grid reveal">
        <div className="home-experience__intro">
          <p className="eyebrow">
            <span>03</span>
            Selected experience
          </p>
          <h2>Judgment backed by shipped frontend work.</h2>
        </div>
        <div className="home-experience__body">
          <p>
            Jan Šilhan&apos;s public work history is the reference point for
            Unwired&apos;s frontend leadership, implementation, and product
            taste.
          </p>
          <ol>
            {experience.map((item, index) => (
              <li key={item}>
                <span>0{index + 1}</span>
                {item}
              </li>
            ))}
          </ol>
          <a
            className={cn(
              buttonVariants({ size: 'lg', variant: 'outline' }),
              'cta-button',
            )}
            href="https://www.linkedin.com/in/jan-%C5%A1ilhan/"
            rel="noreferrer"
            target="_blank">
            View Jan&apos;s LinkedIn
            <ArrowUpRight />
          </a>
        </div>
      </section>

      <section
        className="home-about page-grid reveal"
        id="about">
        <p className="eyebrow">
          <span>04</span>
          About
        </p>
        <div className="home-about__body">
          <h2>Built by Jan Šilhan, close to the product and the code.</h2>
          <div className="home-about__columns">
            <p>
              Jan builds on-device AI products for personal communication and
              time while helping product teams ship high-quality React
              interfaces.
            </p>
            <p>
              The product work sharpens the consultancy judgment. The
              consultancy keeps the product standards grounded in real frontend
              delivery.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
