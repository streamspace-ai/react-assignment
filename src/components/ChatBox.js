import React, { useState, useRef, useEffect } from 'react';
import { VStack, Box, Flex, Input, Button, Text, Img } from '@chakra-ui/react';
import MessageBubble from './MessageBubble';
import botAvatar from '../assets/8649607.png';

const ChatBox = ({ messages, sendMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef();
  const chatBoxRef = useRef();
  const [showDefaultMessage, setShowDefaultMessage] = useState(true);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') {
      return;
    }

    sendMessage(inputValue);
    setInputValue('');

    if (showDefaultMessage) {
      setShowDefaultMessage(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {

    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;


    if (messages.length > 0) {
      inputRef.current.focus();
    }
  }, [messages]);

  return (
    <VStack>
      <Box display="flex" alignItems="center" justifyContent="center" mt={6}>
        <Box align='center'>
          <Img src={botAvatar} alt='bot-avatar' width={['15%', '7%']} />
          <Text fontWeight='600' fontSize={['lg', '20px']} ml={2}>Ask OpenAI ChatBot!</Text>
        </Box>
      </Box>

      <VStack
        w={['95%', '80%', '60%', '40%']}
        h="80vh"
        mx="auto"
        mt="2vh"
        p={4}
        bg="#FCF9F9"
        borderRadius="md"
        position="relative"
        overflowY="auto"
        boxShadow="0 5px 20px 0px rgba(0, 0, 0, 0.5)"
        ref={chatBoxRef}
      >
        {/* Default bot message */}
        {showDefaultMessage && (
          <MessageBubble
            isUser={false}
            text="Hi! I am OpenAI ChatBot. How can I help you?"
            timestamp={getCurrentTime()}
          />
        )}

        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            isUser={message.isUser}
            text={message.text}
            timestamp={getCurrentTime()}
          />
        ))}
        
        {/* Empty space after the chatbox ends */}
        <Box flex="1" />

        <Flex align="center" mt={4} width='100%'>
          <Input
            
            backgroundColor='#ffffff'
            ref={inputRef}
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button ml={2} colorScheme="teal" onClick={handleSendMessage}>
            Send
          </Button>
        </Flex>
      </VStack>
    </VStack>
  );
};

export default ChatBox;