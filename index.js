const fs = require("fs");
const path = require("path");
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  REST,
  Routes
} = require("discord.js");

const config = require("./config.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

client.commands = new Collection();

// ----------------------
// CARGAR COMANDOS
// ----------------------
const comandosPath = path.join(__dirname, "comandos");
const files = fs.readdirSync(comandosPath).filter(f => f.endsWith(".js"));

let commandsForDiscord = [];

for (const file of files) {
  const cmd = require(`./comandos/${file}`);
  client.commands.set(cmd.name, cmd);

  commandsForDiscord.push({
    name: cmd.name,
    description: cmd.description || "Sin descripción",
    options: cmd.options || []
  });

  console.log(`🟢 Comando cargado: ${file}`);
}
console.log(`✅ Total comandos: ${commandsForDiscord.length}`);

// ----------------------
// AUTO REGISTRO SLASH COMMANDS
// ----------------------
client.once("ready", async () => {
  console.log("=================================");
  console.log(`🤖 Bot listo: ${client.user.tag}`);
  console.log(`🏠 Server: ${config.nombreServer}`);
  console.log(`⚡ Estado: ONLINE`);
  console.log("=================================");

  try {
    const rest = new REST({ version: "10" }).setToken(config.token);
    await rest.put(
      Routes.applicationGuildCommands(client.user.id, config.guildId),
      { body: commandsForDiscord }
    );
    console.log("✅ Comandos registrados automáticamente en Discord");
  } catch (error) {
    console.error("❌ Error al registrar comandos:", error);
  }
});

// ----------------------
// BIENVENIDA
// ----------------------
client.on("guildMemberAdd", member => {
  const canal = member.guild.channels.cache.get(config.canalBienvenida);
  if (!canal) return;

  const embed = new EmbedBuilder()
    .setTitle(`👋 Bienvenido a ${config.nombreServer}`)
    .setDescription(`✨ ${member}`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setColor("Green")
    .setTimestamp();

  canal.send({ embeds: [embed] });
});

// ----------------------
// DESPEDIDA
// ----------------------
client.on("guildMemberRemove", member => {
  const canal = member.guild.channels.cache.get(config.canalDespedida);
  if (!canal) return;

  const embed = new EmbedBuilder()
    .setTitle("😢 Usuario salió")
    .setDescription(`❌ ${member.user.tag} abandonó el servidor`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setColor("Red")
    .setTimestamp();

  canal.send({ embeds: [embed] });
});

// ----------------------
// INTERACCIONES
// ----------------------
client.on("interactionCreate", async interaction => {

  // COMANDOS
  if (interaction.isChatInputCommand()) {
    const cmd = client.commands.get(interaction.commandName);
    if (!cmd) return;

    try {
      await cmd.execute(interaction, config);
    } catch (err) {
      console.error(err);
    }
  }

  // BOTONES
  if (interaction.isButton()) {

    // VERIFICACIÓN
    if (interaction.customId === "verificar") {
      const rol = interaction.guild.roles.cache.get(config.rolVerificado);
      if (!rol) return;

      await interaction.member.roles.add(rol);
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("✅ Verificado")
            .setDescription("🎉 Ahora tienes acceso al servidor")
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setColor("Green")
            .setTimestamp()
        ],
        ephemeral: true
      });
    }

    // CREAR TICKET
    if (interaction.customId === "crear_ticket") {

      const canal = await interaction.guild.channels.create({
        name: `ticket-${interaction.user.username}`,
        type: 0,
        parent: config.categoriaTicket || null,
        permissionOverwrites: [
          { id: interaction.guild.id, deny: ["ViewChannel"] },
          { id: interaction.user.id, allow: ["ViewChannel", "SendMessages"] },
          { id: config.rolesTicket, allow: ["ViewChannel"] }
        ]
      });

      const cerrarBtn = new ButtonBuilder()
        .setCustomId("cerrar_ticket")
        .setLabel("🔒 Cerrar Ticket")
        .setStyle(ButtonStyle.Danger);

      const row = new ActionRowBuilder().addComponents(cerrarBtn);

      const embed = new EmbedBuilder()
        .setTitle("🎟️ Ticket abierto")
        .setDescription("📩 Explica tu problema aquí")
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setColor("Blue")
        .setTimestamp();

      canal.send({ content: `<@${interaction.user.id}>`, embeds: [embed], components: [row] });

      return interaction.reply({ content: "✅ Ticket creado", ephemeral: true });
    }

    // CERRAR TICKET
    if (interaction.customId === "cerrar_ticket") {
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("🔒 Cerrando ticket...")
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setColor("Red")
            .setTimestamp()
        ]
      });

      setTimeout(() => interaction.channel.delete(), 3000);
    }
  }
});

client.login(config.token);