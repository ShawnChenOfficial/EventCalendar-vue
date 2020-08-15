<template>
  <div :class="{ 'col-12 col-lg border pb-5': true, today: istoday }">
    <div v-if="istoday">{{ date }} (Today)</div>
    <div v-if="!istoday">{{ date }}</div>
    <div>{{ weekday }}</div>
    <div class="border-top"></div>
    <div class="mt-2 event-block">
      <div
        is="event_tag"
        v-for="event in events"
        v-bind:key="event.keyid"
        v-bind:title="event.title"
        v-bind:description="event.description"
        v-bind:time="event.time"
        v-bind:event="event"
        @getlskey="BuildLSKey"
        @update="Update"
        @remove="Remove(event)"
        @cancel="Cancel(event)"
      ></div>
      <div class="mt-3">
        <b-button variant="link" size="sm" @click="Add">
          <b-icon icon="plus-square" class="hover-icons-add-event"></b-icon>
        </b-button>
      </div>
      <b-icon
        v-show="loading"
        class="mt-5"
        icon="x-diamond-fill"
        animation="throb"
        font-scale="4"
      ></b-icon>
    </div>
  </div>
</template>

<script>
import event_tag from "./Event.vue";

export default {
  components: {
    event_tag
  },
  data() {
    return {
      loading: true,
      events: [],
      NextToDoId: 0
    };
  },
  props: ["date", "weekday", "month", "year", "istoday"],
  mounted() {
    this.GetEvents();
  },
  methods: {
    GetEvents() {
      this.loading = true;
      if (localStorage.getItem(this.BuildLSKey())) {
        try {
          this.events = JSON.parse(localStorage.getItem(this.BuildLSKey()));
          this.NextToDoId = this.events[this.events.length - 1].keyid + 1;
        } catch {
          localStorage.getItem(this.events);
        }
      } else {
        this.NextToDoId = 0;
      }
      this.loading = false;
    },
    BuildLSKey() {
      //LS represents local storage
      return this.date + "-" + this.month + "-" + this.year;
    },
    SaveInLS() {
      localStorage.setItem(this.BuildLSKey(), JSON.stringify(this.events));
    },
    Add() {
      this.events.push({
        keyid: this.NextToDoId++,
        title: "",
        description: "",
        time: ""
      });
      this.SaveInLS();
    },
    async Remove(item) {
      this.events.splice([this.events.indexOf(item)], 1);
      this.SaveInLS();
      this.Notification("Remove", "An event removed", "warning");
    },
    Cancel(item) {
      this.events.splice([this.events.indexOf(item)], 1);
      this.SaveInLS();
    },
    Update(event, form) {
      this.events[this.events.indexOf(event)].title = form.title;
      this.events[this.events.indexOf(event)].description = form.description;
      this.events[this.events.indexOf(event)].time = form.time;
      this.SaveInLS();
    },
    Notification(title, message, variant) {
      this.$bvToast.toast(message, {
        title: title,
        toaster: "b-toaster-bottom-right",
        variant: variant,
        solid: true
      });
    }
  }
};
</script>

<style>
.today {
  background-color: #9995bb;
}
.hover-icons-add-event:hover {
  transition: all 0.5s;
  width: 24px;
  height: 24px;
}
</style>
