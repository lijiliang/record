var socialcourse = {
    init: function () {
        this.$form = $('#social_course_search_form');
        this.$time = this.$form.find('.social_course_time');
        this.$page = this.$form.find('.social_course_page');
        this.$keywords = this.$form.find('.hp-search-inp');

        this.$form.submit(function() {
            socialcourse.submitForm();
            return false;
        });
    },
    submitForm: function () {
        var $list = this.$list;
        var action = this.$form.attr('action');
        
        if (this.$page.val()) {
            action += '?page=' + this.$page.val();
        }
        
        if (this.$time.val()) {
            action += '&t=' + this.$time.val();
        }
        
        if (this.$keywords.val()) {
            action += '&q=' + this.$keywords.val();
        }

        location.href = action;
    }
};

$(function () {
    socialcourse.init();
});
