<template>
  <div class="home">
    <div class="container-fluid" id="pdfDom">
      <div class="text-left calendar-header pb-5">
        <b-icon
          v-b-tooltip.hover
          title="Previous Year"
          icon="chevron-bar-left"
          class="mr-4 mt-2 pointer hover-icons"
          @click="PrevYear"
        ></b-icon>
        <b-icon
          v-b-tooltip.hover
          title="Previous Month"
          icon="chevron-double-left"
          class="mr-4 mt-2 pointer hover-icons"
          @click="PrevMonth"
        ></b-icon>
        <b-icon
          v-b-tooltip.hover
          title="Previous Week"
          icon="chevron-left"
          class="mr-4 mt-2 pointer hover-icons"
          @click="PrevWeek"
        ></b-icon>
        <div class="mt-1">
          <strong>{{ Month }}, {{ Year }}</strong>
        </div>
        <b-icon
          v-b-tooltip.hover
          title="Back Today"
          icon="arrow-counterclockwise"
          class="ml-4 mt-2 pointer hover-icons"
          @click="BackToday"
          v-show="!isontoday"
        ></b-icon>
        <b-icon
          v-b-tooltip.hover
          title="Next Week"
          icon="chevron-right"
          class="ml-4 mt-2 pointer hover-icons"
          @click="NextWeek"
        ></b-icon>
        <b-icon
          v-b-tooltip.hover
          title="Next Month"
          icon="chevron-double-right"
          class="ml-4 mt-2 pointer hover-icons"
          @click="NextMonth"
        ></b-icon>
        <b-icon
          v-b-tooltip.hover
          title="Next Year"
          icon="chevron-bar-right"
          class="ml-4 mt-2 pointer hover-icons"
          @click="NextYear"
        ></b-icon>
        <b-icon
          v-b-tooltip.hover
          title="Download the event schedule for this week"
          icon="box-arrow-in-down"
          class="ml-4 mt-2 pointer hover-icons"
          @click="PrintPDF"
        ></b-icon>
      </div>
      <div class="row border rounded-top mt-4 mb-5">
        <transition-group name="list" class="col-12 row m-0 p-0">
          <div
            is="Day_el"
            v-for="list in lists"
            v-bind:key="list.key"
            v-bind:date="list.date"
            v-bind:month="list.month"
            v-bind:year="list.year"
            v-bind:weekday="list.weekday"
            v-bind:istoday="list.istoday"
          ></div>
        </transition-group>
      </div>
    </div>
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
      searchdate: new Date(),
      isontoday: true
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
          date: new Date(
            this.searchdate.getTime() - WeekDayToday * 24 * 60 * 60 * 1000
          ).getDate(),
          weekday: this.$store.state.WeekDays[x],
          month: this.searchdate.getMonth(),
          year: this.searchdate.getFullYear(),
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
      if (this.isontoday == false) {
        this.searchdate = this.today;
        this.GetDays();
        this.isontoday = true;
      }
    },
    NextWeek() {
      this.searchdate = new Date(
        this.searchdate.getTime() + 7 * 24 * 60 * 60 * 1000
      );
      this.GetDays();
      this.isontoday = false;
    },
    PrevWeek() {
      this.searchdate = new Date(
        this.searchdate.getTime() - 7 * 24 * 60 * 60 * 1000
      );
      this.GetDays();
      this.isontoday = false;
    },
    NextMonth() {
      this.searchdate = new Date(
        this.searchdate.getMonth == 11
          ? this.searchdate.getFullYear() + 1
          : this.searchdate.getFullYear(),
        this.searchdate.getMonth() + 1,
        this.searchdate.getDate()
      );
      this.GetDays();
      this.isontoday = false;
    },
    PrevMonth() {
      this.searchdate = new Date(
        this.searchdate.getMonth == 1
          ? this.searchdate.getFullYear() - 1
          : this.searchdate.getFullYear(),
        this.searchdate.getMonth() - 1,
        this.searchdate.getDate()
      );
      this.GetDays();
      this.isontoday = false;
    },
    NextYear() {
      this.searchdate = new Date(
        this.searchdate.getFullYear() + 1,
        this.searchdate.getMonth(),
        this.searchdate.getDate()
      );
      this.GetDays();
      this.isontoday = false;
    },
    PrevYear() {
      this.searchdate = new Date(
        this.searchdate.getFullYear() - 1,
        this.searchdate.getMonth(),
        this.searchdate.getDate()
      );
      this.GetDays();
      this.isontoday = false;
    },
    PrintPDF() {
      this.getPdf("WeeklySchedule");
      this.Notification(
        "PDF generator",
        "Weekly schedure has printed.",
        "info"
      );
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
.pointer {
  cursor: pointer;
}
.calendar-header {
  height: 40px !important;
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
.hover-icons:hover {
  transition: all 0.5s;
  width: 24px;
  height: 24px;
  transform: translate(-4px, -4px);
}
</style>
