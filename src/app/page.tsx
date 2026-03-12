"use client";

import { HealthCheck } from "@/components/health-check";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div>
        <h1>Welcome to Github PR ai reviewer</h1>
        <p>Start reviewing your PRs today!</p>
      </div>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/Login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/Login">Login</Link>
        </Button>
      </div>
      <HealthCheck />
    </div>
  );
}
