import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { openRequest } from "../utils/axios";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useToastContext } from "../contexts/toast-context";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const { showToastMsg } = useToastContext();

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (registerData: RegisterData) => {
      return openRequest.post("/auth/register", registerData);
    },
    onSuccess: () => {
      showToastMsg({
        message: "Registration successful! Please Login Now.",
        type: "SUCCESS",
      });
      navigate("/login");
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

  const submitHandler = handleSubmit(async (data: RegisterFormData) => {
    try {
      // console.log(data);

      const registerData = {
        firstName: data.firstName,
        lastName: data.lastName,
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

  return (
    <form
      className="flex flex-col gap-5 inner-container"
      onSubmit={submitHandler}
    >
      <h2 className="text-3xl font-semibold mb-6">Create An Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <Input
          id="firstName"
          label="First Name"
          type="text"
          placeholder="Enter Your First Name"
          {...register("firstName", { required: "First Name is required." })}
          errors={errors}
        />
        <Input
          id="lastName"
          label="Last Name"
          type="text"
          placeholder="Enter Your Last Name"
          {...register("lastName", { required: "Last Name is required." })}
          errors={errors}
        />
      </div>
      <Input
        id="email"
        label="Your Email"
        type="email"
        placeholder="Enter Your Email"
        {...register("email", { required: "Email address is required." })}
        errors={errors}
      />

      <Input
        id="password"
        label="Your Password"
        type="password"
        placeholder="Enter Your Secret Password"
        {...register("password", {
          required: "Password is required.",
          minLength: {
            value: 6,
            message: "Password must be at least 6 Characters long.",
          },
        })}
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
          Already have an account?
          <Button className="underline ml-1" to={"/login"}>
            Sign In
          </Button>
        </span>
        <Button
          type="submit"
          className="bg-hero text-white py-[10px] px-6 hover:bg-hover uppercase"
        >
          {isPending ? "Creating..." : "Create Account"}
        </Button>
      </div>
    </form>
  );
};

export default Register;
