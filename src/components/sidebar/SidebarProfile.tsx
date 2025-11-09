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
          background:
            "linear-gradient(135deg, rgba(100, 200, 255, 0.15) 0%, rgba(100, 150, 220, 0.1) 100%)",
          border: "1.5px solid rgba(100, 200, 255, 0.4)",
          justifyContent: isMobile ? "flex-start" : "center",
          pl: isMobile ? 1.5 : 0,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            background:
              "linear-gradient(135deg, rgba(100, 200, 255, 0.25) 0%, rgba(100, 150, 220, 0.2) 100%)",
            borderColor: "rgba(100, 200, 255, 0.7)",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 24px rgba(100, 200, 255, 0.2)",
          },
        }}
      >
        <Avatar
          sx={{
            width: isMobile ? 36 : 40,
            height: isMobile ? 36 : 40,
            background:
              "linear-gradient(135deg, rgba(100, 200, 255, 0.3), rgba(80, 180, 220, 0.2))",
            fontSize: isMobile ? "0.9rem" : "1rem",
            fontWeight: 700,
            mr: isMobile ? 1.5 : 0,
            color: "#fff",
          }}
        >
          E
        </Avatar>

        {isMobile && (
          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              ml: 1,
              fontWeight: 600,
              fontSize: "0.95rem",
            }}
          >
            Perfil
          </Typography>
        )}
      </IconButton>
    </Tooltip>
  );
};
