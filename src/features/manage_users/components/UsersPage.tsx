import { TableField } from '@/shared/components/base/types';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { BaseButton, BaseInput, BaseTable } from "../../../shared/components/base";
import { useUsers } from '../hooks/queries';
import { User, UserDisplay } from '../types';
import UserForm from './UserForm';

const CustomersPage = () => {
    const fields: TableField<UserDisplay>[] = ([
        { key: 'id', label: 'ID', type: 'number' },
        { key: 'avatar', label: 'Avatar', type: 'image' },
        { key: 'email', label: 'Email', type: 'text' },
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'role', label: 'Role', type: 'text' },
    ]);
    const { data, isLoading, isError } = useUsers();
    const [isFormVisible, setVisibility] = useState(false);
    const [userUpdating, setUserUpdate] = useState<UserDisplay | null>(null);
    const [searchText, setSearchText] = useState('');

    const handleAddNew = () => {
        setUserUpdate(null);
        setVisibility(!isFormVisible);

    }
    const handleCancelForm = () => {
        setVisibility(!isFormVisible);
    }
    const handleRowDoubleClick = (item: UserDisplay) => {
        setVisibility(!isFormVisible);
        setUserUpdate(item)
    }
    const filteredUsers: User[] = (data ?? []).filter(item => {
        const matchSearch = searchText === '' ||
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.email.toLowerCase().includes(searchText.toLowerCase()) ||
            item.role.toLowerCase().includes(searchText.toLowerCase());
        return matchSearch;
    });
    if (isLoading) return <div className="w-full h-full flex items-center justify-center">Đang tải...</div>;
    if (isError) return <div className="w-full h-full flex items-center justify-center">Lỗi khi tải dữ liệu</div>;

    return (
        <div className="w-full h-full flex flex-col p-6">
            <div className="flex justify-between mb-10">
                <p className="text-2xl font-bold">Customers</p>
                <div className='flex gap-4'>
                    <BaseButton
                        type="outline"
                        size='lg'
                    >Export</BaseButton>
                    <BaseButton size='lg' handleClick={handleAddNew}>
                        <div className="flex justify-center items-center">
                            <Plus />
                            <p>Add Customer</p>
                        </div>
                    </BaseButton>
                </div>
            </div>
            <div className='flex-1 flex flex-col justify-between border p-8'>
                <div className="overflow-auto">
                    <BaseInput
                        type="text"
                        placeHolder="Search"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <BaseTable fields={fields} data={filteredUsers} onRowDoubleClick={handleRowDoubleClick}>
                    </BaseTable>
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
                        {data?.length} results
                    </div>
                </div>
            </div>
            {isFormVisible && <UserForm handleCancel={handleCancelForm} data={userUpdating} />}
        </div>
    )
}
export default CustomersPage;