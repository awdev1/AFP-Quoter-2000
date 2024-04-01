const { Client, GatewayIntentBits } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { config } = require("dotenv");
const { SlashCommandBuilder } = require("@discordjs/builders");

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const quotes = [
  "There is now a hot air balloon doing a high-speed pass by the tower \nAnd it's gone space shuttle status",
  "OH MY GOD THE LEFT SIDE OF THAT DIAMOND FORMATION IS A HOT AIR BALLOON",
  "I AM IN A DIAMOND FORMATION WITH A HELICOPTER AND A HOT AIR BALOON GOING 450 KNOTS",
  "What kind of snacks do you have on board\npretzels and peanuts\ndo you have any cookies on board?\n.... yes\ndo you really?\ni cannot confirm nor deny cookies on board\nsir im going to have to ask you to remain grounded until we can confirm cookies on board\ncan we taxi back to the gate to load cookies?",
  "NO NO NO DO NOT START WITH THE BABY...\nAND NOW HE SHID UNBELIEVABLE",
  "GIMME THE F**KING PRETZELS",
  "*PSHHHK* \nLadies and gentlemen from the flight deck this is your captain speakin,\n some idiot just dropped his phone in the toilet and it's causing us to divert.\n To make matters worse it's not even an iPhone it's an Android.\n I truly could not be more disappointed in you people.\n*PSHHHK*",
  "Hey what up sauce boss",,
  "Hey everyone, GroundPound69 here",
  "Hey everyone, BottleCruncher95 here",
  "Hey everyone, AirPod95 here",
  "AND THE WORST LANDING OF THE YEAR GOES TO N700A WHO HAS PORPOISED THE ENTIRITY OF THE RUNWAY",
  "Sounds like a personal problem",
  "requesting mayday",
  "uh random caller mayday denied",
  "We are going space-shuttle status",
  "BUTTER",
  "Dogfight me bro",
  "Blog it. Write a book.",
  "V1... rotaté",
  "Rodger dodger chief",
  "Welcome to FSX Steam edition",

  "Hey What's up everyone Weird Florida man here",
  "Aircraft- nObOdY dO aNyThInG \nAFP- YES EVERYONE PAUSE YOUR SIMULATORS SO THIS ONE GUY CAN FIGURE OUT HIS NAME",
  "CAPTAIN WE´RE FLYING WITH NO ENGINES, WHATS THE PLAN \nIT'S WAFFLE NIGHT",
  "AFP- Oscar Oscar... foxtrot?\n Aircraft-DONT QUESTION IT JUST GO WITH IT\n AFP- duh-WELL IM GOING TO QUESTION A CALLSIGN THAT OOF OKAY? \nSO DONT CHECK IN AS OOF AND EXPECT THERE TO BE NO REPERCUSSIONS",
  "I SEE THE CURVATURE OF THE EARTH OUT THE WINDOW"
];

const commands = [
  new SlashCommandBuilder()
    .setName("quote")
    .setDescription("Get a random AirForceProud95 quote"),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);
  const activities = [
    { name: "Airforceproud95 quotes", type: "WATCHING" },

  ];

  try {
    console.log("Started refreshing application (/) commands.");


    const globalCommandsResult = await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands },
    );
    console.log("Global Commands:", globalCommandsResult);

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error("Error during command registration:", error);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "quote") {

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];


    await interaction.reply({
      embeds: [
        {
          title: "AirForceProud95 Quotes",
          description: '"'+randomQuote+'"',
          color: 0x3498db,
          footer: {
            text: "Developed by ChatGPT as a Stress Test with too much human interaction",
            icon_url:
              "https://yt3.googleusercontent.com/ytc/AIf8zZSlLc93SjTAF7g1NsvVsHLSIqk4VOMJ6LHHPTUtWw=s176-c-k-c0x00ffffff-no-rj",
          },
        },
      ],
      components: [
        {
          type: 1, 
          components: [
            {
              type: 2, 
              style: 5, 
              label: "Watch his videos",
              url: "https://www.youtube.com/@Airforceproud95", 
            },
          ],
        },
      ],
    });
  }
});

const token = process.env.DISCORD_TOKEN;
client.login(token);
