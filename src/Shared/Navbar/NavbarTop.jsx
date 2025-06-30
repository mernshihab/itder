import { MdMenu } from "react-icons/md";
import { useContext, useEffect } from "react";
import { OrderContext } from "../../ContextAPIs/OrderProvider";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";
import useUser from "../../Security/useUser";
import { FaUserCircle } from "react-icons/fa";
import useSmallScreen from "../../Hooks/useSmallScreen";
import { useSelector } from "react-redux";

const NavbarTop = () => {
  const { open, setOpen, sidebarRef } = useContext(OrderContext);
  const [isSmallScreen] = useSmallScreen();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [userData, , refetch] = useUser();
  const imgUrl = `https://littleaccount.com/uploads/userProfile/`;

  const carts = useSelector((state) => state.cart.carts);

  const handleLogout = async () => {
    try {
      const res = await axiosSecure("/api/logout");
      if (res.data) {
        navigate("/login");
        localStorage.removeItem("token");
        toast.success("Logout Successfully");
        window.location.reload();
        refetch();
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (isSmallScreen) {
      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [open, isSmallScreen]);

  useEffect(() => {
    if (isSmallScreen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isSmallScreen, setOpen]);

  return (
    <div className="bg-white py-pt_primary text-_white w-full shadow-md border-b-1 ">
      <ul className="flex gap-gap_primary justify-between px-pt_secondary ">
        <div className="flex items-center gap-gap_primary text-text_sm font-semibold  lg:hidden">
          <MdMenu
            onClick={() => setOpen(!open)}
            className="text-text_xxl cursor-pointer text-black"
          />
        </div>
        <div className="hidden lg:block"></div>

        <div className="flex items-center justify-center text-text_sm font-semibold relative">
          {/* Cart Dropdown */}
          <div className="relative group">
            <Link
              to="/cart"
              className="flex items-center gap-2 text-black duration-300 lg:gap-3"
            >
              <div className="relative">
                <FaShoppingCart className="text-xl lg:text-2xl" />
                <div className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full font-bold text-secondary text-xs">
                  <span className="mt-px">{carts?.length || 0}</span>
                </div>
              </div>
            </Link>

            <div className="absolute right-0 top-8 z-50 bg-white shadow-md rounded-md p-3 w-72 scale-0 group-hover:scale-100 transition-all origin-top-right duration-200">
              <h3 className="font-semibold mb-2">Cart Items</h3>
              <ul className="max-h-56 overflow-y-auto space-y-2">
                {carts?.length > 0 ? (
                  carts.map((item, index) => (
                    <li
                      key={index}
                      className="flex gap-3 items-center border-b pb-2"
                    >
                      <img
                        src={item.photo}
                        alt={item.course_name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div>
                        <p className="text-sm text-black font-semibold">
                          {item.course_name}
                        </p>
                        <p className="text-xs text-gray-600">
                          Tk {item.discount_price}
                        </p>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-500">Cart is empty</li>
                )}
              </ul>
              <Link
                to="/cart"
                className="block mt-3 text-center bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
              >
                Go to Cart Details
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-4 relative">
            <h1 className="text-blue-500 text-xl font-medium">
              {userData?.userData.name}
            </h1>

            <div className="relative group">
              {userData?.userData.image ? (
                <img
                  className="w-[40px] h-[40px] rounded-full cursor-pointer"
                  src={`${imgUrl}${userData.userData.image}`}
                  alt=""
                />
              ) : (
                <FaUserCircle className="w-[40px] h-[40px] rounded-full text-black cursor-pointer" />
              )}

              <div className="absolute top-10 right-0 bg-_white shadow-md rounded-sm overflow-hidden pt-2 w-48 z-10 scale-0 group-hover:scale-100 transition-transform duration-300 transform origin-top-right">
                {userData && (
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-black hover:bg-bg_selected hover:text-white"
                  >
                    Profile
                  </Link>
                )}
                {userData ? (
                  <Link
                    onClick={handleLogout}
                    className="block px-4 py-2 text-black hover:bg-bg_selected hover:text-white"
                  >
                    Logout
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-black hover:bg-bg_selected hover:text-white"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default NavbarTop;
