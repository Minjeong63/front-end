import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "./colors";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * asyncstorage key값
 */
const STORAGE_KEY = "@toDos";

export default function App() {
  const [working, setWorking] = useState<boolean>(true);
  const [text, setText] = useState<string>("");
  const [toDos, setToDos] = useState<any>({});

  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload: string) => setText(payload);

  useEffect(() => {
    loadToDos();
  }, []);

  /**
   * asyncstorage에 데이터 저장하는 함수
   * @param toSave 저장할 데이터
   */
  const saveToDos = async (toSave: any) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      alert("storage 저장 실패");
    }
  };

  /**
   * asyncstorage에 있는 데이터 불러오는 함수
   */
  const loadToDos = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      data ? setToDos(JSON.parse(data)) : null;
    } catch (e) {
      alert("storage 불러오기 실패");
    }
  };

  /**
   * 할 일 추가하는 함수
   * @returns
   */
  const addToDo = async () => {
    if (!text) return;
    else {
      // const newToDos = Object.assign({}, toDos, {
      //   [Date.now()]: { text, work: working },
      // });
      const newToDos = { ...toDos, [Date.now()]: { text, working } };
      setToDos(newToDos);
      await saveToDos(newToDos);
      setText("");
    }
  };

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
      <ScrollView>
        {toDos &&
          Object.keys(toDos).map(
            (key: string) =>
              toDos[key].working === working && (
                <View style={styles.toDo} key={key}>
                  <Text style={styles.toDoText}>{toDos[key]["text"]}</Text>
                </View>
              )
          )}
      </ScrollView>
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
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.grey,
    marginBottom: 12,
    padding: 16,
    borderRadius: 4,
  },
  toDoText: { color: "white", fontSize: 16, fontWeight: "500" },
});
