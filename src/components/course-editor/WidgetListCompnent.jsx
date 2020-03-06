import React from "react";
import {connect} from "react-redux";
import HeadingWidget from "./widgets/HeadingWidget";
import widgetService from "../../services/widgetService";
import widgetActions from "../../actions/widgetActions";


class WidgetListComponent extends React.Component {
    state = {
        editingWidgetId: '',
        widget: {id: ''}
    }

    componentDidMount() {
        // this.props.findWidgetsForTopic(this.props.topicId)
         this.props.findAllWidgets();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.topicId !== this.props.topicId) {
            this.props.findWidgetsForTopic(this.props.topicId)
        }
    }

    saveWidget = (widget) => {
        this.setState({
            editingWidgetId: ''
        })
        this.props.updateWidget(widget.id, widget)
    }

    render() {
        console.log(this.props.widgets)
        return(
            <div>
                {
                    this.props.widgets && this.props.widgets.map(widget =>
                        <div key={widget.id}>
                            {widget.type === "HEADING"   &&
                                    <HeadingWidget   saveWidget={this.saveWidget}
                                                     editing={this.state.editingWidgetId=== widget.id}
                                                     widget={widget}/>}
                            {/*{widget.type === "PARAGRAPH" && */}
                            {/*        <ParagraphWidget saveWidget={this.saveWidget} */}
                            {/*                         editing={this.state.editingWidgetId === widget.id} */}
                            {/*                         widget={widget}/>}*/}

                        </div>
                    )
                }
            </div>
        )
    }
}

const stateToPropertyMapper = (state) => ({
    widgets: state.widgets.widgets
})

const dispatchToPropertyMapper = (dispatcher) => ({
    findWidgetsForTopic:  (topicId) =>
        widgetService.findWidgetsForTopic(topicId)
            .then(widgets => dispatcher(
                widgetActions.findWidgetsForTopic(widgets)
            )),
    createWidget: (topicId) =>
        widgetService.createWidget(topicId, {
            title: "New Widget",
            type: "HEADING",
            topicId: topicId,
            id: (new Date()).getTime() + ""
        })
            .then(actualWidget => dispatcher({
                type: "ADD_WIDGET",
                widget: actualWidget
            })),
    findAllWidgets: () =>
        widgetService.findAllWidgets()
            .then(actualWidgets =>  dispatcher({
                type: "FIND_ALL_WIDGETS",
                widgets: actualWidgets
            }))
})

export default connect
(stateToPropertyMapper, dispatchToPropertyMapper)
(WidgetListComponent)