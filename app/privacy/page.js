import React from "react";

export const metadata = {
  title: "Privacy Policy | NovuliSurvices",
  description:
    "Read the NovuliSurvices Privacy Policy to understand how we collect, use, and protect information, including cookies, analytics, advertising, and browser-based file processing.",
};

export default function Privacy() {
  const sections = [
    [
      "1. Introduction",
      "At NovuliSurvices, we value transparency and take user privacy seriously. This Privacy Policy explains what information may be collected when you use our website, how that information is used, and the steps we take to protect it. By accessing or using our tools and services, you agree to the practices outlined in this policy.",
    ],
    [
      "2. Information We Collect",
      "Some information is collected automatically when you visit our website. This may include browser type, device information, operating system, pages visited, referral sources, approximate location at a city or country level, and general interaction data. This helps us understand how visitors use the platform and identify ways to improve usability and performance.",
    ],
    [
      "3. Information You Voluntarily Provide",
      "If you contact us directly or subscribe to updates, we may collect information such as your name and email address. We only use this information to respond to inquiries, provide support, or send requested updates. We do not sell personal information to advertisers or third-party marketers.",
    ],
    [
      "4. File Processing and Privacy",
      "Many of our tools are designed to process files directly within your browser whenever technically possible. This means your files typically remain on your device and are not uploaded to our servers. This approach helps improve privacy, reduce unnecessary data transfer, and provide faster processing for users.",
    ],
    [
      "5. Cookies and Similar Technologies",
      "We use cookies and similar technologies to improve website functionality, remember preferences, analyze traffic patterns, and support advertising services. Some cookies are essential for core functionality, while others help us understand user behavior and improve the overall experience. You can manage or disable cookies through your browser settings at any time.",
    ],
    [
      "6. Analytics Services",
      "We use analytics tools such as Google Analytics to better understand how visitors interact with our website. These services collect aggregated and anonymized usage data, including page visits, session duration, and general engagement trends. This information helps us maintain, optimize, and improve our tools and content.",
    ],
    [
      "7. Advertising",
      "NovuliSurvices may display advertisements through third-party advertising partners, including Google AdSense. These services may use cookies or similar technologies to show more relevant ads based on previous website visits and browsing activity. Personalized advertising settings can be managed through your Google account preferences.",
    ],
    [
      "8. Third-Party Services",
      "Our website may rely on trusted third-party providers for services such as analytics, advertising, hosting, fonts, or performance optimization. These providers operate under their own privacy policies and terms. We encourage users to review the privacy practices of any external services they interact with.",
    ],
    [
      "9. Data Security",
      "We take reasonable technical and organizational measures to help protect our website and users against unauthorized access, misuse, or data loss. However, no online platform or method of electronic transmission can guarantee absolute security.",
    ],
    [
      "10. Your Rights and Choices",
      "Depending on your location and applicable laws, you may have the right to request access to personal information, request corrections, or ask for deletion of certain data. You may also choose to disable cookies or limit certain tracking features through your browser or device settings.",
    ],
    [
      "11. Children's Privacy",
      "NovuliSurvices is intended for a general audience and is not specifically directed toward children under the age of 13. We do not knowingly collect personal information from children.",
    ],
    [
      "12. Updates to This Policy",
      "We may revise this Privacy Policy from time to time to reflect changes in our services, legal requirements, or operational practices. Any updates will be posted on this page along with the revised effective date.",
    ],
    [
      "13. Contact Information",
      "If you have questions about this Privacy Policy or how information is handled on our platform, you can contact us at: privacy@novulisurvices.com",
    ],
  ];

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <header className="mb-16 pb-10 border-b border-border-light text-center">
          <span className="badge mb-6 font-bold uppercase tracking-widest text-[10px] inline-block">
            Privacy & Data Protection
          </span>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6 tracking-tight">
            Privacy Policy
          </h1>

          <p className="text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
            This page explains how NovuliSurvices collects, uses, and protects
            information when you use our website and online tools.
          </p>
        </header>

        {/* Content */}
        <div className="space-y-14">
          {sections.map(([title, content], i) => (
            <section key={i}>
              <h2 className="text-2xl font-display font-bold text-primary mb-5">
                {title}
              </h2>

              <p className="text-secondary text-lg leading-relaxed">
                {content}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}