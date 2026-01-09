import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { z } from 'zod';
import BaseButton from '../../../shared/components/base/BaseButton';
import BaseComboBox from '../../../shared/components/base/BaseCombobox';
import BaseInput from '../../../shared/components/base/BaseInput';

const schema = z.object({
    email: z.email("Email i invalid!")
        .min(1, "Email is required!")
        .min(8, "Email must be more than 8 characters long!"),
    password: z.string()
        .min(1, "Password is required!"),
    role: z.object({
        value: z.string(),
        label: z.string()
    })
})

const LoginForm = () => {
    const {
        register, control, handleSubmit, formState: { errors }
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            role: { value: 'user', label: 'Customer' }
        }
    })

    const roleOptions = [
        { value: 'user', label: 'Customer' },
        { value: 'admin', label: 'Administrator' },
    ]

    const handleFormSubmit = () => {
        alert("API calling...")
    }



    return (
        <>
            <div className="h-full w-full bg-gradient-to-r from-blue-600 to-transparent">
                <div className="h-full w-full bg-gradient-to-l from-orange-600 to-transparent">
                    <div className="flex items-center justify-center">
                        <h1>Sign in</h1>
                        <form onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col flex-1'>
                            <BaseInput
                                label='Email'
                                type='text'
                                placeHolder='Enter email to sign in...'
                                errorMsg={errors.title?.message}
                                {...register('email')}
                            />
                            <BaseInput
                                label='Password'
                                type='text'
                                placeHolder='Enter your password.....'
                                errorMsg={errors.description?.message}
                                {...register('password')}
                            />
                            <BaseComboBox
                                name='Role'
                                control={control}
                                label="Role"
                                options={roleOptions}
                            />
                            <BaseButton />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default LoginForm;