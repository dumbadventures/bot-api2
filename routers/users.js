const express = require('express');
const router = express.Router();
const db = require('../database/database');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended:true
}));

router.use(bodyParser.json());

router.use((req, res, next) => {
    // console.log('Time: ', Date.now());
    next();
});

router.get("/", async (req, res) => {
    const rows = await db.getUsers();
    res.send(rows);
});
  
router.get("/userId=:user_id/serverId=:server_id", async (req, res) => {
    const user_id = req.params.user_id;
    const server_id = req.params.server_id;
    if (!(await db.userExists(user_id,server_id))) {
        return res.status(404).send('[]'); 
    } else {
        const user = await db.getUser(user_id,server_id);
        res.send(user);
    }
});
  
router.post("/userId=:user_id/serverId=:server_id", async (req, res) => {
    const user_id = req.params.user_id;
    const server_id = req.params.server_id;
    const {pronouns} = req.body;
    if (await db.userExists(user_id,server_id)) {
       return res.status(303).send("user already exists")
    }
    if (req.body == undefined) {
        const user = await db.addUser(user_id,server_id); 
        return res.status(201).send(user);
    }
    if(pronouns == undefined) { 
        return res.status(303).send('incorrect parameters specified');
    }
    const user = await db.addUser(user_id,server_id,pronouns); 
    res.status(201).send(user);
});

router.delete("/userId=:user_id/serverId=:server_id", async (req,res) => {
    const user_id = req.params.user_id;
    const server_id = req.params.server_id;
    if (!(await db.userExists(user_id,server_id))) {
        return res.status(404).send('user does not exist');
    }
    await db.deleteUser(user_id,server_id);
    res.status(201).send("user deleted"); 
});

router.patch('/userId=:user_id/serverId=:server_id', async (req,res) => {
    const user_id = req.params.user_id;
    const server_id = req.params.server_id; 
    if (!(await db.userExists(user_id,server_id))) {
        return res.status(404).send('user does not exist');
    }
    const {pronouns} = req.body;
    if (pronouns == undefined) {
        return res.status(303).send('not enough information to update user')
    }
    const user = await db.updateUser(user_id,server_id,pronouns)
    res.status(201).send(user);
})

module.exports = router;