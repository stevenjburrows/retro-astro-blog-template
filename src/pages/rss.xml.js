import rss from "@astrojs/rss";
import { getAllPosts } from "../lib/client";
import { SITE_TITLE, SITE_DESCRIPTION } from "../config";

const data = await getAllPosts();
const allPosts = data.publication.posts.edges;
export const GET = () =>
	rss({
		title: SITE_TITLE || "",
		description: SITE_DESCRIPTION || "",
		site: import.meta.env.SITE,
		items: allPosts.map((post) => {
			return {
				link: `/post/${post.node.slug}`,
				title: post.node.title,
				pubDate: post.node.publishedAt,
				description: post.node.brief,
				content: post.node.content.html,
			};
		}),
		stylesheet: "/rss-styles.xsl",
	});
