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
    print("NUI callback 'createPoll' called") -- Add this log
    print("Creating poll:", data.title)
    pollData = data
    print("Poll created:", pollData.title)
    cb('ok')
end)

local function getPlayerInformation(_, cb)
    local info = lib.callback.await('getplayerInformation')
    local identifiers = {}
    for _, identifier in pairs(info.identifiers) do identifiers[identifier:match('([^:]+):')] = identifier:match(':(.+)') end
    cb({ name = info.name, identifiers = identifiers })
end

RegisterNUICallback('getplayerInformation', getPlayerInformation)

function IsPlayerAdmin(player)
    -- Replace this with your actual admin check logic
    local isAdmin = true
    return isAdmin
end

print("NUI callback 'createPoll' registered") -- Add this log
