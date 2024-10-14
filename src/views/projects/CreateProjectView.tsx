import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query'
import ProjectForm from "@/components/projects/ProjectForm";
import { toast } from "react-toastify";
import { ProjectFormData } from "@/types/index";
import { postCreateProject } from "@/services/ProjectService";

export default function CreateProjectView() {

  const navigate = useNavigate()
  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const {mutate} = useMutation({
    mutationFn: postCreateProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      navigate('/')
    }
  })

  const handleForm = (data: ProjectFormData) => mutate(data);

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Create Project</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Fill the following formulary
        </p>

        <nav className="my-5">
          <Link
            className="bg-purple-500 hover:bg-purple-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to="/"
          >
            Back to projects
          </Link>
        </nav>

        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
            <ProjectForm
                register={register}
                errors={errors}
            />
          <input
            type="submit"
            value="Create Project"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
