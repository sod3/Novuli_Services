import { blogPosts, getPostBySlug } from '@/data/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiCalendar, FiClock, FiShare2 } from 'react-icons/fi';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug.split('/').pop(),
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(`/blog/${slug}`);
  if (!post) return { title: 'Post Not Found' };
  
  return {
    title: post.seoTitle || post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.seoTitle || post.title,
      description: post.excerpt,
      images: [post.image],
    }
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(`/blog/${slug}`);
  
  if (!post) {
    notFound();
  }

  return (
    <main className="pt-32 pb-24 min-h-screen bg-bg-gray">
      <article className="max-w-4xl mx-auto px-4">
        <div className="mb-12 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-secondary hover:text-accent font-bold text-sm mb-8 transition-colors">
            <FiArrowLeft /> Back to all articles
          </Link>
          
          <div className="mb-6 flex justify-center">
            <span className="badge uppercase tracking-widest text-[10px] font-bold text-accent px-4 py-1.5 rounded-full border border-blue-200">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-display font-black text-primary mb-8 leading-tight text-balance">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-bold text-secondary uppercase tracking-widest pb-8 border-b border-border-light">
            <span className="flex items-center gap-2"><FiCalendar /> {post.date}</span>
            <span className="flex items-center gap-2"><FiClock /> {post.readTime}</span>
            <button className="flex items-center gap-2 hover:text-accent transition-colors">
              <FiShare2 /> Share
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-sm border border-border-light overflow-hidden mb-16">
          <div className="h-64 md:h-[400px] w-full relative">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
          <div 
            className="p-8 md:p-16 prose prose-blue prose-lg max-w-none text-secondary prose-article"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </main>
  );
}
