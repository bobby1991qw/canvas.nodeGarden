#NodeGarden#
plugin for generate a canvas nodeGarden banner

##Usage##
    <script src="NodeGarden.js" />
    
    var garden = new NodeGarden();
    garden.init(document.getElementById('canvas'), {
        ...options
    });

##Options##

* ###width###
    integer | string (***default***: '100%') - canvas width. ***examples***: 100,'100px','100%'.

* ###height###
    similar to **'width'**.

* ###nodeCount###
    integer (***default***: 30) - node count in canvas.                           

* ###nodeColor###
    string (***default***: '#fff') - node color like '#f00' or 'rgb(255, 0, 255)'.

* ###opacity###
    number (***default***: 0.6) - node opacity. range from ***0*** to ***1***.

* ###bgColor###
    string | array[string] (***default***: '#8fb0ff') - canvas background color.

* ###bgSpeed###
    number (***default***: 2) - effective when ***bgColor*** is array. time of change one color to another.

* ###nodeRadius###
    number | function (***default***: () => ( ... )) - node radius or a function return radius.

* ###lineLength###
    number (***default***: 350) - maxLength of line between two node.

* ###speedX###
    number | function (***default***: () => ( ... )) - node speed in axis X.

* ###speedY###
    similar to ***'speedX'***.

* ###mouseNode###
    boolean (***default***: true) - whether a node follow your cursor.


##Browser Support##
* chrome
* firfox
* edge
* IE10+

##Demo##
<p data-height="265" data-theme-id="0" data-slug-hash="Rpyxrw" data-default-tab="result" data-user="bobby1991qw" data-embed-version="2" data-pen-title="Rpyxrw" class="codepen">See the Pen <a href="http://codepen.io/bobby1991qw/pen/Rpyxrw/">Rpyxrw</a> by qiuwei (<a href="http://codepen.io/bobby1991qw">@bobby1991qw</a>) on <a href="http://codepen.io">CodePen</a>.</p>