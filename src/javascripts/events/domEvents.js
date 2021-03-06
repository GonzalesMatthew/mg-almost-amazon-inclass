import firebase from 'firebase/app';
import 'firebase/auth';
// import axios from 'axios';
import { showBooks } from '../components/books';
import {
  createBook,
  deleteBook,
  // getAuthorBooks,
  // getBooks,
  getSingleBook,
  updateBook
} from '../helpers/data/bookData';
import { showAuthors } from '../components/authors';
import {
  createAuthor,
  // deleteAuthor
} from '../helpers/data/authorData';
import addAuthorForm from '../components/forms/addAuthorForm';
import addBookForm from '../components/forms/addBookForm';
import editBookForm from '../components/forms/editBookForm';
import formModal from '../components/forms/formModal';
import { authorBookInfo, deleteAuthorBooks } from '../helpers/data/authorBooksData';
import authorInfo from '../components/authorInfo';

const domEvents = (uid) => {
  document.querySelector('body').addEventListener('click', (e) => {
    // CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      if (window.confirm('Want to delete?')) {
        const firebaseKey = e.target.id.split('--')[1];
        deleteBook(firebaseKey).then((booksArray) => showBooks(booksArray));
      }
    }

    // CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      console.warn('CLICKED ADD BOOK BUTTON', e.target.id);
      addBookForm();
    }

    // CLICK EVENT FOR SUBMITTING FORM FOR ADDING A BOOK
    if (e.target.id.includes('submit-book')) {
      e.preventDefault();
      const bookObject = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        sale: document.querySelector('#sale').checked,
        author_id: document.querySelector('#author').value,
        uid
      };

      createBook(bookObject, uid).then((booksArray) => showBooks(booksArray));
    }

    // CLICK EVENT FOR SHOWING MODAL FORM FOR ADDING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      const firebaseKey = e.target.id.split('--')[1];
      formModal('Edit  Book');
      // console.warn('CLICKED EDIT BOOK', e.target.id);
      getSingleBook(firebaseKey).then((bookObject) => editBookForm(bookObject));
    }

    // CLICK EVENT FOR EDITING A BOOK
    if (e.target.id.includes('update-book')) {
      console.warn('CLICKED EDIT BOOK', e.target.id);
      const firebaseKey = e.target.id.split('--')[1];
      e.preventDefault();
      const bookObject = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        sale: document.querySelector('#sale').checked,
        author_id: document.querySelector('#author').value,
      };

      updateBook(firebaseKey, bookObject).then((booksArray) => showBooks(booksArray));

      $('#formModal').modal('toggle');
    }

    // ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author')) {
      if (window.confirm('Want to delete?')) {
        const authorId = e.target.id.split('--')[1];
        console.warn(authorId);
        // getAuthorBooks(authorId).then((authorBooksArray) => console.warn(authorBooksArray));
        deleteAuthorBooks(authorId, uid).then((authorsArray) => showAuthors(authorsArray));
        // .then((authorArray) => showAuthors(authorArray));
      }
    }

    if (e.target.id.includes('author-name-title')) {
      const authorId = e.target.id.split('--')[1];
      console.warn(authorId);
      authorBookInfo(authorId).then((authorInfoObject) => {
        showBooks(authorInfoObject.books);
        authorInfo(authorInfoObject.author);
      });
    }

    // ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-button')) {
      addAuthorForm();
    }
    // ADD CLICK EVENT FOR SUBMITTING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('submit-author')) {
      e.preventDefault();
      const authorObject = {
        first_name: document.querySelector('#firstName').value,
        last_name: document.querySelector('#lastName').value,
        favorite: document.querySelector('#favorite').checked,
        uid: firebase.auth().currentUser.uid,
      };

      createAuthor(authorObject).then((authorArray) => showAuthors(authorArray));
    }
    // ADD CLICK EVENT FOR EDITING AN AUTHOR
  });
};

export default domEvents;
