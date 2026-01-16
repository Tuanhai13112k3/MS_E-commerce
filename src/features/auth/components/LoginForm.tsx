import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { BaseButton, BaseInput } from '../../../shared/components/base';
import { useLogin } from '../hooks/queries';
import { LoginReq } from '../type';

const schema = z.object({
    email: z.string()
        .min(1, "Email is required!")
        .email("Email is invalid!")
        .min(8, "Email must be more than 8 characters long!"),
    password: z.string()
        .min(1, "Password is required!"),
})
type LoginFormValues = z.infer<typeof schema>;
const LoginForm = () => {
    const { mutate, isPending } = useLogin();
    const navigate = useNavigate();
    const {
        register, handleSubmit, formState: { errors }
    } = useForm<LoginFormValues>({
        resolver: zodResolver(schema),
    })


    const handleFormSubmit: SubmitHandler<LoginFormValues> = (data) => {
        const loginReq: LoginReq = {
            email: data.email,
            password: data.password
        }
        mutate(loginReq, {
            onSuccess: () => {
                navigate("/manage-products", {
                    replace: true,
                })
            }
        })
    }
    return (
        <>
            <div className='w-full h- h-full flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-blue-200'>
                <div className="min-h-96 w-96 flex flex-col justify-center items-center border rounded-md px-20 py-10 bg-white">
                    <h1 className='text-[24px]'>Sign in</h1>

                    <form onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col flex-1'>
                        <BaseInput
                            label='Email'
                            size='lg'
                            type='email'
                            placeHolder='Enter Email Address'
                            errorMsg={errors.email?.message}
                            {...register('email')}
                        />
                        <BaseInput
                            size='lg'
                            label='Password'
                            type='password'
                            placeHolder='Enter Password'
                            errorMsg={errors.password?.message}
                            {...register('password')}
                        />
                        <BaseButton size='lg' isDisabled={isPending}>
                            Sign in
                        </BaseButton>
                    </form>
                </div>
            </div>
        </>
    );
}
export default LoginForm;