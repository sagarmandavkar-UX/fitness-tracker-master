import React, { useState, useRef } from 'react';
import { Box, Typography, TextField, Button, Stack, Paper, Container, Grid, Alert } from '@mui/material';
import emailjs from 'emailjs-com'; 
import '../assets/css/ContactUs.css';
import '../App.css'
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ContactUs = ({ darkMode }) => {
  const formInitialDetails = {
    from_name: '',
    from_email: '',
    subject: '',
    message: ''
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});

  const form = useRef();

  const onFormUpdate = (key, value) => {
    setFormDetails({
      ...formDetails,
      [key]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText('Sending...');

    try {
      const result = await emailjs.sendForm(
        'service_rbtsw68',
        'template_v158ado',
        form.current,
        'hTBYd6aOdPZpStIVU'
      );

      console.log(result.text);
      setStatus({
        success: true,
        message: 'Message sent successfully!'
      });
      setButtonText('Send');
      setFormDetails(formInitialDetails);
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus({
        success: false,
        message: `Failed to send message: ${error.text}`
      });
      setButtonText('Send');
    }
  };

  return (
    <Box sx={{ 
      padding: 4, 
      backgroundColor: darkMode ? 'rgba(18, 18, 18, 0.8)' : 'rgba(248, 249, 250, 0.8)',
      minHeight: 'calc(100vh - 200px)'
    }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          align="center" 
          mb={6}
          sx={{ 
            fontWeight: 700, 
            fontFamily: '"Inter", sans-serif',
            color: '#173F36',
            fontSize: { xs: '2rem', md: '3rem' },
            position: 'relative',
            display: 'inline-block',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '100%',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              height: '4px',
              width: '80px',
              backgroundColor: '#173F36',
              borderRadius: '2px'
            }
          }}
        >
          Contact Us
        </Typography>

        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={6} 
              sx={{ 
                p: 4, 
                borderRadius: '16px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.15)'
                },
                backgroundColor: darkMode ? 'rgba(30,30,30,0.9)' : 'white'
              }}
            >
              <form ref={form} onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    required
                    name="from_name"
                    value={formDetails.from_name}
                    onChange={(e) => onFormUpdate('from_name', e.target.value)}
                    InputProps={{ 
                      style: { 
                        fontFamily: '"Inter", sans-serif', 
                        color: darkMode ? 'white' : 'black' 
                      } 
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#173F36',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#173F36',
                        },
                      },
                    }}
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                    name="from_email"
                    value={formDetails.from_email}
                    onChange={(e) => onFormUpdate('from_email', e.target.value)}
                    InputProps={{ 
                      style: { 
                        fontFamily: '"Inter", sans-serif', 
                        color: darkMode ? 'white' : 'black' 
                      } 
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#173F36',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#173F36',
                        },
                      },
                    }}
                  />
                  <TextField
                    label="Subject"
                    variant="outlined"
                    fullWidth
                    required
                    name="subject"
                    value={formDetails.subject}
                    onChange={(e) => onFormUpdate('subject', e.target.value)}
                    InputProps={{ 
                      style: { 
                        fontFamily: '"Inter", sans-serif', 
                        color: darkMode ? 'white' : 'black' 
                      } 
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#173F36',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#173F36',
                        },
                      },
                    }}
                  />
                  <TextField
                    label="Message"
                    variant="outlined"
                    fullWidth
                    required
                    multiline
                    rows={4}
                    name="message"
                    value={formDetails.message}
                    onChange={(e) => onFormUpdate('message', e.target.value)}
                    InputProps={{ 
                      style: { 
                        fontFamily: '"Inter", sans-serif', 
                        color: darkMode ? 'white' : 'black' 
                      } 
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#173F36',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#173F36',
                        },
                      },
                    }}
                  />
                  <Button 
                    type="submit" 
                    variant="contained" 
                    size="large"
                    endIcon={<SendIcon />}
                    disabled={buttonText !== "Send"}
                    sx={{
                      backgroundColor: '#173F36',
                      color: 'white',
                      fontWeight: 600,
                      padding: '12px 24px',
                      borderRadius: '30px',
                      '&:hover': {
                        backgroundColor: '#101B18',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(220, 20, 20, 0.3)'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {buttonText}
                  </Button>
                  {status.message && (
                    <Alert 
                      severity={status.success ? "success" : "error"}
                      sx={{ mt: 2, fontFamily: '"Inter", sans-serif' }}
                    >
                      {status.message}
                    </Alert>
                  )}
                </Stack>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ pl: { xs: 0, md: 4 } }}>
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600, 
                  fontFamily: '"Inter", sans-serif',
                  color: darkMode ? 'white' : '#333',
                  mb: 3
                }}
              >
                Get In Touch
              </Typography>
              <Typography 
                variant="body1" 
                paragraph
                sx={{ 
                  fontSize: '1.1rem',
                  mb: 4,
                  color: darkMode ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                Have questions about our fitness programs or need personalized advice? 
                Our team of expert trainers and nutritionists are here to help you 
                achieve your fitness goals.
              </Typography>
              <Stack spacing={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EmailIcon sx={{ color: '#173F36', mr: 2, fontSize: 28 }} />
                  <Typography variant="body1" sx={{ fontFamily: '"Inter", sans-serif' }}>
                    svatsal@umich.edu
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOnIcon sx={{ color: '#173F36', mr: 2, fontSize: 28 }} />
                  <Typography variant="body1" sx={{ fontFamily: '"Inter", sans-serif' }}>
                    Ann Arbor, Michigan
                  </Typography>
                </Box>
                {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PhoneIcon sx={{ color: '#173F36', mr: 2, fontSize: 28 }} />
                  <Typography variant="body1" sx={{ fontFamily: '"Inter", sans-serif' }}>
                    +1 (555) 123-4567
                  </Typography>
                </Box> */}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactUs;
