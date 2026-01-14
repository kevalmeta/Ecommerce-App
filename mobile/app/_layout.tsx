import { Stack } from "expo-router";
import "../global.css";
import {QueryClient,QueryClientProvider} from "@tanstack/react-query";
import {ClerkProvider} from "@clerk/clerk-expo";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <ClerkProvider>
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{headerShown:false}} />
    </QueryClientProvider>
    </ClerkProvider>
  );
}
