import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, View } from "tamagui";


export default function ListWithVideos() {
    const params = useLocalSearchParams();
    const exercise = JSON.parse(params.exercise as string) as { 'name': string, 'reps': Array<string>, 'videoUrl': string | undefined };

    useEffect(() => {
        console.log(exercise);
    }, []);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View flex={1} backgroundColor="$background" >
                <Text fontSize="$6" fontWeight="bold" marginBottom="$2">{exercise.name}</Text>
                {/* {exercise.videoUrl && <Text>{exercise.videoUrl}</Text>} */}
                {/* <Text>{exercise.videoUrl}</Text> */}
                {exercise.videoUrl && (
                    <Button onPress={() => exercise.videoUrl && Linking.openURL(exercise.videoUrl)}>
                        Go to video
                    </Button>
                )}
                {exercise.reps.map((rep, index) => (
                    <Text key={index} fontSize="$4" marginBottom="$1">{rep}</Text>
                ))}
            </View>
        </SafeAreaView>
    )
}
