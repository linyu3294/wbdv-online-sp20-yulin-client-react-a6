export const WIDGET_FOR_TOPIC= "FIND_WIDGETS_FOR_TOPIC"
export const findWidgetsForTopicAction = (widgets) => ({
    type: WIDGET_FOR_TOPIC,
    widgets: widgets
})

export const CREATE_WIDGET = "CREATE_WIDGET"
export const createWidget = (widget) => ({
    type: CREATE_WIDGET,
    widget: widget
})

export const DELETE_WIDGET = "DELETE_WIDGET"
export const deleteWidget = (widgetId) => ({
    type: DELETE_WIDGET,
    widgetId: widgetId
})

export const UPDATE_WIDGET = "UPDATE_WIDGET"
export const updateWidget = (widget) => ({
    type: 'UPDATE_WIDGET',
    widget: widget,
    widgetId: widget._id
})

