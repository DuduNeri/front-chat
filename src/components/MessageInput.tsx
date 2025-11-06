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
                color: "rgba(100, 200, 255, 0.6)",
                transition: "all 0.2s",
                p: 0.5,
                "&:hover": {
                  color: "rgba(100, 200, 255, 1)",
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
                color: "rgba(100, 200, 255, 0.6)",
                transition: "all 0.2s",
                p: 0.5,
                "&:hover": {
                  color: "rgba(100, 200, 255, 1)",
                },
              }}
            >
              <SendIcon size={isMobile ? 17 : 19} />
            </IconButton>
          ),
        }}
        sx={{
          flex: 1,
          background: "rgba(40, 40, 60, 0.6)",
          borderRadius: "14px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "14px",
            padding: "6px 8px",
            "& fieldset": {
              borderColor: "rgba(100, 200, 255, 0.2)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(100, 200, 255, 0.35)",
            },
          },
          "& .MuiInputBase-input": {
            color: "#fff",
            padding: "8px",
          },
        }}
      />
    </Box>
  );
};
