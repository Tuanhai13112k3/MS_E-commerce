import { BaseButton, BaseInput } from "@/shared/components/base";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { useCreateCategory } from "../hooks/queries";
import { CategoryFormProps, CategoryReq } from "../types";

const schema = z.object({
    name: z.string().min(1, "Category Name is required"),
    image: z.string().optional()
});
type FormValues = z.infer<typeof schema>

const CategoryForm = ({ visible, handleCancel }: CategoryFormProps) => {
    const { mutate, isPending } = useCreateCategory();

    const {
        register, handleSubmit, formState: { errors }, watch, reset
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            image: ''
        }
    });
    const imageUrl = watch('image') as string;
    const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
        const reqData: CategoryReq = {
            name: data.name,
            image: data.image || ""
        };
        mutate(reqData, {
            onSuccess: () => {
                reset();
                handleCancel();
            }
        });
    }
    return (
        <div>
            {visible && (
                <div className='fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-[9999]'>
                    <div className="bg-white w-96 flex flex-col p-8 rounded-lg">
                        <p className='text-xl font-bold mb-4'> Add Category</p>
                        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col flex-1">
                            <div className="flex-1">
                                <BaseInput
                                    label='Category Name'
                                    errorMsg={errors.name?.message}
                                    {...register('name')}
                                ></BaseInput>
                                <BaseInput
                                    label='Category Image'
                                    type='url'
                                    {...register('image')}
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
                                <BaseButton size='lg' isDisabled={isPending}>
                                    Save
                                </BaseButton>
                            </div>
                        </form>
                    </div>
                </div>
            )
            }
        </div>
    );
};
export default CategoryForm;