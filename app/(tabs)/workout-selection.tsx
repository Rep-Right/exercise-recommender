import Loader from "@/components/Loader";
import axios from "axios";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, View, YStack } from 'tamagui';


interface IFormInput {
    wants: string,
    likes: string,
    dislikes: string,
}


export default function WorkoutSelectionPage() {
    const apiUrl = "http://35.21.203.224:8000";//process.env.EXPO_PUBLIC_API_URL;

    const [loading, setLoading] = React.useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>({
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
                // console.log(exercise[0]);
                // console.log(exercise[1]);
            }
            return new_exercises_list;
        }
        catch (e) {
            return "ERROR";
        }
    };

    const onSubmit = (data: any) => {
        setLoading(true);
        console.log(data);
        axios.post(`${apiUrl}/workout_generation`, data)
            .then((response) => {
                console.log(response.data + "is resp");
                // 
                console.log(parseApiOut(response.data));
                setLoading(false);
                const parseOut = parseApiOut(response.data);
                if (parseOut == 'ERROR') {
                    console.log("ERROR");
                    setLoading(false);
                    return;
                }
                router.push({ pathname: "/(tabs)/workout-selection-pages/exercise-list", params: { exercises: JSON.stringify(parseOut) } });
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
        <SafeAreaView style={{ flex: 1 }}>
            <View backgroundColor="$background" flex={1} alignItems="center">
                <YStack padding="$4" space="$4" width="100%">
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <YStack space="$2" width="100%">
                                <Text style={styles.textInForm}>What do you want to achieve?</Text>
                                <TextInput
                                    placeholder="Enter your goal"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    style={{ borderColor: 'gray', borderWidth: 1, padding: 12, borderRadius: 10, backgroundColor: 'white', width: '100%' }}
                                />
                                {errors.wants && <Text style={{ color: 'red' }}>This is required.</Text>}
                            </YStack>
                        )}
                        name="wants"
                    />

                    <Controller
                        control={control}
                        rules={{
                            maxLength: 100,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <YStack space="$2" width="100%">
                                <Text style={styles.textInForm}>Exercise preference</Text>
                                <TextInput
                                    placeholder="Enter your exercise preference"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    style={{ borderColor: 'gray', borderWidth: 1, padding: 12, borderRadius: 10, backgroundColor: 'white', width: '100%' }}
                                />
                                {errors.likes && <Text style={{ color: 'red' }}>Max length is 100.</Text>}
                            </YStack>
                        )}
                        name="likes"
                    />

                    <Controller
                        control={control}
                        rules={{
                            maxLength: 100,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <YStack space="$2" width="100%">
                                <Text style={styles.textInForm}>Exercise dislikes</Text>
                                <TextInput
                                    placeholder="Enter your exercise dislikes"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    style={{ borderColor: 'gray', borderWidth: 1, padding: 12, borderRadius: 10, backgroundColor: 'white', width: '100%' }}
                                />
                                {errors.dislikes && <Text style={{ color: 'red' }}>Max length is 100.</Text>}
                            </YStack>
                        )}
                        name="dislikes"
                    />

                    <Button onPress={handleSubmit(onSubmit)} theme="primary" borderRadius="$4" width="100%">
                        Submit
                    </Button>
                </YStack>
            </View>
            {loading && <Loader visible={loading} />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    textInForm: {
        // borderColor: 'gray',
        // borderWidth: 1,
        // padding: 12,
        // borderRadius: 10,
        // backgroundColor: 'white',
        // width: '100%'
        fontSize: 20,
        alignSelf: 'center',
    }
});
