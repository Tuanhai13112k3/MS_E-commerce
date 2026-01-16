import { Route, Routes } from 'react-router-dom';

import { UsersPage } from '@/features/manage_users';
import { Login } from '../features/auth';
import { CategoriesPage, CategoryDetail } from '../features/manage_categories';
import { ProductForm, ProductsPage } from '../features/manage_products';
import DashboardLayout from '../layouts/DashboardLayout';
import { Forbidden, NotFound } from '../pages';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={< Login />} />
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route element={<DashboardLayout />}>
                    <Route path="/manage-categories" element={<CategoriesPage />} />
                    <Route path="/category/:id" element={<CategoryDetail />} />
                    <Route path="/add-product" element={<ProductForm />} />
                    <Route path="/edit-product/:slug" element={<ProductForm />} />
                    <Route path="/manage-products" element={<ProductsPage />} />
                    <Route path="/manage-customers" element={<UsersPage />} />
                </Route>
            </Route>
            <Route path="/403" element={<Forbidden />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
export default AppRoutes;