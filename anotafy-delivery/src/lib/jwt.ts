import { SignJWT, jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(
    process.env.JWT_SECRET || "segredo-super-secreto"
);

export async function signToken(payload: { userId: number; role: string }) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("8h")
        .sign(SECRET_KEY);
}

export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);
        return payload;
    } catch (error) {
        return null;
    }
}
