<template>
  <div class="home">
    <div class="container" id="pdfDom">
      <div class="text-left calendar-header">
        <b-button class="mr-5" variant="primary" @click="PrevWeek"
          >Prev</b-button
        >
        <div>{{ Month }}, {{ Year }}</div>
        <b-button class="ml-5" variant="success" size="sm" @click="BackToday"
          >Today</b-button
        >
        <b-button class="ml-5" variant="primary" @click="NextWeek"
          >Next</b-button
        >
      </div>
      <div class="row border rounded-top mt-4">
        <transition-group name="list" class="col-12 row m-0 p-0">
          <div
            is="Day_el"
            v-for="list in lists"
            v-bind:key="list.key"
            v-bind:day="list.day"
            v-bind:weekday="list.weekday"
            v-bind:istoday="list.istoday"
          ></div>
        </transition-group>
      </div>
    </div>
    <b-button @click="PrintPDF()" class="mt-3">Download PDF</b-button>
  </div>
</template>

<script>
// @ is an alias to /src
import Day_el from "../components/CalendarDay.vue";

export default {
  name: "Home",
  components: {
    Day_el
  },
  data() {
    return {
      lists: [],
      NextToDoId: 0,
      today: new Date(),
      searchdate: new Date()
    };
  },
  created() {
    this.GetDays();
  },
  computed: {
    Month() {
      return this.$store.state.Months[this.searchdate.getMonth()];
    },
    Year() {
      return this.searchdate.getFullYear();
    }
  },
  methods: {
    GetDays() {
      this.lists = [];
      var WeekDayToday = this.searchdate.getDay();
      for (let x = 0; x < 7; x++) {
        this.lists.push({
          key: this.NextToDoId++,
          day: new Date(
            this.searchdate.getTime() - WeekDayToday * 24 * 60 * 60 * 1000
          ).getDate(),
          weekday: this.$store.state.WeekDays[x],
          istoday:
            this.searchdate.getDate() === this.today.getDate() &&
            this.searchdate.getMonth() === this.today.getMonth() &&
            this.searchdate.getFullYear() === this.today.getFullYear() &&
            x === this.today.getDay()
        });
        WeekDayToday -= 1;
      }
    },
    BackToday() {
      this.searchdate = this.today;
      this.GetDays();
    },
    NextWeek() {
      this.searchdate = new Date(
        this.searchdate.getTime() + 7 * 24 * 60 * 60 * 1000
      );
      this.GetDays();
    },
    PrevWeek() {
      this.searchdate = new Date(
        this.searchdate.getTime() - 7 * 24 * 60 * 60 * 1000
      );
      this.GetDays();
    },
    PrintPDF() {
      this.getPdf("WeeklySchedule");
    }
  }
};
</script>
<style>
.calendar-header {
  display: flex;
}
.event-block {
  min-height: 200px;
}
.list-enter-active {
  transition: all 0.5s;
}
.list-leave-active {
  transition: all 0s;
}
.list-enter,
.list-leave-active {
  opacity: 0;
}
</style>
