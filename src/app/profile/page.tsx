"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
  const onLogout = async () => {
    try {

    await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <button
        onClick={onLogout}
        className="p-2 pt-2 mt-4 border border-blue-300 rounded-lg
               mb-4 focus:outline-none
               focus:border-gray-600"
      >
        Logout
      </button>
    </div>
  );
}
