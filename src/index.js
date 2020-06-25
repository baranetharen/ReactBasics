import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ApplicationQuiz from './ApplicationQuiz';
import * as serviceWorker from './serviceWorker';
import { shuffle, sample, object } from 'underscore';
import { render } from '@testing-library/react';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import AddAuthorForm from './AddAuthorForm';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';


const authors = [
  {
    name: 'Mark Twain',
    imageUrl: 'images/authors/marktwain.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['The Adventure of Huckleberry Finn']
  },
  {
    name: 'Joseph Conrad',
    imageUrl: 'images/authors/josephconrad.png',
    imageSource: 'Wikimedia Commons',
    books: ['Heart of Darkness']
  },
  {
    name: 'J.K. Rowling',
    imageUrl: 'images/authors/jkrowling.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Daniel Ogren',
    books: ['Harry Potter and the Sorcerers Stone']
  },
  {
    name: 'Stephen King',
    imageUrl: 'images/authors/stephenking.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Pinguino',
    books: ['The Shining', 'IT']
  },
  {
    name: 'Charles Dickens',
    imageUrl: 'images/authors/charlesdickens.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['David Copperfield', 'A Tale of Two Cities']
  },
  {
    name: 'William Shakespeare',
    imageUrl: 'images/authors/williamshakespeare.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
  }
]


function getAuthor(authors) {
  var allBooks = authors.reduce(function (p, c, i) {
    return p.concat(c.books);
  }, [])
  let books = shuffle(allBooks).slice(0, 4);
  let answer = sample(books);
  return {
    book: books,
    author: authors.find((author) =>
      author.books.some((title) => title === answer))
  };
}

function reducer(state = { authors, turndata: getAuthor(authors), highlight: '' }, action) {
  switch (action.type) {
    case 'ANSWER_SELECTED':
      {
        let isCorrect = state.turndata.author.books.some(book => book === action.answer);
        return (Object.assign({}, state, { highlight: isCorrect ? 'correct' : 'wrong' }));

      }
    case 'CONTINUE':
      {
        return (
          Object.assign({}, state, { turndata: getAuthor(authors), highlight: '' })
        );
      }
    case 'ADD_AUTHOR':
      return (
        Object.assign({}, state, { authors: state.authors.concat([action.author]) })
      );
    default:
      return state;
  }
}

let store = Redux.createStore(reducer);

function App() {
  return (
    <ApplicationQuiz />     
   )
};


ReactDOM.render(
  <BrowserRouter>
    <ReactRedux.Provider store={store}>
      <React.Fragment>
        <Route exact path="/" component={App} />
        <Route path="/add" component={AddAuthorForm} />
      </React.Fragment>
    </ReactRedux.Provider>
  </BrowserRouter>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();