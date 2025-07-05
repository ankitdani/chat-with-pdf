import Link from "next/link";
import React from "react";

const dashboard = () => {
  return (
    <div>
      <Link href="/dashboard">
        Chat to <span className="text-indigo-600">PDF</span>
      </Link>
    </div>
  );
};

export default dashboard;
