<h2 align="center">Contributing</h2>

- Fork the repository
- Clone the fork: `git clone https://github.com/username/REAPER-2.0.git`
- Create your changes branch: `git checkout -b my-changes`
- Stage changes `git add .`
- Commit your changes: `cz` OR `npm run commit` do not use `git commit`
- Push to the branch: `git push origin my-changes`
- Submit a pull request

<h2 align="center">While contributing</h2>

- If you are adding a new command, be sure to use the proper syntax:
```js
module.exports = {
    name: "commandName",
    description: "commandDescription",
    botPerms: ["Permissions_required_by_the_bot"],
    userPerms: ["Permissions_required_by_the_user"],
    nsfwOnly: false, // True if the command can be used in nsfw channels only,
    ownerOnly: false, // True if the command can be used by owner only,
    run: async(client, message, args) => {
    // Command here
    }
}
```

- If you are adding a new slash command, be sure the proper syntax:
```js
module.exports = {
    name: "commandName",
    description: "commandDescription",
    botPerms: ["Permissions_required_by_the_bot"],
    userPerms: ["Permissions_required_by_the_user"],
    ownerOnly: false, // True if the command can be used by owner only,
    options: null, // If options are required, add accordingly else keep it null
    run: async(client, interaction, args) => {
    // Command here
    }
}
```

- If you are making a bug fix, please be sure that the bug can no longer be reproduced. If the fix is temporary, Mark the PR as [TEMPORARY_FIX].
