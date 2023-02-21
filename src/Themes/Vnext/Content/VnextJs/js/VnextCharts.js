var osLabels = [];
var orderData = [];
var completeOrderData = [];
var processingOrderData = [];
var pendingOrderData = [];
var labelsName = [];
var labelsCompleteName = [];
var labelsProcessingName = [];
var labelsPendingName = [];
var orderChartConfig;
var downlineChartConfig;
var maxcompleteOrderYear = [];
var maxprocessingOrderYear = [];
var maxpendingOrderYear = [];

function GetMonthName(monthNumber) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthNumber - 1];
}

$(document).ready(function () {
    var osCurrentPeriod;

    debugger;
    orderChartConfig = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                fill: false,

                backgroundColor: '#f39c12',
                borderColor: '#f39c12',
                data: [],
                cubicInterpolationMode: 'monotone'

            }
                , {
                fill: false,
                backgroundColor: '#41729a',
                borderColor: '#41729a',
                data: []

            }, {
                fill: false,
                backgroundColor: '#2fa314',
                borderColor: '#2fa314',
                data: [],
                lineTension: 0

            }
            ]
        },
        options: {
            legend: {
                display: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    ticks: {
                        userCallback: function (dataLabel, index) {
                            if (window.orderStatistics && window.orderStatistics.config.data.labels.length > 12) {
                                return index % 5 === 0 ? dataLabel : '';
                            }
                            return dataLabel;
                        }
                    }
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        userCallback: function (dataLabel, index) {
                            return (dataLabel ^ 0) === dataLabel ? dataLabel : '';
                        },
                        min: 0
                    }
                }]
            },
            showScale: true,
            scaleShowGridLines: false,
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth: 1,
            scaleShowHorizontalLines: true,
            scaleShowVerticalLines: true,
            bezierCurve: true,
            pointDot: false,
            pointDotRadius: 4,
            pointDotStrokeWidth: 1,
            pointHitDetectionRadius: 20,
            datasetStroke: true,
            datasetFill: true,
            maintainAspectRatio: false,
            responsive: true
        }
    };

    downlineChartConfig = {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                fill: false,
                backgroundColor: '#3ca3f5',
                borderColor: '#3ca3f5',
                data: [],
                lineTension: 0

            }
                , {
                fill: false,
                backgroundColor: '#87c7fd',
                borderColor: '#87c7fd',
                data: [],
                cubicInterpolationMode: 'monotone'

            }
            ]
        },
        options: {
            legend: {
                display: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    stacked: true,
                    ticks: {
                        userCallback: function (dataLabel, index) {
                            if (window.downlineStatistics && window.downlineStatistics.config.data.labels.length > 12) {
                                return index % 5 === 0 ? dataLabel : '';
                            }
                            return dataLabel;
                        }
                    }
                }],
                yAxes: [{
                    display: true,
                    stacked: true,
                    ticks: {
                        userCallback: function (dataLabel, index) {
                            return (dataLabel ^ 0) === dataLabel ? dataLabel : '';
                        },
                        min: 0
                    }
                }]
            },
            showScale: true,
            scaleShowGridLines: false,
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth: 1,
            scaleShowHorizontalLines: true,
            scaleShowVerticalLines: true,
            bezierCurve: true,
            pointDot: false,
            datasetStroke: true,
            datasetFill: true,
            maintainAspectRatio: false,
            responsive: true
        }
    };


    changeDownlineDetailsChart(0, "sp_downlineDetailsForCharts", Url);
    changeOrderDetailsChart(0, "sp_orderDetailsForCharts", Url);
});

$("#Project").click(function () {
    changeDownlineDetailsChart(0, "sp_downlineDetailsForCharts", Url);
});

$("#Details").click(function () {
    changeOrderDetailsChart(0, "sp_orderDetailsForCharts", Url);
});

function changeOrderDetailsChart(period, spName, url) {

    completeOrderData = [];
    processingOrderData = [];
    pendingOrderData = [];
    labelsName = [];
    labelsCompleteName = [];
    labelsProcessingName = [];
    labelsPendingName = [];

    $.ajax({
        cache: false,
        type: "GET",
        url: url,
        data: {
            period: period,
            spName: "" + spName + ""
        },
        success: function (data) {
            if (period != "2") {
                var maxcompleteOrderMonth = data[0][data[0].length - 1] == undefined ? 0 : data[0][data[0].length - 1].value
                var maxprocessingOrderMonth = data[1][data[1].length - 1] == undefined ? 0 : data[1][data[1].length - 1].value
                var maxpendingOrderMonth = data[2][data[2].length - 1] == undefined ? 0 : data[2][data[2].length - 1].value
                var maxMonth = 0;
                if (maxcompleteOrderMonth < maxprocessingOrderMonth && maxpendingOrderMonth < maxprocessingOrderMonth) {
                    maxMonth = maxprocessingOrderMonth;
                }
                else if (maxprocessingOrderMonth < maxcompleteOrderMonth && maxpendingOrderMonth < maxcompleteOrderMonth) {
                    maxMonth = maxcompleteOrderMonth;
                }
                else {
                    maxMonth = maxpendingOrderMonth;
                }
                var cnt = 1;
                for (cnt; cnt <= maxMonth; cnt++) {
                    labelsName.push(GetMonthName(cnt));
                }
            }
            else {

                maxcompleteOrderYear = [];
                maxprocessingOrderYear = [];
                maxpendingOrderYear = [];

                for (var i = 0; i < data[0].length; i++) {
                    maxcompleteOrderYear.push(data[0][i].value);
                }

                for (var i = 0; i < data[1].length; i++) {
                    maxprocessingOrderYear.push(data[1][i].value);
                }

                for (var i = 0; i < data[2].length; i++) {
                    maxpendingOrderYear.push(data[2][i].value);
                }

                var yearList = merge_array(maxcompleteOrderYear, maxprocessingOrderYear);
                labelsName = merge_array(maxpendingOrderYear, yearList);
                labelsName.sort();
            }

            if (period == '1') {

                if (data[0].length != 0) {
                    cnt = 1;
                    osLabels = [];
                    for (var i = 0; i < data[0].length; i++) {
                        osLabels.push(data[0][i].value);
                    }
                    var dataCount = 0;
                    for (cnt; cnt <= maxMonth; cnt++) {
                        if (jQuery.inArray(cnt.toString(), osLabels) == -1) {
                            completeOrderData.push(0);
                        }
                        else {
                            if (data[0].length == 0) {
                                completeOrderData.push(0);
                            }
                            else {
                                completeOrderData.push(data[0][dataCount].data);
                                dataCount++;
                            }
                        }
                    }
                }

                if (data[1].length != 0) {
                    cnt = 1;
                    osLabels = [];
                    for (var i = 0; i < data[1].length; i++) {
                        osLabels.push(data[1][i].value);
                    }
                    var dataCount = 0;
                    for (cnt; cnt <= maxMonth; cnt++) {
                        if (jQuery.inArray(cnt.toString(), osLabels) == -1) {
                            processingOrderData.push(0);
                        }
                        else {
                            if (data[1].length == 0) {
                                processingOrderData.push(0);
                            }
                            else {
                                processingOrderData.push(data[1][dataCount].data);
                                dataCount++;
                            }
                        }
                    }
                }

                if (data[2].length != 0) {
                    cnt = 1;
                    osLabels = [];
                    for (var i = 0; i < data[2].length; i++) {
                        osLabels.push(data[2][i].value);
                    }
                    var dataCount = 0;
                    for (cnt; cnt <= maxMonth; cnt++) {
                        if (jQuery.inArray(cnt.toString(), osLabels) == -1) {
                            pendingOrderData.push(0);
                        }
                        else {
                            if (data[2].length == 0) {
                                pendingOrderData.push(0);
                            }
                            else {
                                pendingOrderData.push(data[2][dataCount].data);
                                dataCount++;
                            }
                        }
                    }
                }
            }
            else if (period == '2') {
                if (data[0].length != 0) {
                    cnt = 0;

                    var dataCount = 0;
                    for (cnt; cnt <= labelsName.length; cnt++) {
                        if (maxcompleteOrderYear.length < cnt) {
                            completeOrderData.push(0);
                        }
                        else {
                            if (jQuery.inArray(maxcompleteOrderYear[cnt], labelsName) == -1) {
                                completeOrderData.push(0);
                            }
                            else {
                                if (maxcompleteOrderYear.length == 0) {
                                    completeOrderData.push(0);
                                }
                                else {
                                    completeOrderData.push(data[0][dataCount].data);
                                    dataCount++;
                                }
                            }
                        }
                    }
                }

                if (data[1].length != 0) {
                    cnt = 0;

                    var dataCount = 0;
                    for (cnt; cnt <= labelsName.length; cnt++) {
                        if (maxprocessingOrderYear.length < cnt) {
                            processingOrderData.push(0);
                        }
                        else {
                            if (jQuery.inArray(maxprocessingOrderYear[cnt], labelsName) == -1) {
                                processingOrderData.push(0);
                            }
                            else {
                                if (data[1].length == 0) {
                                    processingOrderData.push(0);
                                }
                                else {
                                    processingOrderData.push(data[1][dataCount].data);
                                    dataCount++;
                                }
                            }
                        }
                    }
                }

                if (data[2].length != 0) {
                    cnt = 0;

                    var dataCount = 0;
                    for (cnt; cnt <= labelsName.length; cnt++) {
                        if (maxpendingOrderYear.length < cnt) {
                            pendingOrderData.push(0);
                        }
                        else {
                            if (jQuery.inArray(maxpendingOrderYear[cnt], labelsName) == -1) {
                                pendingOrderData.push(0);
                            }
                            else {
                                if (data[2].length == 0) {
                                    pendingOrderData.push(0);
                                }
                                else {
                                    pendingOrderData.push(data[2][dataCount].data);
                                    dataCount++;
                                }
                            }
                        }
                    }
                }
            }
            else {
                for (var i = 0; i < data[0].length; i++) {
                    labelsCompleteName.push(data[0][i].value);
                }
                for (var i = 0; i < data[1].length; i++) {
                    labelsProcessingName.push(data[1][i].value);
                }
                for (var i = 0; i < data[2].length; i++) {
                    labelsPendingName.push(data[2][i].value);
                }

                var labelsNameList = merge_array(labelsCompleteName, labelsProcessingName);
                labelsName = merge_array(labelsNameList, labelsPendingName);

                for (var i = 0; i < labelsName.length; i++) {
                    if (i < data[1].length) {
                        if (jQuery.inArray(data[1][i].value.toString(), labelsName) == -1) {
                            processingOrderData.push(0);
                        }
                        else {
                            if (data[1].length == 0) {
                                processingOrderData.push(0);
                            }
                            else {
                                processingOrderData.push(data[1][i].data);
                                dataCount++;
                            }
                        }
                    }
                    else {
                        processingOrderData.push(0);
                    }

                    if (i < data[2].length) {
                        if (jQuery.inArray(data[2][i].value.toString(), labelsName) == -1) {
                            pendingOrderData.push(0);
                        }
                        else {
                            if (data[2].length == 0) {
                                pendingOrderData.push(0);
                            }
                            else {
                                pendingOrderData.push(data[2][i].data);
                                dataCount++;
                            }
                        }
                    }
                    else {
                        pendingOrderData.push(0);
                    }

                    if (i < data[0].length) {
                        if (jQuery.inArray(data[0][i].value.toString(), labelsName) == -1) {
                            completeOrderData.push(0);
                        }
                        else {
                            if (data[0].length == 0) {
                                completeOrderData.push(0);
                            }
                            else {
                                completeOrderData.push(data[0][i].data);
                                dataCount++;
                            }
                        }
                    }
                    else {
                        completeOrderData.push(0);
                    }
                }

            }

            if (!window.orderStatistics) {
                orderChartConfig.data.labels = labelsName;
                orderChartConfig.data.datasets[0].data = pendingOrderData;
                orderChartConfig.data.datasets[0].label = "Pending";
                orderChartConfig.data.datasets[1].data = processingOrderData;
                orderChartConfig.data.datasets[1].label = "Processing";
                orderChartConfig.data.datasets[2].data = completeOrderData;
                orderChartConfig.data.datasets[2].label = "Complete";
                window.orderStatistics = new Chart(document.getElementById("orderDetailschart").getContext("2d"), orderChartConfig);
            } else {
                orderChartConfig.data.labels = labelsName;
                orderChartConfig.data.datasets[0].data = pendingOrderData;
                orderChartConfig.data.datasets[0].label = "Pending";
                orderChartConfig.data.datasets[1].data = processingOrderData;
                orderChartConfig.data.datasets[1].label = "Processing";
                orderChartConfig.data.datasets[2].data = completeOrderData;
                orderChartConfig.data.datasets[2].label = "Complete";
                window.orderStatistics.update();
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Failed to load statistics.');
        }
    });
}

function changeDownlineDetailsChart(period, spName, url) {

    completeOrderData = [];
    processingOrderData = [];
    pendingOrderData = [];
    labelsName = [];


    $.ajax({
        cache: false,
        type: "GET",
        url: url,
        data: {
            period: period,
            spName: "" + spName + ""
        },
        success: function (data) {
            if (period != "2") {
                var maxcompleteOrderMonth = data[0][data[0].length - 1] == undefined ? 0 : data[0][data[0].length - 1].value
                var maxprocessingOrderMonth = data[1][data[1].length - 1] == undefined ? 0 : data[1][data[1].length - 1].value
                var maxMonth = 0;
                if (maxcompleteOrderMonth < maxprocessingOrderMonth) {
                    maxMonth = maxprocessingOrderMonth;
                }
                else {
                    maxMonth = maxcompleteOrderMonth;
                }

                for (cnt = 1; cnt <= maxMonth; cnt++) {
                    labelsName.push(GetMonthName(cnt));
                }
            }
            else {

                maxcompleteOrderYear = [];
                maxprocessingOrderYear = [];

                for (var i = 0; i < data[0].length; i++) {
                    maxcompleteOrderYear.push(data[0][i].value);
                }

                for (var i = 0; i < data[1].length; i++) {
                    maxprocessingOrderYear.push(data[1][i].value);
                }


                labelsName = merge_array(maxcompleteOrderYear, maxprocessingOrderYear);
                labelsName.sort();
            }

            if (period == '1') {

                if (data[0].length != 0) {
                    cnt = 1;
                    osLabels = [];
                    for (var i = 0; i < data[0].length; i++) {
                        osLabels.push(data[0][i].value);
                    }
                    var dataCount = 0;
                    for (cnt; cnt <= maxMonth; cnt++) {
                        if (jQuery.inArray(cnt.toString(), osLabels) == -1) {
                            completeOrderData.push(0);
                        }
                        else {
                            if (data[0].length == 0) {
                                completeOrderData.push(0);
                            }
                            else {
                                completeOrderData.push(data[0][dataCount].data);
                                dataCount++;
                            }
                        }
                    }
                }

                if (data[1].length != 0) {

                    osLabels = [];
                    for (var i = 0; i < data[1].length; i++) {
                        osLabels.push(data[1][i].value);
                    }
                    var dataCount = 0;
                    for (cnt = 1; cnt <= maxMonth; cnt++) {
                        if (jQuery.inArray(cnt.toString(), osLabels) == -1) {
                            processingOrderData.push(0);
                        }
                        else {
                            if (data[1].length == 0) {
                                processingOrderData.push(0);
                            }
                            else {
                                processingOrderData.push(data[1][dataCount].data);
                                dataCount++;
                            }
                        }
                    }
                }
            }
            else if (period == '2') {
                if (data[0].length != 0) {
                    cnt = 0;

                    var dataCount = 0;
                    for (cnt; cnt <= labelsName.length; cnt++) {
                        if (maxcompleteOrderYear.length < cnt) {
                            completeOrderData.push(0);
                        }
                        else {
                            if (jQuery.inArray(maxcompleteOrderYear[cnt], labelsName) == -1) {
                                completeOrderData.push(0);
                            }
                            else {
                                if (maxcompleteOrderYear.length == 0) {
                                    completeOrderData.push(0);
                                }
                                else {
                                    completeOrderData.push(data[0][dataCount].data);
                                    dataCount++;
                                }
                            }
                        }
                    }
                }

                if (data[1].length != 0) {
                    cnt = 0;

                    var dataCount = 0;
                    for (cnt; cnt <= labelsName.length; cnt++) {
                        if (maxprocessingOrderYear.length < cnt) {
                            processingOrderData.push(0);
                        }
                        else {
                            if (jQuery.inArray(maxprocessingOrderYear[cnt], labelsName) == -1) {
                                processingOrderData.push(0);
                            }
                            else {
                                if (data[1].length == 0) {
                                    processingOrderData.push(0);
                                }
                                else {
                                    processingOrderData.push(data[1][dataCount].data);
                                    dataCount++;
                                }
                            }
                        }
                    }
                }

            }
            else {

                if (data[0].length > data[1].length) {
                    for (var i = 0; i < data[0].length; i++) {
                        labelsName.push(data[0][i].value);
                        completeOrderData.push(data[0][i].data);
                    }

                }
                else {
                    for (var i = 0; i < data[1].length; i++) {
                        labelsName.push(data[1][i].value);
                        processingOrderData.push(data[1][i].data);
                    }
                }

                if (data[0].length < data[1].length) {
                    for (var i = 0; i < labelsName.length; i++) {
                        if (i < data[0].length) {
                            if (jQuery.inArray(data[0][i].value.toString(), labelsName) == -1) {
                                completeOrderData.push(0);
                            }
                            else {
                                if (data[0].length == 0) {
                                    completeOrderData.push(0);
                                }
                                else {
                                    completeOrderData.push(data[0][i].data);
                                    dataCount++;
                                }
                            }
                        }
                        else {
                            completeOrderData.push(0);
                        }
                    }
                }
                else {
                    for (var i = 0; i < labelsName.length; i++) {
                        if (i < data[1].length) {
                            if (jQuery.inArray(data[1][i].value.toString(), labelsName) == -1) {
                                processingOrderData.push(0);
                            }
                            else {
                                if (data[0].length == 0) {
                                    processingOrderData.push(0);
                                }
                                else {
                                    processingOrderData.push(data[1][i].data);
                                    dataCount++;
                                }
                            }
                        }
                        else {
                            processingOrderData.push(0);
                        }
                    }
                }

            }

            //if (pendingOrderData.length != 0 || processingOrderData.length != 0 || completeOrderData.length != 0) {
            if (!window.downlineStatistics) {
                downlineChartConfig.data.labels = labelsName;
                downlineChartConfig.data.datasets[0].data = completeOrderData;
                downlineChartConfig.data.datasets[0].label = "Paid";
                downlineChartConfig.data.datasets[1].data = processingOrderData;
                downlineChartConfig.data.datasets[1].label = "Unpaid";
                window.downlineStatistics = new Chart(document.getElementById("downlineDetailschart").getContext("2d"), downlineChartConfig);
            } else {
                downlineChartConfig.data.labels = labelsName;
                downlineChartConfig.data.datasets[0].data = completeOrderData;
                downlineChartConfig.data.datasets[0].label = "Paid";
                downlineChartConfig.data.datasets[1].data = processingOrderData;
                downlineChartConfig.data.datasets[1].label = "Unpaid";
                window.downlineStatistics.update();
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Failed to load statistics.');
        }
    });
}

function merge_array(array1, array2) {
    var result_array = [];
    var arr = array1.concat(array2);
    var len = arr.length;
    var assoc = {};

    while (len--) {
        var item = arr[len];

        if (!assoc[item]) {
            result_array.unshift(item);
            assoc[item] = true;
        }
    }

    return result_array;
}
