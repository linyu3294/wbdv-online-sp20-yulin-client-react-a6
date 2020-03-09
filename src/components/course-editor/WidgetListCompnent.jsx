import React from "react";
import {connect, Provider} from "react-redux";
import HeadingWidget from "./widgets/HeadingWidget";
import widgetService from "../../services/widgetService";
import widgetActions from "../../actions/widgetActions";
import topicService from "../../services/topicService";
import topicActions from "../../actions/topicActions";




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
                name: '',
                size: 3},
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

    saveWidget = (widget) => {
        this.setState({
            editingWidgetId: ''
        })
        this.props.updateWidget(widget.id, widget)
    }

    render() {
        console.log("rendered widgets", (this.props.widget))
        return(
            <div>
                {this.props.widgets && this.props.widgets.map(widget =>
                        <div>
                        {widget.type === "HEADING" &&
                            <HeadingWidget
                                key={widget.id}
                                widget={widget}
                                type = {widget.type}
                                editing={this.state.editingWidgetId === this.state.widget.id}
                                saveWidget={this.saveWidget}
                                courseId={this.props.courseId}
                                selectedModuleID={this.props.selectedModuleID}
                                selectedLessonID={this.props.selectedLessonID}
                            />}

                            {/*{widget.type === "PARAGRAPH" && */}
                            {/*        <ParagraphWidget saveWidget={this.saveWidget} */}
                            {/*                         editing={this.state.editingWidgetId === widget.id} */}
                            {/*                         widget={widget}/>}*/}
                        </div>


                    )
                }
                <div>
                <button
                        className="btn-danger btn-lg fab"
                            onClick={
                                () => this.props.createWidget(this.props.selectedTopicID)
                            }
                        >
                        <i className="fa fa-plus"></i>
                    </button>
                </div>
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