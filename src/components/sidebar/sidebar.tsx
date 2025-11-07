import { Box } from "@mui/material";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarProfile } from "./SidebarProfile";
import { SidebarChatList } from "./SidebarChatList";
import { SidebarActions } from "./SidebarActions";

interface Props {
  isMobile: boolean;
  setSidebarOpen?: (value: boolean) => void;
}

export const Sidebar = ({ isMobile, setSidebarOpen }: Props) => {
  return (
    <Box
      sx={{
        width: isMobile ? "100%" : 100,
        background:
          "linear-gradient(180deg, rgba(30, 30, 46, 0.95) 0%, rgba(25, 25, 40, 0.95) 100%)",
        borderRight: isMobile ? "none" : "1px solid rgba(100, 200, 255, 0.15)",
        display: "flex",
        flexDirection: "column",
        alignItems: isMobile ? "flex-start" : "center",
        py: isMobile ? 2 : 3,
        px: isMobile ? 2 : 0,
        gap: isMobile ? 1 : 2,
        height: "100%",
        overflowY: "auto",
      }}
    >
      <SidebarHeader isMobile={isMobile} setSidebarOpen={setSidebarOpen} />
      <SidebarProfile isMobile={isMobile} />
      <SidebarChatList isMobile={isMobile} />
      <SidebarActions isMobile={isMobile} />
    </Box>
  );
};
