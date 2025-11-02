import { Box } from "@mui/material";
import ChatRoutes from "./routes/Routes";

function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
      }}
    >
      <ChatRoutes />
    </Box>
  );
}

export default App;
