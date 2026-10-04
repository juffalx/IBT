import Link from 'next/link';
const Header = () => {
  return (
    <div>
      <h1 className="text-red-900 bg-yellow-300 flex flex-row center p-4">Header</h1>
      <p>
        <Link href="/cart">Cart</Link>
      </p>
      <Link href="/menu">Menu</Link>
    </div>
  );
};

export default Header;
