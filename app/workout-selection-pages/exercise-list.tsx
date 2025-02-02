import Loader from '@/components/Loader';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, CardHeader, Text, View } from 'tamagui';

// const exercises = [
//     { name: "Bench Press", reps: ["5 reps", "5 reps", "5 reps", "5 reps"] },
//     { name: "Deadlifts", reps: ["5 reps", "5 reps", "5 reps", "5 reps"] },
//     { name: "Squats", reps: ["5 reps", "5 reps", "5 reps", "5 reps"] },
//     { name: "Tricep Pushdowns", reps: ["8 reps", "8 reps", "6 reps", "6 reps"] },
//     { name: "Shoulder Press", reps: ["8 reps", "8 reps", "8 reps", "8 reps"] },
//     { name: "Lateral Raises", reps: ["10 reps", "10 reps", "10 reps", "10 reps"] }
// ];

const ExerciseList = () => {

    const params = useLocalSearchParams();

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const [visible, setVisible] = React.useState(false);


    // useEffect(() => {

    // }, [params]);
    let data = JSON.parse(params.exercises as string) as { 'name': string, 'reps': Array<string>, 'videoUrl': string | undefined }[];
    const [exercises, setExercises] = React.useState(data);
    const [loaded, setIsLoaded] = React.useState(false);

    useEffect(() => {
        console.log(data.map((exercise) => exercise.name));
        setVisible(true);
        axios.post(`${apiUrl}/video_urls`, data.map((exercise) => exercise.name))
            .then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    data[i].videoUrl = response.data[i];
                }
                console.log(data);
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setIsLoaded(true);
                setVisible(false);
                console.log(data);
                setExercises(data);
            });
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View backgroundColor="$background" flex={1}>
                <ScrollView>
                    {loaded && exercises.map((exercise, index) => (
                        <Card key={index} style={{ margin: 10 }} onPress={() => router.push({ pathname: "/workout-selection-pages/list-with-videos", params: { exercise: JSON.stringify(exercise) } })}>
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
            <Loader visible={visible}></Loader>
        </SafeAreaView>
    );
};

export default ExerciseList;
