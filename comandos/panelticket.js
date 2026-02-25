const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "ticketpanel",
  description: "Enviar panel de tickets",
  async execute(interaction, config) {

    const boton = new ButtonBuilder()
      .setCustomId("crear_ticket")
      .setLabel("🎟️ Abrir Ticket")
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(boton);

    const embed = new EmbedBuilder()
      .setTitle("🎟️ Sistema de Soporte")
      .setDescription("📩 Pulsa el botón para crear un ticket")
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .setColor("Blue")
      .setTimestamp();

    interaction.reply({ embeds: [embed], components: [row] });
  }
};