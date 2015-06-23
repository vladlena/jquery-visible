(function($){

    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *       the user visible viewport of a web browser.
     *       only accounts for vertical position, not horizontal.
     */
    var $w = $(window);
    var boundingContainerRect = function(container) {
      if(container){
        return container.get(0).getBoundingClientRect();
      } else {
        return {
          top     : 0,
          left    : 0,
          bottom  : $w.height(),
          right   : $w.width(),
          height  : $w.height(),
          width   : $w.width()
        }
      }
    };
    $.fn.visible = function(partial,hidden,direction,container){
        if (this.length < 1)
            return;

        var $t          = this.length > 1 ? this.eq(0) : this,
            t           = $t.get(0),
            vpRect      = boundingContainerRect(container),
            vpWidth     = vpRect.width,
            vpHeight    = vpRect.height,
            direction   = (direction) ? direction : 'both',
            clientSize  = hidden === true ? !!(t.offsetWidth * t.offsetHeight) : true;


        // Use this native browser method, if available.
        var rec       = t.getBoundingClientRect(),
            tViz      = rec.top    >= vpRect.top && rec.top    <  vpRect.bottom,
            bViz      = rec.bottom >  vpRect.top && rec.bottom <= vpRect.bottom,
            vOverflow = rec.top < vpRect.top && rec.bottom > vpRect.bottom,
            lViz      = rec.left   >= vpRect.left && rec.left   <  vpRect.right,
            rViz      = rec.right  >  vpRect.left && rec.right  <= vpRect.right,
            hOverflow = rec.left < vpRect.left && rec.right > vpRect.right,
            vVisible  = partial ? tViz || bViz || vOverflow : tViz && bViz,
            hVisible  = partial ? lViz || rViz || hOverflow : lViz && rViz;

        if(direction === 'both')
            return clientSize && vVisible && hVisible;
        else if(direction === 'vertical')
            return clientSize && vVisible;
        else if(direction === 'horizontal')
            return clientSize && hVisible;

    };

})(jQuery);