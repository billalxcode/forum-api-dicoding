const Hapi = require("@hapi/hapi")
const AddThreadUseCase = require("../../../../Applications/use_case/threads/AddThreadUseCase")

class ThreadHandler {
    constructor(container) {
        this._container = container

        this.postThreadHandler = this.postThreadHandler.bind(this)
    }

    /**
     * 
     * @param {Hapi.Request} request 
     * @param {Hapi.ResponseToolkit} h 
     */
    async postThreadHandler(request, h) {
        const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name)
        const { id: userId } = request.auth.credentials
        const addedThread = await addThreadUseCase.execute(request.payload, userId)
        const response = h.response({
            status: "success",
            data: {
                addedThread
            }
        })
        response.code(201)
        return response
    }
}

module.exports = ThreadHandler