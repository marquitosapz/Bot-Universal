const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ban",
  description: "Banear un miembro",
  options: [
    { name: "usuario", description: "Usuario a banear", type: 6, required: true },
    { name: "razon", description: "Razón del baneo", type: 3, required: false }
  ],
  async execute(interaction, config) {
    if (!interaction.member.roles.cache.some(r => config.rolesAdmin.includes(r.id))) {
      return interaction.reply({ content: "❌ No tienes permisos", ephemeral: true });
    }

    const miembro = interaction.options.getMember("usuario");
    const razon = interaction.options.getString("razon") || "No especificada";

    if (!miembro.bannable) return interaction.reply({ content: "❌ No puedo banear a ese usuario", ephemeral: true });

    await miembro.ban({ reason: razon });

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("⛔ Usuario baneado")
          .setDescription(`Usuario: ${miembro.user.tag}\nRazón: ${razon}`)
          .setThumbnail(miembro.user.displayAvatarURL({ dynamic: true }))
          .setColor("Red")
          .setTimestamp()
      ]
    });
  }
};