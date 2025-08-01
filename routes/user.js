const express = require("express");
const router = express.Router();

const {handleGetAllUsers, 
    handleGetUserById, 
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
} = require("../controllers/user");

// Route to display users as HTML list
// router.get("/users", async(req, res) => {
//     const allDBUsers = await User.find({});
    
//     const html = `
//     <ul> 
//         ${allDBUsers
//           .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
//           .join("")
//         }
//     </ul>
//     `;
//     res.send(html);
// });

// Rest API
router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

// Route chaining for CRUD operations
router.route("/:id")
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById);

module.exports = router;