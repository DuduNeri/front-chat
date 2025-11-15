import { Box, IconButton, Typography } from "@mui/material";
import { X as XIcon } from "lucide-react";

interface Props {
  isMobile: boolean;
  setSidebarOpen?: (value: boolean) => void;
}

export const SidebarHeader = ({ isMobile, setSidebarOpen }: Props) => {
  if (!isMobile) return null;

  const handleClose = () => {
    if (setSidebarOpen) {
      setSidebarOpen(false);
    } else {
      console.warn("setSidebarOpen não foi passado para o SidebarHeader!");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "6px 4px 10px 4px",
        mb: 1,
      }}
    >
      <Typography
        sx={{
          color: "#e8f6ff",
          fontWeight: 700,
          fontSize: "1.1rem",
          letterSpacing: 0.6,
          textShadow: "0 0 8px rgba(100,200,255,0.35)",
        }}
      >
        Menu
      </Typography>

      <IconButton
        size="small"
        onClick={handleClose}
        sx={{
          color: "rgba(255, 255, 255, 0.6)",
          transition: "all 0.25s ease",
          p: 0.6,
          borderRadius: "8px",
          "&:hover": {
            color: "#fff",
            transform: "scale(1.07)",
          },
          "&:active": {
            transform: "scale(0.94)",
          },
        }}
      >
        <XIcon size={18} />
      </IconButton>
    </Box>
  );
};
