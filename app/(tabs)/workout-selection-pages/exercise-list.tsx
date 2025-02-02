import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, CardHeader, Text, View } from 'tamagui';

const exercises = [
    { name: "Bench Press", reps: ["5 reps", "5 reps", "5 reps", "5 reps"] },
    { name: "Deadlifts", reps: ["5 reps", "5 reps", "5 reps", "5 reps"] },
    { name: "Squats", reps: ["5 reps", "5 reps", "5 reps", "5 reps"] },
    { name: "Tricep Pushdowns", reps: ["8 reps", "8 reps", "6 reps", "6 reps"] },
    { name: "Shoulder Press", reps: ["8 reps", "8 reps", "8 reps", "8 reps"] },
    { name: "Lateral Raises", reps: ["10 reps", "10 reps", "10 reps", "10 reps"] }
];

const ExerciseList = () => {

    const params = useLocalSearchParams();


    // useEffect(() => {

    // }, [params]);
    const data = JSON.parse(params.exercises as string) as { 'name': string, 'reps': Array<string> }[];

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View backgroundColor="$background" flex={1}>
                <ScrollView>
                    {data.map((exercise, index) => (
                        <Card key={index} style={{ margin: 10 }} onPress={() => router.push({ pathname: "/(tabs)/workout-selection-pages/list-with-videos", params: { exercise: JSON.stringify(exercise) } })}>
                            <CardHeader>
                                <Text>{exercise.name}</Text>
                            </CardHeader>
                            <View>
                                {/* {exercise.reps.map((rep, repIndex) => (
                            <Text key={repIndex}>{rep}</Text>
                        ))} */}
                                <Text>{exercise.reps.length}</Text>
                            </View>
                        </Card>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default ExerciseList;
