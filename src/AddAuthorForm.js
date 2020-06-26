import React from 'react';
import { Link } from 'react-router-dom';
import { object } from 'underscore';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class AuthorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageUrl: '',
      books: [],
      booktemp: ''
    }
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onSubmitBook = this.onSubmitBook.bind(this);
  }

  onSubmitForm(event) {
    event.preventDefault();
    let { booktemp, ...tempsate } = this.state;
    this.props.onAddAuthor(tempsate);
  }

  onSubmitBook(event) {
    event.preventDefault();
    this.setState({
      books: [...this.state.books, this.state.booktemp],
      booktemp: ' '
    })
  }

  onFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  render() {

    return (
      <form onSubmit={this.onSubmitForm}>
        <div className="form-group">
          <label htmlFor="Name" >Name</label>
          <input name="name" id="Name" value={this.state.name} onChange={this.onFieldChange} className="form-control" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl" >ImageUrl</label>
          <input name="imageUrl" id="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange} className="form-control" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="books" >Books</label>
          <div style={{ display: "flex" }}>
            <input name="booktemp" id="books" value={this.state.booktemp} onChange={this.onFieldChange} className="form-control" type="text" />
            <input style={{ marginLeft: "2px" }} type="button" value="+" onClick={this.onSubmitBook} />
          </div>
          {this.state.books.length > 0 &&
            <div>{this.state.books.map(book => <div key={book}>{book}</div>)}</div>}
        </div>
        <p>
          <input type="submit" value="AddAuthor" ></input>
        </p>
      </form>
    );
  }
}

function AddAuthorForm({ match, onAddAuthor }) {
  return (
    <div style={{ width: "60%", margin: "20px auto" }} >
      <h1>Author Form</h1>
      <AuthorForm onAddAuthor={onAddAuthor} />
    </div>
  );
}
function mapSateToProps(state) {

}
function mapdispatchToProps(dispatch, props) {
  return {
    onAddAuthor: (author) => {
      dispatch({ type: 'ADD_AUTHOR', author });
      props.history.push('/');
    }
  }
}
export default withRouter(connect(mapSateToProps, mapdispatchToProps)(AddAuthorForm));