const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "kick",
  description: "Expulsar un miembro",
  options: [
    { name: "usuario", description: "Usuario a expulsar", type: 6, required: true },
    { name: "razon", description: "Razón de expulsión", type: 3, required: false }
  ],
  async execute(interaction, config) {
    if (!interaction.member.roles.cache.some(r => config.rolesAdmin.includes(r.id))) {
      return interaction.reply({ content: "❌ No tienes permisos", ephemeral: true });
    }

    const miembro = interaction.options.getMember("usuario");
    const razon = interaction.options.getString("razon") || "No especificada";

    if (!miembro.kickable) return interaction.reply({ content: "❌ No puedo expulsar a ese usuario", ephemeral: true });

    await miembro.kick(razon);

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("👢 Usuario expulsado")
          .setDescription(`Usuario: ${miembro.user.tag}\nRazón: ${razon}`)
          .setThumbnail(miembro.user.displayAvatarURL({ dynamic: true }))
          .setColor("Orange")
          .setTimestamp()
      ]
    });
  }
};