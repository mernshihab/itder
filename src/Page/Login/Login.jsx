import { AiFillEye, AiFillEyeInvisible, AiFillUnlock } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { useEffect, useState } from "react";
import { useLoginMutation } from "../../Redux/user/authApi";
import { toast } from "react-toastify";

export default function Login() {
  window.scroll(0, 0);
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const auth = localStorage.getItem("auth");
  //   if (auth) {
  //     try {
  //       const parsedAuth = JSON.parse(auth);
  //       if (parsedAuth?.token) {
  //         navigate("/");
  //       }
  //     } catch (err) {
  //       console.error("Failed to parse auth:", err);
  //     }
  //   }
  // }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const data = {
      email,
      password,
    };

    const res = await login(data);

    console.log("Login response:", res);

    if (res?.data?.access_token) {
      toast.success(res?.data?.message || "Logged in successfully");
    } else {
      toast.error(
        res?.data?.message || "Something went wrong please try again"
      );
      setError(res?.data?.message);
      console.log(res);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center py-6">
      <div className="container">
        <div className="mx-auto rounded-lg bg-base-100 p-6 shadow-lg sm:w-[400px]">
          <h6 className="mt-2 text-center text-xl font-medium text-neutral/80">
            Log In
          </h6>

          <form onSubmit={handleLogin}>
            <div className="mt-10 text-neutral">
              <div className="relative mb-6">
                <span className="absolute bottom-2 text-neutral/80">
                  <MdEmail />
                </span>
                <input
                  name="email"
                  type="text"
                  placeholder="Email"
                  className="w-full border-b pb-1 pl-6 outline-none placeholder:font-light focus:border-b-primary"
                  required
                />
              </div>

              <div className="mb-2">
                <div className="relative">
                  <span className="absolute bottom-2 text-neutral/80">
                    <AiFillUnlock className="text-lg" />
                  </span>

                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    name="password"
                    placeholder="Password"
                    className="w-full border-b pb-1 pl-6 outline-none placeholder:font-light focus:border-b-primary"
                    required
                  />

                  <div
                    className="absolute bottom-2 right-2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className={`${showPassword ? "block" : "hidden"}`}>
                      <AiFillEye />
                    </span>
                    <span className={`${showPassword ? "hidden" : "block"}`}>
                      <AiFillEyeInvisible />
                    </span>
                  </div>
                </div>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <div className="mt-3 flex w-full flex-col border-opacity-50">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-secondary py-2 font-semibold text-base-100 duration-300 hover:bg-opacity-90"
                >
                  {isLoading ? "Loading" : "Log In"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
