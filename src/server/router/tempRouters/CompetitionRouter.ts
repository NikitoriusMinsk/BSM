import { createRouter } from "../context";
import { z } from "zod";

const currentCompetitionTemp = {
    startedOn: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 3
    ),
    endsOn: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 7
    ),
    leaders: [
        {
            name: 'John Doe',
            image: '/images/profile-placeholder.png',
            prize: 750,
        },
        {
            name: 'Jane Doe',
            image: '/images/profile-placeholder.png',
            prize: 450,
        },
        {
            name: 'Jill Doe',
            image: '/images/profile-placeholder.png',
            prize: 250,
        },
    ]
}

const previousCompetitions = [
    {
        name: "Competition 1",
        startedOn: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate() - 12
        ),
        endsOn: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate() - 11
        ),
        users: [
            {
                name: 'John Doe',
                image: '/images/profile-placeholder.png',
                prize: 750,
                subscriptionCost: 20,
                winrate: 0.5,
                avgProfit: 600,
                subscriberCount: 2000
            },
            {
                name: 'Jane Doe',
                image: '/images/profile-placeholder.png',
                prize: 450,
                subscriptionCost: 10,
                winrate: 0.6,
                avgProfit: 400,
                subscriberCount: 2500
            },
            {
                name: 'James Doe',
                image: '/images/profile-placeholder.png',
                prize: 250,
                subscriptionCost: 15,
                winrate: 0.7,
                avgProfit: 200,
                subscriberCount: 1500
            },
            {
                name: 'Joe Doe',
                image: '/images/profile-placeholder.png',
                prize: 150,
                subscriptionCost: 15,
                winrate: 0.7,
                avgProfit: 200,
                subscriberCount: 1500
            },
            {
                name: 'Jill Doe',
                image: '/images/profile-placeholder.png',
                prize: 250,
                subscriptionCost: 15,
                winrate: 0.7,
                avgProfit: 200,
                subscriberCount: 1500
            },
        ]
    },
    {
        name: "Competition 2",
        startedOn: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate() - 11
        ),
        endsOn: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate() - 10
        ),
        users: [
            {
                name: 'John Doe',
                image: '/images/profile-placeholder.png',
                prize: 750,
                subscriptionCost: 20,
                winrate: 0.5,
                avgProfit: 600,
                subscriberCount: 2000
            },
            {
                name: 'Jane Doe',
                image: '/images/profile-placeholder.png',
                prize: 450,
                subscriptionCost: 10,
                winrate: 0.6,
                avgProfit: 400,
                subscriberCount: 2500
            },
            {
                name: 'Jane Doe',
                image: '/images/profile-placeholder.png',
                prize: 250,
                subscriptionCost: 15,
                winrate: 0.7,
                avgProfit: 200,
                subscriberCount: 1500
            },
        ]
    },
    {
        name: "Competition 3",
        startedOn: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate() - 8
        ),
        endsOn: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate() - 5
        ),
        users: [
            {
                name: 'John Doe',
                image: '/images/profile-placeholder.png',
                prize: 750,
                subscriptionCost: 20,
                winrate: 0.5,
                avgProfit: 600,
                subscriberCount: 2000
            },
            {
                name: 'Jane Doe',
                image: '/images/profile-placeholder.png',
                prize: 450,
                subscriptionCost: 10,
                winrate: 0.6,
                avgProfit: 400,
                subscriberCount: 2500
            },
            {
                name: 'Jane Doe',
                image: '/images/profile-placeholder.png',
                prize: 250,
                subscriptionCost: 15,
                winrate: 0.7,
                avgProfit: 200,
                subscriberCount: 1500
            },
        ]
    },
    {
        name: "Competition 4",
        startedOn: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate() - 5
        ),
        endsOn: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate() - 4
        ),
        users: [
            {
                name: 'John Doe',
                image: '/images/profile-placeholder.png',
                prize: 750,
                subscriptionCost: 20,
                winrate: 0.5,
                avgProfit: 600,
                subscriberCount: 2000
            },
            {
                name: 'Jane Doe',
                image: '/images/profile-placeholder.png',
                prize: 450,
                subscriptionCost: 10,
                winrate: 0.6,
                avgProfit: 400,
                subscriberCount: 2500
            },
            {
                name: 'Jane Doe',
                image: '/images/profile-placeholder.png',
                prize: 250,
                subscriptionCost: 15,
                winrate: 0.7,
                avgProfit: 200,
                subscriberCount: 1500
            },
        ]
    },
    {
        name: "Competition 5",
        startedOn: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate() - 4
        ),
        endsOn: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate() - 1
        ),
        users: [
            {
                name: 'John Doe',
                image: '/images/profile-placeholder.png',
                prize: 750,
                subscriptionCost: 20,
                winrate: 0.5,
                avgProfit: 600,
                subscriberCount: 2000
            },
            {
                name: 'Jane Doe',
                image: '/images/profile-placeholder.png',
                prize: 450,
                subscriptionCost: 10,
                winrate: 0.6,
                avgProfit: 400,
                subscriberCount: 2500
            },
            {
                name: 'Jane Doe',
                image: '/images/profile-placeholder.png',
                prize: 250,
                subscriptionCost: 15,
                winrate: 0.7,
                avgProfit: 200,
                subscriberCount: 1500
            },
        ]
    }
]

export const competitionRouter = createRouter()
    .query("getCurrent", {
        async resolve() {
            return currentCompetitionTemp
        },
    })
    .query("getPrevious", {
        async resolve() {
            return previousCompetitions
        }
    })
