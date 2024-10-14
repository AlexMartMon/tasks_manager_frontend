import { NoteFormData } from "@/types/index"
import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postCreateNote } from "@/services/NoteService"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"


export default function AddNoteForm() {
    const params = useParams()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)
    const projectId = params.projectId!
    const taskId = queryParams.get('viewTask')!

    const initialValues: NoteFormData = {
        content: ''
    }
    const queryClient = useQueryClient()
    const { register, reset, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
    const {mutate} = useMutation({
        mutationFn: postCreateNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['task', taskId]})
        }
    })
    const handleAddNote = (formData: NoteFormData) => {
        mutate({projectId,taskId,formData})
        reset()
    }

    return (
        <form
            onSubmit={handleSubmit(handleAddNote)}
            className='space-y-3'
            noValidate
        >

            <div className='flex flex-col gap-2'>
                <label className='font-bold' htmlFor="content">Create Note</label>
                <input
                    id="content"
                    type="text"
                    placeholder='Note description'
                    className='w-full p-3 border border-gray-300'
                    {...register('content', {
                        required: 'Field content note is empty'
                    })}
                />
                {errors.content && (
                    <ErrorMessage>{errors.content.message}</ErrorMessage>
                )}
            </div>
            <input type="submit"
                className='bg-fuchsia-500 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer'
                value="Create Note"
            />

        </form>
    )
}
