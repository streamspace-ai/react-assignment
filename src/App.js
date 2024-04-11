import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ChatBox from './components/ChatBox';

function App() {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (userMessage) => {
    const newMessages = [...messages, { text: userMessage, isUser: true }];
    setMessages(newMessages);

    // Simulated chatbot response
    setTimeout(() => {
      const chatbotResponse = 'This is a dummy response from the chatbot.';
      setMessages([...newMessages, { text: chatbotResponse, isUser: false }]);
    }, 500);
  };

  return (
    <ChakraProvider>
      <ChatBox messages={messages} sendMessage={sendMessage} />
    </ChakraProvider>
  );
}

export default App;