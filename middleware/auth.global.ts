export default defineNuxtRouteMiddleware(async (to, from) => {
    if (to.path === '/') {
        return navigateTo('/home');
    }

    if (to.path === '/home') {
        const email = useCookie('email');
        const password = useCookie('password');
        const db = useSupabaseClient();


        const {data} = await db.from('users').select('*').match({
            email: email,
            password: password
        });

    }
})