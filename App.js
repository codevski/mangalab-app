import { AppLoading, SplashScreen, Updates } from "expo";
import { Asset } from "expo-asset";
import Constants from "expo-constants";
import React from "react";
import { Animated, Button, StyleSheet, Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Kaomoji from "./components/Kaomoji";

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHide();

function LibraryScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1b1b1b",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "#ffffff",
          fontSize: 30,
          marginBottom: 15,
          fontWeight: "bold",
        }}
      >
        <Kaomoji />
      </Text>
      <Text
        style={{
          color: "#6d6d6d",
          fontSize: 10,
          marginBottom: 15,
          fontWeight: "bold",
        }}
      >
        Your library is empty, add series to your library from Browse
      </Text>
      {/* <Button title="Run Again" onPress={() => Updates.reload()} />
      <Button onPress={navigation.openDrawer} title="Open navigation drawer" />
      <Button
        onPress={() => navigation.navigate("Notifications")}
        title="Go to notifications"
      /> */}
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={navigation.openDrawer} title="Open navigation drawer" />
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <AnimatedAppLoader image={{ uri: Constants.manifest.splash.image }}>
      <MainScreen />
    </AnimatedAppLoader>
  );
}

function AnimatedAppLoader({ children, image }) {
  const [isSplashReady, setSplashReady] = React.useState(false);

  const startAsync = React.useMemo(
    // If you use a local image with require(...), use `Asset.fromModule`
    () => () => Asset.fromURI(image).downloadAsync(),
    [image]
  );

  const onFinish = React.useMemo(() => setSplashReady(true), []);

  if (!isSplashReady) {
    return (
      <AppLoading
        startAsync={startAsync}
        onError={console.error}
        onFinish={onFinish}
      />
    );
  }

  return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>;
}

function AnimatedSplashScreen({ children, image }) {
  const animation = React.useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = React.useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = React.useState(
    false
  );

  React.useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  const onImageLoaded = React.useMemo(() => async () => {
    SplashScreen.hide();
    try {
      // Load stuff
      await Promise.all([]);
    } catch (e) {
      // handle errors
    } finally {
      setAppReady(true);
    }
  });

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: Constants.manifest.splash.backgroundColor,
              opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: Constants.manifest.splash.resizeMode || "contain",
              transform: [
                {
                  scale: animation,
                },
              ],
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
}

const DefaultStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

function MainScreen() {
  return (
    <NavigationContainer>
      {/* <Drawer.Navigator
        initialRouteName="Home"
        drawerStyle={{
          backgroundColor: "#424242",
          width: 240,
        }}
      >
        <Drawer.Screen name="Library" component={LibraryScreen} />
        <Drawer.Screen name="Updates" component={NotificationsScreen} />
        <Drawer.Screen name="History" component={NotificationsScreen} />
        <Drawer.Screen name="Browse" component={NotificationsScreen} />
      </Drawer.Navigator> */}
      <Tabs.Navigator
        tabBarOptions={{
          activeTintColor: "#ffffff",
          style: {
            backgroundColor: "#424242",
            borderTopColor: "transparent",
          },
        }}
      >
        <DefaultStack.Screen
          name="Library"
          component={LibraryScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialCommunityIcons
                name={focused ? "book-multiple" : "book-multiple"}
                color={color}
                size={size}
              />
            ),
          }}
        />
        <DefaultStack.Screen
          name="Updates"
          component={NotificationsScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialCommunityIcons
                name={focused ? "alert-octagram" : "alert-octagram-outline"}
                color={color}
                size={size}
              />
            ),
          }}
        />
        <DefaultStack.Screen
          name="History"
          component={NotificationsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="history"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <DefaultStack.Screen
          name="Browse"
          component={NotificationsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="apple-safari"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <DefaultStack.Screen
          name="More"
          component={NotificationsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="dots-horizontal"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tabs.Navigator>
      {/* <DefaultStack.Navigator headerMode="float">
        <DefaultStack.Screen
          name="Library"
          component={LibraryScreen}
          options={{
            title: "Library",
            headerStyle: {
              backgroundColor: "#1b1b1b",
              shadowColor: "transparent",
              elevation: 0,
            },
            rashadowOffset: { height: 0, width: 0 },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </DefaultStack.Navigator> */}
    </NavigationContainer>
  );
}
