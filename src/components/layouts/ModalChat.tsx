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

export const CreateRoomModal = ({
  open,
  onClose,
  onSubmit,
}: CreateRoomModalProps) => {
  const [title, setTitle] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

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
            maxWidth: 480,
            background: "linear-gradient(135deg, #0a0a15, #1a1a2e, #16213e)",
            borderRadius: "18px",
            p: 4,
            boxShadow: "0 0 25px rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(14px)",
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
            <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700 }}>
              Criar Nova Sala
            </Typography>

            <IconButton
              onClick={onClose}
              sx={{
                color: "#bbb",
                transition: "0.2s",
                "&:hover": { color: "#fff" },
              }}
            >
              <CloseIcon size={22} />
            </IconButton>
          </Box>

          {/* NOME DA SALA */}
          <TextField
            label="Nome da Sala"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            InputLabelProps={{ style: { color: "#aaa" } }}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                color: "#fff",
                backgroundColor: "rgba(255,255,255,0.05)",
                "& fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.1)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(255,255,255,0.25)",
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
              style: { color: "#fff" },
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} color="#ccc" />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "rgba(255,255,255,0.04)",
                "& fieldset": {
                  borderColor: "rgba(255,255,255,0.1)",
                },
              },
            }}
          />

          {/* LISTA */}
          <List sx={{ maxHeight: 240, overflowY: "auto" }}>
            {filteredUsers.map((u) => (
              <ListItemButton
                key={u.id}
                onClick={() => toggleUser(u)}
                sx={{
                  borderRadius: "10px",
                  mb: 1,
                  backgroundColor: selectedUsers.some((s) => s.id === u.id)
                    ? "rgba(255,255,255,0.12)"
                    : "transparent",
                  transition: "0.2s",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.08)",
                  },
                }}
              >
                <Avatar sx={{ mr: 2, bgcolor: "#1e1e2e", color: "#fff" }}>
                  {u.name?.[0] || "U"}
                </Avatar>
                <ListItemText
                  primary={u.name}
                  secondary={u.email}
                  primaryTypographyProps={{ style: { color: "#fff" } }}
                  secondaryTypographyProps={{ style: { color: "#aaa" } }}
                />
              </ListItemButton>
            ))}
          </List>

          {/* CHIPS */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
            {selectedUsers.map((u) => (
              <Chip
                key={u.id}
                label={u.name}
                onDelete={() => toggleUser(u)}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.12)",
                  color: "#fff",
                  "& .MuiChip-deleteIcon": { color: "#ccc" },
                }}
              />
            ))}
          </Box>

          {/* AÇÕES */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 3,
              gap: 1.5,
            }}
          >
            {/* Botão Cancelar */}
            <Button
              onClick={onClose}
              sx={{
                borderColor: "rgba(255,255,255,0.25)",
                color: "rgba(148, 89, 89, 0.85)",
                borderRadius: 2,
                px: 2.5,
                py: 1,
                fontWeight: 500,
                letterSpacing: 0.4,
                transition: "all 0.25s ease",
                backdropFilter: "blur(3px)",
                background: "rgba(255,255,255,0.06)",
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.7)",
                  background: "rgba(255,255,255,0.12)",
                  color: "#ff8080ff",
                  transform: "translateY(-2px)",
                },
                "&:active": {
                  transform: "scale(0.97)",
                },
              }}
            >
              Cancelar
            </Button>

            {/* Botão Criar Sala */}
            <Button
              onClick={() => {
                handleSubmit();
                refresh();
              }}
              sx={{
                borderColor: "rgba(255,255,255,0.25)",
                color: "rgba(255,255,255,0.85)",
                borderRadius: 2,
                px: 2.5,
                py: 1,
                fontWeight: 500,
                letterSpacing: 0.4,
                transition: "all 0.25s ease",
                backdropFilter: "blur(3px)",
                background: "rgba(255,255,255,0.06)",
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.7)",
                  background: "rgba(255,255,255,0.12)",
                  color: "#fff",
                  transform: "translateY(-2px)",
                },
                "&:active": {
                  transform: "scale(0.97)",
                },
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
