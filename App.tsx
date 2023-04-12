/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useReducer} from 'react';

import {
  StyleSheet,
  View,
  Pressable,
  Text,
  LayoutChangeEvent,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';
import Screen3 from './screens/Screen3';
import Screen4 from './screens/Screen4';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Svg, Path, Text as SvgText, TextPath} from 'react-native-svg';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

type RouteTabParamList = {
  Screen1: undefined;
  Screen2: undefined;
  Screen3: undefined;
  Screen4: undefined;
};
const Tab = createBottomTabNavigator<RouteTabParamList>();
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={props => <AnimatedTabBar {...props} />}
        screenOptions={{headerShown: false}}>
        <Tab.Screen name="Screen1" component={Screen1} />
        <Tab.Screen name="Screen2" component={Screen2} />
        <Tab.Screen name="Screen3" component={Screen3} />
        <Tab.Screen name="Screen4" component={Screen4} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const AnimatedTabBar = ({
  state: {index: activeIndex, routes},
  navigation,
  descriptors,
}: BottomTabBarProps) => {
  const {bottom} = useSafeAreaInsets();

  /* Get the information about the component position on screen */
  const reducer = (state: any, action: {x: number; index: number}) => {
    return [...state, {x: action.x, index: action.index}];
  };
  const [layout, dispatch] = useReducer(reducer, []);
  console.log(layout);

  const handleLayout = (even: LayoutChangeEvent, index: number) => {
    dispatch({x: even.nativeEvent.layout.x, index});
  };
  // Animation
  const xOffset = useDerivedValue(() => {
    if (layout.length !== routes.length) return 0;

    return [...layout].find(({index}) => index === activeIndex)!.x - 25;
  }, [activeIndex, layout]);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(xOffset.value, {duration: 250}),
        },
      ],
    };
  });
  return (
    <View style={[styles.tabBar, {paddingBottom: bottom + 12}]}>
      <AnimatedSvg
        width={110}
        height={60}
        fill="none"
        viewBox="0 0 110 60"
        style={[styles.activeBackground, animatedStyle]}>
        <Path
          fill="#F1F1F1"
          d="M20 0H0c11.046 0 20 8.954 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.046 8.954-20 20-20H20z"
        />
      </AnimatedSvg>
      <View style={styles.tabBarContainer}>
        {routes.map((route, index) => {
          const active = index === activeIndex;
          return (
            <TabBarComponent
              name={route.name}
              key={route.key}
              active={active}
              onLayout={e => handleLayout(e, index)}
              onPress={() => navigation.navigate(route.name)}
            />
          );
        })}
      </View>
    </View>
  );
};
type TabBarComponentProps = {
  onPress: () => void;
  onLayout: (e: LayoutChangeEvent) => void;
  active: boolean;
  name: string;
};
const TabBarComponent = ({
  onPress,
  onLayout,
  active,
  name,
}: TabBarComponentProps) => {
  const animatedComponentCircleStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withTiming(active ? 1 : 0, {duration: 250}),
      },
    ],
  }));
  const animatedIconContainerStyle = useAnimatedStyle(() => ({
    opacity: withTiming(active ? 1 : 0.5, {duration: 250}),
  }));
  const animatedTextContainerStyle = useAnimatedStyle(() => ({
    opacity: withTiming(active ? 1 : 0, {duration: 250}),
    transform: [
      {rotateZ: withTiming(active ? '0deg' : '-120deg', {duration: 250})},
    ],
  }));
  return (
    <Pressable onPress={onPress} style={styles.component} onLayout={onLayout}>
      <Animated.View
        style={[styles.componentCircle, animatedComponentCircleStyle]}
      />
      <Animated.View style={[styles.iconContainer, animatedIconContainerStyle]}>
        {/* @ts-ignore */}
        <Text style={{color: active ? 'white' : '#122B65'}}>?</Text>
      </Animated.View>
      <AnimatedSvg
        style={[styles.componentName, animatedTextContainerStyle]}
        width={60}
        height={70}>
        <Path d="M0,40 A30,30 0 1 1 60,40" fill="transparent" id="curve" />
        <SvgText y={-2} x={12} fontSize={14} fontFamily="System" fill="#122B65">
          <TextPath href="#curve" startOffset={10}>
            Booking
          </TextPath>
        </SvgText>
      </AnimatedSvg>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  tabBar: {
    backgroundColor: 'white',
    elevation: 10,
  },
  activeBackground: {
    position: 'absolute',
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  component: {
    width: 60,
    height: 60,
    marginTop: -5,
  },
  componentCircle: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: '#122B65',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 36,
    width: 36,
  },
  componentName: {
    position: 'absolute',
    top: -15,
  },
});

export default App;
