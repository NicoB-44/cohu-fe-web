import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import Footer from "@COMPONENTS/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DropProvider from "./providers/DropProvider";
import { Container, createTheme, CssBaseline, Stack, ThemeProvider } from "@mui/material";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

const router = createBrowserRouter(routes, {
  basename: "/cohu-fe-web",
});

// MUI theme overrides
const theme = createTheme({
  palette: {},
});

function App() {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container disableGutters sx={{ backgroundColor: "#fff", height: "100%" }}>
          <QueryClientProvider client={queryClient}>
            <DropProvider>
              <Stack
                direction="column"
                spacing={2}
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  minHeight: "100vh",
                }}
              >
                <Container disableGutters>
                  <RouterProvider router={router} />
                </Container>
                <Footer />
              </Stack>
            </DropProvider>
          </QueryClientProvider>
        </Container>
    </ThemeProvider>
  );
}

export default App;
