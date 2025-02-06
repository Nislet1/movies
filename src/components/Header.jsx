import { House, Clapperboard, Tv, Menu, Search, Star, LogIn , User} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { motion } from "framer-motion";


function Header() {

  const user = false

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
    <motion.header initial={{ y: -100 }} animate={{ y: 0 }} className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm">
      <nav className="container mx-auto flex h-14 items-center px-2 gap-2 justify-between">
        <div className="hidden md:block">
        {links.map((link) => <Link to={link.href} key={link.title} className='inline-flex gap-2 h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors'><link.icon className="size-4" />{link.title}</Link>)}   
        </div>

        <div className="flex items-center gap-2 w-full md:w-max">
        <div className="relative w-full md:w-[340px]">
          <Input
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="pr-10 w-full"
          />
          <Search
            className="absolute top-1/2 right-3 transform -translate-y-1/2 w-5 h-5 text-muted-foreground"
          />
        </div>
        {user ? <div className="flex items-center gap-2"> <Button variant='outline' >Profile</Button> <Button variant='outline' size='icon'><Star /></Button> </div> :<Link to={'/login'}> <Button variant='outline' className='h-9 w-9 md:w-max'><LogIn /> <span className="hidden lg:block">Sign In</span></Button></Link>}
        
        </div>

        


        <Button className='md:hidden w-10' variant="outline" size="icon"><Menu /></Button>


        
      </nav>
    </motion.header>

  );
}

export default Header;
