import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, View, YStack } from 'tamagui';


interface IFormInput {
    want: string,
    exercise_preference: string,
    exercise_dislines: string,
}


export default function WorkoutSelectionPage() {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>({
        defaultValues: {
            want: "",
            exercise_preference: "",
            exercise_dislines: "",
        },
    });

    const onSubmit = (data: any) => console.log(data);

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
                                {errors.want && <Text style={{ color: 'red' }}>This is required.</Text>}
                            </YStack>
                        )}
                        name="want"
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
                                {errors.exercise_preference && <Text style={{ color: 'red' }}>Max length is 100.</Text>}
                            </YStack>
                        )}
                        name="exercise_preference"
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
                                {errors.exercise_dislines && <Text style={{ color: 'red' }}>Max length is 100.</Text>}
                            </YStack>
                        )}
                        name="exercise_dislines"
                    />

                    <Button onPress={handleSubmit(onSubmit)} theme="primary" borderRadius="$4" width="100%">
                        Submit
                    </Button>
                </YStack>
            </View>
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
