import React, {useState} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { login, } from './actions/authActions';

import { PublicNavbar, PrivateNavbar, Footer } from './components/Navbar'
import HomePage from './pages/HomePage'
import SingleQuestionPage from './pages/SingleQuestionPage'
import QuestionsPage from './pages/QuestionsPage'
import QuestionFormPage from './pages/QuestionFormPage'
import AnswerFormPage from './pages/AnswerFormPage'
import OwnerQuestionsPage from './pages/OwnerQuestionsPage'
import UserFormPage from './pages/UserFormPage';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, SignOut } from './firebase';
import Modal from './components/Modal/Modal';
import LoginForm from './components/LoginForm';
import ResetPasswordPage from './pages/ResetPasswordPage';

const App = ({ dispatch }) => {
  const [user] = useAuthState(auth);
  if(user){
    dispatch(login(user.email, user.uid))
  }

  const initialState = {
    show: false
  };

  const [state, setState] = useState(initialState);

  const showModal = e => {
    setState({
      show: !state.show
    });
  };

  return (
    <Router>
      {user ?
        <>
          <PrivateNavbar />
          <Switch>
            <Route exact path="/" component={() => {
              return <HomePage><SignOut dispatch={dispatch} /><br/><br/></HomePage>
            }} />
            <Route exact path="/questions" component={QuestionsPage} />
            <Route exact path="/question/:id" component={SingleQuestionPage} />
            <Route exact path="/list" component={OwnerQuestionsPage} />
            <Route exact path="/answer/:id" component={AnswerFormPage} />
            <Route exact path="/new" component={QuestionFormPage} />
            <Route exact path="/profile"><UserFormPage mode={"profile"} /></Route>
            <Redirect to="/" />
          </Switch>
        </> :
        <>
          <PublicNavbar />
          <Switch>
            <Route exact path="/" component={() => {
              return <HomePage>
                        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                          <button
                            className="button_modal"
                            hidden={state.show}
                            onClick={e => {
                              showModal(e);
                            }}
                          >
                            {" "}
                            LogIn{" "}
                          </button>
                        </div>
                        <Modal onClose={showModal} show={state.show} ><LoginForm/><br/><br/></Modal>
                      </HomePage>
            }} />
            <Route exact path="/questions" component={QuestionsPage} />
            <Route exact path="/register"><UserFormPage /></Route> 
            <Route exact path="/resetpwd" component={ResetPasswordPage} />
            <Route exact path="/question/:id" component={SingleQuestionPage} />
            <Route exact path="/answer/:id" component={AnswerFormPage} />
            <Redirect to="/" />
          </Switch>
        </>
      }
      <Footer/>
    </Router>
  )
}

export default App
