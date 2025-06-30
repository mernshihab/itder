import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const OrderDetails = () => {
  const location = useLocation();
  const [order, setOrder] = useState(location.state || null);

  useEffect(() => {
    if (!location.state) {
      const stored = localStorage.getItem("lastOrder");
      if (stored) {
        setOrder(JSON.parse(stored));
      }
    }
  }, [location.state]);

  if (!order) {
    return (
      <p className="text-center py-10 text-lg font-semibold">
        No order data found!
      </p>
    );
  }

  const {
    id: orderId,
    name,
    father_name,
    phone_no,
    present_address,
    permanent_address,
    course_qty,
    discount_course_fee,
    sub_total_course_fee,
    photo,
    course_id,
    course_fee,
    email,
    date_of_birth,
    gender,
    blood_group,
    school_collage_name,
    job_title,
  } = order;

  return (
    <div className="m-mt_16px">
      <div className="w-full flex flex-col lg:flex-row items-start justify-center h-full gap-2">
        <div className="bg-white lg:p-p_30px w-full">
          {/* Order ID */}
          <div className="text-center flex flex-col justify-center items-center">
            <p className="text-xl font-bold">Order Information</p>
            <p className="p-3 rounded-md lg:my-2 my-1 w-fit border bg-[#D2C5A2] font-bold text-lg">
              Order Id : <span className="font-semibold">{orderId}</span>
            </p>
          </div>

          {/* Trainee Info */}
          <div className="w-full border flex flex-col md:flex-row md:items-start md:mt-4 mt-3 bg-[#D2C5A2] rounded-md p-4">
            <div className="md:text-base text-sm flex-1 font-semibold md:border-r-2 md:border-black md:pr-10">
              <p className="font-bold md:mb-4 w-full">Trainee Personal Info</p>
              <div className="space-y-1 w-full">
                <div className="flex justify-between"><p>Full Name:</p><p>{name}</p></div>
                <div className="flex justify-between"><p>Father Name:</p><p>{father_name}</p></div>
                <div className="flex justify-between"><p>Email:</p><p>{email}</p></div>
                <div className="flex justify-between"><p>Mobile:</p><p>{phone_no}</p></div>
                <div className="flex justify-between"><p>Date of Birth:</p><p>{date_of_birth}</p></div>
                <div className="flex justify-between"><p>Gender:</p><p>{gender}</p></div>
                <div className="flex justify-between"><p>Blood Group:</p><p>{blood_group}</p></div>
              </div>
            </div>

            <div className="md:text-base text-sm flex-1 font-semibold md:ml-10 mt-m_medium">
              <p className="font-bold md:mb-4 w-full">Address & Other Info</p>
              <div className="space-y-1 w-full">
                <div className="flex justify-between"><p>Present Address:</p><p>{present_address}</p></div>
                <div className="flex justify-between"><p>Permanent Address:</p><p>{permanent_address}</p></div>
                <div className="flex justify-between"><p>School/College:</p><p>{school_collage_name}</p></div>
                <div className="flex justify-between"><p>Job Title:</p><p>{job_title}</p></div>
                <div className="flex justify-between"><p>Course ID:</p><p>{course_id}</p></div>
              </div>
            </div>
          </div>

          {/* Course Summary Table */}
          <div className="lg:my-8 md:my-6 my-8 px-p_4px">
            <p className="md:my-2 font-semibold">Course Details:</p>
            <table className="overflow-x-auto border w-full">
              <thead className="b w-full">
                <tr className="text-sm">
                  <th className="w-20 py-2 md:py-4 border">Image</th>
                  <th className="w-72 py-2 md:py-4 border">Course Name</th>
                  <th className="w-72 py-2 md:py-4 border">Student Name</th>
                  <th className="w-20 py-2 md:py-4 border">Quantity</th>
                  <th className="w-20 py-2 md:py-4 border text-center">Price</th>
                  <th className="w-20 py-2 md:py-4 border text-center">Total</th>
                </tr>
              </thead>
              <tbody className="text-sm md:text-base font-semibold">
                <tr>
                  <td className="border text-center w-10 h-12 px-2">
                    <img className="w-full h-full object-cover mx-auto" src={photo} alt="Course" />
                  </td>
                  <td className="py-2 text-center border">Course #{course_id}</td>
                  <td className="py-2 text-center border">{name}</td>
                  <td className="py-2 text-center border">{course_qty}</td>
                  <td className="py-2 text-center border">Tk {discount_course_fee}</td>
                  <td className="py-2 text-center border">Tk {sub_total_course_fee}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
