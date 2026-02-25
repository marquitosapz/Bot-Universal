const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "clear",
  description: "Eliminar mensajes del canal",
  options: [
    {
      name: "cantidad",
      description: "Cantidad de mensajes a eliminar",
      type: 4,
      required: true
    }
  ],
  async execute(interaction, config) {
    const cantidad = interaction.options.getInteger("cantidad");

    if (!interaction.member.roles.cache.some(r => config.rolesAdmin.includes(r.id))) {
      return interaction.reply({ content: "❌ No tienes permisos", ephemeral: true });
    }

    await interaction.channel.bulkDelete(cantidad, true);

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`🧹 Se eliminaron ${cantidad} mensajes`)
          .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
          .setColor("Yellow")
          .setTimestamp()
      ],
      ephemeral: true
    });
  }
};