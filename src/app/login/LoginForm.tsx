"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectPath = searchParams.get("redirect") || "/profile";

  const { data: session, isPending } = authClient.useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!isPending && session?.user) {
      router.replace(redirectPath);
    }
  }, [isPending, session, router, redirectPath]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const toastId = toast.loading("Logging in...");

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Login failed", { id: toastId });
        return;
      }

      toast.success("Login successful!", { id: toastId });
      router.replace(redirectPath);
      router.refresh();
    } catch {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  if (isPending || session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border">
        <div className="card-body">
          <h1 className="text-2xl font-bold text-center">Login</h1>
          <p className="text-center text-base-content/60">
            Sign in to borrow books and manage your profile
          </p>

          <form onSubmit={handleLogin} className="space-y-4 mt-4">
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">Password</label>
              <input
                type="password"
                className="input input-bordered w-full"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-warning w-full">
              Login
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            type="button"
            className="btn btn-outline w-full"
            onClick={async () => {
              await authClient.signIn.social({
                provider: "google",
                callbackURL: redirectPath,
              });
            }}
          >
            Continue with Google
          </button>

          <p className="text-center mt-4">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              className="link link-warning"
              onClick={() => router.push("/register")}
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}