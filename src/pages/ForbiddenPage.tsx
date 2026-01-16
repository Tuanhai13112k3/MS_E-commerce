
const ForbiddenPage = () => {
    return (
        <>
            <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100">
                <h1 className="text-9xl font-bold text-red-500 flex items-center">403</h1>
                <p className="text-2xl text-gray-600 mt-4">Access Forbidden</p>
                <p className="text-gray-500 mt-2">You don't have permission to access this page.</p>
            </div>
        </>
    );
}
export default ForbiddenPage;