export async function GET(req: Request) {
    // Extract the bearer token
    const authorization = req.headers.get("Authorization");
    if (!authorization) {
        return Response.json({
            error: "invalid_request",
            error_description: "Missing required parameters.",
            error_uri: "",
        }, {status: 400});
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer") {
        return Response.json({
            error: "invalid_request",
            error_description: "Invalid token type.",
            error_uri: "",
        }, {status: 400});
    }

    // Validate the token
    const mockToken = "12345";
    if (token !== mockToken) {
        return Response.json({
            error: "invalid_token",
            error_description: "Invalid token.",
            error_uri: "",
        }, {status: 400});
    }

    return Response.json({
        users: [
            {
                id: 1,
                username: "test",
                email: "test@test.com",
            },
            {
                id: 2,
                username: "test2",
                email: "test2@test.com",
            },
        ]
    }, { status: 200 })
}