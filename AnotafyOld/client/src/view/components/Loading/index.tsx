export default function Loading() {
    return (
        <div className="flex flex-row items-center justify-center gap-4 w-full h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-500" />
            <p className="text-text text-xl">Carregando...</p>
        </div>
    );
}
