import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

function Page() {
  return (
    <div className="min-h-screen grid grdi-cols-1 lg:grid-cols-2">
      <div className="lg:flex h-full flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-muted-foreground">
            Welcome Back
          </h1>

          <p className="text-base text-[#7E8CA0]">
            Log in or create account to get back to your dashboard!
          </p>
        </div>

        <div className="flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignIn path="/sign-in" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>

      <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
        <Image src="/logo.svg" height={100} width={100} alt="Logo" />
      </div>
    </div>
  );
}

export default Page;
