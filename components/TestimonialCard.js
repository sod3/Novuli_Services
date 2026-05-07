import { FiStar } from 'react-icons/fi';

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="card h-full flex flex-col bg-white">
      <div className="flex gap-1 mb-6">
        {[...Array(testimonial.rating)].map((_, i) => (
          <FiStar key={i} className="text-amber-400 fill-amber-400" size={16} />
        ))}
      </div>
      
      <p className="text-primary font-medium text-lg leading-relaxed mb-8 flex-grow">
        "{testimonial.content}"
      </p>
      
      <div className="flex items-center gap-4 mt-auto">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center font-bold text-accent border border-blue-200">
          {testimonial.avatar}
        </div>
        <div>
          <h4 className="text-primary font-bold">{testimonial.author}</h4>
          <p className="text-secondary text-xs font-bold uppercase tracking-widest">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
