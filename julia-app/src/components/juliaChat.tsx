import React, { useState, useEffect, useRef } from "react";

interface Message {
  text: string;
  sender: "user" | "julia";
}

const juliaResponseMap: { [key: string]: string } = {
  help: "Please be specific on what you need help with.",
  machine: "Yes, I am in fact a machine.",
  order: "I can't give out any information about any specific order.",
  bye: "Thank you for contacting us! Have a nice day!",
};

function JuliaChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateJuliaResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    const foundKey = Object.keys(juliaResponseMap).find((key) =>
      lowerMessage.includes(key)
    );

    return foundKey
      ? juliaResponseMap[foundKey]
      : "I'm sorry, I don't understand.";
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: inputText,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // Simulate Julia's response after 1-2 seconds
    setTimeout(() => {
      const juliaResponse: Message = {
        text: generateJuliaResponse(inputText),
        sender: "julia",
      };

      setMessages((prev) => [...prev, juliaResponse]);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div>
      <div>
        <img src="https://via.placeholder.com/50" alt="Julia" />
        <span>Julia</span>
      </div>

      <div>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              margin: "10px 0",
            }}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default JuliaChat;
