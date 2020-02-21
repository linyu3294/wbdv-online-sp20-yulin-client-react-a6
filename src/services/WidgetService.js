export const findWidgetsForTopic = async (topic) =>
    await fetch(`http://localhost:8080/api/topics/${topic}/widgets/`)
        .then(response => response.json())

export const updateWidget = (wid, widget) =>
    fetch(`http://localhost:8080/api/widgets/${wid}`, {
        method: "PUT",
        body: JSON.stringify(widget),
        headers: {
            'content-type': "application/json"
        }
    }).then(response => response.json())

export const findAllWidgets = () =>
    fetch("http://localhost:8080/api/widgets")
        .then(response => response.json())

export const deleteWidget = (widgetId) =>
    fetch(`http://localhost:8080/api/widgets/${widgetId}`, {
        method: "DELETE"
    }).then(response => response.json())

export const createWidget = (topicId, widget) =>
    fetch("http://localhost:8080/api/widgets", {
        method: "POST",
        body: JSON.stringify(widget),
        headers: {
            'content-type': "application/json"
        }
    })
        .then(response => response.json())
