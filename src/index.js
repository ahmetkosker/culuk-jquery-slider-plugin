import jQuery from 'jquery'

window.$ = jQuery;

(function ($) {
    $.fn.culukSlider = function () {
        var busy = false;
        var index = 0;
        var $this = $(this);
        var $items = $this.children();
        var count = $items.length;
        $this.children().remove();
        //var $dots = $(new Array(count).fill(0).map(function () {
        //   return `<button class="culuk-dot"></button>`;
        //}).join(""))
        //$this.append($(`<div class="culuk-dot-container"></div>`).append($dots))
        $this.addClass('culuk-slider')
        var $culuk_item_container = $(`<div class="culuk-item-container"></div>`)
        $this.prepend($culuk_item_container)
        $culuk_item_container.prepend($items.first());
        $this.css('position', 'relative');
        var $left_arrow = $(`
        <button type="button" class="culuk-arrow-button culuk-arrow-button-left">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        </button>
        `);
        var $right_arrow = $(`
        <button type="button" class="culuk-arrow-button culuk-arrow-button-right">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        </button>
        `);
        $this.prepend($left_arrow);
        $this.prepend($right_arrow);
        $right_arrow.on('click', function () {
            if (!busy) {
                busy = true;
                if (index === count - 1) {
                    index = -1
                }
                $culuk_item_container.append($items[index + 1])
                $culuk_item_container.animate({
                    left: "-100%"
                }, 1000, "", function () {
                    $items[index === -1 ? count - 1 : index].remove();
                    index++;
                    $culuk_item_container.css('left', '0');
                    busy = false;
                });
            }
        })
        $left_arrow.on('click', function () {
            if (!busy) {
                busy = true;
                if (index === 0) {
                    index = count
                }
                $culuk_item_container.prepend($items[index - 1]).css('left', '-100%')
                $culuk_item_container.animate({
                    left: "0"
                }, 1000, "", function () {
                    $items[index === count ? 0 : index].remove();
                    index--;
                    $culuk_item_container.css('left', '0');
                    busy = false;
                });
            }
        })
    };


}(jQuery));
