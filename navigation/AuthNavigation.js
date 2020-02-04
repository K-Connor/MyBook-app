import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Signup from "../screens/Auth/Signup";
import AuthHome from "../screens/Auth/AuthHome";

const AuthNavigation = createStackNavigator(
  {
    AuthHome,
    Signup
  },
  {
    navigationOptions: {
      cardStyle: { backgroundColor: "white" }
    },
    headerMode: "none"
  }
);

export default createAppContainer(AuthNavigation);
