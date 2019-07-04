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
      <v-alert
        color="blue"
        dismissible
        :value="true"
        class="my-0 x-full alert-center"
      >
        <div v-if="isModeCreate">Feel free to ask for professional help from who are experts in their field.</div>
        <div v-else>Make sure to not change the entire gist of the question to avoid confusion!</div>
      </v-alert>
      
      <v-flex class="overflow-y-auto">
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

          <!-- TODO: input tags -->
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

export default {
  name: 'make-question',
  mixins: [backable, makeable, formRulesMixin],
  components: {
    NoDataLayout,
    UpdateQuestionNoData
  },

  data: () => ({
    item: null,
    valid: false
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

  created() {
    this.fetch()
  },

  methods: {
    ...methods
  }
}
</script>
