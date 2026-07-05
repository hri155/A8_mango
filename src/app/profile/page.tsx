"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending, refetch } = authClient.useSession();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/login?redirect=/profile");
    }
  }, [isPending, session, router]);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session?.user) {
      toast.error("Please login first.");
      return;
    }

    if (!name.trim()) {
      toast.error("Name is required.");
      return;
    }

    setIsUpdating(true);
    const toastId = toast.loading("Updating profile...");

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: image.trim(),
      });

      if (error) {
        toast.error(error.message || "Profile update failed.", {
          id: toastId,
        });
        return;
      }

      await refetch();

      toast.success("Profile updated successfully!", {
        id: toastId,
      });

      router.refresh();
    } catch {
      toast.error("Something went wrong.", {
        id: toastId,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isPending) {
    return (
      <section className="min-h-[65vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-warning"></span>
      </section>
    );
  }

  if (!session?.user) {
    return (
      <section className="min-h-[65vh] flex items-center justify-center">
        <p className="font-semibold">Redirecting to login...</p>
      </section>
    );
  }

  const user = session.user;

  return (
    <section className="min-h-[65vh] px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold animate__animated animate__fadeInDown">
            My Profile
          </h1>
          <p className="text-base-content/70 mt-2">
            View and update your account information.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card bg-base-100 shadow-xl border animate__animated animate__fadeInLeft">
            <div className="card-body items-center text-center">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  className="w-32 h-32 rounded-full object-cover border-4 border-warning"
                />
              ) : (
                <div className="avatar placeholder">
                  <div className="bg-warning text-warning-content rounded-full w-32 h-32 flex items-center justify-center">
                    <span className="text-5xl font-bold">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                </div>
              )}

              <h2 className="text-2xl font-bold mt-4">
                {user.name || "No Name Found"}
              </h2>

              <p className="text-base-content/70 break-all">{user.email}</p>

              <div className="divider"></div>

              <div className="w-full space-y-3 text-left">
                <div className="bg-base-200 rounded-xl p-4">
                  <p className="text-sm text-base-content/60">Name</p>
                  <p className="font-semibold">{user.name || "Not provided"}</p>
                </div>

                <div className="bg-base-200 rounded-xl p-4">
                  <p className="text-sm text-base-content/60">Email</p>
                  <p className="font-semibold break-all">
                    {user.email || "Not provided"}
                  </p>
                </div>

                <div className="bg-base-200 rounded-xl p-4">
                  <p className="text-sm text-base-content/60">Image URL</p>
                  <p className="font-semibold break-all">
                    {user.image || "Not provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border animate__animated animate__fadeInRight">
            <div className="card-body">
              <h2 className="card-title text-2xl">Edit Profile</h2>
              <p className="text-base-content/70">
                Update your name and profile image using BetterAuth.
              </p>

              <form onSubmit={handleUpdateProfile} className="space-y-5 mt-4">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Image URL</span>
                  </label>
                  <input
                    type="url"
                    className="input input-bordered w-full"
                    placeholder="https://example.com/profile.jpg"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>

                {image && (
                  <div className="bg-base-200 rounded-xl p-4">
                    <p className="text-sm font-semibold mb-3">Image Preview</p>
                    <img
                      src={image}
                      alt="Preview"
                      className="w-24 h-24 rounded-full object-cover border"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-warning w-full"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Update Profile"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}