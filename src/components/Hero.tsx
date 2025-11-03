import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import meImg from '../assets/me-portrait.jpg'
import viewImg from '../assets/cowellview.jpg'
import beachImg from '../assets/meonthebeach.jpeg'

export default function Hero(){
    useEffect(() =>{
        AOS.init({ duration:3000, once:true });
    }, []);
    return(
        <div className="hero bg-[#0a2a4a] h-50 w-">
            <div className="space-y-1 p-10 bg-[#0c1a2b] text-white min-h-screen">
                <div data-aos="zoom-in" className="bg-[#0b233b] p-8 rounded-xl flex flex-col shadow-xl h-200">
                    <h2 className=" flex text-2xl font-bold text-center bg-[#112840] mb-5 rounded-2xl h-15 justify-center items-center shadow-2xl">Hey there, im <span className="text-[#2289e3]">&nbsp;Michael!</span></h2>
                    <div className="flex justify-between">
                        <div data-aos="zoom-in-right" className="flex justify-start text-lg text-left bg-[#112840] rounded-2xl w-80 p-5 hidden md:flex shadow-xl">
                            Welcome to my site! I'm Michael
                            I'm a computer science student at UC Santa Cruz fascinated by how machines understand and process language.
                            Currently working on RAG projects and building full-stack applications.
                            I love the challenge of making AI accessible through clean, intuitive interfaces.</div>
                        <img data-aos="zoom-in-up" src={meImg} alt="photo of me" className="w-75 h-75 lg:75 lg:75 rounded-2xl shadow-xl"/>
                    </div>
                    <div>
                        <img data-aos="fade-up-left" className="mt-5 rounded-2xl shadow-2xl" src={viewImg} alt="UCSC campus view" />
                    </div>
                </div>
            <div data-aos="zoom-in" className="bg-[#0b233b] p-8 rounded-xl flex flex-col shadow-xl h-200">
                    <h2 className=" flex text-2xl font-bold text-center bg-[#112840] mb-5 rounded-2xl h-15 justify-center items-center shadow-2xl">Here's a little <span className="text-[#2289e3]">&nbsp;About Me:</span></h2>
                    <div className="flex justify-between">
                        <div data-aos="zoom-in-right" className="flex justify-start text-md text-left bg-[#112840] rounded-2xl w-80 p-3 hidden md:flex shadow-xl">
                           I'm a computer science student at UC Santa Cruz with a passion for artificial intelligence and natural language processing. There's something fascinating about teaching machines to understand and 
                           generate human language—it's like building a bridge between human thought and computational power.
                            Right now, I'm working on two RAG projects that I'm really excited about. RTFM helps communities avoid answering the same questions over and over by retrieving previous responses—perfect for
                            Discord servers, forums, or any place where "this has been answered before" is a common gripe. I'm also working on Smart Plate, 
                            an AI-powered nutrition tracking system that makes logging meals and getting fitness advice smarter and more intuitive.
                            When I'm not training models or debugging code, I'm building full-stack web applications with React and Tailwind CSS. 
                        </div>
                        <img data-aos="zoom-in-up" src={beachImg} alt="photo of me" className="w-75 h-100 lg:67 lg:67 rounded-4xl shadow-xl"/>
                    </div>
                </div>
            </div>
        </div>
    )
}