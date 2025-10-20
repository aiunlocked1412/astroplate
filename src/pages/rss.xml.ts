import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import config from '@/config/config.json';
import { sortByDate } from '@/lib/utils/sortFunctions';

export async function GET(context) {
  const blog = await getCollection('blog', ({ data }) => {
    return !data.draft && data.date; // Only include posts with dates
  });

  const sortedPosts = sortByDate(blog);

  return rss({
    title: config.site.title,
    description: config.metadata.meta_description,
    site: context.site || config.site.base_url,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description || post.data.meta_title,
      pubDate: post.data.date,
      link: `/blog/${post.slug}/`,
      author: post.data.author || config.metadata.meta_author,
      categories: [
        ...(post.data.categories || []),
        ...(post.data.tags || []),
      ],
      customData: `
        <image>${config.site.base_url}${post.data.image || config.metadata.meta_image}</image>
        <language>th</language>
      `,
    })),
    customData: `
      <language>th</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <atom:link href="${config.site.base_url}/rss.xml" rel="self" type="application/rss+xml" />
      <managingEditor>aiunlockinnovations@gmail.com (AI Unlocked Innovations)</managingEditor>
      <webMaster>aiunlockinnovations@gmail.com (AI Unlocked Innovations)</webMaster>
      <copyright>${config.params.copyright}</copyright>
      <category>AI</category>
      <category>Vibe Coding</category>
      <category>n8n Automation</category>
      <category>Prompt Engineering</category>
      <category>คอร์ส AI</category>
      <category>เชียงใหม่</category>
      <ttl>60</ttl>
      <image>
        <url>${config.site.base_url}${config.metadata.meta_image}</url>
        <title>${config.site.title}</title>
        <link>${config.site.base_url}</link>
        <width>144</width>
        <height>144</height>
      </image>
    `,
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
      content: 'http://purl.org/rss/1.0/modules/content/',
      dc: 'http://purl.org/dc/elements/1.1/',
    },
  });
}
