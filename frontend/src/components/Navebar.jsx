function Navbar(){
   return(
    <nav className = "bg-blue-700 test-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between item-center">
            <h1 className="text-2xl font-bold">ATS Recruit</h1>
            <ul className="flex gap-6">
                <li className="hover:text-gray-200 cursor-pointer">Accueil </li>
                <li className="hover:text-gray-200 cursor-pointer">Analyse </li>
                <li className="hover:text-gray-200 cursor-pointer">Résultats </li>   
            </ul>
        </div>
    </nav>
   );
}

export default Navbar;
