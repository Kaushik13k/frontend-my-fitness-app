import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  navBar: {
    marginBottom: 20,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderBottomColor: '#E8E8E8',
  },
  navTitle: {
    flex: 1,
    fontSize: 22,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    right: 15,
    bottom: 10,
  },
  addButtonText: {
    fontSize: 36,
    color: '#ffcc02',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    elevation: 5,
  },
  tooltipText: {
    fontSize: 10,
  },
  container: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  historyList: {
    top: '1%',
    height: '29%',
  },
  historyText: {
    margin: 2,
    fontSize: 20,
    left: '40%',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f8f8f8',
  },
  dateText: {
    fontSize: 16,
  },
  valueText: {
    fontSize: 16,
  },
  noDataView: {
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 20,
  },
});
