import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import {
  externalLinks,
  featuredWork,
  focusAreas,
  hackathons,
  internalPages,
  personalEntries,
  profile,
  researchGlimpses,
  workEntries,
} from './siteData'

type PageId = 'home' | 'work' | 'hackathons' | 'personal'
type Theme = 'light' | 'dark'
type Route =
  | { page: 'home' }
  | { page: 'work'; slug?: string }
  | { page: 'hackathons'; slug?: string }
  | { page: 'personal' }

const THEME_STORAGE_KEY = 'portfolio-theme'

function getRouteFromHash(hash: string): Route {
  const normalized = hash.replace(/^#\/?/, '').trim()
  const [section, slug] = normalized.split('/').filter(Boolean)

  if (section === 'work') {
    return slug ? { page: 'work', slug } : { page: 'work' }
  }

  if (section === 'hackathons') {
    return slug ? { page: 'hackathons', slug } : { page: 'hackathons' }
  }

  if (section === 'personal') {
    return { page: 'personal' }
  }

  return { page: 'home' }
}

function getPageHref(page: PageId): string {
  return page === 'home' ? '#/' : `#/${page}`
}

function getWorkDetailHref(slug: string): string {
  return `#/work/${slug}`
}

function getHackathonDetailHref(slug: string): string {
  return `#/hackathons/${slug}`
}

function getPreferredTheme(): Theme {
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => getRouteFromHash(window.location.hash))

  useEffect(() => {
    const syncPage = () => {
      setRoute(getRouteFromHash(window.location.hash))
    }

    window.addEventListener('hashchange', syncPage)
    return () => window.removeEventListener('hashchange', syncPage)
  }, [])

  return route
}

function App() {
  const route = useHashRoute()
  const [theme, setTheme] = useState<Theme>(() => getPreferredTheme())

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    let frameId = 0

    const updateTraceAngle = (time: number) => {
      const angle = (time * 0.18) % 360
      document.documentElement.style.setProperty('--trace-angle', `${angle}deg`)
      frameId = window.requestAnimationFrame(updateTraceAngle)
    }

    frameId = window.requestAnimationFrame(updateTraceAngle)

    return () => window.cancelAnimationFrame(frameId)
  }, [])

  const nextTheme = theme === 'light' ? 'dark' : 'light'

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#/">
          <span className="brand-mark">MR</span>
          <span>
            <strong>{profile.name}</strong>
            <small>{profile.shortTitle}</small>
          </span>
        </a>

        <nav className="site-nav" aria-label="Primary">
          {internalPages.map((item) => (
            <a
              key={item.id}
              className={route.page === item.id ? 'nav-link is-active' : 'nav-link'}
              href={getPageHref(item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-links">
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setTheme(nextTheme)}
            aria-label={`Switch to ${nextTheme} mode`}
            aria-pressed={theme === 'dark'}
          >
            <span className="theme-toggle-icon" aria-hidden="true">
              {theme === 'light' ? '◐' : '◑'}
            </span>
            <span>{theme === 'light' ? 'Dark mode' : 'Light mode'}</span>
          </button>
          {externalLinks.map((link) => (
            <a key={link.label} className="ghost-link" href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined}>
              {link.label}
            </a>
          ))}
        </div>
      </header>

      <main className="page-frame">
        {route.page === 'home' ? <HomePage /> : null}
        {route.page === 'work' && !route.slug ? <WorkPage /> : null}
        {route.page === 'hackathons' && !route.slug ? <HackathonsPage /> : null}
        {route.page === 'personal' ? <PersonalPage /> : null}
        {route.page === 'work' && route.slug ? <WorkDetailPage slug={route.slug} /> : null}
        {route.page === 'hackathons' && route.slug ? <HackathonDetailPage slug={route.slug} /> : null}
      </main>

      <footer className="site-footer">
        <p>{profile.footerNote}</p>
        <div className="footer-links">
          {externalLinks.map((link) => (
            <a key={link.label} href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined}>
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}

function HomePage() {
  return (
    <div className="page-content page-enter">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">{profile.eyebrow}</p>
          <h1>{profile.name}</h1>
          <p className="hero-title">{profile.title}</p>
          <p className="hero-summary">{profile.summary}</p>

          <div className="hero-actions">
            <a className="button-link button-link-solid" href="#/work">
              View Work
            </a>
            <a className="button-link button-link-soft" href="#/hackathons">
              Hackathons
            </a>
          </div>

          <dl className="hero-meta">
            <div>
              <dt>Based in</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>Studying</dt>
              <dd>{profile.school}</dd>
            </div>
            <div>
              <dt>Expected graduation</dt>
              <dd>{profile.graduation}</dd>
            </div>
          </dl>
        </div>

        <figure className="hero-portrait-card">
          <img src={profile.heroImage.src} alt={profile.heroImage.alt} />
          <figcaption>{profile.heroImage.caption}</figcaption>
        </figure>
      </section>

      <section className="section-block compact-section">
        <div className="section-heading">
          <p className="eyebrow">Focus</p>
          <h2>Computer vision, graphics, and systems work.</h2>
          <a className="inline-link" href="#/work/ucsc-research">
            Research
          </a>
        </div>

        <div className="focus-strip">
          {focusAreas.map((area, index) => (
            <a
              key={area.title}
              className="card-link"
              href={area.href}
              style={{ '--delay': `${index * 70}ms` } as CSSProperties}
            >
              <article className="focus-card">
                <p className="card-tag">{area.tag}</p>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            </a>
          ))}
        </div>
      </section>

      <section className="section-block compact-section">
        <div className="section-heading">
          <p className="eyebrow">Selected Work</p>
          <h2>Three things to open first.</h2>
          <a className="inline-link" href="#/work">
            All work
          </a>
        </div>

        <div className="feature-grid">
          {featuredWork.map((item, index) => (
            <a
              key={item.title}
              className="card-link"
              href={item.href}
              style={{ '--delay': `${index * 100}ms` } as CSSProperties}
            >
              <article className="feature-card">
                <div className="feature-card-header">
                  <p className="card-tag">{item.eyebrow}</p>
                  <h3>{item.title}</h3>
                </div>
                <p>{item.description}</p>
                <ul className="tag-list">
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </article>
            </a>
          ))}
        </div>
      </section>

      <section className="section-block compact-section">
        <div className="section-heading">
          <p className="eyebrow">Research</p>
          <h2>Recent snapshots.</h2>
          <a className="inline-link" href="#/work/ucsc-research">
            Full research page
          </a>
        </div>

        <div className="research-grid">
          {researchGlimpses.map((glimpse, index) => (
            <a
              key={glimpse.title}
              className="card-link"
              href={glimpse.href}
              style={{ '--delay': `${index * 120}ms` } as CSSProperties}
            >
              <figure className="research-card">
                <img src={glimpse.image.src} alt={glimpse.image.alt} />
                <figcaption>
                  <p className="card-tag">{glimpse.eyebrow}</p>
                  <h3>{glimpse.title}</h3>
                  <p>{glimpse.caption}</p>
                </figcaption>
              </figure>
            </a>
          ))}
        </div>
      </section>

      <section className="section-block compact-section community-strip">
        <div className="community-copy">
          <p className="eyebrow">Team Work</p>
          <h2>Blueprint and hackathons.</h2>
          <p>
            The collaborative side of my work lives mostly in Blueprint and hackathons.
          </p>
          <div className="community-links">
            <a className="inline-link" href="#/work">
              Blueprint
            </a>
            <a className="inline-link" href="#/hackathons">
              Hackathons
            </a>
          </div>
        </div>

        <div className="photo-strip">
          <a className="card-link" href={profile.communityImages[0].href}>
            <figure className="photo-card">
              <img src={profile.communityImages[0].src} alt={profile.communityImages[0].alt} />
              <figcaption>{profile.communityImages[0].caption}</figcaption>
            </figure>
          </a>
          <a className="card-link" href={profile.communityImages[1].href}>
            <figure className="photo-card">
              <img src={profile.communityImages[1].src} alt={profile.communityImages[1].alt} />
              <figcaption>{profile.communityImages[1].caption}</figcaption>
            </figure>
          </a>
        </div>
      </section>

      <section className="section-block compact-section">
        <div className="section-heading">
          <p className="eyebrow">Personal</p>
          <h2>Stuff I do outside of projects.</h2>
          <a className="inline-link" href="#/personal">
            Personal page
          </a>
        </div>

        <div className="personal-strip">
          {personalEntries.slice(0, 2).map((entry, index) => (
            <a
              key={entry.title}
              className="card-link"
              href="#/personal"
              aria-label={`Open personal page from ${entry.title}`}
              style={{ '--delay': `${index * 80}ms` } as CSSProperties}
            >
              <article className="personal-card">
                <img src={entry.image.src} alt={entry.image.alt} />
                <div className="personal-card-copy">
                  <p className="card-tag">{entry.tag}</p>
                  <h3>{entry.title}</h3>
                  <p>{entry.description}</p>
                </div>
              </article>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}

function WorkPage() {
  return (
    <div className="page-content page-enter">
      <section className="page-intro">
        <p className="eyebrow">Work</p>
        <h1>Research, projects, and team-based product work.</h1>
        <p>
          A compact overview of the work I would want a recruiter, engineer, or lab to see first.
        </p>
      </section>

      <section className="timeline">
        {workEntries.map((entry, index) => (
          <a
            key={entry.slug}
            href={getWorkDetailHref(entry.slug)}
            className="entry-link"
            style={{ '--delay': `${index * 110}ms` } as CSSProperties}
          >
            <article className={entry.image ? 'timeline-card has-image' : 'timeline-card'}>
              <div className="timeline-copy">
                <p className="eyebrow">{entry.eyebrow}</p>
                <div className="timeline-heading">
                  <div>
                    <h2>{entry.title}</h2>
                    <p className="timeline-subtitle">{entry.subtitle}</p>
                  </div>
                  <p className="timeline-date">{entry.timeframe}</p>
                </div>
                <p>{entry.description}</p>
                <ul className="detail-list">
                  {entry.highlights.slice(0, 2).map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <div className="entry-footer">
                  <ul className="tag-list">
                    {entry.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <span className="entry-cta">Open</span>
                </div>
              </div>

              {entry.image ? (
                <figure className="timeline-image">
                  <img src={entry.image.src} alt={entry.image.alt} />
                  <figcaption>{entry.image.caption}</figcaption>
                </figure>
              ) : null}
            </article>
          </a>
        ))}
      </section>
    </div>
  )
}

function HackathonsPage() {
  return (
    <div className="page-content page-enter">
      <section className="page-intro">
        <p className="eyebrow">Hackathons</p>
        <h1>Fast builds under short timelines.</h1>
        <p>
          Short snapshots from events where the goal was to get from idea to demo fast.
        </p>
      </section>

      <div className="hackathon-grid">
        {hackathons.map((hackathon, index) => (
          <a
            key={hackathon.slug}
            href={getHackathonDetailHref(hackathon.slug)}
            className="entry-link"
            style={{ '--delay': `${index * 130}ms` } as CSSProperties}
          >
            <article className="hackathon-card">
              <figure className="hackathon-image">
                <img src={hackathon.image.src} alt={hackathon.image.alt} />
                <figcaption>{hackathon.image.caption}</figcaption>
              </figure>

              <div className="hackathon-copy">
                <p className="eyebrow">{hackathon.eventType}</p>
                <h2>{hackathon.name}</h2>
                <p className="timeline-subtitle">{hackathon.subtitle}</p>
                <p>{hackathon.description}</p>
                <ul className="detail-list">
                  {hackathon.highlights.slice(0, 2).map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <div className="entry-footer">
                  <ul className="tag-list">
                    {hackathon.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <span className="entry-cta">Open</span>
                </div>
              </div>
            </article>
          </a>
        ))}
      </div>
    </div>
  )
}

function PersonalPage() {
  return (
    <div className="page-content page-enter">
      <section className="page-intro">
        <p className="eyebrow">Personal</p>
        <h1>Things I do outside of classes, labs, and side projects.</h1>
        <p>
          A small page for the parts of life that keep me curious, competitive, and balanced.
        </p>
      </section>

      <section className="personal-grid">
        {personalEntries.map((entry, index) => (
          <article
            key={entry.title}
            className="personal-card"
            style={{ '--delay': `${index * 90}ms` } as CSSProperties}
          >
            <img src={entry.image.src} alt={entry.image.alt} />
            <div className="personal-card-copy">
              <p className="card-tag">{entry.tag}</p>
              <h2>{entry.title}</h2>
              <p>{entry.description}</p>
              <p className="personal-note">{entry.note}</p>
              {entry.image.caption ? <p className="personal-caption">{entry.image.caption}</p> : null}
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

function WorkDetailPage({ slug }: { slug: string }) {
  const entry = workEntries.find((item) => item.slug === slug)

  if (!entry) {
    return <NotFoundPage href="#/work" label="Back to work" />
  }

  return (
    <DetailPageShell
      backHref="#/work"
      backLabel="Back to Work"
      eyebrow={entry.eyebrow}
      title={entry.title}
      subtitle={entry.subtitle}
      timeframe={entry.timeframe}
      summary={entry.detailSummary}
      tags={entry.tags}
      image={entry.image}
      sections={entry.detailSections}
    />
  )
}

function HackathonDetailPage({ slug }: { slug: string }) {
  const entry = hackathons.find((item) => item.slug === slug)

  if (!entry) {
    return <NotFoundPage href="#/hackathons" label="Back to hackathons" />
  }

  return (
    <DetailPageShell
      backHref="#/hackathons"
      backLabel="Back to Hackathons"
      eyebrow={entry.eventType}
      title={entry.name}
      subtitle={entry.subtitle}
      summary={entry.detailSummary}
      tags={entry.tags}
      image={entry.image}
      sections={entry.detailSections}
      gallery={entry.gallery}
    />
  )
}

type DetailPageShellProps = {
  backHref: string
  backLabel: string
  eyebrow: string
  title: string
  subtitle: string
  summary: string
  tags: string[]
  sections: Array<{ title: string; items: string[] }>
  timeframe?: string
  image?: { src: string; alt: string; caption?: string }
  gallery?: Array<{ src: string; alt: string; caption?: string }>
}

function DetailPageShell({
  backHref,
  backLabel,
  eyebrow,
  title,
  subtitle,
  summary,
  tags,
  sections,
  timeframe,
  image,
  gallery,
}: DetailPageShellProps) {
  return (
    <div className="page-content page-enter">
      <section className="detail-hero">
        <div className="detail-copy">
          <a className="back-link" href={backHref}>
            {backLabel}
          </a>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="hero-title">{subtitle}</p>
          {timeframe ? <p className="detail-timeframe">{timeframe}</p> : null}
          <p className="hero-summary">{summary}</p>
          <ul className="tag-list">
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>

        {image ? (
          <figure className="detail-image">
            <img src={image.src} alt={image.alt} />
            {image.caption ? <figcaption>{image.caption}</figcaption> : null}
          </figure>
        ) : null}
      </section>

      <section className="detail-sections">
        {sections.map((section, index) => (
          <article
            key={section.title}
            className="detail-card"
            style={{ '--delay': `${index * 90}ms` } as CSSProperties}
          >
            <h2>{section.title}</h2>
            <ul className="detail-list">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      {gallery && gallery.length > 0 ? (
        <section className="detail-gallery">
          {gallery.map((item, index) => (
            <figure
              key={`${item.src}-${index}`}
              className="detail-gallery-card"
              style={{ '--delay': `${index * 80}ms` } as CSSProperties}
            >
              <img src={item.src} alt={item.alt} />
              {item.caption ? <figcaption>{item.caption}</figcaption> : null}
            </figure>
          ))}
        </section>
      ) : null}
    </div>
  )
}

function NotFoundPage({ href, label }: { href: string; label: string }) {
  return (
    <div className="page-content page-enter">
      <section className="page-intro">
        <p className="eyebrow">Not Found</p>
        <h1>That page is not here.</h1>
        <a className="inline-link" href={href}>
          {label}
        </a>
      </section>
    </div>
  )
}

export default App
