import styled from 'styled-components';

export const ChatContainer = styled.div`
  width: 350px;
  height: 500px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin: 20px auto;
`;

export const ChatHeader = styled.div`
  background-color: #3498db;
  color: white;
  display: flex;
  align-items: center;
  padding: 10px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const ProfileName = styled.span`
  font-weight: bold;
`;

export const MessageContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

export const MessageBubble = styled.div<{ sender: 'user' | 'julia' }>`
  max-width: 70%;
  margin: 5px 0;
  padding: 10px;
  border-radius: 12px;
  align-self: ${props => props.sender === 'user' ? 'flex-end' : 'flex-start'};
  background-color: ${props => props.sender === 'user' ? '#3498db' : '#e0e0e0'};
  color: ${props => props.sender === 'user' ? 'white' : 'black'};
`;

export const InputArea = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #e0e0e0;
`;

export const MessageInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-right: 10px;
`;

export const SendButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;
