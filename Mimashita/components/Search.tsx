import React from "react";
import { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SectionList,
  Button
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface Props {
  addPlanToWatch: any;
  addWatched: any;
}
interface State {}

const data = [
  {
    initial: "A",
    data: [
      {
        animeTitle: "Albator",
        seasons: [{ seasonNumber: "1", nbOfEpisodes: "12" }]
      },
      {
        animeTitle: "Angel beats",
        seasons: [{ seasonNumber: "1", nbOfEpisodes: "13" }]
      }
    ]
  },
  {
    initial: "F",
    data: [
      {
        animeTitle: "Fullmetal Alchemist",
        seasons: [
          { seasonNumber: "1", nbOfEpisodes: "24" },
          { seasonNumber: "2", nbOfEpisodes: "24" }
        ]
      },
      {
        animeTitle: "Full moon",
        seasons: [{ seasonNumber: "1", nbOfEpisodes: "24" }]
      }
    ]
  },
  {
    initial: "N",
    data: [{ animeTitle: "Naruto", seasons: []}, { animeTitle: "Nanatsu no taizai", seasons: [] }]
  },
  {
    initial: "S",
    data: [
      { animeName: "SAO", seasons: [] },
      { animeName: "Shingeki no kyojin", seasons: []  },
      { animeName: "Shaman king", seasons: []  },
      { animeName: "Steins gate", seasons: []  }
    ]
  }
];

export default class Search extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { inputValue: "", matchingAnime: data };
    this.searchMatchingAnime = this.searchMatchingAnime.bind(this);
    this.addToPlanToWatch = this.addToPlanToWatch.bind(this);
    this.addToWatched = this.addToWatched.bind(this);
  }

  searchMatchingAnime(inputValue: string) {
    if (inputValue != "") {
      // Recherche parmis la BDD la liste des animés commençant par le titre de la recheche
      // A modifier !
      let newData = data.find(
        (section: object) => inputValue[0].toUpperCase() == section.title
      );
      // Si on trouve des résultats
      if (newData) {
        // Chercher les noms d'animés commançant EXACTEMENT par la recheche de l'user
        newData.data = newData.data.filter((animeTitle: string) => {
          const myRegex = new RegExp("^" + inputValue, "i");
          return myRegex.test(animeTitle);
        });
        this.setState({ matchingAnime: [newData] });
      } else {
        // Sinon dire qu'on a pas trouvé de résultat
        this.setState({
          matchingAnime: [
            { initial: "", data: ["No anime matches your search, sorry ..."] }
          ]
        });
      }
      // Si la recheche est vide, afficher toute la listes des animés
    } else {
      this.setState({ matchingAnime: data });
    }
  }

  addToPlanToWatch(anime: string) {
    this.props.addPlanToWatch(anime);
  }

  addToWatched(anime: string) {
    this.props.addToWatched(anime);
  }

  render() {
    return (
      <View>
        <TextInput
          style={styles.searchInput}
          placeholder="Tap a anime name !"
          onChangeText={inputValue => this.searchMatchingAnime(inputValue)}
        />

        <SectionList
          sections={this.state.matchingAnime}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.initial}</Text>
          )}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item}</Text>
              <View style={styles.itemIcons}>
                <Icon.Button
                  name="plus-square"
                  backgroundColor="#900"
                  onPress={() => this.addToPlanToWatch(item)}
                  borderRadius={0}
                  backgroundColor="#242424"
                  color="#900"
                />
                <Icon.Button
                  name="eye"
                  backgroundColor="#900"
                  onPress={() => this.addToWatched(item)}
                  borderRadius={0}
                  backgroundColor="#242424"
                  color="#900"
                />
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    backgroundColor: "white"
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)"
  },
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    fontSize: 15,
    height: 44
  },
  itemText: {
    flex: 2,
    color: "white"
  },
  itemIcons: {
    flex: 1,
    height: 40,
    justifyContent: "space-between",
    flexDirection: "row"
  }
});
