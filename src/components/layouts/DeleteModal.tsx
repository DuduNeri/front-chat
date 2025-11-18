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

interface Props {
  open: boolean;
  onClose: () => void;
}

export const DeleteChat = ({ open, onClose }: Props) => {
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
            background: "linear-gradient(145deg, #0b0b11, #131320, #1a1a33)",
            borderRadius: "20px",
            p: 4,
            boxShadow: "0 0 35px rgba(0, 0, 0, 0.65)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(18px)",
            animation: "modalPop .35s ease",
            "@keyframes modalPop": {
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
                color: "#ff6b6b",
                fontWeight: 700,
                letterSpacing: 0.5,
                textShadow: "0 0 8px rgba(255, 80, 80, 0.3)",
              }}
            >
              Tem certeza que deseja excluir o chat?
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

          {/* AÇÕES */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 3,
              gap: 2,
            }}
          >
            <Button
              onClick={onClose}
              sx={{
                color: "#ddd",
                borderRadius: "10px",
                px: 6,
                py: 1,
                fontWeight: 500,
                letterSpacing: 0.4,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                transition: "0.25s ease",
                "&:hover": {
                  background: "rgba(255,255,255,0.12)",
                  borderColor: "rgba(255,255,255,0.35)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Cancelar
            </Button>

            <Button
              sx={{
                color: "#ff7a7aff",
                borderRadius: "10px",
                px: 8,
                py: 1,
                fontWeight: 600,
                letterSpacing: 0.4,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                transition: "0.25s ease",
                textShadow: "0 0 6px rgba(255, 90, 240, 0.4)",
                "&:hover": {
                  background: "rgba(255,255,255,0.12)",
                  borderColor: "rgba(255, 255, 255, 0.6)",
                  color: "#ff0000ff",
                  transform: "translateY(-2px)",
                  boxShadow: "0 0 12px rgba(255, 80, 255, 0.2)",
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
