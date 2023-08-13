// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { RouteConfig, RouteContext } from "fresh/server.ts";
import { Head } from "fresh/runtime.ts";
import { getPostsForMonth } from "util/post.ts";
import { formatMonthId } from "util/date.ts";
import Post from "components/post.tsx";
import Footer from "components/footer.tsx";

export default async function Month(req: Request, ctx: RouteContext) {
  const posts = await getPostsForMonth(ctx.params[0]);
  return (
    <>
      <Head>
        <title>Timeline</title>
      </Head>
      <div class="pt-3 px-4 text-sm text-gray-400">
        <a class="hover:underline" href={`/`}>TOP</a> /{" "}
        {formatMonthId(ctx.params[0])}
      </div>
      <hr class="mt-3 border-gray-700" />
      <div class="">
        {posts.map((post) => (
          <div class="mt-4">
            <Post post={post} />
            <hr class="mt-3 border-gray-700" />
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export const config: RouteConfig = {
  routeOverride: "/(\\d{6})",
};
