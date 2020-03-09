import React, { Component } from "react";
import '../../../styles/Widgets.css';
import HeadingPreview from "./HeadingPreview";
import {connect} from "react-redux";
import widgetService from "../../../services/widgetService";
import widgetActions from "../../../actions/widgetActions";

class HeadingWidgetComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: this.props.editing,
            widget: this.props.widget
        }
    }

  handleTextChange = e => {};

  handleNameChange = e => {};

  handleSizeChange = e => {
      e.stopPropagation();
      const newSize = parseInt(e.target.value);
      this.setState(prevState => {
          prevState.widget.textSize = newSize;
          return prevState
      })
  }

    saveWidget = ( widget) => {
        this.props.commitEdit()
        this.props.updateWidget(widget)
    }

  render() {
    return (
      <>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-7">
                    <h2>{this.props.widget.name || "Heading Widget"}</h2>
                  </div>
                  <div className="col-5">
                    <button className="btn btn-info mx-1 float-left">
                      <i className="fa fa-arrow-up"></i>
                    </button>
                    <button className="btn btn-info mx-1 float-left">
                      <i className="fa fa-arrow-down"></i>
                    </button>
                    <select className="form-control float-left widget-type-select" value={this.props.widget.type}>
                      <option value="HEADING">Heading Widget</option>
                      <option value="PARAGRAPH">Paragraph Widget</option>
                    </select>
                    <button className="btn btn-danger mx-1 float-left"
                            onClick={()=>this.props.deleteWidget(parseInt(this.state.widget.id))}>
                      <i className="fa fa-trash"></i>
                    </button>
                    <button className="btn btn-danger mx-1 float-left"
                            onClick={
                                (e) => {
                                    console.log(this.state.widget);
                                    this.saveWidget(this.state.widget)
                                }
                            }>
                      <i className="fa fa-check"></i>
                    </button>
                  </div>
                </div>
                <div className="row my-2">
                    <div className="col-12">
                        <input type="text" className="form-control" placeholder="Widget Text" onChange={this.handleTextChange}/>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col-12">
                    <select className="form-control" onChange={(e) => this.handleSizeChange(e)} value={this.state.widget.textSize}>

                      <option value="6">Heading 1</option>
                      <option value="5">Heading 2</option>
                      <option value="4">Heading 3</option>
                      <option value="3">Heading 4</option>
                      <option value="2">Heading 5</option>
                      <option value="1">Heading 6</option>
                    </select>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col-12">
                        <input type="text" className="form-control" placeholder="Widget Name" onChange={this.handleNameChange}/>
                    </div>
                </div>
                <div className="row">
                  <div className="col-12 my-2">
                    <h4>Preview</h4>
                    <HeadingPreview text={this.state.widget.text} size={this.state.widget.textSize}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const stateToPropertyMapper = state => {
  return {
    widgets: state.widgets.widgets
  }
}

const dispatchToPropertyMapper = dispatch => {
    return {
        deleteWidget: widgetId => {
            widgetService.deleteWidget(widgetId).then(() => {
                dispatch(widgetActions.deleteWidget(widgetId));
            });
        },

        updateWidget: widget => {
            widgetService.updateWidget(widget.id, widget).then(() => {
                dispatch(widgetActions.updateWidget(widget));
            });
        }
    };
};


export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(HeadingWidgetComponent);
