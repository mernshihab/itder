/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { changeQuantity } from "../../Redux/cart/cartSlice";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.carts);
  const [ setQuantities] = useState(
    carts.reduce((acc, item) => {
      acc[item.id] = 1; // default quantity 1
      return acc;
    }, {})
  );

  console.log("carts", carts);
  const handleQuantityChange = (id, type) => {
    const item = carts.find((item) => item._id === id);
    if (!item) return;

    let newQty = type === "inc" ? item.quantity + 1 : item.quantity - 1;
    if (newQty < 1) newQty = 1;

    dispatch(changeQuantity({ id, quantity: newQty }));
  };

  const totalPrice = carts.reduce(
    (acc, item) => acc + item.discount_price * item.quantity,
    0
  );

  return (
    <div className="m-mt_16px">
      <h1 className="text-sm text-start md:text-text_xl lg:py-0 font-bold">
        Cart
      </h1>
      <div className="pt-p_16px">
        <div className="lg:flex items-start gap-3">
          <div className="w-full lg:w-[58%] bg-white border-2">
            <table className=" overflow-x-auto  w-full">
              <thead>
                <tr className="border-b-4 border-gray-300">
                  <th className="text-[14.4px] w-6/12 font-bold p-[7px] text-black">
                    Course
                  </th>
                  <th className="text-[14.4px] font-bold p-[7px] text-black">
                    Price
                  </th>
                  <th className="text-[14.4px] font-bold p-[7px] text-black">
                    Quantity
                  </th>
                  <th className="text-[14.4px] font-bold p-[7px] text-black">
                    Sub Total
                  </th>
                </tr>
              </thead>

              <tbody className="overflow-x-auto ">
                {carts.map((item, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td>
                      <div className="flex items-center justify-center">
                        <div className="w-[20%] text-center flex items-center justify-center">
                          {/* <RiDeleteBin5Line
                            onClick={() => handleRemove(item.id)}
                            className="text-xl hover:text-footer_color cursor-pointer"
                          /> */}
                          <RiDeleteBin5Line className="text-xl text-red-500 cursor-pointer" />
                        </div>
                        <div className="flex flex-col text-center justify-center items-center py-2 w-[80%]">
                          <img
                            className="h-[40px] w-[70px] object-cover rounded"
                            src={item.photo}
                            alt={item.course_name}
                          />
                          <p className="text-[14.4px] px-[7px] text-center">
                            {item.course_name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                        Tk {item.discount_price}
                      </p>
                    </td>
                    <td>
                      <div className="flex justify-center">
                        <div className="border">
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, "dec")
                            }
                            className="px-4 w-[30px] font-bold"
                          >
                            -
                          </button>
                        </div>
                        <div className="border-y">
                          <input
                            type="number"
                            readOnly
                            value={item.quantity}
                            className="font-bold w-[30px] lg:w-[60px] px-2 text-center mx-auto h-full"
                          />
                        </div>
                        <div className="border">
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, "inc")
                            }
                            className="px-4 w-[30px] font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="text-center font-bold">
                      Tk {item.discount_price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="lg:w-[41%] bg-white border-2 ">
            <div className="px-[30px]">
              <h2 className="font-bold text-start text-text_medium pt-2 pb-1 border-b-2 border-black">
                Cart Summary
              </h2>
              <div className="py-3 flex justify-between border-b border-gray-300">
                <p className="text-black font-bold">Total Price</p>
                <p className="text-black font-bold">Tk {totalPrice}</p>
              </div>

              <Link
                to={`/checkout`}
                state={"bdt"}
                className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4  block text-center mx-auto w-full"
              >
                PROCEED TO CHECKOUT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
