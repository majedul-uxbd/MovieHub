import { RegisterForm } from '@/components/auth/register-form'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Sign Up Page",
    description: "Sign Up page",
};

function RegisterPage() {
    return (
        <RegisterForm />
    )
}

export default RegisterPage