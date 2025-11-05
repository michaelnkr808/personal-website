import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import beachImg from '../assets/meonthebeach.jpeg'
import hikeImg from '../assets/wintershike.jpeg'

export default function About(){
    useEffect(() =>{
        AOS.init({ duration:3000, once:true });
    }, []);
    return(
        <div id="about" className="min-h-screen flex flex-col justify-center items-center p-10">
            <div data-aos="zoom-in" className="bg-[#0b233b] p-8 rounded-xl flex flex-col shadow-2xl">
                <h2 className=" flex text-2xl font-bold text-center bg-[#112840] mb-5 rounded-2xl h-15 justify-center items-center shadow-2xl p-3">Here's a little <span className="text-[#2289e3]">&nbsp;About Me:</span></h2>
                    <div className="flex justify-between gap-8">
                        <div data-aos="zoom-in-right" className="flex justify-start text-md text-left bg-[#112840] rounded-2xl w-95 p-4 hidden md:flex shadow-2xl">
                            I'm passionate about artificial intelligence and natural language processing. There's something fascinating about teaching machines to understand and generate human
                            language—it's like building a bridge between human thought and computational power.
                            Right now, I'm working on two RAG projects that I'm really excited about. RTFM helps communities avoid answering the same questions over and over by retrieving previous 
                            eresponses—perfect for Discord servers, forums, or any place where "this has been answered before" is a common gripe. I'm also working on Smart Plate, an AI-powered nutrition 
                            tracking system that makes logging meals and getting fitness advice smarter and more intuitive.
                            When I'm not training models or debugging code, I'm building full-stack web applications with React and Tailwind CSS. Outside of tech, you'll find me on the mats training jiu jitsu—I 
                            love the problem-solving aspect and the constant learning, much like coding.
                        </div>
                    <div>
                        <img data-aos="zoom-in-up" src={beachImg} 
                                                   alt="Photo of me on the beach" 
                                                   className="w-70 h-90 lg:67 lg:67 rounded-2xl shadow-2xl"/>
                        <img data-aos="fade-up-left" src={hikeImg}
                                                     alt="Me on a hike"
                                                     className="h-70 w-80 rounded-2xl mt-6 shadow-2xl"/>
                </div>
            </div>
        </div>
    </div>
    )
}