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
            var self = this;
            var data = null;
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                var founds = 0;
                if (this.readyState === 4) {
                    self.items = JSON.parse(this.responseText);
                    self.displayItems = self.items.splice(0, 100);
                    self.results = self.items.length;
                    self.title = 'Welcome to Search page - with ' + self.items.length + ' entries';
                }
            });

            xhr.open("GET", "http://localhost:8080/src/pages/data.json");
            xhr.send(data);
        },
        methods: {
            find: function() {
                this.searching = true;
                setTimeout(() => {
                    this.displayItems = this.filter.length > 0 ? this.items.filter(item => {
                        return ('' + item.city).toUpperCase().indexOf(this.filter.toUpperCase()) >= 0 ||
                            ('' + item.state).toUpperCase().indexOf(this.filter.toUpperCase()) >= 0 ||
                            ('' + item.loc).toUpperCase().indexOf(this.filter.toUpperCase()) >= 0 ||
                            ('' + item.pop).toUpperCase().indexOf(this.filter.toUpperCase()) >= 0 ||
                            ('' + item._id).toUpperCase().indexOf(this.filter.toUpperCase()) >= 0 ;
                    }) : this.items;
                    this.results = this.displayItems.length;
                    this.displayItems = this.displayItems.slice(0, 100);
                    this.searching = false;
                }, 0);
            }
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