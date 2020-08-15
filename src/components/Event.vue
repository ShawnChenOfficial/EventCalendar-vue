<template>
  <div class="border-bottom">
    <b-form @reset="Cancel" v-show="!submitted" class="mt-5 mb-4">
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
      <b-form-group id="input-group-time" label="Time:" label-for="input-time">
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
      <b-button
        type="reset"
        variant="secondary"
        class="mr-1"
        size="sm"
        v-if="!editing"
      >
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
    <div v-show="submitted" class="mt-5 mb-4">
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
        @click="$emit('remove')"
      >
        Remove
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "description", "time", "event"],
  data() {
    return {
      form: {
        title: this.title,
        description: this.description,
        time: this.time
      },
      submitted: false,
      editing: false
    };
  },
  mounted() {
    if (
      this.form.title != "" ||
      this.form.description != "" ||
      this.form.time != ""
    ) {
      this.submitted = true;
      this.editing = false;
    }
  },
  methods: {
    Cancel() {
      this.$emit("cancel");
    },
    async Submit() {
      await this.$emit("update", this.event, this.form);
      !this.editing
        ? this.Notification("Add", "An event added", "success")
        : this.Notification("Update", "An event updated", "success");
      this.submitted = true;
      this.editing = false;
    },
    Edit() {
      this.submitted = false;
      this.editing = true;
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

<style></style>
