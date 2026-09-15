import React, { useState, useCallback, useEffect, useRef } from 'react';
import { 
  Box, Typography, Paper, TextField, Button, CircularProgress, Grid, 
  Card, CardContent, CardMedia, Avatar
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SendIcon from '@mui/icons-material/Send';
import LoopIcon from '@mui/icons-material/Loop';
import axios from 'axios';
import '../assets/css/ChatPage.css';
import PageTitle from './PageTitle';

const dietImage = 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';
const exerciseImage = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';
const runningImage = 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';

const ChatPage = ({ darkMode }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCards, setShowCards] = useState(true);

  // Pull OpenAI key from .env
  const [apiKey] = useState(process.env.REACT_APP_OPEN_AI_API_KEY);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatMessage = (text) => {
    return (
      <Box sx={{ 
        whiteSpace: 'pre-wrap',
        fontSize: '15px',
        lineHeight: '1.6',
        p: 0.5,
        '& p': { margin: '0.5em 0' },
        '& ul, & ol': { paddingLeft: '20px' }
      }}>
        {text}
      </Box>
    );
  };

  const handleSendMessage = useCallback(
    async (promptMessage = message) => {
      if (!promptMessage.trim()) return;

      // Add user's message to chat
      const newMessage = { text: promptMessage, sender: 'user' };
      setMessages((prev) => [...prev, newMessage]);
      setMessage('');
      setIsLoading(true);
      setShowCards(false);

      try {
        const prompt = `
          You are a fitness AI bot with over 50 years of training and coaching experience in the health and fitness industry. 
          Provide a comprehensive and detailed response to the following user query: "${promptMessage}"
          
          Format your response in a clean, readable way:
          - Use simple formatting with line breaks and bullet points
          - For lists, use bullet points (•)
          - Use asterisks to indicate emphasis (*important point*)
          - Keep the response straightforward and easy to read
        `;

        console.log("Sending request to OpenAI API...");

        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-4', // or 'gpt-3.5-turbo' if desired
            messages: [
              {
                role: 'system',
                content: 'You are a highly experienced fitness coach providing detailed and comprehensive fitness advice.'
              },
              { role: 'user', content: prompt }
            ],
            max_tokens: 2000,
            n: 1,
            stop: null,
            temperature: 0.7,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
            },
          }
        );

        const botReply = response.data.choices[0]?.message.content?.trim() || '';
        console.log("OpenAI API responded successfully:", botReply);

        const botMessage = { text: botReply, sender: 'bot' };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error('Error in OpenAI API request:', error);
        const errorMessage = {
          text: 'Sorry, something went wrong. Please try again later.',
          sender: 'bot'
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    },
    [message, apiKey]
  );

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startNewConversation = () => {
    setMessages([]);
    setShowCards(true);
  };

  useEffect(() => {
    if (messages.length === 0) {
      setShowCards(true);
    }
  }, [messages]);

  const suggestionCards = [
    {
      title: 'Build Muscle',
      text: 'What exercises should I do to build muscle as a beginner?',
      icon: <FitnessCenterIcon />,
      image: exerciseImage
    },
    {
      title: 'Weight Loss Diet',
      text: 'Can you create a weekly meal plan for weight loss?',
      icon: <RestaurantIcon />,
      image: dietImage
    },
    {
      title: 'Running Performance',
      text: 'How can I improve my 5K running time?',
      icon: <DirectionsRunIcon />,
      image: runningImage
    }
  ];

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 100px)',
        p: { xs: 2, md: 4 },
        backgroundColor: darkMode ? '#121212' : '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <PageTitle title="Fitness Coach AI" />

      <Button
        variant="contained"
        startIcon={<LoopIcon />}
        onClick={startNewConversation}
        sx={{
          mb: 4,
          backgroundColor: '#173F36',
          fontWeight: 600,
          borderRadius: '25px',
          padding: '8px 20px',
          '&:hover': {
            backgroundColor: '#101B18',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(220, 20, 20, 0.3)'
          },
          transition: 'all 0.2s ease'
        }}
      >
        Start New Conversation
      </Button>

      <Box sx={{ width: '100%', maxWidth: '1000px', mb: 4 }}>
        {showCards && (
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {suggestionCards.map((card, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    borderTop: '4px solid #173F36',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)'
                    }
                  }}
                  className="suggestion-card-animation"
                  onClick={() => handleSendMessage(card.text)}
                >
                  <CardMedia
                    component="img"
                    height="160"
                    image={card.image}
                    alt={card.title}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box sx={{ color: '#173F36', mr: 1 }}>{card.icon}</Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {card.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {card.text}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Paper
          elevation={3}
          sx={{
            p: { xs: 1, sm: 2 },
            height: '60vh',
            overflow: 'auto',
            borderRadius: '12px',
            backgroundColor: darkMode ? '#1e1e1e' : '#fff',
            border: '1px solid rgba(220, 20, 20, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
          }}
        >
          {messages.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                opacity: 0.7,
                padding: 3
              }}
            >
              <FitnessCenterIcon sx={{ fontSize: 60, color: '#173F36', mb: 2 }} />
              <Typography variant="h6" color="textSecondary" sx={{ textAlign: 'center' }}>
                Ask anything about fitness, nutrition, or training!
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1, textAlign: 'center' }}>
                Get personalized workouts, diet plans, and fitness advice tailored just for you.
              </Typography>
            </Box>
          ) : (
            messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2,
                  mx: { xs: 1, sm: 2 },
                  mt: index === 0 ? 2 : 0
                }}
                className={
                  msg.sender === 'user'
                    ? 'user-message-animation'
                    : 'bot-message-animation'
                }
              >
                {msg.sender === 'bot' && (
                  <Avatar
                    sx={{
                      bgcolor: '#173F36',
                      width: 40,
                      height: 40,
                      mr: 1,
                      display: { xs: 'none', sm: 'flex' },
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    <FitnessCenterIcon />
                  </Avatar>
                )}

                <Box
                  sx={{
                    maxWidth: { xs: '85%', md: '80%' },
                    p: { xs: 1.5, sm: 2 },
                    borderRadius:
                      msg.sender === 'user'
                        ? '18px 18px 4px 18px'
                        : '18px 18px 18px 4px',
                    backgroundColor:
                      msg.sender === 'user'
                        ? 'rgba(220, 20, 20, 0.9)'
                        : darkMode
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(248, 248, 248, 0.9)',
                    color:
                      msg.sender === 'user'
                        ? '#fff'
                        : darkMode
                        ? '#e0e0e0'
                        : 'inherit',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    border:
                      msg.sender === 'user'
                        ? 'none'
                        : '1px solid rgba(220, 20, 20, 0.1)'
                  }}
                >
                  {formatMessage(msg.text)}
                </Box>

                {msg.sender === 'user' && (
                  <Avatar
                    sx={{
                      bgcolor: '#101B18',
                      width: 40,
                      height: 40,
                      ml: 1,
                      display: { xs: 'none', sm: 'flex' },
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    <Typography>U</Typography>
                  </Avatar>
                )}
              </Box>
            ))
          )}

          {isLoading && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
                mx: { xs: 1, sm: 2 },
                borderRadius: '18px 18px 18px 4px',
                backgroundColor: darkMode
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(248, 248, 248, 0.9)',
                alignSelf: 'flex-start',
                maxWidth: { xs: '85%', md: '80%' },
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(220, 20, 20, 0.1)'
              }}
              className="processing-animation"
            >
              <CircularProgress size={20} sx={{ color: '#173F36', mr: 2 }} />
              <Typography>Processing your fitness request...</Typography>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Paper>

        <Box
          component="form"
          sx={{
            mt: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Ask about workouts, nutrition, or fitness goals..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            multiline
            maxRows={3}
            sx={{
              backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#fff',
              borderRadius: '30px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '30px',
                padding: '10px 16px',
                '& fieldset': {
                  borderColor: 'rgba(220, 20, 20, 0.3)',
                  borderRadius: '30px'
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(220, 20, 20, 0.5)'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#173F36'
                }
              },
              '& .MuiInputBase-input': {
                fontSize: '15px'
              },
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)'
            }}
          />
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSendMessage}
            disabled={isLoading || !message.trim()}
            sx={{
              height: 54,
              minWidth: '100px',
              borderRadius: '30px',
              backgroundColor: '#173F36',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#101B18',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(220, 20, 20, 0.3)'
              },
              '&.Mui-disabled': {
                backgroundColor: 'rgba(220, 20, 20, 0.3)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
