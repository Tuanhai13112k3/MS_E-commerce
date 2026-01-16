
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryCard, CategoryForm } from "..";
import { BaseButton } from "../../../shared/components/base";
import { useCategories } from '../hooks/queries';
import { Category } from '../types';

const CategoriesPage = () => {
    const navigate = useNavigate();
    const [isShowForm, setShow] = useState(false);
    const { data, isLoading, isError } = useCategories();
    const handleShowForm = () => {
        setShow(!isShowForm);
    }
    if (isLoading) return <div>Đang tải dữ liệu...</div>;
    if (isError || !data) return <div>Có lỗi xảy ra khi tải dữ liệu!</div>;

    const handleClick = (item: Category) => {
        navigate(`/category/${item.id}`)
    }

    return (
        <>
            <div className="h-full flex flex-col p-6">
                <div className='flex justify-between mb-6'>
                    <h1 className="text-2xl font-bold">Categories</h1>
                    <BaseButton size='lg' handleClick={handleShowForm}>
                        <div className="flex justify-center items-center">
                            <Plus />
                            <p>Add Category</p>
                        </div>
                    </BaseButton>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <div className="flex flex-wrap justify-start gap-20">
                        {data.map(item => (
                            <CategoryCard
                                key={item.id}
                                imgSrc={item.image}
                                categoryName={item.name}
                                productsCount="12"
                                onCardClickListener={() => handleClick(item)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {isShowForm && (
                <>
                    <CategoryForm visible handleCancel={handleShowForm} />
                </>
            )}
        </>
    )
}
export default CategoriesPage;