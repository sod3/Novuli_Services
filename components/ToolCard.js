import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import * as Icons from 'react-icons/fi';

export default function ToolCard({ tool }) {
  const IconComponent = Icons[tool.icon] || Icons.FiBox;

  return (
    <Link href={tool.slug} className="group block">
      <div className="card h-full flex flex-col items-start relative overflow-hidden group-hover:border-blue-200">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full -z-10 transition-transform group-hover:scale-110 opacity-50" />
        
        <div className="flex items-center justify-between w-full mb-6">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 border border-border-light shadow-sm bg-white"
          >
            <IconComponent size={24} style={{ color: tool.color }} />
          </div>
          {tool.featured && (
            <span className="badge text-[10px] bg-gradient-to-r from-orange-50 to-amber-50 text-orange-600 border-none shadow-sm">
              ✨ PRO
            </span>
          )}
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
              {tool.name}
            </h3>
          </div>
          <p className="text-secondary text-sm leading-relaxed font-light line-clamp-2">
            {tool.description}
          </p>
        </div>

        <div className="mt-auto pt-6 w-full flex items-center justify-between border-t border-border-light/50">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">Category</span><span className="text-primary font-bold text-sm">{tool.category}</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-accent transition-colors">
            <FiArrowRight size={14} className="text-accent group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  );
}
