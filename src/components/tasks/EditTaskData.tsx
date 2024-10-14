import { getTaskById } from '@/services/TaskService'
import { useQuery } from '@tanstack/react-query'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import EditTaskModal from './EditTaskModal'

export default function EditTaskData() {
    const params = useParams()
    const projectId = params.projectId!

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('editTask')!
    
    const {data, isError} = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({projectId, taskId}),
        enabled: !!taskId,
        retry: 1
    })

    if (isError) return <Navigate to={'/404'} />
    if (data) return <EditTaskModal taskId={taskId} data={data} />
}
