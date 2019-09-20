<template>
  <div class="swiper-container" ref="swiper" :id="ID">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in swipeList" :key="index*Math.random()*10">
        <slot :row="item"></slot>
      </div>
    </div>
    <div v-if="pagination" class="swiper-pagination"></div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
export default {
  props: {
    pagination: {
      type: Boolean,
      default: true
    },
    freemode: {
      type: Boolean,
      default: false
    },
    swipeList: {
      type: Array,
      default () {
        return []
      }
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    ID: {
      type: String,
      default: 'swiper'
    }
  },
  data () {
    return {}
  },
  // watch: {
  //   swipeList () {
  //     this.swiper.updateSize()
  //   }
  // },
  methods: {
    swiperRun () {
      return new Swiper(`#${this.ID}.swiper-container`, Object.assign(
        {
          observer: true
        },
        this.pagination ? { pagination: { el: '.swiper-pagination' } } : {},
        this.freemode ? { slidesPerView: 3, spaceBetween: 30, freeMode: true } : {},
        this.options
      ))
    }
  },
  mounted () {
    this.swiperRun()
  }
}
</script>
