import Link from "next/link";
import { CaretLeftIcon, CaretRightIcon, CartIcon, SearchIcon } from "~/assets";

const Navbar: React.FC = () => {
  return (
    <>
      <div className="mx-10 flex h-9 items-center justify-end space-x-4">
        {["Help", "Orders & Returns", "Hi, John"].map((item, index) => (
          <Link href="/coming-soon" key={index}>
            <p className="cursor-pointer text-sm font-normal">{item}</p>
          </Link>
        ))}
      </div>
      <div className="mx-10 flex h-16 items-center justify-between">
        <Link href="/">
          <div className="text-3xl font-bold">ECOMMERCE</div>
        </Link>
        <div className="flex space-x-8 font-bold">
          {["Categories", "Sale", "Clearance", "New Stock", "Trending"].map(
            (category, index) => (
              <Link href="/coming-soon" key={index}>
                <p>{category}</p>
              </Link>
            ),
          )}
        </div>

        <div className="ml-16 flex space-x-8">
          <SearchIcon width={32} height={32} />
          <CartIcon width={32} height={32} />
        </div>
      </div>
      <div className="flex h-9 items-center justify-center space-x-3 bg-[#F4F4F4] font-medium">
        <CaretLeftIcon />
        <div>Get 10% off on business sign up</div>
        <CaretRightIcon />
      </div>
    </>
  );
};

export default Navbar;
