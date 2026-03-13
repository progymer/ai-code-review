"use client";

import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function SignInPage() {
    const router = useRouter()
    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");
    const [ error, setError] = useState("");
    const [ loading, setLoading] = useState(false);

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const result = await signIn.email({
            email,
            password
        });

        if (result.error) {
            setError(result.error.message || "An error occurred");
            setLoading(false);
        } else {
            router.push("/repos")
        }
    }

    const handleSocialSignIn = async (
      provider: "github" | "google",
    ) => {
      setError("");
      setLoading(true);

      await signIn.social({
        provider,
        callbackURL: "/repos",
      });
    };

    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>sign in with your credentials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>

              {error && <p className="text-red-500">{error}</p>}

              <Button
                type="submit"
                className="w-full hover:opacity-90"
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign In"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              className="w-full"
              variant="outline"
              onClick={() => handleSocialSignIn("google")}
              disabled={loading}
            >
              <FaGoogle className="mr-2 size-4" />
              Sign in with Google
            </Button>

            <Button
              className="w-full hover:opacity-90"
              onClick={() => handleSocialSignIn("github")}
              disabled={loading}
            >
              <FaGithub className="mr-2 size-4" />
              Sign in with GitHub
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account? <Link href="/sign-up">Sign Up</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    );

} 