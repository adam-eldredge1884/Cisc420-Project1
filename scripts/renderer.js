class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(framebuffer);
                break;
            case 1:
                this.drawSlide1(framebuffer);
                break;
            case 2:
                this.drawSlide2(framebuffer);
                break;
            case 3:
                this.drawSlide3(framebuffer);
                break;
        }

        this.ctx.putImageData(framebuffer, 0, 0);
    }

    // framebuffer:  canvas ctx image data
    drawSlide0(framebuffer) {
        // TODO: draw at least 2 Bezier curves
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        let point_a = {x:  100, y:  100};
        let point_b = {x: 200, y: 400};
        let point_c = {x: 400, y: 200};
        let point_d = {x: 500, y: 500};

        let point_e = {x:  100, y:  500};
        let point_f = {x: 300, y: 500};
        let point_g = {x: 400, y: 200};
        let point_h = {x: 600, y: 100};

        let point_arr = this.drawBezierCurve(point_a, point_b, point_c, point_d, this.num_curve_sections, [255, 0, 0, 255], framebuffer);
        let point_arr2 = this.drawBezierCurve(point_e, point_f, point_g, point_h, this.num_curve_sections, [255, 0, 255, 255], framebuffer);
        if(this.show_points) {
            for(let i = 0; i < point_arr.length; i++) {
                this.drawVertex(point_arr[i], [0, 0, 255, 255], framebuffer);
            }
            for(let i = 0; i < point_arr2.length; i++) {
                this.drawVertex(point_arr2[i], [0, 0, 255, 255], framebuffer);
            }
          
        }
        
    }

    // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer) {
        // TODO: draw at least 2 circles
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        let center = {x: 300, y: 300};
        let center2 = {x: 400, y: 400};
        let point_arr = this.drawCircle(center, 50, this.num_curve_sections, [255, 0, 0, 255], framebuffer);
        let point_arr2 = this.drawCircle(center2, 200, this.num_curve_sections, [0, 0, 0, 255], framebuffer);
        if(this.show_points) {
            for(let i = 0; i < point_arr.length; i++) {
                this.drawVertex(point_arr[i], [0, 0, 255, 255], framebuffer);
            }
            for(let i = 0; i < point_arr2.length; i++) {
                this.drawVertex(point_arr2[i], [0, 0, 255, 255], framebuffer);
            }
        }
    }

    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer) {
        // TODO: draw at least 2 convex polygons (each with a different number of vertices >= 5)
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        let vertex_list = [];
        vertex_list.push({x: 200, y:  75});
        vertex_list.push({x: 400, y: 200});
        vertex_list.push({x: 400, y: 500});
        vertex_list.push({x: 20, y: 500});
        vertex_list.push({x: 20, y: 200});

        let vertex_list2 = [];
        vertex_list2.push({x: 600, y:  300});
        vertex_list2.push({x: 700, y: 300});
        vertex_list2.push({x: 750, y: 400});
        vertex_list2.push({x: 700, y: 500});
        vertex_list2.push({x: 600, y: 500});
        vertex_list2.push({x: 550, y: 400});
        
        this.drawConvexPolygon(vertex_list, [255, 0, 0, 150], framebuffer);
        this.drawConvexPolygon(vertex_list2, [255, 0, 255, 150], framebuffer);

        if(this.show_points) {
            for(let i = 0; i < vertex_list.length; i++) {
                this.drawVertex(vertex_list[i], [0, 0, 255, 255], framebuffer);
            }
            for(let i = 0; i < vertex_list2.length; i++) {
                this.drawVertex(vertex_list2[i], [0, 0, 255, 255], framebuffer);
            }
        }
    }

    // framebuffer:  canvas ctx image data
    drawSlide3(framebuffer) {
        // TODO: draw your name!
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        
        //Curve of first A in name
        let p1 = {x: 10, y: 100};
        let p2 = {x: 10, y: 700};
        let p3 = {x: 190, y: 700};
        let p4 = {x: 190, y: 100};
        let point_arr = this.drawBezierCurve(p1, p2, p3, p4, this.num_curve_sections, [255, 0, 0, 255], framebuffer);
        
        //Line across first A in name
        this.drawLine({x: 15, y: 300}, {x:185, y:300}, [255, 0, 0, 255], framebuffer);
    
        //Circle that will be part of the d
        let center = {x: 300, y: 200};
        let point_arr4 = this.drawCircle(center, 100, this.num_curve_sections, [0, 255, 0, 255], framebuffer);
    
        //Line for right part of the d
        this.drawLine({x: 400, y: 100}, {x: 400, y: 500}, [0, 255, 0, 255], framebuffer);
    
        //ouline of second A
        let p5 = {x: 405, y: 100};
        let p6 = {x: 500, y: 500};
        let p7 = {x: 595, y: 100};
        this.drawTriangle(p5, p6, p7, [255, 0, 255, 255], framebuffer);

        //triangle in upper part of second A
        let p8 = {x: 475, y: 300};
        let p9 = {x: 500, y: 400};
        let p10 = {x: 525, y: 300};
        this.drawTriangle(p8, p9, p10, [0, 255, 255, 255], framebuffer);

        //trapezoid in lower part of second A
        let vertex_list = [];
        vertex_list.push({x: 425, y: 100});
        vertex_list.push({x: 475, y: 250});
        vertex_list.push({x: 525, y: 250});
        vertex_list.push({x: 575, y: 100});
        this.drawConvexPolygon(vertex_list, [0, 255, 255, 255], framebuffer);

        //curve of left part of M
        let p11 = {x: 610, y: 100};
        let p12 = {x: 610, y: 300};
        let p13 = {x: 700, y: 300};
        let p14 = {x: 700, y: 100};
        let point_arr2 = this.drawBezierCurve(p11, p12, p13, p14, this.num_curve_sections, [255, 0, 0, 255], framebuffer);

        let p15 = {x: 700, y: 100};
        let p16 = {x: 700, y: 300};
        let p17 = {x: 790, y: 300};
        let p18 = {x: 790, y: 100};
        let point_arr3 = this.drawBezierCurve(p15, p16, p17, p18, this.num_curve_sections, [255, 0, 0, 255], framebuffer);

        if(this.show_points) {
            for(let i = 0; i < point_arr.length; i++) {
                this.drawVertex(point_arr[i], [0, 0, 255, 255], framebuffer);
            }
            for(let i = 0; i < point_arr2.length; i++) {
                this.drawVertex(point_arr2[i], [0, 0, 255, 255], framebuffer);
            }
            for(let i = 0; i < point_arr3.length; i++) {
                this.drawVertex(point_arr3[i], [0, 0, 255, 255], framebuffer);
            }
            for(let i = 0; i < point_arr4.length; i++) {
                this.drawVertex(point_arr4[i], [0, 0, 255, 255], framebuffer);
            }
            for(let i = 0; i < vertex_list.length; i++) {
                this.drawVertex(vertex_list[i], [0, 0, 255, 255], framebuffer);
            }
        }
    
    }

    // p0:           object {x: __, y: __}
    // p1:           object {x: __, y: __}
    // p2:           object {x: __, y: __}
    // p3:           object {x: __, y: __}
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawBezierCurve(p0, p1, p2, p3, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a Bezier curve
        
        let step = 1 / num_edges;
        let point_arr = [];
        let xNext, yNext, point;
        for(let t = 0; t < 1; t  = t + step) {
            xNext = (Math.pow(1 - t, 3) * p0.x) + (3 * Math.pow(1 - t, 2) * t * p1.x) + (3 * (1 - t) * Math.pow(t, 2) * p2.x) + (Math.pow(t, 3) * p3.x);
            yNext = (Math.pow(1 - t, 3) * p0.y) + (3 * Math.pow(1 - t, 2) * t * p1.y) + (3 * (1 - t) * Math.pow(t, 2) * p2.y) + (Math.pow(t, 3) * p3.y);
            point = {x: parseInt(xNext), y: parseInt(yNext)};
            point_arr.push(point);
        }
        //Need this to make sure it always goes to the final point
        point_arr.push(p3);
        for(let i = 0; i < point_arr.length - 1; i++) {
            this.drawLine(point_arr[i], point_arr[i+1], color, framebuffer);
        }
        return point_arr;
           
    }

    // center:       object {x: __, y: __}
    // radius:       int
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawCircle(center, radius, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a circle
        let step = (2 * Math.PI) / num_edges;
        let point_arr = [];
        let xNext, yNext, point;
        for (let i = 0; i < num_edges; i++) {
            xNext = center.x + radius * Math.cos(i * step);
            yNext = center.y + radius * Math.sin(i * step);
            point = {x: parseInt(xNext), y: parseInt(yNext)};
            point_arr.push(point);
        }

        for (let i = 0; i < point_arr.length; i++) {
            let p1 = point_arr[i];
            let p2 = point_arr[(i + 1) % point_arr.length];
            this.drawLine(p1, p2, color, framebuffer);
        }

        return point_arr;
        
    }
    
    // vertex_list:  array of object [{x: __, y: __}, {x: __, y: __}, ..., {x: __, y: __}]
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawConvexPolygon(vertex_list, color, framebuffer) {
        // TODO: draw a sequence of triangles to form a convex polygon
        for(let i = 0; i < vertex_list.length - 2; i++) {
            this.drawTriangle(vertex_list[0], vertex_list[i+1], vertex_list[i+2], color, framebuffer);
        }
        
    }
    
    // v:            object {x: __, y: __}
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawVertex(v, color, framebuffer) {
        // TODO: draw some symbol (e.g. small rectangle, two lines forming an X, ...) centered at position `v`
        let point1 = {x: v.x - 5, y: v.y + 5};
        let point2 = {x: v.x + 5, y: v.y - 5};
        let point3 = {x: v.x - 5, y: v.y - 5};
        let point4 = {x: v.x + 5, y: v.y + 5};
        
        this.drawLine(point1, point2, color, framebuffer);
        this.drawLine(point3, point4, color, framebuffer);
        
    }
    
    /***************************************************************
     ***       Basic Line and Triangle Drawing Routines          ***
     ***       (code provided from in-class activities)          ***
     ***************************************************************/
    pixelIndex(x, y, framebuffer) {
	    return 4 * y * framebuffer.width + 4 * x;
    }
    
    setFramebufferColor(framebuffer, px, color) {
	    framebuffer.data[px + 0] = color[0];
	    framebuffer.data[px + 1] = color[1];
	    framebuffer.data[px + 2] = color[2];
	    framebuffer.data[px + 3] = color[3];
    }
    
    swapPoints(a, b) {
        let tmp = {x: a.x, y: a.y};
        a.x = b.x;
        a.y = b.y;
        b.x = tmp.x;
        b.y = tmp.y;
    }

    drawLine(p0, p1, color, framebuffer) {
        if (Math.abs(p1.y - p0.y) <= Math.abs(p1.x - p0.x)) { // |m| <= 1
            if (p0.x < p1.x) {
                this.drawLineLow(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineLow(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
        else {                                        // |m| > 1
            if (p0.y < p1.y) {
                this.drawLineHigh(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineHigh(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
    }

    drawLineLow(x0, y0, x1, y1, color, framebuffer) {
        let A = y1 - y0;
        let B = x0 - x1;
        let iy = 1;
        if (A < 0) {
            iy = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let x = x0;
        let y = y0;
        let px;
        while (x <= x1)
        {
            px = this.pixelIndex(x, y, framebuffer);
            this.setFramebufferColor(framebuffer, px, color);
            x += 1;
            if (D <= 0)
            {
                D += 2 * A;
            }
            else
            {
                D += 2 * A + 2 * B;
                y += iy;
            }
        }
    }

    drawLineHigh(x0, y0, x1, y1, color, framebuffer) {
        let A = x1 - x0;
        let B = y0 - y1;
        let ix = 1;
        if (A < 0) {
            ix = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let x = x0;
        let y = y0;
        let px;
        while (y <= y1)
        {
            px = this.pixelIndex(x, y, framebuffer);
            this.setFramebufferColor(framebuffer, px, color);
            y += 1;
            if (D <= 0)
            {
                D += 2 * A;
            }
            else
            {
                D += 2 * A + 2 * B;
                x += ix;
            }
        }
    }
    
    drawTriangle(p0, p1, p2, color, framebuffer) {

        p0 = {x: p0.x, y: p0.y};
        p1 = {x: p1.x, y: p1.y};
        p2 = {x: p2.x, y: p2.y};
        // Sort points in ascending y order
        if (p1.y < p0.y) this.swapPoints(p0, p1);
        if (p2.y < p0.y) this.swapPoints(p0, p2);
        if (p2.y < p1.y) this.swapPoints(p1, p2);
        
        // Edge coherence triangle algorithm
        // Create initial edge table
        let edge_table = [
            {x: p0.x, inv_slope: (p1.x - p0.x) / (p1.y - p0.y)}, // edge01
            {x: p0.x, inv_slope: (p2.x - p0.x) / (p2.y - p0.y)}, // edge02
            {x: p1.x, inv_slope: (p2.x - p1.x) / (p2.y - p1.y)}  // edge12
        ];
        
        // Do cross product to determine if pt1 is to the right/left of edge02
        let v01 = {x: p1.x - p0.x, y: p1.y - p0.y};
        let v02 = {x: p2.x - p0.x, y: p2.y - p0.y};
        let p1_right = ((v01.x * v02.y) - (v01.y * v02.x)) >= 0;
        
        // Get the left and right edges from the edge table (lower half of triangle)
        let left_edge, right_edge;
        if (p1_right) {
            left_edge = edge_table[1];
            right_edge = edge_table[0];
        }
        else {
            left_edge = edge_table[0];
            right_edge = edge_table[1];
        }
        // Draw horizontal lines (lower half of triangle)
        for (let y = p0.y; y < p1.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) { 
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
        
        // Get the left and right edges from the edge table (upper half of triangle) - note only one edge changes
        if (p1_right) {
            right_edge = edge_table[2];
        }
        else {
            left_edge = edge_table[2];
        }
        // Draw horizontal lines (upper half of triangle)
        for (let y = p1.y; y < p2.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) {
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
    }
};
