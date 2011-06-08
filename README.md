Quinn
=====

[Quinn][github] is a jQuery-based plugin which creates sliders (aka.
ranges, aka. track  bars) for HTML-based appliications. The project is
hosted on [GitHub][github]; you can report bugs and discuss features on
the [issue tracker][issues], or direct your tweets at [@antw][twitter].

    $('.slider').quinn();


The library requires [jQuery][jq] and [Underscore.js][us].

Quinn has been tested and confirmed working in the following
environments:

 - Chrome 11 and 12
 - Firefox 3.5 and 4.0
 - Safari 4
 {:.yes}

Tests in Internet Explorer and Opera are pending, as is support for
touch devices. There are no plans to support Internet Explorer 6.

Quinn was developed as part of Quintel Intelligence's [Energy Transition
Model][etm] application, and has been open-sourced with their kind
permission. Quinn is released under the [New BSD License][license].

Downloads
---------

[Development Version (0.0.1)][development-js]
:   11.2kb, Uncompressed with comments

[Production Version (0.0.1)][production-js]
:   1.25kb, Minified and Gzipped

Table of Contents
-----------------

#### Options

[Minima and Maxima][range], [Initial Values][value],
[Steps][step], [Selectable Ranges][selectable], [Effects][effects]

#### Callbacks

[onSetup][onsetup], [onChange][onchange]

Options
-------

In order to customise the appearance and behaviour of the Quinn slider
instance, you may pass extra options when initiazing:
`$(selector).quinn(optionsHash);`

### Minima and Maxima `range: [min, max]` {#range}

By default, a Quinn slider allows selection of whole numbers between 0
and 100. By supplying a **range** option, you can change these values:
**range** should be an array of two values, where the first value is the
minimum value represented on the slider, and the second is the maximum.

    // Our volume knobs go up to eleven.
    $('.slider').quinn({ range: [ 0, 11 ] });

### Initial Values `value: number` {#value}

When a slider is created without a default value, it will initialze with
the slider in the minimum value position. Supplying a **value** option
results in the slider being created with a different starting value.

    $('.slider').quinn({ value: 25 });

### Steps `step: number` {#step}

The **step** option restricts the values which may be selected using the
slider to numbers which are divisible by the step without a remainder.
For example, a step of 10 only 0, 10, 20, 30, ..., n, to be chosen.

    $('.slider').quinn({ step: 10 });

If you supply an initial value which can't be used as it doesn't "fit"
with the step, the value will be rounded to the nearest acceptable point
on the slider. For example, an step of 10, and an initial value of 17
will result in the slider being initialized with a value of 20 instead.

Combining the **step** option with **[range][range]** permits the
creation of sliders with arbitrary values:

    $('.slider').quinn({ range: [0, 1.21], step: 0.01 });

### Selectable Ranges `selectable: [min, max]` {#selectable}

Sometimes you want to show a slider where only a certain partition of
the values may be chosen by the user. This is achieved using the
**selectable** option.

The example below is created with the default range `[0, 100]`, but
restricts the values the user may select:

    $('.slider').quinn({ selectable: [35, 80] });

The "selectable" values can be changed later with `setSelectable(min,
max)`.

When using **selectable**, your **step** option will still be respected
and **selectable** values which don't fit with the step will be rounded
to the nearest inclusive step. Note that in the example below the lowest
selectable value (5) is not available since `step: 20` is used. The
lower value is instead rounded to 20 (not 0 since this is outside the
selectable range supplied and might break your data validation later).

    $('.slider').quinn({ selectable: [5, 80], step: 20 });

### Effects `effects: bool` `effectSpeed: number` {#effects}

Some Quinn actions make use of jQuery effects. For example, clicking on
the slider bar immediately changes the value and animates movement of
the handle to the new position. Animation length may be altered with the
**effectSpeed** option which may be any valid jQuery animation length
(fast, slow, or a number), or disabled completely by setting `effects:
false`.

If the [Easing][easing] library is available, your default animation
easing function will be used.

    $('.slider').quinn({ effects: false });

Callbacks
---------

The behavior of the slider may be further customised through the use of
callback functions which are supplied as part of the options object when
creating the slider.

### onSetup `onSetup: function (currentValue, quinn)` {#onsetup}

**onSetup** is run only once, immediately after the Quinn constructor
has completed. Two arguments are supplied: the current value of the
slider and the Quinn instance. Note that the slider value given during
initialization may differ from the one given to the callback since the
constructor adjusts the slider value to fit with the **range**,
**selectable**, and **step** options. The value supplied to the
callback is correct.

### onChange `onChange: function (newValue, quinn)` {#onchange}

The **onChange** callback is run each time the slider value changes. The
function is supplied with two arguments: the new slider value, and the
Quinn instance. The previous value of the slider can be retrieved with
`quinn.value` since the value attribute is only updated after the
callback has completed.

    $('.slider').quinn({
        onChange: function (newValue, slider) {
            var h = (128 - newValue * 1.28).toFixed(),
                l = (35 + newValue * 0.1).toFixed();

            $('.value').
                css('color', 'hsl(' + h + ', 50%, ' + l + '%)');
        },

        onSetup: function (value, slider) {
            // Run the onChange callback immediately.
            slider.options.onChange.call(slider, value);
        }
    });

Be aware that the **onChange** callback is run every time the slider
value changes, which can be extremely frequent when dragging the slider
handle. This is perfect for "hooking" in to the slider to display the
value elsewhere in your UI (such as the examples on this page), to
update a graph in real-time, etc, but is not suitable for persisting the
slider value to a server unless you like flooding your application with
tens of HTTP requests per second. Use **onComplete** which is fired only
after the user has finished dragging the handle.

Explicitly returning false in the callback will prevent the change.

    $('.slider').quinn({
        onChange: function (newValue, slider) {
            // Prevent selection of 41 to 59.
            if (newValue > 40 && newValue < 60) {
                return false;
            }
        }
    });

### onComplete `onComplete: function (newValue, quinn)` {#oncomplete}

**onComplete** is similar to the to the **onChange** event in that it is
fired when the slider value is changed by a user. However, unlike
**onChange** it is fired only after the user has _finished_ changing the
value. This is defined as clicking the slider bar to change the value,
or lifting the left mouse button after dragging the slider handle.

    $('.slider').quinn({
        value: 25,

        onComplete: function (newValue, slider) {
            // Disallow selecting a value over 50, but only
            // after the user has finished moving the slider.
            if (newValue > 50) {
                return false;
            }
        }
    });

History
-------

#### 0.0.1 _June 8th, 2011_

Initial release on GitHub. Supports most planned features, but tests in
Opera and Internet Explorer are not yet complete.

[github]:         http://github.com/antw/quinn
[issues]:         http://github.com/antw/quinn/issues
[twitter]:        http://twitter.com/antw
[etm]:            http://www.energytransitionmodel.com
[license]:        http://github.com/antw/quinn/blob/master/LICENSE
[jq]:             http://jquery.com
[us]:             http://documentcloud.github.com/underscore

[development-js]: http://antw.github.com/quinn/jquery.quinn.js
[production-js]:  http://antw.github.com/quinn/jquery.quinn.min.js

[range]:          #range
[value]:          #value
[step]:           #step
[selectable]:     #selectable
[effects]:        #effects
[onsetup]:        #onsetup
[onchange]:       #onchange