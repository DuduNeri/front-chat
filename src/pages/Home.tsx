import { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Avatar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  Drawer,
} from '@mui/material';
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  LogOut as LogOutIcon,
  Send as SendIcon,
  Mic as MicIcon,
  Check as CheckIcon,
  Plus as PlusIcon,
  Menu as MenuIcon,
  X as XIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const SidebarContent = () => (
    <Box
      sx={{
        width: isMobile ? '100%' : 100,
        background: 'linear-gradient(180deg, rgba(30, 30, 46, 0.95) 0%, rgba(25, 25, 40, 0.95) 100%)',
        borderRight: isMobile ? 'none' : '1px solid rgba(100, 200, 255, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isMobile ? 'flex-start' : 'center',
        py: isMobile ? 2 : 3,
        px: isMobile ? 2 : 0,
        gap: isMobile ? 1 : 2,
        height: '100%',
        overflowY: 'auto',
      }}
    >
      {isMobile && (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', letterSpacing: 0.5 }}>
            Menu
          </Typography>
          <IconButton
            size="small"
            onClick={() => setSidebarOpen(false)}
            sx={{ color: 'rgba(255, 255, 255, 0.6)', transition: 'all 0.2s', p: 0.5 }}
          >
            <XIcon size={18} />
          </IconButton>
        </Box>
      )}

      <Tooltip title="Perfil" placement="right">
        <IconButton
          sx={{
            width: isMobile ? '100%' : 56,
            height: isMobile ? 44 : 56,
            borderRadius: isMobile ? 12 : '50%',
            background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.15) 0%, rgba(100, 150, 220, 0.1) 100%)',
            border: '1.5px solid rgba(100, 200, 255, 0.4)',
            justifyContent: isMobile ? 'flex-start' : 'center',
            pl: isMobile ? 1.5 : 0,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.25) 0%, rgba(100, 150, 220, 0.2) 100%)',
              borderColor: 'rgba(100, 200, 255, 0.7)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 24px rgba(100, 200, 255, 0.2)',
            },
            p: isMobile ? 1 : 0,
          }}
        >
          <Avatar
            sx={{
              width: isMobile ? 36 : 40,
              height: isMobile ? 36 : 40,
              background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.3), rgba(80, 180, 220, 0.2))',
              fontSize: isMobile ? '0.9rem' : '1rem',
              fontWeight: 700,
              mr: isMobile ? 1.5 : 0,
              color: '#fff',
            }}
          >
            U
          </Avatar>
          {isMobile && (
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)', ml: 1, fontWeight: 600, fontSize: '0.95rem' }}>
              Perfil
            </Typography>
          )}
        </IconButton>
      </Tooltip>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? 1 : 2,
          width: isMobile ? '100%' : 'auto',
        }}
      >
        {[1, 2, 3].map((item) => (
          <Tooltip key={item} title={`Chat ${item}`} placement="right">
            <IconButton
              sx={{
                width: isMobile ? '100%' : 48,
                height: isMobile ? 40 : 48,
                borderRadius: isMobile ? 12 : '50%',
                background: 'rgba(100, 200, 255, 0.08)',
                border: '1px solid rgba(100, 200, 255, 0.2)',
                justifyContent: isMobile ? 'flex-start' : 'center',
                pl: isMobile ? 1.5 : 0,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: 'rgba(100, 200, 255, 0.15)',
                  borderColor: 'rgba(100, 200, 255, 0.5)',
                  transform: 'translateY(-1px)',
                },
                p: isMobile ? 0.75 : 0,
              }}
            >
              <Box
                sx={{
                  width: isMobile ? 10 : 12,
                  height: isMobile ? 10 : 12,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.6), rgba(100, 180, 240, 0.4))',
                  mr: isMobile ? 1.5 : 0,
                  boxShadow: '0 0 12px rgba(100, 200, 255, 0.3)',
                }}
              />
              {isMobile && (
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.85rem', fontWeight: 500 }}>
                  Chat {item}
                </Typography>
              )}
            </IconButton>
          </Tooltip>
        ))}
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? 0.75 : 2,
          width: isMobile ? '100%' : 'auto',
        }}
      >
        <Tooltip title="Criar chat" placement="right">
          <IconButton
            sx={{
              width: isMobile ? '100%' : 'auto',
              height: isMobile ? 40 : 'auto',
              justifyContent: isMobile ? 'flex-start' : 'center',
              pl: isMobile ? 1.5 : 0,
              color: 'rgba(100, 200, 255, 0.7)',
              transition: 'all 0.3s',
              '&:hover': {
                color: 'rgba(100, 200, 255, 1)',
              },
              p: isMobile ? 0.75 : 0,
            }}
          >
            <PlusIcon size={isMobile ? 20 : 24} />
            {isMobile && (
              <Typography sx={{ color: 'rgba(100, 200, 255, 0.8)', ml: 1.5, fontSize: '0.85rem', fontWeight: 500 }}>
                Novo
              </Typography>
            )}
          </IconButton>
        </Tooltip>

        <Tooltip title="Página Inicial" placement="right">
          <IconButton
            sx={{
              width: isMobile ? '100%' : 'auto',
              height: isMobile ? 40 : 'auto',
              justifyContent: isMobile ? 'flex-start' : 'center',
              pl: isMobile ? 1.5 : 0,
              color: 'rgba(150, 150, 180, 0.7)',
              transition: 'all 0.3s',
              '&:hover': {
                color: 'rgba(100, 200, 255, 0.9)',
              },
              p: isMobile ? 0.75 : 0,
            }}
          >
            <HomeIcon size={isMobile ? 20 : 24} />
            {isMobile && (
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', ml: 1.5, fontSize: '0.85rem', fontWeight: 500 }}>
                Home
              </Typography>
            )}
          </IconButton>
        </Tooltip>

        <Tooltip title="Configurações" placement="right">
          <IconButton
            sx={{
              width: isMobile ? '100%' : 'auto',
              height: isMobile ? 40 : 'auto',
              justifyContent: isMobile ? 'flex-start' : 'center',
              pl: isMobile ? 1.5 : 0,
              color: 'rgba(150, 150, 180, 0.7)',
              transition: 'all 0.3s',
              '&:hover': {
                color: 'rgba(100, 200, 255, 0.9)',
              },
              p: isMobile ? 0.75 : 0,
            }}
          >
            <SettingsIcon size={isMobile ? 20 : 24} />
            {isMobile && (
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', ml: 1.5, fontSize: '0.85rem', fontWeight: 500 }}>
                Ajustes
              </Typography>
            )}
          </IconButton>
        </Tooltip>

        <Tooltip title="Sair" placement="right">
          <IconButton
            onClick={() => navigate('/login')}
            sx={{
              width: isMobile ? '100%' : 'auto',
              height: isMobile ? 40 : 'auto',
              justifyContent: isMobile ? 'flex-start' : 'center',
              pl: isMobile ? 1.5 : 0,
              color: 'rgba(220, 120, 120, 0.6)',
              transition: 'all 0.3s',
              '&:hover': {
                color: 'rgba(255, 100, 100, 0.9)',
              },
              p: isMobile ? 0.75 : 0,
            }}
          >
            <LogOutIcon size={isMobile ? 20 : 24} />
            {isMobile && (
              <Typography sx={{ color: 'rgba(255, 100, 100, 0.7)', ml: 1.5, fontSize: '0.85rem', fontWeight: 500 }}>
                Sair
              </Typography>
            )}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        background: 'linear-gradient(135deg, #0a0a15 0%, #1a1a2e 50%, #16213e 100%)',
        overflow: 'hidden',
        flexDirection: isMobile ? 'column' : 'row',
      }}
    >
      {!isMobile && <SidebarContent />}

      {isMobile && (
        <Drawer
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          sx={{
            '& .MuiDrawer-paper': {
              background: 'linear-gradient(180deg, rgba(30, 30, 46, 0.98) 0%, rgba(20, 20, 35, 0.98) 100%)',
              backdropFilter: 'blur(10px)',
              width: '75vw',
              maxWidth: 280,
            },
          }}
        >
          <SidebarContent />
        </Drawer>
      )}

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: { xs: '12px 12px', sm: '16px', md: '24px' },
          gap: { xs: '12px', sm: '16px', md: '20px' },
          maxWidth: '100%',
          minHeight: isMobile ? 'calc(100vh - 60px)' : '100vh',
        }}
      >
        {isMobile && (
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
              <IconButton
                onClick={() => setSidebarOpen(true)}
                sx={{
                  color: 'rgba(100, 200, 255, 0.8)',
                  transition: 'all 0.2s',
                  p: 0.75,
                  '&:hover': {
                    color: 'rgba(100, 200, 255, 1)',
                  },
                }}
              >
                <MenuIcon size={22} />
              </IconButton>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600, fontSize: '0.95rem' }}>
                Chat
              </Typography>
            </Box>
          </Box>
        )}

        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: '10px', sm: '12px', md: '16px' },
            pr: { xs: 0, sm: 0.5, md: 2 },
            '&::-webkit-scrollbar': {
              width: '5px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(100, 200, 255, 0.25)',
              borderRadius: '10px',
              '&:hover': {
                background: 'rgba(100, 200, 255, 0.4)',
              },
            },
          }}
        >
          {messages.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  sx={{
                    color: 'rgba(255, 255, 255, 0.35)',
                    fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.25rem' },
                    fontWeight: 500,
                    letterSpacing: 0.3,
                  }}
                >
                  Comece uma conversa...
                </Typography>
              </Box>
            </Box>
          ) : (
            messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  animation: 'slideIn 0.3s ease-out',
                  px: { xs: 0.5, md: 0 },
                }}
              >
                <Paper
                  sx={{
                    maxWidth: { xs: '88%', sm: '75%', md: '60%' },
                    p: { xs: '10px 13px', sm: '11px 15px', md: '13px 18px' },
                    background:
                      message.sender === 'user'
                        ? 'linear-gradient(135deg, rgba(100, 150, 200, 0.25) 0%, rgba(80, 120, 200, 0.15) 100%)'
                        : 'linear-gradient(135deg, rgba(60, 120, 180, 0.2) 0%, rgba(50, 100, 160, 0.12) 100%)',
                    border: '1px solid rgba(100, 200, 255, 0.25)',
                    borderRadius:
                      message.sender === 'user'
                        ? '16px 16px 3px 16px'
                        : '16px 16px 16px 3px',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
                    position: 'relative',
                    backdropFilter: 'blur(12px)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      boxShadow: '0 8px 24px rgba(100, 200, 255, 0.15)',
                    },
                  }}
                >
                  <Typography
                    sx={{
                      color: '#fff',
                      fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
                      lineHeight: 1.5,
                      wordWrap: 'break-word',
                      fontWeight: 400,
                    }}
                  >
                    {message.text}
                  </Typography>
                  {message.sender === 'user' && (
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 5,
                        right: 8,
                        display: 'flex',
                        gap: 0.5,
                      }}
                    >
                      <CheckIcon size={11} color="rgba(100, 200, 255, 0.5)" />
                    </Box>
                  )}
                </Paper>
              </Box>
            ))
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: { xs: 0.5, md: 1 },
            alignItems: 'flex-end',
            justifyContent: 'center',
            width: '100%',
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
      </Box>

      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(12px);
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
