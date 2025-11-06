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
        <div id="about" className="min-h-screen flex flex-1 flex-col justify-center items-center w-screen p-4 md:p-10">
            <div data-aos="zoom-in" className="bg-[#0b233b] p-10 rounded-xl flex flex-col shadow-2xl">
                <h2 className=" flex text-lg md:text-2xl font-bold text-center bg-[#112840] mb-5 rounded-2xl h-15 justify-center items-center shadow-2xl p-3">Here's a little <span className="text-[#2289e3]">&nbsp;About Me:</span></h2>
                    <div className="flex flex-col md:flex-row justify-between gap-5 items-center">
                        <div data-aos="zoom-in-right" className="flex justify-start items-center text-center text-sm ax-[567px]:text-sm min-[768px]:text-sm min-[927px]:text-base min-[1023px]:text-base lg:text-lg xl:text-xl bg-[#112840] rounded-2xl p-4 hidden md:flex shadow-2xl flex-1 max-w-2xl">
                            I'm passionate about artificial intelligence and natural language processing. There's something fascinating about teaching machines to understand and generate human
                            language—it's like building a bridge between human thought and computational power.
                            Right now, I'm working on two RAG projects that I'm really excited about. RTFM helps communities avoid answering the same questions over and over by retrieving previous 
                            responses—perfect for Discord servers, forums, or any place where "this has been answered before" is a common gripe. I'm also working on Smart Plate, an AI-powered nutrition 
                            tracking system that makes logging meals and getting fitness advice smarter and more intuitive.
                            When I'm not training models or debugging code, I'm building full-stack web applications with React and Tailwind CSS. Outside of tech, you'll find me on the mats training jiu jitsu—I 
                            love the problem-solving aspect and the constant learning, much like coding.
                        </div>
                        <div>
                            <div className="flip-card w-full h-105 md:w- md:h-72">
                                <div className="flip-card-inner w-full h-full md:w-75 md:h-75 relative">
                                    <div className="flip-card-front absolute w-full h-full">
                                            <img data-aos="zoom-in-up" src={beachImg} 
                                                                    alt="Photo of me on the beach at Capitola" 
                                                                    className="w-full h-full object-cover md:w-75 md:h-75 rounded-2xl shadow-2xl"/>
                                        </div>  
                                        <div className="flip-card-back absolute w-full h-full bg-[#112840] flex justify-center items-center p-4 rounded-2xl shadow-2xl text-center text-white">
                                        <div className="text-s">
                                            I'm passionate about artificial intelligence and natural language processing. There's something fascinating about teaching machines to understand and generate human
                                            language—it's like building a bridge between human thought and computational power.
                                            When I'm not working with AI or debugging code, I'm building full-stack web applications with React and Tailwind CSS. Outside of tech, you'll find me on the mats training jiu jitsu or off on a hike
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flip-card w-90 h-80 md:w-80 md:h-72">
                                <div className="flip-card-inner w-full h-full md:w-75 md:h-75 relative">
                                    <div className="flip-card-front absolute w-full h-full p-1">
                                            <img data-aos="zoom-in-up" src={hikeImg} 
                                                                    alt="Photo of me on a hike in Winters, California" 
                                                                    className="w-full h-full object-cover md:w-75 md:h-75 rounded-2xl shadow-2xl"/>
                                        </div>  
                                        <div className="flip-card-back absolute w-full h-full bg-[#112840] flex justify-center items-center p-4 rounded-2xl shadow-2xl text-center text-white">
                                        <div className="text-s">
                                            This was an awesome hike I went on in Winters California called Blue Ridge loop.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}