import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';

import * as DataTypesActions from "../../../../actions/DataTypesActions";

import { Header } from "./Header";
import { Footer } from "./Footer";

import { styles } from "../constants";


function mapStateToProps(state, ownProps) {
  return {
    dataTypes: state.dataTypes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dataTypesActions: bindActionCreators(DataTypesActions, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Grid extends React.Component {

  constructor(props) {
    super(props);

  }

  state = {
    fixedHeader: true,
    stripedRows: false,
    showRowHover: false,
    selectable: false,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: true,
    showCheckboxes: false,
    height: '60vh',

    id: "",
    type: "",
    minAmount: "",
    maxAmount: "",
    color: "",
    updatedTable: []
  };

  handleTableCellUpdate = (event, row, editedFieldName, editedFieldValue) => {
    let { name, value } = event.target;

    this.setState({ [name]: value });

    if (row) {
      this.setUpdatedTable(row, value, editedFieldName, editedFieldValue);
    }
  }

  setUpdatedTable(row, value, editedFieldName, editedFieldValue) {
    let rowToUpdate = this.state.updatedTable.filter(utrow => utrow.id == row.id);

    if (rowToUpdate.length) {
      let newTable = [...this.state.updatedTable].map(utrow => {
        if (utrow.id == row.id) return { ...utrow, [editedFieldName]: value };

        return utrow;
      });

      this.setState((prevState, props) => ({ updatedTable: [...newTable] }));
      console.log("TABLENEW: ___ ", newTable);
    }
    else {
      let newRow = { ...row, [editedFieldName]: value };

      this.setState((prevState, props) => ({ updatedTable: [...prevState.updatedTable, newRow] }));
      console.log("NEWROW: ___ ", newRow);
    }
  }

  handleAddNewDataType = (event) => {
    const { type, minAmount, maxAmount, color } = this.state,
      { dataTypes, dataTypesActions } = this.props,
      id = +dataTypes[dataTypes.length - 1].id + 1;

    this.setState((prevState, props) => ({ id: id + 1, type: "", minAmount: "", maxAmount: "", color: "" }));

    dataTypesActions.addDataType({ id, type, minAmount, maxAmount, color });
  }

  handleSaveClick = () => {
    const { dataTypes, dataTypesActions } = this.props;

    dataTypesActions.saveDataTypes([...this.state.updatedTable]);
  }
  
  shouldComponentUpdate() {
    console.log("shouldComponentUpdate::::this.state::::", this.state);
    
    return true;
  }

  componentWillMount() {
    const { dataTypes, dataTypesActions } = this.props;

    dataTypesActions.loadDataTypes();
  }

  render() {
    return (
      <div>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          {Header({...this.state})}
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.props.dataTypes.map((row, index) => {
              if (!row) return;

              return (<TableRow key={index} >
                <TableRowColumn>{index}</TableRowColumn>
                <TableRowColumn colSpan="2">
                  <TextField
                    name={`type_${index}`}
                    value={this.state[`type_${index}`] || row.type}
                    underlineShow={false}
                    style={styles.widthAutoTextField}
                    onChange={(event) => this.handleTableCellUpdate(event, row, "type", this.state[`type_${index}`])}
                  />
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    name={`minAmount_${index}`}
                    value={this.state[`minAmount_${index}`] || row.minAmount}
                    underlineShow={false}
                    style={styles.widthAutoTextField}
                    onChange={(event) => this.handleTableCellUpdate(event, row, "minAmount", this.state[`minAmount_${index}`])}
                  />
                  </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    name={`maxAmount_${index}`}
                    value={this.state[`maxAmount_${index}`] || row.maxAmount}
                    underlineShow={false}
                    style={styles.widthAutoTextField}
                    onChange={(event) => this.handleTableCellUpdate(event, row, "maxAmount", this.state[`maxAmount_${index}`])}
                  />
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    name={`color_${index}`}
                    value={this.state[`color_${index}`] || row.color}
                    underlineShow={false}
                    style={styles.widthAutoTextField}
                    onChange={(event) => this.handleTableCellUpdate(event, row, "color", this.state[`color_${index}`])}
                  />
                </TableRowColumn>
                <TableRowColumn colSpan="2" style={styles.rowTextCenter}>
                  <RaisedButton label="Edit" primary={true} style={styles.buttonsMargin} />
                  <RaisedButton label="Delete" primary={true} style={styles.buttonsMargin} />
                </TableRowColumn>
              </TableRow>)
            })}
          </TableBody>
          {Footer({...this.state, ...this.props}, { handleTableCellUpdate: this.handleTableCellUpdate, handleAddNewDataType: this.handleAddNewDataType })}
        </Table>
        
        <RaisedButton label="Save" primary={true} onTouchTap={this.handleSaveClick} />
      </div>
    );
  }
}