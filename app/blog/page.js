import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { blogPosts } from '@/data/blog';

export const metadata = {
  title: 'Blog & Expert Guides',
  description: 'Read deep-dive articles on SEO, productivity, website performance, and digital strategy from the NovuliServices team.',
};

export default function BlogIndex() {
  return (
    <main className="pt-32 pb-24 min-h-screen bg-bg-gray">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="badge mb-4 border-none shadow-sm bg-blue-100 uppercase tracking-widest text-accent font-bold px-4 py-1.5 rounded-full">Articles & Guides</span>
          <h1 className="text-5xl md:text-7xl font-display font-black text-primary mb-6">Work <span className="text-accent underline decoration-blue-200 underline-offset-8">Smarter.</span></h1>
          <p className="text-xl font-light text-secondary max-w-2xl mx-auto">
            Deep-dive tutorials, algorithmic insights, and best practices for modern professionals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {blogPosts.map((post) => {
            const slug = post.slug.startsWith('/blog/') ? post.slug.replace('/blog/', '') : post.slug;
            return (
              <Link key={post.id} href={`/blog/${slug}`} className="group block bg-white border border-border-light rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-blue-900/[0.05] hover:border-accent transition-all">
                <div className="h-56 overflow-hidden relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-accent uppercase tracking-widest shadow-sm">{post.category}</div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 text-xs font-bold text-secondary uppercase tracking-widest mb-4">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-border-light" />
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-4 leading-snug group-hover:text-accent transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-secondary text-base font-light leading-relaxed line-clamp-3 mb-6">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-accent text-sm font-bold group-hover:translate-x-2 transition-transform">
                    Read Full Guide <FiArrowRight size={16} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
