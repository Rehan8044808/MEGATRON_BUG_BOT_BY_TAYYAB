module.exports = async function ({ conn, m, isGroup, reply, jid, sender, args }) {
  try {
    if (!isGroup) return reply("❌ Group only command.");

    const group = await conn.groupMetadata(jid);
    const members = group.participants.map(p => p.id);
    const senderNum = sender.replace(/\D/g, "");

    const msg = args.length > 0 ? args.join(" ") : "No custom message ✨";

    const header = `╔═════『 𝗧𝗔𝗚𝗔𝗟𝗟 𝗔𝗟𝗘𝗥𝗧 ⚠️ 』═════╗\n`;
    const by = `👤 *Requested by:* @${senderNum}\n`;
    const message = `📝 *Message:* \`\`\`${msg}\`\`\`\n`;
    const separator = `\n╠═════『 👥 Members 』═════╣\n`;
    const mentionsList = members.map((u, i) => `🔹 ${i + 1}. @${u.split("@")[0]}`).join("\n");
    const footer = `\n╚═════ ⧼ をRBをBALOCHを 𝗕𝗢𝗧 ⚡ ⧽ ═════╝`;

    const finalMessage = `${header}${by}${message}${separator}${mentionsList}${footer}`;

    await conn.sendMessage(
      jid,
      { text: finalMessage, mentions: members },
      { quoted: m }
    );
  } catch (err) {
    console.error("❌ Tagall Error:", err);
    reply("❌ Failed to tag members.\n\n> をRBをBALOCHを ❦ ✓");
  }
};
