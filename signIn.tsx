import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colorTheme } from "./style/colors";
import { tInputTheme } from "./style/textInput";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

const SignIn = ({ navigation }: any) => {
  const [id, setId] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <AntDesign name="book" size={96} color="white" />
      </View>
      <View
        style={{
          backgroundColor: colorTheme.grey,
          borderRadius: 8,
          paddingVertical: 12,
        }}
      >
        <View style={styles.tInputView}>
          <TextInput
            value={id}
            placeholder="아이디를 입력해 주세요."
            style={tInputTheme}
          />
        </View>
        <View style={styles.tInputView}>
          <TextInput
            value={pwd}
            placeholder="비밀번호를 입력해 주세요."
            style={tInputTheme}
          />
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate("toDoList")}
        >
          <Text style={styles.loginText}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.loginBtn,
            backgroundColor: "#262729",
            marginBottom: 18,
          }}
          onPress={() => navigation.navigate("toDoList")}
        >
          <Text style={styles.loginText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorTheme.bg,
    paddingVertical: 100,
    paddingHorizontal: 20,
  },
  titleView: {
    alignItems: "center",
    marginBottom: 40,
  },
  tInputView: {
    marginHorizontal: 28,
  },
  title: {
    color: "white",
    fontSize: 60,
    fontWeight: "700",
  },
  loginBtn: {
    marginTop: 20,
    marginHorizontal: 28,
    padding: 16,
    backgroundColor: "#2d3033",
    borderRadius: 8,
    alignItems: "center",
  },
  loginText: {
    color: "white",
    fontSize: 28,
    fontWeight: "700",
  },
});
