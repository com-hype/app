import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  DescriptionLabel,
  InputLine,
  Paragraph,
  SubTitle,
  Title,
} from '../../../components/atoms';
import {useNavigation} from '@react-navigation/native';
import Header from '../project-details/_components/header';
import ConfirmPayment from './_components/confirm-payment';
import Payment from './_components/payment';
import Loading from '../../../components/templates/loading';
import {fetchCrowdfundingProject} from '../projects.services';
import {useSelector} from 'react-redux';
import {selectToken} from '../../authentication/user.redux';
import * as Animatable from 'react-native-animatable';

const {width} = Dimensions.get('window');

export default function ProjectCrowfundingScreen({route}) {
  const {info} = route.params.project;
  const token = useSelector(selectToken);
  const navigation = useNavigation();
  const [amount, setAmount] = useState(0);
  const [openConfirmPayment, setOpenConfirmPayment] = useState(false);
  const [crowdfunding, setCrowdfunding] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPercentage = () => {
    const total = Number(crowdfunding.goal);
    const current = Number(crowdfunding.amount);
    const percentage = (current / total) * 100;
    return Math.round(percentage);
  };

  const getCrowdfundingAmount = async () => {
    setLoading(true);
    const crowdfundingRes = await fetchCrowdfundingProject(info.id, token);
    if (crowdfundingRes.status === 'done') {
      setCrowdfunding(crowdfundingRes.response);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCrowdfundingAmount();
  }, []);

  if (loading) return <Loading />;

  return (
    <React.Fragment>
      <ConfirmPayment
        name={info.name}
        onClose={() => {
          navigation.goBack();
        }}
        isOpen={openConfirmPayment}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <Header
              image={info.images[0]}
              name={info.name}
              avatar={info.avatar}
            />
            <View style={styles.container}>
              <SubTitle style={styles.goal}>
                {getPercentage()}% de fonds récoltés !
              </SubTitle>
              <View style={styles.progressBar}>
                <Animatable.View
                  animation="slideInLeft"
                  delay={500}
                  style={[
                    styles.progressBarFill,
                    {width: `${getPercentage()}%`},
                  ]}
                />
              </View>
              <DescriptionLabel style={styles.goalDescription}>
                {Number(crowdfunding.amount).toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                })}{' '}
                /{' '}
                {Number(crowdfunding.goal).toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                })}
              </DescriptionLabel>
              <SubTitle style={styles.descriptionTitle}>
                À quoi serviront ces fonds ?
              </SubTitle>

              <Paragraph style={styles.description}>
                {crowdfunding.description}
              </Paragraph>
              <SubTitle style={styles.descriptionTitle}>
                Combien souhaitez-vous envoyer ?
              </SubTitle>
              <View style={styles.amountContainer}>
                <InputLine
                  style={styles.amountInput}
                  value={String(amount)}
                  keyboardType={
                    Platform.OS === 'android' ? 'numeric' : 'number-pad'
                  }
                  onChangeText={text => {
                    if (Number(text)) {
                      setAmount(Number(text));
                    } else {
                      setAmount(0);
                    }
                  }}
                  autoFocus={true}
                />
                <Text style={styles.amountText}>€</Text>

                <View style={styles.borderBottom} />
              </View>
              <Payment
                amount={amount}
                projectId={info.id}
                handleSuccess={() => setOpenConfirmPayment(true)}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 50,
  },
  goal: {
    textAlign: 'center',
    marginTop: 30,
  },
  progressBar: {
    width: '100%',
    height: 20,
    backgroundColor: '#DBDBDB',
    borderRadius: 10,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: 0,
    height: '100%',
    backgroundColor: '#94FF94',
    borderRadius: 10,
  },
  goalDescription: {
    marginTop: 10,
    textAlign: 'center',
  },
  descriptionTitle: {
    marginTop: 30,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 14,
  },
  description: {
    marginTop: 10,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#767676',
  },
  amountText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 50,
    color: '#767676',
    textAlign: 'center',
    bottom: Platform.OS === 'android' ? 31 : 30,
    position: 'absolute',
    right: 0,
  },
  amountContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  amountInput: {
    marginTop: 1,
    color: '#767676',
    fontFamily: 'Montserrat-Bold',
    fontSize: 50,
    textAlign: 'center',
    width: width - 48,
  },
  borderBottom: {
    width: width - 48,
    height: 1,
    backgroundColor: '#767676',
    position: 'absolute',
    bottom: 20,
  },
});
