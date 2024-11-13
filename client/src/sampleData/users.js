import { companies } from "./companies"
export const users = [
    {
    _id: 1,
    username: "admin",
    email: "1999yunxin@gmail.com",
    password: "yunxin12345",
    isAdmin: true,
    applications: companies.filter((company) => company.user === 1)
    },
    {
    _id: 2,
    username: "user",
    email: "12345@gmail.com",
    password: "user12345",
    isAdmin: false,
    applications: companies.filter((company) => company.user === 2)
    },
    {
    _id: 3,
    username: "user2",
    email: "user2@gmail.com",
    password: "user212345",
    isAdmin: false,
    applications: companies.filter((company) => company.user === 3)
    }
]