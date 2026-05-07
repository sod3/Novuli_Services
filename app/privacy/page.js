import React from "react";

export const metadata = {
  title: 'Privacy Policy | NovuliServices',
  description: 'NovuliServices privacy policy. Learn how we handle, protect and respect your data including Google AdSense advertising, cookie usage, and analytics.',
};

export default function Privacy() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4">
        <header className="mb-12 pb-8 border-b border-border-light text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-secondary text-sm font-medium uppercase tracking-widest leading-relaxed">Last updated: May 2026</p>
        </header>
        
        <div className="space-y-12">
          {[
            ["1. Overview", "NovuliServices ('we', 'us', 'our') is committed to protecting your privacy. This Privacy Policy explains what personal information we collect from visitors to novuliservices.com, how we use that information, with whom we share it, and the choices you have regarding it. By using our website and tools, you consent to the practices described in this policy. If you do not agree with this policy, please discontinue use of our services."],
            ["2. Information We Collect", "We collect information in two main ways. Automatically: When you visit our site, we automatically collect certain technical information including your approximate geographic location (country/city level only), browser type and version, operating system, referring URL, pages visited and time spent, and anonymized interaction data such as tool usage patterns. This data is collected by Google Analytics. Voluntarily: If you fill out our contact form or subscribe to updates, we collect your name and email address. We never sell, rent, or share your personally identifiable information with third-party marketers or advertisers."],
            ["3. File Processing and Data Security", "All file-processing operations happen entirely within your browser using JavaScript and WebAssembly. Your files are never uploaded to our servers. We have no ability to access, view, store, or transmit any files you use with our tools. This client-side architecture means your documents, images, and business data never leave your device."],
            ["4. Google AdSense Advertising", "We participate in the Google AdSense program. Google AdSense uses cookies and web beacons to serve advertisements based on your prior visits to this website and other websites on the internet. You may opt out of personalized advertising by visiting Google's Ads Settings at https://adssettings.google.com."],
            ["5. Google Analytics", "We use Google Analytics to understand how visitors interact with our website. Google Analytics collects anonymized data about page views, session duration, traffic sources, and user behavior patterns. This data helps us improve our tools and content."],
            ["6. Cookies", "Cookies are small text files stored on your device by your browser. We use essential cookies for core functionality, analytics cookies, and advertising cookies. You can control cookies through your browser settings at any time."],
            ["7. Third-Party Services", "We use third-party services like Google Analytics, Google AdSense, and Google Fonts. We are not responsible for the privacy practices of these external services. We recommend reviewing their individual privacy policies."],
            ["8. Your Rights and Choices", "Depending on your jurisdiction, you may have specific rights over your personal data, including requesting a copy, correction, or deletion. Contact us at privacy@novuliservices.com to exercise these rights."],
            ["9. Children's Privacy", "NovuliServices is intended for general audiences and is not directed toward children under the age of 13. We do not knowingly collect personal information from children under 13."],
            ["10. Changes to this Policy", "We may update this Privacy Policy periodically. We will post the updated policy on this page with a revised 'Last updated' date."],
            ["11. Contact Us", "If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us: Email: privacy@novuliservices.com."]
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
