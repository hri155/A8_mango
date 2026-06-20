"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/all-books", label: "All Books" },
  { href: "/profile", label: "My Profile" },
];

export default function Header() {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  return (
    <header className="navbar sticky top-0 z-50 bg-base-100/95 backdrop-blur border-b border-base-300 shadow-sm px-4 lg:px-8">
      <div className="navbar-start">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="text-3xl">🥭</span>
          <span className="bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
            Mango Books
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  pathname === link.href
                    ? "bg-primary text-primary-content font-semibold"
                    : "hover:bg-base-200"
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {isPending ? (
          <span className="loading loading-spinner loading-sm" />
        ) : session?.user ? (
          <>
            <span className="hidden sm:inline text-sm font-medium">
              Hi, {session.user.name}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-outline btn-sm btn-primary"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="btn btn-primary btn-sm">
            Login
          </Link>
        )}

        <div className="dropdown dropdown-end md:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow-lg border border-base-300"
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
