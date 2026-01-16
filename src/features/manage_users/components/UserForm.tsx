import { BaseButton, BaseInput } from "@/shared/components/base";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { useCreateUser, useDeleteUser, useUpdateUser } from "../hooks/queries";
import { UserFormProps } from "../types";

const schema = z.object({
    name: z.string().min(1, "Category Name is required"),
    email: z.string().email("Invalid Email").min(1, "Email is required!"),
    password: z.string().optional(),
    avatar: z.string().optional()
});
type FormValues = z.infer<typeof schema>

const UserForm = ({ data, handleCancel }: UserFormProps) => {
    const { mutate: executeUserCreation, isPending: isUserCreationPending } = useCreateUser();
    const { mutate: executeUserUpdate, isPending: isUserUpdatePending } = useUpdateUser();
    const { mutate: executeUserDelete, isPending: isUserDeletePending } = useDeleteUser();
    const isEdit = data !== null
    const {
        register, handleSubmit, formState: { errors }, watch, reset
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: data?.name || '',
            email: data?.email || '',
            password: '',
            avatar: data?.avatar || ''
        }
    });
    const imageUrl = watch('avatar') as string;
    const handleFormSubmit: SubmitHandler<FormValues> = (formData) => {
        if (isEdit && data) {
            const reqDataUpdate = {
                name: formData.name,
                email: formData.email,
                avatar: formData.avatar || ""
            };
            executeUserUpdate({
                id: data.id,
                req: reqDataUpdate
            }, {
                onSuccess: () => {
                    handleCancel();
                    reset();
                }
            });
        } else {
            const reqDataCreate = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                avatar: formData.avatar || ""
            };
            executeUserCreation(reqDataCreate, {
                onSuccess: () => {
                    handleCancel();
                    reset();
                }
            });
        }
    }
    const handleDeleteUser = () => {
        if (data?.id === undefined) return;
        executeUserDelete(data?.id, {
            onSuccess: () => {
                handleCancel();
                reset();
            }
        })
    }
    return (
        <>
            <div className='fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-[9999]'>
                <div className="bg-white w-96 flex flex-col p-8 rounded-lg">
                    <p className='text-xl font-bold mb-4'> {isEdit ? "Edit User" : "Add User"}</p>
                    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col flex-1">
                        <div className="flex-1">
                            <BaseInput
                                label='User Name'
                                isDisabled={isUserUpdatePending || isUserCreationPending}
                                errorMsg={errors.name?.message}
                                {...register('name')}
                            ></BaseInput>
                            <BaseInput
                                label='User Email'
                                type="email"
                                isDisabled={isUserUpdatePending || isUserCreationPending}
                                errorMsg={errors.email?.message}
                                {...register('email')}
                            ></BaseInput>
                            {!isEdit &&
                                <BaseInput
                                    label='User Password'
                                    isDisabled={isUserCreationPending}
                                    type="password"
                                    {...register('password')}
                                ></BaseInput>
                            }
                            <BaseInput
                                label='User Avatar'
                                isDisabled={isUserUpdatePending || isUserCreationPending}
                                type='url'
                                {...register('avatar')}
                            ></BaseInput>
                            <div className='m-2 w-full h-auto'>
                                <span className="text-sm text-gray-500 mb-2 block">Xem trước ảnh:</span>
                                {imageUrl && (
                                    <div className="w-full">
                                        <img
                                            src={imageUrl}
                                            alt="Category Preview"
                                            className="w-full h-full object-contain"
                                            onError={(e) => {
                                                e.currentTarget.src = "https://via.placeholder.com/150?text=No+Image";
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='flex gap-4 justify-end mt-4'>
                            <BaseButton
                                type="outline"
                                size='lg'
                                handleClick={handleCancel}
                            >Cancel</BaseButton>
                            <BaseButton size='lg' isDisabled={isUserUpdatePending || isUserCreationPending}>
                                Save
                            </BaseButton>
                            {isEdit &&
                                <BaseButton size='lg' type='danger' handleClick={handleDeleteUser} isDisabled={isUserDeletePending}>
                                    Delete
                                </BaseButton>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
export default UserForm;