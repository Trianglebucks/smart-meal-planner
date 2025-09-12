/* eslint-disable import/first */
if (__DEV__) {
  require("./reactotron.config");
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PaperProvider } from "react-native-paper";
import { RootStackNavigator } from "./src/navigation/RootStackNavigator";
import { theme } from "./src/theme/theme";

import "./src/config/firebase.config";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,

      gcTime: 1000 * 60 * 30,

      retry: 2,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <RootStackNavigator />
      </PaperProvider>
    </QueryClientProvider>
  );
}

export default App;
