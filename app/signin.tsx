import { useRouter } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Text, TextInput } from "react-native";
import { Button, YStack } from "tamagui";

export default function SignInScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = getAuth();

    async function handleSignIn() {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            router.replace("/(tabs)/workout-selection");
        } catch (error) {
            setLoading(false);
            if (error instanceof Error) {
                alert(`Error: ${error.message}`);
            } else {
                alert("An unexpected error occurred.");
            }
        }
    }

    return (
        <YStack flex={1} backgroundColor="#f0f0f0" padding="$4" space="$4" justifyContent="center" alignItems="center">
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                style={{
                    width: '80%',
                    height: 50,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 10,
                    marginBottom: 10,
                    backgroundColor: '#fff',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    elevation: 3
                }}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                style={{
                    width: '80%',
                    height: 50,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 10,
                    marginBottom: 20,
                    backgroundColor: '#fff',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    elevation: 3
                }}
            />
            <Button onPress={handleSignIn} disabled={loading} style={{ width: '80%', height: 50, padding: 10, borderRadius: 10, backgroundColor: '#6200ee', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 16 }}>Sign In</Text>
            </Button>
        </YStack>
    );
}
