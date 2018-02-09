<template>
  <footer class="footer">
        <div class="footer__wrap">
          <div class="footer__secondary">
            <div class="footer__inner">
              <div class="footer__region">
                <span>{{$t('message.Region')}}</span>
                <select class="footer__region__select" v-model="selected">
                  <option value="en">USA</option>
                  <option value="zh">中文</option>
                </select>
              </div>
              <div class="footer__secondary__nav">
                <span>Copyright © 2018 All Rights Reserved.</span>
                <a href="">
                  {{$t('message.AboutUs')}}
                </a>
                <a href="">
                  {{$t('message.Terms')}} &amp; {{$t('message.Conditions')}}
                </a>
                <a href="">
                  {{$t('message.PrivacyPolicy')}}
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
</template>
<script>
export default {
  data () {
    return{
      selected: 'en'
    }
  },
  watch: {
    selected: function(val, oldVal){
      this.$i18n.locale = val;
    }
  }
}
</script>
