import { TouchableOpacity, View } from "react-native";
import qs from "qs";
import { WebView } from "react-native-webview";
import axios from "axios";
import { useState } from "react";

const REST_API_KEY = "5dc50ab226c6121b6d5984501f093ece";
const REDIRECT_URI = "http://192.168.0.8:19003/oauth/kakao";
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('카카오 로그인')`;

const KakaoLogin = ({ navigation }: any) => {
  const [result, setResult] = useState<any>(null);

  return (
    <View className="flex-1">
      <WebView
        style={{ marginTop: 30, flex: 1 }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        onMessage={(event) => {
          const data = event.nativeEvent.url;
        }}
      />
      {/* <TouchableOpacity
        onPress={async () => {
          let result = await WebBrowser.openBrowserAsync(
            `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`
          );
          setResult(result);
        }}
      ></TouchableOpacity> */}
    </View>
  );
};
export default KakaoLogin;
