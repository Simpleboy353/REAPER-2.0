const Discord = module.require("discord.js");
const ms = require("ms");

module.exports = {
	name: "spam",
	description: "Another fun command",
	run: async(client, message, args) => {
	let msg = args.join(" ");
	if (!msg) {
        return message.channel.send("Error : No Text Found to Spam")
        }     
        let time = '1s'
        setTimeout(function(){
        message.channel.send(`${msg}`);
      }, ms(time));
   
        let time1 = '1.5s'
        setTimeout(function(){
        message.channel.send(`${msg}`);
      }, ms(time1));

        let time2 = '2s'
        setTimeout(function(){
        message.channel.send(`${msg}`);
      }, ms(time2));

        let time3 = '2.5s'
        setTimeout(function(){
        message.channel.send(`${msg}`);
      }, ms(time3));

        let time4 = '3s'
        setTimeout(function(){
        message.channel.send(`${msg}`);
      }, ms(time4));

        let time5 = '3.5s'
        setTimeout(function(){
        message.channel.send(`${msg}`);
      }, ms(time5));

        let time6 = '5s'
        setTimeout(function(){
        message.channel.send(`${msg}`);
      }, ms(time6));

        let time7 = '5.5s'
        setTimeout(function(){
        message.channel.send(`${msg}`);
      }, ms(time7));

        let time8 = '6s'
        setTimeout(function(){
        message.channel.send(`${msg}`);
      }, ms(time8));

        let time9 = '6.5s'
        setTimeout(function(){
        message.channel.send(`${msg}`);
      }, ms(time9));

        let time10 = '7s'
        setTimeout(function(){
        message.channel.send(`${msg}`);
      }, ms(time10));

        let time11 = '7.5s'
        setTimeout(function(){
        message.channel.send(`${msg}`);
      }, ms(time11));

        let time12 = '8s'
        setTimeout(function(){
        message.channel.send(`${msg}`);
      }, ms(time12));
   
        let time13 = '8.5s'
        setTimeout(function(){
        message.channel.send(`${msg}`);
      }, ms(time13));

        let time14 = '9s'
        setTimeout(function(){
        message.channel.send(`Looks like an Infinite Loop has been created!`);
      }, ms(time14));

        let time15 = '9.5s'
        setTimeout(function(){
        message.channel.send(`Trying to fix it!`);
      }, ms(time15));

        let time16 = '10s'
        setTimeout(function(){
        message.channel.send(`Done.... Fixed!!`);
      }, ms(time16));
    }
}
