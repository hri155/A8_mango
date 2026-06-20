"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await authClient.updateUser({
      name,
      image,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Failed to update profile.");
      return;
    }

    toast.success("Profile updated successfully!");
    router.push("/profile");
  };

  if (isPending) {
    return (
      <div className="flex justify-center py-24">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <Link href="/profile" className="btn btn-ghost btn-sm mb-6 gap-1">
        ← Back to Profile
      </Link>

      <div className="card max-w-md mx-auto bg-base-100 shadow-xl border border-base-200 animate__animated animate__fadeIn">
        <div className="card-body">
          <h1 className="card-title text-2xl justify-center mb-4">
            Update Information
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label" htmlFor="name">
                <span className="label-text">Name</span>
              </label>
              <input
                id="name"
                type="text"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="image">
                <span className="label-text">Image URL</span>
              </label>
              <input
                id="image"
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered w-full"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "Update Information"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
