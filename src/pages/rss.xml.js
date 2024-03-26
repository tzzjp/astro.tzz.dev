import rss, { pagesGlobToRssItems } from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    const posts = await getCollection('posts');
    return rss({
        title: 'Tzz.Dev',
        description: '日々の開発メモ、たまにはプライベートのことも。',
        site: context.site,
        items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
        items: posts.map((post) => ({
            title: post.data.title,
            description: post.data.description,
            link: `/posts/${post.slug}/`,
        })),
        customData: `<language>ja-JP</language>`,
    });
}