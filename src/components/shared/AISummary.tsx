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
    <Card className="p-4 mb-6 bg-gradient-to-r from-[#c0d1cb] to-[#3ea57d] shadow-lg">
      <div className="flex items-center space-x-2 mb-2">
        <Sparkles className="h-5 w-5 text-white" />
        <h3 className="font-semibold text-white">AI Summary</h3>
      </div>
      <div className="prose prose-sm prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{summary}</ReactMarkdown>
      </div>
    </Card>
  );
};