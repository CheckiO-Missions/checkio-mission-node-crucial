//Dont change it
//Dont change it
requirejs(['ext_editor_io', 'jquery_190', 'raphael_210'],
    function (extIO, $) {

        function mostCrucialCanvas(dom, dataInp, dataExp, dataAnswer) {

            // func: union(): ary1 | ary2
            var union = function(a1, a2) {
                var rs = [];
                for (var i=0; i < a2.length; i += 1) {
                    if (a1.indexOf(a2[i]) === -1)
                        rs.push(a2[i]);
                }
                return a1.concat(rs);
            };

            //
            // draw start
            //
            const [net, users] = dataInp;
            const delay = 200;
            const color = {
                blue: "#65A1CF",
                base: "#294270",
                orange: "#FAAB00",
                erase: "#DFE8F7",
                white: "#FFFFFF",
            };
            var ord = 0,
                nodes = {},
                all_nodes = [];

            for (var i=0; i < net.length; i += 1) {
                all_nodes = union(all_nodes, net[i]);
                for (var j=0; j < 2; j+=1) {
                    var [n1, n2] = [net[i][j], net[i][1-j]];
                    if (! nodes[n1]) {
                        nodes[n1] = {
                            net: [n2], 
                            co: dataExp.indexOf(n1),
                            num: ord
                        };
                        ord += 1;
                    } else {
                        nodes[n1].net.push(n2);
                    }
                }
            }

            function createCirclesCanvas(paper, circlesSet) {
                const radius = 15;
                const attrCircle = {
                    "stroke": color.base,
                    "stroke-width": 3, 
                    "fill": color.white,
                };
                for (var n in nodes) {
                    var [x, y] = [nodes[n].co % 5,
                        Math.floor(nodes[n].co / 5)];
                    circlesSet.push(
                        paper.circle(
                            x * 63 + 20, 
                            y * 63 + 22, 
                            radius
                        ).attr(attrCircle));
                    circlesSet[circlesSet.length-1].nod = n;
                    circlesSet[circlesSet.length-1].usr = users[n];
                }
                return paper;
            }

            function createLinePath(x1, y1, x2, y2) {
                return "M" + x1 + "," + y1 + "L" + x2 + "," + y2;
            }

            //
            // M A I N
            //
            var canvas = Raphael(dom, 300, 300, 0, 0);
            var circleSet = canvas.set();

            // draw circles of nodes
            createCirclesCanvas(canvas, circleSet);

            // text set
            const attrText = {"stroke": color.base, "font-size": 14};
            var numbers = canvas.set();
            for (var i = 0; i < circleSet.length; i+=1) {
                numbers.push(canvas.text(
                    circleSet[i].attr().cx,
                    circleSet[i].attr().cy,
                    circleSet[i].nod
                ).attr(attrText));
            }

            // draw blueline (and prepare animate line)
            var lineDict = canvas.set();
            const attrLine = {"stroke-width": 4, "stroke": color.blue};
            net.forEach((edge)=>{
                var start = nodes[edge[0]].num;
                var end = nodes[edge[1]].num;
                var x1 = circleSet[start].attr().cx;
                var y1 = circleSet[start].attr().cy;
                var x2 = circleSet[end].attr().cx;
                var y2 = circleSet[end].attr().cy;
                canvas.path(createLinePath(x1, y1, x2, y2)).attr(
                    attrLine);
                var an_line1 = canvas.path(createLinePath(x1, y1, x1, y1));
                var an_line2 = canvas.path(createLinePath(x2, y2, x2, y2));
                lineDict[edge[0] + edge[1]] = an_line1;
                lineDict[edge[1] + edge[0]] = an_line2;
            });

            lineDict.toFront();
            circleSet.toFront();
            numbers.toFront();

            // crucial!
            dataAnswer.forEach(a=>{

                // crucial node
                setTimeout(function () {
                    return function () {
                        circleSet[nodes[a].num].animate({
                            'fill': color.orange}, delay * 3);
                    }
                }(), delay * 3);

                // crucial edge
                for (var i=0; i < nodes[a].net.length; i += 1) {
                    setTimeout(function () {
                        const   n = nodes[a].net[i],
                                c_crush = circleSet[nodes[a].num],
                                c_next = circleSet[nodes[n].num];
                        return function () {
                            lineDict[a+n].attr(
                                {"stroke-width": 5,
                                 "stroke": color.orange});
                            lineDict[a+n].animate({
                                "path": createLinePath(
                                    c_crush.attr().cx, c_crush.attr().cy, 
                                    c_next.attr().cx, c_next.attr().cy ),
                            }, delay * 3);
                        }
                    }(), delay * 3);
                }
            });

            // change node text
            var phase = 4;

            for (var k=0; k < circleSet.length; k += 1) {

                setTimeout(function () {
                    var c_set = circleSet;
                    var kk = k;
                    return function(){
                        var node_color
                            = dataAnswer.indexOf(c_set[kk].nod) > -1
                                ? 'orange' : 'white'
                        numbers[nodes[c_set[kk].nod].num].animate(
                            {'stroke': node_color, 'stroke-width': 5},
                            delay * 3);
                    };
                }(), delay * 3 * (phase+1));

                phase += 1;
                setTimeout(function () {
                    var c_set = circleSet;
                    var kk = k;
                    return function(){
                        numbers[nodes[c_set[kk].nod].num].animate(
                            {'stroke': color.base, 'stroke-width': 1},
                            delay * 3);
                        numbers[nodes[c_set[kk].nod].num].attr(
                            'text', c_set[kk].usr);

                    };
                }(), delay * 3 * (phase+1));
            }
        }
        
        var $tryit;

        var io = new extIO({
            multipleArguments: true,
            functions: {
                js: 'mostCrucial',
                python: 'most_crucial'
            },
            animation: function($expl, data) {
                if (!data.ext || !data.ext.explanation) {
                    return;
                }
                var expl = data.ext.explanation;
                $expl.addClass('output').html('<div>' + expl[0] + '</div>');
                mostCrucialCanvas(
                    $expl[0],
                    data.in,
                    expl[1],
                    data.ext.answer
                );
            }

        });
        io.start();
    }
);
