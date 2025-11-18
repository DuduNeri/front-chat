import { Box, IconButton, Typography } from "@mui/material";
import { X as XIcon } from "lucide-react";

interface Props {
  isMobile: boolean;
  setSidebarOpen?: (value: boolean) => void;
}

export const SidebarHeader = ({ isMobile, setSidebarOpen }: Props) => {
  if (!isMobile) return null;

  const handleClose = () => {
    setSidebarOpen?.(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 1,
        py: 1.4,
        mb: 1.5,
        borderBottom: "1px solid rgba(120,200,255,0.15)",
        backdropFilter: "blur(4px)",
      }}
    >
      {/* --- TÍTULO --- */}
      <Typography
        sx={{
          color: "#dff7ff",
          fontWeight: 700,
          fontSize: "1.15rem",
          letterSpacing: 0.7,
          textShadow: "0 0 10px rgba(100,200,255,0.35)",
        }}
      >
        Menu
      </Typography>

      {/* --- BOTÃO FECHAR --- */}
      <IconButton
        size="small"
        onClick={handleClose}
        sx={{
          color: "rgba(255,255,255,0.65)",
          p: 0.7,
          borderRadius: "10px",
          transition: "0.25s ease",
          background: "rgba(255,255,255,0.05)",

          "&:hover": {
            color: "#fff",
            background: "rgba(255,255,255,0.12)",
            transform: "scale(1.1)",
            boxShadow: "0 0 8px rgba(100,200,255,0.4)",
          },

          "&:active": {
            transform: "scale(0.92)",
          },
        }}
      >
        <XIcon size={19} />
      </IconButton>
    </Box>
  );
};
