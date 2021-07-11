export default {
  name: "Ping",
  description:
    "Just to check if your bot is alive or not, shows Ion version also.",
  slug: "ping",

  match: "ping",
  scope: "all",
  mode: "outgoing",

  config: {
    showLatency: {
      info: "Display Latency",
      description: "Enable this to display the latency along in the message",
      type: "switch",
    },
    extra: {
      info: "Extra Message",
      description:
        "Type here your message to add it in the ping command's response",
      type: "text",
    },
  },
};
