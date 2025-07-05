import { SignedIn, UserButton } from "@clerk/nextjs";
import { FilePlus } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const header = () => {
  return (
    <div className="flex justify-between p-5 border-b bg-white shadow-sm">
      <Link href="/dashboard" className="text-2xl">
        Chat to <span className="text-indigo-600">PDF</span>
      </Link>
      <SignedIn>
        <div className="flex items-center space-x-2">
          <Button asChild variant="link" className="hidden md:flex">
            <Link href="/dashboard/upgrade">Pricing</Link>
          </Button>

          <Button asChild variant="outline">
            <Link href="/dashboard">My Documents</Link>
          </Button>

          <Button asChild variant="outline">
            <Link href="/dashboard/upload">
              <FilePlus className="text-indigo-600" />
            </Link>
          </Button>
          {/* TODO - upgrade plan button*/}
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
};

export default header;
