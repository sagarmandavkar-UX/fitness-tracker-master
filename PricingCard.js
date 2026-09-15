import React from "react";
import { Box, Typography, Button, Paper, List, ListItem, ListItemIcon, ListItemText, Chip, Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "../assets/css/PricingCard.css";

const PricingCard = ({
  title,
  price,
  monthlyPrice = "$0",
  annualPrice = "$0",
  storage,
  users,
  sendUp,
  isMonthly,
  handleGetStarted,
  isLoggedIn
}) => {
  const monthlyPriceNumber = parseFloat(monthlyPrice.slice(1));
  const annualPriceNumber = parseFloat(annualPrice.slice(1));
  const originalAnnualPrice = (monthlyPriceNumber * 12).toFixed(2);
  const discountPercentage = (
    (1 - annualPriceNumber / originalAnnualPrice) *
    100
  ).toFixed(2);

  const handleSubscribe = () => {
    let paymentLink;
    if (title === "Premium Plan") {
      paymentLink = isMonthly
        ? "https://buy.stripe.com/00gbMycltcV69pu8wy"
        : "https://buy.stripe.com/3csdUG99hdZa0SYaEH";
      window.location.href = paymentLink;
    } else {
      handleGetStarted();
    }
  };

  const buttonText = title === "Basic Plan" ? "Get Started for Free" : "Subscribe Now";
  const features = [storage, users, sendUp];

  return (
    <Paper 
      elevation={4} 
      sx={{ 
        maxWidth: 380,
        width: '100%',
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        border: title === "Premium Plan" ? '2px solid #173F36' : 'none',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 28px rgba(0, 0, 0, 0.15)'
        }
      }}
    >
      <Box sx={{ 
        bgcolor: title === "Premium Plan" ? '#173F36' : 'transparent',
        color: title === "Premium Plan" ? 'white' : 'inherit',
        py: 4,
        px: 4,
        textAlign: 'center'
      }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {title}
        </Typography>
        <Typography variant="h3" fontWeight={800} sx={{ mt: 3 }}>
          {price}
          <Typography component="span" variant="subtitle1" sx={{ ml: 1 }}>
            /{isMonthly ? 'month' : 'year'}
          </Typography>
        </Typography>
        {title === "Premium Plan" && !isMonthly && (
          <Chip 
            label={`Save ${discountPercentage}%`} 
            color="secondary" 
            size="small"
            sx={{ 
              mt: 2,
              bgcolor: 'white', 
              color: '#173F36', 
              fontWeight: 600,
              '& .MuiChip-label': { px: 1 }
            }}
          />
        )}
      </Box>
      
      <Divider />
      
      <Box sx={{ px: 3, py: 4 }}>
        <List sx={{ mb: 3 }}>
          {features.map((feature, index) => (
            <ListItem key={index} sx={{ py: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CheckCircleIcon sx={{ color: '#173F36' }} />
              </ListItemIcon>
              <ListItemText 
                primary={feature} 
                primaryTypographyProps={{ 
                  fontSize: '0.95rem', 
                  lineHeight: 1.5 
                }} 
              />
            </ListItem>
          ))}
        </List>
        
        {title === "Premium Plan" && isMonthly && (
          <Box sx={{ 
            bgcolor: 'rgba(220, 20, 20, 0.08)', 
            borderRadius: 2, 
            p: 2.5,
            mb: 4,
            textAlign: 'center'
          }}>
            <Typography variant="body2" color="#173F36" fontWeight={500}>
              Launch Offer: Sign up by August 15 to get our introductory rate!
              Prices increase to $2.99/month after this date.
            </Typography>
          </Box>
        )}
        
        <Button 
          variant="contained" 
          fullWidth 
          onClick={handleSubscribe}
          sx={{
            bgcolor: title === "Premium Plan" ? '#173F36' : 'white',
            color: title === "Premium Plan" ? 'white' : '#173F36',
            border: '2px solid #173F36',
            borderRadius: '30px',
            py: 1.8,
            fontWeight: 600,
            fontSize: '1rem',
            '&:hover': {
              bgcolor: title === "Premium Plan" ? 'white' : '#173F36',
              color: title === "Premium Plan" ? '#173F36' : 'white',
              boxShadow: '0 4px 12px rgba(220, 20, 20, 0.2)',
              transform: 'translateY(-2px)'
            },
            transition: 'all 0.2s ease'
          }}
        >
          {buttonText}
        </Button>
      </Box>
    </Paper>
  );
};

export default PricingCard;