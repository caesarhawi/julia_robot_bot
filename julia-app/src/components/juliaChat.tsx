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
  SendButton,
  OnlineBadge,
  ProfileImageWrapper,
  SenderName
} from './styles/juliaChatStyles';


interface Message {
  text: string;
  sender: 'user' | 'julia';
  profileImage?: string; 
  senderName?: string; 
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

  const generateJuliaResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    const foundKey = Object.keys(juliaResponseMap).find((key) =>
      lowerMessage.includes(key)
    );
  
    const responseText = foundKey
      ? juliaResponseMap[foundKey]
      : "I'm sorry, I don't understand.";
  
    return {
      text: responseText,
      sender: 'julia',
      profileImage: require('../assets/julia-icon.png'),
      senderName: 'Julia',
    };
  };
  

  const sendMessage = () => {
    if (!inputText.trim()) return;
  
    const userMessage: Message = {
      text: inputText,
      sender: 'user',
    };
  
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
  
    setTimeout(() => {
      const juliaResponse = generateJuliaResponse(inputText);
      setMessages((prev) => [...prev, juliaResponse]);
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
      <ProfileImageWrapper>
      <ProfileImage src={require('../assets/julia-icon.png')} alt="Julia" />
        <OnlineBadge />
      </ProfileImageWrapper>
      <ProfileName>Julia</ProfileName>
  </ChatHeader>

      
  <MessageContainer>
  {messages.map((msg, index) => (
    <div
      key={index}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
        marginBottom: '10px',
      }}
    >
      {msg.sender === 'julia' && (
        <SenderName>{msg.senderName || 'Julia'}</SenderName>
      )}
      <MessageBubble sender={msg.sender}>
        {msg.sender === 'julia' && (
          <img
            src={msg.profileImage || ''}
            alt="Julia"
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              marginRight: '10px',
            }}
          />
        )}
        <span>{msg.text}</span>
      </MessageBubble>
    </div>
  ))}
  <div ref={messagesEndRef} />
</MessageContainer>

      <InputArea>
        <MessageInput
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown ={handleKeyPress}
          placeholder="Type your message..."
        />
        <SendButton onClick={sendMessage}>Send</SendButton>
      </InputArea>
    </ChatContainer>
  );
}

export default JuliaChat;