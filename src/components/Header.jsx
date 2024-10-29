import { House, Clapperboard, Tv, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Film } from "lucide-react";
import IconBtn from "./Button";
import { useState } from "react";

function Header() {

  const links = [
    { title: 'Home', icon: House, href: '/' },
    { title: 'Movies', icon: Clapperboard, href: '/movies' },
    { title: 'TV Shows', icon: Tv, href: '/tvshows' },
  ];

  const [search, setSearch] = useState();
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && search) {
      navigate(`/search/${search}`);
    }
  };
  return (
    <header className="sticky top-0 continer border-b border-accent bg-background text-white mb-4" style={{zIndex:'9999'}}>
      <nav className="container mx-auto flex h-14 items-center space-x-4 px-2 justify-between md:space-x-0">
        <div className="flex items-center space-x-4">
          <Link to={'/'}><Film className="size-7"/></Link>
          <div className=" hidden md:block">
          {links.map((link) => <Link to={link.href} key={link.title} className='inline-flex gap-2 h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground'><link.icon className="size-4" />{link.title}</Link>)}   
          </div>
        </div>
        <input onKeyDown={handleKeyDown} onChange={e=>setSearch(e.target.value)} type="text" placeholder="Search..." className="flex h-9 w-full md:w-[300px] rounded-md border border-muted placeholder:text-neutral-300 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors" />
        <div className='md:hidden'>
          <IconBtn><Menu /></IconBtn>
        </div>
        
      </nav>
    </header>

  );
}

export default Header;
