import React from 'react';
import ReactFire from "reactfire";
import ReactMixin from "react-mixin";

// Components
import CustomDialog from "./CustomDialog/CustomDialog.jsx";
import LeftDrawer from "./LeftDrawer/LeftDrawer.jsx";
import Header from "./Header/Header.jsx";

// Services
import FirebaseService from "../../services/FirebaseService";
import CanvasService from "../../services/CanvasService";
import SettingsService from "../../services/SettingsService";


import { firebaseRef } from "../../constants/FirebaseConfig";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.firebaseService = new FirebaseService();
    this.settingsService = new SettingsService();
  }

  componentWillMount() {
    // this.firebaseRef = //this.props.
    // firebase.database();
    // this.bindAsArray(firebaseRef.ref("canvasCollection"), "canvasCollection");

    // console.log(this.firebaseRef.val());
    //this.firebaseRef.on('value', this.handleDataLoaded.bind(this));
    // this.fb = new Firebase(ROOT_URL + "items/");
    // bindAsObject is a method from ReactFire that sets: this.state.items = {...}
    // this.bindAsObject(this.fb, "items");
    // this.fb.on('value', this.handleDataLoaded.bind(this));
  }


  render() {
    return (
      <div>
        <Header
          handleRefreshClick={this.handleRefreshClick}
          handleLoadClick={this.handleLoadClick}
          handleSaveClick={this.handleSaveClick}
          handleRemoveClick={this.handleRemoveClick}
          firebaseRef={firebaseRef}
        />
        <LeftDrawer />
        {this.props.children}
        <CustomDialog
          firebaseRef={firebaseRef}
          settingsService={this.settingsService}
        />
      </div>
    );
  }
}

ReactMixin(App.prototype, ReactFire);

export default App;