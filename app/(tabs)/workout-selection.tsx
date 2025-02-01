import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, YStack } from 'tamagui';



export default function WorkoutSelectionPage() {

    return (
        <SafeAreaView>
            <YStack padding="$3" gap="$3">
                <Button>Plain</Button>
                <Button alignSelf="center" size="$6">
                    Large
                </Button>
            </YStack>
        </SafeAreaView>
    );
};
