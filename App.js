// Import necessary modules from React and React Native
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PaperProvider } from "react-native-paper";
import { RootStackNavigator } from "./src/navigation/RootStackNavigator";
import { theme } from "./src/theme/theme";
// Import Firebase configuration to ensure it's initialized
import "./src/config/firebase.config";

// 1. Create the client outside of the component
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // How long data is considered fresh. During this time, data will be served
      // from the cache without a background refetch. 5 minutes is a good default.
      staleTime: 1000 * 60 * 5,

      // How long inactive data remains in the cache before being garbage collected.
      // 30 minutes is a reasonable default for mobile apps.
      gcTime: 1000 * 60 * 30,

      // How many times to retry a failed query before showing an error.
      // This is useful for handling transient network issues on mobile.
      retry: 2,
    },
  },
});

// 2. Define the navigator's structure in your main App component
function App() {
  return (
    // 3. Wrap your application with the QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <RootStackNavigator />
      </PaperProvider>
    </QueryClientProvider>
  );
}

export default App;
