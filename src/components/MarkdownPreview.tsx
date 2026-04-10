import ReactMarkdown from 'react-markdown';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MarkdownPreviewProps {
  content: string;
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  return (
    <ScrollArea className="h-full w-full rounded-md border p-6 bg-zinc-950 text-zinc-100">
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown
          components={{
            h1: ({ children }) => <h1 className="text-3xl font-bold mb-4 text-white border-b border-zinc-800 pb-2">{children}</h1>,
            h2: ({ children }) => <h2 className="text-2xl font-semibold mt-8 mb-4 text-zinc-100">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xl font-medium mt-6 mb-3 text-zinc-200">{children}</h3>,
            p: ({ children }) => <p className="text-zinc-400 leading-relaxed mb-4">{children}</p>,
            ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2 text-zinc-400">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-zinc-400">{children}</ol>,
            code: ({ children }) => (
              <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-200 font-mono text-sm">
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 my-4 overflow-x-auto">
                {children}
              </pre>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-zinc-700 pl-4 italic text-zinc-500 my-4">
                {children}
              </blockquote>
            ),
            hr: () => <hr className="border-zinc-800 my-8" />,
            a: ({ href, children }) => (
              <a href={href} className="text-blue-400 hover:underline transition-colors" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </ScrollArea>
  );
}
