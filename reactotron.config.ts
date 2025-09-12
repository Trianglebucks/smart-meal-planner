import reactotronZustand from "reactotron-plugin-zustand";
import type { ReactotronReactNative } from "reactotron-react-native";
import Reactotron from "reactotron-react-native";
import mmkvPlugin from "reactotron-react-native-mmkv";

import { storage } from "@/src/utils/storage";

import { useAuthStore } from "@/src/stores/useAuthStore";

Reactotron.configure({
  name: "EPOD Onyx",
})
  .useReactNative()
  .use(mmkvPlugin<ReactotronReactNative>({ storage }))
  .use(
    reactotronZustand({
      stores: [{ name: "auth", store: useAuthStore }],
      omitFunctionKeys: true,
    })
  )
  .connect();
