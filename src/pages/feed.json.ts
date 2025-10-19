import { getCollection } from 'astro:content';
import config from '@/config/config.json';
import { sortByDate } from '@/lib/utils/sortFunctions';

export async function GET() {
  const blog = await getCollection('blog', ({ data }) => {
    return !data.draft;
  });

  const sortedPosts = sortByDate(blog);

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: config.site.title,
    home_page_url: config.site.base_url,
    feed_url: `${config.site.base_url}/feed.json`,
    description: config.metadata.meta_description,
    icon: `${config.site.base_url}${config.site.favicon}`,
    favicon: `${config.site.base_url}${config.site.favicon}`,
    language: 'th',
    authors: [
      {
        name: config.metadata.meta_author,
        url: config.site.base_url,
        email: 'aiunlockinnovations@gmail.com',
      },
    ],
    items: sortedPosts.map((post) => ({
      id: `${config.site.base_url}/blog/${post.slug}/`,
      url: `${config.site.base_url}/blog/${post.slug}/`,
      title: post.data.title,
      content_html: post.body || post.data.description,
      summary: post.data.description || post.data.meta_title,
      image: `${config.site.base_url}${post.data.image || config.metadata.meta_image}`,
      date_published: post.data.date.toISOString(),
      date_modified: post.data.date.toISOString(),
      authors: [
        {
          name: post.data.author || config.metadata.meta_author,
        },
      ],
      tags: [
        ...(post.data.categories || []),
        ...(post.data.tags || []),
      ],
      language: 'th',
    })),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'max-age=3600, s-maxage=3600',
    },
  });
}
