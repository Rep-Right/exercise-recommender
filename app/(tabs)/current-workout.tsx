import React from "react";
import { SafeAreaView } from "react-native";
import { Button, styled, View, YStack } from 'tamagui';

const StyledSafeAreaView = styled(SafeAreaView, {
    flex: 1,
});

export default function CurrentWorkout() {

    return (
        <StyledSafeAreaView>
            <View backgroundColor="$background" flex={1}>
                <YStack padding="$3" gap="$3">
                    <Button>Current Workout</Button>
                    <Button alignSelf="center" size="$6">
                        Large
                    </Button>
                </YStack>
            </View>
        </StyledSafeAreaView>
    );
};
