function Header() {

  const links = [
    { title: 'Home', isActive: true },
    { title: 'Popular', isActive: false },
    { title: 'Movies', isActive: false },
    { title: 'TV Shows', isActive: false }
  ];


  return (
    <div className="px-20 mt-10 w-full flex justify-center">
      <ul className="flex items-center border border-white/25 rounded-full p-1 bg-black/25">
        {links.map((link) => <li key={link.title} className={`${link.isActive ? 'bg-white/25 text-white' : 'text-white/70'} px-4 py-1.5 rounded-full cursor-pointer`}>{link.title}</li>)}
        </ul>
    </div>
  );
}

export default Header;
