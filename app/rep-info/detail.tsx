// app/rep-info/detail.tsx
import { router, useLocalSearchParams } from "expo-router";
import { useVideoPlayer, VideoView } from 'expo-video';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as jotaistates from '../../state/jotaistates';

const DetailScreen = () => {
    const { starting, ending, errors, time } = useLocalSearchParams();

    const [videoUri, setVideoUri] = useAtom(jotaistates.videoLocationAtom);


    // useEffect(() => {

    // }, []);
    const player = useVideoPlayer(videoUri, player => {
        player.loop = true;
        player.play();
        player.muted = true;
        // player.currentTime = 0.5;//start time
        player.currentTime = parseFloat(starting as string);
    });

    // const { currentTime } = useEvent(player, 'timeUpdate', {
    //   currentTime: player.currentTime,
    //   currentLiveTimestamp: player.currentLiveTimestamp, // or appropriate value
    //   currentOffsetFromLive: player.currentOffsetFromLive, // or appropriate value
    //   bufferedPosition: player.bufferedPosition // or appropriate value
    // });

    const [currTime, setCurrTime] = useState(0);

    // useEffect(() => {
    //   if (player.currentTime >= parseFloat(ending as string)) {
    //     player.currentTime = parseFloat(starting as string);
    //   }
    //   setCurrTime(player.currentTime);
    //   // console.log('here');
    //   // console.log(starting, ending, errors, time);
    // }, [player.currentTime]);
    useEffect(() => {
        const interval = setInterval(() => {
            if (player.currentTime >= parseFloat(ending as string) || player.currentTime >= player.duration || player.currentTime <= parseFloat(starting as string)) {
                player.currentTime = parseFloat(starting as string);
            }
        }, 100); // Check every 100ms for smooth playback
        return () => clearInterval(interval);
    }, [player, starting, ending]);

    // useEffect(() => {
    //   const handleTimeUpdate = () => {
    //     if (player.currentTime >= parseFloat(ending as string)) {
    //       player.currentTime = parseFloat(starting as string); // Loop back to start
    //     }
    //   };

    //   // Add event listener for time updates
    //   player.addListener("timeUpdate", handleTimeUpdate);

    //   // Clean up the event listener
    //   return () => {
    //     player.removeListener("timeUpdate", handleTimeUpdate);
    //   };
    // }, [player, starting, ending]);


    /**
     *       {swinging && <Text style={styles.detail}>Swinging: {swinging}</Text>}
      {elbowMovement && (
          <Text style={styles.detail}>Elbow Movement: {elbowMovement}</Text>
        )}
          Just using avg for now 
     */
    return (
        <View style={styles.enclosingContainer}>
            <SafeAreaView style={styles.container}>
                {/* <Text style={styles.title}>Time: {time}</Text> */}
                {/* <Text>{videoUri}</Text> */}
                <VideoView style={styles.video} player={player} nativeControls={false} allowsFullscreen allowsPictureInPicture />
                {errors ?
                    // <Text>Bad Rep at time {Math.round((parseFloat(starting as string) + parseFloat(time as string) / 2) * 100) / 100}</Text>
                    //: <Text>Bad Rep at time {Math.round((parseFloat(starting as string) + parseFloat(time as string) / 2) * 100) / 100}</Text>
                    (
                        [...new Set(errors.toString().split(","))].map((error) => {
                            if (error === 'Loose Upper Arm') {
                                return <View style={styles.badOrGoodRep}><Text key={error}>Elbow movement detected</Text></View>
                            }
                            else if (error === 'Peak Contraction Error') {
                                return <View style={styles.badOrGoodRep}><Text key={error}>Not full top range of motion detected.</Text></View>
                            }
                            return <View style={styles.badOrGoodRep}><Text key={error}>{error}</Text></View>
                        })
                    )

                    :
                    <View style={styles.badOrGoodRep}><Text>Good Rep!</Text></View>
                }
                <Pressable
                    style={styles.floatingActionButtonBottomLeft}
                    onPress={() => {
                        router.back();
                    }}>
                    <Ionicons
                        name={"arrow-back"}
                        size={50}
                        color={"black"}
                    />
                </Pressable>

            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        // padding: 20,
        backgroundColor: "#302736",
    },
    video: {
        // width: 350,
        alignSelf: "stretch",
        // left: 0,
        // right: 0,
        height: 375, //275,
        backgroundColor: "black",
    },
    floatingActionButtonBottomLeft: {
        position: "absolute",
        bottom: 20,
        left: 20,
        backgroundColor: "white",
        padding: 12,
        borderRadius: 10,
    },
    enclosingContainer: {
        flex: 1,
        backgroundColor: "#302736",
    },
    badOrGoodRep: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        padding: 10,
        backgroundColor: "white",
        // height: 50,
        alignSelf: 'stretch',
        alignContent: 'center',
        justifyContent: 'center',
    },
    title: { fontSize: 24, fontWeight: "bold" },
    detail: { fontSize: 18, marginTop: 10, color: "gray" },
});

export default DetailScreen;
