function Header() {
  return (
    <div className="flex items-center px-20 mt-10 justify-between">
      <div className="logo flex items-center gap-1">
        <img src="./imdb.svg" alt="" className="w-16" />
        {/* <p className="text-white text-xl uppercase font-semibold">by adam</p> */}
      </div>
      <ul className="flex items-center gap-6">
        <li className="text-white text-xl">Home</li>
        <li className="text-white text-xl">Popular</li>
        <li className="text-white text-xl">Movies</li>
        <li className="text-white text-xl">TV Shows</li>
        </ul>
    </div>
  );
}

export default Header;
