'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/atom-one-dark.css'

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="prose prose-invert prose-dark max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-green-accent mt-8 mb-4">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-green-accent mt-6 mb-3">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold text-green-accent-light mt-5 mb-2">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-semibold text-green-accent-light mt-4 mb-2">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-white/70 leading-relaxed mb-4">{children}</p>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-accent underline hover:text-green-accent-light transition-colors"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside text-white/70 mb-4 space-y-1 marker:text-green-accent">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside text-white/70 mb-4 space-y-1 marker:text-green-accent">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="text-white/70">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-green-accent bg-dark-surface rounded-r-lg p-4 my-4 text-white/60 italic">
              {children}
            </blockquote>
          ),
          code: ({ className, children }) => {
            const isInline = !className
            if (isInline) {
              return (
                <code className="bg-dark-surface text-green-accent px-2 py-0.5 rounded text-sm">
                  {children}
                </code>
              )
            }
            return <code className={className}>{children}</code>
          },
          pre: ({ children }) => (
            <pre className="bg-dark-surface rounded-lg p-4 overflow-x-auto my-4">
              {children}
            </pre>
          ),
          img: ({ src, alt }) => {
            if (!src || typeof src !== 'string') return null
            return (
              <span className="block my-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={alt || ''}
                  className="rounded-xl w-full h-auto"
                />
              </span>
            )
          },
          hr: () => <hr className="border-white/20 my-8" />,
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="w-full border-collapse">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="bg-dark-surface text-green-accent font-semibold p-3 text-left border border-white/10">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="p-3 text-white/70 border border-white/10">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
