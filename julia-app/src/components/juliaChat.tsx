import React, { useState, useEffect, useRef } from 'react';
import { 
  ChatContainer, 
  ChatHeader, 
  ProfileImage, 
  ProfileName, 
  MessageContainer, 
  MessageBubble, 
  InputArea, 
  MessageInput, 
  SendButton 
} from './styles/juliaChatStyles';


interface Message {
  text: string;
  sender: 'user' | 'julia';
}

const juliaResponseMap: { [key: string]: string } = {
  'help': 'Please be specific on what you need help with.',
  'machine': 'Yes, I am in fact a machine.',
  'order': "I can't give out any information about any specific order.",
  'bye': 'Thank you for contacting us! Have a nice day!'
};

function JuliaChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateJuliaResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    const foundKey = Object.keys(juliaResponseMap).find(key => 
      lowerMessage.includes(key)
    );

    return foundKey 
      ? juliaResponseMap[foundKey] 
      : "I'm sorry, I don't understand.";
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      text: inputText,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    setTimeout(() => {
      const juliaResponse: Message = {
        text: generateJuliaResponse(inputText),
        sender: 'julia'
      };

      setMessages(prev => [...prev, juliaResponse]);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>
      <ProfileImage src={require('../assets/julia-icon.png')} alt="Julia" />
        <ProfileName>Julia</ProfileName>
      </ChatHeader>
      
      <MessageContainer>
        {messages.map((msg, index) => (
          <MessageBubble key={index} sender={msg.sender}>
            {msg.text}
          </MessageBubble>
        ))}
        <div ref={messagesEndRef} />
      </MessageContainer>
      
      <InputArea>
        <MessageInput
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <SendButton onClick={sendMessage}>Send</SendButton>
      </InputArea>
    </ChatContainer>
  );
}

export default JuliaChat;