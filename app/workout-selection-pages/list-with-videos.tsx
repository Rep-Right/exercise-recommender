import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Linking, SafeAreaView, Text, View, Button, StyleSheet } from "react-native";

export default function ListWithVideos() {
    const params = useLocalSearchParams();
    const exercise = JSON.parse(params.exercise as string) as { 'name': string, 'reps': Array<string>, 'videoUrl': string | undefined };

    useEffect(() => {
        console.log(exercise);
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Exercise Name */}
                <Text style={styles.exerciseTitle}>{exercise.name}</Text>

                {/* Video Button */}
                {exercise.videoUrl && (
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Go to video"
                            color="#7F5FFF"
                            onPress={() => exercise.videoUrl && Linking.openURL(exercise.videoUrl)}
                        />
                    </View>
                )}

                {/* Reps with Styled Cards */}
                <View style={styles.repsContainer}>
                    {exercise.reps.map((rep, index) => (
                        <View key={index} style={styles.repCard}>
                            <View style={styles.checkMarkContainer}>
                                <Text style={styles.checkMark}>✔️</Text>
                            </View>
                            <Text style={styles.repText}>{rep}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1c1c1e',
    },
    container: {
        padding: 20,
        flex: 1,
        alignItems: 'center',
    },
    exerciseTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 30,
    },
    buttonContainer: {
        marginBottom: 30,
        width: '80%',
    },
    repsContainer: {
        width: '100%',
    },
    repCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#3A1C71', // Dark purple background
        padding: 20,
        borderRadius: 15,
        marginBottom: 20, // Spread out cards vertically
        width: '90%',
        alignSelf: 'center',
    },
    checkMarkContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white', // White circle background
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20, // Creates space between check mark and text
        marginLeft: -10, // Slight left shift of the circle
    },
    checkMark: {
        color: '#7F5FFF', // Purple check mark
        fontSize: 28,
    },
    repText: {
        fontSize: 24,
        fontWeight: '600',
        color: 'white',
    },
});
