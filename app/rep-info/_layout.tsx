import { Stack } from "expo-router";
import React from "react";

export default function RepInfoLayout() {
    return (
        <Stack initialRouteName="output">
            <Stack.Screen name="output" options={{ headerShown: false }} />
            <Stack.Screen name="detail" options={{ headerShown: false }} />
        </Stack>
    );
}
