export default function Navbar(){
    return(
        <>
        <div className="fixed z-10 top-1 w-[100%] flex justify-center"> 
            <ul className="flex flex-row justify-center h-13 w-[85%] items-center bg-[#122b45] gap-5 rounded-2xl shadow-xl">
                <li><a href=""><button className="hover:text-[white] hover:text-xl hover:bg-[#2a5a8c] bg-[#1b3d61] cursor-pointer lg:rounded-xl rounded-md h-8 md:w-25 lg:w-25 lg:text-lg font-bold transition-all duration-200 ease-in-out w-15">Home</button></a></li>
                <li><a href=""><button className="hover:text-[white] hover:text-xl hover:bg-[#2a5a8c] bg-[#1b3d61] cursor-pointer lg:rounded-xl rounded-md h-8 md:w-25 lg:w-25 lg:text-lg font-bold transition-all duration-200 ease-in-out w-15">About</button></a></li>
                <li><a href=""><button className="hover:text-[white] hover:text-xl hover:bg-[#2a5a8c] bg-[#1b3d61] cursor-pointer lg:rounded-xl rounded-md h-8 md:w-30 lg:w-30 lg:text-lg font-bold transition-all duration-200 ease-in-out w-15">Projects</button></a></li>
                <li><a href=""><button className="hover:text-[white] hover:text-xl hover:bg-[#2a5a8c] bg-[#1b3d61] cursor-pointer lg:rounded-xl rounded-md h-8 md:w-30 lg:w-30 lg:text-lg font-bold transition-all duration-200 ease-in-out w-15">Contact</button></a></li>

            </ul>
        </div>
        </>
    )
}
