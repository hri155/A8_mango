import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "My Profile | Mango Books",
};

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 animate__animated animate__fadeIn">
        My Profile
      </h1>

      <div className="card max-w-2xl mx-auto bg-base-100 shadow-xl border border-base-200 animate__animated animate__fadeInUp">
        <div className="card-body items-center text-center">
          <div className="avatar mb-4">
            <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="bg-primary text-primary-content w-full h-full flex items-center justify-center text-4xl font-bold">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
            </div>
          </div>

          <h2 className="card-title text-2xl">{user.name}</h2>
          <p className="text-base-content/70">{user.email}</p>

          <div className="divider" />

          <div className="w-full space-y-3 text-left">
            <div className="flex justify-between py-2 border-b border-base-200">
              <span className="font-medium text-base-content/70">Name</span>
              <span>{user.name}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-base-200">
              <span className="font-medium text-base-content/70">Email</span>
              <span>{user.email}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-base-200">
              <span className="font-medium text-base-content/70">Photo</span>
              <span className="truncate max-w-[200px] text-sm">
                {user.image || "Not set"}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-medium text-base-content/70">Member ID</span>
              <span className="font-mono text-sm">{user.id.slice(0, 8)}...</span>
            </div>
          </div>

          <div className="card-actions mt-6">
            <Link href="/profile/update" className="btn btn-primary">
              Update Information
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
