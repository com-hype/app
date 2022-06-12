import React, {useState, useEffect} from 'react';
import {
  StripeProvider,
  ApplePayButton,
  GooglePayButton,
  useStripe,
  CardField,
} from '@stripe/stripe-react-native';
import {BlackButton} from '../../../../components/atoms';
import {sendPaymentIntent} from '../../projects.services';
import {useSelector} from 'react-redux';
import {selectToken, selectUser} from '../../../authentication/user.redux';
import {Alert, View} from 'react-native';
import Loading from '../../../authentication/_components/loading';

export default function Payment({amount = 0, projectId = 0}) {
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const {confirmPayment} = useStripe();
  const [loading, setLoading] = useState(false);

  const handleConfirmation = async (type = 'Card') => {
    setLoading(true);
    const paymentIntent = await sendPaymentIntent(
      projectId,
      amount * 100,
      token,
    );
    if (paymentIntent.status === 'error') {
      Alert.alert('Error', paymentIntent.response);
      setLoading(false);
      return;
    }

    const {client_secret} = paymentIntent.response;
    console.log('client_secret -> ', client_secret);

    if (client_secret && type === 'Card') {
      const {paymentIntent, error} = await confirmPayment(client_secret, {
        paymentMethodType: 'Card',
      });

      if (!error) {
        Alert.alert(
          'Received payment',
          `Billed for ${paymentIntent?.amount / 100}€`,
        );
      } else {
        console.log(error);
        Alert.alert('Error', error.message || error.localizedMessage);
      }
    } else if (type === 'ApplePay') {
      Alert.alert('ApplePay', 'ApplePay not supported');
    } else if (type === 'GooglePay') {
      Alert.alert('GooglePay', 'GooglePay not supported');
    } else {
      Alert.alert('Error', 'No payment key');
    }
    setLoading(false);
  };

  return (
    <StripeProvider
      publishableKey="pk_test_51L7hgpLan0vOS3b54hfWm2oJlTmzaJ20kpo5BnkPWLUEOJO3nYAxTRBqTPjepfIpzl8Jkn9r8skvcLbsXkcv8FUy00joWTXZVB"
      urlScheme={`payment://new?amount=${amount}&currency=eur`}
      merchantIdentifier="comhype.com.app">
      {loading && <Loading />}
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 60,
          marginBottom: 15,
        }}
        onCardChange={cardDetails => {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />
      <BlackButton
        size="large"
        onPress={() => handleConfirmation()}
        style={{marginBottom: 20, marginTop: 0}}>
        Faire un Don
      </BlackButton>
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: '#DBDBDB',
          marginBottom: 15,
        }}
      />
      {Platform.OS === 'ios' && (
        <ApplePayButton
          style={{height: 50}}
          onPress={() => handleConfirmation('ApplePay')}
        />
      )}
      {Platform.OS === 'android' && (
        <GooglePayButton
          style={{height: 50}}
          onPress={() => handleConfirmation('GooglePay')}
        />
      )}
    </StripeProvider>
  );
}
