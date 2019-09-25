const router = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middelware/auth");

const Chat = require("../../models/Chat");
const Profile = require("../../models/Profile");
const User = require("../../models/Usre");

//@route POST CHAT api/routes
//@desc Create a chat
//@access Private
router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newChat = new Chat({
        text: req.body.text,
        name: user.name,
        user: req.user.id
      });

      const chat = await newChat.save();

      res.json(chat);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@route GET CHAT api/chats
//@desc Get all chats
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    const chats = await Chat.find().sort({ date: -1 });
    res.json(chats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route GET CHAT api/:id
//@desc Get chat by ID
//@access Private/
router.get("/:id", auth, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({ msg: "Message not found" });
    }

    res.json(chat);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Message not found" });
    }
    res.status(500).send("Server error");
  }
});

//@route DELETE CHAT api/chats:id
//@desc Delete message
//@access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({ msg: "Message not found" });
    }

    //Check user
    if (chat.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await chat.remove();

    res.json({ msg: "Message removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Message not found" });
    }
    res.status(500).send("Server error");
  }
});

module.exports = router;
