import { SafeAreaView } from "react-native";
import { Button, styled, View, YStack } from 'tamagui';

const StyledSafeAreaView = styled(SafeAreaView, {
    flex: 1,
});

export default function ExerciseSelection() {

    return (
        <StyledSafeAreaView>
            <View backgroundColor="$background" flex={1}>
                <YStack padding="$3" gap="$3">
                    <Button>Exercise selection</Button>
                    <Button alignSelf="center" size="$6">
                        Large
                    </Button>
                </YStack>
            </View>
        </StyledSafeAreaView>
    );
};
