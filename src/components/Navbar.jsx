import Logo from '../assets/Logo.png';
import './Navbar.css';



const Navbar = ({onClear}) => {
    return (
        <nav className='flex bg-slate-600 text-white justify-between items-center py-5 md:px-10 px-5'>
            <div className="logo text-3xl font-bold cursor-pointer flex items-center"><img src={Logo} alt="" className='h-15' />ToDone</div>
            <ul className='flex gap-5'>
                <li><button className='hover:decoration-white hover:underline underline-offset-5 cursor-pointer' onClick={onClear}>Clear All</button></li>
                <li><a href='https://github.com/gyanshankar1708/ToDone' className='hover:decoration-white hover:underline underline-offset-5 cursor-pointer' >GitHub Repo</a></li>
            </ul>
        </nav>
    )
}

export default Navbar
