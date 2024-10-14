import { useAuth } from "@/hooks/useAuth"
import { deleteNote } from "@/services/NoteService"
import { Note } from "@/types/index"
import { formatDate } from "@/utils/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type NoteDetailsProps = {
    note: Note
}

export default function NoteDetails({ note }: NoteDetailsProps) {
    const params = useParams()
    const projectId = params.projectId!
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!


    const {data, isLoading} = useAuth()
    const canDelete = useMemo(() => data?._id.toString() === note.createdBy._id.toString() , [data])

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['task', taskId] })
            toast.success(data)
        }
    })

    if (isLoading) return 'Loading...'

    if (note && data) return (
        <div className="p-3 flex justify-between items-center">
            <div>
                <p>
                    {note.content} by: <span className="font-bold">{note.createdBy.name}</span>
                </p>
                <p className="text-xs text-slate-500">
                    {formatDate(note.createdAt)}
                </p>
            </div>

            {canDelete && (
                <button
                    type="button"
                    className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors"
                    onClick={() => mutate({projectId, taskId, noteId: note._id})}
                >Delete</button>
            )}
        </div>
    )
}
