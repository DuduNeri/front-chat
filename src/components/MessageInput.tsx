import { useState, useRef } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import { Send as SendIcon } from "lucide-react";

interface Props {
  conversationId: string;
  onMessageSent: (content: string) => void;
  isMobile: boolean;
}

export const MessageInput = ({ conversationId, onMessageSent, isMobile }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    try {
      onMessageSent(trimmed);
      setInputValue("");
      inputRef.current?.focus();
    } catch (err) {
      console.error("❌ Erro ao enviar mensagem:", err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1.5,
        alignItems: "flex-end",
        p: 2,
        background: "linear-gradient(135deg, rgba(15, 20, 40, 0.4) 0%, rgba(25, 30, 50, 0.3) 100%)",
        backdropFilter: "blur(12px)",
        borderRadius: "24px",
        border: "1px solid rgba(0, 180, 255, 0.2)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 150, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        transition: "all 0.3s ease-in-out",
        
        "&:focus-within": {
          borderColor: "rgba(0, 200, 255, 0.4)",
          boxShadow: "0 8px 40px rgba(0, 150, 255, 0.2), 0 4px 16px rgba(0, 200, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          transform: "translateY(-1px)",
        },
      }}
    >
      <TextField
        inputRef={inputRef}
        multiline
        maxRows={4}
        placeholder="Digite sua mensagem..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        fullWidth
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "#f0f2f5",
            backgroundColor: "rgba(30, 35, 60, 0.3)",
            borderRadius: "20px",
            transition: "all 0.3s ease-in-out",
            
            "& fieldset": {
              borderColor: "rgba(0, 180, 255, 0.2)",
              transition: "all 0.3s ease-in-out",
            },
            
            "&:hover fieldset": {
              borderColor: "rgba(0, 200, 255, 0.4)",
            },
            
            "&.Mui-focused": {
              backgroundColor: "rgba(40, 45, 70, 0.4)",
              boxShadow: "0 0 0 2px rgba(0, 200, 255, 0.1)",
              
              "& fieldset": {
                borderColor: "rgba(0, 220, 255, 0.6)",
                borderWidth: "1px",
              },
            },
          },
          
          "& .MuiOutlinedInput-input": {
            fontSize: isMobile ? "0.95rem" : "1.05rem",
            fontWeight: 400,
            padding: "12px 20px",
            "&::placeholder": {
              color: "rgba(0, 200, 255, 0.4)",
              opacity: 1,
              fontWeight: 300,
            },
          },
        }}
      />
      
      <IconButton
        onClick={handleSendMessage}
        disabled={!inputValue.trim()}
        sx={{
          color: inputValue.trim() ? "#00e5ff" : "rgba(0, 200, 255, 0.3)",
          background: inputValue.trim() 
            ? "linear-gradient(135deg, rgba(0, 150, 255, 0.2) 0%, rgba(0, 200, 255, 0.15) 100%)"
            : "rgba(30, 35, 60, 0.3)",
          backdropFilter: "blur(8px)",
          border: inputValue.trim() 
            ? "1px solid rgba(0, 200, 255, 0.4)"
            : "1px solid rgba(0, 200, 255, 0.2)",
          borderRadius: "16px",
          p: 1.5,
          transition: "all 0.3s ease-in-out",
          transform: "scale(1)",
          
          "&:hover": {
            background: inputValue.trim()
              ? "linear-gradient(135deg, rgba(0, 150, 255, 0.3) 0%, rgba(0, 200, 255, 0.25) 100%)"
              : "rgba(40, 45, 70, 0.4)",
            transform: "scale(1.1) translateY(-1px)",
            boxShadow: inputValue.trim()
              ? "0 8px 24px rgba(0, 200, 255, 0.3), 0 4px 12px rgba(0, 200, 255, 0.2)"
              : "none",
          },
          
          "&:active": {
            transform: "scale(1.05) translateY(0)",
          },
        }}
      >
        <SendIcon size={isMobile ? 20 : 22} />
      </IconButton>
    </Box>
  );
};