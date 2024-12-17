import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send, Image as ImageIcon, Loader2 } from 'lucide-react';
// import { useQuery } from '@tanstack/react-query';
// import * as Tooltip from "@radix-ui/react-tooltip";
import { MarkdownContent } from '@/components/shared/MarkdownContent';
import toast, { Toaster } from 'react-hot-toast';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const AskAIPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  console.log(messages)
  const [input, setInput] = useState('');
  const [currImg, setCurrImg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // console.log(base64String)
        setCurrImg(base64String);
        toast.success("🖼️ Image uploaded!")
        // setBase64Image(base64String);
        // setPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    let userMessageContent = [];
    if (currImg){
      userMessageContent= [
        {
          "type": "text",
          "text": `${input}`
        },
        {
          "type": "image_url",
          "image_url": {
            "url": currImg
          }
        }
      ]
    }else{
      userMessageContent= [
        {
          "type": "text",
          "text": `${input}`
        }
      ]
    }

    try {
      const response = await fetch('http://localhost:8000/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "content": userMessageContent
        }),
      });

      const data = await response.json();
      // console.log("chat op",data)

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data,
        timestamp: new Date(),
      };

      setCurrImg('');

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Toaster/>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Ask FAIrm AI</h1>

        <Card className="p-6">
          <div className="flex flex-col h-[calc(100vh-16rem)]">
            <div className="flex-1 pr-2 mb-4 space-y-4 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="mt-8 text-center text-gray-500">
                  <p className="text-lg font-medium">👋 Hello! I'm your farming assistant</p>
                  <p className="mt-2 text-sm">
                    Ask me anything about crop planning, weather analysis, or farming best practices
                  </p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {message.type === 'ai' ? 
                      <MarkdownContent content={message.content}></MarkdownContent> : 
                      (currImg ? <p>{message.content}</p> : <p>{message.content}</p>)}
                      {/* <p className="mt-1 text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString('en-US',{hour: '2-digit',minute: '2-digit',hour12: false})}
                      </p> */}
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t">
              <div className="flex space-x-2">
                {/* <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                  onClick={() => {}}
                >
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    type="file"
                    accept="image/*"
                    // onChange={handleImageChange}
                  />
                  <ImageIcon className="w-5 h-5" />
                </Button> */}
                <div className="flex flex-col items-center">
                  <label
                    htmlFor="file_input"
                    className="flex-1 px-3 py-2 border rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                    
                  >
                    <ImageIcon className="mx-2 text-gray-500 cursor-pointer" />
                  </label>
                  <input
                    id="file_input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  {/* {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      className="object-cover w-64 h-64 mt-4 border border-gray-300 rounded-lg"
                    />
                  )} */}
                </div>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about farming..."
                  className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button
                  className="shrink-0"
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AskAIPage;