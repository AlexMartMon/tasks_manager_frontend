import { isAxiosError } from "axios";
import { Project, TeamMember, TeamMemberForm, teamMemberSchema, teamMembersSchema } from "../types";
import api from "@/lib/axios";


export async function postFindUserByEmail({projectId, formData}: {projectId: Project['_id'], formData: TeamMemberForm}) {
    try {
        const url = `/projects/${projectId}/team/find`
        const data = await api.post(url, formData)
        const response = teamMemberSchema.safeParse(data.data)
        if (response.success) { 
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function addUserToProject({projectId, id}: {projectId: Project['_id'], id: TeamMember['_id']}) {
    try {
        const url = `/projects/${projectId}/team`
        const {data} = await api.post<string>(url, {id})        
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProjectTeamMembers(projectId: Project['_id']) {
    try {
        const url = `/projects/${projectId}/team`
        const {data} = await api.get(url)  
        const response = teamMembersSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function removeMemberFromTeam({projectId, id}: {projectId: Project['_id'], id: TeamMember['_id']}) {
    try {
        const url = `/projects/${projectId}/team/${id}`
        const {data} = await api.delete<string>(url)        
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}