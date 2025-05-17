const express = require("express");

const {
  createMember,
  updateMember,
  deleteMember,
  getAllMembers,
  getMemberById,
} = require("../controllers/memberController");

const router = express.Router();

router.get("/", getAllMembers);

router.get("/:id", getMemberById);

router.post("/", createMember);

router.put("/:id", updateMember);

router.delete("/:id", deleteMember);

module.exports = router;
