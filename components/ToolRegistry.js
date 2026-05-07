'use client';
import dynamic from 'next/dynamic';

export const ToolComponents = {
  "image-to-pdf": dynamic(() => import('@/components/tools/ImageToPDF'), { ssr: false }),
  "pdf-to-word": dynamic(() => import('@/components/tools/PDFToWord'), { ssr: false }),
  "word-to-pdf": dynamic(() => import('@/components/tools/WordToPDF'), { ssr: false }),
  "background-remover": dynamic(() => import('@/components/tools/BackgroundRemover'), { ssr: false }),
  "qr-code-generator": dynamic(() => import('@/components/tools/QRCodeGenerator'), { ssr: false }),
  "resume-builder": dynamic(() => import('@/components/tools/ResumeBuilder'), { ssr: false }),
  "keyword-research-tool": dynamic(() => import('@/components/tools/KeywordResearchTool'), { ssr: false }),
  "backlink-checker": dynamic(() => import('@/components/tools/BacklinkChecker'), { ssr: false }),
  "website-speed-checker": dynamic(() => import('@/components/tools/WebsiteSpeedChecker'), { ssr: false }),
  "ai-writing-tools": dynamic(() => import('@/components/tools/AIWritingTools'), { ssr: false }),
  "meta-tag-generator": dynamic(() => import('@/components/tools/MetaTagGenerator'), { ssr: false }),
  "email-signature-builder": dynamic(() => import('@/components/tools/EmailSignatureBuilder'), { ssr: false }),
  "invoice-generator": dynamic(() => import('@/components/tools/InvoiceGenerator'), { ssr: false }),
  "form-builder": dynamic(() => import('@/components/tools/FormBuilder'), { ssr: false }),
  "image-compressor": dynamic(() => import('@/components/tools/ImageCompressor'), { ssr: false }),
  "word-counter": dynamic(() => import('@/components/tools/WordCounter'), { ssr: false }),
  "text-analyzer": dynamic(() => import('@/components/tools/TextAnalyzer'), { ssr: false }),
  "pdf-merger": dynamic(() => import('@/components/tools/PDFMerger'), { ssr: false }),
  "ai-text-rewriter": dynamic(() => import('@/components/tools/AITextRewriter'), { ssr: false }),
  "seo-analyzer": dynamic(() => import('@/components/tools/SEOAnalyzer'), { ssr: false }),
};
