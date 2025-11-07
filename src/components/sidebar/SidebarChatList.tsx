import { Box, IconButton, Tooltip, Typography } from "@mui/material";

interface Props {
  isMobile: boolean;
}

export const SidebarChatList = ({ isMobile }: Props) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? 1 : 2,
        width: isMobile ? "100%" : "auto",
      }}
    >
      {[1, 2, 3].map((item) => (
        <Tooltip key={item} title={`Chat ${item}`} placement="right">
          <IconButton
            sx={{
              width: isMobile ? "100%" : 48,
              height: isMobile ? 40 : 48,
              borderRadius: isMobile ? 12 : "50%",
              background: "rgba(100, 200, 255, 0.08)",
              border: "1px solid rgba(100, 200, 255, 0.2)",
              justifyContent: isMobile ? "flex-start" : "center",
              pl: isMobile ? 1.5 : 0,
              transition: "all 0.3s",
              "&:hover": {
                background: "rgba(100, 200, 255, 0.15)",
                borderColor: "rgba(100, 200, 255, 0.5)",
                transform: "translateY(-1px)",
              },
            }}
          >
            <Box
              sx={{
                width: isMobile ? 10 : 12,
                height: isMobile ? 10 : 12,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, rgba(100, 200, 255, 0.6), rgba(100, 180, 240, 0.4))",
                mr: isMobile ? 1.5 : 0,
                boxShadow: "0 0 12px rgba(100, 200, 255, 0.3)",
              }}
            />

            {isMobile && (
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.75)",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                }}
              >
                Chat {item}
              </Typography>
            )}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
};
