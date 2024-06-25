import { redirect } from "next/navigation";
import { LoginForm } from "./login-form";

export type LoginResponse = {
    success: boolean;
    data: {
        code?: string;
        state?: string;
        error?: string;
        error_description?: string;
        error_uri?: string;
    };
};

export type ApplicationRegistration = {
    name: string;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
};

export default function Authorize({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined };}) {
    const clientId = searchParams?.client_id;
    const redirectUri = searchParams?.redirect_uri;
    const responseType = searchParams?.response_type;
    const scope = searchParams?.scope;
    const state = searchParams?.state;

    // TODO: Make this a prettier page or throw an error and make an error.tsx page.
    if (!clientId || !redirectUri) {
        return <div>Invalid request</div>;
    }

    // TODO: Get the client id from the database and validate it.
    // Mock data for now
    const mockClient = {
        name: "Test Application",
        clientId: "1234",
        redirectUri: "http://localhost:3000/callback",
    };

    if (clientId !== mockClient.clientId) {
        return <div>Invalid client</div>;
    }

    if (redirectUri !== mockClient.redirectUri) {
        return <div>Invalid redirect uri</div>;
    }

    if (responseType !== "code") {
        redirect(`${redirectUri}?error=invalid_request&state=${state}`);
    }

    async function login(email: string, password: string): Promise<LoginResponse> {
        "use server";
        // Validate against the database here.
        if (email === "willoughby0114@gmail.com" && password === "password") {

            // TODO: Generate a random code
            // Mock data for now
            const code = "123456";
            
            return {
                success: true,
                data: {
                    code: code,
                    state: state as string,
                }
            };
        } else {
            return {
                success: false,
                data: {
                    error: "access_denied",
                    error_description: "Invalid email or password.",
                    error_uri: "",
                    state: state as string,
                }
            };
        }
    }

    return (
        <div className="h-full w-full lg:w-[500px] mx-auto flex flex-col items-center justify-center">
            <div className="w-full shadow-2xl p-8 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Sign In</h1>
                <div className="text-medium text-neutral-500 mb-4">to continue to {mockClient.name}</div>
                <LoginForm redirectUri={redirectUri as string} loginAction={login} />
            </div>
        </div>
    );
};