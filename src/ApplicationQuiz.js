import React from 'react';
import './App.css';
import './bootstrap.min.css';
import {connect} from 'react-redux';
import { BrowserRouter, Route, Link } from "react-router-dom";
import PropTypes from 'prop-types';


function Hero()
{
  return( <div className="row">
   <div className="jumbotron col-md-10 offset-md-1">
     <h1>Author Quiz</h1>
     <p>Please choose the Author Based on the Image</p>
   </div>
   </div>
  );
}

function Books({title,onClick})
{
   return(
   <div style={{marginTop:"5px"}} className="answer" onClick={()=>{onClick(title)}}>{title}</div>
   
   );
}

function Turn({author,book ,highlight ,onanswerSelected})
{

  function gethighlite(highlite)
  {
     const mapping = 
     {
        'none' : '',
        'correct' : 'green',
        'wrong' : 'red'
     };
     return mapping[highlite];
  }
  return(<div className="row turn" style={{backgroundColor:gethighlite(highlight)}}>
   <div className="col-md-6 offset-1">
    <img style={{width:"250px",maxHeight:"250px"}} className="authorimage" src={author.imageUrl} alt={author.name} />
   </div>
   <div className="col-md-4">
   {book.map((title)=>{return (<Books title={title} key={title} onClick={onanswerSelected}/>) })}
   </div>
  </div>);
}

Turn.propTypes = {
  author : PropTypes.shape({
    name : PropTypes.string.isRequired,
    imageUrl : PropTypes.string.isRequired,
    imageSource : PropTypes.string.isRequired,
    books : PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  book : PropTypes.arrayOf(PropTypes.string).isRequired,
  onanswerSelected : PropTypes.func.isRequired,
  highlight : PropTypes.string.isRequired
};

function Continue({onContinue,show})
{
  return(<div className="row" style={{marginTop:"20px"}}>
   <div className="col-md-11">
     <button value="Continue" onClick={()=>{onContinue();}} className="btn btn-primary btn-lg float-right" name="Continue" disabled={!show}>Continue</button>
   </div>
  </div>) ;
}

function Footer()
{
  return (<div className="row">
    <div className="col-md-10 text-muted">All Images Are taken from <a href="#">Some link</a></div> 
  </div>);
}

function mapStateToProps(state)
{
   return{
    turndata : state.turndata,
    highlight : state.highlight
   }
}
function mapDispatchToProps(dispatch)
{
   return{
    onanswerSelected : (answer)=>{
      dispatch({type:'ANSWER_SELECTED',answer});
    },
   onContinue : ()=>{
    dispatch({type:'CONTINUE'});
   }
}
}
let ApplicationQuiz = connect(mapStateToProps,mapDispatchToProps)( ({turndata , onanswerSelected , highlight ,onContinue}) => {
  return (
    <div className="container-fluid">
      <Hero />
      <Turn {...turndata} highlight={highlight} onanswerSelected={onanswerSelected}/>
      <Continue onContinue={onContinue} show={highlight == 'correct'}/>
      <p>
         <Link to={"/add"} >Add an Author</Link>
      </p>
      <Footer/>
    </div>
  );
})

export default ApplicationQuiz;