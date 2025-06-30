import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useAddCheckoutMutation } from "../../Redux/checkout/checkoutApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../Redux/cart/cartSlice";
import { useDispatch } from "react-redux";

const Checkout = () => {
  const carts = useSelector((state) => state.cart.carts);
  const course = carts[0];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quantity = course?.quantity || 1;
  const discountPrice = course?.discount_price || 0;
  const subtotal = discountPrice * quantity;

  const [addCheckout] = useAddCheckoutMutation();

  const [formData, setFormData] = useState({
    name: "",
    father_name: "",
    father_phone_no: "",
    school_collage_name: "",
    job_title: "",
    email: "",
    gender: "",
    present_address: "",
    permanent_address: "",
    nid_no: "",
    phone_no: "",
    local_guardian_name: "",
    local_guardian_phone_no: "",
    date_of_birth: "",
    blood_group: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("course_id", course.id);
    data.append("course_fee", course.regular_price);
    data.append("discount_course_fee", course.discount_price);
    data.append("course_qty", quantity);
    data.append("total_course_fee", course.regular_price * quantity);
    data.append("sub_total_course_fee", course.discount_price * quantity);

    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const res = await addCheckout(data);
      console.log("Checkout response:", res);
      if (res?.data) {
        toast.success("Checkout submitted successfully!");
      }
      if (res?.data?.coursePurchaseData) {
        const orderData = res.data.coursePurchaseData;
        localStorage.setItem("lastOrder", JSON.stringify(orderData));
        dispatch(clearCart());
        navigate("/order-details", {
          state: orderData,
        });
      }
    } catch (error) {
      toast.error("Failed to submit checkout");
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className="mt-5 border mx-2">
      <div className="bg-[#6f42c1] text-white p-6 text-center mb-5">
        <h2 className="text-5xl font-bold">Trainee Admission Form</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6"
      >
        {/* ========== Trainee Info ========== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            name="name"
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="border p-2 rounded"
          />
          <input
            name="father_name"
            onChange={handleChange}
            placeholder="Father/Mother Name"
            required
            className="border p-2 rounded"
          />
          <input
            name="father_phone_no"
            onChange={handleChange}
            placeholder="Parent Phone No"
            required
            className="border p-2 rounded"
          />
          <input
            name="school_collage_name"
            onChange={handleChange}
            placeholder="School/College"
            className="border p-2 rounded"
          />
          <input
            name="job_title"
            onChange={handleChange}
            placeholder="Job Title"
            className="border p-2 rounded"
          />
          <input
            name="email"
            type="email"
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded"
          />
          <select
            name="gender"
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
          <input
            name="present_address"
            onChange={handleChange}
            placeholder="Present Address"
            className="border p-2 rounded"
          />
          <input
            name="permanent_address"
            onChange={handleChange}
            placeholder="Permanent Address"
            className="border p-2 rounded"
          />
          <input
            name="nid_no"
            onChange={handleChange}
            placeholder="NID No"
            className="border p-2 rounded"
          />
          <input
            name="phone_no"
            onChange={handleChange}
            placeholder="Phone No"
            className="border p-2 rounded"
          />
          <input
            name="local_guardian_name"
            onChange={handleChange}
            placeholder="Local Guardian Name"
            className="border p-2 rounded"
          />
          <input
            name="local_guardian_phone_no"
            onChange={handleChange}
            placeholder="Guardian Phone No"
            className="border p-2 rounded"
          />
          <input
            name="date_of_birth"
            type="date"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <select
            name="blood_group"
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="B+">B+</option>
            <option value="AB+">AB+</option>
            <option value="O+">O+</option>
          </select>
          <input
            name="photo"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        {/* ========== Course Summary ========== */}
        <div className="m-mt_16px pt-p_16px">
          <div className="lg:flex items-start gap-3">
            <div className="w-full lg:w-[58%] bg-white border-2">
              <table className="overflow-x-auto w-full">
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
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td>
                      <div className="flex items-center justify-center">
                        <div className="w-[20%] text-center flex items-center justify-center">
                          <RiDeleteBin5Line className="text-xl opacity-50 cursor-not-allowed" />
                        </div>
                        <div className="flex flex-col text-center justify-center items-center py-2 w-[80%]">
                          <img
                            className="h-[40px] w-[70px] object-cover"
                            src={course?.photo}
                            alt={course?.course_name}
                          />
                          <p className="text-[14.4px] px-[7px] text-center">
                            {course?.course_name || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="text-center font-bold">
                      Tk {discountPrice}
                    </td>
                    <td className="text-center font-bold">{quantity}</td>
                    <td className="text-center font-bold">Tk {subtotal}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="lg:w-[41%] bg-white border-2">
              <div className="px-[30px]">
                <h2 className="font-bold text-start text-text_medium pt-2 pb-1 border-b-2 border-black">
                  Cart Summary
                </h2>
                <div className="py-3 flex justify-between border-b border-gray-300">
                  <p className="text-black font-bold">Total Price</p>
                  <p className="text-black font-bold">Tk {subtotal}</p>
                </div>
                <button
                  type="submit"
                  className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4 block text-center mx-auto w-full"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
