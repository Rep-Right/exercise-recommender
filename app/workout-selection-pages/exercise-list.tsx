import Loader from '@/components/Loader';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'tamagui';



const ExerciseList = () => {
    const params = useLocalSearchParams();
    //const data = JSON.parse(params.exercises as string) as { name: string, reps: Array<string> }[];
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const [visible, setVisible] = React.useState(false);


    // useEffect(() => {

    // }, [params]);
    let data = JSON.parse(params.exercises as string) as { 'name': string, 'reps': Array<string>, 'videoUrl': string | undefined }[];
    const [exercises, setExercises] = React.useState(data);
    const [loaded, setIsLoaded] = React.useState(false);
/*
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
    */
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {exercises.map((exercise, index) => (
                    <Pressable
                        key={index}
                        style={({ pressed }) => [
                            styles.card,
                            pressed && styles.cardPressed,
                        ]}
                        onPress={() =>
                            router.push({
                                pathname: '/workout-selection-pages/list-with-videos',
                                params: { exercise: JSON.stringify(exercise) },
                            })
                        }
                    >
                        <View style={styles.cardHeader}>
                            <Text style={styles.exerciseName}>{exercise.name}</Text>
                        </View>
                        <Text style={styles.repText}>
                            {exercise.reps.length} sets
                        </Text>
                    </Pressable>
                ))}
            </ScrollView>
            {/* <Loader visible={loaded}>

            </Loader> */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1c1c1e', // Dark theme background
    },
    scrollView: {
        padding: 10,
    },
    card: {
        backgroundColor: '#2c2c2e', // Dark card background
        borderRadius: 12,
        padding: 15,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    cardPressed: {
        transform: [{ scale: 0.97 }], // Slight shrink effect on press
    },
    cardHeader: {
        marginBottom: 10,
    },
    exerciseName: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white', // Contrast text for dark theme
    },
    repText: {
        fontSize: 16,
        color: '#b0b0b0', // Light grey for secondary information
    },
});

export default ExerciseList;
