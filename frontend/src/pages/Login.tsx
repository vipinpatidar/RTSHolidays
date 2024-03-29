import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { AxiosError } from "axios";
import { useToastContext } from "../contexts/toast-context";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { openRequest } from "../utils/axios";
import { useAppContext } from "../hooks/useAppContext";

export type LoginFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};
type LoginData = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<LoginFormData>();

  const { showToastMsg } = useToastContext();
  const { setToken } = useAppContext();

  const navigate = useNavigate();
  const location = useLocation();

  const { mutate, isPending } = useMutation({
    mutationFn: (registerData: LoginData) => {
      return openRequest.post("/auth/login", registerData);
    },
    onSuccess: (data) => {
      const userInfo = data?.data?.responseData;

      showToastMsg({
        message: `Welcome Back :) `,
        type: "SUCCESS",
      });

      sessionStorage.setItem("user", JSON.stringify(userInfo));
      navigate(location.state?.path || "/", { replace: true });
      setToken(JSON.parse(sessionStorage.getItem("user") as string));
    },
    onError: (error) => {
      console.log(error);
      showToastMsg({
        message:
          (error.response?.data as { message: string })?.message ||
          error.message ||
          "Opps! Something went wrong.",
        type: "ERROR",
      });
    },
  });

  const submitHandler = handleSubmit((data: LoginFormData) => {
    try {
      // console.log(data);

      const registerData = {
        email: data.email,
        password: data.password,
      };

      mutate(registerData);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.message);
      } else {
        console.log("An error occurred:", error);
      }
    }
  });

  // Function for Guest User to login
  const loginToGuestUser = () => {
    try {
      // console.log(data);

      const registerData = {
        email: "guestJi@gmail.com",
        password: "guestJi123",
      };

      mutate(registerData);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.message);
      } else {
        console.log("An error occurred:", error);
      }
    }
  };

  return (
    <form
      className="flex flex-col gap-5 inner-container my-6"
      onSubmit={submitHandler}
    >
      <h2 className="text-3xl font-semibold mb-6">Log in</h2>
      <Input
        id="email"
        label="Your Email"
        type="email"
        placeholder="Enter Your Email"
        {...register("email", { required: "Email is required." })}
        errors={errors}
      />
      <Input
        id="password"
        label="Your password"
        type="password"
        placeholder="Enter Your Email"
        {...register("password", { required: "Email is required." })}
        errors={errors}
      />
      <Input
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="Confirm Your Password"
        {...register("confirmPassword", {
          validate: (value) => {
            if (!value) {
              return "This field is required.";
            } else if (watch("password") !== value) {
              return "Your password do not match. please enter same password.";
            }
          },
        })}
        errors={errors}
      />
      <div className="flex items-center justify-between mt-6">
        <span className="text-gray-500 ">
          Do not have an account?
          <Button className="underline ml-1" to={"/register"}>
            Register
          </Button>
        </span>
        <Button
          type="submit"
          className="bg-hero text-white py-[10px] px-6  hover:bg-hover uppercase"
        >
          {isPending ? "Loading..." : "Login"}
        </Button>
      </div>

      <div className="text-center mt-4" onClick={loginToGuestUser}>
        <p className="text-blue-600 underline text-lg cursor-pointer hover:text-blue-700 active:text-yellow-500">
          Login As A Guest User
        </p>
      </div>
    </form>
  );
};

export default Login;
