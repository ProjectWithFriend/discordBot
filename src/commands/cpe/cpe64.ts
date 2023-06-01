import {SlashCommandBuilder, EmbedBuilder} from 'discord.js'
import {MongoClient} from 'mongodb'
import {command} from '../../utils'
import keys from "../../keys";

const meta = new SlashCommandBuilder()
    .setName('cpe64')
    .setName("cpe64")
    .setDescription("To find the friend information of CPE64")
    .addStringOption((option) =>
        option
            .setName("id")
            .setDescription("The StudentID of the friend")
            .setRequired(true)
    )

export default command(meta, async ({interaction, log}) => {
    const StudentID = interaction.options.getString("id");
    const client = new MongoClient(keys.MONGO_URI);
    try {
        await client.connect();
        const database = client.db("cpe64info");
        const collection = database.collection("cpe");
        const query = { id: StudentID };
        const result = await collection.findOne(query);
        if (result == null) {
            await interaction.reply({
                content: "This student ID does not exist",
                ephemeral: true,
            });
        } else {
            const embed = new EmbedBuilder()
                .setTitle(`Information of ${StudentID}`)
                .setAuthor({
                    name: "CPE64 Friend Information",
                    // iconUrl: "https://i.imgur.com/8EoXZRz.png",
                })
                .setDescription(
                    "🖥️ This is the information of the friend you are looking for 🖥️"
                )
                .setImage(await result.img)
                .setTimestamp()
                .setFooter({
                    text: "❤️CPE64 Friend Information presented by AuJungZ❤️",
                    // iconUrl: "https://i.imgur.com/8EoXZRz.png",
                });
            await interaction.reply({ embeds: [embed] });

        }
        log(`${interaction.user.tag} used cpe64 command at ${new Date().toLocaleString("th-TH", {
            timeZone: "Asia/Bangkok",
        })} `)
        client.close();
    } catch (err) {
        console.log(err.stack);
    }
})