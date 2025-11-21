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
  const inputRef = useRef<HTMLInputElement>(null); // Para foco automático

  const handleSendMessage = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    try {
      onMessageSent(trimmed);
      setInputValue("");
      inputRef.current?.focus(); // Foco de volta pro input
      console.log(`✅ Mensagem enviada para chat ${conversationId}: "${trimmed}"`); // Log pra debug
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
        gap: 1,
        alignItems: "center",
        p: 1.5,
        background: "rgba(15, 15, 30, 0.7)",
        backdropFilter: "blur(10px)",
        borderRadius: "32px",
        border: "1.5px solid rgba(0, 200, 255, 0.25)",
        boxShadow: "0 4px 12px rgba(0, 200, 255, 0.1)",
      }}
    >
      <TextField
        inputRef={inputRef}
        multiline
        maxRows={3}
        placeholder="Digite sua mensagem..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown} // Mudei pra onKeyDown (melhor que onKeyPress em React)
        fullWidth
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "#fff",
            backgroundColor: "rgba(30, 30, 60, 0.5)",
            borderRadius: "32px",
            "& fieldset": {
              borderColor: "rgba(0, 200, 255, 0.3)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(0, 200, 255, 0.6)",
            },
            "&.Mui-focused": {
              backgroundColor: "rgba(30, 30, 60, 0.7)",
              boxShadow: "0 0 20px rgba(0, 200, 255, 0.2)",
              "& fieldset": {
                borderColor: "rgba(0, 200, 255, 0.8)",
              },
            },
          },
          "& .MuiOutlinedInput-input::placeholder": {
            color: "rgba(0, 200, 255, 0.4)",
            opacity: 1,
          },
        }}
        InputProps={{
          sx: {
            fontSize: isMobile ? "0.9rem" : "1rem", // Ajuste pra mobile
          },
        }}
      />
      <IconButton
        onClick={handleSendMessage}
        disabled={!inputValue.trim()} // Desabilita se vazio
        sx={{
          color: "rgba(0, 200, 255, 0.7)",
          background: "rgba(0, 200, 255, 0.05)",
          "&:hover": {
            color: "#00e5ff",
            background: "rgba(0, 200, 255, 0.15)",
            transform: "scale(1.15)",
            transition: "all 0.2s ease-in-out",
            boxShadow: "0 0 12px rgba(0, 200, 255, 0.5)",
          },
          "&:disabled": {
            color: "rgba(0, 200, 255, 0.3)",
          },
        }}
      >
        <SendIcon size={isMobile ? 18 : 22} />
      </IconButton>
    </Box>
  );
};