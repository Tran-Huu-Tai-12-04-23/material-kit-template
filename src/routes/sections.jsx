import { lazy, Suspense } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import LoadingView from 'src/components/loadingView';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/private/app'));
export const BlogPage = lazy(() => import('src/pages/private/blog'));
export const TaskPage = lazy(() => import('src/pages/private/task'));
export const UserPage = lazy(() => import('src/pages/private/user'));
export const LoginPage = lazy(() => import('src/pages/public/login'));
export const ProductsPage = lazy(() => import('src/pages/private/products'));
export const Page404 = lazy(() => import('src/pages/public/page-not-found'));

// ----------------------------------------------------------------------

 function AuthRouter() {
  const routes = useRoutes([
    {
      element: (
        <Suspense fallback={<LoadingView/>}>
          <Outlet />
        </Suspense>
      ),
      children: [{ element: <LoginPage />, index: true }],
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

 function PrivateRouter() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={<LoadingView/>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'task', element: <TaskPage /> },
      ],
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}


export { AuthRouter, PrivateRouter };
