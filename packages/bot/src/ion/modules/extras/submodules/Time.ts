import cityTimezones from "city-timezones";
import { NewMessageEvent } from "telegram/events";
import align from "align-text";

export const GetTime = (event: NewMessageEvent, params: string[]) => {
  const [...cityName] = params;

  const cityLookup = cityTimezones.lookupViaCity(String(cityName).trim());
  if (cityLookup.length == 0) {
    event.message.edit({ text: "❌ City Not found: " + cityName });
    return;
  }

  let message = "";
  let city = cityLookup[0];
  const cityTimeFormat = new Intl.DateTimeFormat([], {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: city.timezone,
  });

  message += "City Name: `" + city.city + "`\n";
  message += "Country: `" + city.country + "`\n";
  message += "Province: `" + city.province + "`\n";
  message += "Timezone: `" + city.timezone + "`\n";
  message += "Time Now: `" + cityTimeFormat.format(new Date()) + "`\n";

  event.message.edit({
    text: align(message),
    parseMode: "markdown",
  });
};
