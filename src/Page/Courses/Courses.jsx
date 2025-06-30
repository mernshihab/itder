import { useGetCoursesQuery } from "../../Redux/course/courseApi";
import { addToCart } from "../../Redux/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Courses = () => {
  const { data: courseData, isLoading, error } = useGetCoursesQuery();
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.carts);

  const courses = courseData?.courseData;

  const handleAddToCart = (course) => {
    console.log("course", course);

    const cartProduct = {
      id: course.id,
      discount_price: course.discount_price,
      regular_price: course.regular_price,
      course_name: course.course_name,
      quantity: 1,
      photo: course.photo,
      trainer_data: course.trainer_data,
      trainer_id: course.trainer_id,
      user_id: course.user_id,
      course_details: course.course_details,
      status: course.status,
    };

    if (carts?.length > 0) {
      const findProduct = carts?.find((p) => p.id === cartProduct.id);

      if (findProduct) {
        return toast.error("Course already added to cart");
      } else if (carts?.length > 0) {
        return toast.error("You can only add one course at a time");
      } else {
        dispatch(addToCart([...carts, cartProduct]));
        toast.success("Course added to cart successfully");
      }
    } else {
      dispatch(addToCart([cartProduct]));
      toast.success("Course added to cart successfully");
    }
  };

  return (
    <div className="m-mt_16px">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses?.map((course) => (
          <div
            key={course?.id}
            className=" bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="relative">
              <img src={course?.photo} alt={course?.course_name} />
              <div className="absolute top-0 left-0 p-2">
                <h3 className="text-white text-xl font-bold">Data Entry</h3>
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-gray-800 text-lg font-semibold mb-2">
                {course?.course_name}
              </h2>
              <div className="flex items-center justify-between mb-4">
                <span className="flex text-blue-500 text-md">
                  ★★★★★(no need to change)
                </span>
                <span className="ml-2 text-gray-600 text-md font-bold">
                  {course?.trainer_data?.name}
                </span>
              </div>
              {/* <div className="flex gap-2 mb-4 flex-wrap">
                                {['Photography', 'Light set up', 'Camera angle', 'Self Development'].map((tag) => (
                                    <span key={tag} className="bg-yellow-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div> */}
              <p className="text-gray-600 text-md mb-4">
                Course Details{" "}
                <span className="text-blue-500">
                  Show Details(no need to change)
                </span>
              </p>
              <hr />
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <span className="line-through text-gray-400 text-sm">
                    Tk {course?.regular_price}
                  </span>
                  {course?.regular_price && course?.discount_price && (
                    <span className="text-green-600 text-md font-bold ml-2">
                      -
                      {Math.round(
                        ((course.regular_price - course.discount_price) /
                          course.regular_price) *
                          100
                      )}
                      %
                    </span>
                  )}
                  <span className="text-black text-lg font-bold ml-2">
                    Tk {course?.discount_price}
                  </span>
                </div>
                {/* <span className="text-green-600 text-sm">Earn Tk 48</span> */}
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleAddToCart(course)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-500 w-full font-bold text-md"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
