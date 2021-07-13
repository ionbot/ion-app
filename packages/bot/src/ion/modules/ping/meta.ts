export default {
  slug: "ping",
  name: "Ping",
  description:
    "Just to check if your bot is alive or not, shows Ion version also.",

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
