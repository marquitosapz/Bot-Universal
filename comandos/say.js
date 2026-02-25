const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "say",
  description: "El bot envía un mensaje",
  options: [
    {
      name: "mensaje",
      description: "Mensaje a enviar",
      type: 3,
      required: true
    }
  ],
  async execute(interaction, config) {
    if (!interaction.member.roles.cache.some(r => config.rolesAdmin.includes(r.id))) {
      return interaction.reply({ content: "❌ No tienes permisos", ephemeral: true });
    }

    const mensaje = interaction.options.getString("mensaje");
    const embed = new EmbedBuilder()
      .setDescription(mensaje)
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setColor("Blue")
      .setTimestamp();

    await interaction.channel.send({ embeds: [embed] });
    interaction.reply({ content: "✅ Mensaje enviado", ephemeral: true });
  }
};