import {
  awards,
  education,
  experience,
  personalNote,
  personalPhotos,
  profile,
  projects,
  skills,
} from './siteData'

function App() {
  return (
    <main className="page">
      <header className="header">
        <h1>{profile.name}</h1>
        <p className="contact">
          <span>{profile.location}</span>
          <span>·</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <span>·</span>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </p>
      </header>

      <div className="columns">
        <div className="main-col">
          <section>
            <h2>Experience</h2>
            {experience.map((entry) => (
              <div className="entry" key={entry.title + entry.org}>
                <div className="entry-head">
                  <strong>{entry.title}</strong>
                  <span>{entry.timeframe}</span>
                </div>
                <div className="entry-sub">
                  <em>{entry.org}</em>
                  <span>{entry.location}</span>
                </div>
                <ul>
                  {entry.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                {entry.image ? (
                  <img
                    className="entry-image"
                    src={entry.image.src}
                    alt={entry.image.alt}
                  />
                ) : null}
              </div>
            ))}
          </section>

          <section>
            <h2>Projects</h2>
            {projects.map((project) => (
              <div className="entry" key={project.name}>
                <div className="entry-head">
                  <strong>
                    <a href={project.url} target="_blank" rel="noreferrer">
                      {project.name}
                    </a>
                    <span className="stack"> — {project.stack}</span>
                  </strong>
                  <span>{project.timeframe}</span>
                </div>
                <ul>
                  {project.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                {project.image ? (
                  <img
                    className="entry-image"
                    src={project.image.src}
                    alt={project.image.alt}
                  />
                ) : null}
              </div>
            ))}
          </section>
        </div>

        <aside className="side-col">
          <section>
            <h2>Education</h2>
            <div className="entry">
              <div className="entry-head">
                <strong>{education.school}</strong>
              </div>
              <div className="entry-sub">
                <em>{education.degree}</em>
              </div>
              <div className="entry-sub">
                <span>GPA {education.gpa}</span>
                <span>{education.graduation}</span>
              </div>
            </div>
          </section>

          <section>
            <h2>Skills</h2>
            <ul className="skills">
              <li>
                <strong>Languages:</strong> {skills.languages}
              </li>
              <li>
                <strong>Frameworks:</strong> {skills.frameworks}
              </li>
              <li>
                <strong>Tools:</strong> {skills.tools}
              </li>
            </ul>
          </section>

          <section>
            <h2>Awards</h2>
            <ul>
              {awards.map((award) => (
                <li key={award}>{award}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Personal</h2>
            <p>{personalNote}</p>
            <div className="photos">
              {personalPhotos.map((photo) => (
                <figure key={photo.src}>
                  <img src={photo.src} alt={photo.alt} />
                  <figcaption>{photo.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </main>
  )
}

export default App
