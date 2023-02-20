# React Native - MemoList (여행)

## 개발환경 설정

터미널을 켜서 폴더를 생성하고 싶은 위치로 이동한 후
expo init reactnative_memolist 를 입력하면
해당 위치에 reractnative_memolist 폴더가 생성됨 (blank - typescript로 생성)

### Button Component (Touchable)

##### TouchableOpacity

누르는 이벤트를 listen할 준비가 된 view라고 할 수 있음, opacity가 있는 이유는 눌렀을 때 애니메이션 효과가 있기 때문

##### TouchableHighlight

- TouchableOpacity보다 더 많은 속성을 가짐, 내가 요소를 클릭했을 때 배경색이 바뀌도록 해줌
- onPress는 유저가 Touchable을 눌렀을 때 실행되는 이벤트를 말함
- underlayColor를 지정해야 버튼을 눌렀을 때 색깔이 보임

##### TouchableWithoutFeedback

- 화면의 가장 위에서 일어나는 탭 이벤트를 listen 하는 것
- 하지만 그래픽이나 다른 UI 반응은 보여주지 않음

##### Pressable

- TouchableWithoutFeedback이랑 비슷함
- 추가적인 옵션을 더 가지고 있어서 좀 더 섬세한 설정이 가능

### TextInput

- keyboardType : 키보드 타입 지정
- onChangeText : text가 바꼈는지 확인하는 함수
- returnKeyType : 키보드에서 입력하는 부분의 모양과 유형을 바꿀 수 있음
- secureTextEntry : 비밀번호에 input에 사용
- multiline : 메모장 같이 여러줄을 입력할 때 사용
- placeholderTextColor : placeholder text 색깔 바꿀 수 있음
