import { StatusBar } from "expo-status-bar";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colorTheme } from "./style/colors";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fontisto } from "@expo/vector-icons";
import { tInputTheme } from "./style/textInput";

/**
 * asyncstorage key값
 */
const STORAGE_KEY = "@toDos";

export default function ToDoList() {
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

  /**
   * 할 일 삭제하는 함수
   * @param key 할 일을 추가한 시간
   */
  const deleteToDo = (key: string) => {
    Alert.alert("정말 삭제하시겠습니까?", "", [
      {
        text: "아니오",
        // style은 ios에서만 가능
        style: "destructive",
      },
      {
        text: "예",
        onPress: async () => {
          // const newToDos = Object.keys(toDos).map((el) => el !== key && toDos[el]);
          const newToDos = { ...toDos };
          delete newToDos[key];

          setToDos(newToDos);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newToDos));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{
              ...styles.btnText,
              color: working ? "white" : colorTheme.grey,
            }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? "white" : colorTheme.grey,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tInputView}>
        <TextInput
          onChangeText={onChangeText}
          onSubmitEditing={addToDo}
          returnKeyType="done"
          value={text}
          placeholder={
            working ? "할 일을 추가해 보세요." : "어디로 가고 싶나요?"
          }
          style={tInputTheme}
        />
      </View>
      <ScrollView>
        {toDos &&
          Object.keys(toDos).map(
            (key: string) =>
              toDos[key].working === working && (
                <View style={styles.toDo} key={key}>
                  <Text style={styles.toDoText}>{toDos[key]["text"]}</Text>
                  <TouchableOpacity onPress={() => deleteToDo(key)}>
                    <Fontisto name="trash" size={24} color="white" />
                  </TouchableOpacity>
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
    backgroundColor: colorTheme.bg,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 28,
  },
  btnText: {
    fontSize: 48,
    fontWeight: "700",
  },
  tInputView: {
    marginBottom: 20,
  },
  toDo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colorTheme.grey,
    marginBottom: 20,
    padding: 16,
    borderRadius: 4,
  },
  toDoText: { color: "white", fontSize: 16, fontWeight: "500" },
});
