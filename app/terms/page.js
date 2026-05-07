import React from "react";

export const metadata = {
  title: 'Terms of Service | NovuliServices',
  description: 'Read NovuliServices terms of service before using our tools.',
};

export default function Terms() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4">
        <header className="mb-12 pb-8 border-b border-border-light text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4 tracking-tight">Terms of Service</h1>
          <p className="text-secondary text-sm font-medium uppercase tracking-widest leading-relaxed">Last updated: April 2026</p>
        </header>
        
        <div className="space-y-12">
          {[
            ["1. Acceptance of Terms", "By using NovuliServices, you agree to these Terms of Service. If you do not agree, please do not use our services."],
            ["2. Use of Services", "Our tools are provided for lawful, personal or business use. You may not use NovuliServices to process illegal content, infringe copyrights, or engage in spam or fraudulent activities."],
            ["3. Tool Availability", "We provide these tools free of charge and strive for 99.9% uptime. However, we do not guarantee uninterrupted service and reserve the right to modify or discontinue tools without notice."],
            ["4. Intellectual Property", "NovuliServices and its brand assets are our intellectual property. Tools and outputs generated are owned by you. You may use generated content for any lawful purpose."],
            ["5. Disclaimers", "Services are provided 'as-is' without warranties. We are not liable for any data loss, business interruption, or inaccuracies in tool outputs. Always verify critical results independently."],
            ["6. Limitation of Liability", "Our total liability shall not exceed $10 for any claims arising from the use of our free services."],
            ["7. Termination", "We may suspend or terminate access for violations of these terms or misuse of our platform."],
            ["8. Changes to Terms", "We may update these terms at any time. Continued use after changes constitutes acceptance."],
            ["9. Contact", "For terms-related questions, email legal@novuliservices.com."],
          ].map(([title, content], i) => (
            <div key={i} className="prose prose-blue max-w-none">
              <h2 className="text-2xl font-display font-bold text-primary mb-4">{title}</h2>
              <p className="text-secondary text-lg leading-relaxed font-light">{content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
