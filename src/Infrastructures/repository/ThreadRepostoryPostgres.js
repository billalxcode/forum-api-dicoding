const { nanoid } = require("nanoid")
const { Pool } = require("pg")
const ThreadRepostory = require("../../Domains/threads/ThreadRepostory")
const AddedThread = require("../../Domains/threads/entities/AddedThread")
const BaseQuery = require("../base/BaseQuery")

class ThreadRepostoryPostgres extends ThreadRepostory {
    /**
     * 
     * @param {Pool} pool
     */
    constructor(pool) {
        super()

        this._pool = pool
    }

    async addNewThread(thread, ownerId) {
        const { title, body } = thread
        const id = `thread-${nanoid(16)}`
        const time = new Date()

        const query = new BaseQuery("INSERT INTO threads VALUES ($1, $2, $3, $4, $5) RETURNING id, title, user_id", [
            id, title, body, ownerId, time
        ])

        const result = await this._pool.query(query.raw())
        return new AddedThread({
            id: result.rows[0].id,
            title: result.rows[0].title,
            owner: result.rows[0].user_id
        })
    }
}

module.exports = ThreadRepostoryPostgres