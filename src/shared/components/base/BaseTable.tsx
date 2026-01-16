import { ReactNode } from 'react';
import { BaseTableProps, FieldType } from './types';

const BaseTable = <T extends { id: string | number }>({
    fields,
    data,
    children,
    onRowDoubleClick
}: BaseTableProps<T>) => {
    const getFieldStyle = (type: FieldType): string => {
        const styles: Record<FieldType, string> = {
            text: 'text-left',
            number: 'text-center',
            date: 'text-center text-gray-600',
            image: 'text-center'
        };
        return styles[type] || 'text-left';
    };

    const renderCellContent = (field: typeof fields[0], item: T) => {
        const value = item[field.key as keyof T];

        if (field.type === 'image' && typeof value === 'string') {
            return (
                <img
                    src={value}
                    alt="preview"
                    className="w-12 h-12 object-cover rounded mx-auto"
                    onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/50?text=No+Image";
                    }}
                />
            );
        }

        return value as ReactNode;
    };

    return (
        <div className='overflow-auto max-h-[550px]'>
            <table className='w-full'>
                <thead className='border-b-2 border-[#D7DBEC] sticky top-0 bg-white'>
                    <tr>
                        {fields.map((field) => (
                            <th key={String(field.key)} className='py-2'>{field.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr className='border-b-2 border-[#ECF2FF] cursor-pointer hover:bg-green-100'
                            key={item.id}
                            onDoubleClick={() => onRowDoubleClick && onRowDoubleClick(item)}
                        >
                            {fields.map((field) => (
                                field.key !== 'action'
                                    ? <td key={String(field.key)} className={`py-2 ${getFieldStyle(field.type)}`}>
                                        {renderCellContent(field, item)}
                                    </td>
                                    : <td key={field.key} className='py-2'>{children}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BaseTable;
