<template>
  <no-data-layout
    class="fill-height"
    v-bind="{ hasData }"
    :class="{ 'pa-0': hasData }"
  >
    <make-answer-no-data
      slot="no-data"
      :has-no-answer="!item"
      :has-no-question="!question"
      @reload="fetch"
    />

    <v-layout
      column
      v-if="item"
    >
      <v-alert
        color="blue"
        dismissible
        :value="true"
        class="my-0 x-full alert-center"
      >
        <div v-if="isModeCreate">Feel free to provide professional help to askers to improve their knowledge and insights.</div>
        <div v-else>Make sure to not change the entire gist of the answer to avoid confusion!</div>
      </v-alert>
      
      <v-flex class="overflow-y-auto">
        <v-form
          v-model="valid"
          class="pa-3"
        >
          <v-textarea
            outline
            clearable
            auto-grow
            :disabled="loading"
            v-model="item.content"
            color="accent"
            label="Enter your answer"
            hint="Further explain your answer"
            :rules="[ $vRule('required') ]"
          />

          <v-switch
            ripple
            v-model="isPrivate"
            label="Add pricing for this answer"
          />

          <v-slide-y-reverse-transition>
            <div v-if="isPrivate">
              <v-text-field
                step="any"
                type="number"
                label="Price"
                v-model="item.price"
                prepend-icon="monetization_on"
                :rules="[ $vRule('min', 0.01), $vRule('max', 10), $vRule('decimals', 2) ]"
              />
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
          Answers should be reasonable, appropriate, concise, and focused on the question.
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
import { MakeAnswerNoData } from '@/components/Answer/NoData'
import NoDataLayout from '@/layouts/NoDataLayout'

export default {
  name: 'make-answer',
  mixins: [backable, makeable, formRulesMixin],
  components: {
    NoDataLayout,
    MakeAnswerNoData
  },

  data: () => ({
    item: null,
    question: null,
    isPrivate: false,
    valid: false
  }),

  computed: {
    questionId() {
      return this.$route.params.qid
    },
    answerId() {
      return this.$route.params.aid
    },

    hasData() {
      // should both be present
      return !!this.question && !!this.item
    },

    requestProps() {
      const props = {
        create: {
          method: 'post',
          url: 'answers'
        },
        update: {
          method: 'patch',
          url: `answers/${this.answerId}`
        }
      }

      return props[this.mode]
    },

    btnSaveText() {
      const props = {
        create: {
          true: 'Posting...',
          false: 'Post answer'
        },
        update: {
          true: 'Updating...',
          false: 'Update answer'
        }
      }

      return props[this.mode][this.loading] || 'Save answer'
    },

    ...mapState(['loading'])
  },

  watch: {
    item(item) {
      if (!item) {
        return
      }

      this.isPrivate = !!item.privated_at
    }
  },

  created() {
    this.fetch()
  },

  methods: {
    ...methods,

    fetch() {
      // fetch question first then fetch answer
      this.fetchQuestion()
    }
  }
}
</script>
