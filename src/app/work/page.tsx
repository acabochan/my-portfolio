import { Suspense } from "react";
import WorkClient from "./WorkClient";

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
      <WorkClient />
    </Suspense>
  );
}
