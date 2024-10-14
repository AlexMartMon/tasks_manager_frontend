import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { User, UserProfileForm } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { putUpdateProfile } from "@/services/ProfileService"
import { toast } from "react-toastify"

type ProfileFormProps = {
    data: User
}

export default function ProfileForm({ data }: ProfileFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<UserProfileForm>({ defaultValues: data })

    const queryclient = useQueryClient()
    const{mutate} = useMutation({
        mutationFn: putUpdateProfile,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data)
            queryclient.invalidateQueries({queryKey: ['user']})
        }
    })
    const handleEditProfile = (formData: UserProfileForm) => mutate(formData)

    return (
        <>
            <div className="mx-auto max-w-3xl g">
                <h1 className="text-5xl font-black ">My Profile</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">You can change your information here.</p>

                <form
                    onSubmit={handleSubmit(handleEditProfile)}
                    className=" mt-14 space-y-5  bg-white shadow-lg p-10 rounded-l"
                    noValidate
                >
                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="name"
                        >Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Your name"
                            className="w-full p-3  border border-gray-200 focus:border-fuchsia-700"
                            {...register("name", {
                                required: "User name is mandatory.",
                            })}
                        />
                        {errors.name && (
                            <ErrorMessage>{errors.name.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="email"
                        >Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Your Email"
                            className="w-full p-3  border border-gray-200 focus:border-fuchsia-500"
                            {...register("email", {
                                required: "Enter your Email.",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Invalid email format.",
                                },
                            })}
                        />
                        {errors.email && (
                            <ErrorMessage>{errors.email.message}</ErrorMessage>
                        )}
                    </div>
                    <input
                        type="submit"
                        value='Save changes'
                        className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    )
}