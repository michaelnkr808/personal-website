import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import meImg from '../assets/me-portrait.jpg'
import acmImg from '../assets/acm2025.jpg'


export default function Hero(){
    useEffect(() =>{
        AOS.init({ duration:3000, once:true });
    }, []);
    return(
        <div id="home" className="hero min-h-screen flex flex-col justify-center items-center p-4 md:p-10 lg:p-20">
            <div data-aos="zoom-in" className="bg-[#0b233b] p-8 rounded-xl flex flex-col shadow-2xl ">
                <h2 className="flex text-lg md:text-2xl font-bold text-center bg-[#112840] mb-5 rounded-2xl h-15 justify-center items-center shadow-2xl p-2">Hey there, im <span className="text-[#2289e3]">&nbsp;Michael!</span></h2>
                    <div className="flex justify-evenly gap-8">
                        <div data-aos="zoom-in-right" className="flex justify-start text-lg text-left bg-[#112840] rounded-2xl p-5 hidden md:flex shadow-xl flex-1 max-w-2xl w-10">
                            Welcome to my site! I'm Michael
                            I'm a computer science student at UC Santa Cruz fascinated by how machines understand and process language.
                            Currently working on RAG projects and building full-stack applications.
                            I love the challenge of making AI accessible through clean, intuitive interfaces.</div>
                        <div className="flip-card w-64 h-64 md:w-72 md:h-72">
                            <div className="flip-card-inner w-full h-full md:w-75 md:h-75">
                                <div className="flip-card-front absolute w-full h-full">
                                        <img data-aos="zoom-in-up" src={meImg} 
                                                                   alt="Photo of me" 
                                                                   className="w-full h-full object-cover md:w-75 md:h-75 rounded-2xl shadow-2xl"/>
                                    </div>  
                                    <div className="flip-card-back absolute w-full h-full bg-[#112840] flex justify-center items-center p-4 rounded-2xl shadow-2xl text-center text-white text-xs">
                                    <div>
                                        I'm a computer science student at UC Santa Cruz fascinated by how machines understand and process language.
                                        Currently working on RAG projects and building full-stack applications.
                                        I love the challenge of making AI accessible through clean, intuitive interfaces.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flip-card mt-5 w-90 h-60 md:w-160 md:h-110 md:p-4">
                            <div className="flip-card-inner w-full h-full md:w-75 md:h-75 relative">
                                <div className="flip-card-front absolute w-full h-full p-2">
                                        <img data-aos="zoom-in-up" src={acmImg} 
                                                                   alt="Photo of me with the ACM club during our intel visit" 
                                                                   className="w-full h-full rounded-2xl shadow-2xl"/>
                                    </div>  
                                    <div className="flip-card-back absolute w-full h-full bg-[#112840] flex justify-center items-center p-4 rounded-2xl shadow-2xl text-center text-white">
                                    <div>
                                        This photo is from my visit to Intel in Santa Clara with the ACM Club at UCSC
                                        which I am apart of. I had a great time and got the opportunity to connect with several experts
                                        in the industry. I also won some cool prizes!
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}