const items = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Globe',
    href: '/globe',
  },
  {
    name: 'About',
    href: '/about',
  },
];

export function Navbar() {
  return <nav className="mx-auto inset-x-0 z-50 w-[95%] lg:w-full bg-black text-white">
    <div className="flex justify-between items-center w-[50%] mx-auto p-2">
      { items.map((item, index) => <a key={index} href={item.href} className="text-lg font-bold">{item.name}</a>) }
    </div>
  </nav>
}