"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export function GetTokenButton({ code }: { code: string; }) {

    const [tokenResponse, setTokenResponse] = useState<string>("");

    return (
        <>
            <Button
                className="mt-4"
                onClick={async () => {
                    const response = await fetch("/token", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: new URLSearchParams({
                            grant_type: "authorization_code",
                            code,
                            redirect_uri: "http://localhost:3000/callback",
                            client_id: "1234",
                            client_secret: "1234",
                        }),
                    });
                    const json = await response.json();
                    
                    setTokenResponse(JSON.stringify(json));
                }}
            >
                Get Token
            </Button>
            <div className="mt-2">
                {tokenResponse}
            </div>
        </>
        
    );
};