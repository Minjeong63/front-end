import { View } from "react-native";
import qs from "qs";
import { WebView } from "react-native-webview";
import axios from "axios";

const REST_API_KEY = "5dc50ab226c6121b6d5984501f093ece";
const REDIRECT_URI = "http://192.168.0.8:19003/oauth/kakao";
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('카카오 로그인')`;

const KakaoLogin = ({ navigation }: any) => {
  const getCode = async (target: string) => {
    const exp = "code=";
    const condition = target.indexOf(exp);
    if (condition !== -1) {
      const requestCode = target.substring(condition + exp.length);
      await requestToken(requestCode);
      //   const data = await axios.post("http://192.168.0.8:19003/oauth/kakao", {
      //     requestCode,
      //   });
    }
  };

  const requestToken = async (code: string) => {
    const requestTokenUrl = "https://kauth.kakao.com/oauth/token";
    const options = qs.stringify({
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code,
    });

    // try {
    const tokenResponse = await axios.post(requestTokenUrl, options);

    const ACCESS_TOKEN = tokenResponse.data.access_token;
    const body = {
      ACCESS_TOKEN,
    };
    console.log("123");
    const response = await axios
      .post(REDIRECT_URI + "/callback", body)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    console.log("1234", response);
    //   const result = await storeUser(value);
    //   if (result === "stored") {
    //     const user = await getData("user");
    //     dispatch(read_S(user));
    //     await navigation.navigate("Main");
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
    return response;
  };

  return (
    <View className="flex-1">
      <WebView
        // originWhitelist={["*"]}
        // scalesPageToFit={false}
        style={{ marginTop: 30, flex: 1 }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        onMessage={(event) => {
          const data = event.nativeEvent.url;
          console.log("zzz", data);
          getCode(data);
        }}
      />
    </View>
  );
};
export default KakaoLogin;
