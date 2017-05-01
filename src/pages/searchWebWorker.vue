<template>
    <main-layout>
        <div style="position: relative">
            <p>{{title}}</p>
            <input v-on:keyup="find" v-model="filter" type="text" />
            <transition-group name="list" tag="p">
                <p key="1" v-if="searching" style="position: absolute; text-align: center"><img style="width: 50%" src="src/images/loading-1.gif"></p>
            </transition-group>
            <p v-if="!searching">Found {{results}} items</p>
            <ul v-if="!searching">
                <transition-group name="list" tag="p">
                    <li v-for="item in displayItems" v-bind:key="item" class="list-item">
                    {{ item.city }}
                    </li>
                </transition-group>
            </ul>
        </div>
    </main-layout>
</template>

<script>
    import MainLayout from '../layouts/main.vue';
    import _ from 'lodash';
    var worker;
    export default {
        components: { MainLayout },
        data() {
            return {
                title: 'Welcome to Search page',
                items: [],
                displayItems: [],
                filter: '',
                results: 0,
                searching: false
            }
        },
        mounted() {
            worker = new Worker('src/workers/searchWorker.js');
            worker.onmessage = (e) => {
                this.items = e.data.data;
                this.results = e.data.size;
                this.displayItems = this.items;
                this.title = 'Welcome to Search page (WebWorker)';
                worker.onmessage = (e) => {
                    this.results = e.data.size;
                    this.displayItems = e.data.data;
                    this.searching = false;
                }
            };
            this.items = [];
            this.displayItems = this.items;
            worker.postMessage({action: 'getUsers'});
        },
        methods: {
            find: _.debounce(function() {
                this.searching = true;
                worker.postMessage({
                    action: 'findUser',
                    filter: this.filter
                });
            }, 500)
        }
    }
</script>

<style>
img {
    width: 100%;
}
ul.list {
    margin: 0;
    padding: 0;
}
ul li {
    list-style: none;
}
.list-enter-active, .list-leave-active {
  transition: all 0.3s;
}
.list-enter, .list-leave-to /* .list-leave-active for <2.1.8 */ {
  opacity: 0;
}
</style>