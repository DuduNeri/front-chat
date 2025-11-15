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
    onRoomCreated?: () => void;  
  onSubmit: (data: { title: string; participants: string[] }) => void;
}

export const CreateRoomModal = ({ open, onClose, onSubmit }: CreateRoomModalProps) => {
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
            bgcolor: "rgba(80, 139, 137, 0.92)",
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
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                color: "#fff",
                backgroundColor: "rgba(240, 226, 226, 0.05)",
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.15)" },
              },
            }}
          />

          {/* BUSCA DE USUÁRIOS */}
          <TextField
            placeholder="Buscar usuários"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} color="#aaa" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          {/* LISTA DE USUÁRIOS */}
          <List sx={{ maxHeight: 240, overflowY: "auto" }}>
            {filteredUsers.map((u) => (
              <ListItemButton key={u.id} onClick={() => toggleUser(u)}>
                <Avatar sx={{ mr: 2 }}>{u.name?.[0] || "U"}</Avatar>
                <ListItemText primary={u.name} secondary={u.email} />
              </ListItemButton>
            ))}
          </List>

          {/* USUÁRIOS SELECIONADOS */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
            {selectedUsers.map((u) => (
              <Chip key={u.id} label={u.name} onDelete={() => toggleUser(u)} />
            ))}
          </Box>

          {/* AÇÕES */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 1 }}>
            <Button variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Criar sala
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
