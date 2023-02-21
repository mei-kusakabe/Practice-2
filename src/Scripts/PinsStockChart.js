
$(document).ready(function () {

    getPieChart(pieCharturl, 0, 1)
});

function getPieChart(url, VoucherId, PintypeId) {
    $.ajax({
        url: url,
        type: "POST",
        dataType: "html",
        data: { "VoucherId": VoucherId, "PintypeId": PintypeId },
        success: function (result) {
            if (result == "[NaN,NaN,NaN,NaN]") {
                pinDetailsChart([0, 0, 0, 0])
            }
            else {
                pinDetailsChart(JSON.parse(result));
            }

        },
        error: function (result) {
            $('.loader').hide();

        }
    });
}

function pinDetailsChart(pinDetailsDataPoints) {
    var chart = new CanvasJS.Chart("chartContainer", {
        title: {
            text: ""
        },
        animationEnabled: true,
        legend: {
            verticalAlign: "top",
            horizontalAlign: "center",
            fontSize: 13,
            fontFamily: "Helvetica"
        },
        theme: "light2",
        width: 400,
        height: 200,
        data: [
            {
                type: "pie",
                indexLabelFontFamily: "Garamond",
                indexLabelFontSize: 15,
                indexLabel: "{label} {y}%",
                startAngle: -20,
                showInLegend: true,
                toolTipContent: "{legendText} {y}%",
                dataPoints: [{ y: pinDetailsDataPoints[0], legendText: "Active", label: "Active", color: "#50b432" },
                { y: pinDetailsDataPoints[1], legendText: "Blocked", label: "Blocked", color: "#dddf00" },
                { y: pinDetailsDataPoints[2], legendText: "Expired", label: "Expired", color: "#24cbe5" },
                { y: pinDetailsDataPoints[3], legendText: "Used", label: "Used", color: "#ed561b" }],

                //You can add dynamic data from the controller as shown below. Check the controller and uncomment the line which generates dataPoints.
                //dataPoints: @Html.Raw(ViewBag.DataPoints),
            }
        ]
    });
    chart.render();

}