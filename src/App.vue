<template>
    <div id="app">
        <Header></Header>
        <router-view></router-view>
        <Footer v-show="$route.meta.show"></Footer>
    </div>
</template>

<script>
    import Header from "./components/Header/index";
    import Footer from "./components/Footer/index";

    export default {
        name: "App",
        components: {
            Header,
            Footer
        },
        mounted() {
            this.$store.dispatch("categoryList");
        }
    };
</script>

<style>

</style>
