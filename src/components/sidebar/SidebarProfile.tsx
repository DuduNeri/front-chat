import { Avatar, IconButton, Tooltip, Typography } from "@mui/material";

interface Props {
  isMobile: boolean;
}

export const SidebarProfile = ({ isMobile }: Props) => {
  return (
    <Tooltip title="Perfil" placement="right">
      <IconButton
        sx={{
          width: isMobile ? "100%" : 56,
          height: isMobile ? 44 : 56,
          borderRadius: isMobile ? 12 : "50%",
          justifyContent: isMobile ? "flex-start" : "center",
          pl: isMobile ? 1.4 : 0,
          transition: "all 0.25s ease",
          "&:hover": {
            background:
              "linear-gradient(135deg, rgba(100, 200, 255, 0.27), rgba(80, 150, 220, 0.22))",
            borderColor: "rgba(100, 200, 255, 0.75)",
            transform: "translateY(-2px)",
            boxShadow: "0 0 14px rgba(100, 200, 255, 0.28)",
          },
        }}
      >
        <Avatar
          sx={{
            width: isMobile ? 34 : 40,
            height: isMobile ? 34 : 40,
            background:
              "linear-gradient(135deg, rgba(100, 200, 255, 0.35), rgba(80, 150, 220, 0.22))",
            fontSize: isMobile ? "0.85rem" : "1rem",
            fontWeight: 700,
            mr: isMobile ? 1.4 : 0,
            color: "#fff",
            letterSpacing: 0.5,
            boxShadow: "0 0 6px rgba(100,200,255,0.55)",
          }}
        >
          E
        </Avatar>

        {isMobile && (
          <Typography
            sx={{
              color: "rgba(235, 245, 255, 0.92)",
              ml: 1,
              fontWeight: 600,
              fontSize: "0.95rem",
              letterSpacing: 0.3,
            }}
          >
            Perfil
          </Typography>
        )}
      </IconButton>
    </Tooltip>
  );
};
