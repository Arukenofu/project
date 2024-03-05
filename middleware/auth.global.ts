export default defineNuxtRouteMiddleware(async (to, from) => {
    if (to.path === '/') {
        return navigateTo('/home');
    }

    if (to.path === '/home') {
        const email = useCookie('email');
        const password = useCookie('password');
        const db = useSupabaseClient();

        console.log(email.value, password.value);

        const {data} = await db.from('users').select('*').match({
            email: email.value,
            password: password.value
        });

        if (!data?.length) {
            const router = useRouter();

            await router.push('/login');
        }
    }
})