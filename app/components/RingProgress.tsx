import { Text, View } from "react-native";
import Svg, { Circle, CircleProps, Path, ForeignObject } from "react-native-svg";
import Animated, { useAnimatedProps, withTiming, useSharedValue, withSequence, useDerivedValue, interpolateColor } from 'react-native-reanimated';
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedHeart = Animated.createAnimatedComponent(Path)
const AnimatedHeartContainer = Animated.createAnimatedComponent(Svg)
const BASE = '#0B8758'

type RingProps = {
    radius?: number;
    strokeWidth?: number;
    progress?: number
}


const Ring = ({ radius = 150, strokeWidth = 40
    , progress = 0.3 }: RingProps) => {
    const innerRadius = radius - strokeWidth / 2;
    const circumfrence = innerRadius * 2 * Math.PI;
    const fill = useSharedValue(0)
    const scale = useSharedValue(1)
    const color = useDerivedValue(() => {
        let newColor =
            progress < 0.3 ? "#ef233c" :
                progress < 0.6 ? "#ffb703" :
                    BASE;
        return withTiming(
            newColor, { duration: 100 }
        );
    }, [progress]);
    const animatedProps = useAnimatedProps(() => ({
        strokeDasharray: [circumfrence * fill.value, circumfrence],
        stroke: color.value
    }))

    const animatedPropsHeart = useAnimatedProps(() => ({
        fill: color.value,
        transform: [{ scale: scale.value }]
    }))
    const animatedPropsHeartContainer = useAnimatedProps(() => ({
        fill: color.value,
    }))
    const circleDefaultValues: CircleProps = {
        r: innerRadius,
        cx: radius,
        cy: radius,
        originX: radius,
        originY: radius,
        strokeWidth: strokeWidth,
        strokeLinecap: "round",
        fill: "transparent"

    }
    useEffect(() => {
        fill.value = withTiming(progress, { duration: 1200 })

        scale.value = withSequence(
            withTiming(1.3, { duration: 200 }),
            withTiming(.8, { duration: 200 }),
            withTiming(1, { duration: 200 })
        )
    }, [progress])

    return (
        <View style={{ width: radius * 2, height: radius * 2, alignSelf: 'center', marginBottom: 60, }} >
            <Svg height={radius * 2} width={radius * 2} viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
                <Circle {...circleDefaultValues} stroke={'#e1e1e1'} opacity={0.5} />

                <AnimatedCircle animatedProps={animatedProps} {...circleDefaultValues} rotation={'-90'} />
                <ForeignObject x={radius - 25}
                    y={radius - 25}
                >

                    <AnimatedHeartContainer
                        height={100}
                        animatedProps={animatedPropsHeartContainer}
                        width={100}
                        viewBox="0 0 50 50"
                    >
                        <AnimatedHeart
                            animatedProps={animatedPropsHeart}
                            strokeLinecap="round"
                            strokeWidth={1.5}
                            d="M19.463 3.994c-2.682-1.645-5.023-.982-6.429.074-.576.433-.864.65-1.034.65-.17 0-.458-.217-1.034-.65-1.406-1.056-3.747-1.719-6.429-.074-3.519 2.159-4.315 9.28 3.803 15.29C9.886 20.427 10.659 21 12 21c1.341 0 2.114-.572 3.66-1.717 8.118-6.008 7.322-13.13 3.803-15.289Z"
                        />
                    </AnimatedHeartContainer>
                </ForeignObject>
            </Svg>
            <AntDesign
            
            name="arrowright"
            size={strokeWidth * .8}
            color={'#fff'}
            style={{position: 'absolute' , alignSelf: 'center', top: strokeWidth * .1}}
            />
            <Text style={{ alignSelf: 'center', margin: 20 }}>{progress < .3 ? 'Uh Oh! this looks bad ' : progress < .6 ? 'Come on You can do better than this' : 'Whew! Looking Good'}</Text>
        </View>
    )
}


export default Ring;