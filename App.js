import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, ScrollView } from 'react-native';
/*import RNFS from 'react-native-fs';*/
import { SearchBar, Header, List, ListItem } from 'react-native-elements'

import styles from './styles';
import dictionary from './data/A.nouns.json';
/*const dictionary = [
  {
    yupik: 'aaggaq',
    english: 'hand'
  },
  {
    yupik: 'aakaq',
    english: 'mother'
  },
  {
    yupik: 'aaluuyaaq',
    english: 'swing'
  },
  {
    yupik: 'aaggsak',
    english: 'starfish; decorated ceremonial glove'
  },
  {
    yupik: 'aanakellriit',
    english: 'the children of the household'
  }
];*/

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      search_text: "",
      words: dictionary,
    };
    
    this.onChangeSearchText = this.onChangeSearchText.bind(this);
  }
  
  onChangeSearchText(text) {
    let new_text = text.toLowerCase();
    let new_dictionary = dictionary.filter((item) => {
      return (item.yupik.toLowerCase().startsWith(new_text));
    });
    this.setState({
      search_text: new_text,
      words: new_dictionary
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Header 
          centerComponent={{text: 'Yuarcuun', style: { color: '#fff' } }}
          rightComponent={{ icon: 'menu', color: '#fff' }}
        />
        <SearchBar 
          lightTheme
          onChangeText={this.onChangeSearchText}
          placeholder="Search"
          icon={{ type: 'font-awesome', name: 'search' }}
        />
        <ScrollView>
          <List containerStyle={{marginBottom: 20}}>
            {
              this.state.words.map((item) => (
                <ListItem
                  key={item.yupik}
                  title={item.yupik}
                  subtitle={item.english}
                  hideChevron={true}
                />
              ))
            }
          </List> 
        </ScrollView>       
      </View>
    );
  }
}

