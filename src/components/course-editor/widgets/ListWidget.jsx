import React, { Component } from "react";
import '../../../styles/Widgets.css';
import HeadingPreview from "./HeadingPreview";
import {connect} from "react-redux";
import ListPreview from "./ListPreview";


class ListWidgetComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: this.props.editing,
            widget: this.props.widget
        }
    }

  handleTextChange = e => {
      e.stopPropagation();
      const newText = e.target.value;
      this.setState(prevState => {
          prevState.widget.text = newText;
          return prevState
      })
    }

  handleNameChange = e => {
      e.stopPropagation();
      const newName = e.target.value;
      this.setState(prevState => {
          prevState.widget.name = newName;
          return prevState
      })}

    handleTypeChange = e => {
        e.stopPropagation();
        const newType = e.target.value;
        this.setState(prevState => {
            prevState.widget.type = newType;
            prevState.widget.name = newType + " WIDGET";
            return prevState
        })
    this.props.updateWidget(this.state.widget)
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
                    <select className="form-control float-left widget-type-select"
                            onChange={(e) => this.handleTypeChange(e)}
                            value={this.props.widget.type}>
                      <option value="HEADING">Heading Widget</option>
                      <option value="PARAGRAPH">Paragraph Widget</option>
                      <option value="LIST">List Widget</option>
                      <option value="IMAGE">Image Widget</option>
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
                         <textarea type="text"
                                   className="form-control"
                                   placeholder={this.state.widget.text}
                                   rows = "5"
                                   onChange={(e) => this.handleTextChange(e)}/>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col-12">
                        <input type="text" className="form-control" placeholder={this.state.widget.name} onChange={this.handleNameChange}/>
                    </div>
                </div>
                <div className="row">
                  <div className="col-12 my-2">
                    <h4>Preview</h4>
                    <ListPreview text={this.state.widget.text} size={this.state.widget.textSize}/>
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

export default connect(
    stateToPropertyMapper,
)(ListWidgetComponent);
