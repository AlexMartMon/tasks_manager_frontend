import { addUserToProject } from "@/services/TeamService"
import { TeamMember } from "@/types/index"
import { useMutation } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type SearchResultProps = {
    user: TeamMember,
    reset: () => void
}

export default function SearchResult({user, reset}: SearchResultProps) {
    const params = useParams()
    const projectId = params.projectId!
    const navigate = useNavigate()

    const {mutate} = useMutation({
        mutationFn: addUserToProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            navigate(location.pathname, {replace: true})
        }
    })

    const handleAddUser = () => {
        const data = {
            projectId,
            id: user._id,
        }
        mutate(data)
    }
  return (
    <>
        <p className="mt-10 text-center font-bold">Result:</p>
        <div className="flex justify-between items-center">
            <p>{user.name}</p>
            <button
                className="text-purple-500 hover:bg-fuchsia-300 px-10 py-3 font-bold cursor-pointer"
                onClick={handleAddUser}
            >
                Add to project team
            </button>
        </div>
    </>
  )
}
