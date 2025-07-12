import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import Footer from "@COMPONENTS/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DropProvider from "./providers/DropProvider";
import { Container, CssBaseline, Stack } from "@mui/material";

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

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <QueryClientProvider client={queryClient}>
          <DropProvider>
            <Stack
              direction="column"
              spacing={2}
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <Container>
                <RouterProvider router={router} />
              </Container>
              <Footer />
            </Stack>
          </DropProvider>
        </QueryClientProvider>
      </Container>
    </>
  );
}

export default App;
