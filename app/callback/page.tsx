import { Button } from "@/components/ui/button";
import { RequestError } from "../authorize/request-error";
import { GetTokenButton } from "./token-buttons";

export default function Callback({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined };}) {
    const code = searchParams?.code;
    const state = searchParams?.state;
    const error = searchParams?.error;
    const errorDescription = searchParams?.error_description;
    const errorUri = searchParams?.error_uri;

    if (error) {
        return (
            <div className="h-full w-full lg:w-[500px] mx-auto flex flex-col items-center justify-center">
                <div className="w-full shadow-2xl p-8 rounded-lg text-center">
                    <h1 className="text-2xl text-bold pb-8">Oops... something went wrong.</h1>
                    <RequestError error={error as string} />
                    <RequestError error={errorDescription as string || "An error occurred"} />
                    <RequestError error={errorUri as string || ""} />
                </div>
            </div>
        );
    } else {
        return (
            <div className="h-full w-full lg:w-[500px] mx-auto flex flex-col items-center justify-center">
                <div className="w-full shadow-2xl p-8 rounded-lg text-center">
                    <h1 className="text-2xl text-bold pb-8">Success!</h1>
                    <div className="text-lg text-green-500">Code: {code}</div>
                    <div className="text-lg text-green-500">State: {state}</div>
                    {code && <GetTokenButton code={code as string} />}
                </div>
            </div>
        );
    }
}