"use client";
import React from "react";
import { Button } from "./ui/button";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const PlaceholderDocument = () => {
  const router = useRouter();
  const handleClick = () => {
    // TODO - check if user is in free tier then push to upgrade page
    router.push("/dashboard/upload");
  };
  return (
    <Button
      onClick={handleClick}
      className="flex flex-col items-center justify-center w-64 h-80 rounded-xl bg-gray-200 drop-shadow-md text-gray-400"
    >
      <PlusCircleIcon className="h-16 w-16"></PlusCircleIcon>
      <p>Add a document</p>
    </Button>
  );
};

export default PlaceholderDocument;
