export const BaseAPI = "https://mock-api.driven.com.br/api/v4/driven-plus";

export const config = (user) => {return{headers: {
    "Autorization": `Bearer ${user.token}`
}}}