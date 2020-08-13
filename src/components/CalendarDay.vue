<template>
  <div :class="{ 'col-12 col-lg border pb-5': true, today: istoday }">
    <div v-if="istoday">{{ day }} (Today)</div>
    <div v-if="!istoday">{{ day }}</div>
    <div>{{ weekday }}</div>
    <div class="border-top"></div>
    <div class="mt-2 event-block">
      <b-button
        variant="link"
        size="sm"
        @click="Add"
        v-show="Display && !submitted"
      >
        <b-icon icon="plus-square"></b-icon>
      </b-button>
      <b-form @reset="Cancel" v-show="!Display && !submitted" class="pt-3">
        <b-form-group
          id="input-group-title"
          label="Title:"
          label-for="input-title"
        >
          <b-form-input
            size="sm"
            id="input-title"
            v-model="form.title"
            type="text"
            required
            placeholder="Enter title"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-time"
          label="Time:"
          label-for="input-time"
        >
          <b-form-input
            size="sm"
            id="input-time"
            v-model="form.time"
            type="time"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-description"
          label="Description:"
          label-for="input-description"
        >
          <b-form-input
            size="sm"
            id="input-description"
            v-model="form.description"
            type="text"
            required
            placeholder="Enter title"
          ></b-form-input>
        </b-form-group>
        <b-button type="reset" variant="secondary" class="mr-1" size="sm">
          Cancel
        </b-button>
        <b-button
          type="button"
          variant="primary"
          class="ml-1"
          size="sm"
          @click="Submit"
        >
          OK
        </b-button>
      </b-form>
      <div v-show="submitted" class="pt-3">
        <p>Title:</p>
        <p>{{ form.title }}</p>
        <p>Time: {{ form.time }}</p>
        <p>Description:</p>
        <p>{{ form.description }}</p>
        <b-button
          type="button"
          variant="primary"
          class="mr-1"
          size="sm"
          @click="Edit"
        >
          Edit
        </b-button>
        <b-button
          type="button"
          variant="danger"
          class="ml-1"
          size="sm"
          @click="Remove"
        >
          Remove
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Display: true,
      form: {
        title: "",
        description: "",
        time: ""
      },
      submitted: false,
      isAlert: false,
      AlertInfo: ""
    };
  },
  props: ["day", "weekday", "istoday"],
  methods: {
    Add() {
      this.Display = false;
    },
    Cancel() {
      this.Display = true;
    },
    Submit() {
      this.submitted = true;
    },
    Edit() {
      this.submitted = false;
      this.Display = false;
    },
    Remove() {
      this.submitted = false;
      this.Display = true;
      this.form = {
        title: "",
        description: "",
        time: ""
      };
    }
  }
};
</script>

<style>
.today {
  background-color: #9995bb;
}
</style>
