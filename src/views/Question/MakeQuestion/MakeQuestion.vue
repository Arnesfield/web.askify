<template>
  <no-data-layout
    v-bind="{ hasData }"
    :class="{ 'pa-0': hasData }"
    class="fill-height max-h no-toolbar"
  >
    <update-question-no-data
      slot="no-data"
      @reload="fetch"
    />

    <v-layout
      column
      v-if="item"
    >
      <v-flex class="overflow-y-auto">
        <v-alert
          color="blue"
          dismissible
          :value="true"
          class="my-0 x-full alert-center"
        >
          <div v-if="isModeCreate">Feel free to ask for professional help from who are experts in their field.</div>
          <div v-else>Make sure to not change the entire gist of the question to avoid confusion!</div>
        </v-alert>

        <v-form
          v-model="valid"
          class="pa-3"
        >
          <v-text-field
            clearable
            :disabled="loading"
            v-model="item.title"
            color="accent"
            label="Title of question"
            hint="Title should be brief and consise"
            :rules="[ $vRule('required') ]"
          />

          <v-textarea
            outline
            clearable
            auto-grow
            :disabled="loading"
            v-model="item.content"
            color="accent"
            label="Detailed description"
            hint="Further explain your question"
            class="mt-3"
            :rules="[ $vRule('required') ]"
          />

          <tags-input
            v-model="item.tags"
            :autocomplete-props="{
              autocompleteProps: {
                rules: [ $vRule('required', 'Should have at least 1 tag.') ]
              }
            }"
          />

          <v-switch
            ripple
            v-model="isUrgent"
            label="Set urgent date"
          />

          <v-slide-y-reverse-transition>
            <div v-if="isUrgent">
              <v-subheader>
                Your question will be marked as&nbsp;<strong class="underline">urgent</strong>.
              </v-subheader>

              <dialog-date-picker
                close-on-ok
                v-model="urgentVal.date"
                :dialog.sync="dialogUrgent.date"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-on="on"
                    readonly
                    clearable
                    color="accent"
                    prepend-icon="event"
                    label="Select date urgency"
                    v-model="urgentVal.date"
                    :rules="[$vRule('required')]"
                  />
                </template>
              </dialog-date-picker>

              <dialog-time-picker
                close-on-ok
                v-model="urgentVal.time"
                :dialog.sync="dialogUrgent.time"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-on="on"
                    readonly
                    clearable
                    color="accent"
                    prepend-icon="access_time"
                    label="Select time"
                    v-model="urgentVal.time"
                    :rules="[$vRule('required')]"
                  />
                </template>
              </dialog-time-picker>
            </div>
          </v-slide-y-reverse-transition>
        </v-form>
      </v-flex>

      <v-divider/>
      <div class="py-2 px-2 white">
        <div
          style="line-height: 12px"
          class="mb-2 caption text-xs-center text--secondary"
        >
          Questions should be reasonable and appropriate.
          Consider searching for similar questions before posting.
        </div>

        <v-btn
          block
          large
          class="ma-0"
          color="primary"
          :disabled="loading || !valid"
          @click="save"
        >
          <span v-text="btnSaveText"/>
        </v-btn>
      </div>
    </v-layout>
  </no-data-layout>
</template>

<script>
import { mapState } from 'vuex'
import * as methods from './methods'
import { backable, makeable } from '@/mixins'
import { formRulesMixin } from '@/utils/formRules'
import { UpdateQuestionNoData } from '@/components/Question/NoData'
import NoDataLayout from '@/layouts/NoDataLayout'
import TagsInput from '@/components/Tag/TagsInput'
import DialogDatePicker from '@/components/utils/DialogDatePicker'
import DialogTimePicker from '@/components/utils/DialogTimePicker'

export default {
  name: 'make-question',
  mixins: [backable, makeable, formRulesMixin],
  components: {
    TagsInput,
    NoDataLayout,
    DialogDatePicker,
    DialogTimePicker,
    UpdateQuestionNoData
  },

  data: () => ({
    item: null,
    valid: false,
    isUrgent: false,
    dialogUrgent: {
      date: false,
      time: false
    },
    urgentVal: {
      date: '',
      time: ''
    }
  }),

  computed: {
    questionId() {
      return this.$route.params.id
    },

    hasData() {
      return !!this.item
    },

    requestProps() {
      const props = {
        create: {
          method: 'post',
          url: 'questions'
        },
        update: {
          method: 'patch',
          url: `questions/${this.questionId}`
        }
      }

      return props[this.mode]
    },

    btnSaveText() {
      const props = {
        create: {
          true: 'Posting...',
          false: 'Post question'
        },
        update: {
          true: 'Updating...',
          false: 'Update question'
        }
      }

      return props[this.mode][this.loading] || 'Save question'
    },

    ...mapState(['loading'])
  },

  watch: {
    item: 'setDatetimeFromItem',
    urgentVal: {
      deep: true,
      handler: 'setDatetimeToItem'
    }
  },

  created() {
    this.fetch()
  },

  methods: {
    ...methods,

    setDatetimeFromItem(item) {
      const { urgent_at: u } = item || {}
      if (u) {
        // if has
        this.isUrgent = true
        const dt = u.split(' ')
        this.urgentVal.date = dt[0]
        this.urgentVal.time = dt[1]
      }
    },
    setDatetimeToItem(dt) {
      const d = `${dt.date || ''} ${dt.time || ''}:00`
      this.$set(this.item, 'urgent_at', d)
    }
  }
}
</script>
