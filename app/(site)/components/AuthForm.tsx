'use client';

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {

    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        } else {

            setVariant('LOGIN');
        }

    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }

    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (variant === 'REGISTER') {
            // axios register
        }

        if (variant === 'LOGIN') {
            // next auth sign in
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true);

        // next auth social sign in     
    }

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} >
                    {variant === 'REGISTER' && (
                        <Input id="name" type="email" label="Name" register={register} errors={errors} />

                    )}
                    <Input id="email" label="Email" register={register} errors={errors} />
                    <Input id="password" type="password" label="Password" register={register} errors={errors} />
                    <div>
                        <Button
                            disbaled={isLoading}
                            fullWidth
                            type="submit"
                        >
                            {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                        </Button>
                    </div>

                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />

                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 text-gray-500 bg-white">
                                Or continue with
                            </span>

                        </div>
                    </div>

                    <div className="flex gap-2 mt-6">
                        <AuthSocialButton />

                    </div>
                </div>

            </div>
        </div>
    );
}

export default AuthForm;