export default function Navbar(){
    return(
        <>
        <div className="navbar">
            <ul className="flex flex-row justify-center h-18 items-center bg-[#061121] gap-5">
                <li><a href=""><button className="hover:text-[#31abf7] hover:text-xl bg-[#0a2a4a] cursor-pointer rounded-md h-8 w-30 text-lg font-bold transition-all duration-200 ease-in-out">Home</button></a></li>
                <li><a href=""><button className="hover:text-[#31abf7] hover:text-xl bg-[#0a2a4a] cursor-pointer rounded-md h-8 w-30 text-lg font-bold transition-all duration-200 ease-in-out">About</button></a></li>
                <li><a href=""><button className="hover:text-[#31abf7] hover:text-xl bg-[#0a2a4a] cursor-pointer rounded-md h-8 w-30 text-lg font-bold transition-all duration-200 ease-in-out">Contact</button></a></li>
            </ul>
        </div>
        </>
    )
}