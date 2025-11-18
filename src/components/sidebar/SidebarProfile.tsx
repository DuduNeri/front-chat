import { Avatar, IconButton, Tooltip, Typography, Box } from "@mui/material";

interface Props {
  isMobile: boolean;
}

export const SidebarProfile = ({ isMobile }: Props) => {
  const userName = localStorage.getItem("userName") || "";
  const firstLetter = userName.charAt(0).toUpperCase();

  return (
    <Tooltip title="Perfil" placement="right">
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 1.4,
          padding: "8px 6px",
          borderRadius: 12,
          transition: "0.25s ease",
          cursor: "pointer",

          "&:hover": {
            background: "rgba(120,200,255,0.10)",
            transform: "translateY(-2px)",
            boxShadow: "0 0 18px rgba(120,200,255,0.28)",
          },
        }}
      >
        {/* Avatar */}
        <Avatar
          sx={{
            width: 42,
            height: 42,
            background:
              "linear-gradient(135deg, rgba(120,200,255,0.35), rgba(80,140,220,0.22))",
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#e8faff",
            letterSpacing: 0.6,
            boxShadow: "0 0 8px rgba(120,200,255,0.55)",
          }}
        >
          {firstLetter || "?"}
        </Avatar>

        {/* Nome sempre visível */}
        <Typography
          sx={{
            color: "rgba(235,245,255,0.95)",
            fontWeight: 600,
            fontSize: "1rem",
            letterSpacing: 0.4,
            textShadow: "0 0 6px rgba(120,200,255,0.28)",
          }}
        >
          {userName || "Usuário"}
        </Typography>
      </Box>
    </Tooltip>
  );
};
