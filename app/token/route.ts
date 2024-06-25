export async function POST(req: Request) {
    const text = await req.text();
    const body = Object.fromEntries(new URLSearchParams(text));

    const { grant_type, code, redirect_uri, client_id, client_secret } = body;

    if (!grant_type || !code || !redirect_uri || !client_id || !client_secret) {
        return Response.json({
            error: "invalid_request",
            error_description: "Missing required parameters.",
            error_uri: "",
        }, {status: 400});
    }

    const mockClient = {
        name: "Test Application",
        clientId: "1234",
        clientSecret: "1234",
        redirectUri: "http://localhost:3000/callback",
    };

    if (client_id !== mockClient.clientId) {
        return Response.json({
            error: "invalid_client",
            error_description: "Invalid client.",
            error_uri: "",
        }, {status: 400});
    }

    if (client_secret !== mockClient.clientSecret) {
        return Response.json({
            error: "invalid_client",
            error_description: "Invalid client.",
            error_uri: "",
        }, {status: 400});
    }

    if (redirect_uri !== mockClient.redirectUri) {
        return Response.json({
            error: "invalid_request",
            error_description: "Invalid redirect uri.",
            error_uri: "",
        }, {status: 400});
    }

    if (grant_type !== "authorization_code") {
        return Response.json({
            error: "unsupported_grant_type",
            error_description: "Unsupported grant type.",
            error_uri: "",
        }, {status: 400});
    }

    // TODO: Validate the code.
    const mockCode = "123456";
    if (code !== mockCode) {
        return Response.json({
            error: "invalid_grant",
            error_description: "Invalid grant.",
            error_uri: "",
        }, {status: 400});
    }

    return Response.json({
        access_token: "12345",
        token_type: "Bearer",
        expires_in: 3600,
        refresh_token: "67890",
        scope: "read write",
    }, {
        status: 200,
        headers: {
            "Cache-Control": "no-store",
        }
    });
}