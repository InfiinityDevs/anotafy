"use client";

import { Auth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const validate = async () => {
            if (await Auth.checkAuth()) {
                router.push("/home");
                return;
            }
            router.push("/login");
        };

        validate()

    }, [router]);
}
