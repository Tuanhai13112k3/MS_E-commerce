import { useCategories } from '@/features/manage_categories/hooks/queries';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { BaseButton, BaseCombobox, BaseInput } from '../../../shared/components/base';
import { useCreateProduct, useDeleteProduct, useFetchProductBySlug } from '../hooks/queries';
import { ProductReq } from '../types';


const schema = z.object({
    title: z.string()
        .min(1, "Title is required")
        .min(3, "Title must be at least 3 characters"),
    price: z.number().min(1, "Price must be greater than 0"),
    description: z.string()
        .min(1, "Description is required"),
    categoryId: z.number().min(1, "Category is required"),
    images: z.array(z.string()),
})
type FormValues = z.infer<typeof schema>
const ProductForm = () => {
    const navigate = useNavigate();
    let params = useParams();
    const slug = params.slug ?? '';//??
    const { data, isLoading, isError } = useFetchProductBySlug(slug);
    const { mutate: executeProductCreation, isPending: isProductCreationPending } = useCreateProduct();
    // const { mutate: executeProductUpdate, isPending: isProductUpdatePending } = useUpdateProduct();//Lôi API
    const { mutate: executeProductDeletion, isPending: isProductDeletePending } = useDeleteProduct();
    const { data: categoryData } = useCategories();
    const backToPrevious = () => {
        navigate(-1);
    }
    const {
        register, control, handleSubmit, formState: { errors }, reset, watch
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: '',
            price: 0,
            description: '',
            categoryId: 0,
            images: ["https://placehold.co/600x400"],
        },
    })

    useEffect(() => {
        if (data) {
            reset({
                title: data.title,
                price: data.price,
                description: data.description,
                categoryId: data.category.id,
                images: data.images
            });
        }
    }, [data, reset]);

    const categoryOptions = (categoryData || []).map(item => ({
        value: item.id,
        label: item.name
    }));
    const imageUrl = watch('images') as string[];
    const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
        if (slug) {
            alert("API is calling...");
        } else {
            const dataCreation: ProductReq = {
                title: data.title,
                price: data.price,
                description: data.description,
                categoryId: data.categoryId,
                images: data.images
            }
            executeProductCreation(dataCreation, {
                onSuccess: () => {
                    navigate(-1);
                }
            });
        }
    }

    const handleDeleteProduct = () => {
        {
            executeProductDeletion(data?.id! ?? undefined, {
                onSuccess: () => {
                    navigate(-1);
                }
            });
        }
    }

    if (isLoading) return <div>Đang tải dữ liệu...</div>;
    if (isError) return <div>Có lỗi xảy ra khi tải dữ liệu!</div>;
    return (
        <>
            <div className='h-full flex flex-col'>
                <div className="flex justify-between mb-10">
                    <h1 className='text-[24px]'>{slug ? "Edit Product" : "Add Product"}</h1>
                    <div>
                        <div className='flex gap-4'>
                            <BaseButton
                                type="outline"
                                size='lg'
                                handleClick={backToPrevious}
                            >Cancel</BaseButton>
                            <BaseButton size='lg' handleClick={handleSubmit(handleFormSubmit)}>
                                Save
                            </BaseButton>
                            {slug &&
                                <BaseButton size='lg' type='danger' handleClick={handleDeleteProduct} isDisabled={isProductDeletePending}>
                                    Delete
                                </BaseButton>
                            }
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col flex-1 justify-between'>
                    <div className='flex justify-around h-full mb-5'>
                        <div className='flex flex-col w-[50%] border bg-slate-200 p-6 rounded-md'>
                            <BaseInput
                                label='Product Name'
                                size='lg'
                                type='text'
                                placeHolder='Summer T-Shirt'
                                errorMsg={errors.title?.message}
                                {...register('title')}
                            />
                            <BaseInput
                                size='lg'
                                label='Unit Price'
                                type='number'
                                placeHolder='Enter Price'
                                errorMsg={errors.price?.message}
                                {...register("price", { valueAsNumber: true })}
                            />
                            <BaseInput
                                size='lg'
                                label='Description'
                                type='text'
                                placeHolder='Product description'
                                errorMsg={errors.description?.message}
                                {...register('description')}
                            />
                            <BaseInput
                                label='Image'
                                type='url'
                                {...register('images')}
                            ></BaseInput>
                            <div className='m-2 w-full h-auto'>
                                <span className="text-sm text-gray-500 mb-2 block">Xem trước ảnh:</span>
                                {imageUrl && (
                                    <div className="w-24 h-24">
                                        <img
                                            src={imageUrl[0]}
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
                        <div className='w-[30%] border bg-slate-200 p-6 rounded-md  h-full'>
                            <BaseCombobox
                                name="categoryId"
                                control={control}
                                label="Category"
                                options={categoryOptions}
                            />
                        </div>
                    </div>
                </form>
                <div className='flex justify-end'>
                    <div className='flex gap-4'>
                        <BaseButton
                            type="outline"
                            size='lg'
                            handleClick={backToPrevious}
                        >Cancel</BaseButton>
                        <BaseButton size='lg' handleClick={handleSubmit(handleFormSubmit)} isDisabled={isProductCreationPending}>
                            Save
                        </BaseButton>
                        {slug &&
                            <BaseButton size='lg' type='danger' handleClick={handleDeleteProduct} isDisabled={isProductDeletePending}>
                                Delete
                            </BaseButton>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
export default ProductForm;