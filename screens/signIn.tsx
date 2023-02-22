import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

const SignIn = ({ navigation }: any) => {
  const [id, setId] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");

  return (
    <View className="flex-1 bg-black py-36 px-6">
      <View className="items-center mb-20">
        <AntDesign name="book" size={96} color="white" />
      </View>
      <View className="bg-neutral-700 rounded py-4">
        <View className="mx-8">
          <TextInput
            value={id}
            placeholder="아이디를 입력해 주세요."
            className="bg-white py-4 px-4 rounded my-4 text-xl"
          />
        </View>
        <View className="mx-8">
          <TextInput
            value={pwd}
            placeholder="비밀번호를 입력해 주세요."
            className="bg-white py-4 px-4 rounded my-4 text-xl"
          />
        </View>
        <TouchableOpacity
          className="mt-4 mx-8 p-4 bg-neutral-800 rounded-lg items-center"
          onPress={() => navigation.navigate("toDoList")}
        >
          <Text className="text-white text-3xl font-bold">로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="mt-4 mx-8 p-4 bg-neutral-800 rounded-lg items-center mb-8"
          onPress={() => navigation.navigate("toDoList")}
        >
          <Text className="text-white text-3xl font-bold">회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SignIn;
