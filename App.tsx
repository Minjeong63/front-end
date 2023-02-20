import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { theme } from "./colors";
import { useState } from "react";

export default function App() {
  const [working, setWorking] = useState<boolean>(true);
  const [text, setText] = useState<string>("");
  const [toDos, setToDos] = useState<Object>({});

  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload: string) => setText(payload);
  const addToDo = () => {
    if (!text) return;
    else {
      const newToDos = Object.assign({}, toDos, {
        [Date.now()]: { text, work: working },
      });
      setToDos(newToDos);
      setText("");
    }
  };
  console.log(toDos);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{ ...styles.btnText, color: working ? "white" : theme.grey }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? "white" : theme.grey,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        onChangeText={onChangeText}
        onSubmitEditing={addToDo}
        returnKeyType="done"
        value={text}
        placeholder={working ? "할 일을 추가해 보세요." : "어디로 가고 싶나요?"}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "700",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 20,
    fontSize: 18,
  },
});
