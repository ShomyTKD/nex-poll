local pollData = {}

RegisterNetEvent('nex-poll:server:createPoll', function(data)
    pollData = data
    for i, option in ipairs(pollData.options) do
        option.count = 0
    end
end)

RegisterNetEvent('nex-poll:server:registerVote', function(data)
    for _, vote in ipairs(data) do
        for _, option in ipairs(pollData.options) do
            if option.value == vote then
                option.count = option.count + 1
            end
        end
    end
end)

local function getPollData()
    return pollData
end

lib.callback.register('nex-poll:server:getPollData', getPollData)
