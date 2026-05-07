import os
import re

print("Starting patching...")

def replace_in_file(filepath, replacements):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    for old, new in replacements:
        content = content.replace(old, new)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Patched {filepath}")

# 1. Update data/tools.js
tools_js = r'c:\Users\Hp\Desktop\NovuliSurvices\novuliservices\data\tools.js'
with open(tools_js, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace brand
content = content.replace('NovuliServices', 'NovuliSurvices')

# Remove usageCount and rating
content = re.sub(r'\s*usageCount:\s*".*?",\s*rating:\s*[\d\.]+,\n', '\n', content)

# Add useCases before benefits:
useCases_string = '''
    useCases: "This utility is highly recommended for modern digital professionals who require secure, consistent, and high-quality outputs. Common use cases include creative agencies managing multiple client deliverables, freelance professionals optimizing their assets for rapid deployment, and enterprise teams requiring an entirely reliable, privacy-first processing environment. Because the operations occur seamlessly within your local browser sandbox, it completely eliminates the risks associated with cloud uploads or unverified third-party data tracking. This translates into a perfectly compliant workflow suitable for maintaining data integrity while handling extensive workloads swiftly and efficiently without any backend bottlenecks or mandatory user registrations.",'''

content = re.sub(r'(\s+benefits: \[)', r'\n' + useCases_string + r'\1', content)

# Remove testimonials array
# It looks like: export const testimonials = [\n  {\n ... \n];
content = re.sub(r'export const testimonials = \[.*?\];', '', content, flags=re.DOTALL)

with open(tools_js, 'w', encoding='utf-8') as f:
    f.write(content)
print("Patched tools.js")


# 2. Update layout.js
layout_js = r'c:\Users\Hp\Desktop\NovuliSurvices\novuliservices\app\layout.js'
replace_in_file(layout_js, [
    ('NovuliServices', 'NovuliSurvices'),
    ('novuliservices.com', 'novulisurvices.com')
])

# 3. Update Footer.js
footer_js = r'c:\Users\Hp\Desktop\NovuliSurvices\novuliservices\components\Footer.js'
replace_in_file(footer_js, [
    ('NovuliServices', 'NovuliSurvices'),
    ('support@novuliservices.com', 'support@novulisurvices.com'),
    ('Join 50,000+ professionals', 'Join thousands of professionals')
])

# 4. Update privacy/page.js and terms/page.js
privacy_js = r'c:\Users\Hp\Desktop\NovuliSurvices\novuliservices\app\privacy\page.js'
replace_in_file(privacy_js, [
    ('NovuliServices', 'NovuliSurvices'),
    ('novuliservices.com', 'novulisurvices.com')
])

terms_js = r'c:\Users\Hp\Desktop\NovuliSurvices\novuliservices\app\terms\page.js'
if os.path.exists(terms_js):
    replace_in_file(terms_js, [
        ('NovuliServices', 'NovuliSurvices'),
        ('novuliservices.com', 'novulisurvices.com')
    ])

# 5. Update contact/page.js
contact_js = r'c:\Users\Hp\Desktop\NovuliSurvices\novuliservices\app\contact\page.js'
replace_in_file(contact_js, [
    ('solutions@novuli.com', 'support@novulisurvices.com'),
    ('NovuliServices', 'NovuliSurvices')
])

# 6. Update about/page.js
about_js = r'c:\Users\Hp\Desktop\NovuliSurvices\novuliservices\app\about\page.js'
with open(about_js, 'r', encoding='utf-8') as f:
    about_content = f.read()

about_content = about_content.replace('NovuliServices', 'NovuliSurvices')
about_content = about_content.replace('import { testimonials } from "@/data/tools";', '')
about_content = about_content.replace('["50K+", "Daily Professionals"], ["1.2M", "Results Generated"], ["100%", "Private & Secure"]', '["100%", "Private Built"], ["0", "Data Exported"], ["100%", "Local Processing"]')

# Remove Testimonial section
about_content = re.sub(r'\{/\* Testimonials \*/\}.*?\{/\* Final CTA \*/\}', '{/* Final CTA */}', about_content, flags=re.DOTALL)

with open(about_js, 'w', encoding='utf-8') as f:
    f.write(about_content)
print("Patched about/page.js")


# 7. Update page.js (Home)
page_js = r'c:\Users\Hp\Desktop\NovuliSurvices\novuliservices\app\page.js'
with open(page_js, 'r', encoding='utf-8') as f:
    page_content = f.read()

page_content = page_content.replace('NovuliServices', 'NovuliSurvices')
page_content = page_content.replace('novuliservices.com', 'novulisurvices.com')
# Fix the testimonials import missing
page_content = page_content.replace('import { tools, featuredTools, searchTools, testimonials } from "@/data/tools";', 'import { tools, featuredTools, searchTools } from "@/data/tools";')

# Update stats array
stats_old = '''const stats = [
  { value: "50K+", label: "Professional Users" },
  { value: "17+", label: "Premium Tools" },
  { value: "1.2M", label: "Results Generated" },
];'''
stats_new = '''const stats = [
  { value: "100%", label: "Private Storage" },
  { value: "17+", label: "Premium Tools" },
  { value: "0ms", label: "Server Delays" },
];'''
page_content = page_content.replace(stats_old, stats_new)

# Update Final CTA text
page_content = page_content.replace('Join 50,000+ professionals', 'Join thousands of professionals')
page_content = page_content.replace('<div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-[0.2em]"><FiDownload /> 1.2M Downloads</div>', '<div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-[0.2em]"><FiShield /> 100% Secure Processing</div>')

# Remove Testimonials section
page_content = re.sub(r'\{/\* TESTIMONIALS SECTION \*/\}.*?\{/\* FINAL CTA \*/\}', '{/* FINAL CTA */}', page_content, flags=re.DOTALL)

with open(page_js, 'w', encoding='utf-8') as f:
    f.write(page_content)
print("Patched app/page.js")

# 8. Update ToolCard.js
toolcard_js = r'c:\Users\Hp\Desktop\NovuliSurvices\novuliservices\components\ToolCard.js'
with open(toolcard_js, 'r', encoding='utf-8') as f:
    tc_content = f.read()

# Replace usage count with category
tc_content = re.sub(r'<span className="text-\[10px\] font-bold uppercase tracking-widest text-secondary">Installs</span>\s*<span className="text-primary font-bold text-sm">\{tool\.usageCount\}</span>', 
r'<span className="text-[10px] font-bold uppercase tracking-widest text-secondary">Category</span><span className="text-primary font-bold text-sm">{tool.category}</span>', tc_content)

with open(toolcard_js, 'w', encoding='utf-8') as f:
    f.write(tc_content)
print("Patched ToolCard.js")


# 9. Update tool page (app/tools/[toolId]/page.js)
toolpage_js = r'c:\Users\Hp\Desktop\NovuliSurvices\novuliservices\app\tools\[toolId]\page.js'
with open(toolpage_js, 'r', encoding='utf-8') as f:
    tp_content = f.read()

# Update NovuliServices text at bottom
tp_content = tp_content.replace('NovuliServices', 'NovuliSurvices')

# Inject UseCases block
injection = '''
                {tool.useCases && (
                  <div className="mt-8 pt-8 border-t border-border-light">
                    <h4 className="text-xl font-bold text-primary mb-3">Enterprise & Professional Usage</h4>
                    <p className="text-secondary leading-relaxed font-light">{tool.useCases}</p>
                  </div>
                )}
'''
tp_content = tp_content.replace('</ul>\n              </div>', '</ul>\n              </div>\n              ' + injection)

with open(toolpage_js, 'w', encoding='utf-8') as f:
    f.write(tp_content)
print("Patched tool page")

# Update Data in blog.js to fix branding mismatch if any
blog_js = r'c:\Users\Hp\Desktop\NovuliSurvices\novuliservices\data\blog.js'
replace_in_file(blog_js, [
    ('NovuliServices', 'NovuliSurvices')
])

print("Done patching.")
