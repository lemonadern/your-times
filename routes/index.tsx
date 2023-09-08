// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT license.

import { RouteContext } from "fresh/server.ts";
import { Head } from "fresh/runtime.ts";
import {
  defaultPost,
  getNextFileName,
  getPostsForMonths,
  getThisMonthId,
  getThisMonthPosts,
} from "util/post.ts";
import { formatMonthId } from "util/date.ts";
import Post from "components/post.tsx";
import Footer from "components/footer.tsx";
import AddNewPostLink from "components/AddNewPostLink.tsx";
import { AUTHOR_ID, GITHUB_REPOSITORY_URL, SITE_NAME, SITE_URL } from "util/const.ts";
import { Temporal } from "esm/@js-temporal/polyfill@0.4.4";

export default async function Home(_req: Request, _ctx: RouteContext) {
  const thisMonthId = getThisMonthId();
  const thisMonthPosts = await getThisMonthPosts();
  const nextFileName = await getNextFileName(thisMonthPosts.length);
  const months = [];
  for await (const item of Deno.readDir("tl")) {
    months.push(item.name);
  }
  const posts = await getPostsForMonths(months);
  const ogImage = `${SITE_URL}/og-image.png`;
  const description = `HOME / ${SITE_NAME}`;
  return (
    <>
      <Head>
        <title>{description}</title>
        <meta property="og:title" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="418" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={ogImage} />
        <meta property="twitter:title" content={description} />
      </Head>
      <div class="pt-3 px-7">
        #{SITE_NAME}
      </div>
      <hr class="mt-3 border-gray-700" />
      {posts.map(([month, posts]) => (
        <>
          <img src={`/${month}.png`} />
          <hr class="border-gray-700" />
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
      <AddNewPostLink newPostUrl={`${GITHUB_REPOSITORY_URL}/new/main/tl/${thisMonthId}?filename=${nextFileName}&value=${encodeURIComponent(
        defaultPost(Temporal.Now.zonedDateTimeISO(), AUTHOR_ID),
      )
        }`} />

      <Footer />
    </>
  );
}
