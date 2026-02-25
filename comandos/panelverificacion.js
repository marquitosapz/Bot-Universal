const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "verificacionpanel",
  description: "Enviar panel de verificación",
  async execute(interaction, config) {

    const boton = new ButtonBuilder()
      .setCustomId("verificar")
      .setLabel("✅ Verificarse")
      .setStyle(ButtonStyle.Success);

    const row = new ActionRowBuilder().addComponents(boton);

    const embed = new EmbedBuilder()
      .setTitle("🔐 Verificación")
      .setDescription("Pulsa el botón para verificarte y acceder al servidor")
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .setColor("Green")
      .setTimestamp();

    interaction.reply({ embeds: [embed], components: [row] });
  }
};