"use client";

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

export const LoginButton = () => {
    const router = useRouter();

    const login = () => {
        console.log("login");
        router.push("/authorize?client_id=1234&redirect_uri=http://localhost:3000/callback&response_type=code&scope=openid&state=1234");
    }

    return (
        <Button onClick={login}>Login</Button>
    )
}