import { createRouter } from "../context";
import { z } from "zod";

const Sports = [
    { href: '/sport', label: 'Football', live: true },
    { href: '/sport', label: 'Basketball', live: true },
    { href: '/sport', label: 'Hockey', live: false },
    { href: '/sport', label: 'Handball', live: false },
    { href: '/sport', label: 'Tennis', live: true },
    { href: '/sport', label: 'Rugby', live: false },
    { href: '/sport', label: 'Baseball', live: true },
    { href: '/sport', label: 'Volleyball', live: false },
]

const Timezones = [
    { date: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }), id: '1', name: 'America/New_York' },
    { date: new Date().toLocaleString("en-US", { timeZone: "Europe/Moscow" }), id: '2', name: 'Europe/Moscow' },
    { date: new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" }), id: '3', name: 'Asia/Tokyo' },
]

export const navigationRouter = createRouter()
    .query("getSports", {
        async resolve() {
            return Sports
        },
    })
    .query("getTimezones", {
        async resolve() {
            return Timezones
        }
    })
