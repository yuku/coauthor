import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "こんにちは、どのようにお手伝いできますか？",
      sender: "bot",
    },
    { id: 2, text: "このスクリプトを改善できますか？", sender: "user" },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    setMessages([...messages, { id: Date.now(), text: input, sender: "user" }]);
    setInput(""); // Clear the input
  };

  return (
    <div className="bg-gray-100 h-screen flex">
      {/* Left Panel (Chat) */}
      <div className="w-1/2 bg-white border-r border-gray-200 p-4 flex flex-col">
        <div className="flex-grow overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${
                message.sender === "bot"
                  ? "w-full"
                  : "flex justify-end items-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg ${
                  message.sender === "bot"
                    ? "text-slate-900 w-full"
                    : "bg-blue-500 text-white"
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
            placeholder="メッセージを入力してください..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="w-full mt-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            onClick={handleSendMessage}
            type="button"
          >
            送信
          </button>
        </div>
      </div>

      {/* Right Panel (Code Editor) */}
      <div className="w-1/2 bg-gray-50 p-4">
        <div className="bg-white rounded-lg shadow border border-gray-200 p-4 h-full">
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700">
              Reindex All Jobs
            </p>
          </div>
          <pre className="bg-gray-800 text-white p-4 rounded-lg text-sm overflow-auto h-[85%]">
            {`#!/bin/bash
# 引数のチェック
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <staging|production>"
  exit 1
fi

# 環境に応じてプロジェクトを設定
ENV=$1
case "$ENV" in
  staging)
    PROJECT="remote-hq-staging"
    ;;
  production)
    PROJECT="remote-hq-production"
    ;;
  *)
    echo "Error: Invalid environment '$ENV'. Use 'staging' or 'production'."
    exit 1
    ;;
esac`}
          </pre>
        </div>
      </div>
    </div>
  );
}
