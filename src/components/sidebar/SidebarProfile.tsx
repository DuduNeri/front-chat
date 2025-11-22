import { Avatar, Tooltip, Typography, Box } from "@mui/material";

interface Props {
  isMobile: boolean;
}

export const SidebarProfile = ({ isMobile }: Props) => {
  const userName = localStorage.getItem("userName") || "";
  const firstLetter = userName.charAt(0).toUpperCase();

  return (
    <Tooltip title="" placement="right" arrow>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: isMobile ? 1 : 1.4,
          padding: isMobile ? "6px 4px" : "8px 6px",
          borderRadius: 12,
          cursor: "pointer",
          transition: "all 0.25s ease",
          background: "rgba(255,255,255,0.02)",

          "&:hover": {
            background: "rgba(255,255,255,0.06)",
            boxShadow: `
              0 0 12px rgba(76, 201, 240, 0.25),
              inset 0 0 8px rgba(76, 201, 240, 0.15)
            `,
            transform: "translateY(-2px)",

            "& .avatar-glow": {
              boxShadow: "0 0 18px rgba(76, 201, 240, 0.55)",
              transform: "scale(1.06)",
            },

            "& .user-name": {
              color: "#fff",
              textShadow: "0 0 8px rgba(76, 201, 240, 0.45)",
            },
          },
        }}
      >
        <Avatar
          className="avatar-glow"
          sx={{
            width: isMobile ? 36 : 42,
            height: isMobile ? 36 : 42,
            background: "linear-gradient(145deg, #6C63FF, #4CC9F0)",
            fontSize: isMobile ? "0.9rem" : "1.1rem",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: 0.5,
            transition: "all 0.28s ease",
          }}
        >
          {firstLetter || "?"}
        </Avatar>

        <Typography
          className="user-name"
          sx={{
            color: "#E6E6E6",
            fontWeight: 600,
            fontSize: isMobile ? "0.88rem" : "1rem",
            letterSpacing: 0.3,
            transition: "all 0.25s ease",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flex: 1,
          }}
        >
          {userName || "Usuário"}
        </Typography>
      </Box>
    </Tooltip>
  );
};
