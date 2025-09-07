"use client";

import { useAuth } from "@/context/auth";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function ContinueWithGoogleButton() {
  const auth = useAuth();
  const router = useRouter();

  return (
    <Button
      type="button"
      onClick={async () => {
        await auth.signInWithGoogle()
        router.refresh();
      }}
      variant="outline"
      className="w-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-medium flex items-center justify-center gap-2 shadow-sm"
    >
      <Image
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        width={18}
        height={18}
      />
      Continue with Google
    </Button>
  );
}
