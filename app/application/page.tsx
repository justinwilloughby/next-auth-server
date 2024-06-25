import { LoginButton } from "./login-button";

export default function Application() {
    return (
        <div className="h-full w-full lg:w-[500px] mx-auto flex flex-col items-center justify-center">
            <div className="w-full shadow-2xl p-8 rounded-lg">
                <LoginButton />
            </div>
        </div>
    )
}