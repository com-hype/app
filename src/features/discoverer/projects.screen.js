import {transform} from '@babel/core';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  Platform,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SwipeCards from './_components/swipeSystem/SwipeCards';
import {BlackButton, Paragraph, Title} from '../../components/atoms';
import ProjectCard from './_components/projectCard';
import {fetchProjects} from './projects.services';
import {useSelector} from 'react-redux';
import {selectToken} from '../authentication/user.redux';
import Loading from '../authentication/_components/loading';
import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

function StatusCard({text}) {
  return (
    <View>
      <Text style={styles.cardsText}>{text}</Text>
    </View>
  );
}

export default function ProjectsScreen() {
  const {navigate} = useNavigation();
  const [cards, setCards] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [currentCard, setCurrentCard] = useState({
    id: 0,
    name: '',
    title: '',
    description: '',
    avatar: 'https://picsum.photos/80',
  });
  const token = useSelector(selectToken);

  const getProjects = async () => {
    setLoading(true);
    const projects = await fetchProjects(token);
    if (projects.status === 'done') {
      setCards(projects.response);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
    return () => {
      setCards({});
    };
  }, []);

  function handleYup(card) {
    console.log(`Yup for ${card.text}`);
    return true;
  }
  function handleNope(card) {
    console.log(`Nope for ${card.text}`);
    return true;
  }

  return (
    <ScrollView
      scrollEnabled={scrollEnabled}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={getProjects} />
      }>
      <View style={styles.background}></View>
      <SafeAreaView style={styles.container}>
        {cards ? (
          <View style={styles.projectContainer}>
            <Title style={styles.name}>{currentCard.name}</Title>
            <SwipeCards
              onPressIn={() => setScrollEnabled(false)}
              onPressOut={() => setScrollEnabled(true)}
              cards={cards}
              renderCard={cardData => (
                <ProjectCard
                  key={cardData.id}
                  data={cardData}
                  index={cards.indexOf(cardData)}
                  isCurrent={currentCard === cardData}
                />
              )}
              keyExtractor={cardData => {
                return String(cardData.id);
              }}
              renderNoMoreCards={() => (
                <ProjectCard
                  data={{text: 'Plus aucun projet', backgroundColor: '#E8E4E4'}}
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
              currentCard={card => {
                if (cards[card]) setCurrentCard(cards[card]);
              }}
            />
            <ImageBackground
              style={styles.logo}
              source={{uri: currentCard.avatar}}></ImageBackground>
            <Paragraph
              style={styles.title}
              numberOfLines={1}
              ellipsizeMode="head">
              {currentCard.title}
            </Paragraph>
            <Paragraph
              style={styles.description}
              numberOfLines={3}
              ellipsizeMode="head">
              {currentCard.description}
            </Paragraph>
            <BlackButton
              size="large"
              textStyle={styles.btnText}
              onPress={() => navigate('ProjectDetails', {project: currentCard})}
              style={styles.btn}>
              Voir le détail
            </BlackButton>
          </View>
        ) : (
          <StatusCard text="Loading..." />
        )}
      </SafeAreaView>
    </ScrollView>
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
    height: Platform.OS === 'ios' ? height - 150 : height - 50,
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
    overflow: 'hidden',
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
