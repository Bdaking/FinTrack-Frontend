import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import { API_PATHS } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosinstance";

import { UserContext } from "../../context/userContext";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  //Handle Sign Up Form submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Khawngaihin i hming ziak lut rawh.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Khawngaihin email address dik tak chhu lut rawh.");
      return;
    }
    if (!password) {
      setError("Khawngaihin password chhut lut rawh.");
      return;
    }
    setError("");

    try {
      // API call without profileImageUrl
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Engemaw a dik lo. Khawngaihin han ti nawn leh rawh.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-full h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center ">
        <h3 className="text-xl font-semibold text-black">Account siam rawh</h3>
        <p className="text-xs text-slate-700 mt-1.25 mb-6">
          A hnuai lamah hian i chanchinte ziak lutin min zawm rawh.
        </p>

        <form onSubmit={handleSignUp}>
          {/* Changed grid-cols-2 to grid-cols-1 to stack fields vertically */}
          <div className="grid grid-cols-1 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="mawia"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="mawia@example.com"
              type="text"
            />

            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Hawrawp 8 a tlem berah"
              type="password"
            />
          </div>

          {error && <p className="text-red-500 text-xs mt-2 pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary mt-4">
            SIGN UP
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Account i nei tawh em?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
