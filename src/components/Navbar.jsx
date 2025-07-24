import Logo from '../assets/Logo.png';
import './Navbar.css';


const Navbar = () => {
    return (
        <nav className='flex bg-slate-600 text-white justify-between items-center py-5 md:px-10 px-5'>
            <div className="logo text-3xl font-bold cursor-pointer flex items-center"><img src={Logo} alt="" className='h-15' />ToDone</div>
            <ul className='flex gap-5'>
                <a href="">
                    <li className='cursor-pointer hover:font-bold transition-all duration-100'>Home</li>
                </a>
                <a href="">
                    <li className='cursor-pointer hover:font-bold transition-all duration-100'>Github Repo</li>
                </a>
            </ul>
        </nav>
    )
}

export default Navbar
