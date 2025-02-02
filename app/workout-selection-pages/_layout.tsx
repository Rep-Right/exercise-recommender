import { Stack } from "expo-router";



export default function WorkoutPagesLayout() {


    return (
        <Stack initialRouteName='exercise-list'>
            <Stack.Screen name="exercise-list" options={{ headerShown: false }} />
            <Stack.Screen name="list-with-videos" options={{ headerShown: false }} />
        </Stack>
    );
}
