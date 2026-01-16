import { TableField } from '@/shared/components/base/types';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseButton, BaseInput, BaseTable } from "../../../shared/components/base";
import { useProducts } from '../hooks/queries';
import { ProductTableRow } from '../types';

const ProductsPage = () => {
    const { data: rawData, isLoading, isError } = useProducts();
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    const fields: TableField<ProductTableRow>[] = ([
        { key: 'id', label: 'ID', type: 'number' },
        { key: 'title', label: 'Product Name', type: 'text' },
        { key: 'price', label: 'Unit Price', type: 'number' },
        { key: 'description', label: 'Description', type: 'text' },
        { key: 'category', label: 'Category', type: 'number' },
        { key: 'updatedAt', label: 'Updated At', type: 'date' },
    ]);
    if (isLoading) return <div>Đang tải dữ liệu...</div>;
    if (isError) return <div>Có lỗi xảy ra khi tải dữ liệu!</div>;
    const data: ProductTableRow[] = (rawData || []).map(item => ({
        ...item,
        category: item.category?.name || 'N/A'
    }));
    const filteredProducts: ProductTableRow[] = data.filter(item => {
        const matchSearch = searchText === '' ||
            item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.category.toLowerCase().includes(searchText.toLowerCase()) ||
            String(item.price).includes(searchText);
        return matchSearch;
    });
    const handleRowDoubleClick = (item: ProductTableRow) => {
        navigate(`/edit-product/${item.slug}`);
    }
    const handleAddClick = () => {
        navigate('/add-product')
    }
    return (
        <div className="w-full h-full flex flex-col p-6">
            <div className="flex justify-between mb-10">
                <p className="text-2xl font-bold">Products</p>
                <div className='flex gap-4'>
                    <BaseButton
                        type="outline"
                        size='lg'
                    >Export</BaseButton>
                    <BaseButton size='lg' handleClick={handleAddClick}>
                        <div className="flex justify-center items-center">
                            <Plus />
                            <p>Add Product</p>
                        </div>
                    </BaseButton>
                </div>
            </div>
            <div className='flex-1 flex flex-col justify-between border p-8'>
                <div className="w-full  overflow-auto">
                    <BaseInput
                        type="text"
                        placeHolder="Search"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <BaseTable<ProductTableRow>
                        fields={fields}
                        data={filteredProducts}
                        onRowDoubleClick={handleRowDoubleClick}
                    />
                </div>
                <div className='flex justify-end mt-4'>
                    {/* <div className='flex gap-4 items-center'>
                        <ArrowLeft className='cursor-pointer' />
                        <p>1</p>
                        <p>2</p>
                        <p>...</p>
                        <p>9</p>
                        <p>10</p>
                        <ArrowRight className='cursor-pointer' />
                    </div> */}
                    <div>
                        {data.length} Results
                    </div>
                </div>
            </div>
        </div>

    )

}
export default ProductsPage;