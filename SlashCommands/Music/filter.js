const { bgYellowBright } = require("chalk");
const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "filter",
  description: "Apply or reset the filters",
  subCommands: ["apply", "list"],
  category: "Music",
  options: [
    {
    name: "apply",
    type: ApplicationCommandOptionType.Subcommand,
    description: "Apply filters to music!",
    options: [
      {
        name: "filter",
        description: "The filter to apply!",
        required: true,
        type: ApplicationCommandOptionType.String,
      }
    ]
  },
  {
    name: "list",
    description: "List of all the available filters",
    type: ApplicationCommandOptionType.Subcommand
  }
  ],
  run: async(client, interaction, args) => {
    await interaction.deferReply();
    if (interaction.options.getSubcommand() === "apply") {
    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");

    if (!client.utils.canModifyQueue(interaction)) return;

    const filters = queue.getFiltersEnabled();

    const filter = interaction.options.getString("filter");

    if (filter === "8d") {

      const queue = client.player.getQueue(interaction.guild.id);

      if (!queue || !queue.playing)
        return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
  
      if (!client.utils.canModifyQueue(interaction)) return;
  
      await queue.setFilters({
        "8D": !queue.getFiltersEnabled().includes("8D")
      });
  
      return client.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes("8D") ? "Applied" : "Removed"} the 8D filter.`);

    } else if (filter === "bassboost") {
      const queue = client.player.getQueue(interaction.guild.id);

      if (!queue || !queue.playing)
        return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
  
      if (!client.utils.canModifyQueue(interaction)) return;
  
      await queue.setFilters({
        "bassboost" : !queue.getFiltersEnabled().includes("bassboost")
      });
  
    return client.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes(`Bassboost`) ? `Applied` : "Removed"} the Bassboost filter.`);

    } else if (filter === "compressor") {
      const queue = client.player.getQueue(interaction.guild.id);

      if (!queue || !queue.playing)
        return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
  
      if (!client.utils.canModifyQueue(interaction)) return;
  
      await queue.setFilters({
        "compressor" : !queue.getFiltersEnabled().includes("compressor")
      });
  
    return client.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes("compressor") ? `Applied` : "Removed"} the Compressor filter.`);
    
    } else if (filter === "dim") {
      const queue = client.player.getQueue(interaction.guild.id);

      if (!queue || !queue.playing)
        return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
  
      if (!client.utils.canModifyQueue(interaction)) return;
  
      await queue.setFilters({
        "dim" : !queue.getFiltersEnabled().includes("dim")
      });
  
    return client.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes("dim") ? `Applied` : "Removed"} the Dim filter.`);
    } else if (filter === "expander") {
      const queue = client.player.getQueue(interaction.guild.id);

      if (!queue || !queue.playing)
        return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
  
      if (!client.utils.canModifyQueue(interaction)) return;
  
      await queue.setFilters({
        "expander" : !queue.getFiltersEnabled().includes("expander")
      });
  
    return client.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes("expander") ? `Applied` : "Removed"} the Expander filter.`);
    } else if (filter === "flanger") {
      const queue = client.player.getQueue(interaction.guild.id);

      if (!queue || !queue.playing)
        return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
  
      if (!client.utils.canModifyQueue(interaction)) return;
  
      await queue.setFilters({
        "flanger" : !queue.getFiltersEnabled().includes("flanger")
      });
  
    return client.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes("flanger") ? `Applied` : "Removed"} the Flanger filter.`);
    } else if (filter === "gate") {
      const queue = client.player.getQueue(interaction.guild.id);

      if (!queue || !queue.playing)
        return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
  
      if (!client.utils.canModifyQueue(interaction)) return;
  
      await queue.setFilters({
        "gate" : !queue.getFiltersEnabled().includes("gate")
      });
  
    return client.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes("gate") ? `Applied` : "Removed"} the Gate filter.`);
    } else if (filter === "haas") {
      const queue = client.player.getQueue(interaction.guild.id);

      if (!queue || !queue.playing)
        return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
  
      if (!client.utils.canModifyQueue(interaction)) return;
  
      await queue.setFilters({
        "haas" : !queue.getFiltersEnabled().includes("haas")
      });
  
    return client.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes("haas") ? `Applied` : "Removed"} the Haas filter.`);
    } else if (filter === "karaoke") {
      const queue = client.player.getQueue(interaction.guild.id);

      if (!queue || !queue.playing)
        return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
  
      if (!client.utils.canModifyQueue(interaction)) return;
  
      await queue.setFilters({
        "karaoke" : !queue.getFiltersEnabled().includes("karaoke")
      });
  
    return client.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes("karaoke") ? `Applied` : "Removed"} the Karaoke filter.`);
    } else if (filter === "mcompand") {
      const queue = client.player.getQueue(interaction.guild.id);

      if (!queue || !queue.playing)
        return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
  
      if (!client.utils.canModifyQueue(interaction)) return;
  
      await queue.setFilters({
        "mcompand" : !queue.getFiltersEnabled().includes("mcompand")
      });
  
    return client.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes("mcompand") ? `Applied` : "Removed"} the MCompand filter.`);
    } else if (filter === "mono") {
      const queue = client.player.getQueue(interaction.guild.id);

      if (!queue || !queue.playing)
        return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
  
      if (!client.utils.canModifyQueue(interaction)) return;
  
      await queue.setFilters({
        "mono" : !queue.getFiltersEnabled().includes("mono")
      });
  
    return client.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes("mono") ? `Applied` : "Removed"} the Mono filter.`);
    } else if (filter === "mstlr") {
      const queue = client.player.getQueue(interaction.guild.id);

      if (!queue || !queue.playing)
        return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
  
      if (!client.utils.canModifyQueue(interaction)) return;
  
      await queue.setFilters({
        "mstlr" : !queue.getFiltersEnabled().includes("mstlr")
      });
  
    return client.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes("mstlr") ? `Applied` : "Removed"} the MStlr filter.`);
    } else if (filter === "mstrr") {
      const queue = client.player.getQueue(interaction.guild.id);

      if (!queue || !queue.playing)
        return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
  
      if (!client.utils.canModifyQueue(interaction)) return;
  
      await queue.setFilters({
        "mstrr" : !queue.getFiltersEnabled().includes("mstrr")
      });
  
    return client.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes("mstrr") ? `Applied` : "Removed"} the MStrr filter.`);
    } else if (filter === "nightcore") {
      const queue = client.player.getQueue(interaction.guild.id);

      if (!queue || !queue.playing)
        return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
  
      if (!client.utils.canModifyQueue(interaction)) return;
  
      await queue.setFilters({
        "nightcore" : !queue.getFiltersEnabled().includes("nightcore")
      });
  
    return client.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes("nightcore") ? `Applied` : "Removed"} the Nightcore filter.`);
    } else if (filter === "phaser") {
      const queue = client.player.getQueue(interaction.guild.id);

      if (!queue || !queue.playing)
        return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
  
      if (!client.utils.canModifyQueue(interaction)) return;
  
      await queue.setFilters({
        "phaser" : !queue.getFiltersEnabled().includes("phaser")
      });
  
    return client.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes("phaser") ? `Applied` : "Removed"} the Phaser filter.`);
    } else if (filter === "pulsator") {
      const queue = client.player.getQueue(interaction.guild.id);

      if (!queue || !queue.playing)
        return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
  
      if (!client.utils.canModifyQueue(interaction)) return;
  
      await queue.setFilters({
        "pulsator" : !queue.getFiltersEnabled().includes("pulsator")
      });
  
    return client.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes("pulsator") ? `Applied` : "Removed"} the Pulsator filter.`);
    } else if (filter === "reverse") {
      const queue = client.player.getQueue(interaction.guild.id);

      if (!queue || !queue.playing)
        return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
  
      if (!client.utils.canModifyQueue(interaction)) return;
  
      await queue.setFilters({
        "reverse" : !queue.getFiltersEnabled().includes("reverse")
      });
  
    return client.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes("reverse") ? `Applied` : "Removed"} the Reverse filter.`);
    } else if (filter === "softlimiter") {
      const queue = client.player.getQueue(interaction.guild.id);

      if (!queue || !queue.playing)
        return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
  
      if (!client.utils.canModifyQueue(interaction)) return;
  
      await queue.setFilters({
        "softlimiter" : !queue.getFiltersEnabled().includes("softlimiter")
      });
  
    return client.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes("softlimiter") ? `Applied` : "Removed"} the SoftLimiter filter.`);
    } else if (filter === "subboost") {
      const queue = client.player.getQueue(interaction.guild.id);

      if (!queue || !queue.playing)
        return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
  
      if (!client.utils.canModifyQueue(interaction)) return;
  
      await queue.setFilters({
        "subboost" : !queue.getFiltersEnabled().includes("subboost")
      });
  
    return client.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes("subboost") ? `Applied` : "Removed"} the SubBoost filter.`);
    } else if (filter === "surrounding") {
      const queue = client.player.getQueue(interaction.guild.id);

      if (!queue || !queue.playing)
        return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
  
      if (!client.utils.canModifyQueue(interaction)) return;
  
      await queue.setFilters({
        "surrounding" : !queue.getFiltersEnabled().includes("surrounding")
      });
  
    return client.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes("surrounding") ? `Applied` : "Removed"} the Surrounding filter.`);
    } else if (filter === "treble") {
      const queue = client.player.getQueue(interaction.guild.id);

      if (!queue || !queue.playing)
        return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
  
      if (!client.utils.canModifyQueue(interaction)) return;
  
      await queue.setFilters({
        "treble" : !queue.getFiltersEnabled().includes("treble")
      });
  
    return client.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes("treble") ? `Applied` : "Removed"} the Treble filter.`);
    } else if (filter === "tremolo") {
      const queue = client.player.getQueue(interaction.guild.id);

      if (!queue || !queue.playing)
        return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
  
      if (!client.utils.canModifyQueue(interaction)) return;
  
      await queue.setFilters({
        "tremolo" : !queue.getFiltersEnabled().includes("tremolo")
      });
  
    return client.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes("tremolo") ? `Applied` : "Removed"} the Tremolo filter.`);
    } else if (filter  === "vaporwave") {
      const queue = client.player.getQueue(interaction.guild.id);

      if (!queue || !queue.playing)
        return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
  
      if (!client.utils.canModifyQueue(interaction)) return;
  
      await queue.setFilters({
        "vaporwave" : !queue.getFiltersEnabled().includes("vaporwave")
      });
  
    return client.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes("vaporwave") ? `Applied` : "Removed"} the Vaporwave filter.`);
    
    } else if (filter === "vibrato") {

      const queue = client.player.getQueue(interaction.guild.id);

      if (!queue || !queue.playing)
        return client.say.errorMessage(interaction, "I’m currently not playing in this guild.");
  
      if (!client.utils.canModifyQueue(interaction)) return;
  
      await queue.setFilters({
        "vibrato" : !queue.getFiltersEnabled().includes("vibrato")
      });
  
    return client.say.infoMessage(interaction, `${queue.getFiltersEnabled().includes("vibrato") ? `Applied` : "Removed"} the Vibrato filter.`);
    
    } else if (filter === "reset") {
      await queue.setFilters();
      return client.say.infoMessage(interaction, "Removed all filters.");
    } else {
      return client.say.infoMessage(interaction, `Requested filter doesn't exist!`);
    }

    } else if (interaction.options.getSubcommand() === "list") {

      let listEmbed = new EmbedBuilder()
      .setTitle("Music Filters")
      .setDescription("`8d`, `bassboost`, `compressor`, `dim`, `expander`, `flanger`, `gate`, `haas`, `karaoke`, `mcomoand`, `mono`, `mstlr`, `mstrr`, `nightcore`, `phaser`, `pulsator`, `reverse`, `softlimiter`, `subboost`, `surrounding`, `treble`, `tremolo`, `vaporwave`, `vibrato`")
      .setColor("BLUE")

      return interaction.editReply({ embeds: [listEmbed], ephemeral: true})
    }
  }
};