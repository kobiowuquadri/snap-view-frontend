import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div>
      <h1>Welcome to Snap View</h1>
      <Link href={'/register'}>Rgister Page</Link>
      <Link href="/login">Login Page</Link>
    </div>
  );
}
