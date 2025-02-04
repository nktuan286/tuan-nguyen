import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  IconButton,
  CircularProgress,
} from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';

interface TokenPrice {
  currency: string;
  price: number;
  date: string;
}

interface Token {
  symbol: string;
  price: number;
  icon: string;
}

const DELAY_TIME: number = 1500;

function App() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const [fromToken, setFromToken] = useState<string>('');
  const [toToken, setToToken] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [fromTokenError, setFromTokenError] = useState<string>('');
  const [toTokenError, setToTokenError] = useState<string>('');
  const [amountError, setAmountError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://interview.switcheo.com/prices.json');
        const prices: TokenPrice[] = await response.json();
        
        // Filter tokens that have prices and create token objects
        const availableTokens = prices
          .filter(price => price.price > 0)
          .map(price => ({
            symbol: price.currency,
            price: price.price,
            icon: `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${price.currency}.svg`
          }));
        
        setTokens(availableTokens);
        setLoading(false);
      } catch (err) {
        setError('Failed to load token prices');
        setLoading(false);
      }
    };
    
    fetchPrices();
  }, []);

  const handleSwap = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setAmount('');
    setPrice(null);
    setExchangeRate(null);
  };

  const validateAmount = (value: string): string => {
    if (!value) {
      return 'Please enter an amount';
    } else if (isNaN(Number(value)) || Number(value) <= 0) {
      return 'Amount must be greater than 0';
    } else if (Number(value) > 999999999) {
      return 'Amount is too large';
    }
    return '';
  };

  const validateFromToken = (value: string): string => {
    if (!value) {
      return 'Please select source currency';
    }
    if (value === toToken) {
      return 'Source and target currency must be different';
    }
    return '';
  };

  const validateToToken = (value: string): string => {
    if (!value) {
      return 'Please select target currency';
    }
    if (value === fromToken) {
      return 'Source and target currency must be different';
    }
    return '';
  };

  const validateForm = (): boolean => {
    const fromError = validateFromToken(fromToken);
    const toError = validateToToken(toToken);
    const amountErr = validateAmount(amount);

    setFromTokenError(fromError);
    setToTokenError(toError);
    setAmountError(amountErr);

    return !fromError && !toError && !amountErr;
  };

  const handleAmountChange = (value: string) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
      const error = validateAmount(value);
      setAmountError(error);
    }
  };

  const calculateExchangeRate = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, DELAY_TIME));

    const fromPrice = tokens.find(t => t.symbol === fromToken)?.price || 0;
    const toPrice = tokens.find(t => t.symbol === toToken)?.price || 0;
    if (fromPrice && toPrice) {
      const exchangeRate = fromPrice / toPrice;
      const finalPrice = (Number(amount) * exchangeRate).toFixed(6);
      setExchangeRate(exchangeRate);
      setPrice(Number(finalPrice));
    }

    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        mt: { xs: 2, sm: 4 },
        width: { xs: '100%', sm: '500px' },
        px: { xs: 2, sm: 3 }
      }}
    >
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          align="center"
          sx={{ 
            fontSize: { xs: '1.5rem', sm: '2rem' },
            mb: 4
          }}
        >
          Currency Swap
        </Typography>

        <Box sx={{ mb: 3 }}>
          <TextField
            select
            fullWidth
            label="From"
            value={fromToken}
            onChange={(e) => {
              setFromToken(e.target.value);
              const error = validateFromToken(e.target.value);
              setFromTokenError(error);
            }}
            error={!!fromTokenError}
            helperText={fromTokenError}
            slotProps={{
              formHelperText: {
                sx: {
                  marginLeft: 0,
                }
              }
            }}
          >
            {tokens.map((token, index) => (
              <MenuItem key={index} value={token.symbol}>
                <Box display="flex" alignItems="center">
                  <img
                    src={token.icon}
                    alt={token.symbol}
                    style={{ 
                      width: '20px', 
                      height: '20px', 
                      marginRight: '8px',
                      objectFit: 'contain' 
                    }}
                  />
                  {token.symbol}
                </Box>
              </MenuItem>
            ))}
          </TextField>

          <Box display="flex" justifyContent="center" my={{ xs: 1, sm: 2 }}>
            <IconButton onClick={handleSwap} color="primary">
              <SwapVertIcon />
            </IconButton>
          </Box>

          <TextField
            select
            fullWidth
            label="To"
            value={toToken}
            onChange={(e) => {
              setToToken(e.target.value);
              const error = validateToToken(e.target.value);
              setToTokenError(error);
            }}
            error={!!toTokenError}
            helperText={toTokenError}
            slotProps={{
              formHelperText: {
                sx: {
                  marginLeft: 0,
                }
              }
            }}
            sx={{ mb: 2 }}
          >
            {tokens.map((token, index) => (
              <MenuItem key={index} value={token.symbol}>
                <Box display="flex" alignItems="center">
                  <img
                    src={token.icon}
                    alt={token.symbol}
                    style={{ 
                      width: '20px', 
                      height: '20px', 
                      marginRight: '8px',
                      objectFit: 'contain' 
                    }}
                  />
                  {token.symbol}
                </Box>
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Amount"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            error={!!amountError}
            helperText={amountError}
            slotProps={{
              formHelperText: {
                sx: {
                  marginLeft: 0,
                }
              }
            }}
            sx={{ mb: 2 }}
          />

          {error && (
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          {exchangeRate && fromToken && toToken && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              1 {fromToken} = {exchangeRate.toFixed(6)} {toToken}
            </Typography>
          )}

          {amount && exchangeRate && (
            <Typography variant="body1" sx={{ mb: 2 }}>
              You will receive: {price} {toToken}
            </Typography>
          )}

          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              calculateExchangeRate();
            }}
            disabled={isSubmitting}
            sx={{ 
              py: { xs: 1.5, sm: 2 },
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            {isSubmitting ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={16} color="inherit" />
                Swaping...
              </Box>
            ) : (
              'Swap'
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
