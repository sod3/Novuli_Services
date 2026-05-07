import React from "react";
import Link from 'next/link';

export const metadata = {
  title: 'Cookie Policy | NovuliSurvices',
  description: 'Our Cookie Policy explains how we use cookies to personalize content, secure our platform, and serve targeted advertisements via Google AdSense.',
};

export default function CookiePolicy() {
  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <span className="badge mb-6 font-bold uppercase tracking-widest text-[10px] text-accent">Legal Documentation</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6 tracking-tight">Cookie Policy</h1>
          <p className="text-secondary text-lg">Last Updated: May 2026</p>
        </div>

        <div className="prose prose-blue prose-lg text-secondary max-w-none">
          <p>
            At NovuliSurvices ("we", "us", or "our"), we use cookies and similar tracking technologies to track the activity on our platform and hold certain information. This Cookie Policy explains what cookies are, how we use them, and your choices regarding our use of cookies.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-12 mb-6">1. What Are Cookies?</h2>
          <p>
            Cookies are small files that are placed on your computer, mobile device, or any other device by a website, containing the details of your browsing history on that website among its many uses. They enable the website to remember your actions and preferences (such as login, language, font size, and other display preferences) over a period of time, so you don't have to keep re-entering them whenever you come back to the site or browse from one page to another.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-12 mb-6">2. How We Use Cookies</h2>
          <p>We use cookies for the following purposes:</p>
          <ul>
            <li><strong>Essential Cookies:</strong> These cookies are essential to provide you with services available through our website and to enable you to use some of its features.</li>
            <li><strong>Analytics Cookies:</strong> We use Google Analytics to track information about how the website is used so that we can make improvements. These cookies collect information in a way that does not directly identify anyone.</li>
            <li><strong>Advertising Cookies (Google AdSense):</strong> We partner with Google AdSense to serve ads on our site. Google uses cookies to serve ads based on a user's prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mt-12 mb-6">3. Third-Party Cookies</h2>
          <p>
            In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the service and deliver advertisements. Currently, our main external cookie providers are:
          </p>
          <ul>
            <li><strong>Google AdSense:</strong> Uses cookies to personalize and target ads based on your browsing behavior. You can opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className="text-accent underline">Google's Ads Settings</a>.</li>
            <li><strong>Google Analytics:</strong> We use these cookies to monitor site performance and user navigation to improve our user experience.</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mt-12 mb-6">4. Your Choices Regarding Cookies</h2>
          <p>
            If you prefer to avoid the use of cookies on the website, first you must disable the use of cookies in your browser and then delete the cookies saved in your browser associated with this website. You may use this option for preventing the use of cookies at any time.
          </p>
          <p>
            Please note that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-12 mb-6">5. Changes To This Cookie Policy</h2>
          <p>
            We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page. You are advised to review this Cookie Policy periodically for any changes.
          </p>

          <div className="mt-16 pt-8 border-t border-border-light bg-bg-gray p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-primary mb-4">Questions about this policy?</h3>
            <p className="mb-0">
              If you have any questions about our use of cookies, please contact us by visiting our <Link href="/contact" className="text-accent font-bold hover:underline">Contact Page</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
