export const findWidgetsForTopic = async (topic) =>
    await fetch(`https://calm-bastion-52680.herokuapp.com/api/topics/${topic}/widgets/`)
        .then(response => response.json())

export const updateWidget = (wid, widget) =>
    fetch(`https://calm-bastion-52680.herokuapp.com/api/widgets/${wid}`, {
        method: "PUT",
        body: JSON.stringify(widget),
        headers: {
            'content-type': "application/json"
        }
    }).then(response => response.json())

export const findAllWidgets = () =>
    fetch("https://calm-bastion-52680.herokuapp.com/api/widgets")
        .then(response => response.json())

export const deleteWidget = (widgetId) =>
    fetch(`https://calm-bastion-52680.herokuapp.com/api/widgets/${widgetId}`, {
        method: "DELETE"
    }).then(response => response.json())

export const createWidget = (topicId, widget) =>
    fetch("https://calm-bastion-52680.herokuapp.com/api/widgets", {
        method: "POST",
        body: JSON.stringify(widget),
        headers: {
            'content-type': "application/json"
        }
    })
        .then(response => response.json())
