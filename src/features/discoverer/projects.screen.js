import {transform} from '@babel/core';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SwipeCards from './_components/swipeSystem/SwipeCards';
import {BlackButton, Paragraph, Title} from '../../components/atoms';
import ProjectCard from './_components/projectCard';

const {height, width} = Dimensions.get('window');

function StatusCard({text}) {
  return (
    <View>
      <Text style={styles.cardsText}>{text}</Text>
    </View>
  );
}

export default function ProjectsScreen() {
  const [cards, setCards] = useState();
  const [currentCard, setCurrentCard] = useState();

  // replace with real remote data fetching
  useEffect(() => {
    setCards([
      {text: 'Tomato', backgroundColor: 'red'},
      {text: 'Aubergine', backgroundColor: 'purple'},
      {text: 'Courgette', backgroundColor: 'green'},
      {text: 'Blueberry', backgroundColor: 'blue'},
      {text: 'Umm...', backgroundColor: 'cyan'},
      {text: 'orange', backgroundColor: 'orange'},
      {text: 'Tomato', backgroundColor: 'red'},
      {text: 'Aubergine', backgroundColor: 'purple'},
      {text: 'Courgette', backgroundColor: 'green'},
      {text: 'Blueberry', backgroundColor: 'blue'},
      {text: 'Umm...', backgroundColor: 'cyan'},
      {text: 'orange', backgroundColor: 'orange'},
      {text: 'Tomato', backgroundColor: 'red'},
      {text: 'Aubergine', backgroundColor: 'purple'},
      {text: 'Courgette', backgroundColor: 'green'},
      {text: 'Blueberry', backgroundColor: 'blue'},
      {text: 'Umm...', backgroundColor: 'cyan'},
      {text: 'orange', backgroundColor: 'orange'},
    ]);
  }, []);

  function handleYup(card) {
    console.log(`Yup for ${card.text}`);
    return true; // return false if you wish to cancel the action
  }
  function handleNope(card) {
    console.log(`Nope for ${card.text}`);
    return true;
  }
  function handleMaybe(card) {
    console.log(`Maybe for ${card.text}`);
    return true;
  }

  function handleOnclick(card) {
    console.log(`Clicked on ${card.text}`);
  }

  return (
    <React.Fragment>
      <View style={styles.background}></View>
      <SafeAreaView style={styles.container}>
        {cards ? (
          <View style={styles.projectContainer}>
            <Title style={styles.name}>BELORDER</Title>
            <SwipeCards
              cards={cards}
              renderCard={cardData => (
                <ProjectCard
                  data={cardData}
                  index={cards.indexOf(cardData)}
                  isCurrent={currentCard === cardData}
                />
              )}
              keyExtractor={cardData => {
                return String(cardData.text);
              }}
              renderNoMoreCards={() => (
                <ProjectCard
                  data={{text: 'Plus aucun projet', backgroundColor: 'orange'}}
                  index={0}
                  isCurrent={true}
                />
              )}
              smoothTransition={true}
              stack={true}
              stackDepth={3}
              stackOffsetX={0}
              stackOffsetY={-15}
              hasMaybeAction={false}
              actions={{
                nope: {
                  onAction: handleNope,
                },
                yup: {
                  onAction: handleYup,
                },
              }}
              currentCard={card => setCurrentCard(cards[card])}
            />
            <ImageBackground style={styles.logo}></ImageBackground>
            <Paragraph style={styles.title}>
              Plateforme de marketing local
            </Paragraph>
            <Paragraph style={styles.description}>
              De nouvelles opportunités pour les agences, régies et annonceurs
              pour repenser et optimiser leur communication locale.
            </Paragraph>
            <BlackButton
              size="large"
              textStyle={styles.btnText}
              style={styles.btn}>
              Voir le détail
            </BlackButton>
          </View>
        ) : (
          <StatusCard text="Loading..." />
        )}
      </SafeAreaView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',

    marginTop: 10,
  },
  projectContainer: {
    alignItems: 'center',
    maxHeight: height - 100,
    paddingHorizontal: 24,
    height: height,
  },
  name: {
    color: '#fff',
    marginBottom: 20,
  },
  logo: {
    height: 78,
    width: 78,
    borderRadius: 40,
    backgroundColor: '#000',
    marginTop: 20,
  },
  title: {
    color: '#767676',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    textTransform: 'uppercase',
    marginTop: 40,
  },
  description: {
    color: '#767676',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  btn: {
    width: width - 48,
    position: 'absolute',
    bottom: 0,
  },
  btnText: {
    fontSize: 14,
  },
  background: {
    height: height / 2,
    width: '100%',
    backgroundColor: '#000',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
