import { auth } from '@/auth';
import { LoginForm } from '@/components/auth/login-form'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Login",
    description: "Login page",
};
const LoginPage = async () => {
    const session = await auth();
    return (
        <LoginForm session={session} />
    )
}

export default LoginPage