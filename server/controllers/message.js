import Message from "../models/message.js";
const controller = {
  save: async (req, res) => {
    const params = req.body;
    try {
      const message = new Message({
        message: params.message,
        from: params.from,
      });
      const messageStored = await message.save();
      res.status(200).send({
        status: "success",
        message: "Message saved successfully",
        messageId: messageStored._id,
      });
    } catch (error) {
      res.status(500).send({
        status: "error",
        message: "Failed to save message",
        error: error.message,
      });
    }
  },

  getMessage: async (req, res) => {
    try {
      const messages = await Message.find({}).sort("-_id");
      if (messages.length === 0) {
        return res.status(500).send({
          status: "error",
          message: "No messages to be loaded",
        });
      }
      res.status(200).send({
        status: "success",
        messages,
      });
    } catch (error) {
      res.status(500).send({
        status: "error",
        message: "Failed to extract data",
        error: error.message,
      });
    }
  },
};

export default controller;
