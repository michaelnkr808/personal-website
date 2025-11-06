import { useState } from 'react';

export default function Projects(){
    const [i, setI] = useState(0);

    interface Project{
        name: string;
        description: string;
    }
    
    const projects: Project[ ]= [
        {name: "project1", description: "test1"},
        {name: "project2", description: "test2"},
        {name: "project3", description: "test3"},
    ]
        
    function backButton(){
        setI((prev) => (prev + 1) % projects.length);
    }
    function nextButton(){
        setI((prev) => (prev - 1 + projects.length) % projects.length);
    }

    
    return(
        <div id="projects">
            <div id="projects" className="hero min-h-screen flex flex-col justify-center items-center p-4 md:p-6 lg:p-4">
            <div data-aos="zoom-in" className="bg-[#0b233b] p-8 rounded-xl flex flex-col shadow-2xl ">
                <h2 className="flex text-lg md:text-2xl font-bold text-center bg-[#112840] mb-5 rounded-2xl h-15 justify-center items-center shadow-2xl p-8">Here are some of my <span className="text-[#2289e3]">&nbsp;Projects!</span></h2>
                    <div className="flex justify-evenly gap-8">
                        <button onClick={nextButton} className="backButton cursor-pointer hover:text-2xl transition-all duration-200 ease-in-out w-6 h-">&lt;</button>
                        <div className="flex justify-start text-lg text-left bg-[#112840] rounded-2xl p-5 hidden md:flex shadow-2xl flex-1 max-w-2xl w-10">
                            {projects[i].description}
                            </div>
                        <button onClick={backButton} className="nextButton cursor-pointer hover:text-2xl transition-all duration-200 ease-in-out w-6 h-">&gt;</button>
                    </div>
                    <div>
                    </div>
                </div>
        </div>
        </div>
    )
}