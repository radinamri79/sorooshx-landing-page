"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { verifyToken } from "@/lib/api";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    verifyToken().then((valid) => {
      router.replace(valid ? "/admin/dashboard" : "/admin/login");
    });
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-5 h-5 border-2 border-[#00FF77] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
