const Member = require("../models/member");

const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: "Error fetching members", error });
  }
};

const getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });

    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: "Error fetching member", error });
  }
};

const createMember = async (req, res) => {
  try {
    const {
      name,
      membershipId,
      membershipExpiryDate,
      booksBorrowed = [],
    } = req.body;

    const booksArray = Array.isArray(booksBorrowed) ? booksBorrowed : [];

    const expiryDate = membershipExpiryDate
      ? new Date(membershipExpiryDate)
      : new Date(new Date().setFullYear(new Date().getFullYear() + 3));

    const member = new Member({
      name,
      membershipId,
      membershipExpiryDate: expiryDate,
      booksBorrowed: booksArray,
    });

    const saved = await member.save();
    res.status(201).json(saved);
  } catch (error) {
    console.log("Error creating member:", error);
    res.status(400).json({ message: "Error creating member", error });
  }
};

const updateMember = async (req, res) => {
  try {
    const { name, membershipId, membershipExpiryDate, booksBorrowed } =
      req.body;

    const updated = await Member.findByIdAndUpdate(
      req.params.id,
      { name, membershipId, membershipExpiryDate, booksBorrowed },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Member not found" });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating member", error });
  }
};

const deleteMember = async (req, res) => {
  try {
    const deleted = await Member.findOneAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Member not found" });

    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting member", error });
  }
};

module.exports = {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
};
