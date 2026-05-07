import Link from 'next/link';
import { notFound } from 'next/navigation';
import { tools, getToolById, getRelatedTools } from '@/data/tools';
import ToolLoader from '@/components/ToolLoader';
import { FiZap, FiShield, FiCheckCircle, FiLock, FiMail } from 'react-icons/fi';

export async function generateStaticParams() {
  return tools.map((tool) => ({
    toolId: tool.id,
  }));
}

export async function generateMetadata({ params }) {
  const { toolId } = await params;
  const tool = getToolById(toolId);
  if (!tool) return { title: 'Tool Not Found' };
  
  return {
    title: tool.seoTitle || `Free ${tool.name} Online | No Sign-Up required`,
    description: tool.seoDescription || tool.description,
  };
}

export default async function ToolPage({ params }) {
  const { toolId } = await params;
  const tool = getToolById(toolId);
  
  if (!tool) {
    notFound();
  }

  const related = getRelatedTools(tool.id, 4);

  return (
    <div className="bg-bg-gray">
      <main className="min-h-screen text-primary font-sans pt-14">
        {/* HERO SECTION */}
        <section className="bg-white border-b border-border-light pt-20 pb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-gradient-to-l from-blue-50 to-transparent rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold uppercase tracking-wider mb-6 border border-blue-100">
              <FiZap className="text-yellow-500" /> Voted #1 {tool.category} Utility
            </div>
            <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight leading-tight mb-6 text-balance">
              Free {tool.name} Online: <br className="hidden md:block"/>
              <span className="text-blue-600">Professional Results Instantly</span>
            </h1>
            <p className="text-lg md:text-xl text-secondary max-w-3xl mx-auto leading-relaxed mb-8">
              {tool.description} No credit card, no sign-up required. Just process your files directly in your browser.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-secondary bg-white shadow-xl shadow-blue-50 rounded-2xl w-max mx-auto px-8 py-4 border border-border-light">
              <div className="flex items-center gap-2"><FiShield className="text-green-500" size={18}/> Secure Privacy</div>
              <div className="flex items-center gap-2"><FiCheckCircle className="text-blue-500" size={18}/> Fast Processing</div>
              <div className="flex items-center gap-2"><FiLock className="text-amber-500" size={18}/> 100% Free</div>
            </div>
          </div>
        </section>

        {/* MAIN TOOL UI WRAPPER */}
        <section className="py-12 bg-bg-gray relative z-20" id="tool-ui">
          <div className="max-w-6xl mx-auto px-4">
             <div className="bg-white rounded-3xl shadow-2xl shadow-blue-900/[0.04] p-4 md:p-8 border border-border-light min-h-[500px]">
                <ToolLoader toolId={tool.id} />
             </div>
          </div>
        </section>

        {/* LEAD CAPTURE SECTION */}
        <section className="py-16 bg-blue-600 text-white border-y border-blue-700">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-black font-display mb-4">Want to save your result for later?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Don't lose your work. Enter your work email below and we'll securely send you a copy of your processed files.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto" action="#" method="post">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-6 py-4 rounded-xl text-primary outline-none font-medium placeholder-slate-400 border-2 border-transparent focus:border-blue-300"
                required 
              />
              <button type="submit" className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition whitespace-nowrap shadow-xl flex items-center justify-center gap-2">
                Send Result <FiMail />
              </button>
            </form>
            <p className="text-xs text-blue-200 mt-4 font-medium"><FiLock className="inline mr-1"/> 100% secure processing. No spam guaranteed.</p>
          </div>
        </section>

        {/* SEO CONTENT SECTION - Crawlable by AdSense immediately */}
        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
               <h2 className="text-4xl font-black font-display tracking-tight text-balance">Understanding the {tool.name}</h2>
               <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="prose prose-blue prose-lg text-secondary">
                <h3 className="text-2xl font-bold text-primary mb-4">Why you need this tool</h3>
                <p className="leading-relaxed">
                  {tool.deepDescription || `The ${tool.name} is built to secure your workflow and provide enterprise-level processing without requiring bulky offline software.`}
                </p>
                <ul className="list-none pl-0 space-y-3 mt-6">
                   {tool.benefits && tool.benefits.slice(0, 4).map((b, i) => (
                     <li key={i} className="flex items-start gap-3">
                       <FiCheckCircle className="text-green-500 shrink-0 mt-1"/>
                       <span className="text-primary font-medium">{b}</span>
                     </li>
                   ))}
                </ul>
              </div>
              
              <div className="bg-bg-gray p-8 rounded-[2rem] border border-border-light">
                 <h3 className="text-2xl font-bold text-primary mb-8">How to use this tool:</h3>
                 <div className="space-y-6">
                   {(tool.howTo && tool.howTo.length > 0 ? tool.howTo : ["Initialize tool", "Enter required fields", "Process operation", "Download success output"]).map((step, i) => (
                     <div key={i} className="flex items-start gap-4">
                       <span className="text-4xl font-black font-display text-blue-100">{String(i + 1).padStart(2, '0')}</span>
                       <div>
                         <h4 className="text-lg font-bold text-primary mb-1">{typeof step === 'string' ? step : step.title}</h4>
                         <p className="text-sm text-secondary leading-relaxed">{typeof step === 'string' ? "Follow this simple step to proceed." : step.desc}</p>
                       </div>
                     </div>
                   ))}
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATIC FAQ SECTION (No JS required for basic reading) */}
        {tool.faqs && tool.faqs.length > 0 && (
        <section className="py-24 bg-white border-t border-border-light">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black font-display mb-4">Frequently Asked Questions</h2>
              <p className="text-secondary text-lg">Common questions regarding the {tool.name}.</p>
            </div>
            <div className="space-y-4">
              {tool.faqs.map((faq, index) => (
                 <details key={index} className="group border border-border-light rounded-2xl bg-white [&_summary::-webkit-details-marker]:hidden">
                   <summary className="flex items-center justify-between cursor-pointer p-6 font-bold text-primary hover:bg-bg-gray rounded-2xl transition-colors">
                     <span>{faq.q || faq.question}</span>
                     <span className="transition group-open:rotate-180">
                       <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                     </span>
                   </summary>
                   <div className="text-secondary px-6 pb-6 leading-relaxed">
                     <p>{faq.a || faq.answer}</p>
                   </div>
                 </details>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* RELATED TOOLS */}
        {related.length > 3 && (
        <section className="py-16 bg-bg-gray border-t border-border-light">
          <div className="max-w-6xl mx-auto px-4">
             <h3 className="text-xl font-bold text-primary mb-8 flex items-center gap-2"><FiZap className="text-yellow-500"/> Related Workflows</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {related.map(t => (
                    <Link key={t.id} href={t.slug} className="p-4 bg-white border border-border-light rounded-2xl hover:border-blue-600 hover:shadow-lg transition-all group block">
                      <h4 className="font-bold text-primary group-hover:text-blue-600 mb-1 line-clamp-1 flex items-center justify-between">
                        {t.name} <svg className="w-4 h-4 text-secondary group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                      </h4>
                      <p className="text-xs text-secondary line-clamp-1">{t.shortDesc}</p>
                    </Link>
                ))}
             </div>
          </div>
        </section>
        )}
      </main>
    </div>
  );
}
