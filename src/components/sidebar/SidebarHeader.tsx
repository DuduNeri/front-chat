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
        mb: 1,
      }}
    >
      <Typography
        sx={{
          color: "#fff",
          fontWeight: 700,
          fontSize: "1.1rem",
          letterSpacing: 0.5,
        }}
      >
        Menu
      </Typography>

      <IconButton
        size="small"
        onClick={handleClose}
        sx={{
          color: "rgba(255, 255, 255, 0.6)",
          transition: "all 0.2s",
          p: 0.5,
        }}
      >
        <XIcon size={18} />
      </IconButton>
    </Box>
  );
};
