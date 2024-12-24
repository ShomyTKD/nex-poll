local handleNuiMessage = require('modules.nui')

local function getPollData(_, cb)
    local pollData = lib.callback.await('nex-poll:server:getPollData')
    cb(pollData)
end

RegisterNUICallback('getPollData', getPollData)

RegisterCommand('vote', function()
    local pollData = lib.callback.await('nex-poll:server:getPollData')
    if next(pollData) == nil then
        print("No poll data available.")
        return
    end
    handleNuiMessage({ action = 'setVisibleVote', data = true }, true)
end, false)

RegisterNUICallback('registerVote', function(data, cb)
    TriggerServerEvent('nex-poll:server:registerVote', data)
    lib.notify({ title = 'Vote registered', type = 'success' })
    handleNuiMessage({ action = 'setVisibleVote', data = false }, false)
    cb('ok')
end)

RegisterCommand('createpoll', function()
    handleNuiMessage({ action = 'setVisibleAdmin', data = true }, true)
end, false)

RegisterNUICallback('createPoll', function(data, cb)
    pollData = {
        title = data.title,
        type = data.type,
        options = data.options
    }
    TriggerServerEvent('nex-poll:server:createPoll', pollData)
    lib.notify({ title = 'Poll created', type = 'success' })
    handleNuiMessage({ action = 'setVisibleAdmin', data = false }, false)
    cb('ok')
end)

RegisterCommand('results', function()
    local results = lib.callback.await('nex-poll:server:getPollData')
    if next(results) == nil then
        print("No poll data available.")
        return
    end
    handleNuiMessage({ action = 'setVisibleResults', data = true }, true)
end, false)
