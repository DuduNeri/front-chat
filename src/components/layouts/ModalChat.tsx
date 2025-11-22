import { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Fade,
  Backdrop,
  Chip,
  Avatar,
  List,
  ListItemButton,
  ListItemText,
  InputAdornment,
} from "@mui/material";
import { X as CloseIcon, Search } from "lucide-react";
import { listAllUsers } from "../../api/chat/listUsers";
import AddReactionIcon from "@mui/icons-material/AddReaction";

interface User {
  id: string;
  name: string;
  email: string;
}

interface CreateRoomModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; participants: string[] }) => void;
}

export const CreateRoomModal = ({
  open,
  onClose,
  onSubmit,
}: CreateRoomModalProps) => {
  const [title, setTitle] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const isDisabled = title.trim().length === 0;

  useEffect(() => {
    if (open) {
      listAllUsers().then(setUsers);
    }
  }, [open]);

  const toggleUser = (user: User) => {
    const exists = selectedUsers.some((u) => u.id === user.id);

    setSelectedUsers(
      exists
        ? selectedUsers.filter((u) => u.id !== user.id)
        : [...selectedUsers, user]
    );
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("O nome da sala é obrigatório!");
      return;
    }
    if (!title || title.trim().length > 30) {
      alert("O título deve ter no máximo 30 caracteres");
      return;
    }

    onSubmit({
      title,
      participants: selectedUsers.map((u) => u.id),
    });

    setTitle("");
    setSelectedUsers([]);
    setSearch("");
    onClose();
  };

  const refresh = () => {
    window.location.reload();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 300 } }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "95%",
            maxWidth: 520,
            background: "linear-gradient(145deg, #0b0b11, #121222, #1a1a33)",
            borderRadius: "22px",
            p: 4,
            boxShadow: "0 0 35px rgba(0,0,0,0.65)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(18px)",
            animation: "modalBounce .35s ease",
            "@keyframes modalBounce": {
              from: { transform: "translate(-50%, -48%) scale(0.97)" },
              to: { transform: "translate(-50%, -50%) scale(1)" },
            },
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 3,
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#80e9ff",
                fontWeight: 700,
                letterSpacing: 0.5,
                textShadow: "0 0 8px rgba(100, 200, 255, 0.4)",
              }}
            >
              Criar Novo Chat
            </Typography>

            <IconButton
              onClick={onClose}
              sx={{
                color: "#aaa",
                transition: "0.25s",
                "&:hover": {
                  color: "#fff",
                  transform: "rotate(90deg)",
                },
              }}
            >
              <CloseIcon size={22} />
            </IconButton>
          </Box>

          {/* INPUT NOME */}
          <TextField
            label="Nome do Chat"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            InputLabelProps={{ style: { color: "#5ecbff" } }} // azul neon suave
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                color: "#c9f3ff",
                backgroundColor: "rgba(0, 153, 255, 0.06)", // fundo leve azulado
                borderRadius: "10px",
                transition: "0.2s ease",

                "& fieldset": {
                  borderColor: "rgba(0, 195, 255, 0.35)", // borda base neon
                  boxShadow: "0 0 6px rgba(0, 195, 255, 0.25)", // leve glow
                },

                "&:hover fieldset": {
                  borderColor: "#00e1ff",
                  boxShadow: "0 0 10px #00e1ff",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#00ffff",
                  boxShadow: "0 0 12px #00ffff", // glow forte no foco
                },
              },
            }}
          />

          {/* BUSCA */}
          <TextField
            placeholder="Buscar usuários..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            InputProps={{
              style: { color: "#c9f3ff" }, // texto com azul claro
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} color="#5ecbff" /> {/* ícone azul neon */}
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "rgba(0, 153, 255, 0.06)", // fundo levemente azulado
                borderRadius: "10px",
                transition: "0.25s ease",

                "& fieldset": {
                  borderColor: "rgba(0, 195, 255, 0.35)", // borda base neon
                  boxShadow: "0 0 6px rgba(0, 195, 255, 0.25)",
                },

                "&:hover fieldset": {
                  borderColor: "#00e1ff",
                  boxShadow: "0 0 10px #00e1ff",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#00ffff",
                  boxShadow: "0 0 12px #00ffff",
                },
              },
            }}
          />

          <Typography
            sx={{
              fontFamily: "inherit",
              color: "#cfcfcf",
              display: "flex",
              alignItems: "center",
              mb: 1,
              fontSize: "14px",
            }}
          >
            Clique para adicionar usuários ao chat
            <AddReactionIcon sx={{ ml: 1, color: "#80e9ff" }} />
          </Typography>

          {/* LISTA USERS */}
          <List
            sx={{
              maxHeight: 240,
              overflowY: "auto",
              pr: 1,
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "rgba(255,255,255,0.15)",
                borderRadius: "6px",
              },
            }}
          >
            {filteredUsers.map((u) => (
              <ListItemButton
                key={u.id}
                onClick={() => toggleUser(u)}
                sx={{
                  borderRadius: "12px",
                  mb: 1,
                  backgroundColor: selectedUsers.some((s) => s.id === u.id)
                    ? "rgba(120,220,255,0.12)"
                    : "transparent",
                  transition: "0.25s",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.08)",
                  },
                }}
              >
                <Avatar
                  sx={{
                    mr: 2,
                    bgcolor: "#1e1e2e",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                  }}
                >
                  {u.name?.[0]?.toUpperCase() || "U"}
                </Avatar>
                <ListItemText
                  primary={u.name}
                  secondary={u.email}
                  primaryTypographyProps={{
                    style: { color: "#fff", fontWeight: 500 },
                  }}
                  secondaryTypographyProps={{
                    style: { color: "#b3b3b3", fontSize: "13px" },
                  }}
                />
              </ListItemButton>
            ))}
          </List>

          {/* TEXTO OBRIGATÓRIO */}
          <Typography
            variant="h5"
            sx={{
              color: "#ff8787",
              fontSize: "15px",
              opacity: isDisabled ? 1 : 0.5,
              mt: 1,
              userSelect: "none",
            }}
          >
            🔒 O nome da sala é obrigatório
          </Typography>

          {/* CHIPS */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              mt: 2,
            }}
          >
            {selectedUsers.map((u) => (
              <Chip
                key={u.id}
                label={u.name}
                onDelete={() => toggleUser(u)}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.12)",
                  color: "#fff",
                  borderRadius: "8px",
                  "& .MuiChip-deleteIcon": { color: "#ccc" },
                }}
              />
            ))}
          </Box>

          {/* BOTÕES */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 3,
              gap: 1.5,
            }}
          >
            {/* Cancelar */}
            <Button
              onClick={onClose}
              sx={{
                borderColor: "rgba(255,255,255,0.25)",
                color: "rgba(224, 99, 99, 0.85)",
                borderRadius: "10px",
                px: 7,
                py: 1,
                fontWeight: 500,
                letterSpacing: 0.4,
                background: "rgba(255,255,255,0.06)",
                transition: "0.25s ease",
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.6)",
                  background: "rgba(255,255,255,0.12)",
                  color: "#ff8080",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Cancelar
            </Button>

            {/* Criar sala */}
            <Button
              disabled={isDisabled}
              onClick={() => {
                handleSubmit();
                refresh();
              }}
              sx={{
                opacity: isDisabled ? 0.5 : 1,
                cursor: isDisabled ? "not-allowed" : "pointer",
                color: "#80e9ff",
                borderRadius: "10px",
                px: 7,
                py: 1,
                fontWeight: 600,
                letterSpacing: 0.4,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.25)",
                transition: "0.25s ease",
                "&:hover": !isDisabled
                  ? {
                      borderColor: "rgba(120,220,255,0.7)",
                      background: "rgba(255,255,255,0.12)",
                      color: "#b1f3ff",
                      transform: "translateY(-2px)",
                      boxShadow: "0 0 12px rgba(120,200,255,0.25)",
                    }
                  : undefined,
              }}
            >
              Criar sala
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
