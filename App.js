import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, ScrollView } from 'react-native';
/*import RNFS from 'react-native-fs';*/
import { SearchBar, Header, List, ListItem, Button } from 'react-native-elements';
/*import { LazyloadScrollView } from 'react-native-lazyload';*/
import fuzzy from 'fuzzy';
import Icon from 'react-native-vector-icons/FontAwesome';
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
    let my_dictionary = dictionary.map((item) => {
      item.display = false;
      return item;
    });
    this.state = {
      search_text: "",
      words: my_dictionary,
      ypk2en: false,
    };

    this.onChangeSearchText = this.onChangeSearchText.bind(this);
    this.switchLanguage = this.switchLanguage.bind(this);
  }

  onChangeSearchText(text) {
    console.log("start filter");
    let new_text = text.toLowerCase();
    /*let options = { extract: function(item) {
      if (this.state.ypk2en) {
        return item.yupik.toLowerCase();
      }
      else {
        return item.english.toLowerCase();
      }
    }};
    let new_dictionary = fuzzy.filter(new_text, dictionary, options).map(function(item) => {
      r.original.display = true;
      return r.original;
    });*/
    let new_dictionary = dictionary.filter((item) => {
      if (text.length > 0) {
        let compare = '';
        if (this.state.ypk2en) {
          compare = item.yupik;
        }
        else {
          compare = item.english;
        }
        item.display = compare.toLowerCase().includes(new_text);
      }
      else {
        item.display = false;
      }
      return item;
    });
    console.log("end filter");
    this.setState({
      search_text: new_text,
      words: new_dictionary
    });
  }

  switchLanguage(e) {
    console.log(e);
  }

  render() {
    console.log(this.state.search_text.length);
    let language = this.state.ypk2en ? 'YPK to EN' : 'EN to YPK';
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{icon: 'help', color: 'white'}}
          centerComponent={{text: 'Yuarcuun - Dictionary ' + language, style: { color: '#fff' } }}
          rightComponent={{ icon: 'menu', color: '#fff' , onPress: this.switchLanguage}}
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
              this.state.words.map((item) => {
                if (item.display) {
                  if (this.state.ypk2en) {
                    return (
                      <ListItem
                        key={item.yupik}
                        title={item.yupik}
                        subtitle={item.english}
                        hideChevron={true}
                      />
                    );
                  }
                  else {
                    return (
                      <ListItem
                        key={item.yupik}
                        title={item.english}
                        subtitle={item.yupik}
                        hideChevron={true}
                      />
                    );
                  }
                }
              })
            }
          </List>
        </ScrollView>
      </View>
    );
  }
}
