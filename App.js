// Import necessary modules from React and React Native
import { PaperProvider } from "react-native-paper";
import { RootStackNavigator } from "./src/navigation/RootStackNavigator";
import { theme } from "./src/theme/theme";
// Import Firebase configuration to ensure it's initialized
import "./src/config/firebase.config";

// 3. Define the navigator's structure in your main App component
function App() {
  return (
    <PaperProvider theme={theme}>
      <RootStackNavigator />
    </PaperProvider>
  );
}

export default App;
