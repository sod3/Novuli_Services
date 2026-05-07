import React from "react";
import Link from 'next/link';
import { FiChevronRight, FiHome } from "react-icons/fi";

export default function Breadcrumbs({ items }) {
  // Breadcrumb Schema for SEO
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://novulisurvices.com"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": `https://novulisurvices.com${item.path}`
      }))
    ]
  };

  return (
    <nav className="flex mb-8 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide" aria-label="Breadcrumb">
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-secondary hover:text-accent transition-colors">
            <FiHome className="mr-2" size={14} />
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index}>
            <div className="flex items-center">
              <FiChevronRight className="text-gray-300 mx-1" size={14} />
              {index === items.length - 1 ? (
                <span className="ml-1 text-sm font-bold text-primary md:ml-2" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="ml-1 text-sm font-medium text-secondary hover:text-accent transition-colors md:ml-2"
                >
                  {item.label}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
