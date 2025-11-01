import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import meImg from '../assets/me-portrait.jpg'

export default function Hero(){
    useEffect(() =>{
        AOS.init({ duration:3000, once:true });
    }, []);
    return(
        <div className="hero bg-[#0c2940] h-150 w-">
            <div className="space-y-40 p-10 bg-[#0c1a2b] text-white min-h-screen">
                <div data-aos="zoom-in" className="bg-[#1a2a3b] p-8 rounded-lg">
                    <h2 className="text-2xl font-bold">Hey there, im <span className="text-[#2289e3]">Michael</span></h2>
                    <img src={meImg} alt="photo of me" className="w-64 h-64"/>
                </div>
            </div>
        </div>
    )
}