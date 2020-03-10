import {JANNUNZI_API_URL, LOCAL_API_URL} from "../constants/app-constants";

export const createWidget = async (topicId, widget) => {
    const response = await fetch(`${LOCAL_API_URL}/topics/${topicId}/widgets`, {
        method: "POST",
        body: JSON.stringify(widget),
        headers: {
            'content-type': "application/json"
        }
    })
    return await response.json()
}

export const deleteWidget = (widgetId) =>
    fetch(`${LOCAL_API_URL}/widgets/${widgetId}`, {
        method: "DELETE"
    }).then(response => response.json())

export const updateWidget = async (wid, widget) =>{
    const response = await fetch(`${LOCAL_API_URL}/widgets/${wid}`, {
            method: "PUT",
            body: JSON.stringify(widget),
            headers: {
                'content-type': "application/json"
            }
        }
    )
    return await response.json()
}

export const findWidgetsForTopic = async (topicId) =>
    await fetch(`${LOCAL_API_URL}/topics/${topicId}/widgets`)
        .then(response => response.json())


export const findAllWidgets = async () => {
    const response = await fetch(`${LOCAL_API_URL}/widgets`)
    const widgets  = response.json()
    return widgets
}

export default {
    createWidget,
    findWidgetsForTopic,
    findAllWidgets,
    updateWidget,
    deleteWidget
}