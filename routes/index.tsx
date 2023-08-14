// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { RouteContext } from "fresh/server.ts";
import { Head } from "fresh/runtime.ts";
import { getPostsForMonths } from "util/post.ts";
import { formatMonthId } from "util/date.ts";
import Post from "components/post.tsx";
import Footer from "components/footer.tsx";

export default async function Home(req: Request, ctx: RouteContext) {
  const months = [];
  for await (const item of Deno.readDir("tl")) {
    months.push(item.name);
  }
  const posts = await getPostsForMonths(months);
  return (
    <>
      <Head>
        <title>Timeline of @kt3k</title>
      </Head>
      <div class="">
        <div class="pt-3 px-7">
          Timeline of{" "}
          <a class="hover:underline" href="https://kt3k.org">@kt3k</a>
        </div>
        <hr class="mt-3 border-gray-700" />
        {posts.map(([month, posts]) => (
          <>
            <div class="pt-3 px-4 text-sm text-gray-400">
              <a class="hover:underline" href={`/${month}`}>
                {formatMonthId(month)}
              </a>
            </div>
            {posts.map((post) => (
              <div class="mt-4">
                <Post post={post} />
                <hr class="mt-3 border-gray-700" />
              </div>
            ))}
          </>
        ))}
      </div>
      <Footer />
    </>
  );
}

function Month({ month }: { month: string }) {
  return;
}
