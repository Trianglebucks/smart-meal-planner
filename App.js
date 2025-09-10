import { PaperProvider } from "react-native-paper";
import { RootStackNavigator } from "./src/navigation/RootStackNavigator";
import { theme } from "./src/theme/theme";

// 3. Define the navigator's structure in your main App component
function App() {
  return (
    <PaperProvider theme={theme}>
      <RootStackNavigator />
    </PaperProvider>
  );
}

export default App;
