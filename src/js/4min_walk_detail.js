import "./components/barDom";
import "./components/httpRequest";
import "./components/dataFormat";

function FourMinWalkDetail() {
  this.init();
}

FourMinWalkDetail.prototype.init = function() {
  if (window.localStorage.getItem("utClinic") == null) {
    $("html,body").html("");
    window.location.href = "../login.html";
  } else {
    this.requestCustomerData();
    this.requestSportsData();
    this.bind();
    this.interpretation();
    this.openShut();
    this.getDate();
  }
  var reportType = 4;
  window.localStorage.setItem("reportType1", reportType);

  var data_recordId = window.localStorage.getItem("data_recordId");
  if (data_recordId == "null") {
    $(".compile").show();
  } else if (data_recordId != null) {
    $(".examine").show();
  }
  $(".unscramble").attr("disabled", "disabled");
  $(".page-compile").click(function() {
    $(".unscramble").removeAttr("disabled");
    $(".page-off").show();
    $(this).hide();
  });
  $(".page-call").click(function() {
    $(".unscramble").attr("disabled", "disabled");
    $(".page-compile").show();
    $(".page-off").hide();
  });
  $(".form-control2").select2({
    placeholder: "点击选择",
    minimumResultsForSearch: -1,
    language: "zh-CN"
  });
};
FourMinWalkDetail.prototype.interpretation = function() {
  var _this = this;
  $(".page-save").click(function() {
    _this.validator();
    var report_unscramble = $(".unscramble").val();
    var reportId = window.localStorage.getItem("reportId");
    var token = window.localStorage.getItem("utClinic"); // 登入凭证
    var uuid = window.localStorage.getItem("uidClinic"); // 用户id
    var reqUrl = "motiondata/updateReportInterpretation";
    $.ajax({
      url: window.urlHandler(reqUrl, uuid, token),
      method: "post",
      data: {
        id: reportId,
        sportType: 3,
        content: report_unscramble
      },
      success: function(res) {
        if (res.status == 200) {
          swal({
            title: "提示",
            text: "保存成功！",
            type: "success",
            showConfirmButton: false,
            timer: 2000
          });
          _this.requestSportsData();
          $(".unscramble").attr("disabled", "disabled");
          $(".page-off").hide();
          $(".page-compile").show();
        }
      }
    });
  });
};
FourMinWalkDetail.prototype.validator = function() {
  var report_unscramble = $(".unscramble").val();
  if (report_unscramble.length > 200) {
    $(".verify-report").text("仅限200字以内");
    return false;
  } else {
    $(".verify-report").hide();
    return true;
  }
};

FourMinWalkDetail.prototype.requestCustomerData = function() {
  var _this = this;
  var ajaxLoading = false;
  var token = window.localStorage.getItem("utClinic");
  var uuid = window.localStorage.getItem("uidClinic");
  var customerId = window.localStorage.getItem("customerUUID");
  var reqUrl = "customer/findByCustomerUuid";
  if (!ajaxLoading) {
    ajaxLoading = true;
    $.ajax({
      url: window.urlHandler(reqUrl, uuid, token),
      method: "post",
      data: {
        customerId: customerId
      }
    })
      .done(function(res) {
        if (res.status == 200) {
          _this.renderInfo(res.datas.userInfo);
          var user = res.datas.userInfo;
          user = JSON.stringify(user);
          window.localStorage.setItem("user", user);
        }
        ajaxLoading = false;
      })
      .fail(function(err) {
        ajaxLoading = false;
      });
  }
};

FourMinWalkDetail.prototype.requestSportsData = function() {
  var _this = this;
  var ajaxLoading = false;
  var token = window.localStorage.getItem("utClinic");
  var uuid = window.localStorage.getItem("uidClinic");
  var reportId = window.localStorage.getItem("reportId");
  var reqUrl = "aerobic/rockportOrTreadmill/" + reportId;
  if (!ajaxLoading) {
    ajaxLoading = true;
    $.ajax({
      url: window.urlHandler(reqUrl, uuid, token),
      method: "post",
      data: {}
    })
      .done(function(res) {
        if (res.status == 200) {
          _this.renderData(res.datas.aerobicDataVO);

          var reportInterpretation =
            res.datas.aerobicDataVO.reportInterpretation;
          if (reportInterpretation != null) {
            $(".unscramble").text(reportInterpretation);
          }
          window.localStorage.setItem("report", reportInterpretation);

          var aerobic = res.datas.aerobicDataVO;
          aerobic = JSON.stringify(aerobic);
          window.localStorage.setItem("aerobic", aerobic);

          _this.setEchartsData1(res.datas.muscleHeartRateInfo);

          var muscle = res.datas.muscleHeartRateInfo;
          muscle = JSON.stringify(muscle);
          window.localStorage.setItem("muscle", muscle);
        }
        ajaxLoading = false;
        window.dataErrorHandler(res);
      })
      .fail(function(err) {
        ajaxLoading = false;
      });
  }
};
function Ifnoreason() {
  var val = $('input:radio[name="testFinished"]:checked').val();
  if ($("[name='testFinished']").val() == 2) {
  }
}
function testStageA() {
  var testStage = $(".testStage option:selected").val();

  if (testStage == 0) {
    $(".testStage-1").addClass("avtive");
  } else {
    $(".testStage-1").removeClass("avtive");
  }
}
$(".testStage").change(function() {
  var testStage = $(".testStage option:selected").val();
  if (testStage == 0) {
    $(".testStage-1").addClass("avtive");
  } else {
    $(".testStage-1").removeClass("avtive");
  }
});
function restingS() {
  var restingHeartRate = $(".restingHeartRate").val();
  if (restingHeartRate == "") {
    $(".restingHeartRate-1").addClass("avtive");
  } else if (!/^(ND|\d+(.\d{1,2})?)$/i.test(restingHeartRate)) {
    $(".restingHeartRate-1").addClass("avtive");
  } else {
    $(".restingHeartRate-1").removeClass("avtive");
  }
}
function beforeExerciseBsA() {
  var beforeExerciseBs = $(".beforeExerciseBs").val();
  if (beforeExerciseBs == "") {
    $(".beforeExerciseBs-1").addClass("avtive");
  } else if (!/^(ND|\d+(.\d{1,2})?)$/i.test(beforeExerciseBs)) {
    $(".beforeExerciseBs-1").addClass("avtive");
  } else {
    $(".beforeExerciseBs-1").removeClass("avtive");
  }
}
function afterExerciseBsA() {
  var afterExerciseBs = $(".afterExerciseBs").val();
  if (afterExerciseBs == "") {
    $(".beforeExerciseBs-1").addClass("avtive");
  } else if (!/^(ND|\d+(.\d{1,2})?)$/i.test(afterExerciseBs)) {
    $(".beforeExerciseBs-1").addClass("avtive");
  } else {
    $(".beforeExerciseBs-1").removeClass("avtive");
  }
}
function hba1cA() {
  var hba1c = $(".hba1c").val();
  if (hba1c == "") {
    $(".hba1c-1").removeClass("avtive");
  } else if (!/^(ND|\d+(.\d{1,2})?)$/i.test(hba1c)) {
    $(".hba1c-1").addClass("avtive");
  } else {
    $(".hba1c-1").removeClass("avtive");
  }
}
function beforeExerciseBpA() {
  var beforeExerciseBp = $(".beforeExerciseBp").val();
  if (beforeExerciseBp == "") {
    $(".beforeExerciseBp-1").addClass("avtive");
  } else {
    $(".beforeExerciseBp-1").removeClass("avtive");
  }
}
function addReg() {
  //通用方法
  var $ele = $(this);
  var element = $ele.val();
  if (element == "") {
    $ele.parent().find("b").removeClass("avtive");
  } else if (!/^(ND|\d+(.\d{1,2})?)$/i.test(element)) {
    $ele.parent().find("b").addClass("avtive");
  } else {
    $ele.parent().find("b").removeClass("avtive");
  }
}

function arrayToString(arr) {
  if (arr.length == 0) {
    return "";
  } else {
    return "," + arr.join(",") + ",";
  }
}
function occurrenceRisk() {
  if ($("input[name='testFinished']:checked")) {
    // $('.risk-1').removeClass('avtive');
    $(".risk-1").addClass("avtive");
  }
}

FourMinWalkDetail.prototype.judgeND = function(obj) {
  if (obj.toUpperCase() == "ND") {
    return -99;
  } else {
    return obj;
  }
};
FourMinWalkDetail.prototype.transitionND = function(obj) {
  if (obj == -99) {
    return "ND";
  } else {
    return obj;
  }
};
FourMinWalkDetail.prototype.ajax = function() {
  var _this = this;
  var testStage = $(".testStage option:selected").val();
  var testFinished = $("input[name='testFinished']:checked").val();
  var exerciseRiskHappened = $(
    "input[name='exerciseRiskHappened']:checked"
  ).val();
  var arr1 = [];
  $("input[name='notFinishReason']").each(function() {
    if (this.checked) {
      arr1.push($(this).val());
    }
  });
  var notFinishReason = arrayToString(arr1);
  var notFinishReasonCustom = $(".notFinishReasonCustom").val();
  var arr2 = [];
  $("input[name='exerciseRiskReason']").each(function() {
    if (this.checked) {
      arr2.push($(this).val());
    }
  });

  var exerciseRiskReason = arrayToString(arr2);
  var exerciseRiskReasonCustom = $(".exerciseRiskReasonCustom").val();
  var hba1c = _this.judgeND($(".hba1c").val());
  var restingHeartRate = _this.judgeND($(".restingHeartRate").val());
  var beforeExerciseBp = _this.judgeND($(".beforeExerciseBp").val());
  var beforeExerciseBs = _this.judgeND($(".beforeExerciseBs").val());
  var afterExerciseBs = _this.judgeND($(".afterExerciseBs").val());
  var before1hExerciseBs = _this.judgeND($(".before1hExerciseBs").val());
  var before2hExerciseBs = _this.judgeND($(".before2hExerciseBs").val());
  var before3hExerciseBs = _this.judgeND($(".before3hExerciseBs").val());
  var weight = _this.judgeND($(".weight").val());

  var token = window.localStorage.getItem("utClinic");
  var uuid = window.localStorage.getItem("uidClinic");
  var reqUrl = "reportQuestionnaire/save";
  var reportType = window.localStorage.getItem("reportType1");
  var reportId = window.localStorage.getItem("reportId");
  var sendData = {
    reportId: reportId,
    reportType: reportType,
    testStage: testStage,
    restingHeartRate: restingHeartRate,
    beforeExerciseBp: beforeExerciseBp,
    hba1c: hba1c,
    testFinished: testFinished,
    notFinishReason: notFinishReason,
    notFinishReasonCustom: notFinishReasonCustom,
    exerciseRiskHappened: exerciseRiskHappened,
    exerciseRiskReason: exerciseRiskReason,
    exerciseRiskReasonCustom: exerciseRiskReasonCustom,
    smo2Reading: $(".smo2-interpretation textarea").val(),
    exerciseGuidance: $(".sport-guidelines textarea").val(),
    beforeExerciseBs: beforeExerciseBs,
    afterExerciseBs: afterExerciseBs,
    before1hExerciseBs: before1hExerciseBs,
    before2hExerciseBs: before2hExerciseBs,
    before3hExerciseBs: before3hExerciseBs,
    weight: weight
  };
  if (
    testStage == "" ||
    restingHeartRate == "" ||
    testFinished == "" ||
    weight == "" ||
    beforeExerciseBp == ""
  ) {
    swal({
      title: "请填写完整信息！",
      type: "info",
      showConfirmButton: true,
      confirmButtonText: "确定",
      timer: 2000,
      confirmButtonColor: "#009CAA"
    });
  } else {
    $.ajax({
      type: "POST",
      url: window.urlHandler(reqUrl, uuid, token),
      dataType: "json",
      data: JSON.stringify(sendData),
      contentType: "application/json",
      success: function(data) {
        if (data.status == 200) {
          swal({
            title: "提示",
            text: "保存成功！",
            type: "success",
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          swal({
            title: "提示",
            text: data.info,
            type: "info",
            showConfirmButton: true,
            confirmButtonText: "确定",
            timer: 2000,
            confirmButtonColor: "#009CAA"
          });
        }
      }
    });
  }
};

FourMinWalkDetail.prototype.getDate = function() {
  var _this = this;
  var reportId = window.localStorage.getItem("reportId");
  var token = window.localStorage.getItem("utClinic");
  var uuid = window.localStorage.getItem("uidClinic");
  var reqUrl = "reportQuestionnaire/get";
  $.ajax({
    type: "POST",
    url: window.urlHandler(reqUrl, uuid, token),
    dataType: "json",
    data: {
      reportType: 4,
      reportId: reportId
    },
    success: function(res) {
      if (res.status == 200) {
        var data = res.datas;
        if (data != null) {
          $(".testStage").val(data.testStage).trigger("change");
          $(".restingHeartRate").val(_this.transitionND(data.restingHeartRate));
          $(".beforeExerciseBs").val(_this.transitionND(data.beforeExerciseBs));
          $(".afterExerciseBs").val(_this.transitionND(data.afterExerciseBs));
          $(".beforeExerciseBs").val(_this.transitionND(data.beforeExerciseBs));
          $(".afterExerciseBs").val(_this.transitionND(data.afterExerciseBs));
          $(".weight").val(_this.transitionND(data.weight));
          $(".hba1c").val(_this.transitionND(data.hba1c));
          $(".beforeExerciseBp").val(_this.transitionND(data.beforeExerciseBp));
          $(".before1hExerciseBs").val(
            _this.transitionND(data.before1hExerciseBs)
          );
          $(".before2hExerciseBs").val(
            _this.transitionND(data.before2hExerciseBs)
          );
          $(".before3hExerciseBs").val(
            _this.transitionND(data.before3hExerciseBs)
          );

          if (data.testFinished == 1) {
            $("#male").attr("checked", true);
          } else if (data.testFinished == 2) {
            $("#female").attr("checked", true);
            _this.renderNo();
          }

          if (data.exerciseRiskHappened == 1) {
            $("#risk-yes").attr("checked", true);
            _this.renderNoTwo();
          } else if (data.exerciseRiskHappened == 2) {
            $("#risk-no").attr("checked", true);
          }

          var notFinishReason = data.notFinishReason;
          if (notFinishReason.substr(0, 1) == ",")
            notFinishReason = notFinishReason.substr(1);
          var risktwo = notFinishReason.substring(
            0,
            notFinishReason.length - 1
          );
          for (var i = 0; i < risktwo.length; i++) {
            if (risktwo[i] == 1) {
              $("#risk").attr("checked", true);
            } else if (risktwo[i] == 2) {
              $("#tired").attr("checked", true);
            }
          }
          var exerciseRiskReason = data.exerciseRiskReason;
          if (exerciseRiskReason.substr(0, 1) == ",")
            exerciseRiskReason = exerciseRiskReason.substr(1);
          var risktwo_tow = exerciseRiskReason.substring(
            0,
            exerciseRiskReason.length - 1
          );
          for (var i = 0; i < risktwo_tow.length; i++) {
            if (risktwo_tow[i] == 1) {
              $("#hypoglycemia").attr("checked", true);
            } else if (risktwo_tow[i] == 2) {
              $("#pulled-muscle").attr("checked", true);
            } else if (risktwo_tow[i] == 3) {
              $("#sprain").attr("checked", true);
            }
          }
          var notFinishReasonCustom = data.notFinishReasonCustom;
          $(".notFinishReasonCustom").val(notFinishReasonCustom);

          var exerciseRiskReasonCustom = data.exerciseRiskReasonCustom;
          $(".exerciseRiskReasonCustom").val(exerciseRiskReasonCustom);

          $(".smo2-interpretation textarea").val(data.smo2Reading);
          $(".sport-guidelines textarea").val(data.exerciseGuidance);
        }
      }
    }
  });
};
$("#male").on("click", function() {
  if ($("#male").val() == 1) {
    $(".reveal").remove();
  }
});
FourMinWalkDetail.prototype.bind = function() {
  var _this = this;
  $(".restingHeartRate").blur(restingS);
  $(".beforeExerciseBs").blur(beforeExerciseBsA);
  $(".afterExerciseBs").blur(afterExerciseBsA);
  $(".hba1c").blur(hba1cA);
  $(".beforeExerciseBp").blur(beforeExerciseBpA);
  $(".beforeExerciseBs").blur(addReg);
  $(".before1hExerciseBs").blur(addReg);
  $(".before2hExerciseBs").blur(addReg);
  $(".before3hExerciseBs").blur(addReg);
  $(".afterExerciseBs").blur(addReg);
  $(".weight").blur(addReg);

  $(".btn-save a").on("click", function(e) {
    e.preventDefault();
    restingS();
    beforeExerciseBsA();
    afterExerciseBsA();
    hba1cA();
    beforeExerciseBpA();
    testStageA();
    Ifnoreason();
    occurrenceRisk();
    _this.ajax();
  });

  $(".change-y-btn").on("click", function() {
    var smo2Start = $(".smo2-start").val();
    var smo2End = $(".smo2-end").val();
    var hrStart = $(".hr-start").val();
    var hrEnd = $(".hr-end").val();

    if (smo2Start == "" || smo2End == "" || hrStart == "" || hrEnd == "") {
      $(".type-error-alert").text("请输入正确完整的数值范围！");
      $(".type-error-alert").fadeIn();
      setTimeout(function() {
        $(".type-error-alert").fadeOut();
      }, 2000);
    }
    if (smo2Start != "" || smo2End != "" || hrStart != "" || hrEnd != "") {
      if (smo2End == smo2Start || hrStart == hrEnd) {
        $(".type-error-alert").text("请输入正确完整的数值范围！");
        $(".type-error-alert").fadeIn();
        setTimeout(function() {
          $(".type-error-alert").fadeOut();
        }, 2000);
      } else if (
        parseInt(smo2End) < parseInt(smo2Start) ||
        parseInt(hrEnd) < parseInt(hrStart)
      ) {
        $(".type-error-alert").text("终止值不能小于起始值，请修改！");
        $(".type-error-alert").fadeIn();
        setTimeout(function() {
          $(".type-error-alert").fadeOut();
        }, 2000);
      } else {
        $("#myModal").modal("hide");
        _this.setEchartsOption1(smo2Start, smo2End, hrStart, hrEnd);
      }
    }
  });

  $(".reset-y-btn").on("click", function() {
    $(".smo2-start").val("");
    $(".smo2-end").val("");
    $(".hr-start").val("");
    $(".hr-end").val("");

    $("#myModal").modal("hide");
    _this.setEchartsOption1(0, 100, 0, 200);
  });

  $(".rewrite-report-remarks-btn").on("click", function() {
    var reqUrl = "motiondata/addSportRemarks";
    var token = window.localStorage.getItem("utClinic");
    var uuid = window.localStorage.getItem("uidClinic");
    var reportId = window.localStorage.getItem("reportId");
    var reportRemarks = $(".report-remarks").val();
    $.ajax({
      url: window.urlHandler(reqUrl, uuid, token),
      method: "POST",
      data: {
        sportType: 1,
        uuid: reportId,
        content: reportRemarks
      }
    })
      .done(function(res) {
        if (res.status == 200) {
          _this.requestSportsData();
          $("#rewriteModal").modal("hide");
          swal({
            title: "提示",
            text: "保存成功！",
            type: "success",
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          $(".rewrite-error-alert").text("服务器解析错误，请稍后再试！");
          $(".rewrite-error-alert").fadeIn();
          setTimeout(function() {
            $(".rewrite-error-alert").fadeOut();
          }, 2000);
        }
      })
      .fail(function(err) {
        $("#rewriteModal").modal("hide");
        swal({
          title: "提示",
          text: "请求失败！",
          type: "error",
          showConfirmButton: false,
          timer: 2000
        });
      });
  });

  $(".smo2-start,.smo2-end").on("keypress", function(e) {
    return e.keyCode >= 48 && e.keyCode <= 57;
  });

  $(".hr-start,.hr-end").on("keypress", function(e) {
    return e.keyCode >= 48 && e.keyCode <= 57;
  });

  $(".smo2-start,.smo2-end").on("keyup", function() {
    if ($(this).val() > 100) {
      $(this).val("100");
    }
    if ($(this).val() < 0) {
      this.val("0");
    }
  });

  $(".hr-start,.hr-end").on("keyup", function() {
    if ($(this).val() > 200) {
      $(this).val("200");
    }
    if ($(this).val() < 0) {
      this.val("0");
    }
  });

  window.onresize = function() {
    _this.mixchart.resize();
  };
};

FourMinWalkDetail.prototype.renderInfo = function(data) {
  $(".userinfo-detail-list li").eq(0).find("img").attr("src", data.icon_url);
  $(".userinfo-detail-list li").eq(1).find("p").text(data.id);
  $(".userinfo-detail-list li").eq(2).find("p").text(data.nick_name);
  $(".userinfo-detail-list li")
    .eq(3)
    .find("p")
    .text(window.formatSex(data.sex));
  $(".userinfo-detail-list li")
    .eq(4)
    .find("p")
    .text(window.nullFormat(data.age));
  $(".userinfo-detail-list li")
    .eq(5)
    .find("p")
    .text(
      window.cityNullFormat(data.province) + window.cityNullFormat(data.city)
    );
  $(".userinfo-detail-list li")
    .eq(6)
    .find("p")
    .text(window.nullFormat(data.height) + "cm");
  $(".userinfo-detail-list li")
    .eq(7)
    .find("p")
    .text(window.nullFormat(data.weight) + "kg");
  $(".userinfo-detail-list li")
    .eq(8)
    .find("p")
    .text(window.nullFormat(data.motion_number) + "次");
  $(".userinfo-detail-list li")
    .eq(9)
    .find("p")
    .text(window.cutTimeUntilSeconds(data.last_upload_time));
  $(".userinfo-detail-list li")
    .eq(10)
    .find("p")
    .text(window.nullFormat(data.register_time));

  $(".userinfo-remark").find("p").text(window.nullFormat(data.remarks));

  window.localStorage.setItem("customerUUID", data.uuid);
  window.localStorage.setItem("customerId", data.id);
};

FourMinWalkDetail.prototype.renderData = function(data) {
  $(".page-content>h3").text(window.cutTime(data.startDate) + "  跑步机四分钟走测试报告");
  var next_time = data.startDate;
  window.localStorage.setItem("next_time", next_time);

  if (window.localStorage.getItem("auClinic") == "1") {
    $(".origin-data-download").attr("href", data.originData);
    $(".origin-data-download-ct").show();
    if (data.originData == null) {
      $(".origin-data-download").text("无原始数据");
      $(".origin-data-download").addClass("no-data");
    }
  }
  $(".device-number").text(data.bluetoothName);

  $(".reportinfo-remark").find("p").text(window.nullFormat(data.reportRemarks));
  $(".report-remarks").val(data.reportRemarks);

  //有氧能力部分
  $(".smxo2-summary span:first").text(data.metValue);
  $(".smxo2-summary span.exdata-eva").text(data.metValueDescription);

  $(".exdata-summary>li")
    .eq(1)
    .find(".exdata-summary-allin li")
    .eq(0)
    .find("h3")
    .text(data.startTime);
  $(".exdata-summary>li")
    .eq(1)
    .find(".exdata-summary-allin li")
    .eq(1)
    .find("h3")
    .text(data.benchmarkLevel);
  $(".exdata-summary>li")
    .eq(1)
    .find(".exdata-summary-allin li")
    .eq(2)
    .find("h3")
    .text(window.nullFormat(data.warmupDuration));
  $(".exdata-summary>li")
    .eq(1)
    .find(".exdata-summary-allin li")
    .eq(3)
    .find("h3")
    .text(data.continuedTime);
  $(".exdata-summary>li")
    .eq(1)
    .find(".exdata-summary-allin li")
    .eq(4)
    .find("h3")
    .text(data.finalHeart + "bpm");

  $(".exdata-summary>li")
    .eq(2)
    .find(".exdata-summary-allin li")
    .eq(0)
    .find("h3")
    .text(data.firstStageSpeed + "km/h");
  $(".exdata-summary>li")
    .eq(2)
    .find(".exdata-summary-allin li")
    .eq(1)
    .find("h3")
    .text(this.zeroFormat(data.secondStageSpeed) + "km/h");
  $(".exdata-summary>li")
    .eq(2)
    .find(".exdata-summary-allin li")
    .eq(2)
    .find("h3")
    .text(this.zeroFormat(data.thirdStageSpeed) + "km/h");
  $(".exdata-summary>li")
    .eq(2)
    .find(".exdata-summary-allin li")
    .eq(3)
    .find("h3")
    .text(this.zeroFormat(data.fourthStageSpeed) + "km/h");

  $(".four-color ul li").eq(0).find("span").text(data.firstStageSpeed + "km/h");
  $(".four-color ul li")
    .eq(1)
    .find("span")
    .text(this.zeroFormat(data.secondStageSpeed) + "km/h");
  $(".four-color ul li")
    .eq(2)
    .find("span")
    .text(this.zeroFormat(data.thirdStageSpeed) + "km/h");
  $(".four-color ul li")
    .eq(3)
    .find("span")
    .text(this.zeroFormat(data.fourthStageSpeed) + "km/h");

  //测试评价部分
  $(".ability-list>li")
    .eq(0)
    .find(".ability-bar")
    .addClass(this.levelEvaluate(data.vo2MaxLevel));
  $(".ability-list>li")
    .eq(0)
    .find(".ability-detail .ability-vo2max")
    .text(data.vo2Max);
  $(".ability-list>li")
    .eq(0)
    .find(".ability-detail p")
    .text(data.vo2MaxDescription);

  //重大风险
  $(".risk-bar").addClass(this.riskEvaluate(data.riskLevel));

  if (data.sportRiskRate >= 0) {
    $(".risk-bar i").addClass("green");
  } else {
    $(".risk-bar i").addClass("red");
  }

  $(".risk-summary-detail .high-or-low").text(
    this.highOrLow(data.sportRiskRate)
  );
  if (data.sportRiskRate == 0) {
    $(".risk-percent").hide();
  } else {
    $(".risk-summary-detail .risk-percent").css({
      background: this.riskPercentBGColor(data.sportRiskRate),
      color: this.riskPercentFontColor(data.sportRiskRate)
    });
    $(".risk-summary-detail .risk-percent").html(
      '<img src="' +
        this.riskImg(data.sportRiskRate) +
        '">' +
        this.riskText(data.sportRiskRate) +
        "%"
    );
  }
};

FourMinWalkDetail.prototype.levelEvaluate = function(num) {
  var numArr = [-2, -1, 0, 1, 2, 3];
  var evaArr = ["awful", "bad", "none", "average", "good", "excellent"];
  for (var i = 0; i < numArr.length; i++) {
    if (num == numArr[i]) {
      return evaArr[i];
    }
  }
};

FourMinWalkDetail.prototype.riskEvaluate = function(num) {
  var numArr = [1, 2, 3];
  var evaArr = ["high", "normal", "low"];

  if (num == 0) {
    return "none";
  } else {
    for (var i = 0; i < numArr.length; i++) {
      if (num == numArr[i]) {
        return evaArr[i];
      }
    }
  }
};

FourMinWalkDetail.prototype.highOrLow = function(num) {
  if (num < 0) {
    return "比普通人高";
  } else if (num == 0) {
    return "为正常人水平";
  } else if (num > 0) {
    return "比普通人低";
  } else {
    return "-";
  }
};

FourMinWalkDetail.prototype.riskImg = function(num) {
  if (num <= 0) {
    return "../../img/riskup@2x.png";
  }
  if (num > 0) {
    return "../../img/riskdown@2x.png";
  } else {
    return "";
  }
};

FourMinWalkDetail.prototype.riskText = function(text) {
  if (text != null || text != undefined) {
    return (text * 100).toFixed(0).toString().replace("-", "");
  } else {
    return "--";
  }
};

FourMinWalkDetail.prototype.riskPercentBGColor = function(num) {
  if (num <= 0) {
    return "#ffc9c5";
  }
  if (num > 0) {
    return "#E4F6F6";
  } else {
    return "#ffc9c5";
  }
};

FourMinWalkDetail.prototype.riskPercentFontColor = function(num) {
  if (num <= 0) {
    return "red";
  }
  if (num > 0) {
    return "#009caa";
  } else {
    return "red";
  }
};

FourMinWalkDetail.prototype.zeroFormat = function(num) {
  if (num === 0) {
    return "--";
  } else {
    return num;
  }
};
FourMinWalkDetail.prototype.openShutData = function() {
  var _this = this;
  // this.sex = $("input[name='sex']:checked").val();
  // this.yes = $("#female").val();
  //
  // this.no = $("#male").val();
  // this.no = $("#male").val();
  /* this.sextow = $("input[name='sextow']:checked").val();
    console.log(_this.sextow)*/
};
FourMinWalkDetail.prototype.renderNo = function() {
  var html = "";
  html =
               '<div class="reveal">'+
                                '<b class="keep-right">如否，原因是</b>'
                                +'<input type="checkbox" id="risk" value="1" name="notFinishReason" class="notFinishReason">'
                                +'<label for="risk" style="margin-right:30px;">发生运动风险</label>'
                                +'<input type="checkbox" id="tired" value="2" name="notFinishReason" class="notFinishReason">'
                                +'<label for="tired">自觉体力不支</label>'
                                +'<div style="margin-left:16%;margin-top:15px;">'
                                    +'<b class="please-specify">若为其他，请指明</b>'
                                    +'<input type="text" class="rest-import2 notFinishReasonCustom">'
                                +'</div>'
                            +'</div>';
            ;
  $(".risk-hide").append(html);
};
FourMinWalkDetail.prototype.renderNoTwo = function() {
  var html = "";
  html =
                 '<div class="reveal-tow">'
                                +'<b class="keep-right">如是，风险后果为</b>'
                                +'<input type="checkbox" id="hypoglycemia" value="1" name="exerciseRiskReason" class="exerciseRiskReason">'
                                +'<label for="hypoglycemia" style="margin-right:30px;">低血糖</label>'
                                +'<input type="checkbox" id="pulled-muscle" value="2" name="exerciseRiskReason" class="exerciseRiskReason">'
                                +'<label for="pulled-muscle" style="margin-right:30px;">肌肉拉伤</label>'
                                +'<input type="checkbox" id="sprain" value="3" name="exerciseRiskReason" class="exerciseRiskReason">'
                                +'<label for="sprain" style="margin-right:30px;">摔伤、扭伤</label>'
                                +'<div style="margin-left:15%;margin-top:15px;">'
                                    +'<b class="please-specify2">其他，其他原因</b>'
                                    +'<input type="text" class="rest-import2 exerciseRiskReasonCustom">'
                                +'</div>'
                            +'</div>';

  $(".risk-hide-tow").append(html);
};

FourMinWalkDetail.prototype.openShut = function() {
  var _this = this;
  $("#female").on("click", function() {
    if ($("#female").val() == 2) {
      if ($(".reveal").length < 1) {
        _this.renderNo();
      }
    }
    $("#male").on("click", function() {
      if ($("#male").val() == 1) {
        $(".reveal").remove();
      }
    });
  });

  $("#risk-yes").on("click", function() {
    if ($("#risk-yes").val() == 1) {
      if ($(".reveal-tow").length < 1) {
        _this.renderNoTwo();
      }
    }
  });
  $("#risk-no").on("click", function() {
    if ($("#risk-no").val() == 2) {
      $(".reveal-tow").remove();
    }
  });
};
FourMinWalkDetail.prototype.setEchartsData1 = function(data) {
  $(".stats-ct ul li").eq(0).find(".stat").text(data.avgSmo2);
  $(".stats-ct ul li").eq(1).find(".stat").text(data.minSmo2);
  $(".stats-ct ul li").eq(2).find(".stat").text(data.avgHeart);
  $(".stats-ct ul li").eq(3).find(".stat").text(data.maxHeart);

  var originData  = JSON.stringify(data);
  var y1 = data.y1Axis;
  var y2 = data.y2Axis;

  var changeFlag = false;

  for(var j=0;j<y1.length;j++){
    if(y1[j]==0){
      y1[j] = y1[j-1];
      console.warn('肌氧数据序列为'+j+',时间'+data.xAxis[j]+'的值为0，已被置换为上一个值');
      changeFlag = true;
    }
  }
  for(var k=0;k<y2.length;k++){
    if(y2[k]==0){
      y2[k] = y2[k-1];
      console.warn('心率数据序列为'+k+',时间'+data.xAxis[k]+'的值为0，已被置换为上一个值');
      changeFlag = true;
    }
    if((y2[k-1] - y2[k]) >= y2[k-1]*0.5){
      y2[k] = y2[k-1];
      console.warn('心率数据序列为'+k+',时间'+data.xAxis[k]+'的值与上一个的差值超过上一个值的50%，被置换为上一个值');
      changeFlag = true;
    }
  }

  if(changeFlag && window.localStorage.getItem("auClinic") == "1"){
      var txtFile = "test.txt";
      var file = new File([txtFile],"write");
      var dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(originData);
      var link = document.getElementById('link').href = dataUri;
      $('.chart-tools').show();
  }

  this.chartXData = data.xAxis;
  this.chartY1Data = y1;
  this.chartY2Data = y2;

  this.maxHrHint = (parseInt(data.limitHeart) * 0.85).toFixed(0);
  this.hintArr = [];
  var hintItem = { xAxis: 0, yAxis: this.maxHrHint };
  this.hintArr.push(hintItem);

  this.minSmo2 = Math.min.apply(null,y1);
  this.maxSmo2 = Math.max.apply(null,y1);
  this.minHr = Math.min.apply(null,y2);
  this.maxHr = Math.max.apply(null,y2);

  this.rangeArr = [this.minSmo2 * 2, this.maxSmo2 * 2, this.minHr, this.maxHr];

  if (this.rangeArr[0] < this.rangeArr[2]) {
    var y2start = this.rangeArr[0] - 4;
    var y1start = ((this.rangeArr[0] - 4) / 2).toFixed(0);
  } else {
    var y2start = this.rangeArr[2] - 4;
    var y1start = ((this.rangeArr[2] - 4) / 2).toFixed(0);
  }

  if (this.rangeArr[1] > this.rangeArr[3]) {
    var y2end = this.rangeArr[1] + 4;
    var y1end = ((this.rangeArr[1] + 4) / 2).toFixed(0);
  } else {
    var y2end = this.rangeArr[3] + 4;
    var y1end = ((this.rangeArr[3] + 4) / 2).toFixed(0);
  }

  if (y1start <= 0) {
    y1start = 0;
  }
  if (y2start <= 0) {
    y2start = 0;
  }
  
  this.splitNumber1 = (y1end - y1start) / 5;
  this.splitNumber2 = (y2end - y2start) / 5;

  this.stage1Arr = [];
  this.stage2Arr = [];
  this.stage3Arr = [];
  this.stage4Arr = [];

  for (var i = 0; i < this.chartY1Data.length; i++) {
    if (window.timeToseconds(this.chartXData[i]) <= 240) {
      this.stage1Arr.push(this.chartXData[i]);
    } else if (
      window.timeToseconds(this.chartXData[i]) > 240 &&
      window.timeToseconds(this.chartXData[i]) <= 480
    ) {
      this.stage2Arr.push(this.chartXData[i - 1]);
      this.stage2Arr.push(this.chartXData[i]);
    } else if (
      window.timeToseconds(this.chartXData[i]) > 480 &&
      window.timeToseconds(this.chartXData[i]) <= 720
    ) {
      this.stage3Arr.push(this.chartXData[i - 1]);
      this.stage3Arr.push(this.chartXData[i]);
    } else if (
      window.timeToseconds(this.chartXData[i]) > 720 &&
      window.timeToseconds(this.chartXData[i]) <= 960
    ) {
      this.stage4Arr.push(this.chartXData[i - 1]);
      this.stage4Arr.push(this.chartXData[i]);
    }
  }

  this.chartSeries = [
    {
      name: "肌氧",
      type: "line",
      symbol: "circle",
      symbolSize: [8, 8],
      data: this.chartY1Data,
      itemStyle: {
        normal: {
          color: "#009CAA"
        }
      }
    },
    {
      name: "心率",
      type: "line",
      yAxisIndex: 1,
      symbol: "diamond",
      symbolSize: [10, 10],
      data: this.chartY2Data,
      itemStyle: {
        normal: {
          color: "#F47D00"
        }
      },
      markLine: {
        data: this.hintArr,
        symbol: ["none", "image://../../img/tuli3@3x.png"],
        symbolSize: [20, 20],
        lineStyle: {
          normal: {
            type: "solid",
            color: "red"
          }
        }
      }
    },
    {
      name: "阶段一",
      symbol: "none",
      type: "line",
      markArea: {
        silent: true,
        itemStyle: {
          normal: {
            color: "#D7FDF7"
          }
        },
        data: [
          [
            {
              xAxis: this.stage1Arr[0]
            },
            {
              xAxis: this.stage1Arr[this.stage1Arr.length - 1]
            }
          ]
        ]
      }
    }
  ];

  if (this.stage2Arr.length > 0) {
    var series2 = {
      name: "阶段二",
      symbol: "none",
      type: "line",
      markArea: {
        silent: true,
        itemStyle: {
          normal: {
            color: "#FEFBC7"
          }
        },
        data: [
          [
            {
              xAxis: this.stage2Arr[0]
            },
            {
              xAxis: this.stage2Arr[this.stage2Arr.length - 1]
            }
          ]
        ]
      }
    };

    this.chartSeries.push(series2);
  }

  if (this.stage3Arr.length > 0) {
    var series3 = {
      name: "阶段三",
      symbol: "none",
      type: "line",
      markArea: {
        silent: true,
        itemStyle: {
          normal: {
            color: "#FFDDE8"
          }
        },
        data: [
          [
            {
              xAxis: this.stage3Arr[0]
            },
            {
              xAxis: this.stage3Arr[this.stage3Arr.length - 1]
            }
          ]
        ]
      }
    };

    this.chartSeries.push(series3);
  }

  if (this.stage4Arr.length > 0) {
    var series4 = {
      name: "阶段四",
      symbol: "none",
      type: "line",
      markArea: {
        silent: true,
        itemStyle: {
          normal: {
            color: "#DCF3FF"
          }
        },
        data: [
          [
            {
              xAxis: this.stage4Arr[0]
            },
            {
              xAxis: this.stage4Arr[this.stage4Arr.length - 1]
            }
          ]
        ]
      }
    };

    this.chartSeries.push(series4);
  }

  this.setEchartsOption1(y1start, y1end, y2start, y2end);
};

FourMinWalkDetail.prototype.setEchartsOption1 = function(
  y1start,
  y1end,
  y2start,
  y2end
) {
  this.mixchart = echarts.init(document.getElementById("echarts_mix1"));
  this.mixchart.setOption({
    tooltip: {
      trigger: "axis",
      formatter: "{b}<br/>{a}: {c} %<br />" + "{a1}: {c1} bpm"
    },
    xAxis: [
      {
        type: "category",
        data: this.chartXData,
        axisLine: {
          lineStyle: {
            color: "#C5C5C5",
            width: 2
          }
        },
        boundaryGap: false,
        axisLabel: {
          formatter: "{value}",
          textStyle: {
            color: "#333"
          }
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        name: "肌氧(%)",
        min: y1start, //0
        max: y1end, //200
        axisLabel: {
          formatter: function(value, index) {
            return value.toFixed(0);
          },
          textStyle: {
            color: "#333"
          },
          showMaxLabel: true,
          showMinLabel: true
        },
        interval: this.splitNumber1,
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: "#C5C5C5",
            width: 2
          }
        },
        nameTextStyle: {
          color: "#009CAA",
          fontSize: 20
        }
      },
      {
        type: "value",
        name: "(bpm)心率",
        min: y2start,
        max: y2end,
        axisLabel: {
          formatter: function(value, index) {
            return value.toFixed(0);
          },
          textStyle: {
            color: "#333"
          },
          showMaxLabel: true,
          showMinLabel: true
        },
        interval: this.splitNumber2,
        axisLine: {
          lineStyle: {
            color: "#C5C5C5",
            width: 2
          }
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        nameTextStyle: {
          color: "#F47D00",
          fontSize: 20
        }
      }
    ],
    series: this.chartSeries,
    dataZoom: [
      {
        show: true,
        height: 30,
        xAxisIndex: [0],
        bottom: 30,
        start: 0,
        end: 100,
        handleIcon:
          "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
        handleSize: "110%",
        handleStyle: {
          color: "#C5C5C5"
        },
        textStyle: {
          color: "rgba(0,0,0,0)"
        },
        borderColor: "#C5C5C5"
      }
    ]
  });
};
new FourMinWalkDetail();
