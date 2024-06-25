export default function Callback({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined };}) {
    const code = searchParams?.code;
    const state = searchParams?.state;
    const error = searchParams?.error;
    const errorDescription = searchParams?.error_description;
    const errorUri = searchParams?.error_uri;

    return (
        <div className="h-full w-full lg:w-[600px] mx-auto flex flex-col items-center justify-center">
            <div className="w-full">
                <div>Code: {code}</div>
                <div>State: {state}</div>
                <div>Error: {error}</div>
                <div>Error Description: {errorDescription}</div>
                <div>Error URI: {errorUri}</div>
            </div>
        </div>
    )
}