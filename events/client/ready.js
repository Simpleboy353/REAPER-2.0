module.exports=client=> {
  client.user.setPresence({ status: 'online' });
  const activities_list = [
    { msg: "Infinity Rocks", type: "STREAMING" },
    { msg: "music for your server!", type: "PLAYING" },
    { msg: "=help", type: "LISTENING" },
    { msg: "Helping You make your Server Better", type: "PLAYING" },
    { msg: `with ${client.users.cache.size} users in ${client.guilds.cache.size} servers!`, type: "PLAYING" },
  ];// creates an arraylist containing phrases you want your bot to switch through.
  setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 
    client.user.setActivity(activities_list[index].msg, {
      type: activities_list[index].type,
    }); // sets bot's activities to one of the phrases in the arraylist.
  }, 10000); 
  console.log(`Logged in as ${client.user.tag}`)// Runs this every 10 seconds.});
}