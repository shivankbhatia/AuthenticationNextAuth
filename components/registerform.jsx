'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./loadingBuffer.jsx";

export default function RegisterForm() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [debouncedEmail, setDebouncedEmail] = useState(email);

    const router = useRouter();

    // Debounce the email input (500ms delay)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedEmail(email);
            console.log("Debounced Email:", email); // You can remove or use this
        }, 500);

        return () => clearTimeout(timer);
    }, [email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!name || !email || !password) {
            setError("All Fields are neccessary.");
            return;
        }

        try {

            const resExistingUser = await fetch('api/userExists', {
                method: "POST",
                headers:
                    { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            })

            const { user } = await resExistingUser.json();
            if (user) {
                setError("User already exists");
                setLoading(false);
                return;
            }

            const res = await fetch('/api/register', {
                method: "POST",
                headers:
                    { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name, email, password
                })
            })
            const data = await res.json();
            if (res.ok) {
                setName("");
                setEmail("");
                setPassword("");
                setLoading(false);
                setError("");
                console.log("Success:", data);
                router.push("/dashboard");
            } else {
                console.error("User Registration Failed:", data);
                setError(data.message || "Something went wrong.");
                setLoading(false);
            }

        } catch (error) {
            setLoading(false);
            console.error("Error during Registration.", error);
        }
    }

    return <div className="grid place-items-center h-screen">
        {loading && <LoadingSpinner />}
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
            <h1 className="text-xl font-bold my-4">
                Register
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input onChange={e => setName(e.target.value)} value={name} type="text" placeholder="Full Name">
                </input>
                <input onChange={e => setEmail(e.target.value)} value={email} type="text" placeholder="Email">
                </input>
                <input onChange={e => setPassword(e.target.value)} value={password} type="text" placeholder="Password">
                </input>
                <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>

                {
                    error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2 ">
                            {error}
                        </div>)
                }

                <Link className="text-sm mt-3 text-right" href={'/'}>
                    Already have an account?
                    <span className="underline">
                        Login
                    </span>
                </Link>
            </form>
        </div>
    </div>
}