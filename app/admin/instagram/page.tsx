// app/admin/instagram/page.tsx
import { createClient } from "@/lib/supabase-server";
import InstagramFeedClient from "./InstagramFeedClient";
import { getInstagramPosts } from "@/lib/api/instagram";

export const dynamic = "force-dynamic";

export default async function AdminInstagramPage() {
  const posts = await getInstagramPosts();

  return (
    <div className="space-y-6">
      <InstagramFeedClient initialPosts={posts} />
    </div>
  );
}
