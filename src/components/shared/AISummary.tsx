import React from 'react';
import { Card } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface AISummaryProps {
  summary: string;
}

export const AISummary: React.FC<AISummaryProps> = ({ summary }) => {
  return (
    <Card className="p-4 mb-6 bg-gradient-to-r from-[#3ea57d] to-[#2f6a54] shadow-lg">
      <div className="flex items-center mb-2 space-x-2">
        <Sparkles className="w-5 h-5 text-white fill-white" />
        <h3 className="font-semibold text-white">AI Summary</h3>
      </div>
      <div className="prose-sm prose text-white prose-invert max-w-none marker:text-white">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{summary}</ReactMarkdown>
      </div>
    </Card>
  );
};