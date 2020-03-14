import React from "react";
import {connect} from "react-redux";
import HeadingWidget from "./widgets/HeadingWidget";
import ParagraphWidget from "./widgets/ParagraphWidget";
import widgetService from "../../services/widgetService";
import widgetActions from "../../actions/widgetActions";
import ListWidget from "./widgets/ListWidget";
import ImageWidget from "./widgets/ImageWidget";
import ImagePreview from "./widgets/ImagePreview";
import ListPreview from "./widgets/ListPreview";




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
                url: '',
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

    commitEdit = () => {
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
                                    {widget.type === "IMAGE" && <ImagePreview sourceUrl={ widget.url}/>}
                                    {widget.type === "LIST" && <ListPreview text={widget.text}/>}
                                    {(widget.type === "PARAGRAPH" || widget.type === "HEADING")
                                        && widget.textSize ===1 && <h6>{widget.text}</h6>}
                                    {(widget.type === "PARAGRAPH" || widget.type === "HEADING")
                                        && widget.textSize ===2 && <h5>{widget.text}</h5>}
                                    {(widget.type === "PARAGRAPH" || widget.type === "HEADING")
                                        && widget.textSize ===3 && <h4>{widget.text}</h4>}
                                    {(widget.type === "PARAGRAPH" || widget.type === "HEADING")
                                        && widget.textSize ===4 && <h3>{widget.text}</h3>}
                                    {(widget.type === "PARAGRAPH" || widget.type === "HEADING")
                                        && widget.textSize ===5 && <h2>{widget.text}</h2>}
                                    {(widget.type === "PARAGRAPH" || widget.type === "HEADING")
                                        && widget.textSize ===6 && <h1>{widget.text}</h1>}

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
                    deleteWidget = {this.props.deleteWidget}
                    updateWidget = {this.props.updateWidget}
                />}

                { this.state.editingWidgetId === widget.id  &&
                widget.type === "PARAGRAPH" &&
                <ParagraphWidget
                    key={widget.id}
                    widget={widget}
                    type = {widget.type}
                    editing={this.state.editingWidgetId === widget.id}
                    commitEdit={this.commitEdit}
                    courseId={this.props.courseId}
                    selectedModuleID={this.props.selectedModuleID}
                    selectedLessonID={this.props.selectedLessonID}
                    deleteWidget = {this.props.deleteWidget}
                    updateWidget = {this.props.updateWidget}
                />}

                { this.state.editingWidgetId === widget.id  &&
                widget.type === "LIST" &&
                <ListWidget
                    key={widget.id}
                    widget={widget}
                    type = {widget.type}
                    editing={this.state.editingWidgetId === widget.id}
                    commitEdit={this.commitEdit}
                    courseId={this.props.courseId}
                    selectedModuleID={this.props.selectedModuleID}
                    selectedLessonID={this.props.selectedLessonID}
                    deleteWidget = {this.props.deleteWidget}
                    updateWidget = {this.props.updateWidget}
                />}

                { this.state.editingWidgetId === widget.id  &&
                widget.type === "IMAGE" &&
                <ImageWidget
                    key={widget.id}
                    widget={widget}
                    type = {widget.type}
                    editing={this.state.editingWidgetId === widget.id}
                    commitEdit={this.commitEdit}
                    courseId={this.props.courseId}
                    selectedModuleID={this.props.selectedModuleID}
                    selectedLessonID={this.props.selectedLessonID}
                    deleteWidget = {this.props.deleteWidget}
                    updateWidget = {this.props.updateWidget}
                />}
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
       const response = await widgetService.createWidget(
            topicId, {
                        type: "HEADING",
                            })
        const newWidget = dispatch(widgetActions.createWidget(response));
        console.log(newWidget)

    },

    findAllWidgets: async () =>{
        const response = await widgetService.findAllWidgets()
        const widgets = await dispatch(widgetActions.findAllWidgets(response))
        console.log("Widgets" , widgets)
    },

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

})

export default connect
(stateToPropertyMapper, dispatchToPropertyMapper)
(WidgetListComponent)