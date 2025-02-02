import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "tamagui";


export default function ListWithVideos() {
    const params = useLocalSearchParams();
    const exercise = JSON.parse(params.exercise as string) as { 'name': string, 'reps': Array<string> };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View flex={1} backgroundColor="$background" >
                <Text fontSize="$6" fontWeight="bold" marginBottom="$2">{exercise.name}</Text>
                {exercise.reps.map((rep, index) => (
                    <Text key={index} fontSize="$4" marginBottom="$1">{rep}</Text>
                ))}
            </View>
        </SafeAreaView>
    )
}
