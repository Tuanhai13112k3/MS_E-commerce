import { Pencil } from 'lucide-react';
import { CategoryCardProps } from '../types';

const CategoryCard = ({ imgSrc, categoryName, productsCount, onCardClickListener }: CategoryCardProps) => {
    return (
        <>
            <div className="w-80 h-[400px] border rounded-md relative group cursor-pointer overflow-hidden">
                <img className='w-full h-80' src={imgSrc} alt={categoryName} />
                <div className="pl-8 mt-2">
                    <p className="font-bold text-xl">{categoryName}</p>
                    <p className="text-base">{productsCount} items</p>
                </div>
                <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                    <div className='bg-white p-3 rounded-md flex gap-2' onClick={onCardClickListener}>
                        <Pencil className='text-blue-500' />
                        <p className='text-blue-500'> Edit</p>
                    </div>
                </div>
            </div>


        </>
    )
}
export default CategoryCard;