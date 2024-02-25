export default defineNuxtRouteMiddleware(async (to, from) => {
    if (to.path === '/') {
        return navigateTo('/home');
    }

    if (to.path === '/home') {
        const email = useCookie('email');
        const password = useCookie('password');

        const {data} = await useFetch('/api/login', {
            method: 'POST',
            body: {
                email: email.value,
                password: password.value
            }
        });

        if (!data?.value) {
            return navigateTo('/login')
        }

    }
})