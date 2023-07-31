import moment from "moment-timezone";

const deprecatedTimeZones = [
	"UCT",
	"PST8PDT",
	"GB",
	"MST7MDT",
	"EST5EDT",
	"W-SU",
	"CST6CDT",
	"HST",
	"MST",
	"Universal",
	"EET",
	"WET",
	"EST",
	"CET",
	"MET",
	"GMT",
	"Etc",
];
const deprecatedTimeZonesRegex = `^${deprecatedTimeZones.join("|^")}`;

const timezones = moment.tz
	.names()
	.filter(
		(timezone) =>
			timezone.startsWith("A") ||
			!new RegExp(deprecatedTimeZonesRegex).test(timezone)
	)
	.sort((timezoneA, timezoneB) => timezoneA.localeCompare(timezoneB))
	.map((timezone) => ({
		timezone,
	}));

export default timezones;
