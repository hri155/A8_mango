"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

interface ProfileUpdateFormProps {
  initialName: string;
  initialImage: string;
  email: string;
}

function ProfileUpdateForm({
  initialName,
  initialImage,
  email,
}: ProfileUpdateFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [image, setImage] = useState(initialImage);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanImage = image.trim();

    if (!cleanName) {
      toast.error("Name is required.");
      return;
    }

    setLoading(true);

    const { error } = await authClient.updateUser({
      name: cleanName,
      image: cleanImage || null,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Failed to update profile.");
      return;
    }

    toast.success("Profile updated successfully!");
    router.refresh();
    router.push("/profile");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 max-w-4xl mx-auto">
      <div className="card bg-base-100 shadow-xl border border-base-200 animate__animated animate__fadeIn">
        <div className="card-body">
          <h1 className="card-title text-2xl mb-4">
            Update Profile Information
          </h1>

          <p className="text-base-content/70 mb-2">
            This form uses BetterAuth&apos;s update user API to edit your name
            and image URL.
          </p>

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
                <span className="label-text-alt">Optional</span>
              </label>

              <input
                id="image"
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered w-full"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />

              <label className="label">
                <span className="label-text-alt">
                  Leave blank to remove the saved profile image.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "Save BetterAuth Profile"
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-200 animate__animated animate__fadeInUp">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Preview</h2>

          <div className="avatar my-4">
            <div className="w-28 h-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
              {image ? (
                
                <img
                  src={image}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="bg-primary text-primary-content w-full h-full flex items-center justify-center text-4xl font-bold">
                  {name.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>
          </div>

          <p className="font-semibold">{name || "Your name"}</p>
          <p className="text-sm text-base-content/60 break-all">{email}</p>
        </div>
      </div>
    </div>
  );
}

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex justify-center py-24">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (!session?.user) {
    router.push("/login?redirect=/profile/update");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <Link href="/profile" className="btn btn-ghost btn-sm mb-6 gap-1">
        ← Back to Profile
      </Link>

      <ProfileUpdateForm
        key={`${session.user.id}-${session.user.name}-${session.user.image}`}
        initialName={session.user.name || ""}
        initialImage={session.user.image || ""}
        email={session.user.email || ""}
      />
    </div>
  );
}