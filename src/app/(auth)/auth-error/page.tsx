import Link from "next/link";

import type { PageParams } from "@/types/next";

import { getError } from "./auth-error-mapping";

export default async function AuthErrorPage(props: PageParams<{}>) {
  const { errorMessage, error } = getError(props.searchParams.error);

  return (
    <div className="size-screen container flex flex-col items-center justify-center">
      <Link href="/">Back</Link>
      <div>
        <div>
          <h1>{error}</h1>
          <p>{errorMessage}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/login">Back to login</Link>
        </div>
      </div>
    </div>
  );
}
