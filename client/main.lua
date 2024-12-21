local handleNuiMessage = require('modules.nui')

local pollData = nil

RegisterCommand('vote', function()
    if pollData then
        handleNuiMessage({ action = 'setVisibleVote', data = pollData }, true)
    else
        print("No poll data available.")
    end
end, false)

RegisterCommand('createpoll', function(source, args, rawCommand)
    handleNuiMessage({ action = 'setVisibleAdmin', data = true }, true)
end, false)

RegisterNUICallback('createPoll', function(data, cb)
    pollData = {
        title = data.title,
        type = data.type,
        options = data.options
    }
    print("Poll created:", pollData.title)
    cb('ok')
end)
