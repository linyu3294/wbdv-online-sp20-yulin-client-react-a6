import { FIND_ALL_WIDGETS, CREATE_WIDGET, DELETE_WIDGET, UPDATE_WIDGET, UPDATE_TEXT, UPDATE_SIZE, UPDATE_NAME } from "../constants/WidgetConstants";

export const findAllWidgets = (widgets) => ({
    type: FIND_ALL_WIDGETS,
    widgets: widgets
})

export const createWidget = (newWidget) => ({
    type: CREATE_WIDGET,
    newWidget: newWidget
})

export const deleteWidget = (widgetId) => ({
    type: DELETE_WIDGET,
    widgetId: widgetId
})

export const updateWidget = (widget) => ({
    type: UPDATE_WIDGET,
    widget: widget
})

export const updateText = (widgetId, text) => ({
    type: UPDATE_TEXT,
    widgetId: widgetId,
    text: text
})

export const updateSize = (widgetId, size) => ({
    type: UPDATE_SIZE,
    widgetId: widgetId,
    size: size
})

export const updateName = (widgetId, name) => ({
    type: UPDATE_NAME,
    widgetId: widgetId,
    name: name
})

export default {
    createWidget,
    findAllWidgets,
    deleteWidget,
    updateWidget,
    updateText,
    updateSize,
    updateName
}