import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center py-20 px-4">
      <div className="text-center animate__animated animate__fadeIn">
        <span className="text-6xl block mb-4">📚</span>
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-base-content/70 mb-6">
          The page you are looking for does not exist.
        </p>
        <Link href="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
}
