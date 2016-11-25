import React from "react";


import AppBar from 'material-ui/AppBar';
import Checkbox from 'material-ui/Checkbox';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';

import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
// import IconMenu from 'material-ui/IconMenu';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as DrawerActions from "../../actions/DrawerActions";


let styles = {};

class LeftDrawer extends React.Component {
  constructor(props) {
    super(props);
  }

  handleToggle = () => {
    let { drawer, actions } = this.props,
        isDrawerOpened = !drawer.isDrawerOpened;

    actions.toggleDrawer({ isDrawerOpened });
  }

  componentWillMount() {
    console.log(this.props);
  }

  render() {
    return (
      <Drawer
        open={this.props.drawer.isDrawerOpened}
        docked={false}
        onRequestChange={this.handleToggle}
        width={350}>
        <AppBar
          title="Title"
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          onLeftIconButtonTouchTap={this.handleToggle}/>
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem
          primaryText="Case Tools"
          rightIcon={<ArrowDropRight />}
          menuItems={[
            <MenuItem primaryText="UPPERCASE" />,
            <MenuItem primaryText="lowercase" />,
            <MenuItem primaryText="CamelCase" />,
            <MenuItem primaryText="Propercase" />,
          ]}/>
        <Divider />
        <Checkbox
          label="Simple"
          className="checkbox"
          style={styles.checkbox}
          />
        <Checkbox
          checkedIcon={<Visibility />}
          uncheckedIcon={<VisibilityOff />}
          label="Custom icon of different shapes"
          className="checkbox"
          style={styles.checkbox}
          />
        <Checkbox
          label="Label on the left"
          labelPosition="left"
          className="checkbox"
          style={styles.checkbox}
          />
        <Divider />
        <p>Some text</p>
        <p>Some text</p>
        <Divider />
        <Toggle
          label="Simple"
          className="toggle"
          style={styles.toggle}/>
        <Toggle
          label="Toggled by default"
          defaultToggled={true}
          className="toggle"
          style={styles.toggle}/>
      </Drawer>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    drawer: state.drawer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // createCourse: course => dispatch(CourseActions.createCourse(course))
    actions: bindActionCreators(DrawerActions, dispatch)
  }
}

// Courses.propTypes = {
//   //dispatch: PropTypes.func.isRequired,
//   // createCourse: PropTypes.func.isRequired,
//   // actions: PropTypes.object.isRequired,
//   courses: PropTypes.array.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(LeftDrawer);
