const NewThread = require("../../../Domains/threads/entities/NewThread")

class AddThreadUseCase {
    constructor({ repostory }) {
        this._repostory = repostory
    }

    async execute(payload, credential) {
        const thread = new NewThread(payload)

        return await this._repostory.addNewThread(thread, credential)
    }
}

module.exports = AddThreadUseCase
