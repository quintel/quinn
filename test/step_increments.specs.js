QUnit.specify('', function () {
    var wrapper = $('#slider'), slider;

    describe('stepUp', function () {
        var wrapper = $('#slider'), slider, onChangeRun, onCompleteRun;

        after(function () {
            wrapper.html('');
        });

        describe('When step: 1', function () {
            before(function () {
                onChangeRun   = false;
                onCompleteRun = false;

                slider = new $.Quinn(wrapper, {
                    onChange:   function () { onChangeRun   = true },
                    onComplete: function () { onCompleteRun = true },
                });
            });

            it('should increment the slider value by 1', function () {
                assert(slider.stepUp()).equals(1);
                assert(slider.value).equals(1);
            });

            it('should increment by multiples of the step', function () {
                assert(slider.stepUp(2)).equals(2);
                assert(slider.value).equals(2);
            });

            it('should add the old value to previousValues', function () {
                slider.stepUp();
                assert(slider.previousValues).isSameAs([0]);
            });

            it('should run onChange', function () {
                slider.stepUp();
                assert(onChangeRun).isTrue();
            });

            it('should run onComplete', function () {
                slider.stepUp();
                assert(onCompleteRun).isTrue();
            });
        });

        describe('When step: 10', function () {
            before(function () {
                slider = new $.Quinn(wrapper, { step: 10 });
            });

            it('should increment the slider value by 10', function () {
                assert(slider.stepUp()).equals(10);
                assert(slider.value).equals(10);
            });

            it('should increment by multiples of the step', function () {
                assert(slider.stepUp(2)).equals(20);
                assert(slider.value).equals(20);
            });
        });

        describe('When already at maximum value', function () {
            before(function () {
                onChangeRun   = false;
                onCompleteRun = false;

                slider = new $.Quinn(wrapper, { value: 100 });
            });

            it('should not change the slider value', function () {
                assert(slider.stepUp()).equals(100);
                assert(slider.value).equals(100);
            });

            it('should not run onChange', function () {
                slider.stepUp();
                assert(onChangeRun).isFalse();
            });

            it('should not run onComplete', function () {
                slider.stepUp();
                assert(onCompleteRun).isFalse();
            });
        });

        describe('When nearly at maximum value', function () {
            before(function () {
                slider = new $.Quinn(wrapper, { value: 99 });
            });

            it('should not change the slider value', function () {
                assert(slider.stepUp(2)).equals(100);
                assert(slider.value).equals(100);
            });
        });

        describe('when the slider is disabled', function () {
            before(function () {
                onChangeRun   = false;
                onCompleteRun = false;

                slider = new $.Quinn(wrapper, { disable: true });
            });

            it('should not change the slider value', function () {
                assert(slider.stepUp()).equals(0);
                assert(slider.value).equals(0);
            });

            it('should not change previousValues', function () {
                slider.stepUp();
                assert(slider.previousValues.length).equals(0);
            });

            it('should not run onChange', function () {
                slider.stepUp();
                assert(onChangeRun).isFalse();
            });

            it('should not run onComplete', function () {
                slider.stepUp();
                assert(onCompleteRun).isFalse();
            });
        });
    });

    describe('stepDown', function () {
        var wrapper = $('#slider'), slider, onChangeRun, onCompleteRun;

        after(function () {
            wrapper.html('');
        });

        describe('When step: 1', function () {
            before(function () {
                onChangeRun   = false;
                onCompleteRun = false;

                slider = new $.Quinn(wrapper, {
                    value:      100,
                    onChange:   function () { onChangeRun   = true },
                    onComplete: function () { onCompleteRun = true },
                });
            });

            it('should decrement the slider value by 1', function () {
                assert(slider.stepDown()).equals(99);
                assert(slider.value).equals(99);
            });

            it('should increment by multiples of the step', function () {
                assert(slider.stepDown(2)).equals(98);
                assert(slider.value).equals(98);
            });

            it('should add the old value to previousValues', function () {
                slider.stepDown();
                assert(slider.previousValues).isSameAs([100]);
            });

            it('should run onChange', function () {
                slider.stepDown();
                assert(onChangeRun).isTrue();
            });

            it('should run onComplete', function () {
                slider.stepDown();
                assert(onCompleteRun).isTrue();
            });
        });

        describe('When step: 10', function () {
            before(function () {
                slider = new $.Quinn(wrapper, { value: 100, step: 10 });
            });

            it('should increment the slider value by 10', function () {
                assert(slider.stepDown()).equals(90);
                assert(slider.value).equals(90);
            });

            it('should increment by multiples of the step', function () {
                assert(slider.stepDown(2)).equals(80);
                assert(slider.value).equals(80);
            });
        });

        describe('When already at minumum value', function () {
            before(function () {
                onChangeRun   = false;
                onCompleteRun = false;

                slider = new $.Quinn(wrapper);
            });

            it('should not change the slider value', function () {
                assert(slider.stepDown()).equals(0);
                assert(slider.value).equals(0);
            });

            it('should not run onChange', function () {
                slider.stepDown();
                assert(onChangeRun).isFalse();
            });

            it('should not run onComplete', function () {
                slider.stepDown();
                assert(onCompleteRun).isFalse();
            });
        });

        describe('When nearly at minimum value', function () {
            before(function () {
                slider = new $.Quinn(wrapper, { value: 1 });
            });

            it('should not change the slider value', function () {
                assert(slider.stepDown(2)).equals(0);
                assert(slider.value).equals(0);
            });
        });

        describe('when the slider is disabled', function () {
            before(function () {
                onChangeRun   = false;
                onCompleteRun = false;

                slider = new $.Quinn(wrapper, { value: 100, disable: true });
            });

            it('should not change the slider value', function () {
                assert(slider.stepDown()).equals(100);
                assert(slider.value).equals(100);
            });

            it('should not change previousValues', function () {
                assert(slider.previousValues.length).equals(0);
            });

            it('should not run onChange', function () {
                slider.stepDown();
                assert(onChangeRun).isFalse();
            });

            it('should not run onComplete', function () {
                slider.stepDown();
                assert(onCompleteRun).isFalse();
            });
        });
    });

});