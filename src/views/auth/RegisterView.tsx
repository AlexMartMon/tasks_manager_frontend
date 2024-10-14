import { useForm } from "react-hook-form";
import { CreateUserForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postCreateAccount } from "@/services/AuthService";
import { toast } from "react-toastify";

export default function RegisterView() {
  
  const initialValues: CreateUserForm = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<CreateUserForm>({ defaultValues: initialValues });

  const {mutate} = useMutation({
    mutationFn: postCreateAccount,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: (data) => {
        toast.success(data)
        reset()
    }
  })

  const password = watch('password');

  const handleRegister = (formData: CreateUserForm) => mutate(formData)

  return (
    <>
      <h1 className="text-5xl font-black text-white">Create Account</h1>
      <p className="text-2xl font-light text-white mt-5">
        Fill the following formulary to {''}
        <span className=" text-fuchsia-500 font-bold"> create your account.</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-8 p-10  bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
            htmlFor="email"
          >Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "Enter the email",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Name</label>
          <input
            type="name"
            placeholder="Name"
            className="w-full p-3  border-gray-300 border"
            {...register("name", {
              required: "Field name can not be empty",
            })}
          />
          {errors.name && (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Password</label>

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "Field password can not be empty",
              minLength: {
                value: 8,
                message: 'Minimun length is 8 characters.'
              }
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Confirmation Password</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Confirmation password"
            className="w-full p-3  border-gray-300 border"
            {...register("password_confirmation", {
              required: "Field password can not be empty",
              validate: value => value === password || 'Your password must be the same'
            })}
          />

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Register me!'
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
          <Link 
            to={'/auth/login'}
            className="text-center text-gray-300 font-normal"
            >Already have an account.</Link> 
      </nav>
    </>
  )
}