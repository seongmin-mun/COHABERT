$(document).ready(function () {


    var decade_name = ['1810to1850','1860s','1870s','1880s','1890s','1900s','1910s','1920s','1930s','1940s','1950s','1960s','1970s','1980s','1990s','2000s'];
    var decade_color = ['#B1EE52','#B8EE52','#BFEE52','#C3EE52','#CBEE52','#D2EE52','#D6EE52','#DBEE52','#E0EE52','#E9EE52','#EEEE52','#EEE552','#EEDD52','#EED652','#EECB52','#EEBF52'];


    //왼쪽 세션 정리
    var sectionLeftBottomWidth = $("#section_bottom_left_bottom").width()   //윈도우 넓이
    var sectionLeftBottomHeight = $("#section_bottom_left_bottom").height()   //윈도우 높이


    var svgSectionLeftBottom = d3.select('#section_bottom_left_bottom').append('svg')
          .attr('width', sectionLeftBottomWidth)
          .attr('height', (sectionLeftBottomHeight*0.92))
          .call(d3.zoom().scaleExtent([0.5, 5]).on("zoom", function () {
            svgSectionLeftBottom.attr("transform", d3.event.transform)
          }))
          .append("g");


    var NodeGroupLeftBottom = svgSectionLeftBottom.append("g");

    var divLeftInner = d3.select("#section_bottom_left_bottom").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);


    //왼쪽 네트워크

    firstLeftDrawData(NodeGroupLeftBottom,sectionLeftBottomWidth,sectionLeftBottomHeight,"1810to1850");

    d3.selectAll("#op_decade_left").on("change", opDecadeLeftChange);

    function opDecadeLeftChange(){
      drawLeftAll()

    }

    function drawLeftAll(){

        var selected_decade_left = $( "#op_decade_left" ).val();

        changeLeftDrawData(NodeGroupLeftBottom,sectionLeftBottomWidth,sectionLeftBottomHeight,selected_decade_left)


    }


    //시각화 부분 함수 생성
    function firstLeftDrawData(NodeGroup,sectionWidth,sectionHeight,decade) {

        var data = {};
        for (var i = 0; i < DSM_info.length ; i++) {
            if ((DSM_info[i].decade === decade)) {
                data["contexts"] = DSM_info[i].contexts
            }
        }


        nodeleftcolor = "";

        if (decade == decade_name[0]) {
            nodeleftcolor = decade_color[0]
        } else if (decade == decade_name[1]) {
            nodeleftcolor = decade_color[1]
        } else if (decade == decade_name[2]) {
            nodeleftcolor = decade_color[2]
        } else if (decade == decade_name[3]) {
            nodeleftcolor = decade_color[3]
        } else if (decade == decade_name[4]) {
            nodeleftcolor = decade_color[4]
        } else if (decade == decade_name[5]) {
            nodeleftcolor = decade_color[5]
        } else if (decade == decade_name[6]) {
            nodeleftcolor = decade_color[6]
        } else if (decade == decade_name[7]) {
            nodeleftcolor = decade_color[7]
        } else if (decade == decade_name[8]) {
            nodeleftcolor = decade_color[8]
        } else if (decade == decade_name[9]) {
            nodeleftcolor = decade_color[9]
        } else if (decade == decade_name[10]) {
            nodeleftcolor = decade_color[10]
        } else if (decade == decade_name[11]) {
            nodeleftcolor = decade_color[11]
        } else if (decade == decade_name[12]) {
            nodeleftcolor = decade_color[12]
        } else if (decade == decade_name[13]) {
            nodeleftcolor = decade_color[13]
        } else if (decade == decade_name[14]) {
            nodeleftcolor = decade_color[14]
        } else if (decade == decade_name[15]) {
            nodeleftcolor = decade_color[15]
        }

        $('#contextTable_left').empty();
        $("#contextTable_left").append("<tr style='padding: 0px;'><td>index</td><td>"+data.contexts[0].index+"</td></tr>"+"<tr style='padding: 0px;'><td>context length</td><td>"+data.contexts[0].length+"</td></tr>"+"<tr style='padding: 0px;'><td>context content</td><td>"+data.contexts[0].context+"</td></tr>");


        // $('#container_left').empty();
        // $("#container_left").append("<input class='CB_leftmiddle' type='checkbox' value='"+list[i].toLowerCase()+"' id='CB_leftmiddle_"+list[i].toLowerCase()+"' /> <label class='CB_leftmiddle'><svg width='12' height='12' ><rect width='11' height='11' rx='2' class='legendrect' style='fill:"+color+";opacity:0.9;'/></svg> "+list[i]+" ("+name[i]+","+name_kr[i]+")</label></br>");

        var w = sectionWidth;
        var h = sectionHeight;
        var padding = (sectionHeight*0.12);

        var xScale = d3.scale.linear()
            .domain([d3.min(data.contexts, function(d) { return d.X; }), d3.max(data.contexts, function(d) { return d.X; })])
            .range([0+padding, w-padding]);

        var yScale = d3.scale.linear()
             .domain([d3.min(data.contexts, function(d) { return d.Y; }), d3.max(data.contexts, function(d) { return d.Y; })])
             .range([h-padding, 0+padding]);

        NodeGroup.selectAll(".nodedot")
             .data(data.contexts)
             .enter()
             .append("circle")
             .attr("class", "nodedot")
             .attr("id", function (d) {
                 return d.index
             })
             .attr("cx", function (d) {
                 return xScale(d.X)
             })
             .attr("cy", function (d) {
                 return yScale(d.Y)
             })
             .attr("r", 5)
             .attr("fill", nodeleftcolor)
             .attr("stroke", "#464652")
             .attr("stroke-width", "1px")
             .attr("opacity", 0.8)
             .style("cursor", "pointer")  //https://css-tricks.com/using-css-cursors/
             .on("mouseover", function (d) {
                 d3.select(this)
                     .attr("opacity", 1)
                     .attr("fill","#DD2A1E")
             })
             .on("mouseout", function (d) {
                 d3.select(this)
                     .attr("opacity", 0.8)
                     .attr("fill", nodeleftcolor);
             })
             .on("click", function (d) {
               $('#contextTable_left').empty();
               $("#contextTable_left").append("<tr style='padding: 0px;'><td>index</td><td>"+d.index+"</td></tr>"+"<tr style='padding: 0px;'><td>context length</td><td>"+d.length+"</td></tr>"+"<tr style='padding: 0px;'><td>context content</td><td>"+d.context+"</td></tr>");
             })
             .on("mouseenter", function (d) {
                 divLeftInner.transition()
                     .duration(200)
                     .style("opacity", 0.7);
                    divLeftInner.html("<strong>Context details</strong><br/><h5>Index: "+d.index + "<h5/><h5>Context length: "  + d.length + "<h5/><h5>Context: "  + d.context+ "<h5/>")
                     .style("left", sectionWidth*0.03+"px")
                     .style("top", sectionHeight*0.1+"px");
             })
             .on("mouseleave", function () {
                 divLeftInner.transition()
                     .duration(500)
                     .style("opacity", 0);
             });

    }



    //시각화 변경
    function changeLeftDrawData(NodeGroup,sectionWidth,sectionHeight,decade) {  //selected_postposition,selected_node_color,functionarray,indexarray

      var data = {};
      for (var i = 0; i < DSM_info.length ; i++) {
          if ((DSM_info[i].decade === decade)) {
              data["contexts"] = DSM_info[i].contexts
          }
      }


      nodeleftcolor = "";

      if (decade == decade_name[0]) {
          nodeleftcolor = decade_color[0]
      } else if (decade == decade_name[1]) {
          nodeleftcolor = decade_color[1]
      } else if (decade == decade_name[2]) {
          nodeleftcolor = decade_color[2]
      } else if (decade == decade_name[3]) {
          nodeleftcolor = decade_color[3]
      } else if (decade == decade_name[4]) {
          nodeleftcolor = decade_color[4]
      } else if (decade == decade_name[5]) {
          nodeleftcolor = decade_color[5]
      } else if (decade == decade_name[6]) {
          nodeleftcolor = decade_color[6]
      } else if (decade == decade_name[7]) {
          nodeleftcolor = decade_color[7]
      } else if (decade == decade_name[8]) {
          nodeleftcolor = decade_color[8]
      } else if (decade == decade_name[9]) {
          nodeleftcolor = decade_color[9]
      } else if (decade == decade_name[10]) {
          nodeleftcolor = decade_color[10]
      } else if (decade == decade_name[11]) {
          nodeleftcolor = decade_color[11]
      } else if (decade == decade_name[12]) {
          nodeleftcolor = decade_color[12]
      } else if (decade == decade_name[13]) {
          nodeleftcolor = decade_color[13]
      } else if (decade == decade_name[14]) {
          nodeleftcolor = decade_color[14]
      } else if (decade == decade_name[15]) {
          nodeleftcolor = decade_color[15]
      }



      $('#contextTable_left').empty();
      $("#contextTable_left").append("<tr style='padding: 0px;'><td>index</td><td>"+data.contexts[0].index+"</td></tr>"+"<tr style='padding: 0px;'><td>context length</td><td>"+data.contexts[0].length+"</td></tr>"+"<tr style='padding: 0px;'><td>context content</td><td>"+data.contexts[0].context+"</td></tr>");


            var w = sectionWidth;
            var h = sectionHeight;
            var padding = (sectionHeight*0.12);


            var xScale = d3.scale.linear()
                .domain([d3.min(data.contexts, function(d) { return d.X; }), d3.max(data.contexts, function(d) { return d.X; })])
                .range([0+padding, w-padding]);

            var yScale = d3.scale.linear()
                 .domain([d3.min(data.contexts, function(d) { return d.Y; }), d3.max(data.contexts, function(d) { return d.Y; })])
                 .range([h-padding, 0+padding]);

          var circle = NodeGroup.selectAll(".nodedot")
                .data(data.contexts);

          circle.enter()
             .append("circle")
             .attr("class", "nodedot")
             .attr("id", function (d) {
                 return d.index
             })
             .attr("cx", function (d) {
                 return xScale(d.X)
             })
             .attr("cy", function (d) {
                 return yScale(d.Y)
             })
             .attr("r", 5)
             .attr("fill", nodeleftcolor)
             .attr("stroke", "#464652")
             .attr("stroke-width", "1px")
             .attr("opacity", 0.8)
             .style("cursor", "pointer")
             .on("mouseover", function (d) {
                 d3.select(this)
                     .attr("opacity", 1)
                     .attr("fill","#DD2A1E")
             })
             .on("mouseout", function (d) {
                 d3.select(this)
                     .attr("opacity", 0.8)
                     .attr("fill", nodeleftcolor);
             })
             .on("click", function (d) {
               $('#contextTable_left').empty();
               $("#contextTable_left").append("<tr style='padding: 0px;'><td>index</td><td>"+d.index+"</td></tr>"+"<tr style='padding: 0px;'><td>context length</td><td>"+d.length+"</td></tr>"+"<tr style='padding: 0px;'><td>context content</td><td>"+d.context+"</td></tr>");
             })
             .on("mouseenter", function (d) {
                 divLeftInner.transition()
                     .duration(200)
                     .style("opacity", 0.7);
                    divLeftInner.html("<strong>Context details</strong><br/><h5>Index: "+d.index + "<h5/><h5>Context length: "  + d.length + "<h5/><h5>Context: "  + d.context+ "<h5/>")
                     .style("left", sectionWidth*0.03+"px")
                     .style("top", sectionHeight*0.1+"px");
             })
             .on("mouseleave", function () {
                 divLeftInner.transition()
                     .duration(500)
                     .style("opacity", 0);
             });

          circle.transition()
                 .duration(2000)
                 .attr("cx", function (d) {
                     return xScale(d.X)
                 })
                 .attr("cy", function (d) {
                     return yScale(d.Y)
                 })
                 .attr("r", 5)
                 .attr("fill", nodeleftcolor)
                 .attr("stroke", "#464652")
                 .attr("stroke-width", "1px")
                 .attr("opacity", 0.8)
                 .style("cursor", "pointer")
                 .on("mouseover", function (d) {
                     d3.select(this)
                         .attr("opacity", 1)
                         .attr("fill","#DD2A1E")
                 })
                 .on("mouseout", function (d) {
                     d3.select(this)
                         .attr("opacity", 0.8)
                         .attr("fill", nodeleftcolor);
                 })
                 .on("click", function (d) {
                   $('#contextTable_left').empty();
                   $("#contextTable_left").append("<tr style='padding: 0px;'><td>index</td><td>"+d.index+"</td></tr>"+"<tr style='padding: 0px;'><td>context length</td><td>"+d.length+"</td></tr>"+"<tr style='padding: 0px;'><td>context content</td><td>"+d.context+"</td></tr>");
                 })
                 .on("mouseenter", function (d) {
                     divLeftInner.transition()
                         .duration(200)
                         .style("opacity", 0.7);
                        divLeftInner.html("<strong>Context details</strong><br/><h5>Index: "+d.index + "<h5/><h5>Context length: "  + d.length + "<h5/><h5>Context: "  + d.context+ "<h5/>")
                         .style("left", sectionWidth*0.03+"px")
                         .style("top", sectionHeight*0.1+"px");
                 })
                 .on("mouseleave", function () {
                     divLeftInner.transition()
                         .duration(500)
                         .style("opacity", 0);
                 });

          circle.exit().remove();



    }







    //오른쪽 세션 정리
    var sectionRightBottomWidth = $("#section_bottom_right_bottom").width()   //윈도우 넓이
    var sectionRightBottomHeight = $("#section_bottom_right_bottom").height()   //윈도우 높이


    var svgSectionRightBottom = d3.select('#section_bottom_right_bottom').append('svg')
          .attr('width', sectionRightBottomWidth)
          .attr('height', (sectionRightBottomHeight*0.92))
          .call(d3.zoom().scaleExtent([0.5, 5]).on("zoom", function () {
            svgSectionRightBottom.attr("transform", d3.event.transform)
          }))
          .append("g");

    var NodeGroupRightBottom = svgSectionRightBottom.append("g");

    var divRightInner = d3.select("#section_bottom_right_bottom").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);




    //왼쪽 네트워크

    firstRightDrawData(NodeGroupRightBottom,sectionRightBottomWidth,sectionRightBottomHeight,"1810to1850");

    d3.selectAll("#op_decade_right").on("change", opDecadeRightChange);

    function opDecadeRightChange(){
      drawRightAll();
    }

    function drawRightAll(){

        var selected_decade_right = $( "#op_decade_right" ).val();

        changeRightDrawData(NodeGroupRightBottom,sectionRightBottomWidth,sectionRightBottomHeight,selected_decade_right)

    }


    //시각화 부분 함수 생성
    function firstRightDrawData(NodeGroup,sectionWidth,sectionHeight,decade) {

        var data = {};
        for (var i = 0; i < DSM_info.length ; i++) {
            if ((DSM_info[i].decade === decade)) {
                data["contexts"] = DSM_info[i].contexts
            }
        }

        noderightcolor = "";

        if (decade == decade_name[0]) {
            noderightcolor = decade_color[0]
        } else if (decade == decade_name[1]) {
            noderightcolor = decade_color[1]
        } else if (decade == decade_name[2]) {
            noderightcolor = decade_color[2]
        } else if (decade == decade_name[3]) {
            noderightcolor = decade_color[3]
        } else if (decade == decade_name[4]) {
            noderightcolor = decade_color[4]
        } else if (decade == decade_name[5]) {
            noderightcolor = decade_color[5]
        } else if (decade == decade_name[6]) {
            noderightcolor = decade_color[6]
        } else if (decade == decade_name[7]) {
            noderightcolor = decade_color[7]
        } else if (decade == decade_name[8]) {
            noderightcolor = decade_color[8]
        } else if (decade == decade_name[9]) {
            noderightcolor = decade_color[9]
        } else if (decade == decade_name[10]) {
            noderightcolor = decade_color[10]
        } else if (decade == decade_name[11]) {
            noderightcolor = decade_color[11]
        } else if (decade == decade_name[12]) {
            noderightcolor = decade_color[12]
        } else if (decade == decade_name[13]) {
            noderightcolor = decade_color[13]
        } else if (decade == decade_name[14]) {
            noderightcolor = decade_color[14]
        } else if (decade == decade_name[15]) {
            noderightcolor = decade_color[15]
        }

        $('#contextTable_right').empty();
        $("#contextTable_right").append("<tr style='padding: 0px;'><td>index</td><td>"+data.contexts[0].index+"</td></tr>"+"<tr style='padding: 0px;'><td>context length</td><td>"+data.contexts[0].length+"</td></tr>"+"<tr style='padding: 0px;'><td>context content</td><td>"+data.contexts[0].context+"</td></tr>");


        // $('#container_left').empty();
        // $("#container_left").append("<input class='CB_leftmiddle' type='checkbox' value='"+list[i].toLowerCase()+"' id='CB_leftmiddle_"+list[i].toLowerCase()+"' /> <label class='CB_leftmiddle'><svg width='12' height='12' ><rect width='11' height='11' rx='2' class='legendrect' style='fill:"+color+";opacity:0.9;'/></svg> "+list[i]+" ("+name[i]+","+name_kr[i]+")</label></br>");

        var w = sectionWidth;
        var h = sectionHeight;
        var padding = (sectionHeight*0.12);

        var xScale = d3.scale.linear()
            .domain([d3.min(data.contexts, function(d) { return d.X; }), d3.max(data.contexts, function(d) { return d.X; })])
            .range([0+padding, w-padding]);

        var yScale = d3.scale.linear()
             .domain([d3.min(data.contexts, function(d) { return d.Y; }), d3.max(data.contexts, function(d) { return d.Y; })])
             .range([h-padding, 0+padding]);

        NodeGroup.selectAll(".nodedot")
             .data(data.contexts)
             .enter()
             .append("circle")
             .attr("class", "nodedot")
             .attr("id", function (d) {
                 return d.index
             })
             .attr("cx", function (d) {
                 return xScale(d.X)
             })
             .attr("cy", function (d) {
                 return yScale(d.Y)
             })
             .attr("r", 5)
             .attr("fill", noderightcolor)
             .attr("stroke", "#464652")
             .attr("stroke-width", "1px")
             .attr("opacity", 0.8)
             .style("cursor", "pointer")  //https://css-tricks.com/using-css-cursors/
             .on("mouseover", function (d) {
                 d3.select(this)
                     .attr("opacity", 1)
                     .attr("fill","#DD2A1E")
             })
             .on("mouseout", function (d) {
                 d3.select(this)
                     .attr("opacity", 0.8)
                     .attr("fill", noderightcolor);
             })
             .on("click", function (d) {
               $('#contextTable_right').empty();
               $("#contextTable_right").append("<tr style='padding: 0px;'><td>index</td><td>"+d.index+"</td></tr>"+"<tr style='padding: 0px;'><td>context length</td><td>"+d.length+"</td></tr>"+"<tr style='padding: 0px;'><td>context content</td><td>"+d.context+"</td></tr>");
             })
             .on("mouseenter", function (d) {
                 divRightInner.transition()
                     .duration(200)
                     .style("opacity", 0.7);
                    divRightInner.html("<strong>Context details</strong><br/><h5>Index: "+d.index + "<h5/><h5>Context length: "  + d.length + "<h5/><h5>Context: "  + d.context+ "<h5/>")
                     .style("left", sectionWidth*0.03+"px")
                     .style("top", sectionHeight*0.1+"px");
             })
             .on("mouseleave", function () {
                 divRightInner.transition()
                     .duration(500)
                     .style("opacity", 0);
             });

    }



    //시각화 변경
    function changeRightDrawData(NodeGroup,sectionWidth,sectionHeight,decade) {  //selected_postposition,selected_node_color,functionarray,indexarray

      var data = {};
      for (var i = 0; i < DSM_info.length ; i++) {
          if ((DSM_info[i].decade === decade)) {
              data["contexts"] = DSM_info[i].contexts
          }
      }

      noderightcolor = "";

      if (decade == decade_name[0]) {
          noderightcolor = decade_color[0]
      } else if (decade == decade_name[1]) {
          noderightcolor = decade_color[1]
      } else if (decade == decade_name[2]) {
          noderightcolor = decade_color[2]
      } else if (decade == decade_name[3]) {
          noderightcolor = decade_color[3]
      } else if (decade == decade_name[4]) {
          noderightcolor = decade_color[4]
      } else if (decade == decade_name[5]) {
          noderightcolor = decade_color[5]
      } else if (decade == decade_name[6]) {
          noderightcolor = decade_color[6]
      } else if (decade == decade_name[7]) {
          noderightcolor = decade_color[7]
      } else if (decade == decade_name[8]) {
          noderightcolor = decade_color[8]
      } else if (decade == decade_name[9]) {
          noderightcolor = decade_color[9]
      } else if (decade == decade_name[10]) {
          noderightcolor = decade_color[10]
      } else if (decade == decade_name[11]) {
          noderightcolor = decade_color[11]
      } else if (decade == decade_name[12]) {
          noderightcolor = decade_color[12]
      } else if (decade == decade_name[13]) {
          noderightcolor = decade_color[13]
      } else if (decade == decade_name[14]) {
          noderightcolor = decade_color[14]
      } else if (decade == decade_name[15]) {
          noderightcolor = decade_color[15]
      }

      $('#contextTable_right').empty();
      $("#contextTable_right").append("<tr style='padding: 0px;'><td>index</td><td>"+data.contexts[0].index+"</td></tr>"+"<tr style='padding: 0px;'><td>context length</td><td>"+data.contexts[0].length+"</td></tr>"+"<tr style='padding: 0px;'><td>context content</td><td>"+data.contexts[0].context+"</td></tr>");


            var w = sectionWidth;
            var h = sectionHeight;
            var padding = (sectionHeight*0.12);


            var xScale = d3.scale.linear()
                .domain([d3.min(data.contexts, function(d) { return d.X; }), d3.max(data.contexts, function(d) { return d.X; })])
                .range([0+padding, w-padding]);

            var yScale = d3.scale.linear()
                 .domain([d3.min(data.contexts, function(d) { return d.Y; }), d3.max(data.contexts, function(d) { return d.Y; })])
                 .range([h-padding, 0+padding]);

          var circle = NodeGroup.selectAll(".nodedot")
                .data(data.contexts);

          circle.enter()
             .append("circle")
             .attr("class", "nodedot")
             .attr("id", function (d) {
                 return d.index
             })
             .attr("cx", function (d) {
                 return xScale(d.X)
             })
             .attr("cy", function (d) {
                 return yScale(d.Y)
             })
             .attr("r", 5)
             .attr("fill", noderightcolor)
             .attr("stroke", "#464652")
             .attr("stroke-width", "1px")
             .attr("opacity", 0.8)
             .style("cursor", "pointer")
             .on("mouseover", function (d) {

                 d3.select(this)
                     .attr("opacity", 1)
                     .attr("fill","#DD2A1E")
             })
             .on("mouseout", function (d) {
                 d3.select(this)
                     .attr("opacity", 0.8)
                     .attr("fill", noderightcolor);
             })
             .on("click", function (d) {
               $('#contextTable_right').empty();
               $("#contextTable_right").append("<tr style='padding: 0px;'><td>index</td><td>"+d.index+"</td></tr>"+"<tr style='padding: 0px;'><td>context length</td><td>"+d.length+"</td></tr>"+"<tr style='padding: 0px;'><td>context content</td><td>"+d.context+"</td></tr>");
             })
             .on("mouseenter", function (d) {
                 divRightInner.transition()
                     .duration(200)
                     .style("opacity", 0.7);
                    divRightInner.html("<strong>Context details</strong><br/><h5>Index: "+d.index + "<h5/><h5>Context length: "  + d.length + "<h5/><h5>Context: "  + d.context+ "<h5/>")
                     .style("left", sectionWidth*0.03+"px")
                     .style("top", sectionHeight*0.1+"px");
             })
             .on("mouseleave", function () {
                 divRightInner.transition()
                     .duration(500)
                     .style("opacity", 0);
             });

          circle.transition()
                 .duration(2000)
                 .attr("cx", function (d) {
                     return xScale(d.X)
                 })
                 .attr("cy", function (d) {
                     return yScale(d.Y)
                 })
                 .attr("r", 5)
                 .attr("fill", noderightcolor)
                 .attr("stroke", "#464652")
                 .attr("stroke-width", "1px")
                 .attr("opacity", 0.8)
                 .style("cursor", "pointer")
                 .on("mouseover", function (d) {

                     d3.select(this)
                         .attr("opacity", 1)
                         .attr("fill","#DD2A1E")
                 })
                 .on("mouseout", function (d) {
                     d3.select(this)
                         .attr("opacity", 0.8)
                         .attr("fill", noderightcolor);
                 })
                 .on("click", function (d) {
                   $('#contextTable_right').empty();
                   $("#contextTable_right").append("<tr style='padding: 0px;'><td>index</td><td>"+d.index+"</td></tr>"+"<tr style='padding: 0px;'><td>context length</td><td>"+d.length+"</td></tr>"+"<tr style='padding: 0px;'><td>context content</td><td>"+d.context+"</td></tr>");
                 })
                 .on("mouseenter", function (d) {
                     divRightInner.transition()
                         .duration(200)
                         .style("opacity", 0.7);
                        divRightInner.html("<strong>Context details</strong><br/><h5>Index: "+d.index + "<h5/><h5>Context length: "  + d.length + "<h5/><h5>Context: "  + d.context+ "<h5/>")
                         .style("left", sectionWidth*0.03+"px")
                         .style("top", sectionHeight*0.1+"px");
                 })
                 .on("mouseleave", function () {
                     divRightInner.transition()
                         .duration(500)
                         .style("opacity", 0);
                 });

          circle.exit().remove();


    }






})