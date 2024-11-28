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
  SenderName,
  MessageTime
} from './styles/juliaChatStyles';

// Interface to define the structure of a chat message
interface Message {
  text: string; // The text content of the message
  sender: 'user' | 'julia'; // Specifies who sent the message
  profileImage?: string; // Optional: Julia's profile image
  senderName?: string; // Optional: Sender's name (e.g., Julia)
  time: string; // Timestamp of when the message was sent
}

const juliaResponseMap: { [key: string]: string } = {
  'help': 'Please be specific on what you need help with.',
  'machine': 'Yes, I am in fact a machine.',
  'order': "I can't give out any information about any specific order.",
  'bye': 'Thank you for contacting us! Have a nice day!'
};

function JuliaChat() {
  const [messages, setMessages] = useState<Message[]>([]); // Stores the chat history
  const [inputText, setInputText] = useState(''); // Tracks the user's input
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref to auto-scroll to the latest message

  // Scrolls to the most recent message whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

    /**
   * Generates Julia's response based on the user's input.
   * @param userMessage - The text entered by the user.
   * @returns A string containing Julia's response.
   */
  
  const generateJuliaResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    const foundKey = Object.keys(juliaResponseMap).find((key) =>
      lowerMessage.includes(key)
    );

  // Return the appropriate response or a default message if no match is found
    return foundKey
      ? juliaResponseMap[foundKey]
      : "I'm sorry, I don't understand.";
  };

   /**
   * Sends the user's message and generates Julia's response with a delay.
   */

  const sendMessage = () => {
    if (!inputText.trim()) return; // Prevent sending empty messages
  
    // Create a message object for the user's message
    const userMessage: Message = {
      text: inputText,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

   // Add the user's message to the chat history
    setMessages((prev) => [...prev, userMessage]);
    setInputText(''); // Clear the input field
  
    // Simulate Julia's response after a 1-2 second delay
    setTimeout(() => {
      const juliaResponse: Message = {
        text: generateJuliaResponse(inputText), 
        sender: 'julia',
        profileImage: require('../assets/julia-icon.png'), 
        senderName: 'Julia',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
  
      setMessages((prev) => [...prev, juliaResponse]);
    }, 1000 + Math.random() * 1000);
  };
  
  
  /**
   * Handles "Enter" key press in the input field to send the message.
   * @param e - Keyboard event
   */
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
      <MessageTime sender={msg.sender}>{msg.time}</MessageTime> {/* Pass sender */}
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