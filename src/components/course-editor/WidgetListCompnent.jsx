import React from "react";
import {connect} from "react-redux";
import HeadingWidget from "./widgets/HeadingWidget";
import widgetService from "../../services/widgetService";
import widgetActions from "../../actions/widgetActions";



class WidgetListComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        editingWidgetId: '',
        widget: {
                id: '',
                type: '',
                title: '',
                text: '',
                name: '',
                textSize: ''},
    }

    componentDidMount() {
        // this.props.findAllWidgets();
        this.props.findWidgetsForTopic(this.props.selectedTopicID)
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.selectedTopicID !== this.props.selectedTopicID) {
            // this.props.findAllWidgets();
            this.props.findWidgetsForTopic(this.props.selectedTopicID)
        }
    }

    commitEdit = (widget) => {
       this.setState({editingWidgetId: '' })
    }

    render() {
        return(
        <div className= "container">
         <>
            {this.props.widgets && this.props.widgets.map(widget =>
            <>
                {this.state.editingWidgetId !== widget.id &&
                    <div className="row">
                    <>
                        <div className="col-12">
                        <div className="card">
                        <>
                            <div className="card-body">
                            <>
                                {widget.textSize ===1 && <h6>{widget.text}</h6>}
                                {widget.textSize ===2 && <h5>{widget.text}</h5>}
                                {widget.textSize ===3 && <h4>{widget.text}</h4>}
                                {widget.textSize ===4 && <h3>{widget.text}</h3>}
                                {widget.textSize ===5 && <h2>{widget.text}</h2>}
                                {widget.textSize ===6 && <h1>{widget.text}</h1>}
                                <button className="btn btn-info mx-1 float-left"
                                        onClick={
                                            () => this.setState({
                                                editingWidgetId: widget.id,
                                                widget: widget})}>
                                    <i className="fa fa-pencil"></i>
                                </button>
                            </>
                            </div>
                        </>
                        </div>
                        </div>
                    </>
                    </div>
                }

                { this.state.editingWidgetId === widget.id  &&
                    widget.type === "HEADING" &&
                    <HeadingWidget
                    key={widget.id}
                    widget={widget}
                    type = {widget.type}
                    editing={this.state.editingWidgetId === widget.id}
                    commitEdit={this.commitEdit}
                    courseId={this.props.courseId}
                    selectedModuleID={this.props.selectedModuleID}
                    selectedLessonID={this.props.selectedLessonID}
                />}

                {/*{widget.type === "PARAGRAPH" && */}
                {/*        <ParagraphWidget saveWidget={this.saveWidget} */}
                {/*                         editing={this.state.editingWidgetId === widget.id} */}
                {/*                         widget={widget}/>}*/}
            </>
            ) }


            <div>
            <>
                <button
                    className="btn-danger btn-lg fab"
                        onClick={
                            () =>
                            this.props.createWidget(this.props.selectedTopicID)
                        }
                    ><i className="fa fa-plus"></i>
                </button>
            </>
            </div>
        </>
        </div>
        )
    }
}

const stateToPropertyMapper = (state) => ({
    widgets: state.widgets.widgets
})

const dispatchToPropertyMapper = (dispatch) => ({
    findWidgetsForTopic:  (topicId) =>
        widgetService.findWidgetsForTopic(topicId)
            .then(widgets => dispatch(
                widgetActions.findWidgetsForTopic(widgets)
            )),

    createWidget: async (topicId) =>{
        widgetService.createWidget(
            topicId, {
                        type: "HEADING",
                            })
            .then(newWidget => {
            dispatch(widgetActions.createWidget(newWidget));
        })
    },

    findAllWidgets: async () =>{
        const response = await widgetService.findAllWidgets()
        const widgets = await dispatch(widgetActions.findAllWidgets(response))
        console.log("Widgets" , widgets)
    }
})

export default connect
(stateToPropertyMapper, dispatchToPropertyMapper)
(WidgetListComponent)