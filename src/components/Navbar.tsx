export default function Navbar(){
    return(
        <>
        <div className="fixed z-10 top-2 w-[100%] flex justify-center"> 
            <ul className="flex flex-row justify-center h-13 w-[85%] items-center bg-[#081624] gap-5 rounded-2xl shadow-xl">
                <li><a href=""><button className="hover:text-[white] hover:text-xl hover:bg-[#073761] bg-[#081b2e] cursor-pointer lg:rounded-xl rounded-md h-8 lg:w-30 lg:text-lg font-bold transition-all duration-200 ease-in-out w-20">Home</button></a></li>
                <li><a href=""><button className="hover:text-[white] hover:text-xl hover:bg-[#073761] bg-[#081b2e] cursor-pointer lg:rounded-xl rounded-md h-8 lg:w-30 lg:text-lg font-bold transition-all duration-200 ease-in-out w-20">About</button></a></li>
                <li><a href=""><button className="hover:text-[white] hover:text-xl hover:bg-[#073761] bg-[#081b2e] cursor-pointer lg:rounded-xl rounded-md h-8 lg:w-30 lg:text-lg font-bold transition-all duration-200 ease-in-out w-25">Projects</button></a></li>
                <li><a href=""><button className="hover:text-[white] hover:text-xl hover:bg-[#073761] bg-[#081b2e] cursor-pointer lg:rounded-xl rounded-md h-8 lg:w-30 lg:text-lg font-bold transition-all duration-200 ease-in-out w-25">Contact</button></a></li>

            </ul>
        </div>
        </>
    )
}
