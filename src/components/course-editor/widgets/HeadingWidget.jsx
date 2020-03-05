import React, { Component } from "react";
import '../../../styles/Widgets.css';
import HeadingPreview from "./HeadingPreview";

class HeadingWidgetComponent extends Component {
  handleTextChange = e => {};

  handleNameChange = e => {};

  handleSizeChange = e => {};

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
                    <button className="btn btn-danger mx-1 float-left">
                      <i className="fa fa-trash"></i>
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
                    <select className="form-control" onChange={this.handleSizeChange} value={this.props.widget.size}>
                      <option value="1">Heading 1</option>
                      <option value="2">Heading 2</option>
                      <option value="3">Heading 3</option>
                      <option value="4">Heading 4</option>
                      <option value="5">Heading 5</option>
                      <option value="6">Heading 6</option>
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
                    <HeadingPreview text={this.props.widget.text} size={this.props.widget.size}/>
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

export default HeadingWidgetComponent;
