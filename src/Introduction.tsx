
function Introduction(){
    return(
        <>
            <div id="topbar" className="bg-gray-800 flex h-6"></div>
            <div id="intro-content">
                    <div id="intro-card">
                        <h2 className="header"><span className="font-bold text-blue-600">Welcome,</span> its great to see you!
                            <span className="code-icon">
                                <img src="/media/code-fav-icon.svg" alt="Tiny command icon"></img>
                            </span>
                        </h2>
                        <div className="card-text">
                            <p>~ <span className="font-bold">Hey, I’m Michael</span>— a developer who enjoys turning ideas into practical, polished products.</p>
                            <p>~ I work primarily with <span className="word-emphasis">Python and JavaScript,</span> and I’m currently learning <span className="word-emphasis">React</span> to build faster, more maintainable end‑to‑end web apps.</p>
                            <p>~ I value clear structure, readable code, and shipping iteratively — small steps, real progress, steady results.</p>
                            <p>~ Outside of code, I train <span className="word-emphasis">Brazilian Jiu‑Jitsu</span> and love hunting for gems at local thrift stores.</p>
                            <p>~ <span className="word-emphasis">Thanks for stopping by</span> — explore the projects below and feel free to <span className="word-emphasis">reach out!</span></p>    
                        </div>
                    </div>
                    <div id="intro-img-wrapper">
                        <img src="/media/me-landscape.jpg" alt="Portrait of me"></img>
                    </div>
                    <div className="next-arrow-wrapper">
                        <input type="image" src="/media/bottom-arrow-svgrepo-com.svg" className="next-button"/>
                    </div>
            </div>
        </>
    )
}
export default Introduction