import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FaGoogle } from "react-icons/fa";
import TextEdgy from "@/components/TextEdgy";
import Link from "next/link";
import InAppSpy from 'inapp-spy';

export default function SignUp() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isInApp, setIsInApp] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const { isInApp } = InAppSpy();
        setIsInApp(isInApp);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const userHandle = formData.get("userHandle") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userHandle, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            // Sign in the user after successful registration
            const result = await signIn("credentials", {
                userHandle,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Error signing in after registration");
            } else {
                router.push("/");
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = () => {
        signIn("google", { callbackUrl: "/" });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8 bg-accent/30 backdrop-blur-sm p-8 rounded-xl border-2 border-dashed border-accent/30">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-primary">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-primary/70">
                        Choose a unique user handle to get started
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <label htmlFor="userHandle" className="sr-only">
                                User Handle
                            </label>
                            <input
                                id="userHandle"
                                name="userHandle"
                                type="text"
                                required
                                pattern="[a-zA-Z0-9]{8,}"
                                title="User handle must be at least 8 characters long and contain only letters and numbers"
                                className="relative block w-full rounded-lg border-2 border-dashed border-primary/30 py-3 px-4 text-primary placeholder:text-primary/50 bg-base-100 focus:ring-2 focus:ring-primary focus:border-primary"
                                placeholder="User Handle (min. 8 characters)"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                minLength={8}
                                className="relative block w-full rounded-lg border-2 border-dashed border-primary/30 py-3 px-4 text-primary placeholder:text-primary/50 bg-base-100 focus:ring-2 focus:ring-primary focus:border-primary"
                                placeholder="Password (min. 8 characters)"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="sr-only">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                minLength={8}
                                className="relative block w-full rounded-lg border-2 border-dashed border-primary/30 py-3 px-4 text-primary placeholder:text-primary/50 bg-base-100 focus:ring-2 focus:ring-primary focus:border-primary"
                                placeholder="Confirm Password"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-error text-sm text-center">{error}</div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative flex w-full justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-base-100 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <TextEdgy className="text-base-100 text-lg">
                                {loading ? "Creating account..." : "Create account"}
                            </TextEdgy>
                        </button>
                    </div>
                </form>

                {!isInApp && (
                    <>
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-primary/30"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 text-primary/70">Or continue with</span>
                            </div>
                        </div>

                        <button
                            onClick={handleGoogleSignIn}
                            className="w-full flex items-center justify-center gap-3 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-gray-700 focus:outline-none transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            <FaGoogle className="h-6 w-6 text-secondary" />
                            <TextEdgy className="text-white text-md font-bold">
                                <span>Sign up with Google</span>
                            </TextEdgy>
                        </button>
                    </>
                )}

                {isInApp && (
                    <div className="text-center text-sm text-primary/70 mt-4">
                        <p>Google sign-up is available in Chrome and other browsers.</p>
                        <p>Please open this page in your browser to use Google sign-up.</p>
                    </div>
                )}

                <div className="text-center mt-4">
                    <p className="text-md text-primary/70">
                        Already have an account?{" "}
                        <Link href="/auth/signin" className="font-medium text-primary hover:text-primary/90">
                            <span className="text-accent font-bold">
                                Sign in
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
} 