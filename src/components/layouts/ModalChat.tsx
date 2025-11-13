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

export const CreateRoomModal = ({ open, onClose, onSubmit }: CreateRoomModalProps) => {
  const [title, setTitle] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (open && token) {
      listAllUsers(token).then(setUsers);
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
    onSubmit({
      title,
      participants: selectedUsers.map((u) => u.id),
    });

    setTitle("");
    setSelectedUsers([]);
    setSearch("");
    onClose();
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
            maxWidth: 480,
            bgcolor: "rgba(18, 18, 18, 0.92)",
            backdropFilter: "blur(14px)",
            borderRadius: "18px",
            p: 4,
            boxShadow: 10,
            border: "1px solid rgba(255,255,255,0.08)",
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
            <Typography variant="h5" sx={{ color: "#fff", fontWeight: 600 }}>
              Criar Nova Sala
            </Typography>

            <IconButton onClick={onClose}>
              <CloseIcon color="#ccc" size={22} />
            </IconButton>
          </Box>

          {/* NOME DA SALA */}
          <TextField
            label="Nome da Sala"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            InputLabelProps={{ style: { color: "#aaa" } }}
            inputProps={{ style: { color: "#fff" } }}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#555" },
                "&:hover fieldset": { borderColor: "#888" },
              },
            }}
          />

          {/* PARTICIPANTES */}
          <Typography sx={{ mb: 1, color: "#ddd", fontSize: 15 }}>
            Adicionar participantes
          </Typography>

          {/* Busca */}
          <TextField
            placeholder="Buscar usuário…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            InputLabelProps={{ style: { color: "#aaa" } }}
            inputProps={{ style: { color: "#fff" } }}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#555" },
                "&:hover fieldset": { borderColor: "#888" },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} color="#999" />
                </InputAdornment>
              ),
            }}
          />

          {/* Chips de selecionados */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
            {selectedUsers.map((user) => (
              <Chip
                key={user.id}
                label={user.name}
                onDelete={() => toggleUser(user)}
                avatar={<Avatar>{user.name[0]}</Avatar>}
                sx={{
                  bgcolor: "rgba(255,255,255,0.12)",
                  color: "#fff",
                }}
              />
            ))}
          </Box>

          {/* Lista de usuários */}
          <List
            sx={{
              maxHeight: 180,
              overflowY: "auto",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {filteredUsers.map((user) => {
              const selected = selectedUsers.some((u) => u.id === user.id);
              return (
                <ListItemButton
                  key={user.id}
                  onClick={() => toggleUser(user)}
                  sx={{
                    bgcolor: selected ? "rgba(56,189,248,0.2)" : "transparent",
                    ":hover": {
                      bgcolor: "rgba(56,189,248,0.1)",
                    },
                  }}
                >
                  <Avatar sx={{ mr: 2 }}>{user.name[0]}</Avatar>
                  <ListItemText
                    primary={user.name}
                    secondary={user.email}
                    primaryTypographyProps={{ color: "#fff" }}
                    secondaryTypographyProps={{ color: "#aaa" }}
                  />
                </ListItemButton>
              );
            })}
          </List>

          {/* BOTÕES */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 4,
            }}
          >
            <Button
              onClick={onClose}
              sx={{ color: "#ccc", textTransform: "none" }}
            >
              Fechar
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                px: 3,
                mb: 1,
                background: "linear-gradient(90deg, #2b6e92ff, #1c526bff, #187facff)",
                transition: "all 0.5s ease",
                ":hover": {
                  background: "linear-gradient(90deg, #a5d8f8, #69c3f1, #2ea9d9)",
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 12px rgba(56, 189, 248, 0.25)",
                },
              }}
            >
              Criar Sala
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
