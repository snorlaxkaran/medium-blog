import { SignupInput } from "@snorlax.karan/medium-common";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface AuthProps {
  type: "signup" | "signin";
}

export const Auth = ({ type }: AuthProps) => {
  const navigate = useNavigate();
  const [signupInputs, setSignupInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signin" ? "signin" : "signup"}`,
        signupInputs
      );
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      return axios.isAxiosError(error);
    }
  }

  return (
    <div className=" min-h-screen  justify-center items-center flex flex-col">
      {type === "signin" ? (
        <>
          <h2 className="text-2xl roboto-bold">Login to your account</h2>
          <p className="text-neutral-500">
            Create an account <Link to="/signup">Sign up</Link>
          </p>
        </>
      ) : (
        <>
          <h2 className="text-2xl roboto-bold ">Create an account</h2>
          <p className="text-neutral-500">
            Already have an account? <Link to="/signin">Sign in</Link>
          </p>
        </>
      )}
      <div className="w-[50%] flex flex-col gap-4">
        <form action="">
          {type === "signin" ? (
            ""
          ) : (
            <LabelledInput
              label="Name"
              placeholder="Enter your full name"
              onChange={(e) => {
                setSignupInputs({
                  ...signupInputs,
                  name: e.target.value,
                });
              }}
            />
          )}
          <LabelledInput
            label="Email"
            placeholder="Enter your email m@gmail.com"
            onChange={(e) => {
              setSignupInputs({
                ...signupInputs,
                email: e.target.value,
              });
            }}
          />
          <LabelledInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => {
              setSignupInputs({
                ...signupInputs,
                password: e.target.value,
              });
            }}
          />
        </form>
        <button
          onClick={sendRequest}
          className="w-full bg-black rounded-md py-2 text-white"
        >
          {type === "signin" ? "Sign in" : "Sign up"}
        </button>
      </div>
    </div>
  );
};

interface LabelledInputProps {
  label: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const LabelledInput = ({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputProps) => {
  return (
    <div className="my-2">
      <label className="block mb-2 text-sm font-medium text-gray-900 ">
        {label}
      </label>
      <input
        id="first_name"
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        required
        onChange={onChange}
      />
    </div>
  );
};
