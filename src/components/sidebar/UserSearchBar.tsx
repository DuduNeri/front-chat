import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  Paper,
  ListItemButton,
  ListItemText,
  Avatar,
  Fade,
  ClickAwayListener,
  Typography,
  Tooltip
} from "@mui/material";
import { Search } from "lucide-react";
import { listAllUsers } from "../../api/chat/listUsers";

interface Props {
  value: string;
  onChange: (value: string) => void;
  token: string;
}

export function UsersearchBar({ value, onChange, token }: Props) {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);

  useEffect(() => {
    async function loadUsers() {
      const data = await listAllUsers(token);
      setUsers(data);
    }
    loadUsers();
  }, [token]);

  useEffect(() => {
    if (!value.trim()) {
      setFiltered([]);
      return;
    }

    const result = users.filter((u) =>
      u.name.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(result);
  }, [value, users]);

  const handleClose = () => {
    setOpen(false);
    onChange("");
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box sx={{ position: "relative" }}>
        {/* ✅ Ícone da lupa com neon suave */}
        <Tooltip
          title={
            <Typography
              sx={{
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#fff",
                textShadow: "0 1px 3px rgba(0,0,0,0.5)",
              }}
            >
              Buscar usuário existente
            </Typography>
          }
          arrow
          placement="right"
          componentsProps={{
            tooltip: {
              sx: {
                 background: "rgba(100,100,100,0.9)", // fundo azul suave
                backdropFilter: "blur(6px)", // efeito de vidro fosco
                borderRadius: 2,
                padding: "6px 12px",
              },
            }
          }}
        >
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              backdropFilter: "blur(6px)",
              borderRadius: "12px",
              padding: "10px",
              transition: "0.25s",
              border: "1px solid rgba(120,200,255,0.25)",
              boxShadow: "0 0 8px rgba(100,150,255,0.25)",
              "&:hover": {
                transform: "scale(1.08)",
                boxShadow: "0 0 10px rgba(120,200,255,0.45)",
              },
              "& svg": { strokeWidth: 2 },
            }}
          >
            <Search />
          </IconButton>
        </Tooltip>

        {/* ✅ Campo aparece suavemente */}
        <Fade in={open}>
          <Box
            sx={{
              position: "fixed", // ✅ agora fica acima de toda a página
              top: "668px", // ✅ ajuste a posição vertical (da barra)
              left: "110px", // ✅ abre logo à direita da sidebar (100px)
              zIndex: 9999, // ✅ garante que fica na frente da Home
            }}
          >
            <TextField
              autoFocus
              size="small"
              placeholder="Buscar usuário..."
              value={value}
              onChange={(e) => onChange(e.target.value)}
              sx={{
                width: 260,
                background: "rgba(255,255,255,0.22)",
                backdropFilter: "blur(10px)",
                borderRadius: 3,
                boxShadow: "0px 6px 18px rgba(0,0,0,0.25)",
                input: {
                  color: "#fff",
                  fontWeight: 500,
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "2px solid rgba(255,255,255,0.35)",
                  },
                  "&:hover fieldset": {
                    border: "2px solid rgba(255,255,255,0.55)",
                  },
                  "&.Mui-focused fieldset": {
                    border: "2px solid #fff",
                  },
                },
              }}
            />

            {filtered.length > 0 && (
              <Paper
                sx={{
                  width: 260,
                  mt: 1,
                  borderRadius: 3,
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0px 8px 24px rgba(0,0,0,0.35)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                {filtered.map((u) => (
                  <ListItemButton
                    key={u.id}
                    sx={{
                      transition: "0.2s",
                      "&:hover": {
                        background: "rgba(255,255,255,0.18)",
                      },
                    }}
                  >
                    <Avatar
                      src={u.avatar}
                      sx={{
                        width: 36,
                        height: 36,
                        mr: 1.2,
                        border: "2px solid rgba(255,255,255,0.4)",
                      }}
                    />
                    <ListItemText
                      primary={
                        <Typography sx={{ color: "#fff", fontWeight: 600 }}>
                          {u.name}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          sx={{
                            color: "rgba(255,255,255,0.7)",
                            fontSize: "0.75rem",
                          }}
                        >
                          @{u.email}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                ))}
              </Paper>
            )}
          </Box>
        </Fade>
      </Box>
    </ClickAwayListener>
  );
}
