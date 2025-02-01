import { SafeAreaView } from "react-native-safe-area-context";
import { styled, Text, View } from 'tamagui';

const StyledSafeAreaView = styled(SafeAreaView, {
    flex: 1,
});

// Shoulder Press, Squat, Deadlift, Tricep pushdown

export default function HomeScreen() {

    const stuff = ["Shoulder Press", "Squat", "Deadlift", "Tricep pushdown"];

    return (
        <StyledSafeAreaView>
            <View backgroundColor="$background" flex={1} alignItems="center">
                {/* <Text fontSize="$6" padding="$3">
                    Exercises:
                </Text>
                <YStack padding="$3" gap="$3">
                    <Button>Exercise selection</Button>
                    <Button alignSelf="center" size="$6">
                        Large
                    </Button>
                </YStack> */}
                <Text fontSize="$6" padding="$3">
                    Exercises:
                </Text>
                <View flexDirection="row" flexWrap="wrap" justifyContent="space-between">
                    {stuff.map((item, index) => (
                        <View
                            key={index}
                            width="49.5%"
                            aspectRatio={1}
                            marginVertical="$1"
                            marginHorizontal="$0.5"
                            padding="$2"
                            backgroundColor="$color3"
                            borderRadius="$4"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Text>{item}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </StyledSafeAreaView>
    );
};
