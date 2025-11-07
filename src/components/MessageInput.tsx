import { Box, TextField, IconButton } from "@mui/material";
import { Mic as MicIcon, Send as SendIcon } from "lucide-react";

interface Props {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  isMobile: boolean;
}

export const MessageInput = ({
  inputValue,
  setInputValue,
  handleSendMessage,
  handleKeyPress,
  isMobile,
}: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: { xs: 0.5, md: 1 },
        alignItems: "flex-end",
        justifyContent: "center",
        width: "100%",
        flexShrink: 0,
      }}
    >
    <TextField
            multiline
            maxRows={3}
            placeholder="Mensagem..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            fullWidth={isMobile}
            InputProps={{
              startAdornment: (
                <IconButton
                  size="small"
                  sx={{
                    mr: 0.3,
                    color: 'rgba(100, 200, 255, 0.6)',
                    transition: 'all 0.2s',
                    p: 0.5,
                    '&:hover': {
                      color: 'rgba(100, 200, 255, 1)',
                    },
                  }}
                >
                  <MicIcon size={isMobile ? 16 : 18} />
                </IconButton>
              ),
              endAdornment: (
                <IconButton
                  size="small"
                  onClick={handleSendMessage}
                  sx={{
                    ml: 0.3,
                    color: 'rgba(100, 200, 255, 0.6)',
                    transition: 'all 0.2s',
                    p: 0.5,
                    '&:hover': {
                      color: 'rgba(100, 200, 255, 1)',
                    },
                  }}
                >
                  <SendIcon size={isMobile ? 16 : 18} />
                </IconButton>
              ),
            }}
            sx={{
              width: { xs: '100%', sm: '90%', md: '50%' },
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                backgroundColor: 'rgba(50, 50, 80, 0.4)',
                borderRadius: '24px',
                border: '1.5px solid rgba(100, 200, 255, 0.25)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '& fieldset': {
                  borderColor: 'rgba(100, 200, 255, 0.25)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(100, 200, 255, 0.4)',
                },
                '&.Mui-focused': {
                  backgroundColor: 'rgba(50, 50, 80, 0.6)',
                  boxShadow: '0 0 24px rgba(100, 200, 255, 0.15)',
                  '& fieldset': {
                    borderColor: 'rgba(100, 200, 255, 0.7)',
                  },
                },
              },
              '& .MuiOutlinedInput-input': {
                padding: { xs: '9px 12px', md: '11px 14px' },
                fontSize: { xs: '0.85rem', md: '0.95rem' },
              },
              '& .MuiOutlinedInput-input::placeholder': {
                color: 'rgba(255, 255, 255, 0.35)',
                opacity: 1,
              },
            }}
          />
    </Box>
  );
};
