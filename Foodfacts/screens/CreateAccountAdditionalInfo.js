import { useContext, useState } from "react";
import { View, TextInput, Text, Button } from "react-native";
import { GlobalStyles } from "../GlobalStyles";
import { Picker } from "@react-native-picker/picker";
import { UserContext } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
// import RNPickerSelect from 'react-native-picker-select';

export const CreateAccountAdditionalInfo = () => {
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigation = useNavigation();
  const { user, setCompletedLogin } = useContext(UserContext);

  const updateDetails = async () => {
    try {
      console.log("UpdateDetails");
      const req = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/users`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
        body: JSON.stringify({
          name,
          lastName,
          sex,
          age,
          weight,
          height,
        }),
      });
      if (req.ok) setCompletedLogin(true);
    } catch (e) {
      alert(e);
    }
  };
  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.heading}>Let's confirm a few things...</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={(text) => setAge(text)}
        placeholder="Name"
      />
      <TextInput
        style={GlobalStyles.input}
        value={age}
        onChangeText={(text) => setAge(text)}
        placeholder="Last Name"
      />
      <Text>Sex:</Text>
      <Picker
        selectedValue={sex}
        onValueChange={(itemValue, itemIndex) => setSex(itemValue)}
      >
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="N/A" value="n/a" />
      </Picker>
      <TextInput
        // style={styles.input}
        value={age}
        onChangeText={(text) => setAge(text)}
        placeholder="Age"
      />
      <TextInput
        // style={styles.input}
        value={weight}
        onChangeText={(text) => setWeight(text)}
        placeholder="Weight"
      />
      <TextInput
        // style={styles.input}
        value={height}
        onChangeText={(text) => setHeight(text)}
        placeholder="Height"
      />
      <Button title="Confirm Details" onClick={() => console.log("IDK")} />
    </View>
  );
};
