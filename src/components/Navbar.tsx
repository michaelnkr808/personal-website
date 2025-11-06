export default function Navbar(){
    return(
        <>
        <div className="fixed z-10 top-1 w-full flex justify-center"> 
            <ul className="flex flex-row justify-center h-13 sm:w-[85%] md:w-[85%] items-center bg-[#122b45] gap-5 rounded-2xl shadow-xl p-4">
                <li><a href="#home"><button className="hover:text-[white] hover:text-lg md:hover:text-xl hover:bg-[#2a5a8c] bg-[#1b3d61] cursor-pointer lg:rounded-xl rounded-md h-8 w-20 md:w-25 text-sm md:text-lg font-bold transition-all duration-200 ease-in-out">Home</button></a></li>
                <li><a href="#about"><button className="hover:text-[white] hover:text-lg md:hover:text-xl hover:bg-[#2a5a8c] bg-[#1b3d61] cursor-pointer lg:rounded-xl rounded-md h-8 w-20 md:w-25 text-sm md:text-lg font-bold transition-all duration-200 ease-in-out">About</button></a></li>
                <li><a href="#projects"><button className="hover:text-[white] hover:text-lg md:hover:text-xl hover:bg-[#2a5a8c] bg-[#1b3d61] cursor-pointer lg:rounded-xl rounded-md h-8 w-22 md:w-30 text-sm md:text-lg font-bold transition-all duration-200 ease-in-out">Projects</button></a></li>
                <li><a href="#contact"><button className="hover:text-[white] hover:text-lg md:hover:text-xl hover:bg-[#2a5a8c] bg-[#1b3d61] cursor-pointer lg:rounded-xl rounded-md h-8 w-22 md:w-30 text-sm md:text-lg font-bold transition-all duration-200 ease-in-out">Contact</button></a></li>

            </ul>
        </div>
        </>
    )
}
