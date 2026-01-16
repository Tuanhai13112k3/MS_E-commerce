import { Product } from '@/features/manage_products/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { MoveLeft } from 'lucide-react';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import z from 'zod';
import { BaseButton, BaseInput } from '../../../shared/components/base';
import { ProductCard } from "../../manage_products";
import { useDeleteCategory, useFetchCategoryById, useFetchProductsByCategoryId, useUpdateCategory } from '../hooks/queries';
import { CategoryReq } from '../types';

const schema = z.object({
    name: z.string().min(1, "Category Name is required"),
    image: z.string().optional()
});

type FormValues = z.infer<typeof schema>;

const CategoryDetail = () => {
    const navigate = useNavigate();
    const params = useParams();
    const categoryId = Number(params.id);
    const { data, isLoading, isError } = useFetchProductsByCategoryId(categoryId)
    const { data: category } = useFetchCategoryById(categoryId)
    const { mutate: executeCategoryUpdate, isPending: isUpdateInProgress } = useUpdateCategory();
    const { mutate: executeCategoryDeletion, isPending: isCategoryDeleteInProgress } = useDeleteCategory();
    const {
        register, handleSubmit, formState: { errors }, reset, watch
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            image: ''
        }
    });
    const imageUrl = watch('image') as string;
    useEffect(() => {
        if (category) {
            reset({
                name: category.name,
                image: category.image
            });
        }
    }, [category, reset]);

    const backToPrevious = () => {
        navigate(-1);
    }

    const onProductEdit = (item: Product) => {
        navigate(`/edit-product/${item.slug}`)
    }
    const OnProductDelete = (item: Product) => {
        confirm(item.title)
    }

    const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
        const reqData: CategoryReq = {
            name: data.name,
            image: data.image || ""
        };
        executeCategoryUpdate({
            id: Number(categoryId),
            req: reqData
        });
    }
    const handleCategoryDelete = () => {
        executeCategoryDeletion(categoryId, {
            onSuccess: () => {
                navigate(- 1);
            }
        });
    }
    if (isLoading) return <div>Đang tải dữ liệu...</div>;
    if (isError || !data) return <div>Có lỗi xảy ra khi tải dữ liệu!</div>;
    return (
        <div className='h-full flex flex-col'>
            <div className='flex items-center gap-3 mb-3 text-gray-500 cursor-pointer hover:text-black' onClick={backToPrevious}>
                <MoveLeft /> Back
            </div>
            <div className="flex justify-between mb-10">
                <h1 className='text-[24px]'>{category?.name}</h1>
                <div>
                    <div className='flex gap-4'>
                        <BaseButton
                            type="outline"
                            size='lg'
                        >Cancel</BaseButton>
                        <BaseButton size='lg' handleClick={handleSubmit(handleFormSubmit)} isDisabled={isUpdateInProgress}>
                            Save
                        </BaseButton>
                        <BaseButton size='lg' type='danger' handleClick={handleCategoryDelete} isDisabled={isCategoryDeleteInProgress}>
                            Delete
                        </BaseButton>
                    </div>
                </div>
            </div>
            <div className='flex-1 flex gap-3 overflow-hidden'>
                <div className='w-[70%] overflow-y-auto'>
                    {data.map(item => (
                        <ProductCard
                            imgSrc={item.images[0]}
                            productName={item.title}
                            key={item.id}
                            onProductEdit={() => { onProductEdit(item) }}
                            onProductDelete={() => { OnProductDelete(item) }}
                        />
                    ))}
                </div>
                <div className='flex-1 p-5 h-full border rounded-md bg-gray-100'>
                    <p className='text-xl font-bold'>Category Info</p>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <BaseInput
                            label='Category Name'
                            errorMsg={errors.name?.message}
                            {...register('name')}
                            isDisabled={isUpdateInProgress}
                        ></BaseInput>
                        <BaseInput
                            label='Category Image'
                            type='url'
                            isDisabled={isUpdateInProgress}
                            {...register('image')}
                        ></BaseInput>
                    </form>
                    <div className='m-2'>
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
            </div>
            <div className='flex gap-4 justify-end mt-4'>
                <BaseButton
                    type="outline"
                    size='lg'
                    handleClick={backToPrevious}
                >Cancel</BaseButton>
                <BaseButton size='lg' handleClick={handleSubmit(handleFormSubmit)} isDisabled={isUpdateInProgress}>
                    Save
                </BaseButton>
                <BaseButton size='lg' type='danger' handleClick={handleCategoryDelete} isDisabled={isCategoryDeleteInProgress}>
                    Delete
                </BaseButton>
            </div>

        </div>
    );
}
export default CategoryDetail;