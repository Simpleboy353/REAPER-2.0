const ms = module.require("ms");

module.exports = {
  name: "hack",
  description: "Another Fun Command",
  run: async(client, message, args) => {
    if (!args[0]) {
    return message.channel.send("Woah.... Slow Down!! Who are we hacking..??")
    }
    const tohack = args.slice(0).join(" ") && args.shift().toLowerCase()
    let msg = await message.channel.send(`Hacking ${tohack}....`)
    let time = '3s'
    setTimeout(function(){
    msg.edit(`Finding ${tohack}'s Email and Password.....`)
  }, ms(time))
    let time1 = '4s'
    setTimeout(function(){
    msg.edit(`E-Mail: ${tohack}@gmail.com \nPassword: ********`)
  }, ms(time1))
    let time2 = '2s'
    setTimeout(function(){
    msg.edit("Finding Other Accounts.....")
  }, ms(time2))
    let time3 = '3s'
    setTimeout(function(){
    msg.edit("Setting up Epic Games Account.....")
  }, ms(time3))
    let time4 = '3s'
    setTimeout(function(){
    msg.edit("Hacking Epic Games Account......")
  }, ms(time4))
    let time5 = '2s'
    setTimeout(function(){
    msg.edit("Hacked Epic Games Account!!")
  }, ms(time5))
    let time6 = '1s'
    setTimeout(function(){
    msg.edit("Collecting Info.....")
  }, ms(time6))
    let time7 = '3s'
    setTimeout(function(){
    msg.edit("Selling data to FBI....")
  }, ms(time7))
    let time8 = '2s'
    setTimeout(function(){ 
    msg.edit("Finished Hacking ${tohack}")
  }, ms(time8))
}
}
