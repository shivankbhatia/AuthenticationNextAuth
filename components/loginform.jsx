'use client'
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./loadingBuffer.jsx"; // make sure path is correct
import GoogleButton from "react-google-button";

export default function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await signIn("credentials", {
                email, password, redirect: false
            })
            if (res?.error) {
                setError("Invalid Credentials.");
                setLoading(false);
                return;
            }
            router.replace('/dashboard');
        } catch (error) {
            console.log(error);
            setError("Something went wrong. Please try again.")
            setLoading(false);
        }
    }

    return <div className="grid place-items-center h-screen">
        {loading && <LoadingSpinner />}
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
            <h1 className="text-xl font-bold my-4">
                Enter the details
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input onChange={e => { setEmail(e.target.value) }} value={email} type="text" placeholder="Email">
                </input>
                <input onChange={e => { setPassword(e.target.value) }} value={password} type="password" placeholder="Password">
                </input>
                <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
                {error && (<div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2 ">
                    {error}
                </div>)}

                <Link className="text-sm mt-3 text-right" href={'/register'}> Don't have an account? <span className="underline">Register</span></Link>
            </form>

            <div className="flex items-center justify-center my-6">
                <div className="border-t border-black flex-grow mr-3"></div>
                <span className="text-black font-medium">or</span>
                <div className="border-t border-black flex-grow ml-3"></div>
            </div>
            <div className="flex flex-col items-center ">
                <GoogleButton onClick={() => signIn('google')} className="mx-auto mt-16" />
            </div>
        </div>
    </div>
}