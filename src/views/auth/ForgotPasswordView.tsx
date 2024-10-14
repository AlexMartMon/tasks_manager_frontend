import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ForgotPasswordForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { postForgotPassword } from "@/services/AuthService";
import { toast } from "react-toastify";

export default function ForgotPasswordView() {
  const initialValues: ForgotPasswordForm = {
    email: "",
  };

  const {mutate} = useMutation({
    mutationFn: postForgotPassword,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: (data) => {
        toast.success(data)
        reset()
    }
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleForgotPassword = (formData: ForgotPasswordForm) => mutate(formData);

  return (
    <>
      <h1 className="text-5xl font-black text-white">Reset Password</h1>
      <p className="text-2xl font-light text-white mt-5">
        Fill the following formulary to {""}
        <span className=" text-fuchsia-500 font-bold">
          {" "}
          reset your password.
        </span>
      </p>
      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="space-y-8 p-10 mt-10 bg-white"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "Enter your email",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          value="Send instructions"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/login"
          className="text-center text-gray-300 font-normal"
        >
          Already have an account? LogIn
        </Link>

        <Link
          to="/auth/register"
          className="text-center text-gray-300 font-normal"
        >
          You don't have an account yet? Sign In.
        </Link>
      </nav>
    </>
  );
}
