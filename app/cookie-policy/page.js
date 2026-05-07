import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Cookie Policy | NovuliSurvices",
  description:
    "Learn how NovuliSurvices uses cookies and similar technologies to improve website functionality, analyze traffic, remember preferences, and support advertising services.",
};

export default function CookiePolicy() {
  const sections = [
    {
      title: "1. Introduction",
      content:
        "This Cookie Policy explains how NovuliSurvices uses cookies and similar technologies when you visit our website. It outlines what cookies are, why they are used, and the choices available to you regarding cookie preferences.",
    },
    {
      title: "2. What Are Cookies?",
      content:
        "Cookies are small text files stored on your device by your web browser when you visit a website. They help websites remember information such as preferences, settings, and browsing activity in order to improve functionality and user experience.",
    },
    {
      title: "3. Why We Use Cookies",
      content:
        "We use cookies to support essential website functionality, improve performance, understand how visitors use our platform, and maintain a smoother browsing experience. Some cookies also help us measure engagement and identify areas where the website can be improved.",
    },
    {
      title: "4. Types of Cookies We Use",
      list: [
        {
          heading: "Essential Cookies",
          text:
            "These cookies are necessary for the website to function properly. They support core features such as navigation, security, and accessibility.",
        },
        {
          heading: "Analytics Cookies",
          text:
            "Analytics cookies help us understand how visitors interact with the website. This information allows us to improve usability, monitor performance, and optimize tools and content.",
        },
        {
          heading: "Advertising Cookies",
          text:
            "Advertising cookies may be used by advertising partners such as Google AdSense to display relevant advertisements based on browsing behavior and previous visits to websites.",
        },
        {
          heading: "Preference Cookies",
          text:
            "These cookies remember certain settings and preferences to provide a more personalized browsing experience.",
        },
      ],
    },
    {
      title: "5. Third-Party Services",
      content:
        "We may use trusted third-party services including Google Analytics and Google AdSense. These providers may place their own cookies or use similar technologies to collect information related to website usage, performance measurement, and advertising.",
    },
    {
      title: "6. Google Advertising Cookies",
      content:
        "Google and its advertising partners may use cookies to serve ads based on your visits to this website and other websites. These technologies help deliver advertisements that may be more relevant to your interests. You can manage your ad preferences through your Google account settings.",
    },
    {
      title: "7. Managing Cookies",
      content:
        "Most web browsers allow you to control or disable cookies through browser settings. You can choose to block cookies, delete stored cookies, or receive alerts when cookies are being used. Please note that disabling certain cookies may affect website functionality and limit some features.",
    },
    {
      title: "8. Data and Privacy",
      content:
        "Cookies generally do not contain personally identifiable information on their own. However, certain usage data may be combined with other information for analytics, security, or advertising purposes in accordance with applicable privacy regulations.",
    },
    {
      title: "9. Updates to This Policy",
      content:
        "We may update this Cookie Policy from time to time to reflect changes in technology, legal requirements, or website functionality. Any updates will be published on this page with a revised effective date.",
    },
  ];

  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <header className="mb-16 border-b border-border-light pb-10">
          <span className="badge mb-6 font-bold uppercase tracking-widest text-[10px] text-accent inline-block">
            Website Policies
          </span>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6 tracking-tight">
            Cookie Policy
          </h1>

          <p className="text-secondary text-lg leading-relaxed max-w-3xl">
            This page explains how cookies and similar technologies are used on
            NovuliSurvices to support website functionality, analyze traffic,
            improve user experience, and manage advertising services.
          </p>
        </header>

        {/* Content */}
        <div className="space-y-14">
          {sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-2xl font-display font-bold text-primary mb-5">
                {section.title}
              </h2>

              {section.content && (
                <p className="text-secondary text-lg leading-relaxed">
                  {section.content}
                </p>
              )}

              {section.list && (
                <div className="space-y-6 mt-6">
                  {section.list.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-bg-gray border border-border-light rounded-2xl p-6"
                    >
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        {item.heading}
                      </h3>

                      <p className="text-secondary leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}

          {/* Contact Box */}
          <div className="mt-16 bg-bg-gray border border-border-light rounded-3xl p-8">
            <h3 className="text-2xl font-display font-bold text-primary mb-4">
              Questions About Cookies?
            </h3>

            <p className="text-secondary text-lg leading-relaxed mb-6">
              If you have questions about how cookies or similar technologies
              are used on NovuliSurvices, you can reach out through our contact
              page.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-accent font-semibold hover:underline"
            >
              Visit Contact Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}