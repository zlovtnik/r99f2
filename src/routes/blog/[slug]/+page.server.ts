import { blogPosts, getRelatedBlogPosts } from '$data/blog';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    throw error(404, {
      message: 'Blog post not found'
    });
  }

  const relatedPosts = getRelatedBlogPosts(post.id, 3);

  return {
    post,
    relatedPosts
  };
};