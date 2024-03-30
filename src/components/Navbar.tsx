import { CaretLeftIcon, CaretRightIcon, CartIcon, SearchIcon } from "~/assets";

const Navbar: React.FC = () => {
  return (
    <>
      <div className="mx-10 flex h-9 items-center justify-end space-x-4">
        <p className="text-sm font-normal">Help</p>
        <p className="text-sm font-normal">Orders & Returns</p>
        <p className="text-sm font-normal">Hi, John</p>
      </div>
      <div className="mx-10 flex h-16 items-center justify-between">
        <div className="text-3xl font-bold">ECOMMERCE</div>
        <div className="flex space-x-8 font-bold">
          {["Categories", "Sale", "Clearance", "New Stock", "Trending"].map(
            (category, index) => (
              <p key={index}>{category}</p>
            ),
          )}
        </div>
        <div className="flex space-x-8">
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
