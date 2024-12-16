import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
}

export const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  return (
    <div className="prose prose-sm max-w-none h-full overflow-y-auto pr-4">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-bold mb-4">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl font-semibold mb-3 mt-6">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-medium mb-2 mt-4">{children}</h3>,
          ul: ({ children }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
          li: ({ children }) => <li className="mb-1">{children}</li>,
          p: ({ children }) => <p className="mb-4">{children}</p>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};