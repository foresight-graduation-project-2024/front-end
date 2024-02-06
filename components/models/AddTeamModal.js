import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Dropdown from '../custom/Dropdown';

const AddTeamModal = (props) => {
  const [teamName, setTeamName] = useState("");
  const [synonym, setSynonym] = useState("");
  const initialDropdownState = {
    teamLeader: { isVisible: false, selected: props.members[0] || "" },
    members: { isVisible: false, selected: props.members[0] || "" },
  };
  const [dropdowns, setDropdowns] = useState(initialDropdownState);

  const toggleDropdown = (name) => {
    setDropdowns((prevState) => ({
      ...initialDropdownState,
      [name]: { ...prevState[name], isVisible: !prevState[name].isVisible },
    }));
  };

  const selectItem = (name, item) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name], isVisible: false, selected: item },
    }));
  };

  return (
    <Modal
      animationType="slide"
      style={styles.modal}
      visible={props.showModal}
      onRequestClose={props.closeModal}
      onBackdropPress={props.closeModal}
    >
      <View style={styles.modalView}>
        <View style={styles.modalContent}>
          <View style={styles.inputWidth}>
            <Input
              label="Team name"
              value={teamName}
              onUpdateValue={(text) => setTeamName(text)}
              borderColor={Colors.lightGrey}
            />
          </View>
          <View style={styles.inputWidth}>
            <Input
              label="Synonym"
              value={synonym}
              onUpdateValue={(text) => setSynonym(text)}
              borderColor={Colors.lightGrey}
              multiline={true}
              maxLength={5}
            />
          </View>

          <Dropdown
            isVisible={dropdowns.teamLeader.isVisible}
            toggleHandler={() => toggleDropdown("teamLeader")}
            items={props.members}
            selectItemHandler={(item) => selectItem("teamLeader", item)}
            label="Team leader"
            selectedItem={dropdowns.teamLeader.selected}
            labelMarginRight={-36}
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "rgba(0,0,0,0.5)",
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    width: "96%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingVertical: 16,
  },
  inputWidth: { 
    width: "90%" 
  },
})

export default AddTeamModal
