import Loader from "@/components/Loader";
import axios from "axios";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, View, YStack } from 'tamagui';

interface IFormInput {
    wants: string,
    likes: string,
    dislikes: string,
}

export default function WorkoutSelectionPage() {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const [loading, setLoading] = React.useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        defaultValues: {
            wants: "",
            likes: "",
            dislikes: "",
        },
    });

    const parseApiOut = (str: string): any => {
        const list_of_exercises = str.split("|");
        if (list_of_exercises.length == 0) {
            return "ERROR";
        }
        try {
            let new_exercises_list: Array<{ 'name': string, 'reps': Array<string> }> = [];
            for (let i = 0; i < list_of_exercises.length; i++) {
                const exercise = list_of_exercises[i].split("(");
                if (exercise.length != 2) {
                    return "ERROR";
                }
                new_exercises_list.push({ 'name': exercise[0], 'reps': exercise[1].split(",") });
            }
            return new_exercises_list;
        }
        catch (e) {
            return "ERROR";
        }
    };

    const onSubmit = (data: any) => {
        setLoading(true);
        axios.post(`${apiUrl}/workout_generation`, data)
            .then((response) => {
                const parseOut = parseApiOut(response.data);
                if (parseOut == 'ERROR') {
                    console.log("ERROR");
                    setLoading(false);
                    return;
                }
                router.push({ pathname: "/workout-selection-pages/exercise-list", params: { exercises: JSON.stringify(parseOut) } });
            })
            .catch((error) => {
                if (axios.isAxiosError(error)) {
                    console.log(error.message!);
                }
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    <Text style={styles.title}>Work-out Selector</Text>

                    <YStack padding="$4" space="$4" width="100%">

                        <Controller
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <YStack space="$2" width="100%">
                                    <Text style={styles.formLabel}>What do you want to achieve?</Text>
                                    <TextInput
                                        placeholder="Enter your goal"
                                        placeholderTextColor="#A0A0A0"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        style={styles.textInput}
                                    />
                                    {errors.wants && <Text style={styles.errorText}>This is required.</Text>}
                                </YStack>
                            )}
                            name="wants"
                        />

                        <Controller
                            control={control}
                            rules={{ maxLength: 100 }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <YStack space="$2" width="100%">
                                    <Text style={styles.formLabel}>Exercise preference</Text>
                                    <TextInput
                                        placeholder="Enter your exercise preference"
                                        placeholderTextColor="#A0A0A0"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        style={styles.textInput}
                                    />
                                    {errors.likes && <Text style={styles.errorText}>Max length is 100.</Text>}
                                </YStack>
                            )}
                            name="likes"
                        />

                        <Controller
                            control={control}
                            rules={{ maxLength: 100 }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <YStack space="$2" width="100%">
                                    <Text style={styles.formLabel}>Exercise dislikes</Text>
                                    <TextInput
                                        placeholder="Enter your exercise dislikes"
                                        placeholderTextColor="#A0A0A0"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        style={styles.textInput}
                                    />
                                    {errors.dislikes && <Text style={styles.errorText}>Max length is 100.</Text>}
                                </YStack>
                            )}
                            name="dislikes"
                        />

                        <Button
                            onPress={handleSubmit(onSubmit)}
                            style={styles.submitButton}
                        >
                            <Text style={styles.buttonText}>Submit</Text>
                        </Button>
                    </YStack>
                </View>
            </ScrollView>
            {loading && <Loader visible={loading} />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1c1c1e', // Dark theme background
    },
    scrollView: {
        paddingHorizontal: 16,
    },
    container: {
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#7F5FFF', // Purple color to match the theme
        marginBottom: 20,
        textAlign: 'center',
    },
    formLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        marginBottom: 4,
    },
    textInput: {
        borderColor: '#4A4A4A',
        borderWidth: 1,
        padding: 12,
        borderRadius: 12,
        backgroundColor: '#2C2C2E',
        color: 'white',
        width: '100%',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 1 },
        elevation: 2,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
    },
    submitButton: {
        backgroundColor: '#7F5FFF', // Solid purple color
        borderRadius: 12,
        paddingVertical: 12,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
    },
});
