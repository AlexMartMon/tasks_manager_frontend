import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { CheckPasswordForm, ConfirmToken, CreateUserForm, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, userSchema } from "../types";

export async function postCreateAccount(formData: CreateUserForm) {
    try {
        const url = '/auth/create-account'
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function postConfirmAccount(token: ConfirmToken) {
    try {
        const url = '/auth/confirm-account'
        const { data } = await api.post<string>(url, token)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function postRequestCode(email: RequestConfirmationCodeForm) {
    try {
        const url = '/auth/request-code'
        const { data } = await api.post<string>(url, email)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function postAuthenticateUser(formData: UserLoginForm) {
    try {
        const url = '/auth/login'
        const { data } = await api.post<string>(url, formData)
        await localStorage.setItem('AUTH_TOKEN',data)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
export async function postForgotPassword(formData: ForgotPasswordForm) {
    try {
        const url = '/auth/forgot-password'
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function postValidateToken(formData: ConfirmToken) {
    try {
        const url = '/auth/validate-token'
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function postResetPassword({ formData, token }: { formData: NewPasswordForm, token: ConfirmToken['token'] }) {
    try {
        const url = `/auth/reset-password/${token}`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUser() {
    try {
        const url = `/auth/user`
        const { data } = await api(url)
        const response = userSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function postCheckPassword(formData: CheckPasswordForm) {
    try {
        const url = `/auth/check-password`
        const { data } = await api.post(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}