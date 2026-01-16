const NotFoundPage = () => {
    return (
        <>
            <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100">
                <h1 className="text-9xl font-bold text-gray-300">404</h1>
                <p className="text-2xl text-gray-600 mt-4">Page Not Found</p>
                <p className="text-gray-500 mt-2">The page you're looking for doesn't exist.</p>
            </div>
        </>
    );
}
export default NotFoundPage;