import { createRouter } from "../context";
import { z } from "zod";

const NewsTemp = [
    {
        title: 'Group H Preview - FIFA World Cup Qatar 2022: Will the star strikers produce on the big stage?',
        date: '2020-06-01',
        likes: 10,
        comments: 2,
        views: 100,
        image: '/images/slide-background-placeholder.png'
    },
    {
        title: 'Group H Preview - FIFA World Cup Qatar 2022: Will the star strikers produce on the big stage?',
        date: '2020-06-01',
        likes: 10,
        comments: 2,
        views: 100,
        image: '/images/slide-background-placeholder.png'
    },
    {
        title: 'Group H Preview - FIFA World Cup Qatar 2022: Will the star strikers produce on the big stage?',
        date: '2020-06-01',
        likes: 10,
        comments: 2,
        views: 100,
        image: '/images/slide-background-placeholder.png'
    },
    {
        title: 'Group H Preview - FIFA World Cup Qatar 2022: Will the star strikers produce on the big stage?',
        date: '2020-06-01',
        likes: 10,
        comments: 2,
        views: 100,
        image: '/images/slide-background-placeholder.png'
    },
    {
        title: 'Group H Preview - FIFA World Cup Qatar 2022: Will the star strikers produce on the big stage?',
        date: '2020-06-01',
        likes: 10,
        comments: 2,
        views: 100,
        image: '/images/slide-background-placeholder.png'
    },
    {
        title: 'Group H Preview - FIFA World Cup Qatar 2022: Will the star strikers produce on the big stage?',
        date: '2020-06-01',
        likes: 10,
        comments: 2,
        views: 100,
        image: '/images/slide-background-placeholder.png'
    },
    {
        title: 'Group H Preview - FIFA World Cup Qatar 2022: Will the star strikers produce on the big stage?',
        date: '2020-06-01',
        likes: 10,
        comments: 2,
        views: 100,
        image: '/images/slide-background-placeholder.png'
    },
    {
        title: 'Group H Preview - FIFA World Cup Qatar 2022: Will the star strikers produce on the big stage?',
        date: '2020-06-01',
        likes: 10,
        comments: 2,
        views: 100,
        image: '/images/slide-background-placeholder.png'
    },
    {
        title: 'Group H Preview - FIFA World Cup Qatar 2022: Will the star strikers produce on the big stage?',
        date: '2020-06-01',
        likes: 10,
        comments: 2,
        views: 100,
        image: '/images/slide-background-placeholder.png'
    },
    {
        title: 'Group H Preview - FIFA World Cup Qatar 2022: Will the star strikers produce on the big stage?',
        date: '2020-06-01',
        likes: 10,
        comments: 2,
        views: 100,
        image: '/images/slide-background-placeholder.png'
    },

]

export const newsRouter = createRouter().query("getAll", {
    async resolve() {
        return NewsTemp
    },
});
