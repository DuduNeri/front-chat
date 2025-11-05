import { useState } from "react";
import {  Box,  Paper,  TextField, IconButton, Avatar,Tooltip,Typography,} from "@mui/material";
import { Home as HomeIcon,Settings as SettingsIcon, LogOut as LogOutIcon,Send as SendIcon, Mic as MicIcon, Check as CheckIcon, CircleFadingPlusIcon,} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        background:
          "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: 100,
          background: "rgba(30, 30, 46, 0.8)",
          borderRight: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 3,
          gap: 2,
        }}
      >
        <Tooltip title="Perfil">
          <IconButton
            sx={{
              width: 56,
              height: 56,
              border: "2px solid rgba(100, 200, 255, 0.6)",
              color: "rgba(100, 200, 255, 0.8)",
              "&:hover": {
                color: "rgba(100, 200, 255, 1)",
                borderColor: "rgba(100, 200, 255, 1)",
              },
            }}
          >
            <Avatar
              sx={{
                width: 48,
                height: 48,
                background: "rgba(100, 200, 255, 0.2)",
                fontSize: "1.5rem",
              }}
            >
              U
            </Avatar>
          </IconButton>
        </Tooltip>

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {[1, 2, 3].map((item) => (
            <Tooltip key={item} title={`Chat ${item}`}>
              <IconButton
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(100, 200, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "rgba(255, 255, 255, 0.5)",
                  "&:hover": {
                    background: "rgba(100, 200, 255, 0.2)",
                    color: "rgba(100, 200, 255, 0.8)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: "rgba(100, 200, 255, 0.4)",
                  }}
                />
              </IconButton>
            </Tooltip>
          ))}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Tooltip title="Criar chat">
            <IconButton
              sx={{
                color: "rgba(255, 255, 255, 0.5)",
                "&:hover": {
                  color: "rgba(100, 200, 255, 0.8)",
                },
              }}
            >
              <CircleFadingPlusIcon size={24} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Página Inicial">
            <IconButton
              sx={{
                color: "rgba(255, 255, 255, 0.5)",
                "&:hover": {
                  color: "rgba(100, 200, 255, 0.8)",
                },
              }}
            >
              <HomeIcon size={24} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Configurações">
            <IconButton
              sx={{
                color: "rgba(255, 255, 255, 0.5)",
                "&:hover": {
                  color: "rgba(100, 200, 255, 0.8)",
                },
              }}
            >
              <SettingsIcon size={24} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Sair">
            <IconButton
              onClick={(e) => {
                navigate("/login");
              }}
              sx={{
                color: "rgba(255, 255, 255, 0.5)",
                "&:hover": {
                  color: "rgba(255, 100, 100, 0.8)",
                },
              }}
            >
              <LogOutIcon size={24} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: 4,
          gap: 3,
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            pr: 2,
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(100, 200, 255, 0.3)",
              borderRadius: "10px",
              "&:hover": {
                background: "rgba(100, 200, 255, 0.5)",
              },
            },
          }}
        >
          {messages.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "rgba(255, 255, 255, 0.4)",
                  textAlign: "center",
                }}
              >
                Comece uma conversa...
              </Typography>
            </Box>
          ) : (
            messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: "flex",
                  justifyContent:
                    message.sender === "user" ? "flex-end" : "flex-start",
                  animation: "slideIn 0.3s ease-in-out",
                }}
              >
                <Paper
                  sx={{
                    maxWidth: "60%",
                    p: "14px 20px",
                    background:
                      message.sender === "user"
                        ? "linear-gradient(135deg, rgba(180, 100, 200, 0.4) 0%, rgba(100, 150, 200, 0.3) 100%)"
                        : "linear-gradient(135deg, rgba(100, 150, 200, 0.4) 0%, rgba(100, 100, 150, 0.3) 100%)",
                    border: "1px solid rgba(100, 200, 255, 0.3)",
                    borderRadius:
                      message.sender === "user"
                        ? "20px 20px 4px 20px"
                        : "20px 20px 20px 4px",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
                    position: "relative",
                    right: "50px",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: "0.95rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {message.text}
                  </Typography>
                  {message.sender === "user" && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 8,
                        right: 12,
                        display: "flex",
                        gap: 0.5,
                      }}
                    >
                      <CheckIcon size={14} color="rgba(100, 200, 255, 0.6)" />
                    </Box>
                  )}
                </Paper>
              </Box>
            ))
          )}
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            multiline
            maxRows={4}
            placeholder="Digite sua mensagem..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <IconButton
                  size="small"
                  sx={{
                    mr: 1,
                    color: "rgba(100, 200, 255, 0.6)",
                    "&:hover": {
                      color: "rgba(100, 200, 255, 1)",
                    },
                  }}
                >
                  <MicIcon size={20} />
                </IconButton>
              ),
              endAdornment: (
                <IconButton
                  size="small"
                  onClick={handleSendMessage}
                  sx={{
                    ml: 1,
                    color: "rgba(100, 200, 255, 0.6)",
                    "&:hover": {
                      color: "rgba(100, 200, 255, 1)",
                    },
                  }}
                >
                  <SendIcon size={20} />
                </IconButton>
              ),
            }}
            sx={{
              width: "50%",
              "& .MuiOutlinedInput-root": {
                color: "#fff",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderRadius: "24px",
                border: "1px solid rgba(100, 200, 255, 0.3)",
                transition: "all 0.3s ease",
                "& fieldset": {
                  borderColor: "rgba(100, 200, 255, 0.3)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(100, 200, 255, 0.6)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "rgba(100, 200, 255, 1)",
                },
              },
              "& .MuiOutlinedInput-input": {
                padding: "12px 16px",
                fontSize: "0.95rem",
              },
              "& .MuiOutlinedInput-input::placeholder": {
                color: "rgba(255, 255, 255, 0.4)",
                opacity: 1,
              },
            }}
          />
        </Box>
      </Box>

      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default Home;
