import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Fade,
  Backdrop,
} from "@mui/material";
import { X as CloseIcon } from "lucide-react";
import { deleteChat } from "../../api/chat/deleteChat";

interface Props {
  open: boolean;
  onClose: () => void;
  conversationId: string;
  onDeleted: () => Promise<void>;
}

export const DeleteChat = ({ open, onClose, conversationId, onDeleted }: Props) => {
  const handleDelete = async () => {
    try {
      await deleteChat(conversationId);
      await onDeleted();
      onClose();
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
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
            p: 4,
            borderRadius: "20px",
            background: "linear-gradient(145deg, #0b0b11, #131320, #1a1a33)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 0 35px rgba(0,0,0,0.65)",
          }}
        >
          {/* TÍTULO */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#ff6b6b",
                fontWeight: 700,
              }}
            >
              Tem certeza que deseja excluir o chat?
            </Typography>

            <IconButton
              onClick={onClose}
              sx={{
                color: "#aaa",
                transition: "0.25s",
                "&:hover": { color: "#fff", transform: "rotate(90deg)" },
              }}
            >
              <CloseIcon size={22} />
            </IconButton>
          </Box>

          {/* BOTÕES */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 3,
            }}
          >
            <Button
              onClick={onClose}
              sx={{
                color: "#ddd",
                px: 6,
                background: "rgba(255,255,255,0.05)",
                borderRadius: "10px",
              }}
            >
              Cancelar
            </Button>

            <Button
              onClick={handleDelete}
              sx={{
                color: "#ff7a7a",
                px: 8,
                fontWeight: 600,
                background: "rgba(255,255,255,0.05)",
                borderRadius: "10px",
                transition: "0.25s ease",
                "&:hover": {
                  background: "rgba(255,255,255,0.12)",
                  color: "#ff4b4b",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Deletar
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
