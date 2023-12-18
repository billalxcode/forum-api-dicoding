const AddedThread = require("../AddedThread");

describe("a AddedThread entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    const payload = { id: "thread-23", title: "Judul Thread" };
    expect(() => {
      new AddedThread(payload).toThrowError(
        "ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY"
      );
    });
  });

  it("should throw error when payload property did not meet data type needed", () => {
    const payload = { id: "thread-223", title: "Judul Thread", owner: 123 };
    expect(() => {
      new AddedThread(payload).toThrowError(
        "ADDED_THREAD.PROPERTY_NOT_MEET_DATA_TYPE_NEEDED"
      );
    });
  });

  it("should create addedThread object correctly", () => {
    // Arrange
    const payload = {
      id: "thread-123",
      title: "Judul",
      owner: "user-123",
    };

    // Action
    const addedThread = new AddedThread(payload);

    // Assert
    expect(addedThread._id).toEqual(payload.id);
    expect(addedThread._title).toEqual(payload.title);
    expect(addedThread._owner).toEqual(payload.owner);
  });
});
