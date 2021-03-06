import { showBooks } from '../components/books';
import logoutButton from '../components/buttons/logoutButton';
import domBuilder from '../components/domBuilder';
import navBar from '../components/navBar';
import domEvents from '../events/domEvents';
import navigationEvents from '../events/navigationEvents';
import { getBooks } from '../helpers/data/bookData';

const startApp = (userObject) => {
  domBuilder(); // BUILD THE DOM
  domEvents(userObject.uid); // ADD THE EVENT LISTENTERS TO THE DOM
  navBar(); // DYNAMICALLY ADD THE NAV
  logoutButton(); // ADD THE LOGOUT BUTTON COMPONENT
  navigationEvents(userObject.uid); // ATTACH THE EVENT LISTENERS TO THE NAVBAR
  // Put all books on the DOM
  getBooks(userObject.uid).then((books) => showBooks(books));
};

export default startApp;
