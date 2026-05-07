'use client';
export default function PremiumToolLayout({ children }) {
  // In Next.js, the heavy SEO shell is handled by app/tools/[toolId]/page.js.
  // We keep this to avoid having to refactor the internal return statements of all 18 tools.
  return <>{children}</>;
}
