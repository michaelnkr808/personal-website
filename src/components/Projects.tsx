import { useState } from 'react';

export default function Projects(){
    const [i, setI] = useState(0);

    interface Project{
        name: string;
        description: string;
        features: string[];
        tech: string[];
        github?: string;
        diagram?: string;
    }
    
    const projects: Project[ ]= [
        {name: "RTFM", 
        description: "RTFM: It’s a RAG (Retrieval-Augmented Generation) pipeline designed for a Discord bot: it embeds messages, stores them in a vector database, retrieves similar past messages, and uses that to answer repeated questions.",
        features: ["Message embedding + vector storage",
            "Top-k similarity search (ChromaDB)",
            "Agent checks similarity score to reuse or generate",
            "FastAPI endpoints for ingest/query",
            "Discord bot integration",
        ],
        tech: ["Python", "FastAPI", "ChromaDB", "Gemini Embeddings", "PostgreSQL", "Docker"],
        github: "https://github.com/michaelnkr808/rtfm-rag-pipeline",
        diagram: 
        `         [Discord Message]
                │
                ▼
        [Embed Message]
                │
                ▼
        [Vector DB — Chroma]
                │
                ▼
        [Similarity Search]
                │
                ▼
        [Agent: Reuse vs Generate]
                │
           ┌────┴─────┐
           ▼          ▼
          [Reuse]   [LLM Generate]
                  │
                  ▼
          [Final Response]
      `,
        
        },
         {
        name: "AGNI-Network",
        description:
        "Built at the 2025 Reboot the Earth Hackathon, AGNI Network: A fire-risk dashboard that aggregates public weather and drought data to map California by fire danger, powered by an AI agent that makes recommendations to first responders and predicts risk.",
        features: [
        "Aggregates data from weather.gov, NASA, droughtmonitor.edu",
        "AI-agent predicts fire danger scores",
        "Heatmap visualization by county",
        "Alerts first responders when risk is high",
        "Scalable to other states / regions"
        ],
        tech: ["React", "TypeScript", "Python", "FastAPI", "Langchain", "Docker", "Gemini API"],
        github: "https://github.com/beong789/AGNI-Network",
        diagram: `
                [Public Datasets]
                    │
                    ▼
            [Weather / Drought Data]
                    │
                    ▼
            [AI Agent: Fire Risk Prediction]
                    │
                    ▼
            [Fire Danger Score Map (CA heatmap)]
                    │
            ┌────┴────┐
            ▼         ▼
        [Alert Fire Dept] [Dashboard Visualization]
            `
    },

        {name: "Sluggle", 
        description: "Sluggle: An iOS app that recommends events and activities based on the user’s budget.",
        features:["Budget-based event recommendation",
                "User authentication / login",
                "Backend service for event data",
                "Model-View-ViewModel (MVVM) architecture (iOS)",
                "Scalable service design"],
        tech:["ReactNative", "PostgreSQL", "Python", "FastAPI"],
        github: "https://github.com/beong789/Sluggle",
        diagram:`
            [User opens app]
                    │
                    ▼
                [User inputs budget]
                    │
                    ▼
                [Backend Service fetches events]
                    │
                    ▼
                [Recommendation Model / Logic]
                    │
                    ▼
                [Events list displayed in UI]
        `},
    ]
        
    function backButton(){
        setI((prev) => (prev + 1) % projects.length);
    }
    function nextButton(){
        setI((prev) => (prev - 1 + projects.length) % projects.length);
    }

    const p = projects[i];
    
    return (
    <div id="projects">
      <div
        id="projects"
        className="hero min-h-screen flex flex-col justify-center items-center p-4 md:p-6 lg:p-4"
      >
        <div
          data-aos="zoom-in"
          className="bg-[#0b233b] p-8 rounded-xl flex flex-col shadow-2xl "
        >
          <h2 className="flex text-lg md:text-2xl font-bold text-center bg-[#112840] mb-5 rounded-2xl h-15 justify-center items-center shadow-2xl p-8">
            Here are some of my{" "}
            <span className="text-[#2289e3]">&nbsp;Projects!</span>
          </h2>

          <div className="flex justify-evenly gap-8">
            {/* Left Button */}
            <button
              onClick={nextButton}
              className="cursor-pointer hover:text-2xl transition-all duration-200 ease-in-out w-6"
            >
              &lt;
            </button>

            {/* Project Card */}
            <div
              key={i}
              className="flex flex-col gap-4 text-lg text-left bg-[#112840] rounded-2xl p-6 shadow-2xl flex-1 max-w-2xl"
            >
              <h3 className="text-xl font-semibold text-[#4fb8ff]">{p.name}</h3>

              <p className="text-neutral-300 text-base">{p.description}</p>

              {/* Diagram */}
              {p.diagram && (
                <pre className="bg-[#0c1a2b] text-neutral-400 text-xs p-4 rounded-lg overflow-x-auto leading-5">
                  {p.diagram}
                </pre>
              )}

              {/* Features */}
              <div>
                <h4 className="font-semibold text-white text-base mb-1">
                  Key Features:
                </h4>
                <ul className="list-disc list-inside text-neutral-300 text-sm space-y-1">
                  {p.features.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="font-semibold text-white text-base mb-1">
                  Tech Stack:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-[#0c1f35] text-neutral-300 text-xs rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* GitHub Link */}
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  className="text-blue-400 hover:text-blue-300 text-sm mt-2"
                >
                  GitHub Repo →
                </a>
              )}
            </div>

            {/* Right Button */}
            <button
              onClick={backButton}
              className="cursor-pointer hover:text-2xl transition-all duration-200 ease-in-out w-6"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
