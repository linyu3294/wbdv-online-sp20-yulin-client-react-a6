import React from "react";
import {connect, Provider} from "react-redux";
import HeadingWidget from "./widgets/HeadingWidget";
import widgetService from "../../services/widgetService";
import widgetActions from "../../actions/widgetActions";
import topicActions from "../../actions/topicActions";
import TopicListItemComponent from "./TopicListItemComponent";


class WidgetListComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        widget: {
                id: '',
                type: '',
                title: '',
                name: '',
                size: 3},
        editingWidgetId: ''

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
        return(
            <div>
                {this.props.widgets && this.props.widgets.map(widget =>
                        <div>
                        {this.state.widget.type === "HEADING" &&
                            <HeadingWidget
                                key={widget.id}
                                widget={widget}
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
            const newWidget = await widgetService.createWidget(topicId, {
                title: "New Widget",
                type: "HEADING",
                })
                console.log("fetched new widget", newWidget);
                await dispatch(widgetActions.createWidget(newWidget));
            },

    findAllWidgets: () =>
        widgetService.findAllWidgets()
            .then(actualWidgets =>  dispatch({
                type: "FIND_ALL_WIDGETS",
                widgets: actualWidgets
            }))
})

export default connect
(stateToPropertyMapper, dispatchToPropertyMapper)
(WidgetListComponent)