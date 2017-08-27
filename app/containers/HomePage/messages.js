/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.containers.HomePage.header',
    defaultMessage: 'What\'s the weather like where you are?',
  },
  notFound: {
    id: 'app.containers.HomePage.notFound',
    defaultMessage: 'We found a few matches, is one of these what you\'re looking for?',
  },
  secondHeader: {
    id: 'app.containers.HomePage.secondHeader',
    defaultMessage: 'Here\'s what to expect for the next few days:',
  },
});
