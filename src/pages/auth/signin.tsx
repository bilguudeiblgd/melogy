import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FaGoogle } from "react-icons/fa";
import TextEdgy from "@/components/TextEdgy";
import Text from "@/components/Text";
import Link from "next/link";
import InAppSpy from 'inapp-spy';

export default function SignIn() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isInApp, setIsInApp] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const { isInApp } = InAppSpy();
        setIsInApp(isInApp);
    }, []);

    console.log("callbackUrl", router.query.callbackUrl);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const userHandle = formData.get("userHandle") as string;
        const password = formData.get("password") as string;

        try {
            const result = await signIn("credentials", {
                userHandle,
                password,
                redirect: false,
            });

            if (result && result.error) {
                setError("Invalid username or password.");
            } else if (result && result.ok) {
                const callbackUrl = router.query.callbackUrl as string;
                router.push(callbackUrl || "/");
            }
        } catch (error) {
            console.log("error", error);
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        const callbackUrl = router.query.callbackUrl as string;
        signIn("google", { callbackUrl: callbackUrl || undefined });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-6 bg-accent/30 backdrop-blur-sm p-8 rounded-xl border-2 border-dashed border-accent/30">
                <div>
                    <h2 className="mt-0 text-center text-3xl font-bold tracking-tight text-primary">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-3 rounded-md shadow-sm">
                        <div>
                            <label htmlFor="userHandle" className="sr-only">
                                User Handle
                            </label>
                            <input
                                id="userHandle"
                                name="userHandle"
                                type="text"
                                required
                                className="relative block w-full rounded-lg border-2 border-dashed border-primary/30 py-3 px-4 text-primary placeholder:text-primary/50 bg-base-100 focus:ring-2 focus:ring-primary focus:border-primary"
                                placeholder="User Handle"
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
                                className="relative block w-full rounded-lg border-2 border-dashed border-primary/30 py-3 px-4 text-primary placeholder:text-primary/50 bg-base-100 focus:ring-2 focus:ring-primary focus:border-primary"
                                placeholder="Password"
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
                                {loading ? "Signing in..." : "Sign in"}
                            </TextEdgy>
                        </button>
                    </div>
                </form>

                {!isInApp && (
                    <>
                        <div className="relative my-2">
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
                                <span>Sign in with Google</span>
                            </TextEdgy>
                        </button>
                        <div className="text-center text-primary/60">
                            <Text className="text-sm">
                                <span>If you are in from Instagram or Messenger, please use the actual browser to sign in.</span>
                            </Text>
                        </div>
                    </>
                )}

                {isInApp && (
                    <div className="text-center text-sm text-primary/70 mt-4">
                        <p>Google sign-in is available in Chrome and other browsers.</p>
                        <p>Please open this page in your browser to use Google sign-in.</p>
                    </div>
                )}

                <div className="text-center mt-4">
                    <p className="text-md text-primary/70">
                        Don{"'"}t have an account?{" "}
                        <Link
                            href={{
                                pathname: "/auth/signup",
                                query: { callbackUrl: router.query.callbackUrl }
                            }}
                            className="font-medium text-primary hover:text-primary/90"
                        >
                            <span className="text-accent font-bold">
                                Sign up
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
} 