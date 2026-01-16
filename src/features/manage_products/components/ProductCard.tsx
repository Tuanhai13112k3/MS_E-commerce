import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import { ProductCardProps } from '../types';

const ProductCard = ({ imgSrc, productName, onProductEdit, onProductDelete }: ProductCardProps) => {
    return (
        <>
            <div className="w-full h-fit flex items-center gap-5 justify-between border p-4 rounded-md group hover:bg-gray-50">
                <div className='flex items-center gap-5'>
                    <EllipsisVertical />
                    <img src={imgSrc} className='w-20' alt={productName} />
                    <p>{productName}</p>
                </div>
                <div className='flex items-center gap-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity'>
                    <Pencil onClick={onProductEdit} className='cursor-pointer hover:text-blue-600' />
                    <Trash2 onClick={onProductDelete} className='cursor-pointer hover:text-red-500' />
                </div>
            </div>
        </>
    );
}
export default ProductCard;